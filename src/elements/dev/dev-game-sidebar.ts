import { LitElement, html, customElement, property, css, query, TemplateResult } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './dev-game-sidebar.scss';
import routes from '../../routes';
import { repeat } from 'lit-html/directives/repeat';
import cloud from '@rivet-gg/cloud';
import utils from '../../utils/utils';
import { versionForId } from '../../utils/dev';
import { classMap } from 'lit-html/directives/class-map';
import global from '../../utils/global';
import UIRouter from '../root/ui-router';
import logging from '../../utils/logging';
import settings from '../../utils/settings';
import { showAlert, tooltip } from '../../ui/helpers';
import assets from '../../data/assets';
import timing, { Debounce } from '../../utils/timing';
import { TraversableErrors, VALIDATION_ERRORS } from '../../utils/traversable-errors';
import { InputUpdateEvent } from './text-input';

@customElement('dev-game-sidebar')
export default class DevGameSidebar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	game: cloud.GameFull = null;

	@property({ type: String })
	gameId: string;

	@property({ type: String })
	namespaceId: string;

	// Used when selecting a namespace for logs, lobbies, etc
	@property({ type: String })
	configNamespaceId: string;

	@property({ type: String })
	versionId: string;

	@property({ type: String })
	pageId: string;

	@property({ type: Object })
	loadError?: any;

	// === NAMESPACE COMPONENTS ===
	@property({ type: Boolean })
	namespaceModalActive: boolean = false;

	@property({ type: String })
	namespaceDisplayNameValue: string = null;
	@property({ type: String })
	namespaceNameIdValue: string = '';

	@property({ type: Boolean })
	isCreatingNamespace: boolean = false;

	@property({ type: Boolean })
	namespaceIsValid: boolean = false;

	@property({ type: String })
	validationErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME_NAMESPACE);

	// === DEBOUNCE INFO ===
	validateNamespaceDebounce: Debounce<() => ReturnType<typeof global.cloud.validateGameNamespace>>;

	constructor() {
		super();

		this.validateNamespaceDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				let displayName = this.namespaceDisplayNameValue ?? '';
				let nameId = this.namespaceNameIdValue.length
					? this.namespaceNameIdValue
					: utils.convertStringToId(displayName);

				return await global.cloud.validateGameNamespace({
					gameId: this.game.id,
					nameId,
					displayName
				});
			},
			completeCb: res => {
				// Save errors
				this.validationErrors.load(res.errors.map(err => err.path));
				this.namespaceIsValid = this.validationErrors.isEmpty();
				this.loadError = null;

				// Refresh UI
				this.requestUpdate('validationErrors');
			}
		});

		this.validateNamespaceDebounce.onError(async err => {
			this.loadError = err;
			this.namespaceIsValid = false;

			if (err.hasOwnProperty('statusText')) this.loadError = await (err as Response).json();
		});
	}

	async createNamespace() {
		let displayName = this.namespaceDisplayNameValue ?? '';
		let nameId = this.namespaceNameIdValue.length
			? this.namespaceNameIdValue
			: utils.convertStringToId(displayName);

		let res = await global.cloud.createGameNamespace({
			gameId: this.game.id,
			versionId: this.game.versions[0].versionId,
			nameId,
			displayName
		});

		this.namespaceModalClose();

		UIRouter.shared.navigate(
			routes.devNamespace.build({
				gameId: this.game.id,
				namespaceId: res.namespaceId
			})
		);
	}

	openNamespaceModal() {
		if (this.game.versions.length == 0) {
			showAlert(
				'Cannot create namespace',
				html`You cannot create a namespace before creating a version first.`,
				[
					{
						label: 'Create A Version',
						cb: () =>
							UIRouter.shared.navigate(routes.devVersionDraft.build({ gameId: this.gameId }))
					},
					{
						label: 'Dismiss'
					}
				]
			);
		} else {
			this.namespaceModalActive = true;
		}
	}

	namespaceModalClose() {
		this.namespaceModalActive = false;
	}

	namespaceDisplayNameInput(event: InputUpdateEvent) {
		this.namespaceDisplayNameValue = event.value;

		this.validateNamespaceDebounce.trigger();
	}

	namespaceNameIdInput(event: InputUpdateEvent) {
		this.namespaceNameIdValue = event.value;

		this.validateNamespaceDebounce.trigger();
	}

	render() {
		return html`
			<div id="base">
				<stylized-button
					icon="solid/play"
					href=${routes.devDashboard.build({})}
					id="nav-back"
					small
					color="transparent"
					text="#ecececcc"
				>
					Back
				</stylized-button>

				${this.game ? this.renderContent() : this.renderPlaceholder()}
			</div>

			${this.renderCreateNamespaceModal()}
		`;
	}

	renderContent() {
		let gameIdStr = this.gameId;
		let namespaceIdStr = this.namespaceId ? this.namespaceId : null;
		let versionIdStr = this.versionId ? this.versionId : null;

		let strDraft = settings.getVersionConfigDraft(gameIdStr);
		let draft;

		if (strDraft && strDraft.length) {
			try {
				draft = JSON.parse(strDraft);
			} catch (e) {
				logging.warn('Unable to parse version config draft', e);
			}
		}

		// Sort game versions by timestamp descending
		this.game.versions.sort((a, b) => b.createTs - a.createTs);

		// Collect active versions
		let activeVersions = new Map<string, string[]>();
		for (let namespace of this.game.namespaces) {
			if (activeVersions.has(namespace.versionId))
				activeVersions.get(namespace.versionId).push(namespace.displayName);
			else activeVersions.set(namespace.versionId, [namespace.displayName]);
		}

		let generalClasses = classMap({
			selected: this.pageId == 'summary'
		});
		let tokensClasses = classMap({
			selected: this.pageId == 'tokens'
		});
		let logsClasses = classMap({
			selected: this.pageId == 'logs'
		});
		let lobbiesClasses = classMap({
			selected: this.pageId == 'lobbies'
		});
		let kvClasses = classMap({
			selected: this.pageId == 'kv'
		});

		return html`
			<div id="title">
				<lazy-img
					id="icon"
					src=${this.game.logoUrl ?? assets.asset('/games/blank/logo.png')}
					bg-size="contain"
				></lazy-img>
				<h1>${this.game.displayName}</h1>
			</div>

			<info-panel-body noindent>
				<stylized-button
					class=${generalClasses}
					href=${global.isMobile
						? routes.devGameSummary.build({ gameId: this.game.id })
						: routes.devGame.build({ gameId: this.game.id })}
					icon="regular/square-info"
				>General</stylized-button>
				<stylized-button class=${tokensClasses} href=${routes.devTokens.build({ gameId: this.game.id })} icon="solid/key"
				>API</stylized-button>
				<stylized-button 
					class=${logsClasses}
					href=${routes.devLogs.build({
						gameId: this.game.id,
						namespaceId: this.configNamespaceId
					})}
				icon="solid/book"
				>Logs</stylized-button>
				<stylized-button 
					class=${lobbiesClasses}
					href=${routes.devLobbies.build({
						gameId: this.game.id,
						namespaceId: this.configNamespaceId
					})}
				icon="solid/table-rows"
				>Lobbies</stylized-button>
				<stylized-button
					class=${kvClasses}
					href=${routes.devKv.build({
						gameId: this.game.id,
						namespaceId: this.configNamespaceId
					})}
				icon="solid/table-list"
				>KV</stylized-button>
			</info-panel-body>

			<info-panel-header><div slot="title">Namespaces</div></info-panel-header>
			<info-panel-body id="namespaces">
				<dashed-button icon="regular/plus" .trigger=${this.openNamespaceModal.bind(this)}
					>New namespace</dashed-button
				>
				${repeat(
					this.game.namespaces,
					n => n.namespaceId,
					n => {
						let version = versionForId(this.game, n.versionId);
						let classes = classMap({
							namespace: true,
							selected: n.namespaceId == namespaceIdStr
						});

						return html`<stylized-button
							class=${classes}
							href=${routes.devNamespace.build({
								gameId: this.game.id,
								namespaceId: n.namespaceId
							})}
						>
							<span class="display-name">${n.displayName}</span>
							<span class="version-display-name">${version.displayName}</span>
						</stylized-button>`;
					}
				)}
			</info-panel-body>

			<info-panel-header><div slot="title">Versions</div></info-panel-header>
			<info-panel-body id="versions">
				<dashed-button
					id="draft-button"
					?selected=${this.pageId == 'draft'}
					icon=${draft ? 'regular/file' : 'regular/plus'}
					href=${routes.devVersionDraft.build({ gameId: gameIdStr })}
				>
					${draft ? `Draft: ${draft.displayName || 'Unnamed Version'}` : 'New Version'}
				</dashed-button>
				${repeat(
					this.game.versions,
					v => v.versionId,
					v => {
						let isActive = activeVersions.has(v.versionId);
						let classes = classMap({
							version: true,
							selected: v.versionId == versionIdStr
						});
						let statusClasses = classMap({
							status: true,
							active: isActive
						});

						let activeNamespaces = Array.from(activeVersions.get(v.versionId) || []);

						// Truncate list to 3
						if (activeNamespaces.length > 3) {
							let truncation = `and ${activeNamespaces.length - 3} more`;
							activeNamespaces.length = 3;
							activeNamespaces.push(truncation);
						}

						return html` <stylized-button
							class=${classes}
							href=${routes.devVersion.build({
								gameId: this.game.id,
								versionId: v.versionId
							})}
						>
							<span class="display-name">${v.displayName}</span>
							<div
								class=${statusClasses}
								@mouseenter=${isActive
									? tooltip(`Active in: ${activeNamespaces.join(', ')}`)
									: tooltip('No active namespaces')}
							></div>
						</stylized-button>`;
					}
				)}
			</info-panel-body>
		`;
	}

	// TODO: Fill out more
	renderPlaceholder() {
		return html`
			<div id="title">
				<loading-placeholder></loading-placeholder>
				<loading-placeholder></loading-placeholder>
			</div>
		`;
	}

	renderCreateNamespaceModal() {
		let displayName = this.namespaceDisplayNameValue;

		let displayNameErrors = this.validationErrors.findFormatted('display-name');
		let nameIdErrors = this.validationErrors.findFormatted('name-id');

		return html` <drop-down-modal
			id="create-namespace-modal"
			?active=${this.namespaceModalActive}
			@close=${this.namespaceModalClose.bind(this)}
		>
			<modal-body slot="body">
				<h1>Create your new namespace</h1>
				<div class="input-group">
					<h2>Namespace Name</h2>
					<text-input
						id="namespace-display-name-input"
						light
						placeholder="Enter a namespace name..."
						maxlength="24"
						@input=${this.namespaceDisplayNameInput.bind(this)}
					></text-input>
					${displayNameErrors.length > 0
						? html`
							<span id="create-namespace-error">
								<e-svg src="regular/circle-exclamation"></e-svg> ${displayNameErrors[0]}</li>
							</span>`
						: null}
					<h2>Namespace Name ID</h2>
					<text-input
						light
						.filter=${(v: string) => v.replace(/[\s\-]+/g, '-').toLowerCase()}
						placeholder=${displayName
							? utils.convertStringToId(displayName)
							: 'Enter a name id...'}
						maxlength="16"
						@input=${this.namespaceNameIdInput.bind(this)}
					></text-input>
					${nameIdErrors.length > 0
						? html`
							<span id="create-namespace-error">
								<e-svg src="regular/circle-exclamation"></e-svg> ${nameIdErrors[0]}</li>
							</span>`
						: null}
				</div>
				<stylized-button
					.trigger=${this.createNamespace.bind(this)}
					?disabled=${!this.namespaceIsValid}
					?loading=${this.isCreatingNamespace}
					>Create</stylized-button
				>
			</modal-body>
		</drop-down-modal>`;
	}
}
