import { LitElement, html, customElement, property, css } from 'lit-element';
import routes, { responses } from '../../routes';
import { cssify } from '../../utils/css';
import styles from './group-invite.scss';
import { classMap } from 'lit-html/directives/class-map';

import global from '../../utils/global';
import * as api from '../../utils/api';
import UIRouter from '../root/ui-router';

@customElement('page-group-invite')
export default class GroupInvitePage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	code: string = '';

	@property({ type: Object })
	loadError?: any;

	@property({ type: String })
	codeError: string = '';

	@property({ type: Boolean })
	isConsuming: boolean = false;

	connectedCallback() {
		super.connectedCallback();

		if (this.code) this.consumeGroupInvite();
		else this.code = '';
	}

	async consumeGroupInvite() {
		try {
			this.codeError = '';
			this.isConsuming = true;
			let res = await global.live.group.consumeGroupInvite({ groupInviteCode: this.code });

			if (res.error) {
				if (res.error == api.group.GroupInviteErrorCode.INVITE_CODE_INVALID) {
					this.codeError = 'Invite code invalid';
				} else if (res.error == api.group.GroupInviteErrorCode.INVITE_EXPIRED) {
					this.codeError = 'Invite expired';
				} else if (res.error == api.group.GroupInviteErrorCode.INVITE_REVOKED) {
					this.codeError = 'Invite revoked';
				} else if (res.error == api.group.GroupInviteErrorCode.INVITE_ALREADY_USED) {
					this.codeError = 'Invite max use limit reached';
				} else if (res.error == api.group.GroupInviteErrorCode.IDENTITY_ALREADY_GROUP_MEMBER) {
					UIRouter.shared.navigate(routes.group.build({ id: res.groupId }), {
						replaceHistory: true
					});
				} else {
					this.codeError = 'Unknown error';
				}
			} else {
				UIRouter.shared.navigate(routes.group.build({ id: res.groupId }), { replaceHistory: true });
			}
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}

		this.isConsuming = false;
	}

	codeChange(event: Event) {
		let target = event.target as HTMLInputElement;

		this.code = target.value.trim();

		if (!this.code.trim().length) {
			this.codeError = 'Invalid code';
		} else this.codeError = null;
	}

	codeKeyPress(event: KeyboardEvent) {
		// Enter is pressed
		if (this.codeError == null && event.key == 'Enter') this.consumeGroupInvite();
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		return html`
			<div id="base">
				<div id="center" class=${classMap({ hidden: this.isConsuming })}>
					<h1>Join a Group</h1>
					<h2>Have an invite code? Paste it here and join your group.</h2>
					<div id="input-area">
						<text-input
							.value=${this.code}
							placeholder="Code"
							maxlength="8"
							@input=${this.codeChange.bind(this)}
							@keydown=${this.codeKeyPress.bind(this)}
							.filter=${(value: string) => value.replace(/[^a-z0-9]/gi, '')}
						></text-input>
						<stylized-button
							.isDisabled=${this.code.length != 8}
							.trigger=${this.consumeGroupInvite.bind(this)}
							>Join</stylized-button
						>
					</div>
					${this.codeError ? html`<p id="error">${this.codeError}</p>` : null}
				</div>
				${this.isConsuming
					? html` <div id="wait">
							<loading-wheel .message=${'Please wait...'}></loading-wheel>
					  </div>`
					: null}
			</div>
		`;
	}
}
