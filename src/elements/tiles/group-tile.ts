import { customElement, html, LitElement, property } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../utils/css';
import styles from './group-tile.scss';
import routes from '../../routes';

import assets from '../../data/assets';
import { groupRouteData } from '../../data/group';
import numbro from 'numbro';
import * as api from '../../utils/api';

@customElement('group-tile')
export default class GroupTile extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	group: api.portal.GroupSummary;

	render() {
		// TODO: REMOVE ON PROD

		let formattedMemberCount =
			this.group.memberCount >= 2000
				? numbro(this.group.memberCount).format('0,0a')
				: numbro(this.group.memberCount).format('0,0');
		let linkedGames: api.portal.GameSummary[] = []; // TODO: Use dev linked games

		return html`
			<a id="base" href=${routes.group.build(groupRouteData(this.group))}>
				${this.group.avatarUrl
					? html`<group-avatar
							id="background-img"
							.rounded=${false}
							.noPlaceholder=${true}
							.group=${this.group}
					  ></group-avatar>`
					: html`<div id="background"></div>`}
				<!-- Details -->
				<div id="details">
					<!-- Title -->
					<h1 id="title">${this.group.displayName}</h1>
					<!-- Member Count -->
					<h2 id="member-count"><e-svg src="solid/user"></e-svg>${formattedMemberCount}</h2>
				</div>

				<!-- Hover Details -->
				<div id="hover-details">
					<h1 id="details-title">Group Games</h1>
					<!-- Games -->
					<div id="official-games">
						${repeat(
							linkedGames,
							g => html`
								<div class="game-icon">
									<lazy-img
										src=${assets.gameLogoUrl(g.nameId)}
										bg-size="contain"
									></lazy-img>
								</div>
							`
						)}
						${linkedGames.length == 0 ? 'No Group Games' : null}
					</div>
				</div>
			</a>
		`;
	}
}
