import { LitElement, html, customElement, property, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { cssify } from '../../utils/css';
import utils from '../../utils/utils';
import styles from './icon-button.scss';
import logging from '../../utils/logging';
import { COLORS } from '../../utils/colors';

type TriggerResult = Promise<any> | void;

@customElement('icon-button')
export default class IconButton extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	href?: string;

	@property({ type: String })
	src: string;

	@property({ type: String })
	badge: string;

	@property({ type: String })
	color: string = 'light-gray';

	@property({ type: String, attribute: 'highlight-color' })
	highlightColor: string = 'white';

	@property({ type: Boolean })
	preserve: boolean = false;

	@property({ type: Boolean, attribute: 'smaller' })
	isSmaller: boolean = false;

	@property({ type: Boolean, attribute: 'small' })
	isSmall: boolean = false;

	@property({ type: Boolean, attribute: 'large' })
	isLarge: boolean = false;

	@property({ type: Boolean, attribute: 'custom' })
	isCustom: boolean = false;

	@property({ type: Boolean, attribute: 'loading' })
	isLoading: boolean = false;

	@property({ type: Boolean, attribute: 'disabled' })
	isDisabled: boolean = false;

	@property({ type: Function })
	trigger?: (ev: Event) => TriggerResult = null;

	get cssColor(): string {
		let colorVariable = COLORS[this.color];
		if (colorVariable) {
			return colorVariable;
		} else {
			return this.color;
		}
	}

	get highlightCSSColor(): string {
		let colorVariable = COLORS[this.highlightColor];
		if (colorVariable) {
			return colorVariable;
		} else {
			return this.highlightColor;
		}
	}

	get sizeClass(): string {
		if (this.isSmaller) return 'smaller';
		else if (this.isSmall) return 'small';
		else if (this.isLarge) return 'large';
		else if (this.isCustom) return 'custom';
		else return 'medium';
	}

	constructor() {
		super();
	}

	onClick(ev: Event) {
		// Make sure the button is not disabled
		if (this.isDisabled || this.isLoading) {
			ev.preventDefault();
			ev.stopImmediatePropagation();
			return;
		}

		// Call the trigger if needed
		if (this.trigger) {
			// Execute trigger and handle state if needed
			let promise = this.trigger(ev);

			if (promise && promise instanceof Promise) {
				this.isLoading = true;

				promise
					.catch(err => {
						logging.error('Error caught in button trigger', err);
					})
					.finally(() => (this.isLoading = false));
			}
		}
	}

	render() {
		// Get classes and styles
		let classes = classMap({
			'icon-button': true,
			[this.sizeClass]: true,
			disabled: this.isDisabled,
			loading: this.isLoading
		});
		let styles = styleMap({ '--color': this.cssColor, '--highlight-color': this.highlightCSSColor });

		// Render contents
		let contents = html`<e-svg src=${this.src} ?preserve=${this.preserve}></e-svg>${this.badge
				? html`<div class="badge">${this.badge}</div>`
				: null}`;

		// Either build link or div depending on the type
		if (this.href) {
			return html`<a
				href=${this.href}
				class=${classes}
				style=${styles}
				@click=${this.onClick.bind(this)}
				>${contents}</a
			>`;
		} else {
			return html`<div class=${classes} style=${styles} @click=${this.onClick.bind(this)}>
				${contents}
			</div>`;
		}
	}
}
