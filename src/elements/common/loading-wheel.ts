import { LitElement, html, customElement, property, query, css, TemplateResult } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './loading-wheel.scss';
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';

@customElement('loading-wheel')
export default class LoadingWheel extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean, attribute: 'small' })
	isSmall: boolean = false;

	@property({ type: Boolean, attribute: 'custom' })
	isCustom: boolean = false;

	@property({ type: Boolean, attribute: 'inline' })
	isInline: boolean = false;

	@property({ type: Boolean, attribute: 'no-fade' })
	noFade: boolean = false;

	@property({ type: String })
	color: string = null;

	@property({ type: String })
	message: string = 'Loading...';

	render() {
		let classes = classMap({
			small: this.isSmall,
			custom: this.isCustom,
			inline: this.isInline,
			'no-fade': this.noFade
		});

		let style = styleMap({
			'--color': this.color
		});

		return html`
			<div id="base" class=${classes} style=${style}>
				<e-svg id="wheel" src="regular/circle-notch"></e-svg>
				${this.message.length ? html`<h1>${this.message ?? 'Loading...'}</h1>` : null}
				<slot></slot>
			</div>
		`;
	}
}
