import { LitElement, html, customElement, property, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { cssify } from '../../utils/css';
import styles from './info-panel-body.scss';

@customElement('info-panel-body')
export default class InfoPanelBody extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean, attribute: 'right' })
	floatRight: boolean = false;

	@property({ type: Boolean, attribute: 'noindent' })
	noIndent: boolean = false;

	constructor() {
		super();
	}

	render() {
		// Get classes and styles
		let classes = classMap({ right: this.floatRight, noIndent: this.noIndent });

		return html`
			<div id="base" class=${classes}>
				<slot></slot>
			</div>
		`;
	}
}
