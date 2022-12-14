import { LitElement, html, customElement, property, query, PropertyValues } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import styles from './game-lobbies.scss';
import { repeat } from 'lit-html/directives/repeat';
import global from '../../../utils/global';
import cloud from '@rivet-gg/cloud';
import numbro from 'numbro';
import { responses } from '../../../routes';
import { cssify } from '../../../utils/css';
import utils from '../../../utils/utils';
import { getRegionEmoji } from '../../../utils/emoji';
import { DropDownSelectEvent, DropDownSelection } from '../../dev/drop-down-list';
import { showLobbyContextMenu, tooltip } from '../../../ui/helpers';
import timing from '../../../utils/timing';
import UIRoot from '../../root/ui-root';

@customElement('page-dev-game-lobbies')
export default class DevGameLobbies extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: String })
	namespaceId: string;

	@property({ type: Object })
	namespace: cloud.NamespaceFull = null;

	@property({ type: Object })
	loadError?: any;

	// === SELECTION ===
	@property({ type: Array })
	lobbies: cloud.AnalyticsLobbySummary[] = null;

	@property({ type: Object })
	lobbyGroupSelection: DropDownSelection = null;

	@property({ type: Object })
	regionSelection: DropDownSelection = null;

	@property({ type: Array })
	destroyingLobbies: string[] = [];

	// === REFRESH INFO ===
	intervalID: number = null;
	timerIntervalID: number = null;

	@property({ type: Boolean })
	canRefresh: boolean = true;

	@property({ type: Boolean })
	refreshPaused: boolean = false;

	lastRefresh: number = Date.now();
	@property({ type: String })
	lastRefreshLabel: string = '0s';

	@property({ type: Boolean })
	isLoadingLobbies: boolean = false;

	reqCounter: number = 0;
	successReqCounter: number = 0;

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Request data if namespace id set
		if (changedProperties.has('namespaceId')) {
			this.resetData();
			this.fetchData();
		}
	}

	// === LIFECYCLE ===
	connectedCallback() {
		super.connectedCallback();

		this.resetAutoRefresh();

		this.timerIntervalID = window.setInterval(() => {
			this.lastRefreshLabel = utils.formatDuration(Date.now() - this.lastRefresh, true);
		}, timing.seconds(1));
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		window.clearInterval(this.intervalID);
	}

	resetAutoRefresh() {
		window.clearInterval(this.intervalID);
		this.intervalID = window.setInterval(this.fetchLobbies.bind(this), timing.seconds(15));
	}

	async fetchData() {
		try {
			let reqId = this.reqCounter++;

			let [namespaceRes, lobbiesRes] = await Promise.all([
				await global.cloud.getGameNamespaceById({
					gameId: this.game.id,
					namespaceId: this.namespaceId
				}),
				await global.cloud.getNamespaceAnalyticsMatchmakerLive({
					gameId: this.game.id,
					namespaceId: this.namespaceId
				})
			]);

			// Make sure request is most up to date
			if (reqId >= this.successReqCounter) {
				this.namespace = namespaceRes.namespace;
				this.lobbies = lobbiesRes.lobbies;
				this.lastRefresh = Date.now();

				this.successReqCounter = reqId;
			}
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	async fetchLobbies() {
		this.isLoadingLobbies = true;

		try {
			let lobbiesRes = await global.cloud.getNamespaceAnalyticsMatchmakerLive({
				gameId: this.game.id,
				namespaceId: this.namespaceId
			});

			this.lobbies = lobbiesRes.lobbies;
			this.lastRefresh = Date.now();
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}

		this.isLoadingLobbies = false;
	}

	async refreshLobbies() {
		if (!this.canRefresh) return;

		await this.fetchLobbies();

		this.canRefresh = false;
		this.resetAutoRefresh();

		window.setTimeout(() => {
			this.canRefresh = true;
		}, timing.seconds(5));
	}

	toggleAutoRefresh() {
		this.refreshPaused = !this.refreshPaused;

		if (this.refreshPaused) window.clearInterval(this.intervalID);
		else this.resetAutoRefresh();
	}

	resetData() {
		this.namespace = null;
		this.loadError = null;

		this.requestUpdate();
	}

	changeLobbyGroupSelection(event: DropDownSelectEvent) {
		this.lobbyGroupSelection = event.selection;
	}

	changeRegionSelection(event: DropDownSelectEvent) {
		this.regionSelection = event.selection;
	}

	async destroyLobby(lobbyId: string) {
		UIRoot.shared.hideContextMenu();

		// Destroy the lobby
		this.destroyingLobbies.push(lobbyId);
		this.requestUpdate('destroyingLobbies');
		await new Promise(r => setTimeout(r, 1000));
		await global.cloud.deleteMatchmakerLobby({ gameId: this.game.id, lobbyId });

		// Manually splice the lobby. We don't need to completely refresh.
		this.destroyingLobbies.splice(this.destroyingLobbies.indexOf(lobbyId), 1);
		this.lobbies.splice(
			this.lobbies.findIndex(l => l.lobbyId == lobbyId),
			1
		);
		this.requestUpdate('lobbies');
	}

	async visitLogs(lobbyId: string) {
		UIRoot.shared.hideContextMenu();

		// TODO: Fix routing on logs
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError, true);
		if (this.namespace == null) return this.renderPlaceholder();

		// Game mode filter
		let gameModeOptions = [...new Set(this.lobbies.map(l => l.lobbyGroupNameId))].map(x => ({
			label: x,
			value: x,
			title: x
		}));
		gameModeOptions.unshift({ label: 'All', value: '__ALL__', title: 'All' });

		// Region filter
		let regionOptions: DropDownSelection[] = this.game.availableRegions.map(region => {
			// Get lobby region emoji, default to DO icon if not provided
			let regionIcon = getRegionEmoji(region.universalRegion);

			// Region selection
			let regionTitle = `${region.regionDisplayName}`;
			return {
				template: html`<e-svg class="left-icon" preserve src=${regionIcon}></e-svg>${regionTitle}`,
				title: regionTitle,
				value: region
			};
		});
		regionOptions.unshift({ label: 'All', value: '__ALL__', title: 'All' });

		// Set default filters
		if (this.lobbyGroupSelection == null || this.regionSelection == null) {
			this.lobbyGroupSelection = gameModeOptions[0];
			this.regionSelection = regionOptions[0];
		}

		// Filter lobbies
		let lobbies = Array.from(this.lobbies);
		if (this.lobbyGroupSelection.value != '__ALL__') {
			lobbies = lobbies.filter(a => a.lobbyGroupNameId == this.lobbyGroupSelection.value);
		}
		if (this.regionSelection.value != '__ALL__') {
			lobbies = lobbies.filter(
				a => a.regionId == (this.regionSelection.value as cloud.RegionSummary).regionId
			);
		}

		// Sort by player count descending (and by error)
		lobbies.sort((a, b) => {
			let aErroneous = +(!a.isReady || a.isOutdated);
			let bErroneous = +(!b.isReady || b.isOutdated);

			return aErroneous == bErroneous
				? b.totalPlayerCount - a.totalPlayerCount
				: bErroneous - aErroneous;
		});

		// Aggregate CCU
		let totalCCU = lobbies.reduce((s, a) => s + a.totalPlayerCount, 0);

		// Check if the status column is needed (ready, outdated, closed, or idle)
		let statusRequired = false;
		for (let lobby of lobbies) {
			if (!lobby.isReady || lobby.isOutdated || lobby.isIdle || lobby.isClosed) {
				statusRequired = true;
				break;
			}
		}

		return html`
			<div id="base">
				<div id="right-aligned">
					${this.isLoadingLobbies ? html`<loading-wheel custom></loading-wheel>` : null}
					<p id="timer-label">Updated ${this.lastRefreshLabel} ago</p>
					<icon-button
						class="action-button"
						src=${this.refreshPaused ? 'solid/caret-right' : 'solid/pause'}
						custom
						color="#ececec"
						.trigger=${this.toggleAutoRefresh.bind(this)}
						@mouseenter=${tooltip(`${this.refreshPaused ? 'Resume' : 'Pause'} live mode`)}
					></icon-button>
					<icon-button
						class="action-button"
						src="solid/arrow-rotate-right"
						custom
						color="#ececec"
						.trigger=${this.refreshLobbies.bind(this)}
						.isDisabled=${!this.canRefresh}
						@mouseenter=${tooltip('Refresh now')}
					></icon-button>
				</div>
				<div id="lobbies-header">
					<h2>Lobbies</h2>
					<div id="lobbies-filters">
						<div class="filter">
							<h3>Game mode</h3>
							<drop-down-list
								.selection=${this.lobbyGroupSelection}
								.options=${gameModeOptions}
								@select=${this.changeLobbyGroupSelection.bind(this)}
							></drop-down-list>
						</div>
						<div class="filter">
							<h3>Region</h3>
							<drop-down-list
								.selection=${this.regionSelection}
								.options=${regionOptions}
								@select=${this.changeRegionSelection.bind(this)}
							></drop-down-list>
						</div>
					</div>
				</div>

				<div id="summary">
					<h2 class="title">Summary</h2>

					<div class="stats">
						<h3 class="stat">
							<e-svg src="solid/server"></e-svg>
							${numbro(lobbies.length).format('0,0')}
						</h3>
						<h3 class="stat">
							<e-svg src="solid/user"></e-svg>
							${numbro(totalCCU).format('0,0')}
						</h3>
					</div>
				</div>

				<table id="lobbies-table">
					<tr>
						<th class="short-column">Region</th>
						${statusRequired ? html`<th class="short-column"></th>` : null}
						<th>Game Mode</th>
						<th class="right players-column">Players</th>
						<th class="right">
							Max Players
							${global.isMobile
								? null
								: html`<e-svg
										src="regular/circle-question"
										@mouseenter=${tooltip('Normal/Direct/Party')}
								  ></e-svg>`}
						</th>
						<th class="right">Uptime</th>
					</tr>
					${lobbies.length == 0
						? html`<tr id="no-lobbies">
								<td colspan="${statusRequired ? 6 : 5}">No lobbies found</td>
						  </tr>`
						: null}
					${repeat(
						lobbies,
						l => l.lobbyId,
						(l, i) => this.renderLobby(l, i, statusRequired)
					)}
				</table>
			</div>
		`;
	}

	renderPlaceholder() {
		return html`<div id="placeholder">
			<div id="placeholder-right"><loading-placeholder></loading-placeholder></div>
			<div id="placeholder-controls">
				<loading-placeholder></loading-placeholder><loading-placeholder></loading-placeholder>
			</div>
			<loading-placeholder id="placeholder-summary"></loading-placeholder>
			<loading-placeholder id="placeholder-table-header"></loading-placeholder>
			<loading-placeholder id="placeholder-table-row"></loading-placeholder>
		</div>`;
	}

	renderLobby(l: cloud.AnalyticsLobbySummary, i: number, statusRequired: boolean) {
		// Get lobby region emoji
		let regionData = this.game.availableRegions.find(r => r.regionId == l.regionId);
		let regionIcon = getRegionEmoji(regionData.universalRegion);

		let unregisteredCount = l.totalPlayerCount - l.registeredPlayerCount;
		let unregisteredCountFormatted = numbro(unregisteredCount).format('0,0');

		let errors = [];
		if (!l.isReady) errors.push('Not ready');
		if (l.isOutdated) errors.push('Outdated');
		let error = errors.join(' & ') || null;

		let destroying = this.destroyingLobbies.indexOf(l.lobbyId) != -1;

		let tooltipText = `${regionData.regionDisplayName}`;

		return html` <tr
			class=${classMap({ destroying })}
			@contextmenu=${showLobbyContextMenu(
				l,
				this.destroyLobby.bind(this, l.lobbyId),
				this.visitLogs.bind(this, l.lobbyId)
			)}
		>
			<td>
				<e-svg
					class="region-icon"
					preserve
					src=${regionIcon}
					@mouseenter=${tooltip(tooltipText)}
				></e-svg>
			</td>
			${!l.isReady
				? html`<td>
						<e-svg
							class="error-icon"
							src="solid/triangle-exclamation"
							@mouseenter=${tooltip(error)}
						></e-svg>
				  </td>`
				: l.isOutdated
				? html`<td>
						<e-svg class="error-icon" src="solid/timer" @mouseenter=${tooltip(error)}></e-svg>
				  </td>`
				: l.isClosed
				? html`<td>
						<e-svg
							class="status-icon"
							src="solid/scrubber"
							@mouseenter=${tooltip('Locked')}
						></e-svg>
				  </td>`
				: l.isIdle
				? html`<td>
						<e-svg
							class="status-icon"
							src="solid/circle-pause"
							@mouseenter=${tooltip('Idle')}
						></e-svg>
				  </td>`
				: statusRequired
				? html`<td></td>`
				: null}
			<td>
				<div class="game-mode-display">${l.lobbyGroupNameId}</div>
			</td>
			<td class="right">
				${numbro(l.totalPlayerCount - unregisteredCount).format('0,0')}
				${unregisteredCount > 0
					? html`<span class="unregistered-count" @mouseenter=${tooltip('Unregistered players')}
							>${unregisteredCountFormatted}</span
					  >`
					: null}
			</td>
			<td class="right">
				${numbro(l.maxPlayersNormal).format('0,0')}/${numbro(l.maxPlayersDirect).format(
					'0,0'
				)}/${numbro(l.maxPlayersParty).format('0,0')}
			</td>
			<td class="right">${utils.formatDuration(Date.now() - l.createTs)}</td>
		</tr>`;
	}
}
