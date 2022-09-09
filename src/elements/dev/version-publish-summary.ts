import { LitElement, html, customElement, property, query } from 'lit-element';
import styles from './version-publish-summary.scss';
import { cssify } from '../../utils/css';
import { repeat } from 'lit-html/directives/repeat';
import { classMap } from 'lit-html/directives/class-map';
import utils from '../../utils/utils';
import cloud from '@rivet-gg/cloud';
import { getRegionEmoji } from '../../utils/emoji';

@customElement('version-publish-summary')
export default class VersionPublishSumary extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Object })
	tiers: cloud.RegionTier[] = [];

	@property({ type: Array })
	namespaces: string[] = [];

	@property({ type: Object })
	config: cloud.CloudVersionConfig;

	noServices() {
		return !this.config.cdn && !this.config.matchmaker && !this.config.kv;
	}

	render() {
		let namespaces = this.game.namespaces
			.filter(n => this.namespaces.includes(n.namespaceId))
			.map(n => n.displayName);

		return html`
			<div id="base">
				<h2>${namespaces.length ? utils.formatList(namespaces, 4, '&') : 'No namespaces'}</h2>
				<div id="services" class="light-scrollbar">
					${this.noServices() ? html`<p class="muted-text">No services selected</p>` : null}
					${this.config.cdn ? this.renderCdn() : null}
					${this.config.matchmaker ? this.renderMatchmaker() : null}
					${this.config.kv ? this.renderKv() : null}
				</div>
				<em class="footnote"
					>Fees and charges that are billed for usage, such as the service “Elastic Lobbies”, are
					billed by the second. Usage is rounded up to the nearest second and cent.</em
				>
			</div>
		`;
	}

	renderCdn() {
		return html`<div class="service">
			<div class="service-header">
				<div class="service-name">
					<e-svg preserve non-icon src="/products/cdn"></e-svg>
					<h3>CDN</h3>
					<div class="service-tag">BETA</div>
				</div>
				<span class="price">Free (while in beta)</span>
			</div>
		</div>`;
	}

	renderMatchmaker() {
		return html`<div class="service">
			<div class="service-header">
				<div class="service-name">
					<e-svg preserve non-icon src="/products/matchmaker"></e-svg>
					<h3>Elastic Lobbies</h3>
				</div>
			</div>
			<div class="service-body">
				${this.config.matchmaker.lobbyGroups.length
					? repeat(
							this.config.matchmaker.lobbyGroups,
							(_, i) => i,
							l => {
								return html`<div class="lobby-group">
									<h4 class="lobby-group-header">${l.nameId}</h4>
									${repeat(l.regions, (_, i) => i, this.renderRegion.bind(this))}
								</div>`;
							}
					  )
					: html`<p class="muted-text">No gamemodes</p>`}
			</div>
		</div>`;
	}

	renderKv() {
		return html`<div class="service">
			<div class="service-header">
				<div class="service-name">
					<e-svg preserve non-icon src="/products/database"></e-svg>
					<h3>KV</h3>
					<div class="service-tag">BETA</div>
				</div>
				<span class="price">Free (while in beta)</span>
			</div>
		</div>`;
	}

	renderRegion(r: cloud.LobbyGroupRegion) {
		let tierConfig = this.tiers.find(t => t.tierNameId == r.tierNameId);
		let regionConfig = this.game.availableRegions.find(a => r.regionId == a.regionId);
		let pricePerHour = (tierConfig.pricePerSecond / 1000000000000) * 60 * 60;
		let pricePerMonth = pricePerHour * 24 * 30;
		let idleLobbyCount = r.idleLobbies ? r.idleLobbies.minIdleLobbies : 0;

		let regionIcon = getRegionEmoji(regionConfig.universalRegion);

		let formattedTierNameId = r.tierNameId
			.replace('basic', 'Basic')
			.replace(/-/g, ' ')
			.replace(/(\d+)d(\d+)/, '$1/$2');

		return html`<div class="region">
			<ul>
				<li>
					<e-svg class="region-icon" preserve src=${regionIcon}></e-svg>
					${regionConfig.regionDisplayName} (${formattedTierNameId})
				</li>
				<li class="expanded-list-item">
					<p>Lobbies</p>
					<p>
						<price-display
							.amount=${pricePerHour}
							decimal-places="4"
							no-small-text
						></price-display
						>/lobby/hr
					</p>
				</li>
				<li class="expanded-list-item">
					<p>Idle lobbies</p>
					<p>
						${idleLobbyCount != 0 ? '~' : null}
						<price-display .amount=${pricePerMonth * idleLobbyCount} no-small-text></price-display
						>/mo
					</p>
				</li>
			</ul>
		</div>`;
	}
}
