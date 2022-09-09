import { rivet } from '../../gen/proto/proto';
import * as api from '../utils/api';
import * as cloud from '@rivet-gg/cloud';
import global from '../utils/global';
import { readCache, writeCache } from '../utils/cache';
import { HttpHandlerOptions } from '@aws-sdk/types';

type WatchIndex = rivet.client.watch_index.WatchIndex;

export namespace RootCache {
	interface Payload {
		identity: api.identity.IdentityProfile;
	}

	export async function get() {
		return (await readCache(['/'], rivet.cache.RootCache)) as [Payload, WatchIndex];
	}

	export function set(payload: Payload, watchIndex?: api.identity.WatchResponse) {
		writeCache(['/'], rivet.cache.RootCache, payload, watchIndex);
	}
}

export namespace ThreadHistoryCache {
	interface Payload {
		chatMessages: api.chat.ChatMessage[];
	}

	export async function get(threadId: string) {
		return (await readCache(['threads', threadId, 'history'], rivet.cache.ThreadHistoryCache)) as [
			Payload,
			WatchIndex
		];
	}

	export function set(threadId: string, payload: Payload) {
		writeCache(['threads', threadId, 'history'], rivet.cache.ThreadHistoryCache, payload);
	}
}

export namespace ThreadLiveCache {
	interface Payload {
		lastReadTs: number;
	}

	export async function get(threadId: string) {
		return (await readCache(['threads', threadId], rivet.cache.ThreadLiveCache)) as [Payload, WatchIndex];
	}

	export function set(threadId: string, payload: Payload, watchIndex: api.chat.WatchResponse) {
		writeCache(['threads', threadId], rivet.cache.ThreadLiveCache, payload, watchIndex);
	}
}

export namespace RecentThreadsCache {
	interface Payload {
		threads: api.identity.ChatThread[];
	}

	export async function get() {
		return (await readCache(['threads', 'recent'], rivet.cache.RecentThreadsCache)) as [
			Payload,
			WatchIndex
		];
	}

	export function set(payload: Payload, watchIndex: api.chat.WatchResponse) {
		writeCache(['threads', 'recent'], rivet.cache.RecentThreadsCache, payload, watchIndex);
	}
}

export namespace IdentityProfileCache {
	interface Payload {
		profile: api.identity.IdentityProfile;
	}

	export async function get(identityId: string) {
		return (await readCache(['identities', identityId], rivet.cache.IdentityProfileCache)) as [
			Payload,
			WatchIndex
		];
	}

	export async function set(identityId: string, payload: Payload, watchIndex: api.identity.WatchResponse) {
		await writeCache(['identities', identityId], rivet.cache.IdentityProfileCache, payload, watchIndex);
	}

	// Watches an identity endpoint while automatically taking care of reading/writing cache
	export async function watch(
		identityId: string,
		cb: (profile: api.identity.IdentityProfile) => void,
		reqOpts?: api.RepeatingRequestOptions
	): Promise<api.RepeatingRequest<api.identity.GetIdentityProfileCommandOutput>> {
		return await abstractWatch<
			api.identity.GetIdentityProfileCommandInput,
			api.identity.GetIdentityProfileCommandOutput,
			typeof IdentityProfileCache.get
		>(
			global.live.identity.getIdentityProfile.bind(global.live.identity),
			{ identityId },
			IdentityProfileCache.get.bind(IdentityProfileCache, identityId),
			res => {
				cb(res.identity);
				IdentityProfileCache.set(identityId, { profile: res.identity }, res.watch);
			},
			([payload, _]) => cb(payload.profile),
			reqOpts
		);
	}
}

export namespace GroupProfileCache {
	interface Payload {
		profile: api.group.GroupProfile;
	}

	export async function get(groupId: string) {
		return (await readCache(['groups', groupId], rivet.cache.GroupProfileCache)) as [Payload, WatchIndex];
	}

	export async function set(groupId: string, payload: Payload, watchIndex: api.group.WatchResponse) {
		await writeCache(['groups', groupId], rivet.cache.GroupProfileCache, payload, watchIndex);
	}

	export async function watch(
		groupId: string,
		cb: (profile: api.group.GroupProfile) => void,
		reqOpts?: api.RepeatingRequestOptions
	): Promise<api.RepeatingRequest<api.group.GetGroupProfileCommandOutput>> {
		return await abstractWatch<
			api.group.GetGroupProfileCommandInput,
			api.group.GetGroupProfileCommandOutput,
			typeof GroupProfileCache.get
		>(
			global.live.group.getGroupProfile.bind(global.live.group),
			{ groupId },
			GroupProfileCache.get.bind(GroupProfileCache, groupId),
			res => {
				cb(res.group);
				GroupProfileCache.set(groupId, { profile: res.group }, res.watch);
			},
			([payload, _]) => cb(payload.profile),
			reqOpts
		);
	}
}

export namespace PartySummaryCache {
	interface Payload {
		party: api.party.PartySummary;
	}

	export async function get(partyId: string) {
		return (await readCache(['parties', partyId], rivet.cache.PartySummaryCache)) as [
			Payload,
			WatchIndex
		];
	}

	export async function set(partyId: string, payload: Payload, watchIndex: api.party.WatchResponse) {
		await writeCache(['parties', partyId], rivet.cache.PartySummaryCache, payload, watchIndex);
	}

	// Watches an party endpoint while automatically taking care of reading/writing cache
	export async function watch(
		partyId: string,
		cb: (profile: api.party.PartySummary) => void,
		reqOpts?: api.RepeatingRequestOptions
	): Promise<api.RepeatingRequest<api.party.GetPartySummaryCommandOutput>> {
		return await abstractWatch<
			api.party.GetPartySummaryCommandInput,
			api.party.GetPartySummaryCommandOutput,
			typeof PartySummaryCache.get
		>(
			global.live.party.getPartySummary.bind(global.live.party),
			{ partyId },
			PartySummaryCache.get.bind(PartySummaryCache, partyId),
			res => {
				cb(res.party);
				PartySummaryCache.set(partyId, { party: res.party }, res.watch);
			},
			([payload, _]) => cb(payload.party),
			reqOpts
		);
	}
}

export namespace CloudGameCache {
	interface Payload {
		game: cloud.GameFull;
	}

	export async function get(gameId: string) {
		return (await readCache(['cloud-games', gameId], rivet.cache.CloudGameCache)) as [
			Payload,
			WatchIndex
		];
	}

	export async function set(gameId: string, payload: Payload, watchIndex: cloud.WatchResponse) {
		await writeCache(['cloud-games', gameId], rivet.cache.CloudGameCache, payload, watchIndex);
	}

	export async function watch(
		gameId: string,
		cb: (profile: cloud.GameFull) => void,
		reqOpts?: api.RepeatingRequestOptions
	): Promise<api.RepeatingRequest<cloud.GetGameByIdCommandOutput>> {
		return await abstractWatch<
			cloud.GetGameByIdCommandInput,
			cloud.GetGameByIdCommandOutput,
			typeof CloudGameCache.get
		>(
			global.cloud.getGameById.bind(global.cloud),
			{ gameId },
			CloudGameCache.get.bind(CloudGameCache, gameId),
			res => {
				cb(res.game);
				CloudGameCache.set(gameId, { game: res.game }, res.watch);
			},
			([payload, _]) => cb(payload.game),
			reqOpts
		);
	}
}

export namespace CloudDashboardCache {
	export interface Payload {
		games: cloud.GameSummary[];
		groups: cloud.GroupSummary[];
	}

	export async function get() {
		return (await readCache(['cloud-games'], rivet.cache.CloudDashboardCache)) as [Payload, WatchIndex];
	}

	export async function set(payload: Payload, watchIndex: cloud.WatchResponse) {
		await writeCache(['cloud-games'], rivet.cache.CloudDashboardCache, payload, watchIndex);
	}

	export async function watch(
		cb: (data: Payload) => void,
		reqOpts?: api.RepeatingRequestOptions
	): Promise<api.RepeatingRequest<cloud.GetGamesCommandOutput>> {
		return await abstractWatch<
			cloud.GetGamesCommandInput,
			cloud.GetGamesCommandOutput,
			typeof CloudDashboardCache.get
		>(
			global.cloud.getGames.bind(global.cloud),
			{},
			CloudDashboardCache.get.bind(CloudDashboardCache),
			res => {
				cb(res);
				CloudDashboardCache.set({ games: res.games, groups: res.groups }, res.watch);
			},
			([payload, _]) => cb(payload),
			reqOpts
		);
	}
}

// Watches a given endpoint in conjunction with a given cache
async function abstractWatch<T, U, V extends (...args: any) => any>(
	request: (input: T, overrides?: HttpHandlerOptions) => Promise<U>,
	commandArgs: T,
	cache: () => Promise<[any, WatchIndex]>,
	resCb: (res: U) => void,
	cacheCb: (cache: Awaited<ReturnType<V>>) => void,
	reqOpts?: api.RepeatingRequestOptions
): Promise<api.RepeatingRequest<U>> {
	// Fetch cache
	let [cacheRes, watchIndex] = await cache();

	// Return cached information to callback
	if (cacheRes) cacheCb([cacheRes, watchIndex] as any);

	// Start repeating request
	let req = new api.RepeatingRequest(
		async (abortSignal, watchIndex) =>
			await request(Object.assign(commandArgs, { watchIndex }), { abortSignal }),
		cacheRes ? Object.assign({ watchIndex: watchIndex }, reqOpts ?? {}) : reqOpts
	);
	req.onMessage(resCb);

	return req;
}
