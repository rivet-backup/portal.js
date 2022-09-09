import { LitElement, html, customElement } from 'lit-element';
import routes from '../../routes';
import global from '../../utils/global';
import UIRoot from '../root/ui-root';
import UIRouter from '../root/ui-router';

@customElement('page-register')
export default class RegisterPage extends LitElement {
	connectedCallback() {
		super.connectedCallback();

		// Redirect to arcade if registered
		if (global.currentIdentity.isRegistered) {
			UIRouter.shared.navigate(routes.arcade.build({}), { replaceHistory: true });
		} else {
			UIRoot.shared.openRegisterPanel();
		}
	}

	render() {
		return html`<div id="base">
			<page-header>
				<e-svg src="solid/user"></e-svg>
				<h1>Register or Login</h1>
			</page-header>
			<stylized-button .trigger=${this.register.bind(this)}>Register Now</stylized-button>
		</div>`;
	}

	register() {
		UIRoot.shared.openRegisterPanel();
	}
}
