import { customElement, html, LitElement, property, PropertyValues, TemplateResult } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../utils/css';
import styles from './group-sidebar.scss';
import routes from '../../routes';
import global from '../../utils/global';
import { showJoinRequestContextMenu, showGroupMemberContextMenu } from '../../ui/helpers';
import { tooltip } from '../../ui/helpers';

import numbro from 'numbro';
import * as api from '../../utils/api';
import { globalEventGroups, PartyUpdateEvent } from '../../utils/global-events';

interface GroupAction {
	applyForGroup?: true;
	openEditModal?: true;
	inviteToParty?: true;
	kickMember?: { identityId: string };
	leaveGroup?: true;
	transferOwnership?: true;
	resolveJoinRequest?: { identityId: string; resolution: boolean };
	openCreateInviteModal?: true;
}

export class GroupActionEvent extends Event {
	constructor(public action: GroupAction) {
		super('event');
	}
}

// The group actions are BOTH in this element and in the `renderMobile` section of the group page element
@customElement('group-sidebar')
export default class GroupSidebar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	profile?: api.group.GroupProfile;

	@property({ type: Boolean, attribute: 'in-chat' })
	inChat: boolean = false;

	@property({ type: Boolean, attribute: 'do-offline-members' })
	doOfflineMembers: boolean = false;

	// === EVENT HANDLERS ===
	handlePartyUpdate: (e: PartyUpdateEvent) => void;

	connectedCallback() {
		super.connectedCallback();

		this.handlePartyUpdate = this.onPartyUpdate.bind(this);
		globalEventGroups.add('party-update', this.handlePartyUpdate);
	}

	onPartyUpdate() {
		this.requestUpdate();
	}

	applyForGroup() {
		this.dispatchEvent(new GroupActionEvent({ applyForGroup: true }));
	}

	openEditModal() {
		this.dispatchEvent(new GroupActionEvent({ openEditModal: true }));
	}

	inviteToParty() {
		this.dispatchEvent(new GroupActionEvent({ inviteToParty: true }));
	}

	leaveGroup() {
		this.dispatchEvent(new GroupActionEvent({ leaveGroup: true }));
	}

	resolveJoinRequest(identityId: string, resolution: boolean = false) {
		this.dispatchEvent(new GroupActionEvent({ resolveJoinRequest: { identityId, resolution } }));
	}

	transferOwnership() {
		this.dispatchEvent(new GroupActionEvent({ transferOwnership: true }));
	}

	openCreateInviteModal() {
		this.dispatchEvent(new GroupActionEvent({ openCreateInviteModal: true }));
	}

	render() {
		let isOwner = this.profile ? global.currentIdentity.id == this.profile.ownerIdentityId : false;

		let membersList: api.group.GroupMember[] = [];

		if (this.profile) {
			membersList = this.profile.members;

			if (this.doOfflineMembers) {
				// Sort by owner/admin and alphabet
				membersList.sort((a, b) => {
					let isOwnerA = +(a.identity.id == this.profile.ownerIdentityId);
					let isntOfflineA = +(a.identity.presence.status != api.identity.IdentityStatus.OFFLINE);
					let isOwnerB = +(b.identity.id == this.profile.ownerIdentityId);
					let isntOfflineB = +(b.identity.presence.status != api.identity.IdentityStatus.OFFLINE);

					return isOwnerA == isOwnerB
						? isntOfflineB == isntOfflineA
							? a.identity.displayName.localeCompare(b.identity.displayName)
							: isntOfflineB - isntOfflineA
						: isOwnerB - isOwnerA;
				});
			} else {
				// Sort by owner/admin and alphabet
				membersList.sort((a, b) => {
					let isOwnerA = +(a.identity.id == this.profile.ownerIdentityId);
					let isOwnerB = +(b.identity.id == this.profile.ownerIdentityId);

					return isOwnerA == isOwnerB
						? a.identity.displayName.localeCompare(b.identity.displayName)
						: isOwnerB - isOwnerA;
				});
			}
		}

		let actions = this.renderActions();

		return html`<div id="base">
			<slot name="extras"></slot>

			<!-- Actions -->
			${this.profile && actions.length
				? html`<info-panel-body id="actions" noindent>${actions}</info-panel-body>` : null}

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
			${isOwner ? this.renderJoinRequests() : null}

			<!-- Members -->
			<info-panel-header>
				<div slot="title">
					<span id="member-count"
						>${this.profile ? numbro(this.profile.memberCount).format('0,0') : null}</span
					>
					${this.profile && this.profile.memberCount == 1 ? 'Member' : 'Members'}
				</div>
			</info-panel-header>

			<info-panel-body id="members">
				${membersList.length
					? html`<div>
							${repeat(
								membersList,
								m => m.identity.id,
								m => this.renderMember(m)
							)}
					  </div>`
					: null}
			</info-panel-body>
		</div>`;
	}

	renderAbout() {
		if (!this.profile) return html`<loading-placeholder-text></loading-placeholder-text>`;

		if (this.profile.bio) {
			return html`<div id="bio-text">${this.profile.bio}</div>`;
		} else {
			return html`<div class="details-text">${this.profile.displayName} has no bio.</div>`;
		}
	}

	renderActions() {
		if (!this.profile) return [];

		let groupId = this.profile.id;
		let isOwner = this.profile ? global.currentIdentity.id == this.profile.ownerIdentityId : false;
		let notInChat = !this.inChat;

		let actions = [];

		if (!this.profile.isCurrentIdentityMember) {
			if (this.profile.publicity == api.portal.GroupPublicity.OPEN) {
				if (this.profile.isCurrentIdentityRequestingJoin) {
					actions.push(
						html`<stylized-button id="apply-button" disabled
							>Application pending</stylized-button
						>`
					);
				} else {
					actions.push(html`<stylized-button
						id="apply-button"
						.trigger=${this.applyForGroup.bind(this)}
						>Apply</stylized-button
					>`);
				}
			} else {
				actions.push(
					html`<stylized-button id="apply-button" disabled>Applications closed</stylized-button>`
				);
			}
		} else {
			if (notInChat) {
				actions.push(html`<stylized-button
					href=${routes.groupChat.build({
						id: groupId
					})}
					>Open chat</stylized-button
				>`);

				actions.push(html`<stylized-button .trigger=${this.openCreateInviteModal.bind(this)}
					>Create invite</stylized-button
				>`);
			}

			if (global.currentParty) {
				let isLeader = global.currentParty.members.some(
					member => member.isLeader && member.identity.id == global.currentIdentity.id
				);

				if (
					isLeader &&
					!global.currentParty.members.some(member => member.identity.id == this.profile.id)
				) {
					actions.push(html`<stylized-button .trigger=${this.inviteToParty.bind(this)}
						>Send party invite</stylized-button
					>`);
				}
			} else {
				actions.push(
					html`<stylized-button .trigger=${this.inviteToParty.bind(this)}
						>Create group party</stylized-button
					>`
				);
			}

			if (notInChat && this.profile.isDeveloper) {
				actions.push(html`<stylized-button
					href=${routes.groupBilling.build({
						groupId: groupId
					})}
					>View billing</stylized-button
				>`);
			}

			if (notInChat && !isOwner) {
				actions.push(html`<stylized-button
					id="leave-button"
					color="#d93636"
					.trigger=${this.leaveGroup.bind(this)}
					>Leave group</stylized-button
				>`);
			}
		}

		if (notInChat && isOwner) {
			actions.push(html`<stylized-button .trigger=${this.openEditModal.bind(this)}
				>Edit group</stylized-button
			>`);
			actions.push(html`<stylized-button
				id="transfer-ownership"
				.trigger=${this.transferOwnership.bind(this)}
				>Transfer ownership</stylized-button
			>`);
		}

		return actions;
	}

	renderJoinRequests() {
		if (!this.profile.joinRequests.length) return null;

		return html`
			<info-panel-header>
				<div slot="title">
					${numbro(this.profile ? this.profile.joinRequests.length : 0).format('0,0')} Join
					Request${this.profile.joinRequests.length == 1 ? '' : 's'}
				</div>
			</info-panel-header>

			<info-panel-body id="join-requests">
				${repeat(
					this.profile ? this.profile.joinRequests : [],
					jr => jr.identity.id,
					jr => html` <identity-tile
						.identity=${jr.identity}
						@contextmenu=${showJoinRequestContextMenu(
							jr.identity,
							this.resolveJoinRequest.bind(this, jr.identity.id)
						)}
					>
						<div slot="right" class="join-request-actions">
							<icon-button
								custom
								src="solid/check"
								.trigger=${this.resolveJoinRequest.bind(this, jr.identity.id, true)}
							></icon-button>
							<icon-button
								custom
								src="solid/xmark"
								.trigger=${this.resolveJoinRequest.bind(this, jr.identity.id, false)}
							></icon-button>
						</div>
					</identity-tile>`
				)}
			</info-panel-body>
		`;
	}

	renderMember(member: api.group.GroupMember) {
		let isOwner = member.identity.id == this.profile.ownerIdentityId;
		let isAdmin = false;

		return html` <identity-tile
			@contextmenu=${showGroupMemberContextMenu(member)}
			.identity=${member.identity}
			.offlineOpacity=${this.doOfflineMembers}
		>
			<div slot="right">
				${isOwner
					? html`<e-svg class="owner" src="solid/crown" @mouseenter=${tooltip('Owner')}></e-svg>`
					: isAdmin
					? html`<e-svg
							class="admin"
							src="solid/chevrons-up"
							@mouseenter=${tooltip('Admin')}
					  ></e-svg>`
					: null}
			</div>
		</identity-tile>`;
	}
}
