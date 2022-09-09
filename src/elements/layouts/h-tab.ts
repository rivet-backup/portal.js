import { LitElement, html, customElement, property, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { cssify } from '../../utils/css';
import styles from './h-tab.scss';

@customElement('h-tab')
export default class HTab extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean })
	active: boolean = false;

	@property({ type: String })
	href?: string = null;

	@property({ type: String })
	target?: string = null;

	@property({ type: Function })
	trigger?: () => void;

	constructor() {
		super();
	}

	render() {
		let classes = classMap({ active: this.active });

		return html`
			<stylized-button
				.href=${this.href}
				.target=${this.target}
				.trigger=${this.trigger}
				class=${classes}><slot></slot></stylized-button>
		`;
	}
}
