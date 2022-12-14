import { LitElement, html, customElement, property, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../utils/css';
import styles from './game-stats.scss';
import format from '../../utils/stat-format';
import routes from '../../routes';
import assets from '../../data/assets';
import * as api from '../../utils/api';

const DISPLAY_STAT_COUNT: number = 6;

@customElement('game-stats')
export default class GameStats extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	identity?: api.identity.IdentityProfile;

	@property({ type: Object })
	group?: api.group.GroupProfile;

	@property({ type: Object })
	data: api.identity.GameStatSummary;

	@property({ type: Boolean })
	achievementsExpanded: boolean = false;

	render() {
		let canExpand = this.data.stats.length > DISPLAY_STAT_COUNT;
		// Temporary
		canExpand = true;

		return html`
			<div id="base">
				<a id="game-logo" href=${routes.game.build({ nameId: this.data.game.nameId })}
					><lazy-img src=${assets.gameLogoUrl(this.data.game.nameId)} bg-size="contain"></lazy-img
				></a>
				<div id="name">${this.data.game.displayName}</div>

				<!-- Stats -->
				<div id="stats">
					${repeat(
						this.data.stats.slice(0, DISPLAY_STAT_COUNT),
						s => s.config.recordId,
						stat => this.renderStat(stat)
					)}
				</div>

				<!-- More Button -->
				${canExpand
					? html` <div id="footer">
							${this.identity
								? html`<a
										href=${routes.identityGameStat.build({
											id: this.identity.id,
											gameNameId: this.data.game.nameId
										})}
								  >
										<stylized-button id="expand-button">EXPAND</stylized-button>
								  </a>`
								: this.group
								? html`<a
										href=${routes.groupGameStat.build({
											id: this.group.id,
											gameNameId: this.data.game.nameId
										})}
								  >
										<stylized-button id="expand-button">EXPAND</stylized-button>
								  </a>`
								: null}
					  </div>`
					: null}
			</div>
		`;
	}

	renderStat(stat: api.identity.GameStat) {
		return html` <div class="stat">
			<div class="rating">top 67%</div>
			<div class="value">${format.richFormatValue(stat) || '--'}</div>
			<div class="name">${stat.config.displayName}</div>
		</div>`;
	}
}
