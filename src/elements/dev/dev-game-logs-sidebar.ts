import { LitElement, html, customElement, property, css } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './dev-game-logs-sidebar.scss';
import { repeat } from 'lit-html/directives/repeat';
import { classMap } from 'lit-html/directives/class-map';
import { tooltip } from '../../ui/helpers';
import cloud from '@rivet-gg/cloud';
import { formatLobbyStatus } from '../pages/dev/game-logs';
import { getRegionEmoji } from '../../utils/emoji';
import timing, { wait } from '../../utils/timing';
import utils, { Deferred } from '../../utils/utils';
import logging from '../../utils/logging';

export class LogsSidebarSelectEvent extends Event {
	constructor(public selection: string) {
		super('select');
	}
}

@customElement('dev-game-logs-sidebar')
export default class DevGameLogsSidebar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Array })
	lobbies: cloud.LogsLobbySummary[] = [];

	@property({ type: String })
	selectedLobbyId: string = null;

	@property({ type: Boolean })
	isLoading: boolean = false;

	@property({ type: Boolean })
	moreLobbies: boolean = true;

	@property({ type: Object })
	buttonPromise: Deferred<void> = null;

	onLobbyClick(lobbyId: string) {
		this.dispatchEvent(new LogsSidebarSelectEvent(lobbyId));
	}

	async loadMore() {
		this.dispatchEvent(new Event('load'));

		this.buttonPromise.reset();
		await this.buttonPromise.promise;
	}

	render() {
		return html`
			<div id="base">
				${this.isLoading
					? html`
							<loading-placeholder></loading-placeholder>
							<loading-placeholder></loading-placeholder>
							<loading-placeholder></loading-placeholder>
					  `
					: html`
							${repeat(this.lobbies, l => l.lobbyId, this.renderLobby.bind(this))}
							${this.moreLobbies
								? html`
										<div id="footer">
											<stylized-button
												color="#595959"
												.trigger=${this.loadMore.bind(this)}
												>Load more</stylized-button
											>
										</div>
								  `
								: null}
					  `}
			</div>
		`;
	}

	renderLobby(lobby: cloud.LogsLobbySummary) {
		let classes = classMap({
			lobby: true,
			selected: lobby.lobbyId == this.selectedLobbyId
		});

		let statusClasses = classMap({
			status: true,
			active: lobby.status.running !== undefined,
			failed: lobby.status.stopped !== undefined && lobby.status.stopped.failed
		});

		// Get lobby region emoji
		let regionData = this.game.availableRegions.find(r => r.regionId == lobby.regionId);
		if (!regionData) {
			logging.warn('missing region data', lobby);
			return null;
		}
		let regionIcon = getRegionEmoji(regionData.universalRegion);

		return html`
			<div class=${classes} @click=${this.onLobbyClick.bind(this, lobby.lobbyId)}>
				<div class="lobby-title">
					<e-svg class="region-icon" preserve src=${regionIcon}></e-svg>
					<h3>${lobby.lobbyGroupNameId}</h3>
				</div>
				<div class=${statusClasses} @mouseenter=${tooltip(formatLobbyStatus(lobby.status))}></div>
			</div>
		`;
	}
}
