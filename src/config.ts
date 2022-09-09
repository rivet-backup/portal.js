// Make sure this file has no dependencies

// Provide default env if env variable is not defined. Any uses of `ENV.ABC` will be
// overriden because of the WebPack `DefinePlugin`, so these act as defaults.

const config = {
	IS_PROD: (ENV_IS_PROD as string) == 'true',
	VERSION: VERSION as string,
	ALLOW_PAGE_CACHE: window.localStorage.getItem('rivet:disable-page-cache') == null,

	GIT_COMMIT: ENV_GIT_COMMIT,
	GIT_BRANCH: ENV_GIT_BRANCH,

	RIVET_NAMESPACE: ENV_RIVET_NAMESPACE,

	API_PORTAL_URL: ENV_API_PORTAL_URL as string,
	API_IDENTITY_URL: ENV_API_IDENTITY_URL as string,
	API_GROUP_URL: ENV_API_GROUP_URL as string,
	API_CHAT_URL: ENV_API_CHAT_URL as string,
	API_AUTH_URL: ENV_API_AUTH_URL as string,
	API_CLOUD_URL: ENV_API_CLOUD_URL as string,
	API_KV_URL: ENV_API_KV_URL as string,
	API_PARTY_URL: ENV_API_PARTY_URL as string,
	ASSETS_URL: ENV_ASSETS_URL as string,
	COMMUNITY_URL: 'https://discord.gg/MskhvCXPEh',
	DOCUMENTATION_URL: 'https://docs.rivet.gg',

	IS_SECURE: (ENV_IS_SECURE as string) == '1',
	WEB_PUSH_PUBLIC_KEY: ENV_WEB_PUSH_PUBLIC_KEY as string,

	THUMBNAIL_MEDIA_SIZE: { width: 640, height: 480 },
	LARGE_BANNER_SIZE: { width: 768, height: 432 },

	AVATAR_IDS: ['clown', 'derby', 'greg', 'grump', 'smart'],

	enableServiceWorkers: 'serviceWorker' in navigator,
	enableNotifications: 'serviceWorker' in navigator && 'Notification' in window
};

console.log('Config', config);

export default config;
