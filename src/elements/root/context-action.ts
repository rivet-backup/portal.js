import { LitElement, html, customElement, css, property } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { classMap } from 'lit-html/directives/class-map';
import { cssify } from '../../utils/css';
import styles from './context-action.scss';

@customElement('context-action')
export default class ContextAction extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	color: string = '#A8A8A8';

	@property({ type: String })
	textColor: string = null;

	@property({ type: String })
	href: string = null;

	isDisabled: boolean = false;

	render() {
		let classes = classMap({ disabled: this.isDisabled });
		let styles = styleMap({ '--color': this.color, '--text-color': this.textColor });

		return this.href == null
			? html` <div id="base" class=${classes} style=${styles}>
					<slot></slot>
			  </div>`
			: html` <a id="base" href=${this.href} class=${classes} style=${styles}>
					<slot></slot>
			  </a>`;
	}
}
