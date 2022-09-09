import { LitElement, html, customElement, property, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { cssify } from '../../utils/css';
import styles from './info-panel-header.scss';

@customElement('info-panel-header')
export default class InfoPanelHeader extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean, attribute: 'right' })
	floatRight: boolean = false;

	constructor() {
		super();
	}

	render() {
		// Get classes and styles
		let classes = classMap({ right: this.floatRight });

		return html`
			<div id="base" class=${classes}>
				<slot name="icon"></slot>
				<slot name="title"></slot>
			</div>
		`;
	}
}
