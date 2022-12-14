import { LitElement, html, customElement } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './consent.scss';
import global from '../../utils/global';

@customElement('page-consent')
export default class ConsentPage extends LitElement {
	static styles = cssify(styles);

	onConsent() {
		global.grantConsent();
	}

	render() {
		return html`
			<div id="base">
				<div id="center">
					<div id="overflow">
						<lazy-img id="bg" src=${''}></lazy-img>
					</div>
					<div id="content">
						<div id="header">
							<e-svg src="logo/logo-small" preserve></e-svg>
							<h1>Welcome to Rivet!</h1>
						</div>
						<h2>First things first, lets do some housekeeping.</h2>

						<div id="consent-area">
							<p>
								By clicking continue, you agree to the Rivet
								<a class="link" href="/terms" target="_blank">Terms of Service</a> and
								<a class="link" href="/privacy" target="_blank">Privacy Policy</a>.
							</p>
						</div>

						<stylized-button .trigger=${this.onConsent.bind(this)}>Continue</stylized-button>
					</div>
				</div>
			</div>
		`;
	}
}
