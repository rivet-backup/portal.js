import { LitElement, html, customElement, property, query, PropertyValues } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../utils/css';
import styles from './groups.scss';
import routes, { responses } from '../../routes';
import utils from '../../utils/utils';
import global from '../../utils/global';

import { classMap } from 'lit-html/directives/class-map';
import { TraversableErrors, VALIDATION_ERRORS } from '../../utils/traversable-errors';
import { DropDownSelection } from '../dev/drop-down-list';
import timing, { Debounce } from '../../utils/timing';
import UIRouter from '../root/ui-router';
import assets from '../../data/assets';
import * as api from '../../utils/api';

const LOAD_GROUP_COUNT = 64;

@customElement('page-groups')
export default class GroupsPage extends LitElement {
	static styles = cssify(styles);

	@query('#display-name-input')
	displayNameInput: HTMLInputElement;

	@property({ type: Array })
	myGroups?: api.group.GroupSummary[];

	@property({ type: Array })
	suggestedGroups?: api.group.GroupSummary[];

	@property({ type: Boolean })
	groupModalActive: boolean = false;

	@property({ type: String })
	groupDisplayNameValue: string = null;

	@property({ type: Boolean })
	isCreatingGroup: boolean = false;

	groupOptions: DropDownSelection[] = [];
	devGroupOptions: DropDownSelection[] = [];

	@property({ type: String })
	groupValidationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GROUP);

	@property({ type: Boolean })
	groupIsValid: boolean = false;

	@property({ type: Object })
	loadError?: any;

	// === DEBOUNCE INFO ===
	validateGroupDebounce: Debounce<() => ReturnType<typeof global.cloud.validateGroup>>;

	constructor() {
		super();

		this.validateGroupDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				let displayName = this.groupDisplayNameValue;

				return await global.cloud.validateGroup({
					displayName
				});
			},
			completeCb: res => {
				// Save errors
				this.groupValidationErrors.load(res.errors.map(err => err.path));
				this.groupIsValid = this.groupValidationErrors.isEmpty();

				// Refresh UI
				this.requestUpdate('groupValidationErrors');
			}
		});

		this.validateGroupDebounce.onError(async err => {
			this.loadError = err;
			this.groupIsValid = false;

			if (err.hasOwnProperty('statusText')) this.loadError = await (err as Response).json();
		});
	}

	protected firstUpdated(_changedProperties: PropertyValues): void {
		// Get suggested groups
		global.live.group
			.getSuggestedGroups({})
			.then(({ groups }) => {
				this.myGroups = [];
				this.suggestedGroups = groups;
			})
			.catch((err: any) => (this.loadError = err));
	}

	async createGroup() {
		if (!this.groupIsValid) return;

		try {
			let displayName = this.groupDisplayNameValue ?? '';

			let groupRes = await global.live.group.createGroup({
				displayName
			});

			UIRouter.shared.navigate(
				routes.group.build({
					id: groupRes.groupId
				})
			);

			this.groupModalClose();
		} catch (err) {
			this.loadError = err;
			this.isCreatingGroup = false;
		}
	}

	openGroupModal() {
		this.groupModalActive = true;
	}

	groupModalClose() {
		this.groupModalActive = false;
	}

	groupDisplayNameInput(e: InputEvent) {
		let target = (e.currentTarget || e.target) as HTMLInputElement;

		this.groupDisplayNameValue = target.value;
		this.validateGroupDebounce.trigger();
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		return html`
			<div id="base">
				<!-- Header -->
				<page-header>
					<e-svg src="regular/identity-group"></e-svg>
					<h1>Groups</h1>
				</page-header>

				<div id="banner">
					<div id="bg">
						<lazy-img
							class="img"
							bg-size="cover"
							src=${assets.asset('graphics/group-banner/group-banner-0.svg')}
						></lazy-img>
						<!-- <e-svg class='img' preserve absolute-position non-icon src="graphics/group-banner/group-banner-1"></e-svg>
						<e-svg class='img' preserve absolute-position non-icon src="graphics/group-banner/group-banner-2"></e-svg>
						<e-svg class='img' preserve absolute-position non-icon src="graphics/group-banner/group-banner-3"></e-svg>
						<e-svg class='img' preserve absolute-position non-icon src="graphics/group-banner/group-banner-4"></e-svg> -->
					</div>

					<div id="content">
						<h1>Chat and play games together</h1>
						<stylized-button color="white" .trigger=${this.openGroupModal.bind(this)}
							>Create a new group</stylized-button
						>
					</div>
				</div>
				<!-- <div id='search-bar-holder'>
					<div id='search-bar'>
						<e-svg src="regular/magnifying-glass"></e-svg>
						<input id="search-input" type="text" placeholder="Search for a group..." maxlength="32"/>
					</div>
				</div> -->

				${this.renderGroupList(this.suggestedGroups)}
			</div>
			${this.renderCreateGroupModal()}
		`;
	}

	renderGroupList(groups: api.portal.GroupSummary[], loadingCount: number = LOAD_GROUP_COUNT) {
		if (groups && groups.length == 0)
			return html` <div id="groups-list">
				<span class="placeholder">No groups found</span>
			</div>`;

		return html`
			<div id="groups-list">
				${groups
					? repeat(
							groups,
							c => c.id,
							c => html`<div class="square-tile"><group-tile .group=${c}></group-tile></div>`
					  )
					: null}
				${!groups ? this.renderLoadingGroups(loadingCount) : null}
			</div>
		`;
	}

	renderLoadingGroups(count: number) {
		let items = [];
		for (let i = 0; i < count; i++) {
			items.push(html`<div class="square-tile"><loading-placeholder></loading-placeholder></div>`);
		}
		return items;
	}

	renderCreateGroupModal() {
		let errors = this.groupValidationErrors.findFormatted();

		let previewClasses = classMap({
			active: errors.length > 0
		});

		return html` <drop-down-modal
			id="create-group-modal"
			?active=${this.groupModalActive}
			@close=${this.groupModalClose.bind(this)}
		>
			<modal-body slot="body">
				<h1>Create your group</h1>
				<div id="preview" class=${previewClasses}>
					<div id="profile-icon">
						${utils.getGroupInitials(this.groupDisplayNameValue || 'Group Name')}
					</div>
					<h3>${this.groupDisplayNameValue || 'Group Name'}</h3>
				</div>
				<div class="input-group">
					<h2>Group Name</h2>
					<text-input
						light
						placeholder="Enter a group name..."
						@input=${this.groupDisplayNameInput.bind(this)}
					></text-input>
					${errors.length > 0
						? html`
							<span id="create-group-error">
								<e-svg src="regular/circle-exclamation"></e-svg> ${errors[0]}</li>
							</span>`
						: null}
				</div>
				<stylized-button
					.trigger=${this.createGroup.bind(this)}
					?disabled=${!this.groupIsValid}
					?loading=${this.isCreatingGroup}
					>Create</stylized-button
				>
			</modal-body>
		</drop-down-modal>`;
	}
}
