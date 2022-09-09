import { LitElement, html, customElement, property, PropertyValues } from 'lit-element';
import styles from './group-chat.scss';
import { cssify } from '../../utils/css';
import global from '../../utils/global';
import routes, { responses } from '../../routes';
import { showGroupContextMenu } from '../../ui/helpers';
import { groupRouteData } from '../../data/group';
import * as api from '../../utils/api';
import { ChatErrorEvent, ChatInitializationEvent } from '../common/chat-view';
import UIRouter from '../root/ui-router';
import { GroupActionEvent } from '../group/group-sidebar';
import { GroupProfileCache } from '../../data/cache';
import logging from '../../utils/logging';

@customElement('page-group-chat')
export default class GroupChatPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	groupId: string;

	@property({ type: Object })
	loadError?: any = null;

	@property({ type: Boolean })
	isLoading: boolean = true;

	@property({ type: Object })
	profile: api.group.GroupProfile;

	@property({ type: Boolean })
	initializedChat: boolean = false; // True when an identity has just started a new chat

	groupStream: api.RepeatingRequest<api.group.GetGroupProfileCommandOutput> = null;

	async onInitialize(event: ChatInitializationEvent) {
		try {
			await global.live.chat.sendChatMessageWithTopic({
				groupId: this.groupId,
				messageBody: event.messageBody
			});
			this.initializedChat = true;
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	async onChatError(event: ChatErrorEvent) {
		this.loadError = event.chatError;
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		if (changedProperties.has('groupId')) {
			// Clear group
			this.profile = null;
			this.loadError = null;

			this.resetGroupData();
			this.fetchGroup();
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Dispose of the listener
		if (this.groupStream) this.groupStream.cancel();
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
			UIRouter.shared.updateTitle(`Chat – ${this.profile.displayName}`);

			this.isLoading = false;
		});

		this.groupStream.onError(err => {
			logging.error('Request error', err);
			this.loadError = err;
		});
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

		if (action.inviteToParty) this.inviteToParty();
		else if (action.kickMember) this.kickMember(action.kickMember.identityId);
		else if (action.resolveJoinRequest)
			this.resolveJoinRequest(
				action.resolveJoinRequest.identityId,
				action.resolveJoinRequest.resolution
			);
		else logging.warn('Group sidebar event not hooked up', action);
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
							<group-sidebar
								slot="sidebar"
								.profile=${this.profile}
								in-chat
								do-offline-members
								@event=${this.onActionEvent.bind(this)}
							>
								<div slot="extras">
									<group-handle-tile .group=${this.profile}></group-handle-tile>
								</div>
							</group-sidebar>
					  </right-sidebar-layout>`}
			</div>
		`;
	}

	renderChat() {
		let threadId = this.profile.channels[0] ? this.profile.channels[0].threadId : null;

		return html`<chat-view
			slot="body"
			.threadId=${threadId}
			.empty=${threadId == null}
			auto-focus
			@initialize=${this.onInitialize.bind(this)}
			@error=${this.onChatError.bind(this)}
		></chat-view>`;
	}
}
