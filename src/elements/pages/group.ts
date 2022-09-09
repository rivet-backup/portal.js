import {
	customElement,
	html,
	LitElement,
	property,
	PropertyValues,
	query,
	TemplateResult
} from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../utils/css';
import styles from './group.scss';
import routes, { responses } from '../../routes';
import global from '../../utils/global';
import { GlobalMobileChangeEvent, globalEventGroups } from '../../utils/global-events';
import { showAlert } from '../../ui/helpers';
import UIRouter from '../root/ui-router';

import { groupRouteData } from '../../data/group';
import assets from '../../data/assets';
import * as api from '../../utils/api';

import { GroupProfileCache } from '../../data/cache';
import logging from '../../utils/logging';
import { GroupActionEvent } from '../group/group-sidebar';
import { DropDownSelectEvent, DropDownSelection } from '../dev/drop-down-list';
import timing from '../../utils/timing';
import utils from '../../utils/utils';
import { InputUpdateEvent } from '../dev/text-input';

enum CreateInviteState {
	Create,
	Result
}

const INVITE_TTL_SELECTION: DropDownSelection[] = [
	{
		label: '1 Hour',
		value: timing.hours(1)
	},
	{
		label: '1 Day',
		value: timing.days(1)
	},
	{
		label: '1 Week',
		value: timing.days(7)
	},
	{
		label: '1 Month',
		value: timing.days(30)
	},
	{
		label: 'Never',
		value: 0
	}
];

@customElement('page-group')
export default class GroupPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	groupId: string;

	@property({ type: Object })
	profile?: api.group.GroupProfile;

	@property({ type: String })
	gameNameId?: string;

	@property({ type: Object })
	loadError?: any;

	@property({ type: Boolean })
	editModalActive: boolean = false;

	// === TRANSFER COMPONENTS ===
	@property({ type: Boolean })
	transferModalActive: boolean = false;

	@property({ type: String })
	transferIdentityId: string = null;

	// === INVITE COMPONENTS ===
	@property({ type: Boolean })
	createInviteModalActive: boolean = false;

	@property({ type: Number })
	createInviteState: number = CreateInviteState.Create;

	@property({ type: Object })
	createInviteTTLSelection: DropDownSelection = INVITE_TTL_SELECTION[0];

	@property({ type: Number })
	createInviteUseCountValue: number = 0;

	@property({ type: String })
	inviteCode: string = null;

	@property({ type: String })
	inviteCodeCopyResult: string = '';

	@query('#result')
	inviteCodeCopyResultElement: HTMLElement;

	inviteCodeCopyResultTimeout: number = null;

	// === EVENT HANDLERS ===
	handleMobile: (e: GlobalMobileChangeEvent) => void;
	groupStream?: api.RepeatingRequest<api.group.GetGroupProfileCommandOutput>;

	connectedCallback() {
		super.connectedCallback();

		// Handle mobile change
		this.handleMobile = this.onMobile.bind(this);
		globalEventGroups.add('mobile', this.handleMobile);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();

		// Remove event listeners
		globalEventGroups.remove('mobile', this.handleMobile);
		if (this.groupStream) this.groupStream.cancel();
	}

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		this.fetchGroup();
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Request data if category set
		if (changedProperties.has('groupId')) {
			this.resetGroupData();
			this.fetchGroup();
		}
	}

	resetGroupData() {
		// Remove old group data
		this.profile = null;
		if (this.groupStream) this.groupStream.cancel();
	}

	async fetchGroup() {
		// Fetch events
		this.groupStream = await GroupProfileCache.watch(this.groupId, profile => {
			this.profile = profile;

			// Update the title
			UIRouter.shared.updateTitle(this.profile.displayName);
		});

		this.groupStream.onError(err => {
			logging.error('Request error', err);
			this.loadError = err;
		});
	}

	async leaveGroup() {
		// Ask if should leave group
		showAlert(`Are you sure you want to leave ${this.profile.displayName}?`, undefined, [
			{ label: 'Stay' },
			{
				label: 'Leave',
				destructive: true,
				cb: async () => {
					// Leave group
					await global.live.group.leaveGroup({ groupId: this.profile.id });
				}
			}
		]);
	}

	async applyForGroup() {
		try {
			await global.live.group.requestJoinGroup({ groupId: this.profile.id });
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	async resolveJoinRequest(identityId: string, resolution: boolean) {
		try {
			await global.live.group.resolveGroupJoinRequest({
				groupId: this.profile.id,
				identityId,
				resolution
			});
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	async transferGroupOwnership() {
		try {
			await global.live.group.transferGroupOwnership({
				groupId: this.profile.id,
				newOwnerIdentityId: this.transferIdentityId
			});
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}

		this.transferModalClose();
	}

	async createGroupInvite() {
		try {
			let res = await global.live.group.createGroupInvite({
				groupId: this.profile.id,
				ttl: this.createInviteTTLSelection.value > 0 ? this.createInviteTTLSelection.value : null,
				useCount: this.createInviteUseCountValue > 0 ? this.createInviteUseCountValue : null
			});

			this.createInviteState = CreateInviteState.Result;
			this.inviteCode = res.code;
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	async kickMember(identityId: string) {
		alert('UNIMPLEMENTED');

		// // Ask to kick member
		// showAlert(`Are you sure you want to kick ${identity.displayName}?`, undefined, [
		// 	{ label: "Cancel" },
		// 	{
		// 		label: "Kick", destructive: true, cb: async () => {
		// 			// Update UI
		// 			this.profile.members = this.profile.members.filter(m => m.identity.id != identity.id);
		// 			this.requestUpdate("profile");

		// 			// Update state
		// 			await GroupEndpoints.kickMember.execute({ groupId: this.profile.group.id, identityId: identity.id });
		// 			await global.updateCurrentIdentity();
		// 			await this.fetchGroup();
		// 		}
		// 	},
		// ]);
	}

	// Assumes current identity is leader
	async inviteToParty() {
		try {
			if (!global.currentParty) {
				await global.live.party.createParty({
					partySize: 4
				});
			}

			let invite = await global.live.party.createPartyInvite({});

			await global.live.party.sendInviteChatMessage({
				groupId: this.groupId,
				token: invite.token
			});
		} catch (err) {
			logging.error('Error creating/inviting to party', err);
			this.loadError = err;
		}
	}

	onActionEvent(event: GroupActionEvent) {
		let action = event.action;

		if (action.applyForGroup) this.applyForGroup();
		else if (action.openEditModal) this.openEditModal();
		else if (action.inviteToParty) this.inviteToParty();
		else if (action.kickMember) this.kickMember(action.kickMember.identityId);
		else if (action.leaveGroup) this.leaveGroup();
		else if (action.resolveJoinRequest)
			this.resolveJoinRequest(
				action.resolveJoinRequest.identityId,
				action.resolveJoinRequest.resolution
			);
		else if (action.transferOwnership) this.openTransferModal();
		else if (action.openCreateInviteModal) this.openCreateInviteModal();
	}

	changeTransferIdentitySelection(event: DropDownSelectEvent) {
		this.transferIdentityId = event.selection.value;
	}

	onMobile() {
		this.requestUpdate();
	}

	openEditModal() {
		this.editModalActive = true;
	}

	editModalClose() {
		this.editModalActive = false;
	}

	render() {
		let profileNotFound = this.loadError && this.loadError.status == 404;
		if (this.loadError && !profileNotFound) return responses.renderError(this.loadError);

		let isOwner = this.profile ? global.currentIdentity.id == this.profile.ownerIdentityId : false;

		return global.isMobile
			? this.renderMobile(profileNotFound, isOwner)
			: this.renderDesktop(profileNotFound, isOwner);
	}

	renderDesktop(profileNotFound: boolean, isOwner: boolean) {
		let backdropUrl = assets.asset('/profile-bg/02. Egg Sour.png');

		let membersList: api.group.GroupMember[] = [];

		if (this.profile) {
			membersList = this.profile.members;

			// Sort by owner/admin and alphabet
			membersList.sort((a, b) => {
				let isOwnerA = +(a.identity.id == this.profile.ownerIdentityId);
				let isOwnerB = +(b.identity.id == this.profile.ownerIdentityId);

				return isOwnerA == isOwnerB
					? a.identity.displayName.localeCompare(b.identity.displayName)
					: isOwnerB - isOwnerA;
			});
		}

		return html`
			<profile-layout>
				<div id="banner-bg" slot="banner-bg">
					<lazy-img src=${backdropUrl}></lazy-img>
				</div>

				<div id="banner-center" slot="banner-center">
					${this.buildBackButton()}
					${this.profile ? html`<group-avatar shadow .group=${this.profile}></group-avatar>` : null}
					<div id="main-display-name">
						${this.profile
							? this.profile.displayName
							: profileNotFound
							? 'Group not found'
							: null}
					</div>
				</div>

				<group-sidebar
					slot="sidebar"
					.profile=${this.profile}
					@event=${this.onActionEvent.bind(this)}
				></group-sidebar>

				<div id="body" slot="body">
					<!-- Games -->
					<info-panel-header>
						<div slot="title">Games</div>
					</info-panel-header>

					<info-panel-body noindent>${this.renderGames()}</info-panel-body>
				</div>
			</profile-layout>

			<!-- TODO: Fetch the game instead of using gameStats[0] -->
			${this.profile && this.gameNameId
				? html`<expanded-game-stats
						.group=${this.profile}
						.game=${this.profile.gameStats[0]}
				  ></expanded-game-stats>`
				: null}

			<!-- Editing modal -->
			<drop-down-modal
				large-animation
				.active=${this.editModalActive}
				@close=${this.editModalClose.bind(this)}
			>
				<group-profile-edit
					slot="body"
					.groupId=${this.groupId}
					@close=${this.editModalClose.bind(this)}
				></group-profile-edit>
			</drop-down-modal>

			${this.renderTransferOwnershipModal()}${this.renderCreateInviteModal()}
		`;
	}

	renderMobile(profileNotFound: boolean, isOwner: boolean) {
		let backdropUrl = assets.asset('/profile-bg/02. Egg Sour.png');

		return html`
			<!-- Profile info and actions -->
			<div id="banner">
				<lazy-img id="backdrop" src=${backdropUrl}></lazy-img>

				<div id="banner-center">
					${this.profile ? html`<group-avatar shadow .group=${this.profile}></group-avatar>` : null}
					<div id="main-display-name">
						${this.profile
							? this.profile.displayName
							: profileNotFound
							? 'Group not found'
							: null}
					</div>
				</div>
			</div>

			<div id="body">
				<!-- Actions -->
				<info-group-body id="group-actions">
					${this.profile
						? !this.profile.isCurrentIdentityMember
							? this.profile.publicity == api.group.GroupPublicity.OPEN
								? this.profile.isCurrentIdentityRequestingJoin
									? html`<stylized-button id="apply-button" small disabled
											>Application pending</stylized-button
									  >`
									: html`<stylized-button
											id="apply-button"
											small
											.trigger=${this.applyForGroup.bind(this)}
											>Apply</stylized-button
									  >`
								: html`<stylized-button id="apply-button" small disabled
										>Applications closed</stylized-button
								  >`
							: html`<stylized-button
										small
										href=${routes.groupChat.build({
											id: this.groupId
										})}
										>Open chat</stylized-button
									>
									<stylized-button
										small
										class="social"
										.trigger=${this.inviteToParty.bind(this)}
										>Create group party</stylized-button
									>
									<stylized-button
										icon="regular/identity"
										small
										href="${routes.groupMembers.build(groupRouteData(this.profile))}"
									>
										View members
									</stylized-button>
									${this.profile.isCurrentIdentityMember
										? html`<stylized-button
												small
												.trigger=${this.openCreateInviteModal.bind(this)}
												>Create invite</stylized-button
										  >`
										: null}
									${this.profile.isDeveloper && this.profile.isCurrentIdentityMember
										? html`<stylized-button
												small
												href=${routes.groupBilling.build({
													groupId: this.groupId
												})}
												>View billing</stylized-button
										  >`
										: null}
									${isOwner
										? html`<stylized-button
													small
													.trigger=${this.openEditModal.bind(this)}
													>Edit group</stylized-button
												><stylized-button
													id="transfer-ownership"
													small
													.trigger=${this.openTransferModal.bind(this)}
													>Transfer ownership</stylized-button
												>`
										: this.profile.isCurrentIdentityMember
										? html` <stylized-button
												id="leave-button"
												small
												color="#d93636"
												.trigger=${this.leaveGroup.bind(this)}
												>Leave group</stylized-button
										  >`
										: null}`
						: null}
				</info-group-body>

				<!-- About -->
				<info-panel-header>
					<div slot="title">Bio</div>
				</info-panel-header>

				<info-panel-body id="bio">${this.renderAbout()}</info-panel-body>

				<!-- Events -->
				<info-panel-header>
					<div slot="title">Events</div>
				</info-panel-header>

				<info-panel-body>
					<p class="muted">No events</p>
				</info-panel-body>

				<!-- Join Requests -->
				<!-- TODO: Mobile -->

				<!-- Games -->
				<info-panel-header>
					<div slot="title">Games</div>
				</info-panel-header>

				<info-panel-body noindent> ${this.renderGames()} </info-panel-body>
			</div>

			<!-- TODO: Fetch the game instead of using gameStats[0] -->
			${this.profile && this.gameNameId
				? html`<expanded-game-stats
						.group=${this.profile}
						.game=${this.profile.gameStats[0]}
				  ></expanded-game-stats>`
				: null}

			<!-- Editing modal -->
			<drop-down-modal
				large-animation
				.active=${this.editModalActive}
				@close=${this.editModalClose.bind(this)}
			>
				<group-profile-edit
					slot="body"
					.groupId=${this.groupId}
					@close=${this.editModalClose.bind(this)}
				></group-profile-edit>
			</drop-down-modal>

			${this.renderTransferOwnershipModal()}${this.renderCreateInviteModal()}
		`;
	}

	renderAbout() {
		if (!this.profile) return html`<loading-placeholder-text></loading-placeholder-text>`;

		if (this.profile.bio) {
			return html`<div id="bio-text">${this.profile.bio}</div>`;
		} else {
			return html`<div class="details-text">${this.profile.displayName} has no bio.</div>`;
		}
	}

	renderGames() {
		return html`<p class="muted">No games</p>`;

		return html`
			<div id="games">
				${repeat(
					this.profile.gameStats,
					game => game.game.id,
					game => html`<game-stats .group=${this.profile} .data=${game}></game-stats>`
				)}
			</div>
		`;
	}

	renderTransferOwnershipModal() {
		if (!this.profile) return null;

		let members = Array.from(this.profile.members).filter(
			m => m.identity.id != global.currentIdentity.id
		);
		let identityOptions = members.map(u => ({
			template: html`<identity-tile .identity=${u.identity} light hide-status no-link></identity-tile>`,
			value: u.identity.id
		}));

		return html`<drop-down-modal
			id="transfer-ownership-modal"
			?active=${this.transferModalActive}
			@close=${this.transferModalClose.bind(this)}
		>
			<modal-body slot="body">
				<h1>Transfer Ownership</h1>
				<p class="content">
					Are you sure you want to transfer ownership of group
					<span id="group-transfer-name">${this.profile.displayName}</span>? This action
					<b>CANNOT</b> be undone.
					${this.profile.isDeveloper
						? html`<br /><br /><b
									>As a developer group, transferring ownership will cause all billing
									related emails to be sent to the new owner. Your bank account information
									will stay attached to the group unless removed by a Rivet employee.</b
								><br />Contact <a class="link" href="/support" target="_blank">Support</a> for
								more info.<br />`
						: null}
				</p>
				<drop-down-list
					light
					fixed
					placeholder="Select Identity"
					.options=${identityOptions}
					@select=${this.changeTransferIdentitySelection.bind(this)}
				></drop-down-list>

				<stylized-button
					color="#d4393b"
					.trigger=${this.transferGroupOwnership.bind(this)}
					?disabled=${this.transferIdentityId == null}
					>Transfer</stylized-button
				>
			</modal-body>
		</drop-down-modal>`;
	}

	openTransferModal() {
		this.transferModalActive = true;
	}

	transferModalClose() {
		this.transferModalActive = false;
	}

	renderCreateInviteModal() {
		if (!this.profile) return null;

		return html`<drop-down-modal
			id="create-invite-modal"
			?active=${this.createInviteModalActive}
			@close=${this.createInviteModalClose.bind(this)}
		>
			<modal-body slot="body">
				${this.createInviteState == CreateInviteState.Create
					? html`<h1>Create Group Invite</h1>
							<div id="inputs">
								<div class="input-group">
									<h2>Expiration time</h2>
									<drop-down-list
										light
										fixed
										placeholder="Select expiration"
										.selection=${this.createInviteTTLSelection}
										.options=${INVITE_TTL_SELECTION}
										@select=${(ev: DropDownSelectEvent) =>
											(this.createInviteTTLSelection = ev.selection)}
									></drop-down-list>
								</div>
								<div class="input-group">
									<h2>Maximum use count (0 for infinite)</h2>
									<text-input
										light
										number
										placeholder="Maximum uses"
										min="0"
										max="5000"
										@input=${(ev: InputUpdateEvent) =>
											(this.createInviteUseCountValue = parseInt(ev.value))}
									></text-input>
								</div>
							</div>

							<stylized-button
								.trigger=${this.createGroupInvite.bind(this)}
								?disabled=${this.createInviteTTLSelection == null ||
								this.createInviteUseCountValue == null}
								>Create</stylized-button
							>`
					: html`<h1>Group Invite Code</h1>
							<div id="result">
								<h3 id="invite-code">${this.inviteCode}</h3>
								<div id="invite-link-area">
									<a
										class="link"
										id="invite-link"
										href=${routes.groupInvite.build({ code: this.inviteCode })}
										>${routes.groupInvite.build({ code: this.inviteCode })}</a
									>
									<icon-button
										id="copy-button"
										color=${'#252525'}
										highlight-color=${'#151515'}
										src="solid/copy"
										.trigger=${this.copyInviteCode.bind(this)}
									></icon-button>

									${this.inviteCodeCopyResult
										? html`<div id="copy-result">${this.inviteCodeCopyResult}</div>`
										: null}
								</div>
							</div>
							<p class="content">Share this code or link to allow people to join your group.</p>
							<stylized-button .trigger=${this.createInviteModalClose.bind(this)}
								>Dismiss</stylized-button
							>`}
			</modal-body>
		</drop-down-modal>`;
	}

	openCreateInviteModal() {
		this.createInviteModalActive = true;
	}

	createInviteModalClose() {
		this.createInviteModalActive = false;

		// Reset state
		setTimeout(() => (this.createInviteState = CreateInviteState.Create), 100);
	}

	copyInviteCode() {
		try {
			utils.copyText(routes.groupInvite.build({ code: this.inviteCode }));
			this.inviteCodeCopyResult = 'Copied!';
		} catch (err) {
			logging.error('Unable to copy', err);
			this.inviteCodeCopyResult = 'Failed to copy.';
		}

		// Reset result animation
		if (this.inviteCodeCopyResultElement) {
			this.inviteCodeCopyResultElement.style.display = 'none';
			this.inviteCodeCopyResultElement.offsetHeight;
			this.inviteCodeCopyResultElement.style.display = '';
		}

		// Stop animation from restarting
		window.clearTimeout(this.inviteCodeCopyResultTimeout);
		this.inviteCodeCopyResultTimeout = window.setTimeout(() => {
			this.inviteCodeCopyResult = '';
		}, 1200);
	}

	buildBackButton() {
		// If back navigation is possible, use function rather than link
		if (UIRouter.shared.canGoBack) {
			return html` <stylized-button
				icon="solid/play"
				.trigger=${this.navigateBack.bind(this)}
				id="nav-back"
				small
				color="rgba(0, 0, 0, 0.5)"
				text="white"
				noshadow
			>
				Back
			</stylized-button>`;
		} else {
			return null;
		}
	}

	navigateBack() {
		UIRouter.shared.navBack();
	}
}
