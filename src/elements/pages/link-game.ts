import { LitElement, html, customElement, property, PropertyValues, query } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './link-game.scss';
import { classMap } from 'lit-html/directives/class-map';
import global from '../../utils/global';
import routes, { responses } from '../../routes';

import UIRouter from '../root/ui-router';
import TextInput from '../dev/text-input';
import { VALIDATE_EMAIL } from '../overlay/register-panel';
import timing, { wait } from '../../utils/timing';
import logging from '../../utils/logging';
import settings from '../../utils/settings';
import * as api from '../../utils/api';
import { globalEventGroups, GlobalStatusChangeEvent } from '../../utils/global-events';
import { tooltip } from '../../ui/helpers';
import assets from '../../data/assets';

@customElement('page-link-game')
export default class LinkGamePage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	token: string;

	@property({ type: Boolean })
	isLoading: boolean = true;

	@property({ type: Boolean })
	success: boolean = false;

	@property({ type: Object })
	gameData: api.identity.GameIdentityLinkCommandOutput;

	@property({ type: Object })
	loadError?: any = null;

	// === EMAIL COMPONENTS ===
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
	verifiedEmail: boolean = false;

	@property({ type: Boolean })
	codeModalActive: boolean = false;

	@property({ type: Boolean })
	wait: boolean = false;

	@property({ type: String })
	verificationId: string = null;

	@query('#namespace-display-name-input')
	codeInput: TextInput;

	// === EVENT HANDLERS ===
	handleStatusChange: (e: GlobalStatusChangeEvent) => void;

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		this.fetchData();
	}

	async fetchData() {
		try {
			this.gameData = await global.live.identity.gameIdentityLink({
				identityLinkToken: this.token
			});

			// TODO: temporary, remove
			// this.gameData = {
			// 	game: {
			// 		nameId: 'test-game',
			// 		displayName: 'Test Game',
			// 		id: '',
			// 		logoUrl: null,
			// 		bannerUrl: null
			// 	},
			// 	linkId: '',
			// 	$metadata: {}
			// };
		} catch (err) {
			this.loadError = err;
		}

		this.isLoading = false;
	}

	async linkAccount() {
		if (!settings.didConsent) {
			global.grantConsent();

			this.handleStatusChange = this.onStatusChange.bind(this);
			globalEventGroups.add('status-change', this.handleStatusChange);
		} else {
			this.onStatusChange();
		}
	}

	async onStatusChange() {
		try {
			let res = await global.live.identity.gameIdentityLinkComplete({
				identityLinkToken: this.token
			});

			this.success = res.valid;

			if (this.success) {
				UIRouter.shared.navigate(routes.game.build({ nameId: this.gameData.game.nameId }));
			}
		} catch (err) {
			this.loadError = err;
		}

		globalEventGroups.remove('status-change', this.handleStatusChange);
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);
		if (this.isLoading) return html`<loading-wheel></loading-wheel>`;

		let isRegistered = false;

		let bgCropClasses = classMap({
			'did-consent': settings.didConsent
		});

		return html`
			<div id="base">
				${this.gameData.game.bannerUrl
					? html`<div id="bg-crop" class=${bgCropClasses}>
							<lazy-img id="bg" src=${this.gameData.game.bannerUrl}></lazy-img>
					  </div>`
					: null}
				<div id="overlay"></div>
				<div id="scroller">
					<div id="center">
						<div id="content">
							<div id="header">
								<div id="icons">
									<e-svg id="logo" src="logo/logo-small" preserve></e-svg>
									<e-svg id="cross" src="material/close"></e-svg>
									<lazy-img
										id="game-icon"
										bg-size=${this.gameData.game.logoUrl ? 'contain' : 'cover'}
										src=${this.gameData.game.logoUrl ??
										assets.asset('/games/blank/logo.png')}
										@mouseenter=${tooltip(this.gameData.game.displayName)}
									></lazy-img>
								</div>
								<h1>${settings.didConsent ? 'Link your Account' : 'Create your Account'}</h1>
							</div>
							<div id="game-content">
								${!settings.didConsent
									? html`<div id="email-area">
											<h3>Verify or login to an existing account</h3>
											<div id="email-input">
												<text-input
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
											${!!this.emailError
												? html`<p id="error">${this.emailError}</p>`
												: null}
									  </div>`
									: null}
								<div id="services">
									<h3>Accounts run on Rivet and are accessible across games</h3>
									<div id="service-icons">
										<div class="service">
											<e-svg non-icon preserve src="products/matchmaker"></e-svg>
											<h4>Accounts</h4>
										</div>
										<div class="service">
											<e-svg non-icon preserve src="products/leaderboard"></e-svg>
											<h4>Leaderboards</h4>
										</div>
										<div class="service">
											<e-svg non-icon preserve src="products/social"></e-svg>
											<h4>Friends</h4>
										</div>
										<div class="service">
											<e-svg non-icon preserve src="products/parties"></e-svg>
											<h4>Parties</h4>
										</div>
										<div class="service">
											<e-svg non-icon preserve src="products/teams"></e-svg>
											<h4>Groups</h4>
										</div>
										<div class="service">
											<e-svg non-icon preserve src="products/compute"></e-svg>
											<h4>Chat</h4>
										</div>
									</div>
								</div>
							</div>
							<div id="consent-area">
								<p>
									By clicking continue, you agree to the Rivet
									<a class="link" href="/terms" target="_blank">Terms of Service</a> and
									<a class="link" href="/privacy" target="_blank">Privacy Policy</a>.
								</p>
							</div>

							<stylized-button .trigger=${this.linkAccount.bind(this)}
								>Continue</stylized-button
							>
						</div>
					</div>
				</div>
			</div>
			${this.renderCodeModal()}
		`;
	}

	renderCodeModal() {
		return html`<drop-down-modal
			id="code-modal"
			?active=${this.codeModalActive}
			@close=${this.codeModalClose.bind(this)}
		>
			<div slot="body">
				<e-svg non-icon preserve src="graphics/email"></e-svg>
				<h1>Email Verification Code</h1>
				<p>
					Check your email <b>(${this.email})</b> for a verification code and paste it into the area
					below.
				</p>
				<text-input
					id="namespace-display-name-input"
					light
					placeholder="________"
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
			</div>
		</drop-down-modal>`;
	}

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
			this.codeInput.blur();
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

		let res = await global.auth.startEmailVerification({
			email: this.email.trim()
		});

		this.verificationId = res.verificationId;

		this.wait = false;
		this.codeModalActive = true;
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

				window.location.reload();
			} else if (res.status == api.auth.CompleteStatus.LINKED_ACCOUNT_ADDED) {
				this.codeModalClose();

				this.wait = true;
				this.loadingMessage = 'Success! Updating account status...';
				this.verificationId = null;
				this.verifiedEmail = true;
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
			this.loadError = err;
			this.codeModalClose();
		}
	}

	codeModalClose() {
		this.codeModalActive = false;
		this.code = '';
		this.verificationId = null;
		this.codeInput.clear();
	}
}
