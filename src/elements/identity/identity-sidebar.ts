import { customElement, html, LitElement, property, PropertyValues, TemplateResult } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../utils/css';
import styles from './identity-sidebar.scss';
import global from '../../utils/global';
import { showJoinRequestContextMenu } from '../../ui/helpers';

import * as api from '../../utils/api';
import routes from '../../routes';
import { globalEventGroups, PartyUpdateEvent } from '../../utils/global-events';

interface IdentityAction {
	inviteToParty?: true;
	openEditModal?: true;
	resolveBetaJoinRequest?: { resolution: boolean };
}

export class IdentityActionEvent extends Event {
	constructor(public action: IdentityAction) {
		super('event');
	}
}

@customElement('identity-sidebar')
export default class IdentitySidebar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean, attribute: 'not-found' })
	profileNotFound: boolean;

	@property({ type: Object })
	profile?: api.identity.IdentityProfile;

	@property({ type: Boolean, attribute: 'in-chat' })
	inChat: boolean = false;

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

	inviteToParty() {
		this.dispatchEvent(new IdentityActionEvent({ inviteToParty: true }));
	}

	resolveBetaJoinRequest(resolution: boolean) {
		this.dispatchEvent(new IdentityActionEvent({ resolveBetaJoinRequest: { resolution } }));
	}

	openEditModal() {
		this.dispatchEvent(new IdentityActionEvent({ openEditModal: true }));
	}

	render() {
		let mutualFriends: api.identity.IdentityHandle[] = [];
		let actions = this.renderActions();

		return html`<div id="base">
			<slot name="extras"></slot>

			<!-- Actions -->
			${actions.length
				? html`<info-panel-body id="actions" noindent>${actions}</info-panel-body>`
				: null}

			<!-- About -->
			<info-panel-header>
				<div slot="title">Bio</div>
			</info-panel-header>

			<info-panel-body id="about">
				${this.profileNotFound ? null : this.renderAbout()}
			</info-panel-body>

			${this.inChat
				? null
				: html`<!-- Join request -->
						${global.currentIdentity.isAdmin ? this.renderBetaJoinRequest() : null}

						<!-- Friends -->
						<info-panel-header>
							<div slot="title">Mutual friends</div>
						</info-panel-header>

						<info-panel-body id="friends">${this.renderFriends(mutualFriends)}</info-panel-body>

						<!-- Groups -->
						<info-panel-header>
							<div slot="title">Groups</div>
						</info-panel-header>

						<info-panel-body id="groups" noindent
							>${this.profileNotFound ? null : this.renderGroups()}</info-panel-body
						>`}
		</div>`;
	}

	renderActions() {
		if (!this.profile) return [];

		let isSelf = this.profile && global.currentIdentity.id == this.profile.id;

		let actions = [];

		if (isSelf) {
			actions.push(html`<stylized-button
				id="edit-profile"
				icon="solid/user-pen"
				.trigger=${this.openEditModal.bind(this)}
				>Edit profile</stylized-button
			>`);
		} else {
			if (!this.inChat) {
				actions.push(html`<stylized-button
					icon="solid/message"
					href=${routes.identityDirectChat.build({
						id: this.profile.id
					})}
					>Message</stylized-button
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
						>Invite to party</stylized-button
					>`);
				}
			} else {
				actions.push(html`<stylized-button .trigger=${this.inviteToParty.bind(this)}
					>Create party</stylized-button
				>`);
			}

			// actions.push(html`<stylized-button icon="solid/user-plus">Add friend</stylized-button>`);
		}

		return actions;
	}

	renderAbout() {
		if (!this.profile) return html`<loading-placeholder-text></loading-placeholder-text>`;

		// Get bio
		let bio: TemplateResult;
		if (this.profile.bio) {
			bio = html`<div id="bio-text">${this.profile.bio}</div>`;
		} else {
			bio = html`<div class="details-text">${this.profile.displayName} has not set a bio.</div>`;
		}

		return html`
			<!-- Bio -->
			${bio}

			<!-- Join Date -->
			<div class="details-text">
				Joined <date-display .timestamp=${this.profile.joinTs}></date-display>
			</div>
		`;
	}

	renderFriends(mutualFriends: api.identity.IdentityHandle[]) {
		if (this.profile) {
			if (mutualFriends.length) {
				return repeat(
					mutualFriends,
					u => u.id,
					u => html`<identity-tile class="friend" .identity=${u}></identity-tile>`
				);
			} else return html`<p>No mutual friends in common</p>`;
		} else return null;
	}

	renderBetaJoinRequest() {
		if (!this.profile) return null;
		if (this.profile.devState != api.identity.IdentityDevState.PENDING) return null;

		return html`
			<info-panel-header>
				<div slot="title">Beta Join Request</div>
			</info-panel-header>

			<info-panel-body id="beta-join-request">
				<identity-tile
					.identity=${this.profile}
					@contextmenu=${showJoinRequestContextMenu(
						this.profile,
						this.resolveBetaJoinRequest.bind(this)
					)}
				>
					<div slot="right" class="join-request-actions">
						<icon-button
							custom
							src="solid/check"
							.trigger=${this.resolveBetaJoinRequest.bind(this, true)}
						></icon-button>
						<icon-button
							custom
							src="solid/xmark"
							.trigger=${this.resolveBetaJoinRequest.bind(this, false)}
						></icon-button>
					</div>
				</identity-tile>
			</info-panel-body>
		`;
	}

	renderGroups() {
		if (this.profile) {
			if (this.profile.groups && this.profile.groups.length) {
				return html`<div>${repeat(
					this.profile.groups,
					group => group.group.id,
					group => html`<group-handle-tile class="group" .group=${group.group}></group-handle-tile>`
				)}</div>`;
			} else {
				return html`<p class="no-content">
					<b>${this.profile.displayName}</b> is not in any groups
				</p>`;
			}
		} else return null;
	}
}
