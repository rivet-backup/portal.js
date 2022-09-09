import { html, TemplateResult } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import UIRoot, { SearchPanelData } from '../elements/root/ui-root';
import routes from '../routes';
import cloud from '@rivet-gg/cloud';
import { AlertOption } from '../elements/overlay/alert-panel';
import { ActionSheetItem } from '../elements/overlay/action-sheet';
import { EmojiItemData } from '../elements/overlay/emoji-picker';
import { identityRouteData } from '../data/identity';
import global from '../utils/global';
import utils from '../utils/utils';
import * as api from '../utils/api';

export interface ChatThreadContextMenu {
	groupId?: string;
	identityId?: string;
}

// TODO: Have this not only return XY, but also orientation so popups can be aligned left, right, top, or bottom
function getPopupPosition(anchor: HTMLElement, width: number, height: number = 0): { x: number; y: number } {
	// x = top, y = left

	// Calculate dimensions
	let windowPadding = 8;
	let clientBox = anchor.getBoundingClientRect();
	let windowWidth = window.innerWidth;
	let windowHeight = window.innerHeight;

	// Determine the initial position
	let pos = {
		x: clientBox.left + clientBox.width / 2 - width / 2,
		y: clientBox.bottom + 8 // Add 8px spacing
	};

	// Switch top top side if needed
	if (pos.y + height > windowHeight - windowPadding) {
		pos.y = clientBox.top - 8 - height;
	}

	// Cap the horizontal position to be within the window
	pos.x = Math.max(pos.x, windowPadding);
	pos.x = Math.min(pos.x, windowWidth - windowPadding - width);

	return pos;
}

/// Helper function that returns a closure that can be passed to `mouseenter` to show a tooltip when hovered and
/// automatically binds the `mouseleave` event to hide the tooltip.
export function tooltip(text: string): (e: Event) => void {
	return (event: Event) => {
		let element = event.currentTarget as HTMLElement;

		// Show tooltip
		let elementRect = element.getBoundingClientRect();
		let isTop = window.innerHeight - elementRect.bottom < 50; // Show on top if close to screen bottom
		UIRoot.shared.showTooltip(
			elementRect.left + elementRect.width / 2,
			isTop ? elementRect.top - 5 : elementRect.bottom + 5,
			isTop,
			text
		);

		// Add hide event; we register click, since that may cause the tooltip to disappear on an action
		const hideTooltip = () => {
			UIRoot.shared.hideTooltip();

			element.removeEventListener('mouseleave', hideTooltip);
			element.removeEventListener('click', hideTooltip);
		};
		element.addEventListener('mouseleave', hideTooltip, { once: true });
		element.addEventListener('click', hideTooltip, { once: true });
	};
}

/// Helper function that returns a closure that can be passed to `contextmenu` to show a context menu
/// when right clicked and automatically binds the `focusout` event to hide the context menu.
export function showIdentityContextMenu(identity: api.identity.IdentityHandle): (e: MouseEvent) => void {
	return (event: MouseEvent) => {
		let xPos = event.clientX > window.innerWidth - 200 ? event.clientX - 200 : event.clientX;
		// TODO: Calculates the height of the context menu manually, should be automated
		let ctxHeight = 5 * 0 + 29 * 1;
		let yPos =
			event.clientY > window.innerHeight - ctxHeight - 10 ? event.clientY - ctxHeight : event.clientY;

		// Check if this identity is the current identity
		let isSelf = false;
		if (identity.id == global.currentIdentity.id) {
			isSelf = true;
			ctxHeight = 29;
		}

		// Context menu is too tall
		if (yPos < 0) yPos = 5;

		let unimp = () => alert('UNIMPLEMENTED');

		// Show contextmenu
		UIRoot.shared.showContextMenu(
			xPos,
			yPos,
			html`
				<context-action href=${routes.identity.build(identityRouteData(identity))}
					>View profile</context-action
				>
				${!isSelf
					? html`<context-action
								href=${routes.identityDirectChat.build(identityRouteData(identity))}
								>Send message</context-action
							>
							<!-- <div class="spacer"></div>
							<context-action @click=${unimp}>Send friend request</context-action>
							<context-action color="#DB3737" @click=${unimp}>Block</context-action>
							<div class="spacer"></div>
							<context-action @click=${unimp}>Invite to party</context-action>
							<context-action @click=${unimp}>Invite to group</context-action> -->`
					: null}
			`
		);

		// Stop default context menu from being enabled
		event.preventDefault();
		event.stopPropagation();
		return false;
	};
}

export function showGroupContextMenu(groupId: string): (e: MouseEvent) => void {
	return (event: MouseEvent) => {
		let xPos = event.clientX > window.innerWidth - 200 ? event.clientX - 200 : event.clientX;
		// TODO: Calculates the height of the context menu manually, should be automated
		let ctxHeight = 5 * 0 + 29 * 1;
		let yPos =
			event.clientY > window.innerHeight - ctxHeight - 10 ? event.clientY - ctxHeight : event.clientY;

		// Context menu is too tall
		if (yPos < 0) yPos = 5;

		let unimp = () => alert('UNIMPLEMENTED');

		// Show contextmenu
		UIRoot.shared.showContextMenu(
			xPos,
			yPos,
			html`<context-action href=${routes.group.build({ id: groupId })}>View profile</context-action>
				<context-action href=${routes.groupChat.build({ id: groupId })}>Open chat</context-action>`
		);

		// Stop default context menu from being enabled
		event.preventDefault();
		event.stopPropagation();
		return false;
	};
}

export function showGroupMemberContextMenu(member: api.group.GroupMember): (e: MouseEvent) => void {
	return (event: MouseEvent) => {
		let xPos = event.clientX > window.innerWidth - 200 ? event.clientX - 200 : event.clientX;
		// TODO: Calculates the height of the context menu manually, should be automated
		let ctxHeight = 5 * 0 + 29 * 1;
		let yPos =
			event.clientY > window.innerHeight - ctxHeight - 10 ? event.clientY - ctxHeight : event.clientY;

		let unimp = () => alert('UNIMPLEMENTED');

		// Show contextmenu
		UIRoot.shared.showContextMenu(
			xPos,
			yPos,
			html`
				<context-action href=${routes.identity.build(identityRouteData(member.identity))}
					>View profile</context-action
				>
				<context-action href=${routes.identityDirectChat.build(identityRouteData(member.identity))}
					>Send message</context-action
				>
				<!-- <div class='spacer'></div>
				<context-action @click=${unimp}>Edit roles</context-action>
				<context-action color='#DB3737' @click=${unimp}>Kick</context-action>
				<context-action color='#DB3737' @click=${unimp}>Ban</context-action>
				<div class='spacer'></div>
				<context-action @click=${unimp}>Send friend request</context-action>
				<context-action color='#DB3737' @click=${unimp}>Block</context-action>
				<div class='spacer'></div>
				<context-action @click=${unimp}>Invite to party</context-action>
				<context-action @click=${unimp}>Invite to group</context-action> -->
			`
		);

		// Stop default context menu from being enabled
		event.preventDefault();
		event.stopPropagation();
		return false;
	};
}

export function showJoinRequestContextMenu(
	identity: api.identity.IdentityHandle,
	cb: (resolution: boolean) => void
): (e: MouseEvent) => void {
	return (event: MouseEvent) => {
		let xPos = event.clientX > window.innerWidth - 200 ? event.clientX - 200 : event.clientX;
		// TODO: Calculates the height of the context menu manually, should be automated
		let ctxHeight = 5 * 1 + 29 * 3;
		let yPos =
			event.clientY > window.innerHeight - ctxHeight - 10 ? event.clientY - ctxHeight : event.clientY;

		// Show contextmenu
		UIRoot.shared.showContextMenu(
			xPos,
			yPos,
			html`
				<context-action href=${routes.identity.build(identityRouteData(identity))}
					>View profile</context-action
				>
				<div class="spacer"></div>
				<context-action @click=${() => cb(true)}>Accept join request</context-action>
				<context-action @click=${() => cb(false)}>Ignore join request</context-action>
			`
		);

		// Stop default context menu from being enabled
		event.preventDefault();
		event.stopPropagation();
		return false;
	};
}

export function showPartyMemberContextMenu(
	member: api.party.PartyMemberSummary,
	kickCb: (identityId: string) => void,
	transferOwnershipCb: (identityId: string) => void
): (e: MouseEvent) => void {
	return (event: MouseEvent) => {
		let xPos = event.clientX > window.innerWidth - 200 ? event.clientX - 200 : event.clientX;
		// TODO: Calculates the height of the context menu manually, should be automated
		let ctxHeight = 5 * 0 + 29 * 1;
		let yPos =
			event.clientY > window.innerHeight - ctxHeight - 10 ? event.clientY - ctxHeight : event.clientY;

		let unimp = () => alert('UNIMPLEMENTED');

		let memberIsSelf = global.currentIdentity.id == member.identity.id;

		// Show contextmenu
		UIRoot.shared.showContextMenu(
			xPos,
			yPos,
			html`
				<context-action href=${routes.identity.build(identityRouteData(member.identity))}
					>View profile</context-action
				>
				${!memberIsSelf && member.isLeader
					? html`<div class="spacer"></div>
							<context-action color="#DB3737" @click=${transferOwnershipCb}
								>Make leader</context-action
							>
							<context-action color="#DB3737" @click=${kickCb}>Kick from party</context-action>`
					: null}
				${!memberIsSelf
					? html`<div class="spacer"></div>
							<context-action @click=${unimp}>Add friend</context-action>
							<!-- <context-action color='#DB3737' @click=${unimp}>Block</context-action>
							<div class='spacer'></div>
							<context-action @click=${unimp}>Invite to group</context-action> -->`
					: null}
			`
		);

		// Stop default context menu from being enabled
		event.preventDefault();
		event.stopPropagation();
		return false;
	};
}

export function showChatThreadContextMenu(config: ChatThreadContextMenu = {}): (e: MouseEvent) => void {
	return (event: MouseEvent) => {
		let xPos = event.clientX > window.innerWidth - 200 ? event.clientX - 200 : event.clientX;
		// TODO: Calculates the height of the context menu manually, should be automated
		let ctxHeight = 5 * 0 + 29 * 1;
		let yPos =
			event.clientY > window.innerHeight - ctxHeight - 10 ? event.clientY - ctxHeight : event.clientY;

		let unimp = () => alert('UNIMPLEMENTED');

		// Show contextmenu
		UIRoot.shared.showContextMenu(
			xPos,
			yPos,
			html`
				${config.identityId
					? html`<context-action href=${routes.identity.build({ id: config.identityId })}
							>View profile</context-action
					  >`
					: null}
				${config.groupId
					? html`<context-action href=${routes.group.build({ id: config.groupId })}
							>View profile</context-action
					  >`
					: null}
				${!config.identityId && !config.groupId
					? html`<p class="muted">No actions available</p>`
					: null}
				<!-- <context-action color='#DB3737' @click=${unimp}>Close chat</context-action> -->
			`
		);

		// Stop default context menu from being enabled
		event.preventDefault();
		event.stopPropagation();
		return false;
	};
}

export function showMessageContextMenu(
	message: api.chat.ChatMessage,
	replyCb: (id: string) => void
): (e: MouseEvent) => void {
	return (event: MouseEvent) => {
		let xPos = event.clientX > window.innerWidth - 200 ? event.clientX - 200 : event.clientX;
		// TODO: Calculates the height of the context menu manually, should be automated
		let ctxHeight = 5 * 0 + 29 * 1;
		let identity: api.identity.IdentityHandle;
		let isOwnMessage = false;

		if (message.body.text) {
			identity = message.body.text.sender;
			ctxHeight += 29;

			if (identity.id == global.currentIdentity.id) {
				isOwnMessage = true;
				ctxHeight += 29;
			}
		}

		let yPos =
			event.clientY > window.innerHeight - ctxHeight - 10 ? event.clientY - ctxHeight : event.clientY;

		let unimp = () => alert('UNIMPLEMENTED');

		// Show contextmenu
		UIRoot.shared.showContextMenu(
			xPos,
			yPos,
			html`
				${identity
					? html`<context-action @click=${() => replyCb(message.id)}
							>Reply to <b>${identity.displayName}</b></context-action
					  >`
					: null}
				<!-- <div class='spacer'></div>
				<context-action color='#DB3737' @click=${unimp}>Delete</context-action> -->
			`
		);

		// Stop default context menu from being enabled
		event.preventDefault();
		event.stopPropagation();
		return false;
	};
}

export function showChannelContextMenu(channel: api.group.GroupChannel): (e: MouseEvent) => void {
	return (event: MouseEvent) => {
		let xPos = event.clientX > window.innerWidth - 200 ? event.clientX - 200 : event.clientX;
		// TODO: Calculates the height of the context menu manually, should be automated
		let ctxHeight = 5 * 0 + 29 * 1;

		let yPos =
			event.clientY > window.innerHeight - ctxHeight - 10 ? event.clientY - ctxHeight : event.clientY;

		let unimp = () => alert('UNIMPLEMENTED');

		// Show contextmenu
		UIRoot.shared.showContextMenu(
			xPos,
			yPos,
			html`
				<p class="muted">No actions available</p>
				<!-- <context-action @click=${unimp}>Mark as read</context-action>
				<context-action @click=${unimp}>Mute channel</context-action>
				<div class='spacer'></div>
				<context-action color='#DB3737' @click=${unimp}>Delete channel</context-action> -->
			`
		);

		// Stop default context menu from being enabled
		event.preventDefault();
		event.stopPropagation();
		return false;
	};
}

export function showLobbyContextMenu(
	lobby: cloud.AnalyticsLobbySummary,
	destroyLobby: () => void,
	visitLogs: () => void
): (e: MouseEvent) => void {
	return (event: MouseEvent) => {
		let codeStyle = styleMap({
			display: 'block',
			padding: '7px 0',
			cursor: 'pointer',
			textAlign: 'center',
			fontSize: '7px',
			color: '#ececec80'
		});
		UIRoot.shared.showContextMenu(
			event.clientX,
			event.clientY,
			html`
				<context-action color="#DB3737" @click="${destroyLobby}}">Destroy</context-action>
				<!-- <context-action @click=${visitLogs}}>Logs</context-action> -->
				<p class="muted">Lobby ID:</p>
				<code style=${codeStyle} @click=${() => utils.copyText(lobby.lobbyId)}>${lobby.lobbyId}</code>
				<p class="muted">Game Mode ID:</p>
				<code style=${codeStyle} @click=${() => utils.copyText(lobby.lobbyGroupId)}
					>${lobby.lobbyGroupId}</code
				>
				<p class="muted">Created:</p>
				<code style=${codeStyle}>${new Date(lobby.createTs).toISOString()}</code>
			`
		);

		// Stop default context menu from being enabled
		event.preventDefault();
		event.stopPropagation();
		return false;
	};
}

/// Creates an alert with multiple given options and returns a promise
/// indicating the index of which option was picked. Should not be used
// with complex HTML, use <drop-down-modal> instead.
export function showAlert(
	title: string,
	details: TemplateResult = null,
	options: AlertOption[] = [{ label: 'Dismiss' }]
) {
	// Show alert
	UIRoot.shared.alertPanelData = { title, details, options };
	UIRoot.shared.alertPanelActive = true;
}

export function showEmojiPicker(anchor: HTMLElement, cb: (item: EmojiItemData) => void) {
	// Set data
	let popupPosition = getPopupPosition(anchor, 294, 370);
	UIRoot.shared.emojiPickerData = {
		x: popupPosition.x,
		y: popupPosition.y,
		cb
	};

	// Focus search after render
	setTimeout(() => UIRoot.shared.emojiPicker && UIRoot.shared.emojiPicker.focusSearch(), 0);
}

export function showSearchPanel(data: SearchPanelData) {
	UIRoot.shared.searchPanelData = data;
	UIRoot.shared.openSearchPanel();
}

export function showEmojiPickerForInput(anchor: HTMLElement, input: HTMLInputElement | HTMLTextAreaElement) {
	// Show picker
	showEmojiPicker(anchor, item => {
		if (input.selectionStart || input.selectionStart == 0) {
			// Insert symbol at cursor
			let startPos = input.selectionStart;
			let endPos = input.selectionEnd;

			// Get the insert text; if there's two emojis with a given base
			// ID, then we need to specify the group too
			let id = item.name;
			let insertText = `:${id}: `; // We add a space afterwards for simplicity

			// Update the value
			input.value =
				input.value.substring(0, startPos) +
				insertText +
				input.value.substring(endPos, input.value.length);
		} else {
			// Insert symbol at end
			input.value += item.symbol;
		}

		input.focus();
	});
}

export function showActionSheet(anchor: HTMLElement, options: ActionSheetItem[]) {
	// Calculate height
	let height = 0;
	for (let option of options) {
		switch (option.type) {
			case 'action':
				height += 52;
			case 'separator':
				height += 1;
		}
	}

	// Set data
	let popupPosition = getPopupPosition(anchor, 216, height);
	UIRoot.shared.actionSheetData = {
		x: popupPosition.x,
		y: popupPosition.y,
		options
	};
}

export function noContextMenu(event: MouseEvent): boolean {
	// Stop default context menu from being enabled
	event.preventDefault();
	event.stopPropagation();

	return false;
}
