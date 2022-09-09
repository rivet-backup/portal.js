import { LitElement, html, customElement, property, css } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './h-tab-layout.scss';

@customElement('h-tab-layout')
export default class HTabLayout extends LitElement {
	static styles = cssify(styles);

	render() {
		return html`
			<div id="base">
				<slot name="tabs"></slot>
				<slot name="body"></slot>
			</div>
		`;
	}
}
