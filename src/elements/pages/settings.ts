import {
	LitElement,
	html,
	customElement,
	property,
	css,
	query,
	TemplateResult,
	PropertyValues
} from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import styles from './settings.scss';
import { cssify } from '../../utils/css';
import { tooltip, showIdentityContextMenu, showAlert } from '../../ui/helpers';
import { GlobalMobileChangeEvent, globalEventGroups, SettingChangeEvent } from '../../utils/global-events';
import UIRouter from '../root/ui-router';
import global from '../../utils/global';
import routes, { responses } from '../../routes';

import { OAUTH_PROVIDERS } from '../../utils/utils';
import { identityRouteData } from '../../data/identity';
import logging from '../../utils/logging';
import { ToggleSwitchEvent } from '../common/toggle-switch';
import UIRoot from '../root/ui-root';
import { ls } from '../../utils/cache';

interface SettingsPageData {
	id?: string;
	title?: string;
	render?(): TemplateResult;
	url?: string;
	notPortal?: boolean;
	spacer?: boolean;
}

interface SettingsData {
	thirdPartyData: boolean;
	collectData: boolean;
	pushNotifications: boolean;
}

@customElement('page-settings')
export default class SettingsPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	tabId?: string;

	tabs: SettingsPageData[];
	settings: SettingsData;

	@property({ type: Object })
	loadError?: any;

	@query('#bio-textarea')
	bioTextarea: HTMLTextAreaElement;

	@property({ type: Boolean })
	editModalActive: boolean = false;

	@property({ type: Array })
	// changelog: api.portal.ChangelogEntry[] = [];
	changelog: any[] = [];

	// === EVENT HANDLERS ===
	handleMobile: (e: GlobalMobileChangeEvent) => void;
	handleSettingChange: (e: SettingChangeEvent) => void;

	constructor() {
		super();

		// Default settings
		this.settings = Object.assign(
			{},
			{
				thirdPartyData: ls.getBoolean('third-party-data', true),
				collectData: ls.getBoolean('collect-data', true),
				pushNotifications: ls.getBoolean('push-notifications', false)
			}
		);

		// Build tabs
		this.tabs = [
			{
				id: 'identity',
				title: 'My Account',
				render: this.renderIdentity
			},
			// {  // TODO:
			// 	id: "credits",
			// 	title: "Credits",
			// 	url: '/credits',
			// },
			{ spacer: true },
			{
				id: 'privacy',
				title: 'Privacy',
				render: this.renderPrivacy
			},
			{
				id: 'support',
				title: 'Support',
				url: '/support',
				notPortal: true
			},
			// {
			// 	id: "appearance",
			// 	title: "Appearance"
			// },
			// {
			// 	id: "link",
			// 	title: "Link Account",
			// 	render: this.renderLinkAccount,
			// },
			{ spacer: true },
			{
				id: 'developers',
				title: 'Developer Dashboard',
				url: routes.devDashboard.build({}),
			},
			// { spacer: true },
			// {
			// 	id: "changelog",
			// 	title: "Change Log",
			// 	render: this.renderChangelog
			// },
			{ spacer: true },
			{
				id: 'logout',
				title: 'Log out',
				render: this.renderLogout
			}
		];
	}

	connectedCallback() {
		super.connectedCallback();

		// Handle mobile change
		this.handleMobile = this.onMobile.bind(this);
		globalEventGroups.add('mobile', this.handleMobile);

		// Handle settings change
		this.handleSettingChange = this.onSettingChange.bind(this);
		globalEventGroups.add('setting-change', this.handleSettingChange);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Remove event listeners
		globalEventGroups.remove('mobile', this.handleMobile);
		globalEventGroups.remove('setting-change', this.handleSettingChange);
	}

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		// Fetch changelog data
		// global.live.getChangelog({})
		// 	.then(({ entries }: client.live.GetChangelogResponse) => {
		// 		this.changelog = entries;
		// 	})
		// 	.catch((err: Error) => this.loadError = err);
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Set tab if needed; we don't get an updated event if the tab is null
		if (this.tabId == null && !global.isMobile) {
			this.navigateTab(this.tabs[0].id, false);
		}

		// Update mobile navbar title
		if (global.isMobile && changedProperties.has('tabId')) {
			let currentTab = this.tabs.find(p => p.hasOwnProperty('id') && p.id == this.tabId);

			if (currentTab) UIRouter.shared.updateTitle(currentTab.title);
		}
	}

	navigateTab(tabId: string, disableAnimation: boolean = true) {
		// Navigate to the correct tab; this will update this view automatically
		let url = routes.settings.build({ tab: tabId });

		UIRouter.shared.navigate(url, {
			replaceHistory: !global.isMobile,
			disableAnimation: global.isMobile ? false : disableAnimation
		});
	}

	// Called when changing a setting on the settings page
	settingChanged(key: string, value: any) {
		if (key == 'third-party-data') {
			this.settings.thirdPartyData = value;

			ls.setBoolean(key, value);
		} else if (key == 'collect-data') {
			this.settings.collectData = value;

			ls.setBoolean(key, value);
		} else if (key == 'push-notifications') {
			this.settings.pushNotifications = value;

			ls.setBoolean(key, value);

			if (value) global.pushNotifications.enable();
			else global.pushNotifications.disable();
		} else {
			logging.warn('Unknown setting', key, '=', value);
		}
	}

	onMobile() {
		this.requestUpdate();
	}

	// Called by event handler after a setting is successfully changed
	onSettingChange(event: SettingChangeEvent) {
		if (event.value.id == 'third-party-data') {
			this.settings.thirdPartyData = event.value.value;
		} else if (event.value.id == 'collect-data') {
			this.settings.collectData = event.value.value;
		} else if (event.value.id == 'push-notifications') {
			this.settings.pushNotifications = event.value.value;
		}

		this.requestUpdate('settings');
	}

	openEditModal() {
		if (global.currentIdentity.isRegistered) {
			this.editModalActive = true;
		} else {
			showAlert(
				'Account not registered',
				html`Profile editing is only available for registered accounts.`,
				[
					{
						label: 'Register now',
						cb: () => UIRouter.shared.navigate(routes.register.build({}))
					},
					{
						label: 'Dismiss'
					}
				]
			);
		}
	}

	editModalClose() {
		this.editModalActive = false;
	}

	render() {
		if (!this.tabId && !global.isMobile) return null;
		if (this.loadError) return responses.renderError(this.loadError);

		let currentTab = this.tabs.find(p => p.hasOwnProperty('id') && p.id == this.tabId);

		return html`
			<div id="base">
				<!-- Header -->
				<page-header>
					<e-svg src="regular/gear"></e-svg>
					<h1>Settings</h1>
				</page-header>
				<h-tab-layout>
					${(global.isMobile ? !currentTab : true)
						? html` <div slot="tabs">
								${repeat(
									this.tabs,
									p => p.id,
									p =>
										p.spacer
											? html`<div class="tab-spacer"></div>`
											: p.url
											? html`<h-tab
													?active=${p.id == this.tabId}
													.href=${p.url}
													.target=${p.notPortal ? '_blank' : null}
													>${p.title}</h-tab
											  >`
											: html`<h-tab
													?active=${p.id == this.tabId}
													.trigger=${this.navigateTab.bind(this, p.id)}
													>${p.title}</h-tab
											  >`
								)}
						  </div>`
						: null}
					<div slot="body">${currentTab ? currentTab.render.apply(this) : null}</div>
				</h-tab-layout>
			</div>
		`;
	}

	renderIdentity() {
		let unimp = () => alert('UNIMPLEMENTED');

		// Get email from current identity
		let identity = global.currentIdentity.linkedAccounts.find(a => a.email);
		// Check if registered (with email)
		let isRegistered = global.currentIdentity.isRegistered && !!identity;

		return html`
			<div class="padded-cell">
				<h1 class="item-header">Profile appearance</h1>
				<stylized-button
					icon="solid/user-pen"
					color="#404040"
					text="#eeeeee"
					.trigger=${this.openEditModal.bind(this)}
					>Edit profile</stylized-button
				>
			</div>
			<div class="spacer"></div>
			<div class="padded-cell">
				<div class="item-header-holder">
					<h1 class="item-header">Link Email</h1>
					${isRegistered
						? html`<span class="badge"><e-svg src="solid/check"></e-svg> Registered</span>`
						: null}
				</div>
				<p>Link your email to Rivet for full account access.</p>
				<stylized-button
					icon="regular/envelope"
					color="#404040"
					text="#eeeeee"
					.trigger=${() => UIRoot.shared.openRegisterPanel()}
					>${isRegistered ? 'View registration' : 'Link email'}</stylized-button
				>
			</div>
			<div class="spacer"></div>
			<div class="padded-cell">
				<h1 class="item-header">Push notificatons</h1>
				<p>Allow Rivet to send your device push notificatons for messages while you are away.</p>
				<toggle-switch
					?value=${this.settings.pushNotifications}
					@toggle=${(e: ToggleSwitchEvent) => this.settingChanged('push-notifications', e.value)}
				></toggle-switch>
			</div>
			<!-- <div class='spacer'></div>
			<div class='padded-cell'>
				<h1 class='item-header'>Email <span class='muted'>******email@gmail.com</span></h1>
				<stylized-button icon='regular/envelope' color='#404040' text='#eeeeee' .trigger=${unimp}>Change email</stylized-button>
			</div>
			<div class='spacer'></div>
			<div class='padded-cell'>
				<h1 class='item-header'>Password</h1>
				<stylized-button icon='regular/key' color='#404040' text='#eeeeee' .trigger=${unimp}>Change password</stylized-button>
			</div>
			<div class='spacer'></div>
			<div class='padded-cell'>
				<h1 class='item-header'>Two Factor Authentication <span class='twofa-badge'><e-svg src='regular/lock'></e-svg>Enabled</span></h1>
				<p>Two factor authentication provides an extra layer of security to your Rivet account.</p>
				<stylized-button icon='regular/lock' color='#404040' text='#eeeeee' .trigger=${unimp}>Remove two factor authentication</stylized-button>
			</div>
			<div class='spacer'></div>
			<div class='padded-cell'>
				<h1 class='item-header'>Delete account</h1>
				<stylized-button icon='regular/identity-slash' color='#db3939' .trigger=${unimp}>Delete account</stylized-button>
			</div> -->

			<!-- Editing modal -->
			<drop-down-modal
				large-animation
				.active=${this.editModalActive}
				@close=${this.editModalClose.bind(this)}
			>
				<identity-profile-edit
					slot="body"
					@close=${this.editModalClose.bind(this)}
				></identity-profile-edit>
			</drop-down-modal>
		`;
	}

	renderPrivacy() {
		return html`
			<div class="padded-cell">
				<h1 class="item-header">Privacy Policy and Terms of Service</h1>
				<p>
					Review our <a class="decorated link" href="/privacy" target="_blank">Privacy Policy</a> and
					<a class="decorated link" href="/terms" target="_blank">Terms of Service</a> here.
				</p>
			</div>
			<!-- <div class='spacer'></div>
			<div class='padded-cell'>
				<h1 class='item-header'>Enhance your experience with data collection</h1>
				<p>Rivet uses data collection to personalize your experience using our app and help find software bugs for a cleaner experience.</p>
				<toggle-switch ?value=${this.settings.collectData} @toggle=${(e: ToggleSwitchEvent) =>
				this.settingChanged('collect-data', e.value)}></toggle-switch>
			</div>
			<div class='padded-cell'>
				<h1 class='item-header'>Third-party data collection</h1>
				<p>Allow our third-party partners to securely access certain identity data for various services used across client.</p>
				<toggle-switch ?value=${this.settings.collectData} @toggle=${(e: ToggleSwitchEvent) =>
				this.settingChanged('third-party-data', e.value)}></toggle-switch>
			</div> -->
		`;
	}

	renderLinkAccount() {
		return html`
			<div class="padded-cell">
				<h1 class="item-header">Add a new connection</h1>
				<p>Add a connection to your Rivet account for easy access and integration.</p>
				<!-- Link Accounts -->
				<div id="oauth-providers">
					${repeat(
						OAUTH_PROVIDERS,
						p => p.id,
						p =>
							html`<icon-button
								class="provider-icon"
								src=${p.iconPath}
								href=${p.oauthUrl}
								color=${p.color}
								highlight-color="white"
							></icon-button>`
					)}
				</div>
			</div>
			<div class="spacer"></div>
			<div class="padded-cell">
				<h1 class="item-header">Existing connections</h1>
				<p class="muted">No connections added to account.</p>
				<!-- <div id='oauth-connections'>
					${repeat(
					OAUTH_PROVIDERS,
					p => p.id,
					p => html` <div class="oauth-connection" style="background-color: ${p.color};">
						<div class="header">
							<h1><e-svg src=${p.iconPath}></e-svg> ${p.name}</h1>
						</div>
						<h2 class="account-name">NicholasKissel302</h2>
						<e-svg
							class="close-button"
							src="regular/link-slash"
							@mouseenter=${tooltip('Unlink')}
						></e-svg>
					</div>`
				)}
				</div> -->
			</div>
		`;
	}

	renderLogout() {
		let unimp = () => alert('UNIMPLEMENTED');

		return html`
			<div class="padded-cell">
				<h1 class="item-header">Log out of Rivet</h1>
				${global.currentIdentity.isRegistered
					? html`<stylized-button
							icon="regular/arrow-right-from-bracket"
							color="#db3939"
							.trigger=${this.logout.bind(this)}
							>Log out</stylized-button
					  >`
					: html`<p>Logged in as guest.</p>
							<stylized-button href=${routes.register.build({})}
								>Register Now</stylized-button
							> `}
			</div>
		`;
	}

	renderChangelog() {
		return html` <div id="changelog">
			${repeat(
				this.changelog,
				item => item.id,
				(item, i) => html` ${i != 0 ? html`<div class="spacer"></div>` : null}
					<div class="changelog-item">
						<h1 class="title">${item.title}</h1>
						<div class="subtitle">
							<a
								class="author"
								href=${routes.identity.build(identityRouteData(item.author))}
								@contextmenu=${showIdentityContextMenu(item.author)}
							>
								<identity-avatar .identity=${item.author} hide-status></identity-avatar>
								<identity-name .identity=${item.author}></identity-name>
							</a>
							<span class="timestamp"
								>&nbsp;- <date-display .timestamp=${item.ts}></date-display
							></span>
						</div>
						<p class="body">${item.body}</p>
					</div>`
			)}
		</div>`;
	}

	async logout(): Promise<void> {
		await global.authManager.logout();
		window.location.reload();

		return new Promise(resolve => resolve());
	}
}
