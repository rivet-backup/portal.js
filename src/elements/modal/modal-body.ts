import { LitElement, html, customElement, property, css, TemplateResult } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { cssify } from '../../utils/css';
import styles from './modal-body.scss';
import { AlertPanelData } from '../root/ui-root';

@customElement('modal-body')
export default class ModalBody extends LitElement {
	static styles = cssify(styles);

	render() {
		return html`
			<div id="base">
				<slot></slot>
			</div>
		`;
	}
}
