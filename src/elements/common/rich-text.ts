import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { cssify } from '../../utils/css';
import styles from './rich-text.scss';
import escapeHTML from 'escape-html';
import { repeat } from 'lit-html/directives/repeat';
import { until } from 'lit-html/directives/until';
import global from '../../utils/global';
import UIRoot from '../root/ui-root';
import routes from '../../routes';
import { classMap } from 'lit-html/directives/class-map';
import { match } from 'path-to-regexp';

const MAX_QUOTE_DEPTH: number = 3;

interface RichItem {
	image?: string | HTMLElement;
	embedMedia?: string;
	title: string;
	details?: string | TemplateResult;
	actions?: TemplateResult[];
}

// Used to format markdown in messages
class MarkdownText {
	start: number;
	stop?: number;
	type: string;

	parent?: MarkdownText;
	children: MarkdownText[] = [];

	// How deep a certain type recurses
	homogenousDepth: number = 0;

	constructor(start: number, type: string = 'string') {
		this.start = start;
		this.type = type;
	}

	addText(text: MarkdownText) {
		if (text.type == this.type) text.homogenousDepth = this.homogenousDepth + 1;

		text.parent = this;
		this.children.push(text);
	}

	format(baseText: string, inlineOnly: boolean = false): string {
		let content: string;
		let hasChildren = this.children.length != 0;

		// Format either the children or the string itself
		if (hasChildren) content = this.children.map(child => child.format(baseText, inlineOnly)).join('');
		else content = baseText.slice(this.start, this.stop);

		// Only simple text formatting with inline only
		if (inlineOnly) {
			if (this.type == 'string') return content;
			else if (this.type == 'bold') return `<b>${hasChildren ? content : content.slice(2, -2)}</b>`;
			else if (this.type == 'emphasize')
				return `<em>${hasChildren ? content : content.slice(2, -2)}</em>`;
			else return '';
		} else {
			if (this.type == 'string') return content;
			else if (this.type == 'bold') return `<b>${hasChildren ? content : content.slice(2, -2)}</b>`;
			else if (this.type == 'emphasize')
				return `<em>${hasChildren ? content : content.slice(2, -2)}</em>`;
			else if (this.type == 'quote')
				return `<div class='block-quote'><div class='block-quote-border'></div><div class='block-quote-content'><blockquote>${content}</blockquote></div></div>`;
			else return `<code>Invalid rich-text formatting type</code>`;
		}
	}
}

@customElement('rich-text')
export default class RichText extends LitElement {
	static EMOJI_REGEX = /:([a-z\d-_]+(?:#[a-z\d-_]+)?):/gim;
	static EMOJI_SUBSTITUTION = `<emoji-item emoji-id="$1" size="20"></emoji-item>`;

	// Check if the content is only an emoji
	static ONLY_EMOJI_REGEX = /^:([a-z\d-_]+(?:#[a-z\d-_]+)?):$/gim;
	static ONLY_EMOJI_SUBSTITUTION = `<emoji-item emoji-id="$1" size="35"></emoji-item>`;

	// Very flexible URL matcher from https://stackoverflow.com/a/1500501; for better results, see https://mathiasbynens.be/demo/url-regex
	static URL_REGEX = /(https?:\/\/[^"\s]+)/gm;
	static URL_SUBSTITUTION = `<a href="$1">$1</a>`;

	static styles = cssify(styles);

	@property({ type: String })
	content: string;

	@property({ type: Boolean, attribute: 'inline' })
	inline: boolean = false;

	@property({ type: Object })
	timestamp: number;

	matchRichItem(type: string, id: string): { item?: Promise<RichItem>; url?: string; inlineHTML?: string } {
		// switch (type) {
		//	 case "u":
		//		 return {
		//			 inlineHTML: `<identity-name load-identity-id="${id}" show-avatar></identity-name>`
		//		 };
		//	 case "g":
		//		 return {
		//			 item: gameWithNameIdCache.fetch({nameId: id})
		//				 .then(game => {
		//					 return {
		//						 image: game.logo,
		//						 title: game.displayName,
		//						 details: game.descriptionShort,
		//						 actions: [
		//							 html`<stylized-button href=${routes.game.build({ nameId: game.nameId })}>Info</stylized-button>`,
		//							 html`<div class="stylized-button red" @click=${() => UIRoot.shared.playGame(game)}>Play</div>`,
		//						 ],
		//					 };
		//				 }),
		//			 url: `/game/${id}`,
		//		 };
		//	 case "c":
		//		 return {
		//			 item: groupWithTagCache.fetch({ tag: id })
		//				 .then(group => {
		//					 return {
		//						 image: TEMPgenerateGroupThumbnail()),  // TODO: Make a version with centered data
		//						 title: group.displayName,
		//						 details: `${group.memberCount} member${group.memberCount > 1 ? "s" : ""}`,
		//						 actions: [
		//							 html`<stylized-button href=${routes.group.build({ tag: group.tag })}>View</stylized-button>`,
		//							 group.owner.id != global.currentIdentity.id
		//								 ? group.isMember
		//									 ? html`<stylized-button color="red" .trigger=${this.leaveGroup.bind(this, group.id)}>Leave</stylized-button>`
		//									 : html`<stylized-button color="red" .trigger=${this.joinGroup.bind(this, group.id)}>Join</stylized-button>`
		//								 : null,
		//						 ],
		//					 };
		//				 }),
		//			 url: `/group/${id}`,
		//		 };
		//	 case "p":
		//		 return {
		//			 item: graphql.query().execute<PartyData>("partyWithId(partyId: $id) { ##PARTY## }", { id: graphql.string(id) })
		//				 .then((party) => {
		//					 if (party) {
		//						 // Party exists
		//						 return {
		//							 title: party.game
		//								 ? `Party with ${party.members.length} member${party.members.length ? "s" : ""} playing ${party.game.displayName}`
		//								 : `Party with ${party.members.length} member${party.members.length ? "s" : ""}`,
		//							 details: html`
		//								 <div>Members:</div>
		//								 <ul>
		//									 ${repeat(party.members, m => m.id, m => html`<li><identity-name .identity=${m} show-avatar></identity-name></li>`)}
		//								 </ul>
		//							 `,
		//							 actions: [
		//								 live.partyId != party.id
		//									 ? html`<stylized-button color="red" .trigger=${this.joinParty.bind(this, party.id)}>${live.partyId ? "Switch Party" : "Join Party"}</div>`
		//									 : html`<stylized-button color="gray" disabled>Already in Party</stylized-button>`,
		//							 ],
		//						 };
		//					 } else {
		//						 // Party does not exist
		//						 return {
		//							 title: "Party Ended",
		//							 details: "This party is not active anymore.",
		//							 actions: [
		//								 // Option to create party if not already in party
		//								 live.partyId == null ? html`<stylized-button color="red" .trigger=${this.createParty.bind(this)}>Create New Party</div>` : null,
		//							 ],
		//						 }
		//					 }
		//				 }),
		//			 url: `/party/${id}`,
		//		 }
		//	 default:
		//		 return null;
		// }

		return null;
	}

	processRichItems(content: string): [string, Promise<RichItem>[]] {
		// Parse the rich text for matches
		let regex = /([a-z]+)\/([a-z\d_-]+)/gim;
		let m: RegExpExecArray; // Regex match
		let richItems: Promise<RichItem>[] = [];
		let processedContent = ''; // Content with injected HTML for the rich text
		let lastProcessedContentIndex = 0; // The index in `content` at which to slice the next chunk for the processed content
		while ((m = regex.exec(content)) !== null) {
			// Avoid infinite loops with zero-width matches
			if (m.index === regex.lastIndex) regex.lastIndex++;

			// Process match
			let original = m[0];
			let type = m[1];
			let specifier = m[2];

			// Match item
			let item = this.matchRichItem(type, specifier);
			if (!item) continue;

			// Save rich item
			if (item.item) {
				richItems.push(item.item);
			}

			// Process the content
			if (item.url || item.inlineHTML) {
				// Add content up to given point
				processedContent += content.slice(lastProcessedContentIndex, m.index);

				// Add appropriate HTML
				if (item.url) processedContent += `<a href=${item.url}>${original}</a>`;
				else if (item.inlineHTML) processedContent += item.inlineHTML;
				else throw new Error('Unreachable');

				// Update processed index
				lastProcessedContentIndex = m.index + m[0].length;
			}
		}
		processedContent += content.slice(lastProcessedContentIndex, content.length); // Add the rest of the content

		return [processedContent, richItems];
	}

	processMarkdown(content: string): string {
		// let matches = content.match(RichText.MARKDOWN_REGEX) || [];
		let processedContent = new MarkdownText(0);
		let currentContent = processedContent;
		let context: string[] = [];
		let matchEnd = 0;

		let index = 0;
		// Loop through the characters in the content string
		while (true) {
			// Close off the content list
			if (index >= content.length) {
				if (context.length == 0) {
					if (currentContent.children.length) {
						let newText = new MarkdownText(matchEnd);
						newText.stop = index;
						currentContent.addText(newText);
					} else currentContent.stop = content.length;
				}
				break;
			}

			let sliced = content.slice(index);

			// TODO: Simplify the following blocks because they are very similar

			// Match bold syntax
			let syntaxMatch = sliced.match(/^\*\*/);
			if (syntaxMatch != null) {
				if (context[0] != 'bold') {
					if (currentContent.type == 'string') {
						// Add all of the unformatted content before this match
						let newText = new MarkdownText(matchEnd);
						newText.stop = index;
						currentContent.addText(newText);
					}

					// Create a new markdown text for formatting
					let newText = new MarkdownText(index, 'bold');
					currentContent.addText(newText);

					index += syntaxMatch[0].length;
					matchEnd = index;

					// Add to context list
					context.unshift('bold');
					currentContent = newText;
				} else {
					index += syntaxMatch[0].length;
					matchEnd = index;
					currentContent.stop = matchEnd;

					// Remove from context list
					context.shift();
					currentContent = currentContent.parent;
				}

				continue;
			}

			// Match emphasize syntax
			syntaxMatch = sliced.match(/^\_\_/);
			if (syntaxMatch != null) {
				if (context[0] != 'emphasize') {
					if (currentContent.type == 'string') {
						// Add all of the unformatted content before this match
						let newText = new MarkdownText(matchEnd);
						newText.stop = index;
						currentContent.addText(newText);
					}

					// Create a new markdown text for formatting
					let newText = new MarkdownText(index, 'emphasize');
					currentContent.addText(newText);

					index += syntaxMatch[0].length;

					// Add to context list
					context.unshift('emphasize');
					currentContent = newText;
				} else {
					index += syntaxMatch[0].length;
					matchEnd = index;
					currentContent.stop = matchEnd;

					// Remove from context list
					context.shift();
					currentContent = currentContent.parent;
				}

				continue;
			}

			// Match quote syntax
			syntaxMatch = sliced.match(/^&gt; /);

			if (
				syntaxMatch != null &&
				(currentContent.type == 'quote' ? currentContent.homogenousDepth < MAX_QUOTE_DEPTH : true)
			) {
				if (currentContent.type == 'string') {
					// Add all of the unformatted content before this match
					let newText = new MarkdownText(matchEnd);
					newText.stop = index;
					currentContent.addText(newText);
				}

				// Create a new markdown text for formatting
				let newText = new MarkdownText(index + syntaxMatch[0].length, 'quote');
				currentContent.addText(newText);

				index += syntaxMatch[0].length;

				// Add to context list
				context.unshift('quote');
				currentContent = newText;

				continue;
			}

			// Match quote end
			if (context[0] == 'quote') {
				syntaxMatch = sliced.match(/^\n/);

				// Close all quotes in this line
				if (syntaxMatch != null) {
					while (currentContent && currentContent.type == 'quote') {
						currentContent.stop = index;
						index += syntaxMatch[0].length - 1;
						matchEnd = index + 1;

						// Remove from context list
						context.shift();
						currentContent = currentContent.parent;
					}
				}
			}

			index++;
		}

		return processedContent.format(content);
	}

	renderRichItem(item: RichItem) {
		return html`
			<div class="rich-item">
				${item.image
					? typeof item.image == 'string'
						? html`<lazy-img src=${item.image} class="rich-image" bg-size="contain"></lazy-img>`
						: item.image
					: null}
				<div class="rich-title">${item.title}</div>
				${item.details ? html`<div class="rich-details">${item.details}</div>` : null}
				${item.actions ? html`<div class="rich-actions">${item.actions}</div>` : null}
			</div>
		`;
	}

	render() {
		// TODO: We shouldn't be doing this
		let content = escapeHTML(this.content);
		let trimmedContent = content.trim();

		// TODO: Disabed for now, doesn't account for emojis that don't exist
		// If it's only an emoji replace the content with a big emoji, otherwise do the other checks
		if (false && RichText.ONLY_EMOJI_REGEX.test(trimmedContent)) {
			content = trimmedContent.replace(RichText.ONLY_EMOJI_REGEX, RichText.ONLY_EMOJI_SUBSTITUTION);
		} else {
			// Substitute new lines
			// content = content.replace(RichText.NEW_LINE_REGEX, RichText.NEW_LINE_SUBSTITUTION);

			// Substitute links
			content = content.replace(RichText.URL_REGEX, RichText.URL_SUBSTITUTION);

			// TODO: Implement this into processMarkdown
			// Substitute emojis with instances of `EmojiItem`
			content = content.replace(RichText.EMOJI_REGEX, RichText.EMOJI_SUBSTITUTION);

			// Substitute markdown sections
			content = this.processMarkdown(content);
		}

		// Parse rich content
		let [newContent, richItems] = this.processRichItems(content);
		content = newContent; // Update content

		// Map rich content to views
		let richLoadingView = this.renderRichItem({
			title: 'Loading...'
		});
		let richViews = richItems.map(promise => {
			// Add temporary loading text
			return until(promise.then(this.renderRichItem.bind(this)), richLoadingView);
		});

		// Process rich text
		/*
		p/<party id>
		c/<group id>
		sp/<social post id>
		uga/<identity game achievement id>

		twttr/<tweet id>
		ig/<insta id>
		yt/<youtube id>
		*/

		return html`
			<div id="base" class=${classMap({ inline: this.inline })}>
				<!-- Content --><span>${unsafeHTML(content)}</span>
				${this.timestamp
					? html`<date-display class="text-date" short .timestamp=${this.timestamp}></date-display>`
					: null}
			</div>
		`;
	}
}
