import { LitElement, html, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { cssify } from '../../utils/css';
import styles from './identity-tile.scss';
import routes from '../../routes';

import { identityRouteData } from '../../data/identity';
import utils from '../../utils/utils';
import { showIdentityContextMenu } from '../../ui/helpers';
import * as api from '../../utils/api';

@customElement('identity-tile')
export default class IdentityTile extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	identity: api.identity.IdentityHandle;

	@property({ type: Object })
	partyState: api.party.PartyMemberState;

	@property({ type: Boolean, attribute: 'offline-opacity' })
	offlineOpacity: boolean = false;

	@property({ type: Boolean, attribute: 'no-link' })
	noLink: boolean = false;

	@property({ type: Boolean, attribute: 'hide-status' })
	hideStatus: boolean = false;

	@property({ type: Boolean, attribute: 'light' })
	light: boolean = false;

	isHovering: boolean;

	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();

		// TODO: update events
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Dispose event
	}

	render() {
		let classes = classMap({
			'offline-opacity':
				this.offlineOpacity &&
				this.identity.presence &&
				this.identity.presence.status == api.identity.IdentityStatus.OFFLINE,
			'has-link': !this.noLink,
			light: this.light
		});
		return html`
			<div id="base" class=${classes} @contextmenu=${showIdentityContextMenu(this.identity)}>
				${this.noLink
					? null
					: html`<a id="link" href=${routes.identity.build(identityRouteData(this.identity))}></a>`}
				<identity-avatar
					.link=${!this.noLink}
					.hideStatus=${this.hideStatus /*  */}
					.identity=${this.identity}
				></identity-avatar>
				<div id="spaced">
					<div id="content">
						<identity-name .identity=${this.identity} no-link></identity-name>
						${this.partyState
							? this.renderPartyState()
							: this.identity.presence
							? html`<h2 id="activity">${utils.formatActivity(this.identity.presence)}</h2>`
							: null}
					</div>
					<slot name="right"></slot>
				</div>
			</div>
		`;
	}

	renderPartyState() {
		if (this.partyState.matchmakerPending || this.partyState.matchmakerFindingLobby) {
			return html`<h2 id="activity">Matching...</h2>`;
		} else if (this.partyState.matchmakerLobby) {
			return html`<h2 id="activity">In Game</h2>`;
		}

		return null;
	}
}
