import { LitElement, html, customElement, property, css } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './loading-placeholder.scss';
import { classMap } from 'lit-html/directives/class-map';

@customElement('loading-placeholder')
export default class LoadingPlaceholder extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean, attribute: 'disabled' })
	isDisabled: boolean = false;

	// TEMPORARY BUG FIX: https://stackoverflow.com/questions/70176073/strange-bug-on-chrome-when-combining-flex-direction-column-reverse-and-a-fixe
	@property({ type: Boolean, attribute: 'not-fixed' })
	notFixed: boolean = false;

	render() {
		let classes = classMap({
			disabled: this.isDisabled,
			'not-fixed': this.notFixed
		});

		return html`<div id="base" class=${classes}></div>`;
	}
}
