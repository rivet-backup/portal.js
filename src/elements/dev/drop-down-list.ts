import {
	LitElement,
	html,
	customElement,
	property,
	query,
	css,
	PropertyValues,
	TemplateResult
} from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './drop-down-list.scss';
import { styleMap } from 'lit-html/directives/style-map';
import { classMap } from 'lit-html/directives/class-map';
import { repeat } from 'lit-html/directives/repeat';
import { bodyEventGroups } from '../../utils/global-events';

// TODO: Implement arrow key movement and enter key to complete

export class DropDownSelectEvent extends Event {
	constructor(public selection: DropDownSelection) {
		super('select');
	}
}

export interface DropDownSelection {
	value: any;
	label?: string;
	template?: TemplateResult;
	title?: string;
}

// TODO: Add ability to disable
@customElement('drop-down-list')
export default class DropDownList extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	options: DropDownSelection[];

	@property({ type: Object })
	selection: DropDownSelection;

	@property({ type: String })
	placeholder: string = 'Select option';

	@property({ type: Boolean })
	isOpen: boolean = false;

	@property({ type: Boolean, attribute: 'with-border' })
	border: boolean = false;

	@property({ type: Boolean })
	light: boolean = false;

	@property({ type: Boolean, attribute: 'fixed' })
	isFixed: boolean = false;

	@query('#base')
	baseElement: HTMLElement;

	recentClick: number = performance.now();

	// === GET HEIGHT OF SELECTION ===
	@property({ type: Number })
	maxHeight: number = 0;

	// === EVENT HANDLERS ===
	handleDocumentClick: (e: MouseEvent) => void;

	connectedCallback() {
		super.connectedCallback();

		// Handle click
		this.handleDocumentClick = this.onDocumentClick.bind(this);
		bodyEventGroups.add('click', this.handleDocumentClick);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Remove event listeners
		bodyEventGroups.remove('click', this.handleDocumentClick);
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Update max height on selection change
		if (changedProperties.has('selection')) {
			this.updateComplete.then(async () => {
				this.maxHeight = this.baseElement.querySelector<HTMLElement>('#controls').offsetHeight;
			});
		}
	}

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		let observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.intersectionRatio > 0) this.becomesVisible();
				});
			},
			{ rootMargin: '0px', threshold: 1.0 }
		);

		observer.observe(this.baseElement);
	}

	// Update max height when element first becomes visible
	becomesVisible() {
		this.maxHeight = this.baseElement.querySelector<HTMLElement>('#controls').offsetHeight;
	}

	onDocumentClick(e: MouseEvent) {
		// Close drop down if the mouse was clicked somewhere else
		if (this.isOpen && performance.now() - this.recentClick > 5) {
			this.toggle(false);
		}
	}

	onClick() {
		this.recentClick = performance.now();
	}

	onControlsClick() {
		this.onClick();

		this.toggle();
	}

	onOptionClick(selection: DropDownSelection, e: MouseEvent) {
		this.onClick();

		this.selection = selection;
		this.dispatchEvent(new DropDownSelectEvent(this.selection));

		this.toggle();
	}

	toggle(force?: boolean) {
		if (force !== undefined) this.isOpen = force;
		else this.isOpen = !this.isOpen;
	}

	render() {
		// let bounds = this.baseElement.getBoundingClientRect();
		let classes = classMap({
			open: this.isOpen,
			border: this.border,
			light: this.light,
			fixed: this.isFixed,
			'has-selection': !!this.selection
		});

		// Make sure the bounding box for the drop-down-list never exceeds the size of its selection
		let maxHeightStyle = styleMap({
			'max-height': `calc(min(var(--max-height, ${this.light ? 33 : 31}px), ${this.maxHeight}px))`
		});

		let caret = this.isOpen ? 'solid/caret-up' : 'solid/caret-down';

		return html`
			<div
				id="base"
				class=${classes}
				style=${!!this.selection ? maxHeightStyle : null}
				@click=${this.onClick.bind(this)}
			>
				<div id="controls" @click=${this.onControlsClick.bind(this)}>
					<p id="selection" title=${this.selection ? this.selection.title ?? '' : ''}>
						${this.selection
							? this.selection.template ?? this.selection.label ?? '<Empty>'
							: this.placeholder}
					</p>
					<e-svg id="icon" src=${caret}></e-svg>
				</div>
				<div id="options">
					${this.options.length ? null : html`<p class="muted">No options available</p>`}
					<div>
						${repeat(
							this.options,
							o => o,
							o =>
								html`<div
									class="option"
									@click=${this.onOptionClick.bind(this, o)}
									title=${o.title ?? ''}
								>
									${o.template ?? o.label ?? '<Empty>'}
								</div>`
						)}
					</div>
				</div>
			</div>
		`;
	}
}
