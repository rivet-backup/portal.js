import { LitElement, html, customElement, property, css, query } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './invalid-page-state.scss';
import { classMap } from 'lit-html/directives/class-map';

@customElement('invalid-page-state')
export default class InvalidPageState extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean })
	expand: boolean = true;

	render() {
		let classes = classMap({
			expand: this.expand
		});

		return html`
			<div id="base" class=${classes}>
				<div id="center">
					<slot name="background"></slot>
					<slot name="title"></slot>
					<slot name="subtitle"></slot>
					<slot name="actions"></slot>
					<slot name="body"></slot>
				</div>
			</div>
		`;
	}
}
