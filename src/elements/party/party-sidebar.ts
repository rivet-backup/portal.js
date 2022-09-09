import { customElement, html, LitElement, property, PropertyValues, TemplateResult } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../utils/css';
import styles from './party-sidebar.scss';
import global from '../../utils/global';
import { showPartyMemberContextMenu } from '../../ui/helpers';
import { tooltip } from '../../ui/helpers';

import numbro from 'numbro';
import * as api from '../../utils/api';
import utils from '../../utils/utils';
import routes from '../../routes';
import timing from '../../utils/timing';

interface PartyAction {
	leaveParty?: true;
	inviteIdentity?: true;
	kickMember?: { identityId: string };
	transferOwnership?: true | { identityId: string };
	revokeInvite?: { inviteId: string };
}

export class PartyActionEvent extends Event {
	constructor(public action: PartyAction) {
		super('event');
	}
}

@customElement('party-sidebar')
export default class PartySidebar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	party?: api.party.PartySummary;

	@property({ type: String })
	copiedInviteToken: string = null;

	copyTimeoutId: number = null;

	leaveParty() {
		this.dispatchEvent(new PartyActionEvent({ leaveParty: true }));
	}

	kickMember(identityId: string) {
		this.dispatchEvent(new PartyActionEvent({ kickMember: { identityId } }));
	}

	transferOwnership() {
		this.dispatchEvent(new PartyActionEvent({ transferOwnership: true }));
	}

	inviteIdentity() {
		this.dispatchEvent(new PartyActionEvent({ inviteIdentity: true }));
	}

	revokeInvite(inviteId: string) {
		this.dispatchEvent(new PartyActionEvent({ revokeInvite: { inviteId } }));
	}

	copyLink(token: string) {
		utils.copyText(routes.partyInvite.build({ token }));
		this.copiedInviteToken = token;

		window.clearTimeout(this.copyTimeoutId);
		window.setTimeout(() => {
			this.copiedInviteToken = null;
		}, timing.seconds(1));
	}

	render() {
		let isLeader = this.party
			? this.party.members.some(
					member => member.isLeader && global.currentIdentity.id == member.identity.id
			  )
			: false;

		return html`<div id="base">
			<!-- Actions -->
			${this.party
				? html`<info-panel-header>
							<div slot="title">Actions</div>
						</info-panel-header>
						<info-panel-body id="actions">${this.renderActions(isLeader)}</info-panel-body>`
				: null}

			<!-- Members -->
			<info-panel-header>
				<div slot="title">
					<span id="member-count"
						>${this.party ? numbro(this.party.members.length).format('0,0') : null}</span
					>
					${this.party && this.party.members.length == 1 ? 'Member' : 'Members'}
				</div>
			</info-panel-header>

			<info-panel-body id="members">
				${this.party && this.party.members.length
					? html`<div>
							${repeat(
								this.party.members,
								m => m.identity.id,
								m => this.renderMember(m)
							)}
					  </div>`
					: null}
			</info-panel-body>

			<!-- Invites -->
			${this.party && isLeader && this.party.invites.length
				? html`<info-panel-header>
							<div slot="title">Invites</div>
						</info-panel-header>

						<info-panel-body id="invites">${this.renderInvites()}</info-panel-body>`
				: null}
		</div>`;
	}

	renderActions(isLeader: boolean) {
		let actions = [];

		if (isLeader) {
			actions.push(html`<stylized-button .trigger=${this.inviteIdentity.bind(this)}
				>Invite identity</stylized-button
			>`);

			actions.push(html`<stylized-button
				id="transfer-ownership"
				.trigger=${this.transferOwnership.bind(this)}
				>Transfer ownership</stylized-button
			>`);
		}

		actions.push(html`<stylized-button
			id="leave-button"
			color="#d4393b"
			.trigger=${this.leaveParty.bind(this)}
			>Leave party</stylized-button
		>`);

		return actions;
	}

	renderMember(member: api.party.PartyMemberSummary) {
		return html`<identity-tile
			@contextmenu=${showPartyMemberContextMenu(
				member,
				this.kickMember.bind(this),
				this.transferOwnership.bind(this)
			)}
			.partyState=${member.state}
			.identity=${member.identity}
		>
			<div slot="right">
				${member.isLeader
					? html`<e-svg class="owner" src="solid/crown" @mouseenter=${tooltip('Leader')}></e-svg>`
					: null}
			</div>
		</identity-tile>`;
	}

	renderInvites() {
		return repeat(
			this.party.invites,
			i => i.inviteId,
			invite => {
				return html`<div class="invite">
					<div class="info">
						<h2>Invite</h2>
						<h3>${utils.formatDateLong(invite.createTs)}</h3>
					</div>
					<div class="actions">
						<icon-button
							src=${this.copiedInviteToken == invite.token
								? 'solid/check'
								: 'solid/link-simple'}
							@mouseenter=${this.copiedInviteToken == invite.token
								? null
								: tooltip('Copy Link')}
							.trigger=${this.copyLink.bind(this, invite.token)}
						></icon-button>
						<icon-button
							src="solid/xmark"
							@mouseenter=${tooltip('Revoke')}
							.trigger=${this.revokeInvite.bind(this, invite.inviteId)}
						></icon-button>
					</div>
				</div>`;
			}
		);
	}
}
