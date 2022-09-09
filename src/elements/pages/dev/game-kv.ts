import { LitElement, html, customElement, property, query, PropertyValues } from 'lit-element';
import styles from './game-kv.scss';
import global from '../../../utils/global';
import cloud from '@rivet-gg/cloud';
import * as api from '../../../utils/api';
import { responses } from '../../../routes';
import { cssify } from '../../../utils/css';
import { classMap } from 'lit-html/directives/class-map';
import utils from '../../../utils/utils';
import TextInput from '../../dev/text-input';
import { repeat } from 'lit-html/directives/repeat';
import timing, { Debounce } from '../../../utils/timing';
import logging from '../../../utils/logging';
import { tooltip } from '../../../ui/helpers';
import UIRoot from '../../root/ui-root';

enum LastOutput {
	Batch,
	Single
}

@customElement('page-dev-game-kv')
export default class DevGameKv extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: String })
	namespaceId: string;

	@property({ type: Object })
	namespace: cloud.NamespaceFull = null;

	@property({ type: Object })
	version: cloud.VersionFull = null;

	@property({ type: Array })
	batchOutput: api.kv.KvEntry[] = [];

	@property({ type: Array })
	singleOutput: any = undefined;

	@property({ type: Number })
	lastOutput: LastOutput = LastOutput.Single;

	@property({ type: String })
	lastKeyValue: string = null;

	@property({ type: String })
	keyValue: string = null;

	@property({ type: String })
	keyError: string = null;

	@property({ type: Object })
	jsonValue: any = undefined;

	@property({ type: Boolean })
	invalidJson: boolean = false;

	@property({ type: Boolean })
	jsonValueIsSame: boolean = true;

	@property({ type: Boolean })
	updatingValue: boolean = false;

	@property({ type: Array })
	deletionKey: string[] = [];

	@property({ type: Object })
	loadError?: any;

	@query('#key')
	keyInput: TextInput;

	@query('#json')
	jsonInput: TextInput;

	reqCounter: number = 0;
	successReqCounter: number = 0;

	watchStream: api.RepeatingRequest<api.kv.GetBatchCommandOutput>;

	// === TIMING ===
	viewKeyDebounce: Debounce<() => Promise<Awaited<api.kv.GetOutput> | Awaited<api.kv.GetBatchOutput>>>;
	_tmpKeyValue: string;
	// This value is used to prevent restarting the `watchStream` whenever a response is handled
	// (such as right after the `watchStream` gets a new message)
	lastRequestKeyValue: string;

	constructor() {
		super();

		this.viewKeyDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				if (this.keyError) return null;

				let keyValue = this.keyValue;
				this._tmpKeyValue = keyValue;

				let res;
				if (keyEndsWithSlash(keyValue)) {
					res = await global.live.kv.getBatch({
						keys: [keyValue],
						namespaceId: this.namespaceId
					});
				} else {
					res = await global.live.kv.get({ key: keyValue, namespaceId: this.namespaceId });
				}

				return res;
			},
			completeCb: res => {
				this.lastKeyValue = this._tmpKeyValue;

				if (isBatchOutput(res)) {
					this.handleBatchValues(res.entries);
				} else {
					this.handleSingleValue(res.value);
				}

				this.lastRequestKeyValue = this.lastKeyValue;
			}
		});

		this.viewKeyDebounce.onError(async err => {
			console.error(err);
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await (err as Response).json();
		});
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Request data if namespace id set
		if (changedProperties.has('namespaceId')) {
			this.resetData();
			this.fetchData();
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Dispose event
		if (this.watchStream) this.watchStream.cancel();
	}

	resetData() {
		this.namespace = null;
		this.loadError = null;

		this.lastOutput = LastOutput.Single;
		this.singleOutput = undefined;
		this.batchOutput.length = 0;
		this.lastKeyValue = null;
		this.keyValue = null;
		if (this.keyInput) this.keyInput.reset();
		this.keyError = null;
		this.invalidJson = false;
		this.jsonValueIsSame = true;
		this.updatingValue = false;

		this.updateEditorInput(undefined);

		this.requestUpdate();
	}

	async fetchData() {
		try {
			let reqId = this.reqCounter++;

			let namespaceRes = await global.cloud.getGameNamespaceById({
				gameId: this.game.id,
				namespaceId: this.namespaceId
			});

			// Fetch full version config
			let versionRes = await global.cloud.getGameVersionById({
				gameId: this.game.id,
				versionId: namespaceRes.namespace.versionId
			});

			// Make sure request is most up to date
			if (reqId >= this.successReqCounter) {
				this.namespace = namespaceRes.namespace;
				this.version = versionRes.version;

				this.successReqCounter = reqId;
			}
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	handleBatchValues(entries: api.kv.KvEntry[]) {
		this.lastOutput = LastOutput.Batch;
		this.batchOutput = entries;

		if (this.lastRequestKeyValue != this.keyValue) this.watchLastKey();
	}

	handleSingleValue(value: any) {
		this.lastOutput = LastOutput.Single;
		this.singleOutput = value;

		this.updateEditorInput(value);
		this.jsonValueIsSame = true;

		if (this.lastRequestKeyValue != this.keyValue) this.watchLastKey();
	}

	async viewKey(key: string[]) {
		try {
			let keyValue = connectKey(key);
			let res = await global.live.kv.get({ key: keyValue, namespaceId: this.namespaceId });
			this.keyValue = keyValue;
			this.lastKeyValue = keyValue;
			this.keyInput.reset();

			this.handleSingleValue(res.value);
		} catch (err) {
			console.error(err);
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	watchLastKey() {
		let ctxNamespaceId = this.namespaceId;

		// Observe chat log
		if (this.watchStream) this.watchStream.cancel();
		this.watchStream = new api.RepeatingRequest(
			async (abortSignal, watchIndex) => {
				return await global.live.kv.getBatch(
					{
						keys: [this.lastKeyValue.replace(/,/g, '\\$&')],
						namespaceId: this.namespaceId,
						watchIndex
					},
					{ abortSignal }
				);
			},
			{ watchIndex: { index: Date.now().toString() } }
		);

		this.watchStream.onMessage(res => {
			if (this.namespaceId == ctxNamespaceId) {
				// Update keys in place
				for (let entry of res.entries) {
					if (this.lastOutput == LastOutput.Single) {
						if (entry.deleted) {
							this.singleOutput = undefined;
						}
						// Don't update input value if the user is currently editing
						else if (this.jsonValueIsSame || this.updatingValue) {
							this.handleSingleValue(entry.value);
						}
					} else if (this.lastOutput == LastOutput.Batch) {
						let index = this.batchOutput.findIndex(kv => utils.arraysEqual(kv.key, entry.key));

						if (index != -1) {
							if (entry.deleted) this.batchOutput.splice(index, 1);
							else this.batchOutput[index].value = entry.value;
						}
					}
				}

				this.requestUpdate('batchOutput');
			}

			this.updatingValue = false;
		});

		this.watchStream.onError(async err => {
			logging.error('Request error', err);
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await (err as any).json();
		});
	}

	async updateKey() {
		if (this.keyError || this.invalidJson) return;

		try {
			this.updatingValue = true;
			await global.live.kv.put({
				key: this.keyValue,
				body: this.jsonValue,
				namespaceId: this.namespaceId
			});
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	async deleteKey(key: string[], e: Event) {
		e.stopImmediatePropagation();

		try {
			if (key) {
				if (utils.arraysEqual(this.deletionKey, key)) {
					UIRoot.shared.hideTooltip();
					await global.live.kv.delete({ key: connectKey(key), namespaceId: this.namespaceId });
					this.clearDeletionKey();
				} else {
					this.deletionKey = Array.from(key);
				}
			} else {
				await global.live.kv.delete({ key: this.lastKeyValue, namespaceId: this.namespaceId });

				this.singleOutput = undefined;
				this.updateEditorInput(undefined);
			}
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError, true);
		if (this.namespace == null) return this.renderPlaceholder();

		return html`<div id="base">
			${this.version.config.kv
				? html`${this.lastKeyValue
							? html`<div id="navigation-holder">
									<div id="navigation" class="key-display">
										${this.renderKey(splitKey(this.lastKeyValue), true)}
									</div>
							  </div>`
							: null}
						<div id="controls">
							<text-input
								id="key"
								placeholder="Key"
								maxlength="512"
								.init=${this.keyValue}
								@input=${this.changeKeyValue.bind(this)}
							></text-input>
						</div>
						${this.keyError ? html`<h2 class="error">Invalid key: ${this.keyError}</h2>` : null}
						${this.lastOutput == LastOutput.Single
							? this.lastKeyValue
								? this.renderEditor()
								: null
							: this.lastOutput == LastOutput.Batch
							? this.batchOutput.length == 0
								? html`<p id="no-values" class="muted">No keys found</p>`
								: this.renderValues()
							: null}`
				: html`<div id="no-kv" class="muted">
						This namespace does not have the KV service enabled.
				  </div>`}
		</div>`;
	}

	renderPlaceholder() {
		return html`<div id="placeholder">
			<div id="placeholder-controls">
				<loading-placeholder></loading-placeholder>
			</div>
		</div>`;
	}

	renderEditor() {
		return html`
			<text-input
				id="json"
				area
				.placeholder=${this.singleOutput === undefined
					? 'Key does not exist. Create a value here'
					: 'JSON data'}
				maxlength="2048"
				.init=${JSON.stringify(this.jsonValue, undefined, '\t') ?? null}
				@input=${this.changeJsonValue.bind(this)}
				@keydown=${this.jsonKeyDown.bind(this)}
			></text-input>
			${this.invalidJson ? html`<h2 class="error">Invalid JSON</h2>` : null}
			<div id="update-actions">
				<div id="left">
					<stylized-button
						?disabled=${this.jsonValue === undefined || this.invalidJson || this.jsonValueIsSame}
						.trigger=${this.updateKey.bind(this)}
						>${this.singleOutput === undefined ? 'Create' : 'Update'}</stylized-button
					>
					<stylized-button
						?disabled=${this.jsonValueIsSame}
						.trigger=${this.cancelEdit.bind(this)}
						>Cancel</stylized-button
					>
				</div>
				<stylized-button
					color="#d93636"
					?disabled=${this.singleOutput === undefined}
					.trigger=${this.deleteKey.bind(this)}
					>Delete</stylized-button
				>
			</div>
		`;
	}

	renderValues() {
		return html`<div id="kv-list">
			${repeat(
				this.batchOutput,
				kv => connectKey(kv.key),
				kv => {
					let deleteConfirmation = utils.arraysEqual(this.deletionKey, kv.key);
					let classes = classMap({
						delete: true,
						confirm: deleteConfirmation
					});
					return html`<div
						class="kv-pair"
						@click=${this.viewKey.bind(this, kv.key)}
						@pointerleave=${this.clearDeletionKey.bind(this)}
					>
						<icon-button
							class=${classes}
							src="solid/xmark"
							.color=${null}
							.highlightColor=${null}
							.trigger=${this.deleteKey.bind(this, kv.key)}
							@mouseenter=${deleteConfirmation ? tooltip('Confirm deletion?') : null}
						></icon-button>
						<div class="info">
							<h2 class="key-display">${this.renderKey(kv.key)}</h2>
							<h3 class="value">${JSON.stringify(kv.value)}</h3>
						</div>
						<e-svg src="solid/chevron-right"></e-svg>
					</div>`;
				}
			)}
		</div>`;
	}

	renderKey(key: string[], clickable: boolean = false) {
		return key.map((keySegment, i) => {
			if (keySegment.length == 0) return null;

			// The key is split up by character and all whitespace characters
			// are made "special" so they are visible to the user.
			let splitKey = /\s/.test(keySegment)
				? keySegment
						.split('')
						.map(char => (/\s/.test(char) ? html`<span class="special">&nbsp;</span>` : char))
				: keySegment;

			let classes = classMap({
				segment: true,
				clickable
			});

			return html`<span class=${classes} @click=${clickable ? this.navigateTo.bind(this, i) : null}
					>${splitKey}</span
				>${i != key.length - 1 ? html`<span class="separator">/</span>` : null}`;
		});
	}

	clearDeletionKey() {
		this.deletionKey.length = 0;
		this.requestUpdate('deletionKey');
	}

	async navigateTo(segmentIndex: number) {
		let keyValue = `${connectKey(splitKey(this.lastKeyValue).slice(0, segmentIndex + 1))}/`;

		try {
			let res = await global.live.kv.getBatch({ keys: [keyValue], namespaceId: this.namespaceId });
			this.keyValue = keyValue;
			this.lastKeyValue = keyValue;
			this.keyInput.reset();

			this.handleBatchValues(res.entries);
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	changeKeyValue(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		this.keyValue = target.value;

		this.keyError = validateKey(this.keyValue);
		this.viewKeyDebounce.trigger();
	}

	changeJsonValue(event: InputEvent) {
		let target = event.target as HTMLTextAreaElement;

		try {
			this.jsonValue = JSON.parse(target.value);
			this.invalidJson = false;

			if (this.jsonValue === null) {
				this.jsonValue = undefined;
				this.invalidJson = true;
			} else {
				// Check if the input value is the same as the current key value
				this.jsonValueIsSame = JSON.stringify(this.jsonValue) == JSON.stringify(this.singleOutput);
			}
		} catch {
			this.jsonValue = undefined;
			this.invalidJson = true;
		}
	}

	jsonKeyDown(event: KeyboardEvent) {
		let target = event.target as TextInput;

		if (event.key == 'View') {
			event.preventDefault();

			if (document.queryCommandSupported('insertText')) {
				document.execCommand('insertText', false, '\t');
			} else {
				target.inputNode.setRangeText(
					'\t',
					target.inputNode.selectionStart,
					target.inputNode.selectionStart,
					'end'
				);
				target.value = target.inputNode.value;
			}
		}
	}

	updateEditorInput(value: any) {
		this.jsonValue = value;

		if (this.jsonInput) this.jsonInput.reset();
	}

	cancelEdit() {
		this.invalidJson = false;
		this.jsonValueIsSame = true;
		this.updateEditorInput(this.singleOutput);
	}
}

function splitKey(key: string) {
	let words = [];
	let dontSplit = false;
	let lastIndex = 0;

	let chars = key.split('');
	for (let i = 0, l = key.length; i < l; i++) {
		let char = chars[i];

		if (char == '\\') dontSplit = !dontSplit;
		else {
			if (!dontSplit && char == '/') {
				words.push(key.slice(lastIndex, i).replace(/\\(.)/g, '$1'));
				lastIndex = i + 1;
			}

			dontSplit = false;
		}
	}

	words.push(key.slice(lastIndex).replace(/\\(.)/g, '$1'));

	return words;
}

function connectKey(key: string[]) {
	return key.map(segment => segment.replace(/[,\/]/g, '\\$&')).join('/');
}

function validateKey(key: string) {
	if (key.length == 0) return 'Key too short';
	if (key.length > 512) return 'Key too long (< 512)';
	if (key.startsWith('/')) return 'Key cannot start with forward slash';

	let match = key.match(/\\+?$/);
	if (match && match[0].length % 2 == 0) return 'Key cannot end with a backlash';

	return null;
}

function keyEndsWithSlash(key: string) {
	let match = key.match(/\\*?\/$/);

	return match && match[0].length % 2 == 1;
}

function isBatchOutput(item: object): item is Awaited<api.kv.GetBatchOutput> {
	return item.hasOwnProperty('entries');
}
