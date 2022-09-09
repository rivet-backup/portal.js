import { LitElement, html, customElement, property, css } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './column-layout.scss';

@customElement('column-layout')
export default class ColumnLayout extends LitElement {
	static styles = cssify(styles);

	constructor() {
		super();
	}

	render() {
		return html`
			<div id="base">
				<!-- Left Column -->
				<slot name="left-column"></slot>

				<!-- Right Column -->
				<slot name="right-column"></slot>
			</div>
		`;
	}
}
