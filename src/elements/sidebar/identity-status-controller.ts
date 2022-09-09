import { LitElement, html, customElement, property, query, PropertyValues } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../utils/css';
import styles from './identity-status-controller.scss';
import {
	showActionSheet,
	showPartyMemberContextMenu,
	showIdentityContextMenu,
	tooltip
} from '../../ui/helpers';
import global from '../../utils/global';
import routes from '../../routes';
import { identityRouteData, padAccountNumber } from '../../data/identity';
import * as api from '../../utils/api';
import logging from '../../utils/logging';
import { globalEventGroups, IdentityChangeEvent, PartyUpdateEvent } from '../../utils/global-events';
import TextInput from '../dev/text-input';
import timing from '../../utils/timing';
import PartyInvitePanel from '../party/invite-panel';
import assets from '../../data/assets';

@customElement('identity-status-controller')
export default class IdentityStatusController extends LitElement {
	static styles = cssify(styles);

	@query('#invite-input')
	inviteInputElement: TextInput;

	@query('party-invite-panel')
	invitePanel: PartyInvitePanel;

	@property({ type: Boolean })
	inviteModalActive: boolean = false;
	@property({ type: String })
	createdInviteToken: string = null;

	/// === EVENTS ===
	handleIdentityChange: (e: IdentityChangeEvent) => void;
	handlePartyUpdate: (e: PartyUpdateEvent) => void;

	connectedCallback() {
		super.connectedCallback();

		this.handleIdentityChange = this.onIdentityChange.bind(this);
		globalEventGroups.add('identity-change', this.handleIdentityChange);

		this.handlePartyUpdate = this.onPartyUpdate.bind(this);
		globalEventGroups.add('party-update', this.handlePartyUpdate);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		globalEventGroups.remove('identity-change', this.handleIdentityChange);
		globalEventGroups.remove('party-update', this.handlePartyUpdate);
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);
	}

	onIdentityChange() {
		this.requestUpdate();
	}

	onPartyUpdate() {
		this.requestUpdate();
	}

	async leaveParty() {
		try {
			await global.live.party.leaveParty({});
		} catch (err) {
			logging.error('Error leaving party', err);
		}
	}

	promptStatus(event: PointerEvent) {
		// Get the status selection
		showActionSheet(event.target as HTMLElement, [
			{
				type: 'action',
				label: 'Online',
				icon: 'solid/circle',
				color: 'status-online',
				cb() {
					alert('UNIMPLEMENTED'); /* live.updateStatus("Online"); */
				}
			},
			{
				type: 'action',
				label: 'Away',
				icon: 'regular/circle-dot',
				color: 'status-away',
				cb() {
					alert('UNIMPLEMENTED'); /* live.updateStatus("Away"); */
				}
			},
			{
				type: 'action',
				label: 'Offline',
				icon: 'regular/circle-dashed',
				color: 'status-offline',
				cb() {
					alert('UNIMPLEMENTED'); /* live.updateStatus("Offline"); */
				}
			}
		]);
	}

	async createInvite() {
		try {
			let res = await global.live.party.createPartyInvite({});

			this.createdInviteToken = res.token;
		} catch (err) {
			logging.error(err);
		}
	}

	async kickMember(identityId: string) {
		try {
			await global.live.party.kickMember({ identityId });
		} catch (err) {
			logging.error(err);
		}
	}

	async transferPartyOwnership(identityId: string) {
		try {
			await global.live.party.transferOwnership({ identityId });
		} catch (err) {
			logging.error(err);
		}
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
		let identity = global.currentIdentity;
		let party = global.currentParty;
		let isLeader = party
			? party.members.some(member => member.isLeader && identity.id == member.identity.id)
			: false;

		return html`
			<div id="base">
				<div id="identity-base" @contextmenu=${showIdentityContextMenu(identity)}>
					<a id="link-block" href=${routes.identity.build(identityRouteData(identity))}>
						<!-- Avatar -->
						<identity-avatar .identity=${identity}></identity-avatar>

						<!-- Name -->
						<div id="name">
							<identity-name .identity=${identity} no-link></identity-name>
						</div>
					</a>

					<!-- Actions -->
					<div id="actions">
						<!-- <icon-button src="regular/eye" small color="#888888" .trigger=${this.promptStatus.bind(
							this
						)} @mouseenter=${tooltip('Change Status')}></icon-button> -->
						<icon-button
							src="regular/gear"
							small
							color="#ececec80"
							href=${routes.settings.build({})}
							@mouseenter=${tooltip('Settings')}
						></icon-button>
					</div>
				</div>
				${party != null
					? html` <div id="party-base">
							<div id="party-header">
								<h1><a href=${routes.party.build({ id: party.id })}>Your party</a></h1>
								<div id="party-actions">
									<div id="chat-button">
										<icon-button
											src="solid/message"
											color="#ececec80"
											href=${routes.party.build({ id: party.id })}
											@mouseenter=${tooltip('Open Chat')}
											custom
										></icon-button>
										<!-- <div id="chat-indicator"></div> -->
									</div>
									<icon-button
										custom
										src="solid/arrow-right-from-bracket"
										color="#ececec80"
										.trigger=${this.leaveParty.bind(this)}
										@mouseenter=${tooltip('Leave')}
									></icon-button>
								</div>
							</div>
							<div id="party-members">
								<div id="identity-collection">
									${repeat(
										party.members,
										m => m.identity.id,
										m =>
											html`<identity-avatar
												class="member"
												.identity=${m.identity}
												hide-status
												link
												@contextmenu=${showPartyMemberContextMenu(
													m,
													this.kickMember.bind(this),
													this.transferPartyOwnership.bind(this)
												)}
												@mouseenter=${tooltip(
													`${m.identity.displayName}#${padAccountNumber(
														m.identity.accountNumber
													)}`
												)}
											></identity-avatar>`
									)}
									${isLeader
										? html` <icon-button
												.isDisabled=${party.members.length >= party.partySize}
												class="member-add"
												src="solid/plus"
												custom
												color="#ececec80"
												.trigger=${this.openInviteModal.bind(this)}
												@mouseenter=${tooltip(
													party.members.length >= party.partySize
														? 'Party full'
														: 'Invite'
												)}
										  ></icon-button>`
										: null}
								</div>
							</div>
							${this.renderPartyActivity(party)}
					  </div>`
					: null}
			</div>

			<!-- Invite modal -->
			<drop-down-modal .active=${this.inviteModalActive} @close=${this.inviteModalClose.bind(this)}>
				<modal-body slot="body">
					<party-invite-panel .inviteToken=${this.createdInviteToken}></party-invite-panel>
				</modal-body>
			</drop-down-modal>
		`;
	}

	renderPartyActivity(party: api.party.PartySummary) {
		if (party.activity.idle) {
			return null;
		} else if (party.activity.matchmakerFindingLobby) {
			let game = party.activity.matchmakerFindingLobby.game;

			return html`<a id="party-activity" href=${routes.game.build({ nameId: game.nameId })}>
				${game.bannerUrl
					? html`<lazy-img id="party-activity-bg" src=${game.bannerUrl} bg-size="cover"></lazy-img>`
					: null}
				}
				<lazy-img
					id="game-logo"
					bg-size=${game.logoUrl ? 'contain' : 'cover'}
					src=${game.logoUrl ?? assets.asset('/games/blank/logo.png')}
					@mouseenter=${tooltip(game.displayName)}
				></lazy-img>
				<div id="description">
					<div id="description-title">
						<h2>Finding lobby...</h2>
						<loading-wheel custom></loading-wheel>
					</div>
				</div>
			</a>`;
		} else if (party.activity.matchmakerLobby) {
			let game = party.activity.matchmakerLobby.game;

			return html`<a id="party-activity" href=${routes.game.build({ nameId: game.nameId })}>
				${game.bannerUrl
					? html`<lazy-img id="party-activity-bg" src=${game.bannerUrl} bg-size="cover"></lazy-img>`
					: null}
				}
				<lazy-img
					id="game-logo"
					bg-size=${game.logoUrl ? 'contain' : 'cover'}
					src=${game.logoUrl ?? assets.asset('/games/blank/logo.png')}
					@mouseenter=${tooltip(game.displayName)}
				></lazy-img>
				<div id="description">
					<div id="description-title">
						<h2>${game.displayName}</h2>
					</div>
					<h3>32 left</h3>
				</div>
			</a>`;
		} else {
			logging.warn('Unknown party activity', party.activity);
			return null;
		}
	}
}
