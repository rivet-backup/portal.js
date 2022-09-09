import { html } from 'lit-element';
import * as api from '../utils/api';
import logging from './logging';
import global from '../utils/global';
import { ChatActions } from '../elements/common/chat-view';
import { tooltip } from '../ui/helpers';

export function getMessageBody(message: api.chat.ChatMessage, actions?: ChatActions) {
	// Match the message kind
	/* if (message.body.kind.kind == "Custom") {
		let body = message.body.kind.content;
		return html`<div class='identity'><identity-avatar .identity=${body.identity}></identity-avatar><identity-name .identity=${body.sender}></identity-name></div> sent an unsupported message.`;
	} else */
	if (message.body.text) {
		let body = message.body.text;

		return body.body;
	} else if (message.body.chatCreate) {
		return html`Chat created`;
	} else if (message.body.identityFollow) {
		let body = message.body.identityFollow;
		// return html`<div class='identity'><identity-avatar .identity=${body.identity}></identity-avatar><identity-name .identity=${body.identity}></identity-name></div> followed you.`
		return html`TODO: Find the other identity in the chat`;
	} else if (message.body.groupJoin) {
		let body = message.body.groupJoin;
		return html`<div class="identity">
				<identity-avatar .identity=${body.identity} link></identity-avatar
				><identity-name .identity=${body.identity}></identity-name>
			</div>
			joined the group.`;
	} else if (message.body.groupLeave) {
		let body = message.body.groupLeave;
		return html`<div class="identity">
				<identity-avatar .identity=${body.identity} link></identity-avatar
				><identity-name .identity=${body.identity}></identity-name>
			</div>
			left the group.`;
	} else if (message.body.partyJoin) {
		let body = message.body.partyJoin;
		return html`<div class="identity">
				<identity-avatar .identity=${body.identity} link></identity-avatar
				><identity-name .identity=${body.identity}></identity-name>
			</div>
			joined the party.`;
	} else if (message.body.partyLeave) {
		let body = message.body.partyLeave;
		return html`<div class="identity">
				<identity-avatar .identity=${body.identity} link></identity-avatar
				><identity-name .identity=${body.identity}></identity-name>
			</div>
			left the party.`;
	} else if (message.body.partyInvite) {
		let body = message.body.partyInvite;
		let inParty = body.party && global.currentParty && global.currentParty.id == body.party.id;

		return html`<div class="invite">
			Party invite from&nbsp;
			<div class="identity">
				<identity-avatar .identity=${body.sender} link></identity-avatar>
				<identity-name .identity=${body.sender}></identity-name>
			</div>
			${!body.party || !body.inviteToken
				? 'expired.'
				: inParty
				? body.sender.id == global.currentIdentity.id
					? null
					: 'accepted.'
				: html`<icon-button
						src="solid/envelope-open"
						color="#efefef"
						.trigger=${body.party && actions ? () => actions.joinParty(body.inviteToken) : null}
						@mouseenter=${tooltip('Accept')}
				  ></icon-button>`}
		</div>`;
	} else if (message.body.partyActivityChange) {
		let body = message.body.partyActivityChange;

		// TODO: Add back
		// Render event message
		// let event: TemplateResult;
		// if (body.activity.activity != null) {
		// 	// Activity exists
		// 	if (body.activity.activity.kind == "Game") {
		// 		let activityKind = body.activity.activity.content as client.party.GameActivity;
		// 		let gameHref = routes.game.build({ nameId: activityKind.game.nameId });
		// 		event = html`Party is now playing <a href=${gameHref}>${activityKind.game.displayName}</a>.`;
		// 	} else {
		// 		logging.warn("Unknown activity kind", body.activity.activity.kind);
		// 		event = html`?`;
		// 	}
		// } else {
		// 	// No activity
		// 	event = html`Party is now idle.`;
		// }
		//
		// return event;

		return html`TODO`;
	} else {
		logging.error('Unknown message kind', (message.body as any).kind);
		return null;
	}
}
