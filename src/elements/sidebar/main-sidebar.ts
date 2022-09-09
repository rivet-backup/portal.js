import { LitElement, html, customElement, property, query } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../utils/css';
import styles from './main-sidebar.scss';
import routes from '../../routes';
import IdentityStatusController from './identity-status-controller';
import global from '../../utils/global';
import * as api from '../../utils/api';

import logging from '../../utils/logging';
import assets from '../../data/assets';
import { showChatThreadContextMenu } from '../../ui/helpers';
import { globalEventGroups, ThreadUpdateEvent, ThreadReadEvent, IdentityChangeEvent } from '../../utils/global-events';
import { getMessageBody } from '../../utils/chat';

export const CHAT_THREAD_HISTORY = 64;

export const enum MainMenuItem {
	ARCADE = 'arcade',
	GROUPS = 'groups',
	DEVELOPER = 'developer'
}

export type MenuItem =
	| { kind: 'MainMenu'; content: { item: MainMenuItem } }
	| { kind: 'Direct'; content: { otherIdentityId: string } }
	| { kind: 'Group'; content: { groupId: string } }
	| { kind: 'Party'; content: { partyId: string } };

@customElement('main-sidebar')
export default class MainSidebar extends LitElement {
	static styles = cssify(styles);

	@query('identity-status-controller')
	identityStatus: IdentityStatusController;

	@property({ type: Object })
	activeMenu: MenuItem = null;

	@property({ type: Object })
	unreadMessages: Map<string, number> = new Map();

	@property({ type: Object })
	chatsLoadError?: any = null;

	/// === EVENTS ===
	handleIdentityChange: (e: IdentityChangeEvent) => void;
	handleThreadUpdate: (e: ThreadUpdateEvent) => void;
	handleThreadRead: (e: ThreadReadEvent) => void;

	async connectedCallback() {
		super.connectedCallback();

		this.handleIdentityChange = this.onIdentityChange.bind(this);
		globalEventGroups.add('identity-change', this.handleIdentityChange);

		this.handleThreadUpdate = this.onThreadUpdate.bind(this);
		globalEventGroups.add('thread-update', this.handleThreadUpdate);
		

		// Handle thread read (from a chat-view)
		this.handleThreadRead = this.onThreadRead.bind(this);
		globalEventGroups.add('thread-read', this.handleThreadRead);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		globalEventGroups.remove('thread-update', this.handleThreadUpdate);
		globalEventGroups.remove('thread-read', this.handleThreadRead);
	}

	onIdentityChange() {
		this.requestUpdate();
	}

	onThreadRead() {
		this.requestUpdate();
	}

	onThreadUpdate() {
		this.requestUpdate();
	}

	render() {
		let isRegistered = global.currentIdentity.isRegistered;

		// Create menu items
		let menuItems: { id: MainMenuItem; name: string; url: string; icon: string }[] = [
			{ id: MainMenuItem.ARCADE, name: 'Arcade', url: routes.arcade.build({}), icon: 'regular/gamepad' }
			// { id: MainMenuItem.GROUPS, name: 'Groups', url: routes.groups.build({}), icon: 'regular/identity-group' },
		];
		if (global.currentIdentity.groups.findIndex(x => x.group.isDeveloper) != -1) {
			menuItems.push({
				id: MainMenuItem.DEVELOPER,
				name: 'Developer',
				url: routes.devDashboard.build({}),
				icon: 'regular/square-code'
			});
		}

		return html`
			<div id="base">
				<!-- Scrolling Content -->
				<div id="scroller">
					<!-- Logo -->
					<a id="main-logo" href=${routes.root.build({})}>
						<e-svg src="logo/logo-small" class="logo-icon" preserve></e-svg>
					</a>

					<!-- Identity Status -->
					<identity-status-controller></identity-status-controller>

					<!-- Registration Banner -->
					${!isRegistered ? html`<registration-banner></registration-banner>` : null}

					<!-- Search Bar -->
					<search-bar></search-bar>

					<!-- Menu Items -->
					${repeat(
						menuItems,
						m => m.id,
						item => html`
							<sidebar-button
								href=${item.url}
								.isActive=${this.activeMenu &&
								this.activeMenu.kind == 'MainMenu' &&
								item.id === this.activeMenu.content.item}
							>
								<e-svg slot="icon" src=${item.icon}></e-svg>
								<h1 slot="title">${item.name}</h1>
							</sidebar-button>
						`
					)}

					<!-- Social Header -->
					<sidebar-header id="social-header">
						<div slot="title">Social</div>
						<!-- <stylized-button slot="action" icon="regular/party-horn" small>Create Party</stylized-button> -->
					</sidebar-header>

					<!-- Chats -->
					<div id="chat-list">
						${global.recentThreads.length == 0
							? html` <div id="no-chats">
									<lazy-img
										id="icon"
										src=${assets.asset('graphics/chat-bubble.png')}
									></lazy-img>
									<p>
										<a href="null">Invite Friends</a> or
										<a href="${routes.groups.build({})}">join a group</a> to start
										chatting
									</p>
							  </div>`
							: html`<div>
									${repeat(
										[...global.recentThreads].reverse(),
										c => c.id,
										c => this.renderThread(c)
									)}
							  </div>`}
						${this.chatsLoadError ? html`<p id="error">Error loading chats</p>` : null}
					</div>
				</div>
			</div>
		`;
	}

	renderThread(thread: api.identity.ChatThread) {
		// Handle the context
		if (thread.topic.group) {
			let groupHandle = thread.topic.group.group;
			let isActive =
				this.activeMenu &&
				this.activeMenu.kind == 'Group' &&
				this.activeMenu.content.groupId == groupHandle.id;

			return html`
				<social-sidebar-button
					class="thread"
					href=${routes.groupChat.build({ id: groupHandle.id })}
					.isActive=${isActive}
					@contextmenu=${showChatThreadContextMenu({ groupId: groupHandle.id })}
				>
					<group-avatar slot="icon" .group=${groupHandle}></group-avatar>
					<div slot="content">
						<h1 class="sidebar-button-title thread">${groupHandle.displayName}</h1>

						<h2 class="sidebar-button-subtitle">
							${thread.tailMessage.body.text
								? html`
										<span class="message-prefix"
											>${thread.tailMessage.body.text.sender.id ==
											global.currentIdentity.id
												? 'You'
												: html`<identity-name
														.identity=${thread.tailMessage.body.text.sender}
														no-link
												  ></identity-name>`}:&nbsp;</span
										>
										<br />
										<rich-text
											class="message-text"
											inline
											.content=${thread.tailMessage.body.text.body}
										></rich-text>
								  `
								: html`<span class="message-body"
										>${getMessageBody(thread.tailMessage)}</span
								  >`}
						</h2>
					</div>
					${global.currentThread && thread.id == global.currentThread && global.currentThreadActive
						? null
						: thread.unreadCount
						? html`<div slot="badge">
								${thread.unreadCount > 99 ? '99+' : thread.unreadCount}
						  </div>`
						: null}
				</social-sidebar-button>
			`;
		} else if (thread.topic.direct) {
			let directChat = thread.topic.direct;
			let otherIdentity =
				directChat.identityA.id == global.currentIdentity.id
					? directChat.identityB
					: directChat.identityA;
			let isActive =
				this.activeMenu &&
				this.activeMenu.kind == 'Direct' &&
				this.activeMenu.content.otherIdentityId == otherIdentity.id;

			return html`
				<social-sidebar-button
					class="thread"
					href=${routes.identityDirectChat.build({ id: otherIdentity.id })}
					.isActive=${isActive}
					@contextmenu=${showChatThreadContextMenu({ identityId: otherIdentity.id })}
				>
					<identity-avatar slot="icon" .identity=${otherIdentity}></identity-avatar>
					<div slot="content">
						<identity-name
							class="sidebar-button-title"
							.identity=${otherIdentity}
							no-link
						></identity-name>
						<h2 class="sidebar-button-subtitle">
							${thread.tailMessage.body.text
								? html`
										<rich-text
											class="message-text"
											inline
											.content=${thread.tailMessage.body.text.body}
										></rich-text>
								  `
								: html`<span class="message-body"
										>${getMessageBody(thread.tailMessage)}</span
								  >`}
						</h2>
					</div>
					${global.currentThread && thread.id == global.currentThread && global.currentThreadActive
						? null
						: thread.unreadCount
						? html`<div slot="badge">
								${thread.unreadCount > 99 ? '99+' : thread.unreadCount}
						  </div>`
						: null}
				</social-sidebar-button>
			`;
		} else if (thread.topic.party) {
			let partyChat = thread.topic.party.party;
			let isActive =
				this.activeMenu &&
				this.activeMenu.kind == 'Party' &&
				this.activeMenu.content.partyId == partyChat.id;

			let partyIcon = null;
			if (
				partyChat.activity &&
				(partyChat.activity.matchmakerFindingLobby || partyChat.activity.matchmakerLobby)
			) {
				let game =
					partyChat.activity.matchmakerFindingLobby?.game ||
					partyChat.activity.matchmakerLobby?.game;
				partyIcon = html`<div slot="icon" class="game-icon">
					<lazy-img src=${assets.gameLogoUrl(game.nameId)} bg-size="contain"></lazy-img>
				</div>`;
			} else {
				partyIcon = html`<div slot="icon" class="game-icon">
					<e-svg slot="icon" class="game-icon" src="solid/party-horn"></e-svg>
				</div>`;
			}

			return html`
				<social-sidebar-button
					class="thread"
					href=${routes.party.build({ id: partyChat.id })}
					.isActive=${isActive}
					@contextmenu=${showChatThreadContextMenu()}
				>
					${partyIcon}
					<div slot="content">
						<h1 class="sidebar-button-title thread">Party</h1>
						<h2 class="sidebar-button-subtitle">
							${thread.tailMessage.body.text
								? html`<span class="message-prefix"
											>${thread.tailMessage.body.text.sender.id ==
											global.currentIdentity.id
												? 'You'
												: html`<identity-name
														.identity=${thread.tailMessage.body.text.sender}
														no-link
												  ></identity-name>`}:&nbsp;</span
										>
										<br />
										<rich-text
											class="message-text"
											inline
											.content=${thread.tailMessage.body.text.body}
										></rich-text> `
								: html`<span class="message-body"
										>${getMessageBody(thread.tailMessage)}</span
								  >`}
						</h2>
					</div>
					${global.currentThread && thread.id == global.currentThread && global.currentThreadActive
						? null
						: thread.unreadCount
						? html`<div slot="badge">
								${thread.unreadCount > 99 ? '99+' : thread.unreadCount}
						  </div>`
						: null}
				</social-sidebar-button>
			`;
		} else {
			logging.warn('Unable to handle chat', thread);
			return null;
		}
	}
}
