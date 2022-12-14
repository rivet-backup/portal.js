import { LitElement, html, customElement, property, PropertyValues, query, queryAll } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { cssify } from '../../utils/css';
import styles from './group-profile-edit.scss';
import { tooltip } from '../../ui/helpers';
import { responses } from '../../routes';
import UIRouter from '../root/ui-router';

import { TraversableErrors, VALIDATION_ERRORS } from '../../utils/traversable-errors';
import FileUploader, { FileInput, FileUploaderPausedEvent, PrepareResponse } from '../common/file-uploader';
import TextInput, { InputUpdateEvent } from '../dev/text-input';
import timing, { Debounce } from '../../utils/timing';
import global from '../../utils/global';
import logging from '../../utils/logging';
import utils from '../../utils/utils';
import fileSize from '../../utils/files';
import { DropDownSelectEvent, DropDownSelection } from '../dev/drop-down-list';
import * as api from '../../utils/api';
import { GroupProfileCache } from '../../data/cache';

const MAX_GROUPNAME_LENGTH = 24;
const MAX_BIO_LENGTH = 200;
const PUBLICITY_OPTIONS: DropDownSelection[] = [
	{
		label: 'Open',
		value: api.group.GroupPublicity.OPEN
	},
	{
		label: 'Closed',
		value: api.group.GroupPublicity.CLOSED
	}
];

@customElement('group-profile-edit')
export default class GroupProfileEdit extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	groupId: string;

	@property({ type: Object })
	profile: api.group.GroupProfile;

	@property({ type: Object })
	loadError?: any;

	@property({ type: String })
	displayNameValue: string = '';
	@property({ type: String })
	bioValue: string = '';
	@property({ type: String })
	avatarUrlValue: string = null;
	@property({ type: Number })
	publicityValue: api.group.GroupPublicity = null;

	// Used in preview display
	validDisplayNameValue: string = '';

	@property({ type: String })
	validationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GROUP_PROFILE);

	@property({ type: Boolean })
	profileIsValid: boolean = false;

	@property({ type: Boolean })
	hasChanges: boolean = false;

	@property({ type: Boolean })
	hasAvatarChanges: boolean = false;

	@property({ type: Boolean })
	isUploading: boolean = false;

	@property({ type: Boolean })
	isUpdating: boolean = false;

	// Profile picture file uploader element
	@query('file-uploader')
	pfpFileUploader: FileUploader;

	@queryAll('text-input')
	textInputs: TextInput[];

	// === EVENT HANDLERS ===
	groupStream?: api.RepeatingRequest<api.group.GetGroupProfileCommandOutput>;
	initiated: boolean = false;

	// === DEBOUNCE INFO ===
	validateProfileDebounce: Debounce<() => ReturnType<typeof global.live.group.validateGroupProfile>>;

	constructor() {
		super();

		this.validateProfileDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				let displayName =
					this.displayNameValue == this.profile.displayName ? null : this.displayNameValue;
				let bio = this.bioValue == this.profile.bio ? null : this.bioValue;
				let publicity = this.publicityValue == this.profile.publicity ? null : this.publicityValue;

				this.hasChanges = true;

				// Don't send validation request if no new values are given
				if (this.noChanges(displayName, bio)) {
					this.profileIsValid = publicity != null;
					this.hasChanges = publicity != null;
					this.validationErrors.load([]);

					this.validDisplayNameValue = this.profile.displayName;

					// Refresh UI
					this.requestUpdate('validationErrors');
					return null;
				}

				return await global.live.group.validateGroupProfile({
					displayName,
					bio,
					publicity
				});
			},
			completeCb: res => {
				// Save errors
				this.validationErrors.load(res.errors.map(err => err.path));
				this.profileIsValid = this.validationErrors.isEmpty();
				this.loadError = null;

				// Update valid values for preview
				if (!this.validationErrors.find('display-name').length) {
					this.validDisplayNameValue = this.displayNameValue;
				}

				// Refresh UI
				this.requestUpdate('validationErrors');
			}
		});

		this.validateProfileDebounce.onError(async err => {
			this.loadError = err;
			this.profileIsValid = false;

			if (err.hasOwnProperty('statusText')) this.loadError = await (err as Response).json();
		});
	}

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		this.fetchGroup();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();

		if (this.groupStream) this.groupStream.cancel();
	}

	async fetchGroup() {
		// Fetch events
		this.groupStream = await GroupProfileCache.watch(this.groupId, profile => {
			this.profile = profile;

			if (!this.initiated) {
				this.initiated = true;

				this.displayNameValue = this.profile.displayName;
				this.publicityValue = this.profile.publicity as api.group.GroupPublicity;
				this.bioValue = this.profile.bio;
				this.avatarUrlValue = this.profile.avatarUrl;

				this.validDisplayNameValue = this.displayNameValue;
			}
			// Only reset when updating so that the form info does not reset if someone else is editing
			// at the same time
			else if (this.isUpdating) {
				this.reset();
			}

			// Update the title
			UIRouter.shared.updateTitle(this.profile.displayName);
		});

		this.groupStream.onError(err => {
			logging.error('Request error', err);
			this.loadError = err;
		});
	}

	displayNameInput(event: InputUpdateEvent) {
		this.displayNameValue = event.value;

		this.validateProfileDebounce.trigger();
	}

	bioInput(event: InputUpdateEvent) {
		this.bioValue = event.value;

		this.validateProfileDebounce.trigger();
	}

	selectPublicity(event: DropDownSelectEvent) {
		this.publicityValue = event.selection.value;

		this.validateProfileDebounce.trigger();
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		let displayNameErrors = this.validationErrors.findFormatted('display-name');
		let bioErrors = this.validationErrors.findFormatted('bio');

		let uploadOverlayStyles = classMap({
			active: this.isUploading
		});

		let publicity = this.profile ? PUBLICITY_OPTIONS.find(a => a.value == this.publicityValue) : null;

		return html`
			<a id="close" @click=${this.closeModal.bind(this)}></a>
			<div id="base">
				<div id="scrollbase">
					<stylized-button
						icon="solid/play"
						id="nav-back"
						small
						color="transparent"
						text="white"
						.trigger=${this.closeModal.bind(this)}
						>Back</stylized-button
					>

					<!-- Header and button -->
					<div id="header">
						<h1 id="title">Edit group profile</h1>

						<div id="actions">
							${this.hasChanges || this.hasAvatarChanges
								? html`<stylized-button
										id="cancel"
										.trigger=${this.reset.bind(this)}
										color="gray"
										>Cancel</stylized-button
								  >`
								: null}
							<stylized-button
								id="confirm"
								?disabled=${this.hasChanges ? !this.profileIsValid : !this.hasAvatarChanges}
								.trigger=${this.confirmChanges.bind(this)}
								>Save</stylized-button
							>
						</div>
					</div>

					<!-- Profile info and actions -->
					<div id="group-banner">
						<div id="backdrop"></div>

						<div id="avatar-holder">
							${this.profile
								? html`<group-avatar
										shadow
										.group=${this.profile}
										.placeholderOverride=${this.validDisplayNameValue}
										.imagePlaceholder=${this.avatarUrlValue}
								  ></group-avatar>`
								: null}

							<!-- Change profile image button -->
							<e-svg
								id="change-pfp"
								src="solid/image"
								@mouseenter=${tooltip('Change profile image')}
								@click=${this.changeProfileImage.bind(this)}
							></e-svg>
						</div>

						<div id="main-display-name">${this.profile ? this.validDisplayNameValue : null}</div>

						<div id="uploader-overlay" class=${uploadOverlayStyles}>
							<file-uploader
								pause
								max-size=${fileSize.megabytes(1)}
								@pause=${this.uploadPaused.bind(this)}
								.accept=${'image/png, image/jpeg'}
								.allowed=${/\.(pn|jpe?)g$/i}
								.prepareUpload=${this.prepareUpload.bind(this)}
								.completeUpload=${this.completeUpload.bind(this)}
								.failedUpload=${this.failedUpload.bind(this)}
							></file-uploader>
						</div>

						<!-- <stylized-button icon='solid/image' id='change-background' small
							this
						)}>
						Change background
					</stylized-button> -->
					</div>

					<h2>
						Group name<span class="lettercount"
							>${utils.countCodePoints(this.displayNameValue)}/${MAX_GROUPNAME_LENGTH}</span
						>
					</h2>
					<text-input
						.init=${this.displayNameValue}
						placeholder="Enter your group name here..."
						.maxlength=${MAX_GROUPNAME_LENGTH}
						@input=${this.displayNameInput.bind(this)}
					></text-input>
					${displayNameErrors.length > 0
						? html`
					<span id="profile-error">
						<e-svg src="regular/circle-exclamation"></e-svg> ${displayNameErrors[0]}</li>
					</span>`
						: null}

					<div id="publicity-area">
						<h2>Publicity</h2>
						<drop-down-list
							.selection=${publicity}
							.options=${PUBLICITY_OPTIONS}
							@select=${this.selectPublicity.bind(this)}
						></drop-down-list>
					</div>

					<h2>
						Bio<span class="lettercount"
							>${utils.countCodePoints(this.bioValue)}/${MAX_BIO_LENGTH}</span
						>
					</h2>
					<text-input
						area
						id="bio-input"
						.init=${this.bioValue}
						placeholder="Enter your bio here..."
						.maxlength=${MAX_BIO_LENGTH}
						@input=${this.bioInput.bind(this)}
					></text-input>
					${bioErrors.length > 0
						? html`
					<span id="profile-error">
						<e-svg src="regular/circle-exclamation"></e-svg> ${bioErrors[0]}</li>
					</span>`
						: null}
				</div>
			</div>
		`;
	}

	async prepareUpload(files: FileInput[]): Promise<PrepareResponse> {
		this.isUploading = true;

		let imageFile = files[0];
		if (!imageFile) {
			logging.warn('no image file provided');
			return null;
		}

		// Prepare the upload
		let createRes = await global.live.group.groupAvatarUploadPrepare({
			path: imageFile.prepared.path,
			mime: imageFile.prepared.contentType,
			contentLength: imageFile.prepared.contentLength
		});

		return {
			uploadId: createRes.uploadId,
			files: [
				{
					presignedRequest: createRes.presignedRequest,
					input: imageFile
				}
			]
		};
	}

	async completeUpload(prepareRes: PrepareResponse) {
		await global.live.group.groupAvatarUploadComplete({
			groupId: this.groupId,
			uploadId: prepareRes.uploadId
		});

		this.isUploading = false;
	}

	async failedUpload() {
		setTimeout(() => {
			this.isUploading = false;
		}, timing.seconds(3));
	}

	uploadPaused(event: FileUploaderPausedEvent) {
		let fileReader = new FileReader();

		// Read profile avatar upload and set it as a preview image
		fileReader.addEventListener('load', () => {
			this.avatarUrlValue = fileReader.result as string;
			this.hasAvatarChanges = true;
		});

		fileReader.readAsDataURL(event.fileInputs[0].fileHandle);
	}

	closeModal() {
		this.dispatchEvent(new Event('close'));
	}

	async confirmChanges() {
		try {
			// Upload profile picture
			if (this.hasAvatarChanges) {
				this.pfpFileUploader.resume();
			}

			if (this.hasChanges) {
				await global.live.group.updateGroupProfile({
					groupId: this.groupId,
					displayName:
						this.displayNameValue == this.profile.displayName ? null : this.displayNameValue,
					publicity: this.publicityValue == this.profile.publicity ? null : this.publicityValue,
					bio: this.bioValue == this.profile.bio ? null : this.bioValue
				});
			}

			this.isUpdating = true;
		} catch (err) {
			logging.error('Failed to update profile', err);
		}
	}

	changeBackground() {
		alert('UNIMPLEMENTED');
	}

	changeProfileImage() {
		this.pfpFileUploader.activate();
	}

	noChanges(displayName: string, bio: string) {
		return displayName == null && bio == null;
	}

	reset() {
		this.displayNameValue = this.profile.displayName;
		this.publicityValue = this.profile.publicity as api.group.GroupPublicity;
		this.bioValue = this.profile.bio;
		this.avatarUrlValue = this.profile.avatarUrl;

		this.validDisplayNameValue = this.displayNameValue;

		// Reset text nodes
		this.textInputs.forEach(a => a.reset());

		// Cancel file upload
		if (this.pfpFileUploader.isPaused) this.pfpFileUploader.resume(false);

		this.validationErrors.load([]);
		this.profileIsValid = false;
		this.hasChanges = false;
		this.hasAvatarChanges = false;
		this.isUploading = false;
	}
}
