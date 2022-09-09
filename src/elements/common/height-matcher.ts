import { LitElement, html, customElement, property, css, query } from 'lit-element';
import ResizeObserver from 'resize-observer-polyfill';
import logging from '../../utils/logging';

@customElement('height-matcher')
export default class EmojiItem extends LitElement {
	@query('#resizer')
	resizerElement: HTMLDivElement;

	@property({ type: String, attribute: 'target' })
	targetQuery: string;

	@property({ type: Number, attribute: 'offset' })
	offsetAmount: number = 0;

	private resizeObserver!: ResizeObserver;

	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();

		// Create observer
		if (!this.resizeObserver) {
			this.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
				for (const entry of entries) {
					// Get the content rect
					const { height } = entry.contentRect;

					// Set height
					logging.debug('Height matcher', this.targetQuery, height);
					this.resizerElement.style.height = Math.max(height + this.offsetAmount, 0) + 'px';
				}
			});
		}

		// Get element
		let element = document.querySelector(this.targetQuery) as HTMLDivElement;
		if (!element) throw new Error(`Could not find element for query selector ${this.targetQuery}`);

		// Observe element
		this.resizeObserver.observe(element);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Stop observing all elements
		this.resizeObserver.disconnect();
	}

	render() {
		return html`<div id="resizer" style="width: 100%"></div>`;
	}
}
