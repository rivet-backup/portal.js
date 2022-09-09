import { LitElement, html, customElement, property, css } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './right-sidebar-layout.scss';
import { classMap } from 'lit-html/directives/class-map';

@customElement('right-sidebar-layout')
export default class RightSidebarLayout extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean })
	collapsed: boolean = false;

	constructor() {
		super();
	}

	render() {
		let classes = classMap({ collapsed: this.collapsed });

		return html`
			<div id="base" class=${classes}>
				<!-- Body -->
				<slot name="body"></slot>

				<!-- Sidebar -->
				<slot name="sidebar"></slot>
			</div>
		`;
	}
}
