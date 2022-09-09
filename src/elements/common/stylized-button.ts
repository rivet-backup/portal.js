import { LitElement, html, customElement, property, css } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { styleMap } from 'lit-html/directives/style-map';
import { classMap } from 'lit-html/directives/class-map';
import { cssify } from '../../utils/css';
import utils from '../../utils/utils';
import styles from './stylized-button.scss';
import logging from '../../utils/logging';
import { COLORS } from '../../utils/colors';

type TriggerResult = Promise<any> | void;

@customElement('stylized-button')
export default class StylizedButton extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	href?: string;

	@property({ type: String })
	target?: string;

	@property({ type: String })
	color: string = null;

	@property({ type: String })
	icon: string = null;

	@property({ type: String, attribute: 'right-icon' })
	rightIcon: string = null;

	@property({ type: Boolean, attribute: 'non-icon' })
	nonIcon: boolean = false;

	@property({ type: String, attribute: 'text' })
	textColor: string;

	@property({ type: String, attribute: 'align' })
	align: 'left' | 'center' | 'right' = 'center';

	@property({ type: Boolean, attribute: 'small' })
	isSmall: boolean = false;

	@property({ type: Boolean, attribute: 'large' })
	isLarge: boolean = false;

	@property({ type: Boolean, attribute: 'loading' })
	isLoading: boolean = false;

	@property({ type: Boolean, attribute: 'disabled' })
	isDisabled: boolean = false;

	@property({ type: Boolean, attribute: 'splashy' })
	isSplashy: boolean = false;

	// TODO: Probably shouldnt be a string
	@property({ type: Boolean, attribute: 'force' })
	forceActive: boolean = false;

	@property({ type: Boolean, attribute: 'noshadow' })
	noShadow: boolean = true;

	@property({ type: Function })
	trigger?: (ev?: Event) => TriggerResult = null;

	get cssColor(): string {
		if (this.textColor) return this.textColor;
		return this.color == 'white' ? 'black' : 'white';
	}

	get cssBackgroundColor(): string {
		return this.color;
	}

	get sizeClass(): string {
		if (this.isSmall) return 'small';
		else if (this.isLarge) return 'large';
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
			'stylized-button': true,
			[this.sizeClass]: true,
			disabled: this.isDisabled,
			active: this.forceActive,
			loading: this.isLoading,
			splashy: this.isSplashy,
			'no-shadow': this.noShadow,
			[`align-${this.align}`]: this.align != 'center',
		});
		let styles = styleMap({ '--color': this.cssColor, '--bg-color': this.cssBackgroundColor });

		// Icon
		let icon = null;
		if (this.icon != null) {
			icon = html`<e-svg id="icon" .nonIcon=${this.nonIcon} src=${this.icon}></e-svg>
				<div class="spacer"></div>`;
		}

		// Right icon
		let rightIcon = null;
		if (this.rightIcon != null) {
			rightIcon = html`<div class="spacer"></div>
				<e-svg id="right-icon" .nonIcon=${this.nonIcon} src=${this.rightIcon}></e-svg>`;
		}

		// Either build link or div depending on the type
		if (this.href) {
			return html`<a
				href=${this.href}
				target=${ifDefined(this.target)}
				class=${classes}
				style=${styles}
				@click=${this.onClick.bind(this)}
				>${icon}<slot></slot>${rightIcon}</a
			>`;
		} else {
			return html`<div class=${classes} style=${styles} @click=${this.onClick.bind(this)}>
				${icon}<slot></slot>${rightIcon}
			</div>`;
		}
	}
}
