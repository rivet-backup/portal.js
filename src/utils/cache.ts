import logging from '../utils/logging';
import timing from '../utils/timing';
import * as api from '../utils/api';
import config from '../config';
import { Deferred } from '../utils/utils';
import { rivet } from '../../gen/proto/proto';

export interface LocalStorageChange {
	id: string;
	value: any;
}

const BLANK_CACHE: [null, null] = [null, null];

const CACHE_LIFETIME = timing.days(10);
const IDB_VERSION = 1; // Increment whenever the structure of the database is updated (See `initDB`)

// Set up IDB
let dbRequest: IDBOpenDBRequest;
let idbPromise = new Deferred<IDBDatabase>();
idbPromise.promise.catch(() => {});
let databaseDisabled = false;

let globalStorageHandler: (change: LocalStorageChange) => void;

window.addEventListener('load', () => {
	logging.event('IDB Starting...');
	dbRequest = indexedDB.open('rivet', IDB_VERSION);

	dbRequest.addEventListener('error', e => {
		logging.error(`IDB Error`, e);

		idbPromise.reject(e);
		databaseDisabled = true;
	});

	dbRequest.addEventListener('success', e => {
		idbPromise.resolve((e.target as IDBOpenDBRequest).result);
		logging.event('IDB Initialized');
	});

	dbRequest.addEventListener('upgradeneeded', e => {
		initDB((e.target as IDBOpenDBRequest).result);
		logging.event('IDB Created');
	});
});

export let ls = {
	// Used for local storage changed events
	setGlobalListener(handler: (change: LocalStorageChange) => void) {
		globalStorageHandler = handler;
	},

	buildId(id: string): string {
		return `rivet:${id}`;
	},

	// Data types
	getString(id: string, defaultValue: string): string {
		let v = localStorage.getItem(this.buildId(id));
		if (v == null) return defaultValue;
		else return v;
	},
	setString(id: string, value: string) {
		localStorage.setItem(this.buildId(id), value);

		if (globalStorageHandler) globalStorageHandler({ id, value });
	},

	getBoolean(id: string, defaultValue: boolean): boolean {
		let v = localStorage.getItem(this.buildId(id));
		if (v == null) return defaultValue;
		else return v === 'true';
	},
	setBoolean(id: string, value: boolean) {
		localStorage.setItem(this.buildId(id), value ? 'true' : 'false');

		if (globalStorageHandler) globalStorageHandler({ id, value });
	},

	delete(id: string) {
		localStorage.removeItem(this.buildId(id));
	},

	// Deletes all local storage keys that match the given regex
	deleteAllSimilar(test: RegExp) {
		Object.keys(localStorage)
			.filter(k => {
				{
					if (k.startsWith('rivet:')) {
						return test.test(k.replace('rivet:', ''));
					}
				}
				return false;
			})
			.forEach(localStorage.removeItem.bind(localStorage));
	},

	getInt(id: string, defaultValue: number): number {
		let v = localStorage.getItem(this.buildId(id));
		if (v == null) return defaultValue;
		else return parseInt(v);
	},
	setInt(id: string, value: number) {
		localStorage.setItem(this.buildId(id), Math.floor(value).toString());

		if (globalStorageHandler) globalStorageHandler({ id, value });
	}
};

export async function readCache(keyPath: string[], protoType: any) {
	if (!config.ALLOW_PAGE_CACHE) return BLANK_CACHE;

	let key = sanitizeKeyPath(keyPath);

	// Gracefully get DB
	let db;
	try {
		db = await idbPromise.promise;
	} catch {
		return BLANK_CACHE;
	}

	// Gracefully read DB
	let data;
	try {
		data = await readIDB(db, key);
	} catch (e) {
		if (!databaseDisabled) logging.error('Read error', e);

		data = null;
	}

	// Cache does not exist
	if (!data) return BLANK_CACHE;

	// Check for errors in cache
	try {
		// Decode cache wrapper
		let wrapper = rivet.cache.CacheWrapper.decode(new Uint8Array(await data.arrayBuffer()));

		// Cache expired or outdated
		if (Date.now() - (wrapper.ts as number) >= CACHE_LIFETIME || wrapper.version != config.VERSION) {
			logging.debug('Cache expired', key);
			deleteIDB(db, key);

			return BLANK_CACHE;
		}

		// Decode inner data
		return [protoType.decode(wrapper.data), wrapper.watchIndex] as [
			any,
			rivet.client.watch_index.WatchIndex
		];
	} catch (e) {
		logging.warn(`Error loading cache \`${key}\``, e);
		deleteIDB(db, key);
	}

	return BLANK_CACHE;
}

export async function writeCache<T>(
	keyPath: string[],
	protoType: T,
	payload: object,
	watchIndex?: api.portal.WatchResponse
) {
	// Add timestamp and version properties
	let cacheWrapper = rivet.cache.CacheWrapper.create({
		ts: Date.now(),
		version: config.VERSION
	});

	// Add request watch index
	if (watchIndex !== undefined) cacheWrapper.watchIndex = watchIndex;

	if (!protoType) {
		logging.error('Bad cache type');
		return;
	}

	// Verify payload
	let errMsg = (protoType as any).verify(payload);
	if (errMsg) {
		logging.error('Bad cache write', errMsg);
		return;
	}

	// Create message and encode
	let message = (protoType as any).create(payload);
	let buffer = (protoType as any).encode(message).finish();

	// Happens when the cache interface doesn't match the proto schema or when encoding an empty array
	if (!buffer.length) logging.debug('Cache wrote empty buffer', keyPath);

	// Encode wrapper
	cacheWrapper.data = buffer;
	let wrappedBuffer = rivet.cache.CacheWrapper.encode(cacheWrapper).finish();

	// Gracefully get DB
	let db;
	try {
		db = await idbPromise.promise;
	} catch {
		return;
	}

	// Save to load storage
	let key = sanitizeKeyPath(keyPath);

	// Gracefully write db
	try {
		await writeIDB(db, key, new Blob([wrappedBuffer]));
	} catch (e) {
		if (!databaseDisabled) logging.error('Write error', e);
	}
}

// Deletes all cache KV pairs where the key matches the given regex
export async function deleteAllCache(query: RegExp): Promise<void> {
	if (!config.ALLOW_PAGE_CACHE) return null;

	// Gracefully get DB
	let db;
	try {
		db = await idbPromise.promise;
	} catch {
		return;
	}

	// Gracefully delete all from DB
	try {
		await deleteAllIDB(db, query);
	} catch (e) {
		if (!databaseDisabled) logging.error('Delete all error', e);
	}
}

// Deletes all cache that is considered private. Must be `await`ed to ensure completion.
export async function bombPrivateCache(): Promise<void> {
	// TODO: delete all settings
	ls.delete('push-notifications');
	ls.deleteAllSimilar(/^identity-thread-id/);

	// TODO: Delete last logged-in identity from cache as it contains the same information as the root cache
	// (which includes email)

	await Promise.all([deleteAllCache(/\//), deleteAllCache(/^parties\//), deleteAllCache(/^threads\//)]);
}

// === DB MANIPULATION ===
function initDB(db: IDBDatabase) {
	let _store = db.createObjectStore('cache', {
		autoIncrement: true
	});
}

async function writeIDB(db: IDBDatabase, path: string, data: any) {
	let result = new Deferred();
	let txn = db.transaction('cache', 'readwrite');

	let store = txn.objectStore('cache');
	let query = store.put(data, path);

	query.addEventListener('success', event => {
		result.resolve();
	});

	query.addEventListener('error', event => {
		let err = (event.target as IDBRequest).error;
		logging.error('Write transaction error', err);

		result.reject(err);
	});

	return result.promise;
}

async function readIDB(db: IDBDatabase, path: string) {
	let result = new Deferred<Blob>();
	let txn = db.transaction('cache', 'readonly');
	let store = txn.objectStore('cache');

	let query = store.get(path);

	query.addEventListener('success', event => {
		result.resolve((event.target as IDBRequest).result);
	});

	query.addEventListener('error', event => {
		let err = (event.target as IDBRequest).error;
		logging.error('Read transaction error', err);

		result.reject(err);
	});

	return result.promise;
}

async function deleteIDB(db: IDBDatabase, path: string) {
	let result = new Deferred();
	let txn = db.transaction('cache', 'readwrite');
	let store = txn.objectStore('cache');

	let query = store.delete(path);

	query.addEventListener('success', event => {
		result.resolve();
	});

	query.addEventListener('error', event => {
		let err = (event.target as IDBRequest).error;
		logging.error('Delete transaction error', err);

		result.reject(err);
	});

	return result.promise;
}

// Deletes all KV pairs where the key matches the given regex
async function deleteAllIDB(db: IDBDatabase, query: RegExp) {
	let result = new Deferred();
	let txn = db.transaction('cache', 'readwrite');
	let store = txn.objectStore('cache');

	let getCursorRequest = store.openCursor();
	getCursorRequest.addEventListener('success', event => {
		let cursor = (event.target as IDBRequest).result as IDBCursorWithValue;

		if (cursor) {
			if (query.test(cursor.key as string)) {
				let deleteRes = cursor.delete();

				deleteRes.addEventListener('error', event => {
					let err = (event.target as IDBRequest).error;
					logging.error('Bulk delete transaction error', err);
				});
			}

			cursor.continue();
		} else {
			result.resolve();
		}
	});

	getCursorRequest.addEventListener('error', event => {
		let err = (event.target as IDBRequest).error;
		logging.error('Delete transaction error', err);

		result.reject(err);
	});

	return result.promise;
}

function sanitizeKeyPath(keyPath: string[]): string {
	return keyPath.map(segment => segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('/');
}
