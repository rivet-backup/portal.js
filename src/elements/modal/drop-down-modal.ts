import { LitElement, html, customElement, property, css, query, PropertyValues } from 'lit-element';
import { cssify } from '../../utils/css';
import { classMap } from 'lit-html/directives/class-map';
import styles from './drop-down-modal.scss';
import timing from '../../utils/timing';

@customElement('drop-down-modal')
export default class DropDownModal extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean })
	active: boolean = false;

	@property({ type: Boolean })
	open: boolean = false;

	@property({ type: Boolean })
	closing: boolean = false;

	@property({ type: Boolean, attribute: 'no-dim-close' })
	noDimClose: boolean = false;

	@property({ type: Boolean, attribute: 'large-animation' })
	largeAnimation: boolean = false;

	@query('#base')
	baseElement: HTMLElement;

	timeout: number = null;

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Toggles the view of this modal when the active property is changed
		if (changedProperties.has('active')) {
			this.toggle(!this.active);
		}
	}

	toggle(option: boolean = this.open) {
		if (option) {
			if (!this.closing && !this.noDimClose) {
				this.closing = true;

				// Trigger reflow
				this.baseElement.style.display = 'none';
				this.baseElement.offsetHeight;
				this.baseElement.style.display = null;

				window.clearTimeout(this.timeout);
				this.timeout = window.setTimeout(() => {
					this.open = false;
					this.dispatchEvent(new Event('close'));
				}, timing.milliseconds(300));
			}
		} else {
			window.clearTimeout(this.timeout);

			this.open = true;
			this.closing = false;
		}
	}

	render() {
		let modalClasses = classMap({
			closing: this.closing,
			open: this.open,
			large: this.largeAnimation
		});

		return html` <div id="base" class=${modalClasses}>
			<div id="close" @click=${this.toggle.bind(this)}></div>
			<div id="animation">
				<slot name="body"></slot>
			</div>
		</div>`;
	}
}
