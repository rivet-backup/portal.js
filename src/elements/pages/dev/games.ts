import { LitElement, html, customElement, property, query, queryAll, PropertyValues } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { cssify } from '../../../utils/css';
import styles from './games.scss';
import routes, { responses } from '../../../routes';
import global from '../../../utils/global';
import cloud from '@rivet-gg/cloud';
import * as api from '../../../utils/api';
import utils from '../../../utils/utils';
import { showAlert } from '../../../ui/helpers';
import { DropDownSelectEvent, DropDownSelection } from '../../dev/drop-down-list';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../utils/traversable-errors';
import timing, { Debounce } from '../../../utils/timing';
import UIRouter from '../../root/ui-router';

import config from '../../../config';
import { InputUpdateEvent } from '../../dev/text-input';
import assets from '../../../data/assets';
import { CloudDashboardCache } from '../../../data/cache';
import logging from '../../../utils/logging';

@customElement('page-dev-games')
export default class DevGames extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	data: CloudDashboardCache.Payload = null;

	@property({ type: Object })
	loadError?: any;

	// === GROUP COMPONENTS ===
	@property({ type: Boolean })
	groupModalActive: boolean = false;

	@property({ type: String })
	groupDisplayNameValue: string = null;

	@property({ type: Boolean })
	isCreatingGroup: boolean = false;

	devGroupOptions: DropDownSelection[] = [];

	@property({ type: String })
	groupValidationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GROUP);

	@property({ type: Boolean })
	groupIsValid: boolean = false;

	@property({ type: Boolean })
	createGroupHovered: boolean = false;

	// === GAME COMPONENTS ===
	@property({ type: Boolean })
	gameModalActive: boolean = false;

	@property({ type: String })
	gameDisplayNameValue: string = null;
	@property({ type: String })
	gameNameIdValue: string = '';

	gameGroupSelection: DropDownSelection = null;

	@property({ type: Boolean })
	isCreatingGame: boolean = false;

	@property({ type: String })
	gameValidationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME);

	@property({ type: Boolean })
	gameIsValid: boolean = false;

	@property({ type: Object })
	publishNamespaces: Set<string> = new Set();

	gamesStream?: api.RepeatingRequest<cloud.GetGamesCommandOutput>;

	// === DEBOUNCE INFO ===
	validateGameDebounce: Debounce<() => ReturnType<typeof global.cloud.validateGame>>;
	validateGroupDebounce: Debounce<() => ReturnType<typeof global.cloud.validateGroup>>;

	constructor() {
		super();

		this.validateGameDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				let displayName = this.gameDisplayNameValue ?? '';
				let nameId = this.gameNameIdValue.length
					? this.gameNameIdValue
					: utils.convertStringToId(displayName);

				return await global.cloud.validateGame({
					nameId,
					displayName
				});
			},
			completeCb: res => {
				// Save errors
				this.gameValidationErrors.load(res.errors.map(err => err.path));
				this.gameIsValid = this.gameValidationErrors.isEmpty() && this.gameGroupSelection != null;

				// Refresh UI
				this.requestUpdate('gameValidationErrors');
			}
		});
		this.validateGameDebounce.onError(async err => {
			this.loadError = err;
			this.gameIsValid = false;

			if (err.hasOwnProperty('statusText')) this.loadError = await (err as Response).json();
		});

		this.validateGroupDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				let displayName = this.groupDisplayNameValue;

				return await global.cloud.validateGroup({
					displayName
				});
			},
			completeCb: res => {
				// Save errors
				this.groupValidationErrors.load(res.errors.map(err => err.path));
				this.groupIsValid = this.groupValidationErrors.isEmpty();

				// Refresh UI
				this.requestUpdate('groupValidationErrors');
			}
		});
		this.validateGroupDebounce.onError(async err => {
			this.loadError = err;
			this.groupIsValid = false;

			if (err.hasOwnProperty('statusText')) this.loadError = await (err as Response).json();
		});
	}

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		this.fetchData();
	}

	async fetchData() {
		if (this.gamesStream) this.gamesStream.cancel();

		// Fetch events
		this.gamesStream = await CloudDashboardCache.watch(data => {
			this.data = data;
		});

		this.gamesStream.onError(err => {
			logging.error('Request error', err);
			this.loadError = err;
		});

		try {
			let data = await global.cloud.getGames({});

			data.games.sort((a, b) => a.displayName.localeCompare(b.displayName));
			data.groups.sort((a, b) =>
				a.isDeveloper == b.isDeveloper
					? a.displayName.localeCompare(b.displayName)
					: +b.isDeveloper - +a.isDeveloper
			);
			this.data = data;

			this.devGroupOptions = this.data.groups
				.filter(group => group.isDeveloper)
				.map(group => ({
					template: html`<group-handle-tile
						light
						no-link
						.group=${group as any}
						style=${styleMap({ '--font-size': '12px' })}
					></group-handle-tile>`,
					value: group.groupId
				}));

			// Set group selection if only one dev group exists
			if (this.devGroupOptions.length == 1) {
				this.gameGroupSelection = this.devGroupOptions[0];
			}
		} catch (err) {
			this.loadError = err;
		}
	}

	async createGroup() {
		if (!this.groupIsValid) return;

		try {
			let displayName = this.groupDisplayNameValue ?? '';

			let groupRes = await global.live.group.createGroup({
				displayName
			});

			await this.convertGroup(groupRes.groupId);

			this.groupModalClose();
		} catch (err) {
			this.loadError = err;
			this.isCreatingGroup = false;
		}
	}

	openGroupModal() {
		this.groupModalActive = true;
	}

	groupModalClose() {
		this.groupModalActive = false;
	}

	async createGame() {
		if (!this.gameIsValid) return;

		try {
			let displayName = this.gameDisplayNameValue;
			let nameId = this.gameNameIdValue.length
				? this.gameNameIdValue
				: utils.convertStringToId(displayName);

			let res = await global.cloud.createGame({
				nameId,
				displayName,
				developerGroupId: this.gameGroupSelection.value
			});

			this.fetchData();

			this.gameModalClose();

			// Open new game page
			UIRouter.shared.navigate(routes.devGame.build({ gameId: res.gameId }));
		} catch (err) {
			this.loadError = err;
			this.isCreatingGroup = false;
		}
	}

	changeGameGroupSelection(event: DropDownSelectEvent) {
		this.gameGroupSelection = event.selection;
		this.validateGameDebounce.trigger();
	}

	async convertGroup(groupId: string) {
		await global.cloud.convertGroup({ groupId });

		this.fetchData();
	}

	openGameModal(groupId: string) {
		if (this.data.groups.length == 0) {
			showAlert('Cannot create game', html`You cannot create a game before creating a group first.`, [
				{
					label: 'Create A Group',
					cb: this.openGroupModal.bind(this)
				},
				{
					label: 'Dismiss'
				}
			]);
		} else {
			this.gameModalActive = true;
			this.gameGroupSelection = this.devGroupOptions.find(a => a.value == groupId);
		}
	}

	gameModalClose() {
		this.gameModalActive = false;
	}

	gameDisplayNameInput(event: InputUpdateEvent) {
		this.gameDisplayNameValue = event.value;

		this.validateGameDebounce.trigger();
	}

	gameNameIdInput(event: InputUpdateEvent) {
		this.gameNameIdValue = event.value;

		this.validateGameDebounce.trigger();
	}

	groupDisplayNameInput(e: InputEvent) {
		let target = (e.currentTarget || e.target) as HTMLInputElement;

		this.groupDisplayNameValue = target.value;
		this.validateGroupDebounce.trigger();
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		return html`
			<div id="base">
				<!-- Header -->
				<page-header>
					<e-svg src="regular/square-code"></e-svg>
					<h1>Developer Dashboard</h1>
				</page-header>

				<div id="body">${this.data !== null ? this.renderBody() : this.renderPlaceholder()}</div>
			</div>

			${this.renderCreateGroupModal()} ${this.renderCreateGameModal()}
		`;
	}

	renderBody() {
		let games = this.data.games;

		return html`
			${this.data.groups.length
				? html`<div id="groups-list">
						${repeat(
							this.data.groups,
							t => t.groupId,
							t => html`<div class="group">
								<div class="group-header">
									<a href=${routes.group.build({ id: t.groupId })}>
										<group-avatar .group=${t}></group-avatar>
										<h2>${t.displayName}</h2>
									</a>
									${t.isDeveloper
										? html`<stylized-button
												class="billing-button"
												right-icon="solid/arrow-right"
												href=${routes.groupBilling.build({ groupId: t.groupId })}
												>Billing</stylized-button
										  >`
										: html`<stylized-button
												@click=${this.convertGroup.bind(this, t.groupId)}
												>Convert Group</stylized-button
										  >`}
								</div>
								${t.isDeveloper
									? html`<div class="games-list">
											<div
												id="create-game"
												@click=${this.openGameModal.bind(this, t.groupId)}
											>
												<div id="create-game-content">
													<lazy-img
														src=${assets.asset('/games/blank/logo.png')}
													></lazy-img>
													Create a new game
												</div>
											</div>
											${repeat(
												games.filter(g => g.developerGroupId == t.groupId),
												g => g.id,
												g => html`<dev-game-tile .game=${g}></dev-game-tile>`
											)}
									  </div>`
									: html`<p class="muted-text">This group is not a developer group.</p>`}
							</div>`
						)}
				  </div>`
				: null}
			${!config.IS_PROD
				? html`<div
						id="create-group"
						class="placeholder-group"
						@click=${this.openGroupModal.bind(this)}
						@mouseenter=${() => (this.createGroupHovered = true)}
						@mouseleave=${() => (this.createGroupHovered = false)}
				  >
						<div class="placeholder-group-header">
							<loading-placeholder
								.isDisabled=${!this.createGroupHovered}
							></loading-placeholder>
							<loading-placeholder
								.isDisabled=${!this.createGroupHovered}
							></loading-placeholder>
							<loading-placeholder
								.isDisabled=${!this.createGroupHovered}
							></loading-placeholder>
							<loading-placeholder
								.isDisabled=${!this.createGroupHovered}
							></loading-placeholder>
						</div>
						<div class="placeholder-group-body">
							<loading-placeholder
								.isDisabled=${!this.createGroupHovered}
							></loading-placeholder>
							<loading-placeholder
								.isDisabled=${!this.createGroupHovered}
							></loading-placeholder>
						</div>
						<div id="create-group-overlay">
							<e-svg src="solid/plus"></e-svg>
							Create a New Developer Group
						</div>
				  </div>`
				: null}
		`;
	}

	renderPlaceholder() {
		return html`<div id="placeholder">
			<div class="placeholder-group">
				<div class="placeholder-group-header">
					<loading-placeholder></loading-placeholder>
					<loading-placeholder></loading-placeholder>
					<loading-placeholder></loading-placeholder>
					<loading-placeholder></loading-placeholder>
				</div>
				<div class="placeholder-group-body">
					<loading-placeholder></loading-placeholder>
					<loading-placeholder></loading-placeholder>
				</div>
			</div>
			<div class="placeholder-group">
				<div class="placeholder-group-header">
					<loading-placeholder></loading-placeholder>
					<loading-placeholder></loading-placeholder>
					<loading-placeholder></loading-placeholder>
					<loading-placeholder></loading-placeholder>
				</div>
				<div class="placeholder-group-body">
					<loading-placeholder></loading-placeholder>
				</div>
			</div>
		</div>`;
	}

	renderCreateGroupModal() {
		let errors = this.groupValidationErrors.findFormatted();

		let previewClasses = classMap({
			active: errors.length > 0
		});

		return html`<drop-down-modal
			id="create-group-modal"
			?active=${this.groupModalActive}
			@close=${this.groupModalClose.bind(this)}
		>
			<modal-body slot="body">
				<h1>Create your developer group</h1>
				<div id="preview" class=${previewClasses}>
					<div id="profile-icon">
						${utils.getGroupInitials(this.groupDisplayNameValue || 'Group Name')}
					</div>
					<h3>${this.groupDisplayNameValue || 'Group Name'}</h3>
				</div>
				<div class="input-group">
					<h2>Group Name</h2>
					<text-input
						light
						placeholder="Enter a group name..."
						@input=${this.groupDisplayNameInput.bind(this)}
					></text-input>
					${errors.length > 0
						? html`
							<span id="create-group-error">
								<e-svg src="regular/circle-exclamation"></e-svg> ${errors[0]}</li>
							</span>`
						: null}
				</div>
				<stylized-button
					.trigger=${this.createGroup.bind(this)}
					?disabled=${!this.groupIsValid}
					?loading=${this.isCreatingGroup}
					>Create</stylized-button
				>
			</modal-body>
		</drop-down-modal>`;
	}

	renderCreateGameModal() {
		if (!this.data) return null;

		let displayName = this.gameDisplayNameValue;
		let displayNameErrors = this.gameValidationErrors.findFormatted('display-name');
		let nameIdErrors = this.gameValidationErrors.findFormatted('name-id');

		return html` <drop-down-modal
			id="create-game-modal"
			?active=${this.gameModalActive}
			@close=${this.gameModalClose.bind(this)}
		>
			<modal-body slot="body">
				<h1>Create your new game</h1>
				<div class="input-group">
					<h2>Owner Developer Group</h2>
					<drop-down-list
						light
						.options=${this.devGroupOptions}
						.selection=${this.gameGroupSelection}
						@select=${this.changeGameGroupSelection.bind(this)}
					></drop-down-list>
					<h2>Game Display Name</h2>
					<text-input
						light
						placeholder="Enter a game name..."
						@input=${this.gameDisplayNameInput.bind(this)}
					></text-input>
					${displayNameErrors.length > 0
						? html`
							<span id="create-game-error">
								<e-svg src="regular/circle-exclamation"></e-svg> ${displayNameErrors[0]}</li>
							</span>`
						: null}
					<h2>Game Name ID</h2>
					<text-input
						light
						.filter=${(v: string) => v.replace(/[\s\-]+/g, '-').toLowerCase()}
						placeholder=${displayName
							? utils.convertStringToId(displayName)
							: 'Enter a name id...'}
						@input=${this.gameNameIdInput.bind(this)}
					></text-input>
					${nameIdErrors.length > 0
						? html`
							<span id="create-game-error">
								<e-svg src="regular/circle-exclamation"></e-svg> ${nameIdErrors[0]}</li>
							</span>`
						: null}
				</div>
				<p class="content">We’ll walk you though the details of editing your game later.</p>
				<stylized-button
					.trigger=${this.createGame.bind(this)}
					?disabled=${!this.gameIsValid}
					?loading=${this.isCreatingGame}
					>Create</stylized-button
				>
			</modal-body>
		</drop-down-modal>`;
	}
}
