import { LitElement, html, customElement, property, PropertyValues, query } from 'lit-element';
import styles from './party-chat.scss';
import { cssify } from '../../utils/css';

import global from '../../utils/global';
import routes, { responses } from '../../routes';
import * as api from '../../utils/api';
import logging from '../../utils/logging';
import { ChatErrorEvent } from '../common/chat-view';
import { PartyActionEvent } from '../party/party-sidebar';
import { DropDownSelectEvent } from '../dev/drop-down-list';
import UIRouter from '../root/ui-router';
import PartyInvitePanel from '../party/invite-panel';
import timing from '../../utils/timing';
import { PartySummaryCache } from '../../data/cache';

@customElement('page-party-chat')
export default class PartyChatPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	partyId: string;

	@property({ type: Object })
	loadError?: any = null;

	@property({ type: Boolean })
	isLoading: boolean = true;

	@property({ type: Object })
	party: api.party.PartySummary = null;

	@property({ type: Boolean })
	transferModalActive: boolean = false;

	@property({ type: String })
	transferIdentityId: string = null;

	@query('party-invite-panel')
	invitePanel: PartyInvitePanel;

	@property({ type: Boolean })
	inviteModalActive: boolean = false;

	@property({ type: String })
	createdInviteToken: string = null;

	partyStream: api.RepeatingRequest<api.party.GetPartySummaryCommandOutput>;

	async onChatError(event: ChatErrorEvent) {
		this.loadError = event.chatError;
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		if (changedProperties.has('partyId')) {
			// Clear party
			this.party = null;
			this.loadError = null;

			this.resetPartyData();
			this.fetchParty();
		}

		if (changedProperties.has('listCollapsed')) {
			this.requestUpdate();
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Dispose of the listener
		if (this.partyStream) this.partyStream.cancel();
	}

	resetPartyData() {
		// Remove old party data
		this.party = null;
		if (this.partyStream) this.partyStream.cancel();
	}

	async fetchParty() {
		let ctxPartyId = this.partyId;

		// Fetch events
		if (this.partyStream) this.partyStream.cancel();
		this.partyStream = await PartySummaryCache.watch(this.partyId, party => {
			if (this.partyId != ctxPartyId) return;

			this.party = party;
			this.party.invites.sort((a, b) => b.createTs - a.createTs);

			this.isLoading = false;
		});

		this.partyStream.onError(err => {
			logging.error('Request error', err);
			this.loadError = err;
		});
	}

	async kickMember(identityId: string) {
		try {
			await global.live.party.kickMember({ identityId });
		} catch (err) {
			logging.error('Request error', err);
			this.loadError = err;
		}
	}

	async transferPartyOwnership(identityId: string) {
		try {
			await global.live.party.transferOwnership({ identityId });
		} catch (err) {
			logging.error('Request error', err);
			this.loadError = err;
		}

		this.transferModalClose();
	}

	async leaveParty() {
		try {
			await global.live.party.leaveParty({});

			UIRouter.shared.navigate(routes.arcade.build({}));
		} catch (err) {
			logging.error('Error leaving party', err);
		}
	}

	async revokeInvite(inviteId: string) {
		try {
			await global.live.party.revokePartyInvite({ inviteId });
		} catch (err) {
			logging.error('Request error', err);
			this.loadError = err;
		}

		this.transferModalClose();
	}

	async createInvite() {
		try {
			let res = await global.live.party.createPartyInvite({});

			this.createdInviteToken = res.token;
		} catch (err) {
			logging.error(err);
		}
	}

	onActionEvent(event: PartyActionEvent) {
		let action = event.action;

		if (action.transferOwnership) {
			if (typeof action.transferOwnership == 'object')
				this.transferPartyOwnership(action.transferOwnership.identityId);
			else this.openTransferModal();
		} else if (action.leaveParty) this.leaveParty();
		else if (action.kickMember) this.kickMember(action.kickMember.identityId);
		else if (action.inviteIdentity) this.openInviteModal();
		else if (action.revokeInvite) this.revokeInvite(action.revokeInvite.inviteId);
		else logging.warn('Party sidebar event not hooked up', action);
	}

	changeTransferIdentitySelection(event: DropDownSelectEvent) {
		this.transferIdentityId = event.selection.value;
	}

	openTransferModal() {
		this.transferModalActive = true;
	}

	transferModalClose() {
		this.transferModalActive = false;
	}

	async openInviteModal() {
		if (!this.createdInviteToken) await this.createInvite();
		this.inviteModalActive = true;

		// Focus input
		this.updateComplete.then(async () => {
			await this.getUpdateComplete();

			this.invitePanel.focusInput();
		});
	}

	inviteModalClose() {
		this.inviteModalActive = false;
		this.createdInviteToken = null;

		// Clear after animation is complete
		setTimeout(() => {
			if (this.invitePanel) {
				this.invitePanel.clearSearch();
			}
		}, timing.milliseconds(300));
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);
		if (this.isLoading) return null;

		return html`
			<div id="base">
				${global.isMobile
					? this.renderChat()
					: html`<right-sidebar-layout>
							${this.renderChat()}
							<party-sidebar
								slot="sidebar"
								.party=${this.party}
								@event=${this.onActionEvent.bind(this)}
							>
							</party-sidebar>
					  </right-sidebar-layout>`}
			</div>

			${this.renderTransferOwnershipModal()}
			<!-- Invite modal -->
			<drop-down-modal .active=${this.inviteModalActive} @close=${this.inviteModalClose.bind(this)}>
				<modal-body slot="body">
					<party-invite-panel .inviteToken=${this.createdInviteToken}></party-invite-panel>
				</modal-body>
			</drop-down-modal>
		`;
	}

	renderChat() {
		return html`<chat-view
			slot="body"
			.threadId=${this.party.threadId}
			.empty=${this.party.threadId == null}
			auto-focus
			@error=${this.onChatError.bind(this)}
		></chat-view>`;
	}

	renderTransferOwnershipModal() {
		if (!this.party) return null;

		let members = Array.from(this.party.members).filter(m => m.identity.id != global.currentIdentity.id);
		let identityOptions = members.map(m => ({
			template: html`<identity-tile .identity=${m.identity} light hide-status no-link></identity-tile>`,
			value: m.identity.id
		}));

		return html`<drop-down-modal
			id="transfer-ownership-modal"
			?active=${this.transferModalActive}
			@close=${this.transferModalClose.bind(this)}
		>
			<modal-body slot="body">
				<h1>Transfer Ownership</h1>
				<p class="content">
					Are you sure you want to transfer ownership of this party? This action
					<b>CANNOT</b> be undone.
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
					.trigger=${this.transferPartyOwnership.bind(this)}
					?disabled=${this.transferIdentityId == null}
					>Transfer</stylized-button
				>
			</modal-body>
		</drop-down-modal>`;
	}
}
