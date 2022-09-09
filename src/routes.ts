import { TemplateResult, html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import * as pathToRegexp from 'path-to-regexp';
import config from './config';
import global from './utils/global';
import { MenuItem, MainMenuItem } from './elements/sidebar/main-sidebar';
import utils from './utils/utils';
import { DevGameRootConfig } from './elements/pages/dev/game';
import * as api from './utils/api';
import assets from './data/assets';
import UIRoot from './elements/root/ui-root';

export type RenderResult = RenderResultTemplate | RenderResultRedirect;

export class CustomError {
	constructor(public title: string, public message: string) {}
}

export interface RenderResultTemplate {
	menuItem?: MenuItem;
	title: string;
	template: TemplateResult;
	mobileRedirect?: string; // Where to redirect a page if the client is not on mobile
	mobileNavStuck?: boolean; // Makes the mobile nav stay open no matter the scroll position
}

export interface RenderResultRedirect {
	redirect: string;
}

type RouteRender<P> = (params: P, search: URLSearchParams) => RenderResult;

type RouteParameters = { [key: string]: string };

class Route<P extends RouteParameters> {
	path: string;
	render: RouteRender<P>;

	pathFunction: pathToRegexp.PathFunction<P>;

	pathKeys: pathToRegexp.Key[];
	pathRegex: RegExp;

	constructor({ path, render }: { path: string; render: RouteRender<P> }) {
		// Save the properties
		this.path = path;
		this.render = render;

		// Compile path to path builder
		this.pathFunction = pathToRegexp.compile(path);

		// Convert the path to regex
		this.pathKeys = [];
		this.pathRegex = pathToRegexp.pathToRegexp(this.path, this.pathKeys);
	}

	build(params: P): string {
		// Get the path
		let path = this.pathFunction(params);

		// Build URL
		return `${window.location.origin}${path}`;
	}
}

module routes {
	export let root = new Route<{}>({
		path: '/',
		render() {
			return {
				redirect: global.isMobile ? routes.home.build({}) : routes.arcade.build({})
			};
		}
	});

	export let home = new Route<{}>({
		path: '/home',
		render() {
			return {
				title: 'Home',
				template: html`<page-home></page-home>`,
				mobileRedirect: routes.arcade.build({})
			};
		}
	});

	export let gamesRoot = new Route<{}>({
		path: '/games',
		render() {
			return {
				redirect: routes.arcade.build({})
			};
		}
	});

	export let arcade = new Route<{ category?: string }>({
		path: '/arcade/:category?',
		render({ category }) {
			return responses.underConstruction({
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.ARCADE } },
				title: 'Arcade'
			});

			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.ARCADE } },
				title: 'Arcade',
				template: html`<page-arcade .categoryId=${ifDefined(category)}></page-arcade>`
			};
		}
	});

	export let groupsRoot = new Route<{}>({
		path: '/groups',
		render() {
			return responses.underConstruction();

			return {
				redirect: groups.build({})
			};
		}
	});

	export let groups = new Route<{}>({
		path: '/groups/all',
		render() {
			return responses.underConstruction();

			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.GROUPS } },
				title: 'Groups',
				template: html`<page-groups></page-groups>`
			};
		}
	});

	export let identity = new Route<{ id: string }>({
		path: '/identities/:id',
		render({ id }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				title: 'Identity',
				template: html`<page-identity .identityId=${id} .gameNameId=${null}></page-identity>`
			};
		}
	});

	export let resolveThread = new Route<{ id: string }>({
		path: '/threads/:id',
		render({ id }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				title: 'Thread',
				template: html`<page-thread-resolve .threadId=${id}></page-thread-resolve>`
			};
		}
	});

	export let identityDirectChat = new Route<{ id: string }>({
		path: '/identities/:id/chat',
		render({ id }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				menuItem: { kind: 'Direct', content: { otherIdentityId: id } },
				title: 'Identity Chat',
				template: html`<page-identity-direct-chat .identityId=${id}></page-identity-direct-chat>`
			};
		}
	});

	export let identityGameStat = new Route<{ id: string; gameNameId: string }>({
		path: '/identities/:id/game/:gameNameId',
		render({ id, gameNameId }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				title: 'Identity',
				template: html`<page-identity .identityId=${id} .gameNameId=${gameNameId}></page-identity>`
			};
		}
	});

	export let identityFriends = new Route<{ id: string }>({
		path: '/identities/:id/friends',
		render({ id }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				title: 'Mutual Friends',
				template: html`<page-identity-friends .identityId=${id}></page-identity-friends>`,
				mobileRedirect: routes.identity.build({ id: id })
			};
		}
	});

	export let game = new Route<{ nameId: string }>({
		path: '/games/:nameId',
		render({ nameId }) {
			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.ARCADE } },
				title: 'Game',
				template: html`<page-game .nameId=${nameId}></page-game>`
			};
		}
	});

	export let group = new Route<{ id: string }>({
		path: '/groups/:id',
		render({ id }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.GROUPS } },
				title: 'Group',
				template: html`<page-group .groupId=${id} .gameNameId=${null}></page-group>`
			};
		}
	});

	export let groupChat = new Route<{ id: string }>({
		path: '/groups/:id/chat',
		render({ id }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				menuItem: { kind: 'Group', content: { groupId: id } },
				title: 'Group Chat',
				template: html`<page-group-chat .groupId=${id}></page-group-chat>`
			};
		}
	});

	export let groupGameStat = new Route<{ id: string; gameNameId: string }>({
		path: '/groups/:id/game/:gameNameId',
		render({ id, gameNameId }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.GROUPS } },
				title: 'Group',
				template: html`<page-group .groupId=${id} .gameNameId=${gameNameId}></page-group>`
			};
		}
	});

	export let groupMembers = new Route<{ id: string }>({
		path: '/groups/:id/members',
		render({ id }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				title: 'Group Members',
				template: html`<page-group-members .groupId=${id}></page-group-members>`,
				mobileRedirect: routes.group.build({ id: id })
			};
		}
	});

	export let groupInvite = new Route<{ code: string }>({
		path: '/invite/:code?',
		render({ code }) {
			return {
				title: 'Group Invite',
				template: html`<page-group-invite .code=${code}></page-group-invite>`
			};
		}
	});

	export let party = new Route<{ id: string }>({
		path: '/parties/:id',
		render({ id }) {
			if (!utils.validateUuid(id)) return responses.notFound();

			return {
				menuItem: { kind: 'Party', content: { partyId: id } },
				title: `Party`,
				template: html`<page-party-chat .partyId=${id}></page-party-chat>`
			};
		}
	});

	export let partyInvite = new Route<{ token: string }>({
		path: '/party/invite/:token',
		render({ token }) {
			return {
				title: `Party Invite`,
				template: html`<page-party-invite .inviteToken=${token}></page-party-invite>`
			};
		}
	});

	export let settings = new Route<{ tab?: string }>({
		path: '/settings/:tab?',
		render({ tab }) {
			return {
				title: `Settings`,
				template: html`<page-settings .tabId=${tab}></page-settings>`,
				mobileNavStuck: true
			};
		}
	});

	export let admin = new Route<{}>({
		path: '/admin',
		render() {
			if (!global.currentIdentity.isAdmin) return responses.notFound();

			return {
				title: `Admin`,
				template: html`<page-admin></page-admin>`
			};
		}
	});

	export let register = new Route<{}>({
		path: '/register',
		render() {
			return {
				title: `Register`,
				template: html`<page-register></page-register>`
			};
		}
	});

	export let linkGame = new Route<{ token: string }>({
		path: '/link/:token',
		render({ token }) {
			return {
				title: `Link account`,
				template: html`<page-link-game .token=${token}></page-link-game>`
			};
		}
	});

	export let devRoot = new Route<{}>({
		path: '/developer',
		render() {
			return {
				redirect: devDashboard.build({})
			};
		}
	});

	export let devDashboard = new Route<{}>({
		path: '/developer/dashboard',
		render() {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (global.currentIdentity.devState != api.identity.IdentityDevState.ACCEPTED)
				return responses.developerOnly();

			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.DEVELOPER } },
				title: 'Developer Dashboard',
				template: html`<page-dev-games></page-dev-games>`
			};
		}
	});

	export let devGame = new Route<{ gameId: string }>({
		path: '/developer/games/:gameId',
		render({ gameId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();

			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.DEVELOPER } },
				title: 'Game',
				template: html`<page-dev-game
					.gameId=${gameId}
					.config=${{ summary: true } as DevGameRootConfig}
				></page-dev-game>`
			};
		}
	});

	export let devGameSummary = new Route<{ gameId: string }>({
		path: '/developer/games/:gameId/summary',
		render({ gameId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();

			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.DEVELOPER } },
				title: 'Game',
				template: html`<page-dev-game
					.gameId=${gameId}
					.config=${{ summary: true, mobileSummary: true } as DevGameRootConfig}
				></page-dev-game>`,
				mobileRedirect: routes.devGame.build({ gameId })
			};
		}
	});

	export let devNamespace = new Route<{ gameId: string; namespaceId: string }>({
		path: '/developer/games/:gameId/namespaces/:namespaceId',
		render({ gameId, namespaceId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();

			if (!utils.validateUuid(gameId) || !utils.validateUuid(namespaceId)) return responses.notFound();

			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.DEVELOPER } },
				title: 'Game Namespace',
				template: html`<page-dev-game
					.gameId=${gameId}
					.config=${{ namespace: { namespaceId } } as DevGameRootConfig}
				></page-dev-game>`
			};
		}
	});

	export let devVersion = new Route<{ gameId: string; versionId: string }>({
		path: '/developer/games/:gameId/versions/:versionId',
		render({ gameId, versionId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (global.isMobile) return responses.desktopOnly();

			if (!utils.validateUuid(gameId) || !utils.validateUuid(versionId)) return responses.notFound();

			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.DEVELOPER } },
				title: 'Game Version',
				template: html`<page-dev-game
					.gameId=${gameId}
					.config=${{ version: { versionId } } as DevGameRootConfig}
				></page-dev-game>`
			};
		}
	});

	export let devVersionDraft = new Route<{ gameId: string }>({
		path: '/developer/games/:gameId/version-draft',
		render({ gameId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (global.isMobile) return responses.desktopOnly();
			if (!utils.validateUuid(gameId)) return responses.notFound();

			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.DEVELOPER } },
				title: 'Game Version Draft',
				template: html`<page-dev-game
					.gameId=${gameId}
					.config=${{ versionDraft: true } as DevGameRootConfig}
				></page-dev-game>`
			};
		}
	});

	export let devTokens = new Route<{ gameId: string }>({
		path: '/developer/games/:gameId/api',
		render({ gameId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();

			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.DEVELOPER } },
				title: 'Game API',
				template: html`<page-dev-game
					.gameId=${gameId}
					.config=${{ tokens: true } as DevGameRootConfig}
				></page-dev-game>`
			};
		}
	});

	export let devLogs = new Route<{ gameId: string; namespaceId?: string }>({
		path: '/developer/games/:gameId/logs',
		render({ gameId, namespaceId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();
			if (namespaceId && !utils.validateUuid(namespaceId)) return responses.notFound();

			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.DEVELOPER } },
				title: 'Game Logs',
				template: html`<page-dev-game
					.gameId=${gameId}
					.config=${{ logs: true, namespaceId } as DevGameRootConfig}
				></page-dev-game>`
			};
		}
	});

	export let devLogLobby = new Route<{ gameId: string; lobbyId: string }>({
		path: '/developer/games/:gameId/logs/:lobbyId',
		render({ gameId, lobbyId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();
			if (!utils.validateUuid(lobbyId)) return responses.notFound();

			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.DEVELOPER } },
				title: 'Game Logs',
				template: html`<page-dev-game
					.gameId=${gameId}
					.config=${{ logs: true, logsLobbyId: lobbyId } as DevGameRootConfig}
				></page-dev-game>`,
				mobileRedirect: routes.devLogs.build({ gameId })
			};
		}
	});

	export let devLobbies = new Route<{ gameId: string; namespaceId?: string }>({
		path: '/developer/games/:gameId/lobbies',
		render({ gameId, namespaceId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();
			if (namespaceId && !utils.validateUuid(namespaceId)) return responses.notFound();

			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.DEVELOPER } },
				title: 'Game Lobbies',
				template: html`<page-dev-game
					.gameId=${gameId}
					.config=${{ lobbies: true, namespaceId } as DevGameRootConfig}
				></page-dev-game>`
			};
		}
	});

	export let devKv = new Route<{ gameId: string; namespaceId?: string }>({
		path: '/developer/games/:gameId/kv/:namespaceId?',
		render({ gameId, namespaceId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();
			if (namespaceId && !utils.validateUuid(namespaceId)) return responses.notFound();

			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.DEVELOPER } },
				title: 'Game KV',
				template: html`<page-dev-game
					.gameId=${gameId}
					.config=${{ kv: true, namespaceId } as DevGameRootConfig}
				></page-dev-game>`
			};
		}
	});

	export let devCdn = new Route<{ gameId: string }>({
		path: '/developer/games/:gameId/cdn',
		render({ gameId }) {
			return responses.notFound();

			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();

			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.DEVELOPER } },
				title: 'Game CDN',
				template: html`<page-dev-game
					.gameId=${gameId}
					.config=${{ sites: true } as DevGameRootConfig}
				></page-dev-game>`
			};
		}
	});

	export let devBuilds = new Route<{ gameId: string }>({
		path: '/developer/games/:gameId/builds',
		render({ gameId }) {
			return responses.notFound();

			if (!global.currentIdentity.isRegistered) return responses.registerRequired();
			if (!utils.validateUuid(gameId)) return responses.notFound();

			return {
				menuItem: { kind: 'MainMenu', content: { item: MainMenuItem.DEVELOPER } },
				title: 'Game Builds',
				template: html`<page-dev-game
					.gameId=${gameId}
					.config=${{ builds: true } as DevGameRootConfig}
				></page-dev-game>`
			};
		}
	});

	export let groupBilling = new Route<{ groupId: string }>({
		path: '/groups/:groupId/billing',
		render({ groupId }) {
			if (!global.currentIdentity.isRegistered) return responses.registerRequired();

			if (!utils.validateUuid(groupId)) return responses.notFound();

			return {
				title: `Billing`,
				template: html`<page-group-billing .groupId=${groupId}></page-group-billing>`
			};
		}
	});
}

export module responses {
	export function forbidden(): RenderResult {
		return {
			title: 'Forbidden',
			template: html`<page-error message="Forbidden"></page-error>`
		};
	}

	export function badRequest(): RenderResult {
		return {
			title: 'Bad Request',
			template: html`<page-error message="Bad Request"></page-error>`
		};
	}

	export function notFound(): RenderResult {
		return {
			title: 'Not Found',
			template: html`<invalid-page-state>
				<h1 slot="title">404</h1>
				<h2 slot="subtitle">This page isn't available or it doesn't exist. Sorry!</h2>
			</invalid-page-state>`
		};
	}

	export function underConstruction(config: { menuItem?: MenuItem, title?: string } = {}): RenderResult {
		return {
			menuItem: config.menuItem,
			title: config.title ?? 'Coming Soon',
			template: html`<invalid-page-state>
				<h1 slot="title">Coming Soon</h1>
				<h2 slot="subtitle">This page isn't available yet. Come back soon!</h2>
				<div slot="actions">
					<stylized-button href="/developer/dashboard">Go to Dashboard</stylized-button>
				</div>
			</invalid-page-state>`
		};
	}

	export function registerRequired(): RenderResult {
		return {
			title: 'Register Required',
			template: html`<invalid-page-state>
				<h1 slot="title">Registered Only</h1>
				<h2 slot="subtitle">
					<!--  -->
					This page isn't available for guest accounts. Register to save your account.
				</h2>
				<div slot="actions">
					<stylized-button .trigger=${() => UIRoot.shared.openRegisterPanel()}
						>Register Now</stylized-button
					>
				</div>
			</invalid-page-state>`
		};
	}

	export function desktopOnly(): RenderResult {
		return {
			title: 'Desktop Only',
			template: html`<invalid-page-state>
				<h1 slot="title">Desktop Only</h1>
				<h2 slot="subtitle">This page is only available on a Desktop platform.</h2>
			</invalid-page-state>`
		};
	}

	export function developerOnly(): RenderResult {
		return {
			title: 'Private Beta',
			template: html`<page-dev-only></page-dev-only>`
		};
	}

	export function renderError(error: Error, notFullHeight: boolean = false): TemplateResult {
		// Build error message
		let errorMessage: string;
		if (typeof error == 'string') errorMessage = error;
		else if (error instanceof CustomError) {
			return html`<page-error
				.title=${error.title}
				.message=${error.message}
				.expand=${!notFullHeight}
			></page-error>`;
		} else if (error && error.message && typeof error.message == 'string') errorMessage = error.message;
		else if (error && error.hasOwnProperty('statusText')) {
			let err = error as any as Response;

			if (err.status == 403) return (forbidden() as RenderResultTemplate).template;

			errorMessage = err.statusText ? err.statusText : err.status.toString() ?? 'Error';
		} else errorMessage = 'Error';

		return html`<page-error .message=${errorMessage} .expand=${!notFullHeight}></page-error>`;
	}
}

export default routes;

// Convert to array so it can be iterated over faster
export let routesArray: Route<any>[] = Object.keys(routes).map(k => (routes as any)[k]);
