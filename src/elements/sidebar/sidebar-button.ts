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
import styles from './sidebar-button.scss';

@customElement('sidebar-button')
export default class SidebarButton extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	href?: string;

	@property({ type: Boolean, attribute: 'active' })
	isActive: boolean = false;

	@property({ type: String, attribute: 'large' })
	isLarge: boolean = false;

	render() {
		if (this.href) {
			// Has link
			return html`
				<a
					id="base"
					class=${classMap({ large: this.isLarge, active: this.isActive })}
					href=${this.href}
				>
					<slot name="icon"></slot>
					<div id="content">
						<slot name="title"></slot>
					</div>
				</a>
			`;
		} else {
			// No link
			return html`
				<div id="base" class=${classMap({ large: this.isLarge, active: this.isActive })}>
					<slot name="icon"></slot>
					<div id="content">
						<slot name="title"></slot>
					</div>
				</div>
			`;
		}
	}
}
