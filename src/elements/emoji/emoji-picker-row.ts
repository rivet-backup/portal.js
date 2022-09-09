import { LitElement, html, customElement, property, css, TemplateResult } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './emoji-picker-row.scss';
import emojiData from '../../data/emoji.json';
import { tooltip } from '../../ui/helpers';
import { cache } from 'lit-html/directives/cache';
import { repeat } from 'lit-html/directives/repeat';
import EmojiPicker, { EmojiSelectEvent, EmojiItemData } from '../overlay/emoji-picker';

@customElement('emoji-picker-row')
export default class EmojiPickerRow extends LitElement {
	static styles = cssify(styles);

	@property({ type: Boolean })
	active: boolean = false;

	@property({ type: Array })
	emojis: EmojiItemData[];

	selectElement(elementId: string) {
		// Create event
		if (emojiData.items[elementId]) {
			let event = new EmojiSelectEvent(emojiData.items[elementId]);

			this.dispatchEvent(event);
		}
	}

	render() {
		return html`
			<div id="base">
				${this.active
					? cache(
							html`${repeat(
								this.emojis,
								(i: EmojiItemData) => i.name,
								(item: EmojiItemData) =>
									html`<div
										class="group-item"
										@click=${this.selectElement.bind(this, item.name)}
										@mouseenter=${tooltip(`:${item.name}:`)}
									>
										<emoji-item emoji-id=${item.name} centered size="28"></emoji-item>
									</div>`
							)}`
					  )
					: null}
			</div>
		`;
	}
}
