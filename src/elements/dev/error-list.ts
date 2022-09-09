import { LitElement, html, customElement, property, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { cssify } from '../../utils/css';
import styles from './error-list.scss';
import { repeat } from 'lit-html/directives/repeat';

@customElement('error-list')
export default class ErrorList extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	errors: string[] = [];

	render() {
		return html`
			<div id="base">
				<h5>Error${this.errors.length != 1 ? 's' : ''}</h5>
				${repeat(
					this.errors,
					e => e,
					e => html`<div class="error">
						<e-svg src="solid/triangle-exclamation"></e-svg>
						<span>${e}</span>
					</div>`
				)}
			</div>
		`;
	}
}
