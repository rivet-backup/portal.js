import { LitElement, html, customElement, property, PropertyValues } from 'lit-element';
import styles from './identity-direct-chat.scss';

import global from '../../utils/global';
import { responses } from '../../routes';
import { cssify } from '../../utils/css';
import { ChatInitializationEvent } from '../common/chat-view';
import { padAccountNumber } from '../../data/identity';
import UIRouter from '../root/ui-router';
import { ls } from '../../utils/cache';
import { IdentityActionEvent } from '../identity/identity-sidebar';
import { IdentityProfileCache } from '../../data/cache';
import * as api from '../../utils/api';
import logging from '../../utils/logging';

@customElement('page-identity-direct-chat')
export default class IdentityChatPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	identityId: string;

	@property({ type: Object })
	profile?: api.identity.IdentityProfile;

	@property({ type: String })
	threadId: string = null;

	@property({ type: Object })
	loadError: any = null;

	@property({ type: Boolean })
	isLoading: boolean = true;

	@property({ type: Boolean })
	initializedChat: boolean = false; // True when an identity has just started a new chat

	identityStream?: api.RepeatingRequest<api.identity.GetIdentityProfileCommandOutput>;

	async onInitialize(event: ChatInitializationEvent) {
		try {
			await global.live.chat.sendChatMessageWithTopic({
				identityId: this.identityId,
				messageBody: event.messageBody
			});
			this.initializedChat = true;
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		if (changedProperties.has('identityId') || changedProperties.has('initializedChat')) {
			if (!changedProperties.has('initializedChat')) this.isLoading = true;

			// Clear group ID
			this.threadId = null;
			this.loadError = null;

			let cacheKey = `identity-thread-id-${this.identityId}`;
			let cacheThreadId = ls.getString(cacheKey, null);

			if (cacheThreadId) {
				this.threadId = cacheThreadId;
				this.isLoading = false;
			}

			// Fetch direct chat ID
			global.live.chat
				.getIdentityDirectChat({ identityId: this.identityId })
				.then(res => {
					this.threadId = res.threadId ?? null;
					if (this.threadId) ls.setString(cacheKey, this.threadId);

					// Update the title
					UIRouter.shared.updateTitle(
						`Chat – ${res.identity.displayName}#${padAccountNumber(res.identity.accountNumber)}`
					);

					this.isLoading = false;
				})
				.catch((err: any) => (this.loadError = err));

			this.resetIdentityData();
			this.fetchIdentity();
		}
	}

	resetIdentityData() {
		// Remove old identity data
		this.profile = null;
		if (this.identityStream) this.identityStream.cancel();
	}

	async fetchIdentity() {
		this.identityStream = await IdentityProfileCache.watch(this.identityId, profile => {
			this.profile = profile;

			// Update the title
			UIRouter.shared.updateTitle(
				`${this.profile.displayName}#${padAccountNumber(this.profile.accountNumber)}`
			);
		});

		this.identityStream.onError(err => {
			logging.error('Request error', err);
			this.loadError = err;
		});
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
				identityId: this.identityId,
				token: invite.token
			});
		} catch (err) {
			logging.error('Error creating/inviting to party', err);
			this.loadError = err;
		}
	}

	onActionEvent(event: IdentityActionEvent) {
		let action = event.action;

		if (action.inviteToParty) {
			this.inviteToParty();
		} else logging.warn('Identity sidebar event not hooked up', action);
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);
		if (this.isLoading) return null;

		return html`<div id="base">
			${global.isMobile
				? this.renderChat()
				: html`<right-sidebar-layout>
						${this.renderChat()}
						<identity-sidebar
							slot="sidebar"
							in-chat
							.profile=${this.profile}
							@event=${this.onActionEvent.bind(this)}
						>
							<div slot="extras">
								<identity-tile .identity=${this.profile}></identity-tile>
							</div>
						</identity-sidebar>
				  </right-sidebar-layout>`}
		</div>`;
	}

	renderChat() {
		return html`<chat-view
			slot="body"
			.threadId=${this.threadId}
			.empty=${this.threadId == null}
			auto-focus
			@initialize=${this.onInitialize.bind(this)}
		></chat-view>`;
	}
}
