import { LitElement, html, customElement, property, css, TemplateResult } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './identity-notification.scss';
import { classMap } from 'lit-html/directives/class-map';

import { styleMap } from 'lit-html/directives/style-map';
import global from '../../utils/global';
import utils, { SwipeDirection } from '../../utils/utils';
import { MIN_SWIPE_THRESHOLD } from '../root/ui-root';
import * as api from '../../utils/api';
import routes from '../../routes';
import UIRouter from '../root/ui-router';
import logging from '../../utils/logging';
import { getMessageBody } from '../../utils/chat';
import { groupRouteData } from '../../data/group';

@customElement('identity-notification')
export default class IdentityNotificationDisplay extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	notification: api.identity.GlobalEventChatMessage;

	@property({ type: Boolean })
	temporary: boolean = false;

	// === TOUCH DATA ===
	startTouch: Touch = null;
	startTouchTime: number = null;
	swipeActive: boolean = false;
	swipeDirection: SwipeDirection = SwipeDirection.None;
	@property({ type: Boolean })
	sidebarOpen: boolean = false;
	@property({ type: Number })
	touchDifferenceX: number = null;
	@property({ type: Number })
	touchDifferenceY: number = null;

	onClick() {
		// Handle the notification
		if (this.notification.thread.topic.group) {
			// Open the party
			UIRouter.shared.navigate(
				routes.groupChat.build(groupRouteData(this.notification.thread.topic.group.group))
			);
		} else if (this.notification.thread.topic.direct) {
			let direct = this.notification.thread.topic.direct;

			// Open the identity
			UIRouter.shared.navigate(
				routes.identityDirectChat.build({
					id:
						direct.identityA.id == global.currentIdentity.id
							? direct.identityB.id
							: direct.identityA.id
				})
			);
		} else if (this.notification.thread.topic.party) {
			// Open the party
			UIRouter.shared.navigate(
				routes.party.build({ id: this.notification.thread.topic.party.party.id })
			);
		} else {
			logging.warn('Failed to find action for notification', this.notification);
		}

		// Dispatch opened event
		this.dispatchEvent(new Event('opened'));
	}

	close(e?: Event) {
		// Prevent click event from propagating down and opening the notification
		if (e) {
			e.stopPropagation();
		}

		// Dispatch close event
		this.dispatchEvent(new Event('close'));
	}

	onTouchStart(e: TouchEvent) {
		this.startTouch = e.changedTouches[0];
		this.startTouchTime = performance.now();
		this.touchDifferenceX = 0;
		this.touchDifferenceY = 0;
	}

	onTouchMove(e: TouchEvent) {
		if (this.startTouch) {
			this.touchDifferenceX = e.changedTouches[0].pageX - this.startTouch.pageX;
			this.touchDifferenceY = e.changedTouches[0].pageY - this.startTouch.pageY;

			// If no swipe is currently active, check for swipe
			if (!this.swipeActive) {
				// Check if a swipe has occurred
				if (
					Math.abs(this.touchDifferenceX) > MIN_SWIPE_THRESHOLD ||
					Math.abs(this.touchDifferenceY) > MIN_SWIPE_THRESHOLD
				) {
					this.swipeDirection = utils.determineSwipeDirection(
						this.touchDifferenceX,
						this.touchDifferenceY
					);

					// Detect horizontal swipe or up swipe
					if (
						this.swipeDirection == SwipeDirection.Up ||
						this.swipeDirection == SwipeDirection.Right ||
						this.swipeDirection == SwipeDirection.Left
					)
						this.swipeActive = true;
					// Cancel swipe if vertical swipe detected
					else this.stopTouch();
				}
			}

			// Not part of the previous if statement because swipeDirection mutates
			if (this.swipeActive) {
				// Offset the swipe distance after a swipe is detected
				if (this.swipeDirection == SwipeDirection.Up) {
					this.touchDifferenceY += MIN_SWIPE_THRESHOLD;
				} else if (this.swipeDirection == SwipeDirection.Right) {
					this.touchDifferenceX -= MIN_SWIPE_THRESHOLD;
				} else if (this.swipeDirection == SwipeDirection.Left) {
					this.touchDifferenceX += MIN_SWIPE_THRESHOLD;
				}
			}
		}
	}

	onTouchEnd(e: TouchEvent) {
		if (this.startTouch) {
			if (this.swipeActive) {
				this.touchDifferenceX = e.changedTouches[0].pageX - this.startTouch.pageX;
				this.touchDifferenceY = e.changedTouches[0].pageY - this.startTouch.pageY;

				// Apply velocity to swipe
				let elapsed = Math.min(300, performance.now() - this.startTouchTime) / 300;
				let swipeX = this.touchDifferenceX / Math.max(0.2, elapsed);
				let swipeY = this.touchDifferenceY / Math.max(0.2, elapsed);

				// Dispatch swipe away event
				if (Math.abs(swipeX) > 80 || swipeY < -37) {
					this.dispatchEvent(new Event('drop'));

					this.swipeDirection = utils.determineSwipeDirection(
						this.touchDifferenceX,
						this.touchDifferenceY
					);
					this.stopTouch(true);
				} else this.stopTouch();
			} else {
				this.stopTouch();
			}
		}
	}

	stopTouch(noSwipeReset: boolean = false) {
		this.startTouch = null;
		this.startTouchTime = null;
		this.swipeActive = false;
		if (!noSwipeReset) this.swipeDirection = SwipeDirection.None;
		this.touchDifferenceX = null;
		this.touchDifferenceY = null;
	}

	render() {
		// Animation related classes
		let classes = classMap({
			temporary: this.temporary,
			'swipe-up': this.swipeDirection == SwipeDirection.Up,
			'swipe-right': this.swipeDirection == SwipeDirection.Right,
			'swipe-left': this.swipeDirection == SwipeDirection.Left,
			'touch-down': this.swipeActive
		});

		// Swipe transform when touch is active
		let style = styleMap({
			transform: this.swipeActive
				? this.swipeDirection != SwipeDirection.Up
					? `translateX(${this.touchDifferenceX}px)`
					: `translateY(${Math.min(0, this.touchDifferenceY)}px)`
				: null
		});

		// Render message subtitle separately (can return null)
		let subtitle = this.messageSubtitle();
		return html`
			<div id="expand">
				<div
					id="base"
					class=${classes}
					style=${style}
					@click=${this.onClick.bind(this)}
					@touchstart=${{ handleEvent: this.onTouchStart.bind(this), passive: true }}
					@touchmove=${{ handleEvent: this.onTouchMove.bind(this), passive: true }}
					@touchend=${this.onTouchEnd.bind(this)}
					@touchcancel=${this.onTouchEnd.bind(this)}
				>
					<div id="title-holder">
						<div id="title">
							${this.messageIcon()}
							<h1 id="title-text">${this.messageTitle()}</h1>
						</div>
						<div id="close-holder">
							<date-display id="date" short .timestamp=${Date.now()}></date-display>
							<e-svg id="close" src="regular/xmark" @click=${this.close.bind(this)}></e-svg>
						</div>
					</div>
					${subtitle ? html`<div id="subtitle">${this.messageSubtitle()}</div>` : null}
					${this.messageDetails()}
				</div>
			</div>
		`;
	}

	messageIcon() {
		let topic = this.notification.thread.topic;

		if (topic.group) {
			console.log(topic.group.group);
			return html`<group-avatar id="title-icon" .group=${topic.group.group}></group-avatar>`;
		} else if (topic.direct) {
			let otherIdentity =
				topic.direct.identityA.id == global.currentIdentity.id
					? topic.direct.identityB
					: topic.direct.identityA;
			return html`<identity-avatar id="title-icon" .identity=${otherIdentity}></identity-avatar>`;
		} else return null;
	}

	messageTitle() {
		let topic = this.notification.thread.topic;

		if (topic.group) {
			return html`<span id="group-title">${topic.group.group.displayName}</span>`;
		} else if (topic.direct) {
			let otherIdentity =
				topic.direct.identityA.id == global.currentIdentity.id
					? topic.direct.identityB
					: topic.direct.identityA;
			return html`<identity-name no-link .identity=${otherIdentity}></identity-name>`;
		} else return null;
	}

	messageSubtitle() {
		let msg = this.notification.thread.tailMessage;
		let topic = this.notification.thread.topic;

		if (msg.body.text) {
			if (topic.group) {
				return msg.body.text.sender.displayName;
			}

			return null;
		} else return null;
	}

	messageDetails() {
		let msg = this.notification.thread.tailMessage;
		let body = getMessageBody(msg as api.chat.ChatMessage);

		if (msg.body.text) {
			return html`<rich-text
				id="details"
				.content=${utils.truncateText((body as string).trim(), 200)}
			></rich-text>`;
		} else return html`<div id="details">${body}</div>`;
	}
}
