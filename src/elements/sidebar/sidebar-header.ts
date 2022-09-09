import {
	LitElement,
	html,
	customElement,
	property,
	query,
	TemplateResult,
	css,
	PropertyValues
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { cssify } from '../../utils/css';
import styles from './sidebar-header.scss';

@customElement('sidebar-header')
export default class SidebarHeader extends LitElement {
	static styles = cssify(styles);

	render() {
		return html`
			<div id="base">
				<slot name="title"></slot>
				<slot name="action"></slot>
			</div>
		`;
	}
}
