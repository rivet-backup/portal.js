import {
	LitElement,
	html,
	customElement,
	query,
	property,
	TemplateResult,
	PropertyValues
} from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { classMap } from 'lit-html/directives/class-map';
import { cssify } from '../../utils/css';
import { Deferred } from '../../utils/utils';
import global, { GlobalStatus } from '../../utils/global';
import {
	globalEventGroups,
	GlobalMobileChangeEvent,
	windowEventGroups,
	GlobalStatusChangeEvent
} from '../../utils/global-events';
import timing from '../../utils/timing';
import styles from './ui-root.scss';
import UIRouter, { RouteChangeEvent, RouteTitleChangeEvent } from './ui-router';
import EmojiPicker, { EmojiItemData, EmojiSelectEvent } from '../overlay/emoji-picker';
import { AlertOption } from '../overlay/alert-panel';
import { ActionSheetItem } from '../overlay/action-sheet';
import { showAlert, noContextMenu } from '../../ui/helpers';
import MainSidebar, { MenuItem } from '../sidebar/main-sidebar';
import SearchPanel from '../overlay/search-panel';
import * as api from '../../utils/api';
import RegisterPanel from '../overlay/register-panel';
import config from '../../config';

export const MIN_SWIPE_THRESHOLD = 10;
const TRANSITION_LENGTH = timing.milliseconds(200); // Match with consts.scss/$transition-length

interface EmojiPickerData {
	x: number;
	y: number;
	cb: (item: EmojiItemData) => void;
}

export interface AlertPanelData {
	title: string;
	details: TemplateResult;
	options: AlertOption[];
	noDimClose?: boolean; // Disable closing the alert panel by clicking outside of the modal
}

interface ActionSheetData {
	x: number;
	y: number;
	options: ActionSheetItem[];
}

// Enables which item to search for in the search panel
interface SearchPanelFilter {
	identities?: boolean;
	games?: boolean;
	chats?: boolean;
	groups?: boolean;
}

// Options for showing the search panel (with `helpers.showSearchPanel`).
export interface SearchPanelData {
	filter: SearchPanelFilter;
	selectionCb?: (item: api.identity.IdentityHandle | api.group.GroupHandle) => void;
}

interface TooltipData {
	x: number;
	y: number;
	top: boolean;
	text: string;
	hidden: boolean;
}

interface ContextMenuData {
	x: number;
	y: number;
	hidden: boolean;
	content: TemplateResult;
}

@customElement('ui-root')
export default class UIRoot extends LitElement {
	static styles = cssify(styles);

	static shared: UIRoot;

	// === COMPONENTS ===
	@query('main-sidebar')
	sidebar: MainSidebar;

	@query('ui-router')
	router: UIRouter;

	// @query('game-container')
	// gameContainer: GameContainer; // `global.playingGame` should be used instead if not doing UI-related work

	@query('emoji-picker')
	emojiPicker: EmojiPicker;

	@query('search-panel')
	searchPanel: SearchPanel;

	@query('register-panel')
	registerPanel: RegisterPanel;

	// === DATA ==
	@property({ type: Number })
	globalStatus: GlobalStatus = GlobalStatus.Loading;

	@property({ type: Object })
	playingGameData?: api.identity.GameHandle = null;

	@property({ type: Object })
	emojiPickerData?: EmojiPickerData = null;

	@property({ type: Object })
	alertPanelData?: AlertPanelData = null;

	@property({ type: Object })
	actionSheetData?: ActionSheetData = null;

	@property({ type: Object })
	tooltipData: TooltipData = { x: 0, y: 0, top: false, text: '', hidden: true };

	@property({ type: Object })
	contextMenuData: ContextMenuData = { x: 0, y: 0, hidden: true, content: null };

	@property({ type: Object })
	searchPanelData: SearchPanelData = null;

	@property({ type: Object })
	windowSize: { width: number; height: number } = { width: window.innerWidth, height: window.innerHeight };

	@property({ type: Object })
	activeMenu: MenuItem;

	@property({ type: String })
	routeTitle: string = '';

	@property({ type: Boolean })
	mobileNavStuck: boolean = false;

	@property({ type: Boolean })
	alertPanelActive: boolean = false;

	@property({ type: Boolean })
	searchPanelActive: boolean = false;

	@property({ type: Boolean })
	registerPanelActive: boolean = false;

	// Promise that returns `true` if the user input was not "cancel" or "close"
	alertPanelClose: Deferred<boolean> = new Deferred();

	// Saves recent threads in root for whenever a new main-sidebar is created
	recentThreadsCache: api.identity.ChatThread[] = [];

	// === MEDIA DATA ===
	@property({ type: Boolean })
	isMediaMinimized: boolean = false; // If the media is in PiP

	// === EVENT HANDLERS ===
	handleResize: () => void;
	handleKeyDown: (e: KeyboardEvent) => void;
	handleMobile: (e: GlobalMobileChangeEvent) => void;

	/// If there is any media being displayed on the screen.
	get isViewingMedia(): boolean {
		return !!this.playingGameData;
	}

	/// If rendering fullscreen and there's media actually being rendered.
	get isRenderedFullscreen(): boolean {
		return this.isViewingMedia && !this.isMediaMinimized;
	}

	constructor() {
		super();

		// Set singleton
		if (UIRoot.shared != null) throw new Error('UIRoot.shared has already been set.');
		UIRoot.shared = this;

		this.updateNoScroll();
	}

	beforeUnload(event: BeforeUnloadEvent) {
		event.returnValue = 'Are you sure you want to leave?';
	}

	// === LIFECYCLE ===
	connectedCallback() {
		super.connectedCallback();

		globalEventGroups.add('status-change', (e: GlobalStatusChangeEvent) => {
			this.globalStatus = e.value;
		});

		// Handle resize
		this.handleResize = this.onResize.bind(this);
		windowEventGroups.add('resize', this.handleResize, timing.milliseconds(100));
		this.onResize();

		// Handle key down
		this.handleKeyDown = this.onKeyDown.bind(this);
		windowEventGroups.add('keydown', this.handleKeyDown);

		// Handle mobile detection
		this.handleMobile = this.onMobile.bind(this);
		globalEventGroups.add('mobile', this.handleMobile);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// TODO: Stop listening to live events

		// Remove event listeners
		windowEventGroups.remove('resize', this.handleResize, timing.milliseconds(100));
		windowEventGroups.remove('keydown', this.handleKeyDown);
		globalEventGroups.remove('mobile', this.handleMobile);

		if (this.playingGameData !== null) windowEventGroups.remove('beforeunload', this.beforeUnload);
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Update no scroll if any of the associated properties are changed; `updateMediaState` handles how media
		// affects this
		let updateNoScrollProps = ['showSiteOverlay', 'emojiPickerData', 'alertPanelActive'];
		if (updateNoScrollProps.filter(k => changedProperties.has(k)).length > 0) {
			this.updateNoScroll();
		}

		// Update media state if any of the properties changed
		let updateMediaProps = ['playingGameData', 'isMediaMinimized'];
		if (updateMediaProps.filter(k => changedProperties.has(k)).length > 0) {
			this.updateMediaState();
		}
	}

	// === GAME EVENTS ===
	/// Create a game container and optionally redirect to the game page.
	playGame(game: api.portal.GameProfile) {
		// TODO: Track game sessions on live server
		// TODO: Set global.playingGame
		windowEventGroups.add('beforeunload', this.beforeUnload);

		// Check if the game is already being played
		if (this.playingGameData && this.playingGameData.id == game.id) {
			// Expand the game if playing the game that's already being played
			this.isMediaMinimized = false;
			this.requestUpdate('playingGame');
		} else if (this.playingGameData != null) {
			// Confirm the player wants to leave the game
			showAlert(
				`Are you sure you want to leave ${this.playingGameData.displayName}?`,
				html`All progress will be lost.`,
				[
					{ label: 'Cancel' },
					{
						label: `Leave`,
						destructive: true,
						cb: () => {
							// Close the old game
							this.closeGame();

							// Play the game
							this.playGame(game);
						}
					}
				]
			);
		} else {
			// Set the playing game
			global.setPlayingGame(game);

			// Update the state
			this.isMediaMinimized = false;
			this.playingGameData = game;

			// Open game in new tab
			window.open(game.url, '_blank');
		}
	}

	/// Closes the current game.
	closeGame() {
		if (this.playingGameData === null) return;

		// Stop playing game
		global.setPlayingGame(null);

		// Update the state
		this.playingGameData = null;

		// Remove "confirm leave" event listener
		windowEventGroups.remove('beforeunload', this.beforeUnload);
	}

	// === STATE MANAGEMENT ===
	public toggleEmojiPicker(data?: EmojiPickerData) {
		this.emojiPickerData = data;
	}

	public toggleAlertPanel(data?: AlertPanelData) {
		this.alertPanelData = data;
	}

	public showTooltip(x: number, y: number, top: boolean, text: string) {
		// Wait a little time to make sure that the tooltip was not opened on another element right after the
		// last one closed
		setTimeout(() => {
			this.tooltipData = {
				x: Math.round(x),
				y: Math.round(y),
				top,
				text,
				hidden: false
			};
		}, timing.milliseconds(1));
	}

	public hideTooltip() {
		this.tooltipData.hidden = true;

		// Wait a little time to make sure that the tooltip was not opened on another element right after the
		// last one closed
		setTimeout(() => {
			if (this.tooltipData.hidden) this.requestUpdate('tooltipData');
		}, timing.milliseconds(50));
	}

	public showContextMenu(x: number, y: number, content: TemplateResult) {
		this.contextMenuData = {
			x: Math.round(x),
			y: Math.round(y),
			hidden: false,
			content: content
		};
	}

	public hideContextMenu() {
		this.contextMenuData.hidden = true;
		this.requestUpdate('contextMenuData');
	}

	// === MEDIA MANAGEMENT ===
	attemptCloseMedia() {
		// Skip if not playing game
		if (!this.playingGameData) return;

		// Build alert data
		let options: AlertOption[] = [
			{ label: 'Cancel' },
			{ label: 'Leave', destructive: true, cb: () => this.closeGame() }
		];
		// if (!this.playingGameData.game.isStarred) {
		//	 options.push({label: `Leave & Star`, color: "yellow", destructive: true, cb: () => {
		//			 // Star the game
		//			 let game = this.playingGameData.game;
		//			 graphql.mutate().execute("toggleGameStar(gameId: $id, active: true)", { id: graphql.uuid(game.id) });
		//			 purgeGameCache(game);

		//			 // Close the game
		//			 this.closeGame()
		//		 }});
		// }

		// Confirm leaving the game
		showAlert(
			`Are you sure you want to leave ${this.playingGameData.displayName}?`,
			html`All progress will be lost.`,
			options
		);
	}

	toggleMinimize(active: boolean) {
		// Update state
		this.isMediaMinimized = active;
	}

	// toggleGameStar() {
	//	 if (!this.playingGameData) return;

	//	 // Update identity data
	//	 let active = !this.playingGameData.game.isStarred;
	//	 this.playingGameData.game.isStarred = active;
	//	 this.requestUpdate("playingGameData");

	//	 // Commit changes
	//	 graphql.mutate().execute(
	//		 "toggleGameStar(gameId: $gameId, active: $active)",
	//		 { gameId: graphql.uuid(this.playingGameData.game.id), active: graphql.bool(active) },
	//	 );
	// }

	// === UI UPDATES ===
	updateNoScroll() {
		// Toggle scrollable content
		let noScroll = this.isViewingMedia || this.emojiPickerData || this.alertPanelActive;
		document.body.classList.toggle('no-scroll', !!noScroll);
	}

	updateMediaState() {
		// Reset minimized if needed
		if (this.isMediaMinimized && !this.isViewingMedia) {
			this.isMediaMinimized = false;
		}

		// Update scroll
		this.updateNoScroll();
	}

	onResize() {
		// Update pip window size
		this.windowSize.width = window.innerWidth;
		this.windowSize.height = window.innerHeight;
		this.requestUpdate('windowSize');

		// Turn off the emoji picker, tooltip, and context menu on resize
		this.toggleEmojiPicker();
		this.hideContextMenu();
		this.hideTooltip();
	}

	onKeyDown(event: KeyboardEvent) {
		// Close overlays
		if (event.code == 'Escape') {
			// Alert panel takes precedence over search panel
			if (this.alertPanelActive) {
				this.closeAlertPanel();
			} else if (this.searchPanelActive) {
				this.closeSearchPanel();
			}
		}
	}

	// Update on mobile change
	onMobile() {
		document.body.classList.toggle('has-scrollbar', !global.isMobile);

		this.requestUpdate();
	}

	// === EVENTS ===
	onOverlayHolderClick(stateKey: keyof this, event: MouseEvent) {
		// Remove state if the background was clicked; otherwise, ignore the click since it was within the element
		if ((event.target as HTMLElement).classList.contains('overlay-holder')) {
			this[stateKey] = null;
		}
	}

	onEmojiSelect(event: EmojiSelectEvent) {
		if (!this.emojiPickerData) return;

		// Call callback
		this.emojiPickerData.cb(event.item);

		// Hide picker
		this.emojiPickerData = null;
	}

	onRouteChange(event: RouteChangeEvent) {
		// Update sidebar
		this.activeMenu = event.menuItem;

		// Set navbar stuck value
		if (event.mobileNavStuck !== null) {
			this.mobileNavStuck = event.mobileNavStuck;
			this.routeTitle = event.title;
		}

		// Update title name after the page animation is complete
		setTimeout(() => {
			this.routeTitle = event.title;
		}, TRANSITION_LENGTH);

		// Hide overlay and set media to minimized
		this.toggleMinimize(true);

		// Hide context menu
		this.hideContextMenu();
	}

	onTitleChange(event: RouteTitleChangeEvent) {
		// Update title name after the page animation is complete
		setTimeout(() => {
			this.routeTitle = event.title;
		}, TRANSITION_LENGTH);
	}

	closeAlertPanel() {
		this.alertPanelClose.resolve(false);
		this.alertPanelClose.reset();

		this.alertPanelActive = false;
	}

	openSearchPanel() {
		this.searchPanelActive = true;

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the body's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			this.searchPanel.focusInput();
		});
	}

	closeSearchPanel() {
		this.searchPanelActive = false;

		// Clear after animation is complete
		setTimeout(() => {
			if (this.searchPanel) {
				this.searchPanel.clearSearch();
			}
		}, timing.milliseconds(300));
	}

	openRegisterPanel() {
		this.registerPanelActive = true;

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the body's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			this.registerPanel.focusInput();
		});
	}

	closeRegisterPanel() {
		this.registerPanelActive = false;

		// Clear after animation is complete
		setTimeout(() => {
			if (this.searchPanel) this.registerPanel.resetRegister();
		}, timing.milliseconds(300));
	}

	// Manage loading status
	hideLoading() {
		document.getElementById('loading').classList.add('hidden');
	}

	updateLoading(text: string, error: boolean) {
		document.getElementById('loading').classList.remove('hidden');
		document.getElementById('loading').classList.remove('error');
		document.getElementById('loading-text').innerText = text;
	}

	// === RENDER ===
	render() {
		let content = null;
		switch (this.globalStatus) {
			// Loading
			case GlobalStatus.Loading:
				this.updateLoading('Connecting', false);
				break;
			case GlobalStatus.Authenticating:
				this.updateLoading('Authenticating', false);
				break;

			// Interactive
			case GlobalStatus.Consenting:
				this.hideLoading();
				content = html`<page-consent></page-consent>`;
				break;
			case GlobalStatus.LinkingGame:
				this.hideLoading();
				content = html`<page-link-game></page-link-game>`;
				break;
			case GlobalStatus.Connected:
				// Continue as normal
				this.hideLoading();
				content = this.renderContent();
				break;

			// Failures
			case GlobalStatus.AuthFailed:
				this.updateLoading('Authentication failed', true);
				break;
		}

		return html`
			<!-- Watermark -->
			${config.RIVET_NAMESPACE != 'prod' ? html`
				<div id="watermark">
				   ${config.RIVET_NAMESPACE ?? 'unknown'} &mdash; ${config.GIT_BRANCH} &mdash; ${config.GIT_COMMIT.substring(0, 8)}
				</div>
		   ` : null}

		   <!-- Content -->
		   ${content}
		`;
	}

	renderContent() {
		// Calculated layout properties
		let fullWidth = window.innerWidth;
		let fullHeight = window.innerHeight;

		// Calculate PiP scaling
		let scalePercent = 1;
		let offsetRight = 0;
		let offsetBottom = 0;
		if (this.isMediaMinimized) {
			// Scale to mini tile
			let targetWidth = 400;
			let targetHeight = 300;
			scalePercent = Math.min(targetWidth / fullWidth, targetHeight / fullHeight);

			// Offset from the sides
			offsetRight = 16;
			offsetBottom = 16;
		}

		// Scale width and height
		let scaledWidth = Math.round(fullWidth * scalePercent);
		let scaledHeight = Math.round(fullHeight * scalePercent);

		return html`
			<!-- Mobile Navigation -->
			${global.isMobile
				? html`<mobile-nav .title=${this.routeTitle} .stuck=${this.mobileNavStuck}></mobile-nav>`
				: null}

			<!-- Page Body -->
			<div id="content-holder" class=${classMap({ mobile: global.isMobile })}>
				<ui-router
					@change=${this.onRouteChange.bind(this)}
					@title-change=${this.onTitleChange.bind(this)}
				></ui-router>
			</div>

			<!-- Media -->
			<div
				id="media-holder"
				class=${classMap({ minimize: this.isMediaMinimized })}
				style=${styleMap({
					width: `${scaledWidth}px`,
					height: `${scaledHeight}px`,
					right: `${offsetRight}px`,
					bottom: `${offsetBottom}px`
				})}
			>
				<!-- PiP Content -->
				<!-- <div
					id="media-content"
					style=${styleMap({
					width: `${fullWidth}px`,
					height: `${fullHeight}px`,
					transform: scalePercent != 1 ? `scale(${scalePercent.toFixed(3)})` : null
				})}
				>
					${this.playingGameData
					? html`<game-container
							.game=${this.playingGameData}
							?minimized=${this.isMediaMinimized}
					  ></game-container>`
					: null}
				</div> -->

				<!-- Minimized Overlay -->
				<!-- <div id="minimized-overlay" @mousedown=${this.toggleMinimize.bind(this, false)}>
					<div>Expand</div>
					<icon-button
						class="close-button"
						src="regular/circle-xmark"
						smaller
						.trigger=${this.attemptCloseMedia.bind(this)}
					></icon-button>
				</div> -->
			</div>

			<!-- Sidebar -->
			${global.isMobile ? null : html`<main-sidebar .activeMenu=${this.activeMenu}></main-sidebar>`}

			<!-- Interactable Overlays -->
			${this.emojiPickerData
				? html`<div
						class="overlay-holder"
						@mousedown=${this.onOverlayHolderClick.bind(this, 'emojiPickerData')}
				  >
						<emoji-picker
							style=${styleMap({
								left: `${this.emojiPickerData.x}px`,
								top: `${this.emojiPickerData.y}px`
							})}
							@select=${this.onEmojiSelect.bind(this)}
						></emoji-picker>
				  </div>`
				: null}

			<!-- Alert overlay -->
			<drop-down-modal
				.active=${this.alertPanelActive}
				.no-dim-close=${this.alertPanelData && this.alertPanelData.noDimClose}
				@close=${this.closeAlertPanel.bind(this)}
			>
				<modal-body slot="body">
					<alert-panel
						.data=${this.alertPanelData}
						@select=${this.closeAlertPanel.bind(this)}
					></alert-panel>
				</modal-body>
			</drop-down-modal>

			<!-- Search overlay -->
			<drop-down-modal .active=${this.searchPanelActive} @close=${this.closeSearchPanel.bind(this)}>
				<modal-body slot="body">
					<search-panel .options=${this.searchPanelData}></search-panel>
				</modal-body>
			</drop-down-modal>

			<!-- Register overlay -->
			<drop-down-modal .active=${this.registerPanelActive} @close=${this.closeRegisterPanel.bind(this)}>
				<modal-body slot="body">
					<register-panel></register-panel>
				</modal-body>
			</drop-down-modal>

			${this.actionSheetData
				? html`<div
						class="overlay-holder"
						@mousedown=${this.onOverlayHolderClick.bind(this, 'actionSheetData')}
				  >
						<action-sheet
							style=${styleMap({
								left: `${this.actionSheetData.x}px`,
								top: `${this.actionSheetData.y}px`
							})}
							.options=${this.actionSheetData.options}
							@select=${(): void => (this.actionSheetData = null)}
						></action-sheet>
				  </div>`
				: null}

			<!-- Notification Layer -->
			<notification-overlay></notification-overlay>

			<!-- Tooltip -->
			${global.isMobile
				? null
				: html`<div
						id="tooltip"
						class=${classMap({ hidden: this.tooltipData.hidden, top: this.tooltipData.top })}
						style=${styleMap({ left: `${this.tooltipData.x}px`, top: `${this.tooltipData.y}px` })}
				  >
						${this.tooltipData.text}
				  </div>`}

			<!-- Context menu -->
			${this.contextMenuData.hidden
				? null
				: html` <div id="contextmenuclose" @mousedown=${this.hideContextMenu.bind(this)}></div>
						<div
							id="contextmenu"
							@contextmenu=${noContextMenu}
							style=${styleMap({
								left: `${this.contextMenuData.x}px`,
								top: `${this.contextMenuData.y}px`
							})}
						>
							<div id="scroller">${this.contextMenuData.content}</div>
						</div>`}
		`;
	}
}
