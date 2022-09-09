import { LitElement, html, customElement, property } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { responses } from '../../routes';
import logging from '../../utils/logging';
import global from '../../utils/global';
import utils from '../../utils/utils';
import styles from './file-upload-list.scss';
import { cssify } from '../../utils/css';
import { classMap } from 'lit-html/directives/class-map';
import FileUploader, { FileInput, PrepareResponse } from '../common/file-uploader';

export class SelectEvent extends Event {
	constructor(public entryId: string) {
		super('select');
	}
}

interface UploadEntry {
	entryId: string; // The generic identifier for this element; this is *not* the upload ID
	uploadId: string;
	displayName: string;
	createTs: number;
	contentLength: number;
}

@customElement('file-upload-list')
export default class FileUploadList extends LitElement {
	static styles = cssify(styles);

	// === CONFIG ===
	@property({ type: Boolean })
	directory: boolean = false;

	@property({ type: String })
	label: string = null;

	@property({ type: Function })
	loadEntries: () => Promise<UploadEntry[]>;

	@property({ type: Function })
	prepareUpload: InstanceType<typeof FileUploader>['prepareUpload'];

	@property({ type: Boolean })
	selectable: boolean = false;

	@property({ type: Boolean })
	uploadable: boolean = false;

	@property({ type: Number, attribute: 'max-size' })
	maxFileSize: number = null;

	// === STATE ===
	@property({ type: String })
	selectedEntryId: string = null;

	@property({ type: Array })
	entries: UploadEntry[] = null;

	@property({ type: Object })
	loadError?: any;

	firstUpdated() {
		this.fetchData();
	}

	resetData() {
		this.entries = null;
	}

	async fetchData() {
		try {
			this.entries = await this.loadEntries();
		} catch (err) {
			logging.error('failed to load file entries', err);
			this.loadError = err;
		}
	}

	async _completeUpload(prepareRes: PrepareResponse) {
		// Complete cloud upload
		await global.cloud.completeUpload({ uploadId: prepareRes.uploadId });

		// Update upload list
		this.updateSelected(prepareRes.ctx.entryId);
		this.resetData();
		await this.fetchData();
	}

	updateSelected(entryId: string) {
		this.selectedEntryId = entryId;

		let event = new SelectEvent(entryId);
		this.dispatchEvent(event);
	}

	entryRadioChange(entryId: string) {
		this.updateSelected(this.selectedEntryId == entryId ? null : entryId);
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);
		if (this.entries == null) return html`<loading-wheel></loading-wheel>`;

		let classes = classMap({
			selectable: this.selectable
		});

		return html`
			<div id="base" class=${classes}>
				${this.uploadable
					? html` <file-uploader
							?directory=${this.directory}
							max-size=${this.maxFileSize}
							.prepareUpload=${this.prepareUpload}
							.completeUpload=${this._completeUpload.bind(this)}
					  >
							<e-svg slot="icon" src="regular/file-arrow-up"></e-svg>
							<div slot="content">
								<h1 id="input-title">Import ${this.directory ? 'folder' : 'file'}</h1>
							</div>
					  </file-uploader>`
					: null}
				${this.entries.length
					? html` ${this.label ? html`<h2>${this.label}</h2>` : null}
							<div id="folders">
								${repeat(
									this.entries,
									e => e.entryId,
									entry => {
										let selected = this.selectedEntryId == entry.entryId;

										if (!selected && !this.selectable && !this.uploadable) return null;

										let classes = classMap({
											folder: true,
											selected: selected
										});

										return html` <div
											class=${classes}
											@click=${this.selectable
												? this.entryRadioChange.bind(this, entry.entryId)
												: null}
										>
											${this.selectable
												? html`<check-box radio ?checked=${selected}></check-box>`
												: null}
											<div class="folder-info">
												<div class="folder-header">
													<div class="folder-title">
														<e-svg
															slot="icon"
															src=${this.directory
																? 'solid/folder-blank'
																: 'regular/file'}
														></e-svg>
														<h3>${entry.displayName}</h3>
													</div>
													<span class="folder-size"
														>${utils.formatContentLength(
															entry.contentLength
														)}</span
													>
												</div>
												<span class="folder-timestamp"
													>${utils.formatDateLong(entry.createTs)}</span
												>
											</div>
										</div>`;
									}
								)}
							</div>`
					: null}
			</div>
		`;
	}
}
