import logging from './logging';
import config from '../config';
import { AuthManager, Token } from './auth';
import settings, { SettingChange } from './settings';
import timing from './timing';
import { windowEventGroups, globalEventGroups } from './global-events';
import * as cloud from '@rivet-gg/cloud';
import { RecentThreadsCache, RootCache } from '../data/cache';
import PushNotifications from './push-notifications';
import { BroadcastEvent, BroadcastEventKind } from '../data/broadcast';
import { ls } from './cache';
import { BroadcastSystem } from './broadcast';
import * as api from './api';
import { CHAT_THREAD_HISTORY } from '../elements/sidebar/main-sidebar';

const MOBILE_WIDTH_THRESHOLD = 850;

export enum GlobalStatus {
	// Loading
	Authenticating,
	Loading,

	// Interactive
	Consenting,
	LinkingGame,
	Connected,

	// Failures
	AuthFailed
}

export class GlobalState {
	// Consent.
	consentResolve?: () => void;

	// Authentication client.
	authManager: AuthManager;

	isInitiated: boolean = false;

	/// Apis
	// TODO: Implement authentication middleware that requests a token
	live: {
		portal: api.portal.PortalService;
		identity: api.identity.IdentityService;
		group: api.group.GroupService;
		chat: api.chat.ChatService;
		kv: api.kv.KvService;
		party: api.party.PartyService;
	};
	auth: api.auth.AuthService;
	cloud: cloud.CloudService;

	// Push notifications client.
	pushNotifications: PushNotifications;

	/// Data for the current signed in identity.
	currentIdentity: api.identity.IdentityProfile;
	/// Data for the current active party.
	currentParty?: api.party.PartySummary;

	/// Recent threads in the sidebar.
	recentThreads: api.identity.ChatThread[] = [];

	/// Thread ID of the current thread.
	currentThread: string;
	/// Whether or not the current thread is active (the user is not AFK).
	currentThreadActive: boolean = false;

	/// Data for the game that is currently being played.
	playingGame?: api.identity.GameHandle;

	status: GlobalStatus = GlobalStatus.Loading;

	broadcast: BroadcastSystem = new BroadcastSystem(true);
	setupLiveAttempts: number = 0;
	liveBlockingBypass: number = null;

	identityStream: api.RepeatingRequest<api.identity.GetIdentityProfileCommandOutput>;
	eventStream: api.RepeatingRequest<api.identity.GetEventsCommandOutput>;

	// Mobile information
	_isMobile: boolean = false;
	get isMobile() {
		return this._isMobile;
	}

	set isMobile(value) {
		this._isMobile = value;

		globalEventGroups.dispatch('mobile', this._isMobile);
	}

	async init() {
		// Request consent before doing anything else
		await this.requestConsent();

		// Load cache
		if (await this.loadCache()) {
			logging.event('Cache quick start');
			this.isInitiated = true;
		}

		this.startServiceWorker();
		this.broadcast.addEventListener('message', this.handleBroadcastMessages.bind(this));

		// Create auth client. This will automatically fetch a token.
		this.authManager = new AuthManager();

		// Build cloud instance
		let getToken = async () => (await global.authManager.fetchToken()).token;

		// Create live instance.
		logging.net('Connecting to live...', config.API_PORTAL_URL);
		this.live = {
			portal: new api.portal.PortalService({
				endpoint: config.API_PORTAL_URL,
				requestHandler: api.requestHandlerMiddleware(getToken)
			}),
			identity: new api.identity.IdentityService({
				endpoint: config.API_IDENTITY_URL,
				requestHandler: api.requestHandlerMiddleware(getToken)
			}),
			group: new api.group.GroupService({
				endpoint: config.API_GROUP_URL,
				requestHandler: api.requestHandlerMiddleware(getToken)
			}),
			chat: new api.chat.ChatService({
				endpoint: config.API_CHAT_URL,
				requestHandler: api.requestHandlerMiddleware(getToken)
			}),
			kv: new api.kv.KvService({
				endpoint: config.API_KV_URL,
				requestHandler: api.requestHandlerMiddleware(getToken)
			}),
			party: new api.party.PartyService({
				endpoint: config.API_PARTY_URL,
				requestHandler: api.requestHandlerMiddleware(getToken)
			}),
		};

		// Start live client
		this.authManager
			.fetchToken()
			.then(token => this.setupLive(token))
			.catch(err => {
				logging.error('Error initiating live', err);
			});

		this.auth = new api.auth.AuthService({
			endpoint: config.API_AUTH_URL,
			// Force the credentials to be included, since we need to be able to modify cookies here
			requestHandler: api.requestHandlerMiddleware(getToken, { credentials: 'include' })
		});

		this.cloud = new cloud.CloudService({
			endpoint: config.API_CLOUD_URL,
			tls: true,
			requestHandler: api.requestHandlerMiddleware(getToken)
		});

		ls.setGlobalListener(this.onSettingChange.bind(this));

		// Establish push notifications
		this.pushNotifications = new PushNotifications();

		// Set initial status
		this.updateStatus();

		// Establish resize event handler
		windowEventGroups.add('resize', this.onResize.bind(this), timing.milliseconds(100));
		this.onResize();
	}

	private async requestConsent(): Promise<void> {
		// Check if already consented
		if (settings.didConsent) {
			return;
		}

		this.updateStatus();

		// Wait for consent to finish
		await new Promise(resolve => {
			this.consentResolve = () => resolve(undefined);
		});
	}

	async loadCache() {
		let [cache, rootWatchIndex] = await RootCache.get();
		if (cache) {
			this.currentIdentity = cache.identity as api.identity.IdentityProfile;
		}

		return rootWatchIndex;
	}

	public grantConsent() {
		// Update state
		settings.didConsent = true;
		this.updateStatus();

		// Complete promise
		if (this.consentResolve !== undefined) this.consentResolve();
	}

	async setupLive(token: Token, noCache: boolean = false) {
		let hasResolved = false;

		// Reload cache in case of cache bomb from auth
		let watchIndex = noCache ? null : await this.loadCache();

		// Due to the nature of our blocking requests, the code that sets `this.isInitiated` in
		// the `this.identityStream.onMessage()` handler to true after a successful request won't
		// be called immediately after reconnection because its blocked.
		window.clearTimeout(this.liveBlockingBypass);
		this.liveBlockingBypass = window.setTimeout(
			() => {
				if (
					!this.isInitiated &&
					this.authManager !== undefined &&
					this.authManager.token === undefined
				) {
					logging.event('Reconnection successful');
					this.isInitiated = true;
					this.updateStatus();
					this.setupLiveAttempts = 0;
				}
			},
			this.setupLiveAttempts <= 3 ? timing.seconds(1.5) : timing.seconds(5.5)
		);

		return new Promise<void>((resolve, reject) => {
			// Load the current identity data
			if (this.identityStream) this.identityStream.cancel();
			this.identityStream = new api.RepeatingRequest<api.identity.GetIdentityProfileCommandOutput>(
				async (abortSignal, watchIndex) => {
					return await this.live.identity.getIdentityProfile(
						{ identityId: token.identityId, watchIndex },
						{
							abortSignal
						}
					);
				},
				{ cancelOnError: false, watchIndex: watchIndex }
			);

			this.identityStream.onMessage(res => {
				// Save new identity
				this.currentIdentity = res.identity;
				this.updateCache(res.watch);

				// Update global state
				this.isInitiated = true;
				this.updateStatus();
				this.setupLiveAttempts = 0;

				logging.event('New current identity', this.currentIdentity);

				// Call events
				globalEventGroups.dispatch('identity-change', res.identity);

				// Resolve promise if needed
				if (!hasResolved) {
					resolve();
					hasResolved = true;
				}
			});

			this.identityStream.onError(error => {
				// Reject initiation and cancel repeating request
				this.identityStream.cancel();
				if (!hasResolved) reject(error);

				// Update global state to "Disconnected"
				this.setupLiveAttempts++;
				if (this.setupLiveAttempts > 3) {
					this.isInitiated = false;
					this.updateStatus();
				}

				// Attempt to reconnect in a few seconds
				setTimeout(
					() => {
						this.authManager
							.fetchToken()
							.then(token => this.setupLive(token))
							.catch(err => {
								logging.error('Error initiating live', err);
							});
					},
					this.setupLiveAttempts <= 3 ? timing.seconds(1) : timing.seconds(5)
				);
			});

			this.startEventsStream();
			// Initially fetch party
			this.fetchParty();
		});
	}

	startEventsStream() {
		RecentThreadsCache.get().then(([threadsCache, threadsCacheWatchIndex]) => {
			if (threadsCache) {
				// Dispatch event for main-sidebar to use
				globalEventGroups.dispatch('thread-update', threadsCache.threads);

				this.recentThreads = Array.from(threadsCache.threads);
			}

			if (this.eventStream) this.eventStream.cancel();
			this.eventStream = new api.RepeatingRequest(
				async (abortSignal, watchIndex) => {
					return await this.live.identity.getEvents({ watchIndex }, { abortSignal });
				},
				{ watchIndex: threadsCacheWatchIndex }
			);

			this.eventStream.onMessage(res => {
				let dispatchRecentThreads = false;
				for (let update of res.events) {
					if (update.kind.chatMessage) {
						dispatchRecentThreads = true;

						// If `refreshed` is false then the anchor did not expire and we can show the given
						// notifications
						if (!res.refreshed && update.notification)
							globalEventGroups.dispatch('notification', update);

						let thread = update.kind.chatMessage.thread;

						let ts = thread.tailMessage ? thread.tailMessage.sendTs : thread.createTs;
						// Remove old chat entry
						let threadIndex = this.recentThreads.findIndex(c => c.id == thread.id);
						if (threadIndex != -1) {
							this.recentThreads.splice(threadIndex, 1);
						}
						// Insert at the appropriate date
						let didInsert = false;
						for (let i = this.recentThreads.length - 1; i >= 0; i--) {
							let ts2 = this.recentThreads[i].tailMessage
								? this.recentThreads[i].tailMessage.sendTs
								: this.recentThreads[i].createTs;
							if (ts2 < ts) {
								this.recentThreads.splice(i + 1, 0, thread);
								didInsert = true;
								break;
							}
						}
						if (!didInsert) this.recentThreads.unshift(thread);
						if (this.recentThreads.length > CHAT_THREAD_HISTORY)
							this.recentThreads.splice(0, this.recentThreads.length - CHAT_THREAD_HISTORY);
					}
					// Update unread count
					else if (update.kind.chatRead) {
						dispatchRecentThreads = true;

						let thread = this.recentThreads.find(t => t.id == update.kind.chatRead.threadId);
						thread.unreadCount = 0;
						thread.lastReadTs = update.kind.chatRead.readTs;
					}
					// Update party
					else if (update.kind.partyUpdate) {
						this.currentParty = update.kind.partyUpdate.party;
						globalEventGroups.dispatch('party-update', this.currentParty);

						// Delete all party threads when leaving a party
						if (!update.kind.partyUpdate.party) {
							dispatchRecentThreads = true;

							this.recentThreads = this.recentThreads.filter(t => !t.topic.party);
						}
					} else {
						logging.warn('Unknown update kind', update);
					}
				}

				if (this.currentParty) {
					// Delete any party that isn't the current party (happens when switching)
					let len = this.recentThreads.length;
					this.recentThreads = this.recentThreads.filter(t =>
						t.topic.party ? t.topic.party.party.id == this.currentParty.id : true
					);

					dispatchRecentThreads = dispatchRecentThreads || len != this.recentThreads.length;
				}

				// Dispatch event for main-sidebar to use
				if (dispatchRecentThreads) globalEventGroups.dispatch('thread-update', this.recentThreads);

				RecentThreadsCache.set(
					{
						threads: this.recentThreads
					},
					res.watch
				);
			});

			this.eventStream.onError(err => {
				logging.error('Request error', err);
			});
		});
	}

	async fetchParty() {
		try {
			let res = await this.live.party.getPartySelfSummary({});
			if (!this.currentParty) {
				this.currentParty = res.party;
				globalEventGroups.dispatch('party-update', this.currentParty);
			}
		} catch (err) {
			logging.error('Request error', err);
		}
	}

	private async startServiceWorker() {
		return navigator.serviceWorker.register('/service-worker.js').catch(err => {
			logging.error('Failed to start service worker', err);
		});
	}

	private handleBroadcastMessages(e: MessageEvent<BroadcastEvent>) {
		let event = e.data;

		if (event.kind == BroadcastEventKind.Refresh) {
			window.location.reload();
		}
	}

	updateCache(anchor?: api.portal.WatchResponse) {
		RootCache.set(
			{
				identity: this.currentIdentity
			},
			anchor
		);
	}

	updateStatus() {
		// Derive the status
		let status: GlobalStatus;
		if (!settings.didConsent) {
			if (window.location.pathname.startsWith('/link/')) {
				status = GlobalStatus.LinkingGame;
			} else {
				status = GlobalStatus.Consenting;
			}
		} else if (this.authManager !== undefined && this.authManager.authenticationFailed) {
			status = GlobalStatus.AuthFailed;
			this.isInitiated = false;
		} else {
			if (this.authManager !== undefined && this.authManager.token === undefined) {
				status = GlobalStatus.Authenticating;
			} else {
				if (this.isInitiated) status = GlobalStatus.Connected;
				else status = GlobalStatus.Loading;
			}
		}

		// Dispatch event
		if (status !== this.status) {
			logging.event('New global status', GlobalStatus[status]);

			this.status = status;
			globalEventGroups.dispatch('status-change', status);
		}
	}

	setPlayingGame(game?: api.portal.GameProfile) {
		// Save the data
		this.playingGame = game;

		// TODO: Send to live server
	}

	onSettingChange(change: SettingChange) {
		globalEventGroups.dispatch('setting-change', change);
	}

	onResize() {
		let oldMobile = this.isMobile;

		this.isMobile = window.innerWidth <= MOBILE_WIDTH_THRESHOLD;

		// Dispatch mobile change event
		if (this.isMobile != oldMobile) globalEventGroups.dispatch('mobile', this.isMobile);
	}

	// Dispatch a read event for the purpose of updating the main sidebar
	readThread(id: string) {
		globalEventGroups.dispatch('thread-read', id);
	}
}

export const global = new GlobalState();

if (!config.IS_PROD) (window as any).rivet = global;

export default global;
