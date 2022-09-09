import { LitElement, html, customElement, property, queryAll, query, PropertyValues } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import styles from './game-logs.scss';
import global from '../../../utils/global';
import cloud from '@rivet-gg/cloud';
import { cache } from 'lit-html/directives/cache';
import routes, { responses } from '../../../routes';
import { cssify } from '../../../utils/css';
import utils, { Deferred } from '../../../utils/utils';
import logging from '../../../utils/logging';
import timing from '../../../utils/timing';
import { LogsSidebarSelectEvent } from '../../dev/dev-game-logs-sidebar';
import { getRegionEmoji } from '../../../utils/emoji';
import { formatExitCodeMessage } from '../../../utils/error-signals';

import * as d3 from 'd3';
import numbro from 'numbro';
import { ChartConfig } from '../../profile/graph-view';
import UIRouter from '../../root/ui-router';

enum LogType {
	StdOut,
	StdErr
}

enum MetricType {
	Cpu,
	Memory,
	MemoryMax
}

interface MetricPoint {
	x: number | Date;
	y: number;
	type: MetricType;
	label: string;
}

const UNKNOWN_REGION = {
	provider: 'unknown',
	providerDisplayName: 'Unknown',
	regionDisplayName: 'Unknown',
	regionId: '00000000-0000-0000-0000-000000000000',
	universalRegion: 0
};

@customElement('page-dev-game-logs')
export default class DevGameLogs extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: String })
	namespaceId: string;

	@property({ type: String })
	lobbyId?: string;

	@property({ type: Array })
	lobbies: cloud.LogsLobbySummary[] = [];

	@property({ type: String })
	selectedLobbyId: string = null;

	@property({ type: Boolean })
	isLoading: boolean = true;

	@property({ type: Boolean })
	moreLobbies: boolean = true;

	@property({ type: Number })
	logType: LogType = LogType.StdOut;

	@property({ type: Boolean })
	waterfallEnabled: boolean = false;

	@property({ type: Object })
	loadError?: any;

	@query('#stdout.log-content')
	stdoutLogContent: HTMLElement;

	@query('#stderr.log-content')
	stderrLogContent: HTMLElement;

	@property({ type: Object })
	buttonPromise: Deferred<void> = new Deferred();

	// === LOG CACHE ===
	@property({ type: Boolean })
	loadingLobby: boolean = false;
	@property({ type: Array })
	perfLists: cloud.SvcPerf[] = [];
	@property({ type: Array })
	perfMetrics: cloud.SvcMetrics = null;

	@property({ type: Boolean })
	loadingStdout: boolean = false;
	@property({ type: Array })
	stdoutUrls: string[] = [];
	@property({ type: String })
	stdoutCache: string[] = [];
	@property({ type: Number })
	currentStdoutIndex: number = 0;

	@property({ type: Boolean })
	loadingStderr: boolean = false;
	@property({ type: Array })
	stderrUrls: string[] = [];
	@property({ type: String })
	stderrCache: string[] = [];
	@property({ type: Number })
	currentStderrIndex: number = 0;

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

	async fetchData() {
		this.isLoading = true;

		try {
			// Fetch initial lobbies
			await this.fetchMoreLobbies();

			// Select first lobby
			if (this.lobbies.length && !global.isMobile) this.changeLobbySelection(this.lobbies[0].lobbyId);
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}

		this.isLoading = false;
	}

	// "Load more" button trigger
	async fetchMoreLobbies() {
		let lastLobby = this.lobbies[this.lobbies.length - 1];
		let reqId = this.reqCounter++;

		let data = await global.cloud.listNamespaceLobbies({
			gameId: this.game.id,
			namespaceId: this.namespaceId,
			beforeCreateTs: lastLobby ? lastLobby.createTs : undefined
		});

		// Make sure request is most up to date
		if (reqId >= this.successReqCounter) {
			this.lobbies.push(...data.lobbies);
			this.moreLobbies = !!data.lobbies.length;
			this.buttonPromise.resolve();

			this.successReqCounter = reqId;
		}
	}

	resetData() {
		this.selectedLobbyId = null;
		this.lobbies.length = 0;
		this.waterfallEnabled = false;

		this.resetLobbyData();

		this.requestUpdate();
	}

	resetLobbyData() {
		this.waterfallEnabled = false;
		this.perfLists.length = 0;
		this.loadingStdout = false;
		this.stdoutCache.length = 0;
		this.stdoutUrls.length = 0;
		this.currentStdoutIndex = 0;

		this.loadingStderr = false;
		this.stderrCache.length = 0;
		this.stderrUrls.length = 0;
		this.currentStderrIndex = 0;
	}

	async fetchLobby(lobbyId: string) {
		this.resetLobbyData();
		let lobby = this.lobbies.find(l => l.lobbyId == this.selectedLobbyId);

		try {
			this.loadingLobby = true;

			let data = await global.cloud.getNamespaceLobby({
				gameId: this.game.id,
				namespaceId: this.namespaceId,
				lobbyId
			});

			this.stdoutUrls = data.stdoutPresignedUrls;
			this.currentStdoutIndex = this.stdoutUrls.length - 1;
			this.stdoutCache = Array(this.stdoutUrls.length);

			this.stderrUrls = data.stderrPresignedUrls;
			this.currentStderrIndex = this.stderrUrls.length - 1;
			this.stderrCache = Array(this.stderrUrls.length);

			this.perfLists = data.perfLists;
			this.perfMetrics = data.metrics;

			if (lobby.status.running === undefined) {
				// Fetch first logs
				await Promise.all([this.fetchLog(LogType.StdOut), this.fetchLog(LogType.StdErr)]);

				this.updateComplete.then(async () => {
					// Waiting for this makes sure that the content's scroll height is updated before setting scroll
					// position
					await this.getUpdateComplete();

					// Scroll to bottom
					this.stdoutLogContent.scrollTop = this.stdoutLogContent.scrollHeight;
					this.stderrLogContent.scrollTop = this.stderrLogContent.scrollHeight;

					this.loadingLobby = false;
				});
			}
		} catch (err) {
			logging.error('Request error', err);
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	async fetchLog(logType: LogType) {
		// TODO: Catch errors from this gracefully

		// Don't fetch cached logs
		if (this.stdoutCache[this.currentStdoutIndex] !== undefined) return;

		if (logType == LogType.StdOut) {
			if (this.currentStdoutIndex < 0) return;

			this.loadingStdout = true;
			let url = this.stdoutUrls[this.currentStdoutIndex];
			let res = await fetch(url, { mode: 'cors' });
			let newLog: string;
			if (res.status == 200) {
				newLog = await res.text();
			} else {
				logging.error('failed to load logs', res.status, url);
				newLog = '';
			}
			this.loadingStdout = false;

			// Prepend log
			this.stdoutCache[this.currentStdoutIndex] = newLog;
		} else {
			if (this.currentStderrIndex < 0) return;

			this.loadingStderr = true;
			let res = await fetch(this.stderrUrls[this.currentStderrIndex], { mode: 'cors' });
			let newLog = await res.text();
			this.loadingStderr = false;

			// Prepend log
			this.stderrCache[this.currentStderrIndex] = newLog;
		}
	}

	async changeLogIndex(next: boolean) {
		if (this.logType == LogType.StdOut) {
			if (this.currentStdoutIndex <= 0 && next) return;
			if (this.currentStdoutIndex >= this.stdoutCache.length - 1 && !next) return;

			this.currentStdoutIndex += next ? -1 : 1;
		}

		await this.fetchLog(this.logType);

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the content's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			// Scroll to bottom/top
			if (this.logType == LogType.StdOut)
				this.stdoutLogContent.scrollTop = next ? this.stdoutLogContent.scrollHeight : 0;
			else this.stderrLogContent.scrollTop = next ? this.stderrLogContent.scrollHeight : 0;
		});
	}

	changeLogType(logType: LogType) {
		this.logType = logType;
	}

	toggleWaterfall() {
		this.waterfallEnabled = !this.waterfallEnabled;
	}

	async changeLobbySelection(lobbyId: string) {
		this.selectedLobbyId = lobbyId;

		if (global.isMobile) {
			UIRouter.shared.navigate(
				routes.devLogLobby.build({ gameId: this.game.id, lobbyId: this.selectedLobbyId })
			);
		} else {
			let lobby = this.lobbies.find(l => l.lobbyId == this.selectedLobbyId);

			await this.fetchLobby(lobby.lobbyId);

			// Set initial log type (StdErr if lobby failed)
			if (lobby.status.running === undefined) {
				this.logType = lobby.status.stopped.failed ? LogType.StdErr : LogType.StdOut;
			}
		}
	}

	selectLobby(event: LogsSidebarSelectEvent) {
		this.changeLobbySelection(event.selection);
	}

	render() {
		// Handle lobby not found on mobile and desktop
		let lobby = this.lobbies.find(l => l.lobbyId == (this.selectedLobbyId ?? this.lobbyId));
		if ((global.isMobile ? this.lobbyId : true) && !this.isLoading && !lobby)
			return html`<div id="base" class="no-lobbies"><p class="muted-text">No lobbies found</p></div>`;
		if (this.loadError) return responses.renderError(this.loadError, true);

		return html`
			<div id="base">
				${global.isMobile
					? this.lobbyId
						? this.renderBody(lobby)
						: this.renderSidebar()
					: html`${this.renderSidebar()}${this.renderBody(lobby)}`}
			</div>
		`;
	}

	renderSidebar() {
		return html`<div id="sidebar">
			<dev-game-logs-sidebar
				.game=${this.game}
				.lobbies=${this.lobbies}
				.selectedLobbyId=${this.selectedLobbyId}
				.isLoading=${this.isLoading}
				.moreLobbies=${this.moreLobbies}
				.buttonPromise=${this.buttonPromise}
				@select=${this.selectLobby.bind(this)}
				@load=${this.fetchMoreLobbies.bind(this)}
			></dev-game-logs-sidebar>
		</div>`;
	}

	renderBody(lobby: cloud.LogsLobbySummary) {
		return html`<div id="body">
			${this.isLoading
				? this.renderPlaceholder()
				: this.lobbies.length
				? lobby
					? html`${this.renderMetrics()}${this.renderLog(lobby)}`
					: html` <p class="muted-text">Select a lobby</p> `
				: html` <p class="muted-text">No lobbies found</p> `}
		</div>`;
	}

	renderPlaceholder() {
		return html`<loading-placeholder></loading-placeholder>`;
	}

	renderLog(lobby: cloud.LogsLobbySummary) {
		let statusClasses = classMap({
			active: !!lobby.status.running,
			failed: !!lobby.status.stopped && lobby.status.stopped.failed
		});

		// Get lobby region emoji
		let regionData = this.game.availableRegions.find(r => r.regionId == lobby.regionId) ?? UNKNOWN_REGION;
		let regionIcon = getRegionEmoji(regionData.universalRegion);

		// Classes for log content
		let stdoutClasses = classMap({
			'log-content': true,
			loaded: !this.loadingLobby,
			active: this.logType == LogType.StdOut
		});
		let stderrClasses = classMap({
			'log-content': true,
			loaded: !this.loadingLobby,
			active: this.logType == LogType.StdErr
		});

		// Pagination button classes
		let pageUpClasses = classMap({
			action: true,
			next: true,
			disabled:
				(this.logType == LogType.StdOut ? this.currentStdoutIndex : this.currentStderrIndex) <= 0
		});
		let pageDownClasses = classMap({
			action: true,
			previous: true,
			disabled:
				this.logType == LogType.StdOut
					? this.currentStdoutIndex >= this.stdoutCache.length - 1
					: this.currentStderrIndex >= this.stderrCache.length - 1
		});

		return html`
			<div id="log" class="bordered-area">
				<div class="bordered-area-header">
					<div class="content-header">
						<div class="content-header-left">
							<h2 class="content-header-title">${lobby.lobbyGroupNameId}</h2>
							<h3 id="log-region">
								<e-svg class="region-icon" preserve src=${regionIcon}></e-svg>
								${regionData.regionDisplayName}
							</h3>
							${lobby.status.stopped !== undefined
								? html`
										<h4 id="log-time">
											${utils.formatDateLong(lobby.createTs, true, true)}
											<e-svg src="solid/right-long"></e-svg>
											${utils.formatDateLong(lobby.status.stopped.stopTs, true, true)}
											<b>
												(${utils.formatDuration(
													lobby.status.stopped.stopTs - lobby.createTs,
													true
												)})
											</b>
										</h4>
								  `
								: html`
										<h4 id="log-time">
											${utils.formatDateLong(lobby.createTs, true, true)}
											<e-svg src="solid/right-long"></e-svg>
											now
											<b
												>(${utils.formatDuration(
													Date.now() - lobby.createTs,
													true
												)})</b
											>
										</h4>
								  `}
						</div>
						<div id="header-right">
							<div id="log-status" class=${statusClasses}>
								${formatLobbyStatus(lobby.status).toUpperCase()}
							</div>
							${lobby.status.stopped && lobby.status.stopped.exitCode !== undefined
								? html`
										<div id="log-exit-code">
											EXIT CODE:
											<b>${lobby.status.stopped.exitCode}</b>
											${formatExitCodeMessage(lobby.status.stopped.exitCode)
												? html`
														<div id="log-exit-code-fancy">
															${formatExitCodeMessage(
																lobby.status.stopped.exitCode
															)}
														</div>
												  `
												: null}
										</div>
								  `
								: null}
							${this.perfLists.length != 0
								? html`<icon-button
										id="toggle-waterfall"
										class=${classMap({ active: this.waterfallEnabled })}
										src="solid/chart-waterfall"
										custom
										color=${this.waterfallEnabled ? '#ececec' : '#aaaaaa'}
										.trigger=${this.toggleWaterfall.bind(this)}
								  ></icon-button>`
								: null}
						</div>
					</div>
				</div>
				<div class="bordered-area-body">
					${this.waterfallEnabled
						? html`<perf-waterfall .perfLists=${this.perfLists}></perf-waterfall>`
						: lobby.status.running !== undefined
						? html`
								<div id="log-running">
									<p class="muted-text">
										Cannot show logs of running lobbies.<br />
										<a
											class="link"
											href=${routes.devLobbies.build({ gameId: this.game.id })}
											>Manually terminate a lobby here</a
										>
									</p>
								</div>
						  `
						: html`
								<div id="log-actions">
									<div id="actions-left">
										<div
											class=${classMap({
												action: true,
												selected: this.logType == LogType.StdOut
											})}
											@click=${this.changeLogType.bind(this, LogType.StdOut)}
										>
											stdout
										</div>
										<div
											class=${classMap({
												action: true,
												error: true,
												selected: this.logType == LogType.StdErr
											})}
											@click=${this.changeLogType.bind(this, LogType.StdErr)}
										>
											stderr
										</div>
									</div>
									<div id="actions-right">
										<div id="page-indicator">
											<h4>
												${this.logType == LogType.StdOut
													? Math.max(0, this.currentStdoutIndex)
													: Math.max(0, this.currentStderrIndex)}
											</h4>
										</div>
										<icon-button
											class=${pageUpClasses}
											src="solid/angle-up"
											custom
											color="#ececec"
											.isDisabled=${(this.logType == LogType.StdOut
												? this.currentStdoutIndex
												: this.currentStderrIndex) <= 0}
											.trigger=${this.changeLogIndex.bind(this, true)}
										></icon-button>
										<icon-button
											class=${pageDownClasses}
											src="solid/angle-down"
											custom
											color="#ececec"
											.isDisabled=${this.logType == LogType.StdOut
												? this.currentStdoutIndex >= this.stdoutCache.length - 1
												: this.currentStderrIndex >= this.stderrCache.length - 1}
											.trigger=${this.changeLogIndex.bind(this, false)}
										></icon-button>
									</div>
								</div>
								${(this.logType == LogType.StdOut
									? this.stdoutCache.length
									: this.stderrCache.length) || this.loadingLobby
									? null
									: html`
											<div class="muted-text">
												No ${this.logType == LogType.StdOut ? 'stdout' : 'stderr'}
												logs
											</div>
									  `}
								${cache(html`<code id="stdout" class=${stdoutClasses}
									>${this.stdoutCache[this.currentStdoutIndex]}</code
								>`)}
								${cache(html`<code id="stderr" class=${stderrClasses}
									>${this.stderrCache}</code
								>`)}
								${(this.logType == LogType.StdOut
									? this.loadingStdout
									: this.loadingStderr) || this.loadingLobby
									? html` <loading-wheel id="log-loading"></loading-wheel> `
									: null}
						  `}
				</div>
			</div>
		`;
	}

	renderMetrics() {
		if (!this.perfMetrics) return null;

		let maxMemory =
			Math.max(
				this.perfMetrics.allocatedMemory,
				Math.max(...this.perfMetrics.memory),
				Math.max(...this.perfMetrics.memoryMax)
			) || 1;
		let timestamps = [...Array(this.perfMetrics.cpu.length)].map((_, i) => {
			return new Date(Date.now() - (this.perfMetrics.cpu.length - i) * timing.seconds(15));
		});
		let maxMemoryPercent =
			maxMemory /
				(this.perfMetrics.allocatedMemory == 0 ? maxMemory : this.perfMetrics.allocatedMemory) || 1;

		let maxCpu = Math.max(100, Math.max(...this.perfMetrics.cpu)) || 100;

		let cpuData = this.perfMetrics.cpu.map((d, i) => ({
			x: timestamps[i],
			y: d / 100,
			type: MetricType.Cpu,
			label: `CPU ${numbro(d / 100).format('0.0%')}`
		}));
		let memoryData = [
			...this.perfMetrics.memory.map((d, i) => ({
				x: timestamps[i],
				y: d / maxMemory,
				type: MetricType.Memory,
				label: `MEM ${numbro(d).format('0.0 ib')}`
			})),
			...this.perfMetrics.memoryMax.map((d, i) => ({
				x: timestamps[i],
				y: d / maxMemory,
				type: MetricType.MemoryMax,
				label: `PEAK ${numbro(d).format('0.0 ib')}`
			}))
		] as MetricPoint[];

		let memoryChartConfig = {
			x: d => d.x,
			y: d => d.y,
			z: d => d.type,
			label: d => d.label,
			color: type =>
				type == MetricType.Cpu ? 'turquoise' : type == MetricType.Memory ? '#00b300' : 'orange',
			curve: d3.curveMonotoneX,
			yDomain: [0, maxMemoryPercent]
		} as ChartConfig<MetricPoint, MetricType>;
		let cpuChartConfig = Object.assign({}, memoryChartConfig);
		cpuChartConfig.yDomain = [0, maxCpu / 100];

		let latestCPULabel = numbro(this.perfMetrics.cpu[this.perfMetrics.cpu.length - 1] / 100).format(
			'0.0%'
		);
		let latestMemoryLabel = numbro(this.perfMetrics.memory[this.perfMetrics.memory.length - 1]).format(
			'0.0 ib'
		);
		let latestMemoryMaxLabel = numbro(
			this.perfMetrics.memoryMax[this.perfMetrics.memoryMax.length - 1]
		).format('0.0 ib');
		let allocatedMemoryLabel = numbro(this.perfMetrics.allocatedMemory).format('0.0 ib');

		return html`<div id="metrics" class="bordered-area">
			<div class="bordered-area-header">
				<div class="content-header">
					<div class="content-header-left">
						<h2 class="content-header-title">Live Metrics</h2>
						<div id="legend">
							<div class="key cpu">
								<div class="color"></div>
								<span>CPU <b>${latestCPULabel}</b></span>
							</div>
							<div class="key memory">
								<div class="color"></div>
								<span>Memory <b>${latestMemoryLabel}</b> / ${allocatedMemoryLabel}</span>
							</div>
							<div class="key memory-max">
								<div class="color"></div>
								<span
									>Memory Peak <b>${latestMemoryMaxLabel}</b> /
									${allocatedMemoryLabel}</span
								>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="metrics-body" class="bordered-area-body horizontal">
				<div class="body-cell">
					<graph-view .data=${cpuData} .config=${cpuChartConfig}></graph-view>
				</div>
				<div class="body-separator"></div>
				<div class="body-cell">
					<graph-view .data=${memoryData} .config=${memoryChartConfig}></graph-view>
				</div>
			</div>
		</div>`;
	}
}

export function formatLobbyStatus(status: cloud.LogsLobbyStatus) {
	return status.running !== undefined
		? 'Running'
		: status.stopped
		? status.stopped.failed
			? 'Failed'
			: 'Closed'
		: 'Unknown status';
}
