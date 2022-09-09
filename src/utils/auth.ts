import config from '../config';
import global from './global';
import logging from './logging';
import { bombPrivateCache, ls } from './cache';
import timing, { wait } from './timing';
import { BroadcastEvent, BroadcastEventKind, logout } from '../data/broadcast';
import { BroadcastSystem } from './broadcast';
import { Deferred } from './utils';

const CLOCK_DRIFT: number = timing.seconds(30);
const AUTH_INIT_DELAY: number = timing.milliseconds(60);
const AUTH_COLLISION_DELAY: number = timing.milliseconds(60);

interface ApiError {
	code: String;
	message: String;
}

export class Token {
	public readonly identityId: string;

	public constructor(private tokenResponse: { token: string; exp: number; identity_id: string }) {
		this.identityId = tokenResponse.identity_id;
	}

	public get expiration(): number {
		return this.tokenResponse.exp;
	}

	public get isExpired(): boolean {
		return Date.now() > this.expiration - CLOCK_DRIFT;
	}

	public get token(): string {
		return this.tokenResponse.token;
	}
}

export class AuthError extends Error {}

// TODO: Delay changing global status when refreshing token by 1-3 seconds so there is no state change
// that causes the <ui-router> to be unloaded and then reloaded again
export class AuthManager {
	public token?: Token;
	public authenticationFailed: boolean = false;

	private fetchTokenPromise?: Promise<Token>;

	private refreshTimeout: any;
	private lastIdentityId: string = null;

	/// === COLLISION AVOIDANCE ===
	private authHash: [number, number];
	private authCollisionPromise?: Deferred<void> = new Deferred();
	private extraCollisionDelay: number = 0;

	// === EVENT HANDLERS ===
	handleStorage: (e: StorageEvent) => void;

	// Communication between all open tabs of Rivet
	private broadcast: BroadcastSystem = new BroadcastSystem();

	public constructor() {
		// Preemptively fetch token
		this.initialFetchToken();

		// Logout from all tabs when a logout message is broadcast
		this.broadcast.addEventListener('message', e => {
			let event = e.data as BroadcastEvent;

			if (event.kind == BroadcastEventKind.Logout) {
				logging.event('Broadcast logout');

				(async () => {
					await this.logout(true);
					window.location.reload();
				})();
			}
		});
	}

	private async initialFetchToken() {
		this.authHash = [Date.now(), performance.now()];

		this.handleStorage = this.storageHandler.bind(this);
		window.addEventListener('storage', this.handleStorage);

		// Wait for any other concurrent tabs to get to the same stage
		await wait(AUTH_INIT_DELAY);

		// "Broadcast" auth initiation to any other tabs
		ls.setString('auth', this.authHash.join(','));

		// Wait again for other concurrent tabs to broadcast their auth hash
		wait(AUTH_INIT_DELAY).then(() => {
			// Remove handler if it has not already been removed
			window.removeEventListener('storage', this.handleStorage);

			if (this.extraCollisionDelay) logging.event('Collision delay', `${this.extraCollisionDelay}ms`);

			// Delay if needed or execute instantly
			let delay = this.extraCollisionDelay ? wait(this.extraCollisionDelay) : Promise.resolve();
			delay.then(() => this.authCollisionPromise.resolve());
		});

		this.fetchToken();
	}

	private storageHandler(e: StorageEvent) {
		if (e.key == ls.buildId('auth')) {
			let [new1, new2] = e.newValue.split(',').map(parseFloat);

			// If the localStorage event received was created earlier than this tabs' one, delay auth a
			// bit longer
			if (!isNaN(new1) && !isNaN(new2)) {
				let [old1, old2] = this.authHash;

				// First compare Date.now, then performance.now
				if (new1 == old1 ? new2 < old2 : new1 < old1) {
					// Adds delay instead of setting a boolean flag so that this works with any number of
					// concurrent tabs
					this.extraCollisionDelay += AUTH_COLLISION_DELAY;
				}
			}

			window.removeEventListener('storage', this.handleStorage);
		}
	}

	async fetchToken(): Promise<Token> {
		// Wait for collision promise to complete
		await this.authCollisionPromise.promise;

		if (this.token !== undefined && !this.token.isExpired) {
			// Token is valid
			return this.token;
		} else if (this.fetchTokenPromise !== undefined) {
			// Wait for the existing request for the token
			let result = await this.fetchTokenPromise;
			return result;
		} else {
			// Fetch new token
			let promise = this._refreshToken();
			this.fetchTokenPromise = promise;
			let result = await promise;
			this.fetchTokenPromise = undefined;

			return result;
		}
	}

	async logout(fromBroadcast: boolean = false) {
		logging.event('Log out');

		// Logout all sessions
		if (!fromBroadcast) this.broadcast.postMessage(logout());

		// Fetch new guest token
		let promise = this._refreshToken(true);
		this.fetchTokenPromise = promise;
		let result = await promise;
		this.fetchTokenPromise = undefined;

		return result;
	}

	private async _refreshToken(logout: boolean = false): Promise<Token> {
		let attempts = 0;

		// Delete private cache on logout
		if (logout) await bombPrivateCache();

		while (true) {
			try {
				this.token = undefined;
				this.authenticationFailed = false;
				global.updateStatus();

				return await this._refreshTokenInner(logout);
			} catch (err) {
				if (err.hasOwnProperty('statusText')) logging.error('Auth request failed', await err.json());
				else logging.error('Auth request failed', err);

				this.authenticationFailed = true;
				global.updateStatus();

				// Retry request
				attempts += 1;
				await wait(attempts <= 4 ? timing.seconds(2.5) : timing.seconds(15));
			}
		}
	}

	private async _refreshTokenInner(logout: boolean): Promise<Token> {
		// Fetch the new token. This will include the refresh token in the header.
		let authUrl = config.API_AUTH_URL + '/tokens/identity';
		logging.net('POST ' + authUrl);
		let res = await fetch(authUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				logout: logout
			}),
			credentials: 'include',
			mode: 'cors'
		});

		if (res.status === 200) {
			let body = await res.json();

			// Build new token
			let token = new Token(body);
			logging.event('Authenticated', token.identityId);
			this.token = token;

			// Identity changed, bomb private cache
			if (ls.getString('identity-id', '') != token.identityId) {
				await bombPrivateCache();
				console.warn('Bombed');
			}
			ls.setString('identity-id', token.identityId);

			// Identity changed after initial auth request
			if (this.lastIdentityId && this.lastIdentityId != token.identityId) {
				global.setupLive(this.token, true);
				console.warn('Auth out of sync');
			}
			this.lastIdentityId = token.identityId;

			this.authenticationFailed = false;
			global.updateStatus();

			// Automatically refresh the token after timeout
			clearTimeout(this.refreshTimeout);
			this.refreshTimeout = setTimeout(() => {
				logging.event('Automatically refreshing token');

				this._refreshToken();
			}, token.expiration - Date.now() - CLOCK_DRIFT);

			return token;
		} else {
			let body = (await res.json()) as ApiError;
			logging.error('Auth returned error', body.code, body.message);

			throw new AuthError();
		}
	}
}
