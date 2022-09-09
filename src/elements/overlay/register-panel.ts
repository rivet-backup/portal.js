import { LitElement, html, customElement, property, query } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './register-panel.scss';
import global from '../../utils/global';
import { classMap } from 'lit-html/directives/class-map';
import { responses } from '../../routes';
import logging from '../../utils/logging';
import { default as timing, wait } from '../../utils/timing';
import TextInput from '../dev/text-input';
import { bombPrivateCache } from '../../utils/cache';
import * as api from '../../utils/api';
import * as broadcast from '../../data/broadcast';

export const VALIDATE_EMAIL =
	/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

@customElement('register-panel')
export default class RegisterPanel extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	email: string = '';

	@property({ type: String })
	code: string = '';

	@property({ type: String })
	emailError: string = '';

	@property({ type: String })
	codeError: string = '';

	@property({ type: String })
	loadingMessage: string = 'Please wait...';

	@property({ type: Boolean })
	isCompleting: boolean = false;

	@property({ type: Boolean })
	codeModalActive: boolean = false;

	@property({ type: Boolean })
	wait: boolean = false;

	@property({ type: String })
	verificationId: string = null;

	@property({ type: Object })
	loadError?: any;

	@query('#email-input')
	emailInput: TextInput;

	@query('#namespace-display-name-input')
	codeInput: TextInput;

	emailChange(event: Event) {
		let target = event.target as HTMLInputElement;

		this.email = target.value;

		if (!VALIDATE_EMAIL.test(this.email)) {
			this.email = '';
			this.emailError = 'Invalid email';
		} else this.emailError = null;
	}

	emailKeyPress(event: KeyboardEvent) {
		// Enter is pressed
		if (this.emailError == null && event.key == 'Enter') {
			this.startEmailVerification();
			this.emailInput.blur();
		}
	}

	codeChange(event: Event) {
		let target = event.target as HTMLInputElement;

		this.code = target.value;

		if (!this.code.trim().length) {
			this.codeError = 'Invalid code';
		} else this.codeError = null;
	}

	codeKeyPress(event: KeyboardEvent) {
		// Enter is pressed
		if (this.codeError == null && event.key == 'Enter') this.completeEmailVerification();
	}

	async startEmailVerification() {
		this.wait = true;
		this.codeError = null;

		try {
			let res = await global.auth.startEmailVerification({
				email: this.email.trim()
			});

			this.verificationId = res.verificationId;

			this.wait = false;
			this.codeModalActive = true;
		} catch (err) {
			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
			else this.loadError = err;

			this.codeModalClose();
		}
	}

	async completeEmailVerification() {
		this.isCompleting = true;

		try {
			let res = await global.auth.completeEmailVerification({
				verificationId: this.verificationId,
				code: this.code.trim()
			});

			this.isCompleting = false;
			this.codeError = null;
			this.code = null;

			if (res.status == api.auth.CompleteStatus.SWITCH_IDENTITY) {
				this.codeModalClose();

				this.wait = true;
				this.loadingMessage = 'Switching accounts...';
				this.verificationId = null;

				// Artificial wait time
				await wait(timing.milliseconds(1500));

				// Identity changed, bomb private cache
				await bombPrivateCache();

				// Refresh all sessions
				global.broadcast.postMessage(broadcast.refresh());
				window.location.reload();
			} else if (res.status == api.auth.CompleteStatus.LINKED_ACCOUNT_ADDED) {
				this.codeModalClose();

				this.wait = true;
				this.loadingMessage = 'Success! Updating account status...';
				this.verificationId = null;

				// Artificial wait time
				await wait(timing.milliseconds(1500));

				// Refresh all sessions
				global.broadcast.postMessage(broadcast.refresh());
				window.location.reload();
			} else if (res.status == api.auth.CompleteStatus.ALREADY_COMPLETE) {
				this.codeError = 'This verification session has already been completed.';
			} else if (res.status == api.auth.CompleteStatus.EXPIRED) {
				this.codeError = 'This verification session has expired. Please try again.';
			} else if (res.status == api.auth.CompleteStatus.TOO_MANY_ATTEMPTS) {
				this.codeError = 'Too many failed attempts. Try again later.';
			} else if (res.status == api.auth.CompleteStatus.INCORRECT) {
				this.codeError = 'The verification code given is incorrect.';
			} else {
				this.codeError = 'Unknown error';
				logging.error('Unknown error', res.status);
			}
		} catch (err) {
			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
			else this.loadError = err;

			this.codeModalClose();
		}
	}

	codeModalClose() {
		this.codeModalActive = false;
		this.code = '';
		this.verificationId = null;
		this.codeInput.clear();
	}

	focusInput() {
		if (this.emailInput) this.emailInput.focus();
	}

	resetRegister() {
		if (this.codeModalActive) {
			this.emailInput.clear();
			this.codeInput.clear();
			this.codeModalClose();
		}
	}

	// === RENDER ===
	render() {
		if (this.loadError) return responses.renderError(this.loadError, true);

		let classes = classMap({
			hidden: this.wait
		});

		return html`
			<div id="base" class=${classes}>
				${this.codeModalActive ? this.renderCodeModal() : this.renderEmailModal()}
				${this.wait
					? html` <div id="wait">
							<loading-wheel color="#151515" .message=${this.loadingMessage}></loading-wheel>
					  </div>`
					: null}
			</div>
		`;
	}

	async logout(): Promise<void> {
		await global.authManager.logout();
		window.location.reload();

		return new Promise(resolve => resolve());
	}

	renderEmailModal() {
		// Get email from current identity
		let identity = global.currentIdentity.linkedAccounts.find(a => a.email);
		// Check if registered (with email)
		let isRegistered = global.currentIdentity.isRegistered && !!identity;

		return html`<div id="body">
			<h1>Register or Login</h1>
			${isRegistered
				? html`<div id="registered">
						<p>
							Your account is already registered.<br /><span id="email"
								>Email: ${identity.email.email}</span
							>
						</p>
						<stylized-button
							icon="regular/arrow-right-from-bracket"
							color="#db3939"
							.trigger=${this.logout.bind(this)}
							>Log out</stylized-button
						>
				  </div>`
				: html`<p>
							Enter your email below to register a Rivet account or login to an existing
							account.
						</p>
						<div>
							<h3>Email</h3>
							<div id="email-area">
								<text-input
									id="email-input"
									light
									?disabled=${isRegistered}
									placeholder="Enter email here..."
									@keydown=${this.emailKeyPress.bind(this)}
									@input=${this.emailChange.bind(this)}
								></text-input>
								<stylized-button
									?disabled=${this.emailError != null}
									.trigger=${this.startEmailVerification.bind(this)}
									>Continue</stylized-button
								>
							</div>
						</div>
						${this.emailError != null ? html`<p id="error">${this.emailError}</p>` : null}
						<p class="muted">
							All of the data on your current guest account will be transferred automatically.
						</p>`}
		</div>`;
	}

	renderCodeModal() {
		return html`<div id="code-modal">
			<e-svg non-icon preserve src="graphics/email"></e-svg>
			<h1>Email Verification Code</h1>
			<p>
				Check your email <b>(${this.email})</b> for a verification code and paste it into the area
				below.
			</p>
			<text-input
				id="namespace-display-name-input"
				light
				placeholder=""
				maxlength="8"
				@input=${this.codeChange.bind(this)}
				@keydown=${this.codeKeyPress.bind(this)}
				.filter=${(value: string) => value.replace(/[^a-z0-9]/gi, '').toUpperCase()}
			>
			</text-input>
			${this.codeError != null ? html`<p id="error">${this.codeError}</p>` : null}
			<div id="controls">
				<stylized-button color="gray" .trigger=${this.codeModalClose.bind(this)}
					>Cancel</stylized-button
				>
				<stylized-button
					.trigger=${this.completeEmailVerification.bind(this)}
					?disabled=${this.codeError != null}
					?loading=${this.isCompleting}
					>Continue</stylized-button
				>
			</div>
		</div>`;
	}
}
