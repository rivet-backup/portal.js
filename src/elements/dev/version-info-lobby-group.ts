import { LitElement, html, customElement, property, queryAll, PropertyValues } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../utils/css';
import styles from './version-info-lobby-group.scss';
import cloud from '@rivet-gg/cloud';
import { classMap } from 'lit-html/directives/class-map';
import { getRegionEmoji } from '../../utils/emoji';
import { ErrorBranch, TraversableErrors, VALIDATION_ERRORS } from '../../utils/traversable-errors';
import { DropDownSelectEvent } from './drop-down-list';

// See game-version-validate
const PLAYER_COUNT_MAX = 256;
const IDLE_LOBBY_COUNT_MIN_MAX = 16;
const IDLE_LOBBY_COUNT_MAX = 32;
const DEFAULT_TIER_NAME_ID = 'basic-1d2';

interface UpdateConfigValue<T> {
	base: T;
	key: keyof T;
	nullify?: boolean;
}

@customElement('dev-version-info-lobby-group')
export class DevVersionInfoLobbyGroup extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Object })
	config: cloud.LobbyGroup;

	@property({ type: Object })
	tiers: cloud.RegionTier[] = [];

	@property({ type: Boolean })
	editing: boolean;

	@property({ type: Object })
	errors: ErrorBranch;

	@property({ type: Object })
	lobbyErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME_VERSION);

	@property({ type: String })
	tierNameIdValue: string = DEFAULT_TIER_NAME_ID;

	@property({ type: Number })
	minIdleLobbiesValue: number = 0;
	@property({ type: Number })
	maxIdleLobbiesValue: number = 0;

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		// Preload existing values
		this.tierNameIdValue = this.config.regions.length
			? this.config.regions[0].tierNameId
			: DEFAULT_TIER_NAME_ID;
		this.minIdleLobbiesValue = this.config.regions.length
			? this.config.regions[0].idleLobbies
				? this.config.regions[0].idleLobbies.minIdleLobbies
				: 1
			: 0;
		this.maxIdleLobbiesValue = this.config.regions.length
			? this.config.regions[0].idleLobbies
				? this.config.regions[0].idleLobbies.maxIdleLobbies
				: 3
			: 0;
	}

	// Update error instance
	update(changedProperties: PropertyValues) {
		super.update(changedProperties);

		if (changedProperties.has('errors')) {
			this.lobbyErrors.loadBranch(this.errors);
			this.requestUpdate('lobbyErrors');
		}
	}

	get dockerRuntime(): cloud.LobbyGroupRuntimeDocker {
		return this.config.runtime.docker;
	}

	removeLobbyGroup() {
		this.dispatchEvent(new Event('remove'));
	}

	updateConfig() {
		this.requestUpdate('config');
		this.dispatchEvent(new Event('update'));
	}

	updateConfigValue<T>(opts: UpdateConfigValue<T>, event: InputEvent) {
		let target = event.target as HTMLInputElement;

		if (target.value == '' && opts.nullify) {
			(opts.base as any)[opts.key] = null;
		} else {
			(opts.base as any)[opts.key] = target.value;
		}

		this.updateConfig();
	}

	// MARK: Region
	toggleRegion(regionId: string) {
		let hasRegion = this.config.regions.findIndex(x => x.regionId == regionId) == -1;

		if (hasRegion) {
			this.config.regions.push({
				regionId,
				tierNameId: this.tierNameIdValue,
				idleLobbies: {
					minIdleLobbies: this.minIdleLobbiesValue,
					maxIdleLobbies: this.maxIdleLobbiesValue
				}
			});
		} else {
			this.config.regions = this.config.regions.filter(x => x.regionId != regionId);
		}

		this.updateConfig();
	}

	// MARK: Player count
	updatePlayerCount(key: keyof cloud.LobbyGroup, event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) (this.config as any)[key] = value;

		this.updateConfig();
	}

	changeTierValue(event: DropDownSelectEvent) {
		this.tierNameIdValue = event.selection.value;

		// Update existing region configs
		this.config.regions.forEach(region => {
			region.tierNameId = this.tierNameIdValue;
		});

		this.updateConfig();
	}

	changeMinIdleLobbiesValue(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.minIdleLobbiesValue = value;

		// Update existing region configs
		this.config.regions.forEach(region => {
			if (!region.idleLobbies) {
				region.idleLobbies = {
					minIdleLobbies: this.minIdleLobbiesValue,
					maxIdleLobbies: this.maxIdleLobbiesValue
				};
			} else {
				region.idleLobbies.minIdleLobbies = this.minIdleLobbiesValue;
			}
		});

		this.updateConfig();
	}

	changeMaxIdleLobbiesValue(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.maxIdleLobbiesValue = value;

		// Update existing region configs
		this.config.regions.forEach(region => {
			if (!region.idleLobbies) {
				region.idleLobbies = {
					minIdleLobbies: this.minIdleLobbiesValue,
					maxIdleLobbies: this.maxIdleLobbiesValue
				};
			} else {
				region.idleLobbies.maxIdleLobbies = this.maxIdleLobbiesValue;
			}
		});

		this.updateConfig();
	}

	render() {
		let nameErrors = [
			...this.lobbyErrors.findFormatted('name-not-unique'),
			...this.lobbyErrors.findFormatted('name-id-invalid')
		];

		let regionError = this.lobbyErrors.findFormatted('no-regions')[0];
		let playerCountErrors = this.lobbyErrors.findFormatted('player-counts');
		let idleLobbyCountErrors = this.lobbyErrors.findFormatted('regions', 0, 'idle-lobbies');

		let tierOptions = this.tiers.map(v => ({
			template: html`<e-svg class="left-icon" preserve src=${`billing/core/${v.tierNameId}`}></e-svg
				>${v.tierNameId
					.replace('basic', 'Basic')
					.replace(/-/g, ' ')
					.replace(/(\d+)d(\d+)/, '$1/$2')}`,
			value: v.tierNameId
		}));
		let tierSelection = tierOptions.find(v => v.value == this.tierNameIdValue);

		return html`
			<div id="base">
				${this.editing
					? html`<icon-button
							id="close"
							src="solid/xmark"
							.trigger=${this.removeLobbyGroup.bind(this)}
					  ></icon-button>`
					: null}

				<h4>Name ID</h4>
				${nameErrors.length ? html`<error-list .errors=${nameErrors}></error-list>` : null}
				${this.editing
					? html`<text-input
							id="name-id-input"
							class="medium"
							.init=${this.config.nameId}
							@input=${this.updateConfigValue.bind(this, {
								base: this.config,
								key: 'nameId'
							} as UpdateConfigValue<cloud.LobbyGroup> as any)}
					  ></text-input>`
					: html`<p class="immut-info medium">${this.config.nameId}</p>`}

				<div id="args" class="column-split">
					<div class="column">
						<h4>Player Counts</h4>
						${playerCountErrors.length
							? html`<error-list .errors=${playerCountErrors}></error-list>`
							: null}
						<div class="row">
							${this.renderPlayerCount('General', 'maxPlayersNormal')}
							${this.renderPlayerCount('Direct', 'maxPlayersDirect')}
							${this.renderPlayerCount('Party', 'maxPlayersParty')}
						</div>
						<h4>Idle Lobby Count</h4>
						${idleLobbyCountErrors.length
							? html`<error-list .errors=${idleLobbyCountErrors}></error-list>`
							: null}
						<div class="row">
							<div class="idle-lobby-count">
								<h5>Min</h5>
								${this.editing
									? html`<text-input
											class="short"
											number
											placeholder="Count"
											.min=${0}
											.max=${IDLE_LOBBY_COUNT_MIN_MAX}
											.init=${this.minIdleLobbiesValue.toString()}
											@input=${this.changeMinIdleLobbiesValue.bind(this)}
									  ></text-input>`
									: html`<p class="immut-info">${this.minIdleLobbiesValue}</p>`}
							</div>
							<div class="idle-lobby-count">
								<h5>Max</h5>
								${this.editing
									? html`<text-input
											class="short"
											number
											placeholder="Count"
											.min=${0}
											.max=${IDLE_LOBBY_COUNT_MAX}
											.init=${this.maxIdleLobbiesValue.toString()}
											@input=${this.changeMaxIdleLobbiesValue.bind(this)}
									  ></text-input>`
									: html`<p class="immut-info">${this.maxIdleLobbiesValue}</p>`}
							</div>
						</div>
						<h4>Tier Configuration</h4>
						${this.editing
							? html`<drop-down-list
									.selection=${tierSelection}
									.options=${tierOptions}
									@select=${this.changeTierValue.bind(this)}
							  ></drop-down-list>`
							: html`<p class="immut-info">${tierSelection.template}</p>`}
					</div>
					<div class="column">
						<h4>Regions</h4>
						${regionError ? html`<error-list .errors=${[regionError]}></error-list>` : null}
						<div id="regions" class="list">
							${repeat(
								this.game.availableRegions,
								r => r.regionId,
								this.renderRegion.bind(this)
							)}
						</div>
					</div>
				</div>
			</div>
		`;
	}

	renderPlayerCount(label: string, key: keyof cloud.LobbyGroup) {
		return html`
			<div class="player-count">
				<h5>${label}</h5>
				${this.editing
					? html`<text-input
							class="short"
							number
							placeholder="Count"
							.min=${1}
							.max=${PLAYER_COUNT_MAX}
							.init=${this.config[key] as string}
							@input=${this.updatePlayerCount.bind(this, key)}
					  ></text-input>`
					: html`<p class="immut-info">${this.config[key]}</p>`}
			</div>
		`;
	}

	renderRegion(region: cloud.RegionSummary, index: number) {
		let regionErrors = this.lobbyErrors
			.find('regions', index)
			.filter(a => !a.path.includes('idle-lobbies'))
			.map(a => a.format());

		let hasRegion = this.config.regions.findIndex(x => x.regionId == region.regionId) != -1;

		let regionIcon = getRegionEmoji(region.universalRegion);

		let classes = classMap({
			region: true,
			item: true,
			selected: hasRegion
		});

		if (this.editing) {
			return html`${regionErrors.length
					? html`<error-list .errors=${regionErrors}></error-list>`
					: null}
				<div class=${classes} @click=${this.toggleRegion.bind(this, region.regionId)}>
					<div class="region-info">
						<e-svg preserve src=${regionIcon}></e-svg>
						<h3>${region.regionDisplayName}</h3>
					</div>
					<check-box ?checked=${hasRegion}></check-box>
				</div>`;
		} else {
			if (hasRegion) {
				return html` <div class="region immut-info">
					<div class="region-info">
						<e-svg preserve src=${regionIcon}></e-svg>
						<h3>${region.regionDisplayName}</h3>
					</div>
				</div>`;
			} else {
				return null;
			}
		}
	}
}
