import { LitElement, html, customElement, property, PropertyValues } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../../utils/css';
import styles from './game-version.scss';
import routes, { responses } from '../../../routes';
import global from '../../../utils/global';
import * as cloud from '@rivet-gg/cloud';
import { showAlert } from '../../../ui/helpers';
import settings from '../../../utils/settings';
import UIRouter from '../../root/ui-router';
import { DropDownSelectEvent } from '../../dev/drop-down-list';
import UIRoot from '../../root/ui-root';

@customElement('page-dev-game-version')
export default class DevGameNamespace extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: String })
	versionId: string;

	@property({ type: Object })
	version: cloud.VersionFull = null;

	@property({ type: Object })
	loadError?: any;

	@property({ type: Object })
	tiers: cloud.RegionTier[] = [];

	@property({ type: String })
	namespaceSelection: string = null;

	async firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		// Fetch tier options
		let res = await global.cloud.getRegionTiers({});
		this.tiers = res.tiers;
	}

	updated(changedProperties: PropertyValues) {
		// Request data if category set
		if (changedProperties.has('versionId')) {
			this.resetData();
			this.fetchData();
		}
	}

	resetData() {
		this.version = null;
		this.loadError = null;
	}

	async fetchData() {
		try {
			this.version = (
				await global.cloud.getGameVersionById({ gameId: this.game.id, versionId: this.versionId })
			).version;
		} catch (err) {
			this.loadError = err;
		}
	}

	changeNamespaceSelection(event: DropDownSelectEvent) {
		this.namespaceSelection = event.selection.value;

		showAlert(
			'Deploy version',
			html`<p>
				Are you sure you want to deploy version <b>${this.version.displayName}</b> to namespace
				<b>${event.selection.label}</b>?
			</p>`,
			[
				{
					label: 'No'
				},
				{
					label: 'Yes',
					cb: this.deployToNamespace.bind(this)
				}
			]
		);
	}

	async deployToNamespace() {
		await global.cloud.updateGameNamespaceVersion({
			gameId: this.game.id,
			namespaceId: this.namespaceSelection,
			versionId: this.version.versionId
		});

		this.dispatchEvent(new Event('update-version'));
	}

	async overwriteAlert() {
		showAlert(
			'Duplicate version',
			html`You currently have a version draft in progress. Duplicating this version will overwrite the
			saved draft.`,
			[
				{
					label: 'Cancel',
					cb: () => UIRoot.shared.alertPanelClose.resolve(false)
				},
				{
					label: 'Continue',
					destructive: true,
					cb: () => UIRoot.shared.alertPanelClose.resolve(true)
				}
			]
		);

		// Use either a button press or dim area click to resolve promise
		return UIRoot.shared.alertPanelClose.promise;
	}

	// Duplicate latest version
	async duplicateVersion() {
		let strDraft = settings.getVersionConfigDraft(this.game.id);

		// Ask the identity if they want to overwrite the current saved draft
		if (strDraft && strDraft.length != 0) {
			let res = await this.overwriteAlert();

			if (!res) return;
		}

		let nextBuildName;
		let buildNoMatch = this.version.displayName.trim().match(/\(\s*\d+\s*\)$/);

		// Check for a build number in the title
		if (buildNoMatch) {
			let buildNo = parseInt(buildNoMatch[0].slice(1));
			nextBuildName = `${this.version.displayName.replace(/\s*\(\s*\d+\s*\)$/, '')} (${buildNo + 1})`;
		} else {
			nextBuildName = `${this.version.displayName} (2)`;
		}

		// Update version draft that we'll render
		settings.setVersionConfigDraft(
			this.game.id,
			JSON.stringify({
				displayName: nextBuildName,
				config: this.version.config
			})
		);

		// Switch to draft view
		UIRouter.shared.navigate(routes.devVersionDraft.build({ gameId: this.game.id }));
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError, true);
		if (this.version == null) return this.renderPlaceholder();

		let namespaceOptions = this.game.namespaces
			.filter(n => n.versionId != this.version.versionId)
			.map(n => ({
				label: n.displayName,
				value: n.namespaceId
			}));

		return html`
			<div id="base">
				<div id="subtitle-area">
					<p id="date">
						Created: <date-display .timestamp=${this.version.createTs}></date-display>
					</p>
					<stylized-button
						id="duplicate-button"
						icon="regular/clone"
						.trigger=${this.duplicateVersion.bind(this)}
						>Duplicate</stylized-button
					>
				</div>
				<h1>Active namespaces</h1>
				<div id="namespaces">
					${repeat(
						this.game.namespaces.filter(n => n.versionId == this.version.versionId),
						n => n.namespaceId,
						n => html` <a
							class="namespace"
							href=${routes.devNamespace.build({
								gameId: this.game.id,
								namespaceId: n.namespaceId
							})}
						>
							<h3>${n.displayName}</h3>
							<e-svg src="solid/arrow-right"></e-svg>
						</a>`
					)}
					<div id="deploy-namespace">
						<h2>Deploy to namespace:</h2>
						<drop-down-list
							.options=${namespaceOptions}
							@select=${this.changeNamespaceSelection.bind(this)}
						></drop-down-list>
					</div>
				</div>

				<h1>Services</h1>
				<dev-version-info
					.game=${this.game}
					.tiers=${this.tiers}
					.config=${this.version.config}
				></dev-version-info>
			</div>
		`;
	}

	renderPlaceholder() {
		return html`<div id="placeholder">
			<div id="placeholder-subtitle-area">
				<loading-placeholder id="placeholder-date"></loading-placeholder>
				<loading-placeholder id="placeholder-duplicate"></loading-placeholder>
			</div>
			<loading-placeholder class="placeholder-subtitle"></loading-placeholder>
			<div id="placeholder-namespaces">
				<loading-placeholder></loading-placeholder>
				<loading-placeholder></loading-placeholder>
			</div>
			<loading-placeholder class="placeholder-subtitle"></loading-placeholder>
			<loading-placeholder class="placeholder-service"></loading-placeholder>
			<loading-placeholder class="placeholder-service"></loading-placeholder>
		</div> `;
	}
}
