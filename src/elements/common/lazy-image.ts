import { LitElement, html, customElement, property, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

@customElement('lazy-img')
export default class LazyImage extends LitElement {
	static styles = css`
		:host {
			display: block;
		}

		#lazy-img {
			width: 100%;
			height: 100%;

			background-position: center;
			background-repeat: no-repeat;
		}
	`;

	@property({ type: String })
	src: string;

	@property({ type: String, attribute: 'bg-size' })
	bgSize: string = 'cover';

	@property({ type: Boolean })
	isLoaded: boolean = false;

	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();

		// Start loading image on timeout
		setTimeout(() => {
			this.isLoaded = true;
		}, 0);
	}

	render() {
		return html`<div
			id="lazy-img"
			style=${styleMap({
				backgroundImage: this.isLoaded ? `url("${this.src}")` : null,
				backgroundSize: this.bgSize
			})}
		>
			<slot></slot>
		</div>`;
	}
}
