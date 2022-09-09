import { LitElement, html, customElement, property, PropertyValues } from 'lit-element';
import routes, { responses } from '../../routes';
import { cssify } from '../../utils/css';
import global from '../../utils/global';
import UIRouter from '../root/ui-router';

// NOTE: Intermediate page that automatically routes the user from a /thread/ url to the correct chat url
@customElement('page-thread-resolve')
export default class ThreadResolvePage extends LitElement {
	// static styles = cssify(styles);

	@property({ type: String })
	threadId: string;

	@property({ type: Object })
	loadError?: any = null;

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		this.resolveThread();
	}

	async resolveThread() {
		try {
			let res = await global.live.chat.getThreadTopic({ threadId: this.threadId });
			let url;

			if (res.topic.group) {
				url = routes.groupChat.build({ id: res.topic.group.groupId });
			} else if (res.topic.party) {
				// TODO: Party
				// url = routes.partyChat.build({id: res.topic.group.partyId});
			} else if (res.topic.direct) {
				let notMe =
					res.topic.direct.identityAId == global.currentIdentity.id
						? res.topic.direct.identityBId
						: res.topic.direct.identityAId;
				url = routes.identityDirectChat.build({ id: notMe });
			}

			if (url) {
				UIRouter.shared.navigate(url, {
					replaceHistory: true,
					disableAnimation: true
				});
			} else {
				this.loadError = 'Invalid topic variant';
			}
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		return null;
	}
}
