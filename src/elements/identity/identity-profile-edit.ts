import { LitElement, html, customElement, property, PropertyValues, query, queryAll } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { cssify } from '../../utils/css';
import styles from './identity-profile-edit.scss';
import { tooltip } from '../../ui/helpers';
import { responses } from '../../routes';
import global from '../../utils/global';

import { padAccountNumber } from '../../data/identity';
import TextInput, { InputUpdateEvent } from '../dev/text-input';
import utils from '../../utils/utils';
import { TraversableErrors, VALIDATION_ERRORS } from '../../utils/traversable-errors';
import timing, { Debounce } from '../../utils/timing';
import FileUploader, { FileInput, FileUploaderPausedEvent, PrepareResponse } from '../common/file-uploader';
import logging from '../../utils/logging';
import fileSize from '../../utils/files';
import * as api from '../../utils/api';
import { globalEventGroups, IdentityChangeEvent } from '../../utils/global-events';

const MAX_USERNAME_LENGTH = 24;
const MAX_BIO_LENGTH = 200;

@customElement('identity-profile-edit')
export default class IdentityProfileEdit extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	loadError?: any;

	@property({ type: String })
	displayNameValue: string = global.currentIdentity.displayName;
	@property({ type: Number })
	accountNumberValue: number = global.currentIdentity.accountNumber;
	@property({ type: String })
	bioValue: string = global.currentIdentity.bio;
	@property({ type: String })
	avatarUrlValue: string = global.currentIdentity.avatarUrl;

	// Used in preview display
	validDisplayNameValue: string = global.currentIdentity.displayName;
	validAccountNumberValue: number = global.currentIdentity.accountNumber;

	@property({ type: String })
	validationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.IDENTITY_PROFILE);

	@property({ type: Boolean })
	profileIsValid: boolean = false;

	@property({ type: Boolean })
	hasChanges: boolean = false;

	@property({ type: Boolean })
	hasAvatarChanges: boolean = false;

	@property({ type: Boolean })
	isUploading: boolean = false;

	// Profile picture file uploader element
	@query('file-uploader')
	pfpFileUploader: FileUploader;

	@queryAll('text-input')
	textInputs: TextInput[];

	// === DEBOUNCE INFO ===
	validateProfileDebounce: Debounce<() => ReturnType<typeof global.live.identity.validateIdentityProfile>>;

	/// === EVENTS ===
	handleIdentityChange: (e: IdentityChangeEvent) => void;

	constructor() {
		super();

		this.validateProfileDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				let displayName =
					this.displayNameValue == global.currentIdentity.displayName
						? null
						: this.displayNameValue;
				let accountNumber =
					this.accountNumberValue == global.currentIdentity.accountNumber
						? null
						: this.accountNumberValue;
				let bio = this.bioValue == global.currentIdentity.bio ? null : this.bioValue;

				this.hasChanges = true;

				// Don't send validation request if no new values are given
				if (this.noChanges(displayName, accountNumber, bio)) {
					this.profileIsValid = false;
					this.hasChanges = false;
					this.validationErrors.load([]);

					// Refresh UI
					this.requestUpdate('validationErrors');
					return null;
				}

				return await global.live.identity.validateIdentityProfile({
					displayName,
					accountNumber,
					bio
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
				if (!this.validationErrors.find('account-number-invalid').length) {
					this.validAccountNumberValue = this.accountNumberValue;
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

	connectedCallback() {
		super.connectedCallback();

		this.handleIdentityChange = this.onIdentityChange.bind(this);
		globalEventGroups.add('identity-change', this.handleIdentityChange);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		globalEventGroups.remove('identity-change', this.handleIdentityChange);
	}

	// Update render display when identity is updated
	onIdentityChange() {
		// Don't reset with pending changes
		if (!this.hasChanges && !this.hasAvatarChanges) this.reset();
	}

	displayNameInput(event: InputUpdateEvent) {
		this.displayNameValue = event.value;

		this.validateProfileDebounce.trigger();
	}

	accountNumberInput(event: InputUpdateEvent) {
		this.accountNumberValue = parseInt(event.value) ?? null;

		this.validateProfileDebounce.trigger();
	}

	bioInput(event: InputUpdateEvent) {
		this.bioValue = event.value;

		this.validateProfileDebounce.trigger();
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		let handleErrors = [
			...this.validationErrors.findFormatted('display-name'),
			...this.validationErrors.findFormatted('account-number-invalid'),
			...this.validationErrors.findFormatted('handle-not-unique')
		];
		let bioErrors = this.validationErrors.findFormatted('bio');

		let uploadOverlayStyles = classMap({
			active: this.isUploading
		});

		let fakeIdentity = global.currentIdentity;

		// Used for preview
		if (this.hasChanges || this.hasAvatarChanges) {
			fakeIdentity = Object.assign({}, global.currentIdentity);
			fakeIdentity.displayName = this.validDisplayNameValue;
			fakeIdentity.accountNumber = this.validAccountNumberValue;
			fakeIdentity.avatarUrl = this.avatarUrlValue;
		}

		return html`
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
						<h1 id="title">Edit profile</h1>

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
					<div id="identity-banner">
						<div id="backdrop"></div>

						<div id="avatar-holder">
							<identity-avatar
								id="main-avatar"
								hide-status
								.identity=${fakeIdentity}
							></identity-avatar>

							<!-- Change profile image button -->
							<icon-button
								custom
								?disabled=${this.isUploading}
								color="#ffffff"
								id="change-pfp"
								src="solid/image"
								@mouseenter=${tooltip('Change profile image')}
								.trigger=${this.changeProfileImage.bind(this)}
							></icon-button>
						</div>

						<div id="identity-actions">
							<div id="main-display-name">
								<identity-name
									.identity=${fakeIdentity}
									no-link
									show-number
									inline
								></identity-name>
							</div>
						</div>

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

						<!-- Change profile backdrop button -->
						<!-- <stylized-button icon='solid/image' id='change-background' small color="#989898" .trigger=${this.changeBackground.bind(
							this
						)}>
							Change background
						</stylized-button> -->
					</div>

					<div id="handle-area">
						<div id="username-area" class="input-area">
							<h2>
								Name<span class="letter-count"
									>${utils.countCodePoints(
										this.displayNameValue
									)}/${MAX_USERNAME_LENGTH}</span
								>
							</h2>
							<text-input
								.init=${this.displayNameValue}
								placeholder="Enter your username here..."
								.maxlength=${MAX_USERNAME_LENGTH}
								@input=${this.displayNameInput.bind(this)}
							></text-input>
						</div>
						<div class="input-area">
							<h2>Account number</h2>
							<text-input
								id="account-number-input"
								.init=${this.accountNumberValue.toString()}
								number
								min="1"
								max="9999"
								zero-padding="4"
								placeholder="0000"
								@input=${this.accountNumberInput.bind(this)}
							></text-input>
						</div>
					</div>
					${handleErrors.length > 0
						? html`
						<span id="profile-error">
							<e-svg src="regular/circle-exclamation"></e-svg> ${handleErrors[0]}</li>
						</span>`
						: null}

					<h2>
						Bio<span class="letter-count"
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
		let createRes = await global.live.identity.identityAvatarUploadPrepare({
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
		await global.live.identity.identityAvatarUploadComplete({ uploadId: prepareRes.uploadId });

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
				await global.live.identity.updateIdentityProfile({
					displayName:
						this.displayNameValue == global.currentIdentity.displayName
							? null
							: this.displayNameValue,
					accountNumber:
						this.accountNumberValue == global.currentIdentity.accountNumber
							? null
							: this.accountNumberValue,
					bio: this.bioValue == global.currentIdentity.bio ? null : this.bioValue
				});
				this.reset();
			}
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

	noChanges(displayName: string, accountNumber: number, bio: string) {
		return displayName == null && accountNumber == null && bio == null;
	}

	reset() {
		this.displayNameValue = global.currentIdentity.displayName;
		this.accountNumberValue = global.currentIdentity.accountNumber;
		this.bioValue = global.currentIdentity.bio;
		this.avatarUrlValue = global.currentIdentity.avatarUrl;

		this.validDisplayNameValue = this.displayNameValue;
		this.validAccountNumberValue = this.accountNumberValue;

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
