import { LitElement, html, customElement, property, css } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './identity-feed-item.scss';
import routes from '../../routes';
import { showIdentityContextMenu } from '../../ui/helpers';
import assets from '../../data/assets';
import { identityRouteData } from '../../data/identity';
import * as api from '../../utils/api';

@customElement('identity-feed-item')
export default class IdentityFeedItem extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	identity: api.identity.IdentityHandle;

	render() {
		return html`
			<div id="base" @contextmenu=${showIdentityContextMenu(this.identity)}>
				<a class="identity" href=${routes.identity.build(identityRouteData(this.identity))}>
					<identity-avatar class="icon" .identity=${this.identity} hide-status></identity-avatar>
					<div class="name">
						<identity-name .identity=${this.identity} no-link .identity-name></identity-name>
						<!-- <span>with 3 others</span> -->
					</div>
				</a>
				<div class="activity">${this.formatActivity(this.identity.presence)}</div>
			</div>
		`;
	}

	// TODO: Abstract into utils
	// Also see: utils.formatActivity
	formatActivity(presence: api.identity.IdentityPresence) {
		if (presence.gameActivity != null) {
			// TODO: Party
			return html`
				<lazy-img class="icon" src=${assets.gameLogoUrl('galax')}></lazy-img>
				<div class="information">
					<div class="title">Galax.io</div>
					<div class="subtitle">For 3 hours${presence.party ? ' in party' : ''}</div>
				</div>
			`;
		} else if (presence.party) {
			return `In party`;
		} else {
			return null;
		}
	}
}
