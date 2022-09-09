import { LitElement, html, customElement, property, TemplateResult, PropertyValues } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../utils/css';
import styles from './identity.scss';
import routes, { responses } from '../../routes';
import UIRouter from '../root/ui-router';
import { GlobalMobileChangeEvent, globalEventGroups } from '../../utils/global-events';
import { showAlert, showIdentityContextMenu, showJoinRequestContextMenu } from '../../ui/helpers';
import global from '../../utils/global';

import { padAccountNumber, identityRouteData } from '../../data/identity';
import assets from '../../data/assets';
import * as api from '../../utils/api';
import { IdentityProfileCache } from '../../data/cache';
import logging from '../../utils/logging';
import { IdentityActionEvent } from '../identity/identity-sidebar';

@customElement('page-identity')
export default class IdentityPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	identityId: string;

	@property({ type: String })
	gameNameId?: string;

	@property({ type: Object })
	profile?: api.identity.IdentityProfile;

	@property({ type: Boolean })
	editModalActive: boolean = false;

	// @property({ type: Array })
	// partyMembers?: string[] = null;

	@property({ type: Object })
	loadError?: any;

	// === EVENT HANDLERS ===
	handleMobile: (e: GlobalMobileChangeEvent) => void;
	identityStream?: api.RepeatingRequest<api.identity.GetIdentityProfileCommandOutput>;

	connectedCallback() {
		super.connectedCallback();

		// Handle mobile change
		this.handleMobile = this.onMobile.bind(this);
		globalEventGroups.add('mobile', this.handleMobile);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Dispose event
		if (this.identityStream) this.identityStream.cancel();

		// Remove event listeners
		globalEventGroups.remove('mobile', this.handleMobile);
	}

	updated(changedProperties: PropertyValues): void {
		super.updated(changedProperties);

		// Request data if category set
		if (changedProperties.has('identityId')) {
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
		// Fetch events
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

	async toggleFollow(active: boolean) {
		alert('UNIMPLEMENTED');
	}

	onMobile() {
		this.requestUpdate();
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

	openEditModal() {
		if (global.currentIdentity.isRegistered) {
			this.editModalActive = true;
		} else {
			showAlert(
				'Account not registered',
				html`Profile editing is only available for registered accounts.`,
				[
					{
						label: 'Dismiss'
					},
					{
						label: 'Register now',
						cb: () => UIRouter.shared.navigate(routes.register.build({}))
					}
				]
			);
		}
	}

	editModalClose() {
		this.editModalActive = false;
	}

	onActionEvent(event: IdentityActionEvent) {
		let action = event.action;

		if (action.inviteToParty) {
			this.inviteToParty();
		} else if (action.openEditModal) {
			this.openEditModal();
		} else if (action.resolveBetaJoinRequest) {
			this.resolveBetaJoinRequest(action.resolveBetaJoinRequest.resolution);
		} else logging.warn('Identity sidebar event not hooked up', action);
	}

	render() {
		let profileNotFound = this.loadError && this.loadError.status == 404;
		if (this.loadError && !profileNotFound) return responses.renderError(this.loadError);

		return global.isMobile ? this.renderMobile(profileNotFound) : this.renderDesktop(profileNotFound);
	}

	renderDesktop(profileNotFound: boolean) {
		let identity = this.profile;

		let backdropUrl = assets.asset('/profile-bg/02. Egg Sour.png');

		return html`
			<profile-layout>
				<div id="banner-bg" slot="banner-bg">
					<lazy-img src=${backdropUrl}></lazy-img>
				</div>

				<!-- Profile info and actions -->
				<div id="banner-center" slot="banner-center">
					${this.buildBackButton()}
					${this.profile
						? html`<identity-avatar
								id="main-avatar"
								shadow
								hide-status
								.identity=${identity}
						  ></identity-avatar>`
						: html`<loading-placeholder id="main-avatar-placeholder"></loading-placeholder>`}
					<div id="main-display-name">
						${this.profile
							? html`<identity-name
									.identity=${identity}
									no-link
									show-number
									inline
							  ></identity-name>`
							: profileNotFound
							? html`<span>Profile not found</span>`
							: html`<loading-placeholder></loading-placeholder>`}
					</div>
				</div>

				<identity-sidebar
					slot="sidebar"
					.profile=${this.profile}
					?not-found=${profileNotFound}
					@event=${this.onActionEvent.bind(this)}
				></identity-sidebar>

				<div slot="body">
					<!-- Games -->
					<info-panel-header>
						<div slot="title">Games</div>
					</info-panel-header>

					<info-panel-body id="games-body" noindent>
						${profileNotFound ? null : this.renderGames()}
					</info-panel-body>
				</div>
			</profile-layout>

			<!-- TODO: Fetch the game instead of using games[0] -->
			${this.profile && this.gameNameId
				? html`<expanded-game-stats
						.identity=${this.profile}
						.game=${this.profile.games[0]}
				  ></expanded-game-stats>`
				: null}

			<!-- Editing modal -->
			<drop-down-modal
				large-animation
				.active=${this.editModalActive}
				@close=${this.editModalClose.bind(this)}
			>
				<identity-profile-edit
					slot="body"
					@close=${this.editModalClose.bind(this)}
				></identity-profile-edit>
			</drop-down-modal>
		`;
	}

	// TODO: Abstract this as a mobile profile layout so it's shared with the group layout
	renderMobile(profileNotFound: boolean) {
		let identity = this.profile;
		let isSelf = this.profile && this.profile.id == global.currentIdentity.id;

		let backdropUrl = assets.asset('/profile-bg/02. Egg Sour.png');

		return html`
			<!-- Profile info and actions -->
			<div id="banner">
				<lazy-img id="backdrop" src=${backdropUrl}></lazy-img>

				<div id="banner-center">
					<icon-button
						id="mobile-nav-back"
						src="regular/chevron-left"
						small
						color="white"
						.trigger=${this.navigateBack.bind(this)}
					></icon-button>

					${this.profile
						? html`<identity-avatar
								id="main-avatar"
								shadow
								hide-status
								.identity=${identity}
						  ></identity-avatar>`
						: html`<loading-placeholder id="main-avatar-placeholder"></loading-placeholder>`}
					<div id="main-display-name">
						${this.profile
							? html`<identity-name
									.identity=${identity}
									no-link
									show-number
									inline
							  ></identity-name>`
							: profileNotFound
							? 'Profile not found'
							: html` <loading-placeholder></loading-placeholder>
									<loading-placeholder></loading-placeholder>`}
					</div>
				</div>
			</div>

			<div id="body">
				<!-- Actions -->
				<info-group-body id="identity-actions">
					${this.profile
						? isSelf
							? html`<stylized-button
									icon="regular/identity-pen"
									id="edit-profile"
									small
									.trigger=${this.openEditModal.bind(this)}
									>Edit profile</stylized-button
							  >`
							: html`<stylized-button
										icon="regular/message"
										small
										href=${routes.identityDirectChat.build({
											id: this.identityId
										})}
										>Message</stylized-button
									>
									<!-- <stylized-button icon="regular/identity-plus" small
										>Add friend</stylized-button
									> -->
									<!-- <stylized-button
										icon="regular/chart-network"
										small
										href="${routes.identityFriends.build(identityRouteData(identity))}"
										>View mutuals</stylized-button
									> -->`
						: html` <loading-placeholder></loading-placeholder>
								<loading-placeholder></loading-placeholder>
								<loading-placeholder></loading-placeholder>`}
				</info-group-body>

				<!-- About -->
				<info-panel-header>
					<div slot="title">Bio</div>
				</info-panel-header>

				<info-panel-body id="about">${this.renderAbout()}</info-panel-body>

				<!-- Groups -->
				<info-panel-header>
					<div slot="title">Groups</div>
				</info-panel-header>

				<info-panel-body id="groups">${this.renderGroups()}</info-panel-body>

				<!-- Games -->
				<info-panel-header>
					<div slot="title">Games</div>
				</info-panel-header>

				<info-panel-body id="games-body" noindent>${this.renderGames()}</info-panel-body>
			</div>

			<!-- TODO: Fetch the game instead of using games[0] -->
			${this.profile && this.gameNameId
				? html`<expanded-game-stats
						.identity=${this.profile}
						.game=${this.profile.games[0]}
				  ></expanded-game-stats>`
				: null}

			<!-- Editing modal -->
			<drop-down-modal
				large-animation
				.active=${this.editModalActive}
				@close=${this.editModalClose.bind(this)}
			>
				<identity-profile-edit
					slot="body"
					.identity=${this.profile}
					@close=${this.editModalClose.bind(this)}
				></identity-profile-edit>
			</drop-down-modal>
		`;
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

	renderGroups() {
		if (this.profile) {
			if (this.profile.groups && this.profile.groups.length) {
				return html`<div>
					${repeat(
						this.profile.groups,
						group => group.group.id,
						group =>
							html`<group-handle-tile class="group" .group=${group.group}></group-handle-tile>`
					)}
				</div>`;
			} else {
				return html`<p class="no-content">
					<b>${this.profile.displayName}</b> is not in any groups
				</p>`;
			}
		} else return null;
	}

	renderGames() {
		if (!this.profile) return null;

		return this.profile.games.length
			? html`<div id="games">
					${repeat(
						this.profile.games,
						game => game.game.id,
						game => html`<game-stats .identity=${this.profile} .data=${game}></game-stats>`
					)}
			  </div>`
			: html`<p class="no-content">
					<b>${this.profile.displayName}</b> has no games on their profile
			  </p>`;
	}

	async resolveBetaJoinRequest(resolution: boolean) {
		try {
			await global.live.portal.resolveBetaJoinRequest({ identityId: this.profile.id, resolution });
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	buildBackButton() {
		// If back navigation is possible, use function rather than link
		if (UIRouter.shared.canGoBack) {
			return html` <stylized-button
				icon="solid/play"
				.trigger=${this.navigateBack.bind(this)}
				id="nav-back"
				small
				color="rgba(0, 0, 0, 0.5)"
				text="white"
				noshadow
			>
				Back
			</stylized-button>`;
		} else {
			return null;
		}
	}

	navigateBack() {
		UIRouter.shared.navBack();
	}
}
