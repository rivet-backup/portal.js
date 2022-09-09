import { LitElement, html, customElement, property, css } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './page-header.scss';
import { classMap } from 'lit-html/directives/class-map';

@customElement('page-header')
export default class PageHeader extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean })
	rightAlign: boolean = false;

	render() {
		let classes = classMap({
			'right-align': this.rightAlign
		});

		return html`<div id="base" class=${classes}><slot></slot></div>`;
	}
}
