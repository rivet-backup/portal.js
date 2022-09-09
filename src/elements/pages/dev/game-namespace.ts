import { LitElement, html, customElement, property, queryAll, PropertyValues } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../../utils/css';
import styles from './game-namespace.scss';
import { responses } from '../../../routes';
import global from '../../../utils/global';
import * as cloud from '@rivet-gg/cloud';
import utils from '../../../utils/utils';
import { DropDownSelectEvent, DropDownSelection } from '../../dev/drop-down-list';
import { showAlert, tooltip } from '../../../ui/helpers';
import { styleMap } from 'lit-html/directives/style-map';
import logging from '../../../utils/logging';
import * as uuid from 'uuid';
import { InputChangeEvent } from '../../dev/text-input';
import timing, { Debounce } from '../../../utils/timing';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../utils/traversable-errors';
import { ToggleSwitchEvent } from '../../common/toggle-switch';

const DOMAIN_REGEX = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/;
const PROTOCOL_REGEX = /^\w+:\/\//;

const PORT_PROTOCOLS: DropDownSelection[] = [
	{
		label: 'HTTP',
		value: cloud.ProxyProtocol.HTTP
	},
	{
		label: 'HTTPS',
		value: cloud.ProxyProtocol.HTTPS
	}
];

const LOBBY_COUNT_MAX = 32768 - 1;

@customElement('page-dev-game-namespace')
export default class DevGameNamespace extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: String })
	namespaceId: string;

	@property({ type: Object })
	namespace: cloud.NamespaceFull = null;

	@property({ type: Object })
	version: cloud.VersionFull = null;

	@property({ type: Object })
	loadError?: any;

	// === DEV TOKEN INFO ===
	@property({ type: Boolean })
	devTokenModalActive: boolean = false;

	@property({ type: String })
	devTokenValidationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.DEV_TOKEN);

	@property({ type: Boolean })
	isCreatingDevToken: boolean = false;

	@property({ type: Array })
	devTokenPorts: cloud.LobbyGroupRuntimeDockerPort[] = [
		{
			label: 'default',
			targetPort: 8080,
			proxyProtocol: cloud.ProxyProtocol.HTTP
		}
	];

	@property({ type: Array })
	devTokenPortIds: string[] = [];

	@property({ type: String })
	devTokenHostname: string = '127.0.0.1';

	@queryAll('.port-input > text-input')
	portInputs: HTMLElement[];

	@property({ type: Boolean })
	devTokensValid: boolean = true;

	// === MAX COUNTS INFO ===
	@property({ type: String })
	mmConfigValidationErrors: TraversableErrors = new TraversableErrors(
		VALIDATION_ERRORS.GAME_NAMESPACE_CONFIG
	);

	@property({ type: Boolean })
	mmConfigAreValid: boolean = false;

	@property({ type: Number })
	lobbyCountMax: number = 0;
	@property({ type: Number })
	maxPlayerCountPerClient: number = 0;

	// === DEBOUNCE INFO ===
	validateDevTokenConfigDebounce: Debounce<
		() => ReturnType<typeof global.cloud.validateGameNamespaceTokenDevelopment>
	>;
	validateMmConfigConfigDebounce: Debounce<
		() => ReturnType<typeof global.cloud.validateGameNamespaceMatchmakerConfig>
	>;

	// === CUSTOM DOMAIN INFO ===
	@queryAll('.domain-route text-input')
	domainInputs: HTMLElement[];

	@property({ type: Array })
	domainIds: string[] = [];

	@property({ type: Object })
	savedDomainIndicators: Set<String> = new Set();

	constructor() {
		super();

		this.validateDevTokenConfigDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				return await global.cloud.validateGameNamespaceTokenDevelopment({
					gameId: this.game.id,
					namespaceId: this.namespaceId,
					hostname: this.devTokenHostname,
					lobbyPorts: this.devTokenPorts
				});
			},
			completeCb: res => {
				// Save errors
				this.devTokenValidationErrors.load(res.errors.map(err => err.path));
				this.devTokensValid = this.devTokenValidationErrors.isEmpty();
				this.loadError = null;

				// Refresh UI
				this.requestUpdate('devTokenValidationErrors');
			}
		});
		this.validateDevTokenConfigDebounce.onError(async err => {
			this.loadError = err;
			this.devTokensValid = false;

			if (err.hasOwnProperty('statusText')) this.loadError = await (err as Response).json();
		});

		this.validateMmConfigConfigDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				return await global.cloud.validateGameNamespaceMatchmakerConfig({
					gameId: this.game.id,
					namespaceId: this.namespace.namespaceId,
					lobbyCountMax: this.lobbyCountMax,
					maxPlayers: this.maxPlayerCountPerClient
				});
			},
			completeCb: async res => {
				// Save errors
				this.mmConfigValidationErrors.load(res.errors.map(err => err.path));
				this.mmConfigAreValid = this.mmConfigValidationErrors.isEmpty();
				this.loadError = null;

				// Refresh UI
				this.requestUpdate('mmConfigValidationErrors');

				// Automatically update values if valid
				if (this.mmConfigAreValid) {
					await global.cloud.updateGameNamespaceMatchmakerConfig({
						gameId: this.game.id,
						namespaceId: this.namespace.namespaceId,
						lobbyCountMax: this.lobbyCountMax,
						maxPlayers: this.maxPlayerCountPerClient
					});
				}
			}
		});
		this.validateMmConfigConfigDebounce.onError(async err => {
			this.loadError = err;
			this.devTokensValid = false;

			if (err.hasOwnProperty('statusText')) this.loadError = await (err as Response).json();
		});
	}

	updated(changedProperties: PropertyValues) {
		// Request data if category set
		if (changedProperties.has('namespaceId')) {
			this.resetData();
			this.fetchData();
		}
	}

	resetData() {
		this.namespace = null;
		this.loadError = null;
	}

	async fetchData() {
		try {
			let namespaceRes = await global.cloud.getGameNamespaceById({
				gameId: this.game.id,
				namespaceId: this.namespaceId
			});

			let versionRes = await global.cloud.getGameVersionById({
				gameId: this.game.id,
				versionId: namespaceRes.namespace.versionId
			});

			this.namespace = namespaceRes.namespace;
			this.version = versionRes.version;

			this.domainIds = this.namespace.config.cdn.domains.map(() => uuid.v4());
			this.lobbyCountMax = this.namespace.config.matchmaker.lobbyCountMax;
			this.maxPlayerCountPerClient = this.namespace.config.matchmaker.maxPlayersPerClient;
		} catch (err) {
			logging.error('error fetching data', err);
			this.loadError = err;
		}
	}

	async updateVersion(event: DropDownSelectEvent) {
		let versionId = event.selection.value;

		await global.cloud.updateGameNamespaceVersion({
			gameId: this.game.id,
			namespaceId: this.namespace.namespaceId,
			versionId
		});

		this.dispatchEvent(new Event('update-version'));
		this.resetData();
		this.fetchData();
	}

	async createPublicToken() {
		try {
			let createRes = await global.cloud.createGameNamespaceTokenPublic({
				gameId: this.game.id,
				namespaceId: this.namespaceId
			});

			showAlert(
				'Namespace Public Token Creation',
				html` <span
						>Copy this token to your clipboard. You will not be able to access this token
						again.</span
					>
					<br />
					<copy-area light confidential>
						<code class="no-ligatures">${createRes.token}</code>
					</copy-area>`
			);
		} catch (err) {
			logging.error('error creating public token', err);
			this.loadError = err;
		}
	}

	async createDevToken() {
		try {
			let createRes = await global.cloud.createGameNamespaceTokenDevelopment({
				gameId: this.game.id,
				namespaceId: this.namespaceId,
				hostname: this.devTokenHostname,
				lobbyPorts: this.devTokenPorts
			});

			this.devTokenModalClose();

			showAlert(
				'Namespace Development Token Creation',
				html` <span
						>Copy this token to your clipboard. You will not be able to access this token
						again.</span
					>
					<br />
					<copy-area light confidential>
						<code class="no-ligatures thick">${createRes.token}</code>
					</copy-area>
					<br />
					<stylized-button
						@click=${this.downloadEnvFile.bind(this, createRes.token)}
						color="#4D4D4D"
						>Download Environment File</stylized-button
					>
					<p class="light muted">
						Rename this file to <code class="inline">.env</code> for use in conjunction with the
						<a class="link" target="_blank" href="https://github.com/motdotla/dotenv">dotenv</a>
						library.
					</p>`
			);
		} catch (err) {
			this.devTokenModalClose();
		}
	}

	openDevTokenModal() {
		this.devTokenModalActive = true;
	}

	devTokenModalClose() {
		this.devTokenModalActive = false;
	}

	downloadEnvFile(token: string) {
		utils.downloadData('_env', `RIVET_CLIENT_TOKEN=${token}\nRIVET_LOBBY_TOKEN=${token}`);
	}

	validateDomain(domain: string) {
		if (PROTOCOL_REGEX.test(domain)) return 'Do not include web protocol in domain';

		if (!DOMAIN_REGEX.test(domain)) return 'Invalid domain';

		let dupeCount = this.namespace.config.cdn.domains.reduce(
			(s, d) => s + (d.domain == domain ? 1 : 0),
			0
		);

		if (dupeCount > 1) return 'Domain not unique';

		return null;
	}

	async domainChanged(oldValue: string, idx: number, event: InputChangeEvent) {
		let domain = event.value.trim();

		// Value updated before validation for visual error
		this.namespace.config.cdn.domains[idx].domain = domain;
		this.requestUpdate();

		try {
			// Remove old value, if it was valid
			if (oldValue.trim() && this.validateDomain(oldValue) === null) {
				await global.cloud.removeNamespaceDomain({
					gameId: this.game.id,
					namespaceId: this.namespaceId,
					domain: oldValue
				});
			}

			// Add new value if its valid
			if (event.value.trim() && this.validateDomain(domain) === null) {
				await global.cloud.updateNamespaceDomain({
					gameId: this.game.id,
					namespaceId: this.namespaceId,
					domain
				});

				// Add indicator to list
				let domainId = this.domainIds[idx];
				this.savedDomainIndicators.add(domainId);
				this.requestUpdate('savedDomainIndicators');

				// Fade indicator after 2 seconds
				setTimeout(() => {
					this.savedDomainIndicators.delete(domainId);
					this.requestUpdate('savedDomainIndicators');
				}, timing.seconds(2));
			}
		} catch (err) {
			logging.error('error updating domain', err);
			this.loadError = err;
		}
	}

	async domainKeyDown(idx: number, event: KeyboardEvent) {
		let target = event.target as HTMLInputElement;
		let domain = target.value.trim();

		if (event.key == 'Tab') {
			event.preventDefault();

			// Value updated before validation for visual error
			this.namespace.config.cdn.domains[idx].domain = domain;
			this.requestUpdate();
		}

		if (!this.validateDomain(domain) && (event.key == 'Enter' || event.key == 'Tab')) {
			event.preventDefault();
			target.blur();
			this.addDomain();
		}
	}

	addDomain() {
		this.namespace.config.cdn.domains.push({
			domain: ''
		});
		this.domainIds.push(uuid.v4());

		this.requestUpdate();

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the body's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			let lastInput = this.domainInputs[this.domainInputs.length - 1];

			if (lastInput) lastInput.focus();
		});
	}

	async removeDomain(idx: number) {
		let domain = this.namespace.config.cdn.domains[idx].domain;

		let dupeCount = this.namespace.config.cdn.domains.reduce(
			(s, d) => s + (d.domain == domain ? 1 : 0),
			0
		);

		// Do not send any removal requests if this domain is a duplicate, removing
		// it like this will leave the original
		if (dupeCount > 1) {
			this.namespace.config.cdn.domains.splice(idx, 1);
			this.domainIds.splice(idx, 1);

			this.requestUpdate();

			return;
		}

		try {
			// Only send request if not empty
			if (domain.trim()) {
				await global.cloud.removeNamespaceDomain({
					gameId: this.game.id,
					namespaceId: this.namespaceId,
					domain
				});
			}

			this.namespace.config.cdn.domains.splice(idx, 1);
			this.domainIds.splice(idx, 1);

			this.requestUpdate();
		} catch (err) {
			logging.error('error removing domain', err);
			this.loadError = err;
		}
	}

	async toggleEnableDomainPublicAuth(e: ToggleSwitchEvent) {
		await global.cloud.toggleNamespaceDomainPublicAuth({
			gameId: this.game.id,
			namespaceId: this.namespaceId,
			enabled: e.value
		});
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError, true);
		if (this.namespace == null) return this.renderPlaceholder();

		let mmConfigErrors = this.mmConfigValidationErrors.errors.map(e => e.format());

		// Version select
		let currentVersionName = this.game.versions.find(
			v => this.namespace.versionId == v.versionId
		).displayName;
		let version = {
			label: currentVersionName || 'null',
			value: this.namespace.versionId
		};
		let versionOptions = this.game.versions.map(v => ({
			label: v.displayName,
			value: v.versionId
		}));

		// Create visit link
		let visitHost: string;
		let visitUrl: string;
		if (this.namespace.nameId == 'prod') {
			visitHost = `${this.game.nameId}.rivet.game`;
			visitUrl = `https://${visitHost}/`;
		} else {
			visitHost = `${this.game.nameId}--${this.namespace.nameId}.rivet.game`;
			visitUrl = `https://${visitHost}/`;
		}

		return html`
			<div id="base">
				${this.version.config.cdn
					? html`<stylized-button id="visit-button" right-icon="solid/arrow-right" .href=${visitUrl}
							>Visit</stylized-button
					  >`
					: null}
				<h1>Overview</h1>
				<div id="version-select">
					<h2>Version select</h2>
					<drop-down-list
						.selection=${version}
						.options=${versionOptions}
						@select=${this.updateVersion.bind(this)}
					></drop-down-list>
				</div>
				${this.version.config.matchmaker
					? html`<div class="setting-area">
							<div class="area-controller">
								<h2>
									<e-svg
										preserve
										non-icon
										src="/products/matchmaker"
										@mouseenter=${tooltip('Matchmaker')}
									></e-svg>
									Max Lobby Count
								</h2>
								<p>Control the total maximum lobby count for this namespace.</p>
								${mmConfigErrors.length
									? html`<error-list .errors=${mmConfigErrors}></error-list>`
									: null}
								<div id="counts">
									<div class="count">
										<h5>Max Lobby Count</h5>
										<text-input
											class="short"
											number
											placeholder="Count"
											.init=${this.namespace.config.matchmaker.lobbyCountMax}
											.min=${1}
											.max=${LOBBY_COUNT_MAX}
											@input=${this.updateLobbyCountMax.bind(this)}
										></text-input>
									</div>
								</div>
							</div>
					  </div>`
					: null}
				${this.version.config.matchmaker
					? html`<div class="setting-area">
							<div class="area-controller">
								<h2>
									<e-svg
										preserve
										non-icon
										src="/products/matchmaker"
										@mouseenter=${tooltip('Matchmaker')}
									></e-svg>
									Max Player Count Per IP
								</h2>
								<p>Control the maximum player count per IP.</p>
								${mmConfigErrors.length
									? html`<error-list .errors=${mmConfigErrors}></error-list>`
									: null}
								<div id="counts">
									<div class="count">
										<h5>Max Player Count</h5>
										<text-input
											class="short"
											number
											placeholder="Count"
											.init=${this.namespace.config.matchmaker.maxPlayersPerClient}
											.min=${1}
											@input=${this.updateMaxPlayersPerClient.bind(this)}
										></text-input>
									</div>
								</div>
							</div>
					  </div>`
					: null}

				<!-- <div class='setting-area horizontal'>
					<toggle-switch ?value=${null} @toggle=${() => {}}></toggle-switch>
					<div class='area-controller'>
						<h2>CDN Password Protection</h2>
						<p>
							Only enabled if deploying with CDN
						</p>
						<div id='cdn-protection-login'>
							<text-input .placeholder=${'Username'}></text-input>
							<text-input .placeholder=${'Password'} password></text-input>
						</div>
					</div>
				</div> -->
				${this.version.config.cdn
					? html`<div class="setting-area">
							<div class="area-controller">
								<h2>
									<e-svg
										preserve
										non-icon
										src="/products/cdn"
										@mouseenter=${tooltip('CDN')}
									></e-svg>
									Custom Domains
								</h2>
								<ol>
									<li>
										Add a <code>CNAME</code> record pointed at
										<code>${visitHost}</code> to your domain's DNS config.
									</li>
									<li>Add your domain below.</li>
								</ol>
							</div>
							<div id="domain-routing">
								${repeat(
									this.namespace.config.cdn.domains,
									(_, i) => this.domainIds[i],
									(d, i) => {
										let error = this.validateDomain(d.domain);
										let indicatorStyle = styleMap({
											opacity: this.savedDomainIndicators.has(this.domainIds[i])
												? '1'
												: '0'
										});

										return html` <div class="domain-route">
											<div class="domain-controller">
												<text-input
													placeholder="example.com"
													.init=${d.domain}
													@keydown=${this.domainKeyDown.bind(this, i)}
													@change=${this.domainChanged.bind(this, d.domain, i)}
												></text-input>
												<icon-button
													src="solid/xmark"
													small
													.trigger=${this.removeDomain.bind(this, i)}
												></icon-button>
												<div class="domain-saved-indicator" style=${indicatorStyle}>
													<e-svg src="solid/check"></e-svg> Saved
												</div>
											</div>
											${!d.domain.trim() || !error
												? null
												: html`
											<span class='domain-error'>
												<e-svg src='regular/circle-exclamation'></e-svg> ${error}</li>
											</span>`}
										</div>`;
									}
								)}
								${this.namespace.config.cdn.domains.length < 10
									? html`<dashed-button
											id="add-domain"
											icon="solid/plus"
											.trigger=${this.addDomain.bind(this)}
											>Add domain</dashed-button
									  >`
									: null}
							</div>
					  </div>`
					: null}
				${this.version.config.cdn
					? html`<div class="setting-area horizontal end">
							<toggle-switch
								?value=${this.namespace.config.cdn.enableDomainPublicAuth}
								@toggle=${this.toggleEnableDomainPublicAuth.bind(this)}
							></toggle-switch>
							<div class="area-controller">
								<h2>
									<e-svg
										preserve
										non-icon
										src="/products/cdn"
										@mouseenter=${tooltip('CDN')}
									></e-svg>
									Domain-based authentication
								</h2>
								<p>
									Allows for clients to authenticate with this namespace based on the domain
									they make requests from. This should only be used for namespaces intended
									to be publicly accessible.
									<br />
									<a class="link learn-more" href="/">Learn More</a>
								</p>
							</div>
					  </div>`
					: null}

				<h1>Tokens</h1>
				<div id="tokens">
					<stylized-button @click=${this.createPublicToken.bind(this)}
						>Create Public Token</stylized-button
					>
					<stylized-button @click=${this.openDevTokenModal.bind(this)}
						>Create Development Token</stylized-button
					>
				</div>
			</div>

			${this.renderCreateDevTokenModal()}
		`;
	}

	renderPlaceholder() {
		return html`<div id="placeholder">
			<loading-placeholder id="placeholder-visit"></loading-placeholder>
			<loading-placeholder class="placeholder-subtitle"></loading-placeholder>
			<loading-placeholder id="placeholder-version-select"></loading-placeholder>
			<loading-placeholder class="placeholder-controller"></loading-placeholder>
			<loading-placeholder class="placeholder-controller"></loading-placeholder>
			<loading-placeholder class="placeholder-subtitle"></loading-placeholder>
			<loading-placeholder class="placeholder-button"></loading-placeholder>
		</div> `;
	}

	changeHostName(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		this.devTokenHostname = target.value;

		this.validateDevTokenConfigDebounce.trigger();
	}

	// MARK: Port
	updatePort(idx: number, event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.devTokenPorts[idx].targetPort = value;

		this.validateDevTokenConfigDebounce.trigger();
		this.requestUpdate('devTokenPorts');
	}

	updatePortLabel(idx: number, event: InputEvent) {
		let target = event.target as HTMLInputElement;

		this.devTokenPorts[idx].label = target.value;

		this.validateDevTokenConfigDebounce.trigger();
		this.requestUpdate('devTokenPorts');
	}

	updatePortProtocol(idx: number, event: DropDownSelectEvent) {
		this.devTokenPorts[idx].proxyProtocol = event.selection.value as cloud.ProxyProtocol;

		this.validateDevTokenConfigDebounce.trigger();
		this.requestUpdate('devTokenPorts');
	}

	removePort(idx: number) {
		this.devTokenPorts.splice(idx, 1);
		this.devTokenPortIds.splice(idx, 1);

		this.validateDevTokenConfigDebounce.trigger();
		this.requestUpdate('devTokenPorts');
	}

	createPort() {
		this.devTokenPorts.push({
			label: 'default',
			targetPort: 8080,
			proxyProtocol: cloud.ProxyProtocol.HTTP
		});
		this.devTokenPortIds.push(uuid.v4());

		this.validateDevTokenConfigDebounce.trigger();
		this.requestUpdate('devTokenPorts');

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the body's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			let lastInput = this.portInputs[this.portInputs.length - 1];

			if (lastInput) lastInput.focus();
		});
	}

	updateLobbyCountMax(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.lobbyCountMax = value;

		this.validateMmConfigConfigDebounce.trigger();
	}

	updateMaxPlayersPerClient(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.maxPlayerCountPerClient = value;

		this.validateMmConfigConfigDebounce.trigger();
	}

	renderCreateDevTokenModal() {
		let errors = this.devTokenValidationErrors.findShallowFormatted();

		return html` <drop-down-modal
			id="create-dev-token-modal"
			?active=${this.devTokenModalActive}
			@close=${this.devTokenModalClose.bind(this)}
		>
			<div slot="body">
				<h1>Create Development Token</h1>
				<div class="input-group">
					<h2>Hostname</h2>
					<text-input
						light
						placeholder="Enter host URL"
						.init=${this.devTokenHostname}
						maxlength="64"
						@change=${this.changeHostName.bind(this)}
					></text-input>
					<h2>Ports</h2>
					${errors.length ? html`<error-list .errors=${errors}></error-list>` : null}
					<div id="port-mapping" class="light-scrollbar">
						<table id="ports">
							${this.devTokenPorts.length
								? html`<tr>
											<th>Label</th>
											<th>Port</th>
											<th>Protocol</th>
										</tr>
										${repeat(
											this.devTokenPorts,
											(_, i) => this.devTokenPortIds[i],
											(p, i) => {
												let portErrors = this.devTokenValidationErrors.findFormatted(
													'ports',
													i
												);

												return html`${portErrors.length
														? html`<tr>
																<td colspan="4">
																	<error-list
																		.errors=${portErrors}
																	></error-list>
																</td>
														  </tr>`
														: null}
													<tr>
														<td class="port-input">
															<text-input
																class="port short"
																placeholder="Label"
																light
																.init=${p.label}
																@input=${this.updatePortLabel.bind(this, i)}
															></text-input>
														</td>
														<td>
															<text-input
																class="port short"
																placeholder="Port"
																light
																number
																.min=${1}
																.max=${65535}
																.init=${p.targetPort.toString()}
																@input=${this.updatePort.bind(this, i)}
															></text-input>
														</td>
														<td>
															<drop-down-list
																light
																.selection=${PORT_PROTOCOLS.find(
																	pr =>
																		pr.value ==
																		(p.proxyProtocol as string)
																)}
																.options=${PORT_PROTOCOLS}
																@select=${this.updatePortProtocol.bind(
																	this,
																	i
																)}
															></drop-down-list>
														</td>
														<td>
															<icon-button
																src="solid/xmark"
																small
																.trigger=${this.removePort.bind(this, i)}
															></icon-button>
														</td>
													</tr>`;
											}
										)}`
								: null}
						</table>
						${this.devTokenPorts.length < 16
							? html`<dashed-button
									id="create-port"
									class="short"
									light
									centered
									icon="solid/plus"
									.trigger=${this.createPort.bind(this)}
									>Add port</dashed-button
							  >`
							: null}
					</div>
				</div>
				<stylized-button
					.trigger=${this.createDevToken.bind(this)}
					?disabled=${!this.devTokensValid}
					?loading=${this.isCreatingDevToken}
					>Create</stylized-button
				>
			</div>
		</drop-down-modal>`;
	}
}
