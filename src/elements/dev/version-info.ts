import { LitElement, html, customElement, property, queryAll, PropertyValues } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../utils/css';
import styles from './version-info.scss';
import * as cloud from '@rivet-gg/cloud';
import { classMap } from 'lit-html/directives/class-map';
import global from '../../utils/global';
import { ToggleSwitchEvent } from '../common/toggle-switch';
import CheckBox from './check-box';
import { SelectSiteEvent } from './cdn-sites';
import * as uuid from 'uuid';
import { ErrorBranch, TraversableErrors, VALIDATION_ERRORS } from '../../utils/traversable-errors';
import { DropDownSelectEvent, DropDownSelection } from './drop-down-list';
import { SelectBuildEvent } from './builds';

export class UpdateConfigEvent extends Event {
	constructor(public config: cloud.CloudVersionConfig) {
		super('update');
	}
}

const HCAPTCHA_DIFFICULTIES: DropDownSelection[] = [
	{
		label: 'Easy',
		value: cloud.CaptchaLevel.EASY
	},
	{
		label: 'Moderate',
		value: cloud.CaptchaLevel.MODERATE
	},
	{
		label: 'Difficult',
		value: cloud.CaptchaLevel.DIFFICULT
	},
	{
		label: 'Always On',
		value: cloud.CaptchaLevel.ALWAYS_ON
	}
];

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

// TODO: Add info tooltips, use the existing tooltip code
@customElement('dev-version-info')
export default class DevVersionInfo extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Object })
	config: cloud.CloudVersionConfig;

	@property({ type: Object })
	tiers: cloud.RegionTier[] = [];

	@property({ type: Boolean })
	editing: boolean;

	@property({ type: Object })
	errors: ErrorBranch;

	@property({ type: Object })
	configErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME_VERSION);

	@property({ type: Array })
	lobbyIds: string[] = [];

	// === MATCHMAKER CONFIG ===
	@property({ type: Object })
	hcaptchaDifficultySelection: DropDownSelection = HCAPTCHA_DIFFICULTIES[0];

	@queryAll('.arg-input > text-input')
	argInputs: HTMLElement[];

	@queryAll('.port-input > text-input')
	portInputs: HTMLElement[];

	@queryAll('.env-input > text-input')
	envInputs: HTMLElement[];

	@property({ type: Array })
	portIds: string[] = [];

	@property({ type: Array })
	argIds: string[] = [];

	@property({ type: Array })
	envVarIds: string[] = [];

	async firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		// Create ids for lobbies (For repeat directive)
		if (this.config.matchmaker) {
			this.lobbyIds = this.config.matchmaker.lobbyGroups.map(() => uuid.v4());

			// Set hcaptcha difficulty value
			if (this.config.matchmaker.captcha && this.config.matchmaker.captcha.hcaptcha) {
				this.hcaptchaDifficultySelection = HCAPTCHA_DIFFICULTIES.find(
					v => v.value == this.config.matchmaker.captcha.hcaptcha.level
				);
			}

			if (this.config.matchmaker.lobbyGroups.length) {
				// Create ids for ports, args, and env vars (For repeat directive)
				this.portIds = this.dockerRuntime.ports.map(() => uuid.v4());
				this.argIds = this.dockerRuntime.args.map(() => uuid.v4());
				this.envVarIds = this.dockerRuntime.envVars.map(() => uuid.v4());
			}
		}

		this.updateConfig();
	}

	// First lobby group is global config
	get dockerRuntime(): cloud.LobbyGroupRuntimeDocker {
		return this.config.matchmaker.lobbyGroups[0].runtime.docker;
	}

	// Update error instance
	update(changedProperties: PropertyValues) {
		super.update(changedProperties);

		if (changedProperties.has('errors')) {
			this.configErrors.loadBranch(this.errors);
			this.requestUpdate('configErrors');
		}
	}

	updateConfig() {
		// Update all lobby groups to match the first lobby group runtime
		if (this.config.matchmaker && this.config.matchmaker.lobbyGroups.length) {
			let firstRuntime = this.config.matchmaker.lobbyGroups[0].runtime.docker;

			for (let lobbyGroup of this.config.matchmaker.lobbyGroups) {
				lobbyGroup.runtime.docker.ports = firstRuntime.ports;
				lobbyGroup.runtime.docker.args = firstRuntime.args;
				lobbyGroup.runtime.docker.envVars = firstRuntime.envVars;
				lobbyGroup.runtime.docker.buildId = firstRuntime.buildId;
			}
		}

		this.requestUpdate('config');
		this.dispatchEvent(new UpdateConfigEvent(this.config));
	}

	toggleCdn(e: ToggleSwitchEvent) {
		// Don't allow check-box event propagation to trigger this
		if (e.composedPath()[0] instanceof CheckBox) return;

		if (e.value) {
			if (this.config.cdn == null) {
				this.config.cdn = {
					siteId: undefined
				};
			}
		} else {
			this.config.cdn = null;
		}

		this.updateConfig();
	}

	selectSite(event: SelectSiteEvent) {
		this.config.cdn.siteId = event.siteId;
		this.updateConfig();
	}

	toggleMatchmaker(e: ToggleSwitchEvent) {
		// Don't allow check-box event propagation to trigger this
		if (e.composedPath()[0] instanceof CheckBox) return;

		if (e.value) {
			if (this.config.matchmaker == null) {
				this.config.matchmaker = {
					lobbyGroups: []
				};
			}
		} else {
			this.config.matchmaker = null;
		}

		this.updateConfig();
	}

	toggleKv(e: ToggleSwitchEvent) {
		// Don't allow check-box event propagation to trigger this
		if (e.composedPath()[0] instanceof CheckBox) return;

		if (e.value) {
			if (this.config.kv == null) {
				this.config.kv = {};
			}
		} else {
			this.config.kv = null;
		}

		this.updateConfig();
	}

	createLobbyGroup() {
		if (!this.config.matchmaker) return;

		let nameId = `game-mode-${this.config.matchmaker.lobbyGroups.length + 1}`;
		if (this.config.matchmaker.lobbyGroups.length > 0) {
			let lobbyGroup = JSON.parse(
				JSON.stringify(
					this.config.matchmaker.lobbyGroups[this.config.matchmaker.lobbyGroups.length - 1]
				)
			);
			lobbyGroup.nameId = nameId;
			this.config.matchmaker.lobbyGroups.push(lobbyGroup);
		} else {
			this.config.matchmaker.lobbyGroups.push({
				nameId: 'default',
				regions: this.game.availableRegions.map(a => ({
					regionId: a.regionId,
					tierNameId: 'basic-1d2',
					idleLobbies: {
						minIdleLobbies: 0,
						maxIdleLobbies: 0
					}
				})), // Makes all regions active immediately

				maxPlayersNormal: 16,
				maxPlayersDirect: 16,
				maxPlayersParty: 16,
				runtime: {
					docker: {
						buildId: undefined,
						args: [],
						ports: [
							{
								label: 'default',
								targetPort: 80,
								proxyProtocol: cloud.ProxyProtocol.HTTPS
							}
						],
						envVars: [
							{
								key: 'PORT',
								value: '80'
							}
						]
					}
				}
			});

			if (this.config.matchmaker.lobbyGroups.length == 1) {
				// Create ids for ports, args, and env vars (For repeat directive)
				this.portIds = this.dockerRuntime.ports.map(() => uuid.v4());
				this.argIds = this.dockerRuntime.args.map(() => uuid.v4());
				this.envVarIds = this.dockerRuntime.envVars.map(() => uuid.v4());
			}
		}

		this.lobbyIds.push(uuid.v4());

		this.updateConfig();
	}

	removeLobbyGroup(idx: number) {
		if (!this.config.matchmaker) return;

		this.config.matchmaker.lobbyGroups.splice(idx, 1);
		this.lobbyIds.splice(idx, 1);

		this.updateConfig();
	}

	noServices() {
		return !this.config.cdn && !this.config.matchmaker && !this.config.kv;
	}

	render() {
		return html`
			<div id="base">
				${!this.editing && this.noServices()
					? html`<p class="muted">No services enabled for this version.</p>`
					: null}
				${this.editing || this.config.cdn
					? html`<service-card
							.domain=${'deliver'}
							?editing=${this.editing}
							?active=${!!this.config.cdn}
							?error=${!!this.configErrors.find('cdn').length}
							@toggle=${this.toggleCdn.bind(this)}
							beta
					  >
							<e-svg slot="icon" preserve non-icon src="/products/cdn"></e-svg>
							<h2 slot="title">CDN</h2>
							<div slot="content">
								${this.renderErrors('cdn')}
								<div id="cdn-content">${this.config.cdn ? this.renderCdn() : null}</div>
							</div>
					  </service-card>`
					: null}
				${this.editing || this.config.matchmaker
					? html`<service-card
							.domain=${'services'}
							?editing=${this.editing}
							?active=${!!this.config.matchmaker}
							?error=${!!this.configErrors.find('matchmaker').length}
							@toggle=${this.toggleMatchmaker.bind(this)}
					  >
							<e-svg slot="icon" preserve non-icon src="/products/matchmaker"></e-svg>
							<h2 slot="title">Matchmaker</h2>
							<div slot="content">
								${this.renderErrors('matchmaker')}
								${this.config.matchmaker ? this.renderMatchmaker() : null}
							</div>
					  </service-card>`
					: null}
				${this.editing || this.config.kv
					? html`<service-card
							.domain=${'services'}
							?editing=${this.editing}
							?active=${!!this.config.kv}
							?error=${!!this.configErrors.find('kv').length}
							@toggle=${this.toggleKv.bind(this)}
							beta
					  >
							<e-svg slot="icon" preserve non-icon src="/products/database"></e-svg>
							<h2 slot="title">KV</h2>
							<div slot="content">
								${this.renderErrors('kv')} ${this.config.kv ? this.renderKv() : null}
							</div>
					  </service-card>`
					: null}
			</div>
		`;
	}

	renderCdn() {
		return html`
			<dev-cdn-sites
				.game=${this.game}
				?selectable=${this.editing}
				?uploadable=${this.editing}
				.selectedSiteId=${this.config.cdn.siteId}
				@select-site=${this.selectSite.bind(this)}
			>
			</dev-cdn-sites>
		`;
	}

	renderMatchmaker() {
		let captchaClasses = classMap({
			active: !!this.config.matchmaker.captcha
		});
		let captchaErrors = this.configErrors.findFormatted('matchmaker', 'captcha');
		let lobbyGroupMetaErrors = this.configErrors.findFormatted('matchmaker', 'lobby-groups-meta');

		return html`
			${this.config.matchmaker.captcha || this.editing
				? html`<div id="captcha-area" class=${captchaClasses}>
						<div class="toggle-header">
							${
								this.editing
									? html`<toggle-switch
											?value=${!!this.config.matchmaker.captcha}
											@toggle=${this.toggleMatchmakerCaptcha.bind(this)}
									  ></toggle-switch>`
									: null
							}
							<h3>Captcha Verification</h3>
						</div>
						${captchaErrors.length ? html`<error-list .errors=${captchaErrors}></error-list>` : null}
						${
							this.config.matchmaker.captcha
								? html`<div id="captcha-config">
										<div class="column-split">
											<div class="column">
												<div class="captcha-input">
													<h5>Requests before required reverification</h5>
													${this.editing
														? html`<text-input
																class="short"
																number
																placeholder="Count"
																.min=${0}
																.max=${600}
																.init=${this.config.matchmaker.captcha.requestsBeforeReverify.toString()}
																@input=${this.changeCaptchaRequestsBeforeReverify.bind(
																	this
																)}
														  ></text-input>`
														: html`<p class="immut-info short">
																${this.config.matchmaker.captcha
																	.requestsBeforeReverify}
														  </p>`}
												</div>
												<div class="captcha-input">
													<h5>Captcha Difficulty</h5>
													${this.editing
														? html`<drop-down-list
																.selection=${this.hcaptchaDifficultySelection}
																.options=${HCAPTCHA_DIFFICULTIES}
																@select=${this.changeHcaptchaDifficulty.bind(
																	this
																)}
														  ></drop-down-list>`
														: html`<p class="immut-info medium">
																${this.hcaptchaDifficultySelection.label}
														  </p>`}
												</div>
											</div>
											<div class="column">
												<div class="captcha-input">
													<h5>Time before required reverification (minutes)</h5>
													${this.editing
														? html`<text-input
																class="short"
																number
																placeholder="Count"
																.min=${0}
																.max=${12 * 60}
																.init=${Math.floor(
																	this.config.matchmaker.captcha
																		.verificationTtl /
																		(60 * 1000)
																).toString()}
																@input=${this.changeCaptchaVerificationTtl.bind(
																	this
																)}
														  ></text-input>`
														: html`<p class="immut-info short">
																${Math.floor(
																	this.config.matchmaker.captcha
																		.verificationTtl /
																		(60 * 1000)
																)}
														  </p>`}
												</div>
											</div>
										</div>
								  </div> `
								: null
						}
				  </div>
				</div>`
				: null}

			<h3>Runtime</h3>
			<div
				id="global-config-area"
				class=${classMap({ empty: this.config.matchmaker.lobbyGroups.length <= 0 })}
			>
				${this.config.matchmaker.lobbyGroups.length
					? this.renderGlobalLobbyConfig()
					: html`<p class="muted">No game modes</p>`}
			</div>

			<h3>Game Modes</h3>
			${lobbyGroupMetaErrors.length
				? html`<error-list id="lobby-group-errors" .errors=${lobbyGroupMetaErrors}></error-list>`
				: null}
			${this.config.matchmaker.lobbyGroups.length
				? html`<div id="lobby-groups">
						${repeat(
							this.config.matchmaker.lobbyGroups,
							(_, i) => this.lobbyIds[i],
							(lg, i) => html`
								<dev-version-info-lobby-group
									class="lobby-group"
									.game=${this.game}
									.tiers=${this.tiers}
									.config=${lg}
									.errors=${this.configErrors.branch('matchmaker', 'lobby-groups', i)}
									?editing=${this.editing}
									@update=${this.updateConfig.bind(this)}
									@remove=${this.removeLobbyGroup.bind(this, i)}
								>
								</dev-version-info-lobby-group>
							`
						)}
				  </div>`
				: this.editing
				? null
				: html`<p class="muted">No lobby groups created</p>`}
			${this.editing && this.config.matchmaker.lobbyGroups.length < 32
				? html`<div id="create-gamemode" @click=${this.createLobbyGroup.bind(this)}>
						<div id="create-gamemode-content">
							<e-svg src="solid/plus"></e-svg>
							Create a new game mode
						</div>
				  </div>`
				: null}
		`;
	}

	renderGlobalLobbyConfig() {
		let runtimeError = this.configErrors.findFormatted('matchmaker', 'lobby-groups', 0, 'no-runtime')[0];
		let buildError = this.configErrors.findFormatted('matchmaker', 'lobby-groups', 0, 'no-build')[0];
		let tooManyArgs = this.configErrors.findFormatted(
			'matchmaker',
			'lobby-groups',
			0,
			'args-too-many'
		)[0];
		let tooManyPorts = this.configErrors.findFormatted(
			'matchmaker',
			'lobby-groups',
			0,
			'ports-too-many'
		)[0];
		let tooManyEnvVars = this.configErrors.findFormatted(
			'matchmaker',
			'lobby-groups',
			0,
			'env-vars-too-many'
		)[0];

		let buildClasses = classMap({
			'no-upload': !this.editing
		});

		let portsClasses = classMap({
			'immut-ports': !this.editing
		});

		return html`<h4>Build</h4>
			${this.editing
				? html`${runtimeError ? html`<error-list .errors=${[runtimeError]}></error-list>` : null}
				  ${buildError ? html`<error-list .errors=${[buildError]}></error-list>` : null}`
				: null}
			<div id="builds-area" class="row scrollbar-gutter">
				<dev-builds
					class=${buildClasses}
					.game=${this.game}
					?selectable=${this.editing}
					?uploadable=${false /* this.editing */}
					.selectedBuildId=${this.dockerRuntime.buildId}
					@select-build=${this.selectBuild.bind(this)}
				>
				</dev-builds>
				<div id="spacer"></div>
			</div>

			<div id="args" class="column-split">
				<div class="column">
					<h4>Ports</h4>
					${tooManyPorts ? html`<error-list .errors=${[tooManyPorts]}></error-list>` : null}
					<div id="ports-list" class="list">
						<table id="ports" class=${portsClasses}>
							${this.dockerRuntime.ports.length
								? html` <tr>
											<th>Label</th>
											<th>Port</th>
											<th>Protocol</th>
										</tr>
										${repeat(
											this.dockerRuntime.ports,
											(_, i) => this.portIds[i],
											(p, i) => {
												if (this.editing) {
													let portErrors = this.configErrors.findFormatted(
														'matchmaker',
														'lobby-groups',
														0,
														'ports',
														i
													);

													return html` ${portErrors.length
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
																	.init=${p.label}
																	@input=${this.updatePortLabel.bind(
																		this,
																		i
																	)}
																></text-input>
															</td>
															<td>
																<text-input
																	class="port short"
																	placeholder="Port"
																	number
																	.min=${1}
																	.max=${65535}
																	.init=${p.targetPort.toString()}
																	@input=${this.updatePort.bind(this, i)}
																></text-input>
															</td>
															<td>
																<drop-down-list
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
												} else {
													return html` <tr>
														<td>
															<div class="immut-info">
																<p class="label">${p.label}</p>
															</div>
														</td>
														<td>
															<p class="immut-info">${p.targetPort}</p>
														</td>
														<td>
															<p class="immut-info protocol">
																${p.proxyProtocol}
															</p>
														</td>
													</tr>`;
												}
											}
										)}`
								: this.editing
								? null
								: html`<p class="muted">No ports defined</p>`}
						</table>
						${this.editing && this.dockerRuntime.ports.length < 16
							? html`<dashed-button
									id="create-port"
									class="short"
									icon="solid/plus"
									.trigger=${this.createPort.bind(this)}
									>Add port</dashed-button
							  >`
							: null}
					</div>
				</div>
				<div class="column">
					<h4>Arguments</h4>
					${tooManyArgs ? html`<error-list .errors=${[tooManyArgs]}></error-list>` : null}
					<div id="args-list" class="list">
						${this.dockerRuntime.args.length
							? html`<div>
									${repeat(
										this.dockerRuntime.args,
										(_, i) => this.argIds[i],
										(arg, i) => {
											if (this.editing) {
												let argErrors = this.configErrors.findFormatted(
													'matchmaker',
													'lobby-groups',
													0,
													'args',
													i
												);

												return html`${argErrors.length
														? html`<error-list .errors=${argErrors}></error-list>`
														: null}
													<div class="item arg-input">
														<!-- maxlength is > 128 so that identities pasting in content can see the "too long" error -->
														<text-input
															.init=${arg}
															placeholder="Argument"
															maxlength="129"
															@input=${this.updateArg.bind(this, i)}
														></text-input>
														<icon-button
															src="solid/xmark"
															small
															.trigger=${this.removeArg.bind(this, i)}
														></icon-button>
													</div>`;
											} else {
												return html`<p class="immut-info">${arg}</p>`;
											}
										}
									)}
							  </div>`
							: this.editing
							? null
							: html`<p class="muted">No arguments defined</p>`}
						${this.editing && this.dockerRuntime.args.length < 64
							? html` <dashed-button icon="solid/plus" .trigger=${this.createArg.bind(this)}
									>Add argument</dashed-button
							  >`
							: null}
					</div>
					<h4>Env Vars</h4>
					${tooManyEnvVars ? html`<error-list .errors=${[tooManyEnvVars]}></error-list>` : null}
					<div id="env-vars-list" class="list">
						${this.dockerRuntime.envVars.length
							? html`<div>
									${repeat(
										this.dockerRuntime.envVars,
										(_, i) => this.envVarIds[i],
										(v, i) => {
											if (this.editing) {
												let envVarErrors = this.configErrors.findFormatted(
													'matchmaker',
													'lobby-groups',
													0,
													'env-vars',
													i
												);

												return html`
													${envVarErrors.length
														? html`<error-list
																.errors=${envVarErrors}
														  ></error-list>`
														: null}
													<div class="item env-var env-input">
														<!-- maxlength is > 64 so that identities pasting in content can see the "too long" error -->
														<text-input
															.init=${v.key}
															placeholder="Var name"
															maxlength="65"
															@input=${this.updateEnvVar.bind(this, i, 'key')}
														></text-input>
														<span>=</span>
														<!-- maxlength is > 512 so that identities pasting in content can see the "too long" error -->
														<text-input
															.init=${v.value}
															placeholder="Var value"
															maxlength="513"
															@input=${this.updateEnvVar.bind(this, i, 'value')}
														></text-input>
														<icon-button
															src="solid/xmark"
															small
															.trigger=${this.removeEnvVar.bind(this, i)}
														></icon-button>
													</div>
												`;
											} else {
												return html`<p class="immut-info">${v.key} = ${v.value}</p>`;
											}
										}
									)}
							  </div>`
							: this.editing
							? null
							: html`<p class="muted">No environment variables defined</p>`}
						${this.editing && this.dockerRuntime.envVars.length < 64
							? html`<dashed-button icon="solid/plus" .trigger=${this.createEnvVar.bind(this)}
									>Add Env Var</dashed-button
							  >`
							: null}
					</div>
				</div>
			</div>`;
	}

	renderKv() {
		return html`<div class="muted center">No settings yet</div>`;
	}

	toggleMatchmakerCaptcha(e: ToggleSwitchEvent) {
		if (e.value) {
			this.config.matchmaker.captcha = {
				hcaptcha: {
					level: cloud.CaptchaLevel.EASY
				},
				requestsBeforeReverify: 15,
				verificationTtl: 3600000
			};
			this.hcaptchaDifficultySelection = HCAPTCHA_DIFFICULTIES[0];
		} else {
			this.hcaptchaDifficultySelection = null;
			this.config.matchmaker.captcha = undefined;
		}

		this.updateConfig();
	}

	changeHcaptchaDifficulty(event: DropDownSelectEvent) {
		this.hcaptchaDifficultySelection = event.selection;
		this.config.matchmaker.captcha.hcaptcha.level = event.selection.value;

		this.updateConfig();
	}

	changeCaptchaRequestsBeforeReverify(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.config.matchmaker.captcha.requestsBeforeReverify = value;

		this.updateConfig();
	}

	changeCaptchaVerificationTtl(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.config.matchmaker.captcha.verificationTtl = value * 60 * 1000;

		this.updateConfig();
	}

	// MARK: Docker
	selectBuild(event: SelectBuildEvent) {
		this.dockerRuntime.buildId = event.buildId;
		this.updateConfig();
	}

	// MARK: Arg
	updateArg(idx: number, event: InputEvent) {
		let target = event.target as HTMLInputElement;
		this.dockerRuntime.args[idx] = target.value;

		this.updateConfig();
	}

	removeArg(idx: number) {
		this.dockerRuntime.args.splice(idx, 1);
		this.argIds.splice(idx, 1);
		this.updateConfig();
	}

	createArg() {
		this.dockerRuntime.args.push('');
		this.argIds.push(uuid.v4());
		this.updateConfig();

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the body's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			let lastInput = this.argInputs[this.argInputs.length - 1];

			if (lastInput) lastInput.focus();
		});
	}

	// MARK: Port
	updatePort(idx: number, event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.dockerRuntime.ports[idx].targetPort = value;

		this.updateConfig();
	}

	updatePortLabel(idx: number, event: InputEvent) {
		let target = event.target as HTMLInputElement;

		this.dockerRuntime.ports[idx].label = target.value;

		this.updateConfig();
	}

	updatePortProtocol(idx: number, event: DropDownSelectEvent) {
		this.dockerRuntime.ports[idx].proxyProtocol = event.selection.value as cloud.ProxyProtocol;

		this.updateConfig();
	}

	removePort(idx: number) {
		this.dockerRuntime.ports.splice(idx, 1);
		this.portIds.splice(idx, 1);
		this.updateConfig();
	}

	createPort() {
		this.dockerRuntime.ports.push({
			label: '',
			targetPort: 80,
			proxyProtocol: cloud.ProxyProtocol.HTTPS
		});
		this.portIds.push(uuid.v4());
		this.updateConfig();

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the body's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			let lastInput = this.portInputs[this.portInputs.length - 1];

			if (lastInput) lastInput.focus();
		});
	}

	// MARK: Env var
	updateEnvVar(idx: number, key: keyof cloud.LobbyGroupRuntimeDockerEnvVar, event: InputEvent) {
		let target = event.target as HTMLInputElement;
		this.dockerRuntime.envVars[idx][key] = target.value;
		this.updateConfig();
	}

	removeEnvVar(idx: number) {
		this.dockerRuntime.envVars.splice(idx, 1);
		this.envVarIds.splice(idx, 1);
		this.updateConfig();
	}

	createEnvVar() {
		this.dockerRuntime.envVars.push({ key: '', value: '' });
		this.envVarIds.push(uuid.v4());
		this.updateConfig();

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the body's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			let lastInput = this.envInputs[this.envInputs.length - 2];

			if (lastInput) lastInput.focus();
		});
	}

	renderErrors(subconfig: string) {
		let errors = this.configErrors.findShallowFormatted(subconfig);

		return errors.length ? html`<error-list .errors=${errors}></error-list>` : null;
	}
}
