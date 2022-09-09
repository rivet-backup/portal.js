import { LitElement, html, customElement, property, css, query } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './dev-only.scss';
import assets from '../../data/assets';

import global from '../../utils/global';
import * as api from '../../utils/api';
import routes, { responses } from '../../routes';
import { DropDownSelectEvent, DropDownSelection } from '../dev/drop-down-list';
import UIRouter from '../root/ui-router';
import { globalEventGroups, IdentityChangeEvent } from '../../utils/global-events';

@customElement('page-dev-only')
export default class PageDevOnly extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	loadError?: any;

	// === MODAL COMPONENTS ===
	@property({ type: Boolean })
	formModalActive: boolean = false;

	@property({ type: String })
	nameValue: string = '';
	@property({ type: String })
	companyNameValue: string = '';
	@property({ type: String })
	companySizeValue: string = '';
	@property({ type: String })
	preferredToolsValue: string = '';
	@property({ type: String })
	goalsValue: string = '';

	initialDevState: api.identity.IdentityDevState;

	@property({ type: Boolean })
	formIsValid: boolean = false;

	@property({ type: Boolean })
	isRegistering: boolean = false;

	/// === EVENTS ===
	handleIdentityChange: (e: IdentityChangeEvent) => void;

	connectedCallback() {
		super.connectedCallback();

		this.initialDevState =
			(global.currentIdentity.devState as api.identity.IdentityDevState) ??
			api.identity.IdentityDevState.INACTIVE;

		this.handleIdentityChange = this.onIdentityChange.bind(this);
		globalEventGroups.add('identity-change', this.handleIdentityChange);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		globalEventGroups.remove('identity-change', this.handleIdentityChange);
	}

	onIdentityChange() {
		let devStateRemoved =
			this.initialDevState == api.identity.IdentityDevState.ACCEPTED &&
			(global.currentIdentity.devState === undefined ||
				global.currentIdentity.devState == api.identity.IdentityDevState.INACTIVE);

		if (global.currentIdentity.devState == api.identity.IdentityDevState.ACCEPTED || devStateRemoved) {
			UIRouter.shared.navigate(routes.devDashboard.build({}), {
				replaceHistory: true,
				forceSamePage: true
			});
		} else {
			this.requestUpdate();
		}
	}

	nameInput(e: InputEvent) {
		let target = (e.currentTarget || e.target) as HTMLInputElement;

		this.nameValue = target.value;
		this.formIsValid = this.filledInForm();
	}

	companyNameInput(e: InputEvent) {
		let target = (e.currentTarget || e.target) as HTMLInputElement;

		this.companyNameValue = target.value;
		this.formIsValid = this.filledInForm();
	}

	companySizeSelect(event: DropDownSelectEvent) {
		this.companySizeValue = event.selection.value;
		this.formIsValid = this.filledInForm();
	}

	preferredToolsInput(e: InputEvent) {
		let target = (e.currentTarget || e.target) as HTMLInputElement;

		this.preferredToolsValue = target.value;
		this.formIsValid = this.filledInForm();
	}

	goalsInput(e: InputEvent) {
		let target = (e.currentTarget || e.target) as HTMLInputElement;

		this.goalsValue = target.value;
		this.formIsValid = this.filledInForm();
	}

	filledInForm(): boolean {
		return (
			this.nameValue.length &&
			this.companySizeValue.length &&
			this.preferredToolsValue.length &&
			this.goalsValue.length != 0
		);
	}

	async signupForBeta() {
		try {
			await global.live.identity.signupForBeta({
				name: this.nameValue.slice(0, 32),
				companyName: this.companyNameValue.slice(0, 64),
				companySize: this.companySizeValue.slice(0, 16),
				preferredTools: this.preferredToolsValue.slice(0, 256),
				goals: this.goalsValue.slice(0, 256)
			});

			this.formModalClose();
		} catch (err) {
			this.loadError = err;
			this.isRegistering = false;
		}
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		return html`
			<invalid-page-state>
				<h1 slot="title">Private Beta</h1>
				<h2 slot="subtitle">
					Rivet is still in private beta. Join the waitlist to get early access and give feedback.
				</h2>
				<div slot="actions">
					${global.currentIdentity.devState == api.identity.IdentityDevState.PENDING
						? html`<stylized-button disabled>Beta Access Pending</stylized-button>`
						: html`<stylized-button .trigger=${this.openFormModal.bind(this)}
								>Join Private Beta</stylized-button
						  >`}
				</div>
			</invalid-page-state>
			${this.renderFormModal()}
		`;
	}

	renderFormModal() {
		let sizeOptions = ['Hobby', 'Just me', '2-5', '6-20', '20-100', '100-1000', '1000+'].map(
			a => ({ label: a, value: a.toLowerCase() } as DropDownSelection)
		);

		return html`<drop-down-modal
			id="form-modal"
			?active=${this.formModalActive}
			@close=${this.formModalClose.bind(this)}
		>
			<modal-body slot="body">
				<h1>Register for private beta waitlist</h1>
				<div class="input-group">
					<h2>Name</h2>
					<text-input
						light
						placeholder="Enter your name..."
						.maxlength=${32}
						@input=${this.nameInput.bind(this)}
					></text-input>
					<h2>Company Name (optional)</h2>
					<text-input
						light
						placeholder="Enter your company name..."
						.maxlength=${64}
						@input=${this.companyNameInput.bind(this)}
					></text-input>
					<h2>Company Size</h2>
					<drop-down-list
						light
						.options=${sizeOptions}
						@select=${this.companySizeSelect.bind(this)}
					></drop-down-list>
					<h2>What are your preferred game engines/languages?</h2>
					<text-input
						area
						light
						placeholder="Enter response here..."
						.maxlength=${256}
						@input=${this.preferredToolsInput.bind(this)}
					></text-input>
					<h2>What do you want to build with Rivet?</h2>
					<text-input
						area
						light
						placeholder="Enter response name..."
						.maxlength=${256}
						@input=${this.goalsInput.bind(this)}
					></text-input>
				</div>
				<stylized-button
					.trigger=${this.signupForBeta.bind(this)}
					?disabled=${!this.formIsValid}
					?loading=${this.isRegistering}
					>Sign up</stylized-button
				>
			</modal-body>
		</drop-down-modal>`;
	}

	openFormModal() {
		this.formModalActive = true;
	}

	formModalClose() {
		this.formModalActive = false;
	}
}
