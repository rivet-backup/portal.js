import { customElement, html, LitElement, property, PropertyValues, query } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../utils/css';
import global from '../../utils/global';
import styles from './horizontal-feed.scss';
import routes, { responses } from '../../routes';
import { showIdentityContextMenu } from '../../ui/helpers';
import { identityRouteData } from '../../data/identity';
import assets from '../../data/assets';
import * as api from '../../utils/api';

@customElement('horizontal-feed')
export default class HorizontalFeed extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	loadError?: any = null;

	// Event listeners
	feedStream?: api.RepeatingRequest<void>;
	feedIdentities: api.identity.IdentityHandle[] = [];

	@property({ type: Boolean, attribute: 'inactive' })
	inactive: boolean = false;

	swapPosition: boolean = false;
	oldScrollTop: number = 0;
	feedMargin: number = 0;
	oldOffsetTop: number = 0;
	movingDown: boolean = true;

	@query('#base')
	baseElement: HTMLElement;

	// === TOUCH DATA ===
	swipeActive: boolean = false;

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		if (!this.inactive) {
			// Fetch events
			// this.feedStream = new api.RepeatingRequest(async (abortSignal, watchIndex) => {
			// 	return await global.live.portal.getArcadeFeed({ watchIndex }, { abortSignal });
			// });
			// this.feedStream.onMessage(res => {
			// 	this.feedIdentities = res.identities;
			// 	this.requestUpdate('feedIdentities');
			// });
			// this.feedStream.onError(err => {
			// 	this.loadError = err;
			// });
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Dispose of the event listeners
		if (this.feedStream) this.feedStream.cancel();
	}

	onTouchStart(e: TouchEvent) {
		let target = e.currentTarget as HTMLElement;

		// Check if the feed is not scrolled all the way to the left
		if (target.scrollLeft != 0) this.swipeActive = true;
	}

	onTouchMove(e: TouchEvent) {
		// Prevent sidebar from opening
		if (this.swipeActive) e.stopPropagation();
	}

	onTouchEnd(e: TouchEvent) {
		if (this.swipeActive) {
			this.swipeActive = false;

			// Prevent sidebar from opening
			e.stopPropagation();
		}
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		// TODO: DELETE ON PROD
		this.feedIdentities = [...Array(3)].map(
			() =>
				({
					id: '',
					displayName: ['Nicholas Kissel', 'Nathan Flurry', 'Zack'][Math.round(Math.random() * 2)],
					accountNumber: 1234,
					avatarUrl: `https://assets.rivet.gg/avatars/avatar-${Math.round(Math.random() * 7)}.png`,
					presence: {
						updateTs: 0,
						status: api.identity.IdentityStatus.ONLINE,
						game: {
							id: '',
							nameId: '',
							displayName: ''
						},
						party: null,
						gameActivity: null
					},
					isRegistered: false,
					isClaimed: false,
					isAdmin: false,
					external: {
						profile: ''
					},
				} as api.identity.IdentityHandle)
		);

		return html`
			<div id="base">
				${this.feedIdentities.length
					? html` <div
							id="feed"
							@touchstart=${this.onTouchStart.bind(this)}
							@touchmove=${this.onTouchMove.bind(this)}
							@touchend=${this.onTouchEnd.bind(this)}
							@touchcancel=${this.onTouchEnd.bind(this)}
					  >
							${repeat(
								this.feedIdentities,
								a => a,
								a => html`<identity-feed-item .identity=${a}></identity-feed-item>`
							)}
					  </div>`
					: html`<p>No friend activity here :(</p>`}
			</div>
		`;
	}

	renderIdentity(identity: api.identity.IdentityHandle) {
		return html`
			<div class="feed-item" @contextmenu=${showIdentityContextMenu(identity)}>
				<a class="identity" href=${routes.identity.build(identityRouteData(identity))}>
					<identity-avatar class="icon" .identity=${identity}></identity-avatar>
					<div class="name">
						<identity-name .identity=${identity} no-link .identity-name></identity-name>
						<!-- <span>with 3 others</span> -->
					</div>
				</a>
				<div class="activity">
					<lazy-img class="icon" src=${assets.gameLogoUrl('galax')}></lazy-img>
					<div class="information">
						<div class="title">Galax.io</div>
						<div class="subtitle">For 3 hours</div>
					</div>
				</div>
			</div>
		`;
	}
}
