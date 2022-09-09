import { LitElement, html, customElement, property, css } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './notification-overlay.scss';
import timing from '../../utils/timing';
import { globalEventGroups, GlobalMobileChangeEvent, NotificationEvent } from '../../utils/global-events';
import { classMap } from 'lit-html/directives/class-map';
import logging from '../../utils/logging';
import { repeat } from 'lit-html/directives/repeat';

import global from '../../utils/global';
import * as api from '../../utils/api';

const NOTIFICATION_LIFESPAN = timing.seconds(6);
const NOTIFICATION_FADE_LENGTH = timing.milliseconds(200); // Match with consts.scss/$transition-length

interface TimeoutNotification {
	id: string;
	chatMessage: api.identity.GlobalEventChatMessage;
	timeoutId: number;
	isFading: boolean;
}

@customElement('notification-overlay')
export default class NotificationOverlay extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	notifications: TimeoutNotification[] = [];

	eventStream: api.RepeatingRequest<api.identity.GetEventsCommandOutput>;

	// === EVENT HANDLERS ===
	handleNotification: (e: NotificationEvent) => void;
	handleMobile: (e: GlobalMobileChangeEvent) => void;

	async connectedCallback() {
		super.connectedCallback();

		// Handle mobile change
		this.handleMobile = this.onMobile.bind(this);
		globalEventGroups.add('mobile', this.handleMobile);

		this.handleNotification = this.onNotification.bind(this);
		globalEventGroups.add('notification', this.handleNotification);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		if (this.eventStream) this.eventStream.cancel();

		// Remove event handler
		globalEventGroups.remove('mobile', this.handleMobile);
	}

	// Update on mobile change
	onMobile() {
		this.requestUpdate();
	}

	onNotification(e: NotificationEvent) {
		let chatMessage = e.value.kind.chatMessage;
		let notification = e.value.notification;

		let timeoutId = window.setTimeout(
			() => this.dismissNotification(chatMessage.thread.tailMessage.id),
			NOTIFICATION_LIFESPAN
		);

		// Insert notification
		this.notifications.unshift({
			id: chatMessage.thread.tailMessage.id,
			chatMessage,
			timeoutId: timeoutId,
			isFading: false
		});
		this.requestUpdate('notifications');
	}

	dismissNotification(id: string) {
		// Get the notification
		let notification = this.notifications.find(n => n.id == id);
		if (!notification) {
			logging.warn(`Attempted to dismiss notification with id ${id} that does not exist`);
			return;
		}

		if (notification.isFading) {
			logging.warn(`Attempted to dismiss notification with id ${id} that is already being dismissed`);
			return;
		} else {
			// Set notification as "fading" for SCSS animation
			notification.isFading = true;
			this.requestUpdate('notifications');

			// Remove it
			window.clearTimeout(notification.timeoutId);
			notification.timeoutId = window.setTimeout(() => {
				this.removeNotification(id);
			}, NOTIFICATION_FADE_LENGTH);
		}
	}

	// Different from dismissNotification, which has a fade animation
	removeNotification(id: string) {
		// Get the notification index
		let index = this.notifications.findIndex(n => n.id == id);
		if (index == -1) {
			logging.warn(`Attempted to remove notification with id ${id} that does not exist`);
			return;
		}

		let notification = this.notifications[index];

		// Stop removal timer on hover
		window.clearTimeout(notification.timeoutId);

		this.notifications.splice(index, 1);
		this.requestUpdate('notifications');
	}

	pointerEnterNotification(id: string, e: Event) {
		// Prevent sidebar from sliding open on notification swipe
		if (global.isMobile) {
			e.stopPropagation();
		}

		// Get the notification
		let notification = this.notifications.find(n => n.id == id);
		if (!notification) return;

		notification.isFading = false;

		// Stop removal timer on hover
		window.clearTimeout(notification.timeoutId);
	}

	pointerLeaveNotification(id: string, e: Event) {
		// Get the notification
		let notification = this.notifications.find(n => n.id == id);
		if (!notification) return;

		// Start removal timer on pointerout
		notification.timeoutId = window.setTimeout(() => this.dismissNotification(id), NOTIFICATION_LIFESPAN);
	}

	render() {
		if (global.isMobile) {
			// Dismiss all notifications except the most recent one when on mobile
			for (let i = 0; i < this.notifications.length; i++) {
				let notification = this.notifications[i];

				if (i != 0 && !notification.isFading) {
					this.dismissNotification(notification.id);
				}
			}
		}

		return html`
			<div id="base">
				${repeat(
					this.notifications,
					n => n.id,
					n => {
						let chatMessage = n.chatMessage;
						let classes = classMap({ fading: n.isFading });

						return html` <identity-notification
							class=${classes}
							.notification=${chatMessage}
							@opened=${this.dismissNotification.bind(this, n.id)}
							@pointerenter=${this.pointerEnterNotification.bind(this, n.id)}
							@pointerleave=${this.pointerLeaveNotification.bind(this, n.id)}
							@pointercancel=${this.pointerLeaveNotification.bind(this, n.id)}
							@close=${this.removeNotification.bind(this, n.id)}
							@drop=${this.dismissNotification.bind(this, n.id)}
							temporary
						>
						</identity-notification>`;
					}
				)}
			</div>
		`;
	}
}
