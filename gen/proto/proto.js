/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from 'protobufjs/minimal';

// Common aliases
const $Reader = $protobuf.Reader,
	$Writer = $protobuf.Writer,
	$util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots['default'] || ($protobuf.roots['default'] = {});

export const rivet = ($root.rivet = (() => {
	/**
	 * Namespace rivet.
	 * @exports rivet
	 * @namespace
	 */
	const rivet = {};

	rivet.cache = (function () {
		/**
		 * Namespace cache.
		 * @memberof rivet
		 * @namespace
		 */
		const cache = {};

		cache.CloudDashboardCache = (function () {
			/**
			 * Properties of a CloudDashboardCache.
			 * @memberof rivet.cache
			 * @interface ICloudDashboardCache
			 * @property {Array.<rivet.client.cloud.game.IGameSummary>|null} [games] CloudDashboardCache games
			 * @property {Array.<rivet.client.cloud.group.IGroupSummary>|null} [groups] CloudDashboardCache groups
			 */

			/**
			 * Constructs a new CloudDashboardCache.
			 * @memberof rivet.cache
			 * @classdesc Represents a CloudDashboardCache.
			 * @implements ICloudDashboardCache
			 * @constructor
			 * @param {rivet.cache.ICloudDashboardCache=} [properties] Properties to set
			 */
			function CloudDashboardCache(properties) {
				this.games = [];
				this.groups = [];
				if (properties)
					for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
						if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}

			/**
			 * CloudDashboardCache games.
			 * @member {Array.<rivet.client.cloud.game.IGameSummary>} games
			 * @memberof rivet.cache.CloudDashboardCache
			 * @instance
			 */
			CloudDashboardCache.prototype.games = $util.emptyArray;

			/**
			 * CloudDashboardCache groups.
			 * @member {Array.<rivet.client.cloud.group.IGroupSummary>} groups
			 * @memberof rivet.cache.CloudDashboardCache
			 * @instance
			 */
			CloudDashboardCache.prototype.groups = $util.emptyArray;

			/**
			 * Creates a new CloudDashboardCache instance using the specified properties.
			 * @function create
			 * @memberof rivet.cache.CloudDashboardCache
			 * @static
			 * @param {rivet.cache.ICloudDashboardCache=} [properties] Properties to set
			 * @returns {rivet.cache.CloudDashboardCache} CloudDashboardCache instance
			 */
			CloudDashboardCache.create = function create(properties) {
				return new CloudDashboardCache(properties);
			};

			/**
			 * Encodes the specified CloudDashboardCache message. Does not implicitly {@link rivet.cache.CloudDashboardCache.verify|verify} messages.
			 * @function encode
			 * @memberof rivet.cache.CloudDashboardCache
			 * @static
			 * @param {rivet.cache.ICloudDashboardCache} message CloudDashboardCache message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			CloudDashboardCache.encode = function encode(message, writer) {
				if (!writer) writer = $Writer.create();
				if (message.games != null && message.games.length)
					for (let i = 0; i < message.games.length; ++i)
						$root.rivet.client.cloud.game.GameSummary.encode(
							message.games[i],
							writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
						).ldelim();
				if (message.groups != null && message.groups.length)
					for (let i = 0; i < message.groups.length; ++i)
						$root.rivet.client.cloud.group.GroupSummary.encode(
							message.groups[i],
							writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
						).ldelim();
				return writer;
			};

			/**
			 * Decodes a CloudDashboardCache message from the specified reader or buffer.
			 * @function decode
			 * @memberof rivet.cache.CloudDashboardCache
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {rivet.cache.CloudDashboardCache} CloudDashboardCache
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			CloudDashboardCache.decode = function decode(reader, length) {
				if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
				let end = length === undefined ? reader.len : reader.pos + length,
					message = new $root.rivet.cache.CloudDashboardCache();
				while (reader.pos < end) {
					let tag = reader.uint32();
					switch (tag >>> 3) {
						case 1:
							if (!(message.games && message.games.length)) message.games = [];
							message.games.push(
								$root.rivet.client.cloud.game.GameSummary.decode(reader, reader.uint32())
							);
							break;
						case 2:
							if (!(message.groups && message.groups.length)) message.groups = [];
							message.groups.push(
								$root.rivet.client.cloud.group.GroupSummary.decode(reader, reader.uint32())
							);
							break;
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Verifies a CloudDashboardCache message.
			 * @function verify
			 * @memberof rivet.cache.CloudDashboardCache
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			CloudDashboardCache.verify = function verify(message) {
				if (typeof message !== 'object' || message === null) return 'object expected';
				if (message.games != null && message.hasOwnProperty('games')) {
					if (!Array.isArray(message.games)) return 'games: array expected';
					for (let i = 0; i < message.games.length; ++i) {
						let error = $root.rivet.client.cloud.game.GameSummary.verify(message.games[i]);
						if (error) return 'games.' + error;
					}
				}
				if (message.groups != null && message.hasOwnProperty('groups')) {
					if (!Array.isArray(message.groups)) return 'groups: array expected';
					for (let i = 0; i < message.groups.length; ++i) {
						let error = $root.rivet.client.cloud.group.GroupSummary.verify(message.groups[i]);
						if (error) return 'groups.' + error;
					}
				}
				return null;
			};

			return CloudDashboardCache;
		})();

		cache.CloudGameCache = (function () {
			/**
			 * Properties of a CloudGameCache.
			 * @memberof rivet.cache
			 * @interface ICloudGameCache
			 * @property {rivet.client.cloud.game.IGameFull|null} [game] CloudGameCache game
			 */

			/**
			 * Constructs a new CloudGameCache.
			 * @memberof rivet.cache
			 * @classdesc Represents a CloudGameCache.
			 * @implements ICloudGameCache
			 * @constructor
			 * @param {rivet.cache.ICloudGameCache=} [properties] Properties to set
			 */
			function CloudGameCache(properties) {
				if (properties)
					for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
						if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}

			/**
			 * CloudGameCache game.
			 * @member {rivet.client.cloud.game.IGameFull|null|undefined} game
			 * @memberof rivet.cache.CloudGameCache
			 * @instance
			 */
			CloudGameCache.prototype.game = null;

			/**
			 * Creates a new CloudGameCache instance using the specified properties.
			 * @function create
			 * @memberof rivet.cache.CloudGameCache
			 * @static
			 * @param {rivet.cache.ICloudGameCache=} [properties] Properties to set
			 * @returns {rivet.cache.CloudGameCache} CloudGameCache instance
			 */
			CloudGameCache.create = function create(properties) {
				return new CloudGameCache(properties);
			};

			/**
			 * Encodes the specified CloudGameCache message. Does not implicitly {@link rivet.cache.CloudGameCache.verify|verify} messages.
			 * @function encode
			 * @memberof rivet.cache.CloudGameCache
			 * @static
			 * @param {rivet.cache.ICloudGameCache} message CloudGameCache message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			CloudGameCache.encode = function encode(message, writer) {
				if (!writer) writer = $Writer.create();
				if (message.game != null && Object.hasOwnProperty.call(message, 'game'))
					$root.rivet.client.cloud.game.GameFull.encode(
						message.game,
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
				return writer;
			};

			/**
			 * Decodes a CloudGameCache message from the specified reader or buffer.
			 * @function decode
			 * @memberof rivet.cache.CloudGameCache
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {rivet.cache.CloudGameCache} CloudGameCache
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			CloudGameCache.decode = function decode(reader, length) {
				if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
				let end = length === undefined ? reader.len : reader.pos + length,
					message = new $root.rivet.cache.CloudGameCache();
				while (reader.pos < end) {
					let tag = reader.uint32();
					switch (tag >>> 3) {
						case 1:
							message.game = $root.rivet.client.cloud.game.GameFull.decode(
								reader,
								reader.uint32()
							);
							break;
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Verifies a CloudGameCache message.
			 * @function verify
			 * @memberof rivet.cache.CloudGameCache
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			CloudGameCache.verify = function verify(message) {
				if (typeof message !== 'object' || message === null) return 'object expected';
				if (message.game != null && message.hasOwnProperty('game')) {
					let error = $root.rivet.client.cloud.game.GameFull.verify(message.game);
					if (error) return 'game.' + error;
				}
				return null;
			};

			return CloudGameCache;
		})();

		cache.GroupProfileCache = (function () {
			/**
			 * Properties of a GroupProfileCache.
			 * @memberof rivet.cache
			 * @interface IGroupProfileCache
			 * @property {rivet.client.group.IProfile|null} [profile] GroupProfileCache profile
			 */

			/**
			 * Constructs a new GroupProfileCache.
			 * @memberof rivet.cache
			 * @classdesc Represents a GroupProfileCache.
			 * @implements IGroupProfileCache
			 * @constructor
			 * @param {rivet.cache.IGroupProfileCache=} [properties] Properties to set
			 */
			function GroupProfileCache(properties) {
				if (properties)
					for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
						if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}

			/**
			 * GroupProfileCache profile.
			 * @member {rivet.client.group.IProfile|null|undefined} profile
			 * @memberof rivet.cache.GroupProfileCache
			 * @instance
			 */
			GroupProfileCache.prototype.profile = null;

			/**
			 * Creates a new GroupProfileCache instance using the specified properties.
			 * @function create
			 * @memberof rivet.cache.GroupProfileCache
			 * @static
			 * @param {rivet.cache.IGroupProfileCache=} [properties] Properties to set
			 * @returns {rivet.cache.GroupProfileCache} GroupProfileCache instance
			 */
			GroupProfileCache.create = function create(properties) {
				return new GroupProfileCache(properties);
			};

			/**
			 * Encodes the specified GroupProfileCache message. Does not implicitly {@link rivet.cache.GroupProfileCache.verify|verify} messages.
			 * @function encode
			 * @memberof rivet.cache.GroupProfileCache
			 * @static
			 * @param {rivet.cache.IGroupProfileCache} message GroupProfileCache message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			GroupProfileCache.encode = function encode(message, writer) {
				if (!writer) writer = $Writer.create();
				if (message.profile != null && Object.hasOwnProperty.call(message, 'profile'))
					$root.rivet.client.group.Profile.encode(
						message.profile,
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
				return writer;
			};

			/**
			 * Decodes a GroupProfileCache message from the specified reader or buffer.
			 * @function decode
			 * @memberof rivet.cache.GroupProfileCache
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {rivet.cache.GroupProfileCache} GroupProfileCache
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			GroupProfileCache.decode = function decode(reader, length) {
				if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
				let end = length === undefined ? reader.len : reader.pos + length,
					message = new $root.rivet.cache.GroupProfileCache();
				while (reader.pos < end) {
					let tag = reader.uint32();
					switch (tag >>> 3) {
						case 1:
							message.profile = $root.rivet.client.group.Profile.decode(
								reader,
								reader.uint32()
							);
							break;
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Verifies a GroupProfileCache message.
			 * @function verify
			 * @memberof rivet.cache.GroupProfileCache
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			GroupProfileCache.verify = function verify(message) {
				if (typeof message !== 'object' || message === null) return 'object expected';
				if (message.profile != null && message.hasOwnProperty('profile')) {
					let error = $root.rivet.client.group.Profile.verify(message.profile);
					if (error) return 'profile.' + error;
				}
				return null;
			};

			return GroupProfileCache;
		})();

		cache.IdentityProfileCache = (function () {
			/**
			 * Properties of an IdentityProfileCache.
			 * @memberof rivet.cache
			 * @interface IIdentityProfileCache
			 * @property {rivet.client.identity.IProfile|null} [profile] IdentityProfileCache profile
			 */

			/**
			 * Constructs a new IdentityProfileCache.
			 * @memberof rivet.cache
			 * @classdesc Represents an IdentityProfileCache.
			 * @implements IIdentityProfileCache
			 * @constructor
			 * @param {rivet.cache.IIdentityProfileCache=} [properties] Properties to set
			 */
			function IdentityProfileCache(properties) {
				if (properties)
					for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
						if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}

			/**
			 * IdentityProfileCache profile.
			 * @member {rivet.client.identity.IProfile|null|undefined} profile
			 * @memberof rivet.cache.IdentityProfileCache
			 * @instance
			 */
			IdentityProfileCache.prototype.profile = null;

			/**
			 * Creates a new IdentityProfileCache instance using the specified properties.
			 * @function create
			 * @memberof rivet.cache.IdentityProfileCache
			 * @static
			 * @param {rivet.cache.IIdentityProfileCache=} [properties] Properties to set
			 * @returns {rivet.cache.IdentityProfileCache} IdentityProfileCache instance
			 */
			IdentityProfileCache.create = function create(properties) {
				return new IdentityProfileCache(properties);
			};

			/**
			 * Encodes the specified IdentityProfileCache message. Does not implicitly {@link rivet.cache.IdentityProfileCache.verify|verify} messages.
			 * @function encode
			 * @memberof rivet.cache.IdentityProfileCache
			 * @static
			 * @param {rivet.cache.IIdentityProfileCache} message IdentityProfileCache message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			IdentityProfileCache.encode = function encode(message, writer) {
				if (!writer) writer = $Writer.create();
				if (message.profile != null && Object.hasOwnProperty.call(message, 'profile'))
					$root.rivet.client.identity.Profile.encode(
						message.profile,
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
				return writer;
			};

			/**
			 * Decodes an IdentityProfileCache message from the specified reader or buffer.
			 * @function decode
			 * @memberof rivet.cache.IdentityProfileCache
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {rivet.cache.IdentityProfileCache} IdentityProfileCache
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			IdentityProfileCache.decode = function decode(reader, length) {
				if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
				let end = length === undefined ? reader.len : reader.pos + length,
					message = new $root.rivet.cache.IdentityProfileCache();
				while (reader.pos < end) {
					let tag = reader.uint32();
					switch (tag >>> 3) {
						case 1:
							message.profile = $root.rivet.client.identity.Profile.decode(
								reader,
								reader.uint32()
							);
							break;
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Verifies an IdentityProfileCache message.
			 * @function verify
			 * @memberof rivet.cache.IdentityProfileCache
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			IdentityProfileCache.verify = function verify(message) {
				if (typeof message !== 'object' || message === null) return 'object expected';
				if (message.profile != null && message.hasOwnProperty('profile')) {
					let error = $root.rivet.client.identity.Profile.verify(message.profile);
					if (error) return 'profile.' + error;
				}
				return null;
			};

			return IdentityProfileCache;
		})();

		cache.PartySummaryCache = (function () {
			/**
			 * Properties of a PartySummaryCache.
			 * @memberof rivet.cache
			 * @interface IPartySummaryCache
			 * @property {rivet.client.party.ISummary|null} [party] PartySummaryCache party
			 */

			/**
			 * Constructs a new PartySummaryCache.
			 * @memberof rivet.cache
			 * @classdesc Represents a PartySummaryCache.
			 * @implements IPartySummaryCache
			 * @constructor
			 * @param {rivet.cache.IPartySummaryCache=} [properties] Properties to set
			 */
			function PartySummaryCache(properties) {
				if (properties)
					for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
						if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}

			/**
			 * PartySummaryCache party.
			 * @member {rivet.client.party.ISummary|null|undefined} party
			 * @memberof rivet.cache.PartySummaryCache
			 * @instance
			 */
			PartySummaryCache.prototype.party = null;

			/**
			 * Creates a new PartySummaryCache instance using the specified properties.
			 * @function create
			 * @memberof rivet.cache.PartySummaryCache
			 * @static
			 * @param {rivet.cache.IPartySummaryCache=} [properties] Properties to set
			 * @returns {rivet.cache.PartySummaryCache} PartySummaryCache instance
			 */
			PartySummaryCache.create = function create(properties) {
				return new PartySummaryCache(properties);
			};

			/**
			 * Encodes the specified PartySummaryCache message. Does not implicitly {@link rivet.cache.PartySummaryCache.verify|verify} messages.
			 * @function encode
			 * @memberof rivet.cache.PartySummaryCache
			 * @static
			 * @param {rivet.cache.IPartySummaryCache} message PartySummaryCache message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			PartySummaryCache.encode = function encode(message, writer) {
				if (!writer) writer = $Writer.create();
				if (message.party != null && Object.hasOwnProperty.call(message, 'party'))
					$root.rivet.client.party.Summary.encode(
						message.party,
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
				return writer;
			};

			/**
			 * Decodes a PartySummaryCache message from the specified reader or buffer.
			 * @function decode
			 * @memberof rivet.cache.PartySummaryCache
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {rivet.cache.PartySummaryCache} PartySummaryCache
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			PartySummaryCache.decode = function decode(reader, length) {
				if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
				let end = length === undefined ? reader.len : reader.pos + length,
					message = new $root.rivet.cache.PartySummaryCache();
				while (reader.pos < end) {
					let tag = reader.uint32();
					switch (tag >>> 3) {
						case 1:
							message.party = $root.rivet.client.party.Summary.decode(reader, reader.uint32());
							break;
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Verifies a PartySummaryCache message.
			 * @function verify
			 * @memberof rivet.cache.PartySummaryCache
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			PartySummaryCache.verify = function verify(message) {
				if (typeof message !== 'object' || message === null) return 'object expected';
				if (message.party != null && message.hasOwnProperty('party')) {
					let error = $root.rivet.client.party.Summary.verify(message.party);
					if (error) return 'party.' + error;
				}
				return null;
			};

			return PartySummaryCache;
		})();

		cache.RecentThreadsCache = (function () {
			/**
			 * Properties of a RecentThreadsCache.
			 * @memberof rivet.cache
			 * @interface IRecentThreadsCache
			 * @property {Array.<rivet.client.chat.IThread>|null} [threads] RecentThreadsCache threads
			 */

			/**
			 * Constructs a new RecentThreadsCache.
			 * @memberof rivet.cache
			 * @classdesc Represents a RecentThreadsCache.
			 * @implements IRecentThreadsCache
			 * @constructor
			 * @param {rivet.cache.IRecentThreadsCache=} [properties] Properties to set
			 */
			function RecentThreadsCache(properties) {
				this.threads = [];
				if (properties)
					for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
						if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}

			/**
			 * RecentThreadsCache threads.
			 * @member {Array.<rivet.client.chat.IThread>} threads
			 * @memberof rivet.cache.RecentThreadsCache
			 * @instance
			 */
			RecentThreadsCache.prototype.threads = $util.emptyArray;

			/**
			 * Creates a new RecentThreadsCache instance using the specified properties.
			 * @function create
			 * @memberof rivet.cache.RecentThreadsCache
			 * @static
			 * @param {rivet.cache.IRecentThreadsCache=} [properties] Properties to set
			 * @returns {rivet.cache.RecentThreadsCache} RecentThreadsCache instance
			 */
			RecentThreadsCache.create = function create(properties) {
				return new RecentThreadsCache(properties);
			};

			/**
			 * Encodes the specified RecentThreadsCache message. Does not implicitly {@link rivet.cache.RecentThreadsCache.verify|verify} messages.
			 * @function encode
			 * @memberof rivet.cache.RecentThreadsCache
			 * @static
			 * @param {rivet.cache.IRecentThreadsCache} message RecentThreadsCache message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			RecentThreadsCache.encode = function encode(message, writer) {
				if (!writer) writer = $Writer.create();
				if (message.threads != null && message.threads.length)
					for (let i = 0; i < message.threads.length; ++i)
						$root.rivet.client.chat.Thread.encode(
							message.threads[i],
							writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
						).ldelim();
				return writer;
			};

			/**
			 * Decodes a RecentThreadsCache message from the specified reader or buffer.
			 * @function decode
			 * @memberof rivet.cache.RecentThreadsCache
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {rivet.cache.RecentThreadsCache} RecentThreadsCache
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			RecentThreadsCache.decode = function decode(reader, length) {
				if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
				let end = length === undefined ? reader.len : reader.pos + length,
					message = new $root.rivet.cache.RecentThreadsCache();
				while (reader.pos < end) {
					let tag = reader.uint32();
					switch (tag >>> 3) {
						case 1:
							if (!(message.threads && message.threads.length)) message.threads = [];
							message.threads.push(
								$root.rivet.client.chat.Thread.decode(reader, reader.uint32())
							);
							break;
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Verifies a RecentThreadsCache message.
			 * @function verify
			 * @memberof rivet.cache.RecentThreadsCache
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			RecentThreadsCache.verify = function verify(message) {
				if (typeof message !== 'object' || message === null) return 'object expected';
				if (message.threads != null && message.hasOwnProperty('threads')) {
					if (!Array.isArray(message.threads)) return 'threads: array expected';
					for (let i = 0; i < message.threads.length; ++i) {
						let error = $root.rivet.client.chat.Thread.verify(message.threads[i]);
						if (error) return 'threads.' + error;
					}
				}
				return null;
			};

			return RecentThreadsCache;
		})();

		cache.RootCache = (function () {
			/**
			 * Properties of a RootCache.
			 * @memberof rivet.cache
			 * @interface IRootCache
			 * @property {rivet.client.identity.IProfile|null} [identity] RootCache identity
			 */

			/**
			 * Constructs a new RootCache.
			 * @memberof rivet.cache
			 * @classdesc Represents a RootCache.
			 * @implements IRootCache
			 * @constructor
			 * @param {rivet.cache.IRootCache=} [properties] Properties to set
			 */
			function RootCache(properties) {
				if (properties)
					for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
						if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}

			/**
			 * RootCache identity.
			 * @member {rivet.client.identity.IProfile|null|undefined} identity
			 * @memberof rivet.cache.RootCache
			 * @instance
			 */
			RootCache.prototype.identity = null;

			/**
			 * Creates a new RootCache instance using the specified properties.
			 * @function create
			 * @memberof rivet.cache.RootCache
			 * @static
			 * @param {rivet.cache.IRootCache=} [properties] Properties to set
			 * @returns {rivet.cache.RootCache} RootCache instance
			 */
			RootCache.create = function create(properties) {
				return new RootCache(properties);
			};

			/**
			 * Encodes the specified RootCache message. Does not implicitly {@link rivet.cache.RootCache.verify|verify} messages.
			 * @function encode
			 * @memberof rivet.cache.RootCache
			 * @static
			 * @param {rivet.cache.IRootCache} message RootCache message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			RootCache.encode = function encode(message, writer) {
				if (!writer) writer = $Writer.create();
				if (message.identity != null && Object.hasOwnProperty.call(message, 'identity'))
					$root.rivet.client.identity.Profile.encode(
						message.identity,
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
				return writer;
			};

			/**
			 * Decodes a RootCache message from the specified reader or buffer.
			 * @function decode
			 * @memberof rivet.cache.RootCache
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {rivet.cache.RootCache} RootCache
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			RootCache.decode = function decode(reader, length) {
				if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
				let end = length === undefined ? reader.len : reader.pos + length,
					message = new $root.rivet.cache.RootCache();
				while (reader.pos < end) {
					let tag = reader.uint32();
					switch (tag >>> 3) {
						case 1:
							message.identity = $root.rivet.client.identity.Profile.decode(
								reader,
								reader.uint32()
							);
							break;
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Verifies a RootCache message.
			 * @function verify
			 * @memberof rivet.cache.RootCache
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			RootCache.verify = function verify(message) {
				if (typeof message !== 'object' || message === null) return 'object expected';
				if (message.identity != null && message.hasOwnProperty('identity')) {
					let error = $root.rivet.client.identity.Profile.verify(message.identity);
					if (error) return 'identity.' + error;
				}
				return null;
			};

			return RootCache;
		})();

		cache.ThreadHistoryCache = (function () {
			/**
			 * Properties of a ThreadHistoryCache.
			 * @memberof rivet.cache
			 * @interface IThreadHistoryCache
			 * @property {Array.<rivet.client.chat.IMessage>|null} [chatMessages] ThreadHistoryCache chatMessages
			 */

			/**
			 * Constructs a new ThreadHistoryCache.
			 * @memberof rivet.cache
			 * @classdesc Represents a ThreadHistoryCache.
			 * @implements IThreadHistoryCache
			 * @constructor
			 * @param {rivet.cache.IThreadHistoryCache=} [properties] Properties to set
			 */
			function ThreadHistoryCache(properties) {
				this.chatMessages = [];
				if (properties)
					for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
						if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}

			/**
			 * ThreadHistoryCache chatMessages.
			 * @member {Array.<rivet.client.chat.IMessage>} chatMessages
			 * @memberof rivet.cache.ThreadHistoryCache
			 * @instance
			 */
			ThreadHistoryCache.prototype.chatMessages = $util.emptyArray;

			/**
			 * Creates a new ThreadHistoryCache instance using the specified properties.
			 * @function create
			 * @memberof rivet.cache.ThreadHistoryCache
			 * @static
			 * @param {rivet.cache.IThreadHistoryCache=} [properties] Properties to set
			 * @returns {rivet.cache.ThreadHistoryCache} ThreadHistoryCache instance
			 */
			ThreadHistoryCache.create = function create(properties) {
				return new ThreadHistoryCache(properties);
			};

			/**
			 * Encodes the specified ThreadHistoryCache message. Does not implicitly {@link rivet.cache.ThreadHistoryCache.verify|verify} messages.
			 * @function encode
			 * @memberof rivet.cache.ThreadHistoryCache
			 * @static
			 * @param {rivet.cache.IThreadHistoryCache} message ThreadHistoryCache message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			ThreadHistoryCache.encode = function encode(message, writer) {
				if (!writer) writer = $Writer.create();
				if (message.chatMessages != null && message.chatMessages.length)
					for (let i = 0; i < message.chatMessages.length; ++i)
						$root.rivet.client.chat.Message.encode(
							message.chatMessages[i],
							writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
						).ldelim();
				return writer;
			};

			/**
			 * Decodes a ThreadHistoryCache message from the specified reader or buffer.
			 * @function decode
			 * @memberof rivet.cache.ThreadHistoryCache
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {rivet.cache.ThreadHistoryCache} ThreadHistoryCache
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			ThreadHistoryCache.decode = function decode(reader, length) {
				if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
				let end = length === undefined ? reader.len : reader.pos + length,
					message = new $root.rivet.cache.ThreadHistoryCache();
				while (reader.pos < end) {
					let tag = reader.uint32();
					switch (tag >>> 3) {
						case 1:
							if (!(message.chatMessages && message.chatMessages.length))
								message.chatMessages = [];
							message.chatMessages.push(
								$root.rivet.client.chat.Message.decode(reader, reader.uint32())
							);
							break;
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Verifies a ThreadHistoryCache message.
			 * @function verify
			 * @memberof rivet.cache.ThreadHistoryCache
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			ThreadHistoryCache.verify = function verify(message) {
				if (typeof message !== 'object' || message === null) return 'object expected';
				if (message.chatMessages != null && message.hasOwnProperty('chatMessages')) {
					if (!Array.isArray(message.chatMessages)) return 'chatMessages: array expected';
					for (let i = 0; i < message.chatMessages.length; ++i) {
						let error = $root.rivet.client.chat.Message.verify(message.chatMessages[i]);
						if (error) return 'chatMessages.' + error;
					}
				}
				return null;
			};

			return ThreadHistoryCache;
		})();

		cache.ThreadLiveCache = (function () {
			/**
			 * Properties of a ThreadLiveCache.
			 * @memberof rivet.cache
			 * @interface IThreadLiveCache
			 * @property {number|Long|null} [lastReadTs] ThreadLiveCache lastReadTs
			 */

			/**
			 * Constructs a new ThreadLiveCache.
			 * @memberof rivet.cache
			 * @classdesc Represents a ThreadLiveCache.
			 * @implements IThreadLiveCache
			 * @constructor
			 * @param {rivet.cache.IThreadLiveCache=} [properties] Properties to set
			 */
			function ThreadLiveCache(properties) {
				if (properties)
					for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
						if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}

			/**
			 * ThreadLiveCache lastReadTs.
			 * @member {number|Long} lastReadTs
			 * @memberof rivet.cache.ThreadLiveCache
			 * @instance
			 */
			ThreadLiveCache.prototype.lastReadTs = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

			/**
			 * Creates a new ThreadLiveCache instance using the specified properties.
			 * @function create
			 * @memberof rivet.cache.ThreadLiveCache
			 * @static
			 * @param {rivet.cache.IThreadLiveCache=} [properties] Properties to set
			 * @returns {rivet.cache.ThreadLiveCache} ThreadLiveCache instance
			 */
			ThreadLiveCache.create = function create(properties) {
				return new ThreadLiveCache(properties);
			};

			/**
			 * Encodes the specified ThreadLiveCache message. Does not implicitly {@link rivet.cache.ThreadLiveCache.verify|verify} messages.
			 * @function encode
			 * @memberof rivet.cache.ThreadLiveCache
			 * @static
			 * @param {rivet.cache.IThreadLiveCache} message ThreadLiveCache message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			ThreadLiveCache.encode = function encode(message, writer) {
				if (!writer) writer = $Writer.create();
				if (message.lastReadTs != null && Object.hasOwnProperty.call(message, 'lastReadTs'))
					writer.uint32(/* id 1, wireType 0 =*/ 8).uint64(message.lastReadTs);
				return writer;
			};

			/**
			 * Decodes a ThreadLiveCache message from the specified reader or buffer.
			 * @function decode
			 * @memberof rivet.cache.ThreadLiveCache
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {rivet.cache.ThreadLiveCache} ThreadLiveCache
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			ThreadLiveCache.decode = function decode(reader, length) {
				if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
				let end = length === undefined ? reader.len : reader.pos + length,
					message = new $root.rivet.cache.ThreadLiveCache();
				while (reader.pos < end) {
					let tag = reader.uint32();
					switch (tag >>> 3) {
						case 1:
							message.lastReadTs = reader.uint64();
							break;
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Verifies a ThreadLiveCache message.
			 * @function verify
			 * @memberof rivet.cache.ThreadLiveCache
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			ThreadLiveCache.verify = function verify(message) {
				if (typeof message !== 'object' || message === null) return 'object expected';
				if (message.lastReadTs != null && message.hasOwnProperty('lastReadTs'))
					if (
						!$util.isInteger(message.lastReadTs) &&
						!(
							message.lastReadTs &&
							$util.isInteger(message.lastReadTs.low) &&
							$util.isInteger(message.lastReadTs.high)
						)
					)
						return 'lastReadTs: integer|Long expected';
				return null;
			};

			return ThreadLiveCache;
		})();

		cache.CacheWrapper = (function () {
			/**
			 * Properties of a CacheWrapper.
			 * @memberof rivet.cache
			 * @interface ICacheWrapper
			 * @property {Uint8Array|null} [data] CacheWrapper data
			 * @property {number|Long|null} [ts] CacheWrapper ts
			 * @property {rivet.client.watch_index.IWatchIndex|null} [watchIndex] CacheWrapper watchIndex
			 * @property {string|null} [version] CacheWrapper version
			 */

			/**
			 * Constructs a new CacheWrapper.
			 * @memberof rivet.cache
			 * @classdesc Represents a CacheWrapper.
			 * @implements ICacheWrapper
			 * @constructor
			 * @param {rivet.cache.ICacheWrapper=} [properties] Properties to set
			 */
			function CacheWrapper(properties) {
				if (properties)
					for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
						if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
			}

			/**
			 * CacheWrapper data.
			 * @member {Uint8Array} data
			 * @memberof rivet.cache.CacheWrapper
			 * @instance
			 */
			CacheWrapper.prototype.data = $util.newBuffer([]);

			/**
			 * CacheWrapper ts.
			 * @member {number|Long} ts
			 * @memberof rivet.cache.CacheWrapper
			 * @instance
			 */
			CacheWrapper.prototype.ts = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

			/**
			 * CacheWrapper watchIndex.
			 * @member {rivet.client.watch_index.IWatchIndex|null|undefined} watchIndex
			 * @memberof rivet.cache.CacheWrapper
			 * @instance
			 */
			CacheWrapper.prototype.watchIndex = null;

			/**
			 * CacheWrapper version.
			 * @member {string} version
			 * @memberof rivet.cache.CacheWrapper
			 * @instance
			 */
			CacheWrapper.prototype.version = '';

			// OneOf field names bound to virtual getters and setters
			let $oneOfFields;

			/**
			 * CacheWrapper _watchIndex.
			 * @member {"watchIndex"|undefined} _watchIndex
			 * @memberof rivet.cache.CacheWrapper
			 * @instance
			 */
			Object.defineProperty(CacheWrapper.prototype, '_watchIndex', {
				get: $util.oneOfGetter(($oneOfFields = ['watchIndex'])),
				set: $util.oneOfSetter($oneOfFields)
			});

			/**
			 * Creates a new CacheWrapper instance using the specified properties.
			 * @function create
			 * @memberof rivet.cache.CacheWrapper
			 * @static
			 * @param {rivet.cache.ICacheWrapper=} [properties] Properties to set
			 * @returns {rivet.cache.CacheWrapper} CacheWrapper instance
			 */
			CacheWrapper.create = function create(properties) {
				return new CacheWrapper(properties);
			};

			/**
			 * Encodes the specified CacheWrapper message. Does not implicitly {@link rivet.cache.CacheWrapper.verify|verify} messages.
			 * @function encode
			 * @memberof rivet.cache.CacheWrapper
			 * @static
			 * @param {rivet.cache.ICacheWrapper} message CacheWrapper message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			CacheWrapper.encode = function encode(message, writer) {
				if (!writer) writer = $Writer.create();
				if (message.data != null && Object.hasOwnProperty.call(message, 'data'))
					writer.uint32(/* id 1, wireType 2 =*/ 10).bytes(message.data);
				if (message.ts != null && Object.hasOwnProperty.call(message, 'ts'))
					writer.uint32(/* id 100, wireType 0 =*/ 800).uint64(message.ts);
				if (message.watchIndex != null && Object.hasOwnProperty.call(message, 'watchIndex'))
					$root.rivet.client.watch_index.WatchIndex.encode(
						message.watchIndex,
						writer.uint32(/* id 101, wireType 2 =*/ 810).fork()
					).ldelim();
				if (message.version != null && Object.hasOwnProperty.call(message, 'version'))
					writer.uint32(/* id 102, wireType 2 =*/ 818).string(message.version);
				return writer;
			};

			/**
			 * Decodes a CacheWrapper message from the specified reader or buffer.
			 * @function decode
			 * @memberof rivet.cache.CacheWrapper
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {rivet.cache.CacheWrapper} CacheWrapper
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			CacheWrapper.decode = function decode(reader, length) {
				if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
				let end = length === undefined ? reader.len : reader.pos + length,
					message = new $root.rivet.cache.CacheWrapper();
				while (reader.pos < end) {
					let tag = reader.uint32();
					switch (tag >>> 3) {
						case 1:
							message.data = reader.bytes();
							break;
						case 100:
							message.ts = reader.uint64();
							break;
						case 101:
							message.watchIndex = $root.rivet.client.watch_index.WatchIndex.decode(
								reader,
								reader.uint32()
							);
							break;
						case 102:
							message.version = reader.string();
							break;
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Verifies a CacheWrapper message.
			 * @function verify
			 * @memberof rivet.cache.CacheWrapper
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			CacheWrapper.verify = function verify(message) {
				if (typeof message !== 'object' || message === null) return 'object expected';
				let properties = {};
				if (message.data != null && message.hasOwnProperty('data'))
					if (
						!(
							(message.data && typeof message.data.length === 'number') ||
							$util.isString(message.data)
						)
					)
						return 'data: buffer expected';
				if (message.ts != null && message.hasOwnProperty('ts'))
					if (
						!$util.isInteger(message.ts) &&
						!(message.ts && $util.isInteger(message.ts.low) && $util.isInteger(message.ts.high))
					)
						return 'ts: integer|Long expected';
				if (message.watchIndex != null && message.hasOwnProperty('watchIndex')) {
					properties._watchIndex = 1;
					{
						let error = $root.rivet.client.watch_index.WatchIndex.verify(message.watchIndex);
						if (error) return 'watchIndex.' + error;
					}
				}
				if (message.version != null && message.hasOwnProperty('version'))
					if (!$util.isString(message.version)) return 'version: string expected';
				return null;
			};

			return CacheWrapper;
		})();

		return cache;
	})();

	rivet.client = (function () {
		/**
		 * Namespace client.
		 * @memberof rivet
		 * @namespace
		 */
		const client = {};

		client.blog = (function () {
			/**
			 * Namespace blog.
			 * @memberof rivet.client
			 * @namespace
			 */
			const blog = {};

			blog.PostSummary = (function () {
				/**
				 * Properties of a PostSummary.
				 * @memberof rivet.client.blog
				 * @interface IPostSummary
				 * @property {string|null} [title] PostSummary title
				 * @property {string|null} [url] PostSummary url
				 * @property {string|null} [imageUrl] PostSummary imageUrl
				 * @property {string|null} [author] PostSummary author
				 * @property {Array.<string>|null} [categories] PostSummary categories
				 */

				/**
				 * Constructs a new PostSummary.
				 * @memberof rivet.client.blog
				 * @classdesc Represents a PostSummary.
				 * @implements IPostSummary
				 * @constructor
				 * @param {rivet.client.blog.IPostSummary=} [properties] Properties to set
				 */
				function PostSummary(properties) {
					this.categories = [];
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * PostSummary title.
				 * @member {string} title
				 * @memberof rivet.client.blog.PostSummary
				 * @instance
				 */
				PostSummary.prototype.title = '';

				/**
				 * PostSummary url.
				 * @member {string} url
				 * @memberof rivet.client.blog.PostSummary
				 * @instance
				 */
				PostSummary.prototype.url = '';

				/**
				 * PostSummary imageUrl.
				 * @member {string} imageUrl
				 * @memberof rivet.client.blog.PostSummary
				 * @instance
				 */
				PostSummary.prototype.imageUrl = '';

				/**
				 * PostSummary author.
				 * @member {string} author
				 * @memberof rivet.client.blog.PostSummary
				 * @instance
				 */
				PostSummary.prototype.author = '';

				/**
				 * PostSummary categories.
				 * @member {Array.<string>} categories
				 * @memberof rivet.client.blog.PostSummary
				 * @instance
				 */
				PostSummary.prototype.categories = $util.emptyArray;

				/**
				 * Creates a new PostSummary instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.blog.PostSummary
				 * @static
				 * @param {rivet.client.blog.IPostSummary=} [properties] Properties to set
				 * @returns {rivet.client.blog.PostSummary} PostSummary instance
				 */
				PostSummary.create = function create(properties) {
					return new PostSummary(properties);
				};

				/**
				 * Encodes the specified PostSummary message. Does not implicitly {@link rivet.client.blog.PostSummary.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.blog.PostSummary
				 * @static
				 * @param {rivet.client.blog.IPostSummary} message PostSummary message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				PostSummary.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.title != null && Object.hasOwnProperty.call(message, 'title'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.title);
					if (message.url != null && Object.hasOwnProperty.call(message, 'url'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.url);
					if (message.imageUrl != null && Object.hasOwnProperty.call(message, 'imageUrl'))
						writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.imageUrl);
					if (message.author != null && Object.hasOwnProperty.call(message, 'author'))
						writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.author);
					if (message.categories != null && message.categories.length)
						for (let i = 0; i < message.categories.length; ++i)
							writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.categories[i]);
					return writer;
				};

				/**
				 * Decodes a PostSummary message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.blog.PostSummary
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.blog.PostSummary} PostSummary
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				PostSummary.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.blog.PostSummary();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.title = reader.string();
								break;
							case 2:
								message.url = reader.string();
								break;
							case 3:
								message.imageUrl = reader.string();
								break;
							case 4:
								message.author = reader.string();
								break;
							case 5:
								if (!(message.categories && message.categories.length))
									message.categories = [];
								message.categories.push(reader.string());
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a PostSummary message.
				 * @function verify
				 * @memberof rivet.client.blog.PostSummary
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				PostSummary.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.title != null && message.hasOwnProperty('title'))
						if (!$util.isString(message.title)) return 'title: string expected';
					if (message.url != null && message.hasOwnProperty('url'))
						if (!$util.isString(message.url)) return 'url: string expected';
					if (message.imageUrl != null && message.hasOwnProperty('imageUrl'))
						if (!$util.isString(message.imageUrl)) return 'imageUrl: string expected';
					if (message.author != null && message.hasOwnProperty('author'))
						if (!$util.isString(message.author)) return 'author: string expected';
					if (message.categories != null && message.hasOwnProperty('categories')) {
						if (!Array.isArray(message.categories)) return 'categories: array expected';
						for (let i = 0; i < message.categories.length; ++i)
							if (!$util.isString(message.categories[i]))
								return 'categories: string[] expected';
					}
					return null;
				};

				return PostSummary;
			})();

			return blog;
		})();

		client.changelog = (function () {
			/**
			 * Namespace changelog.
			 * @memberof rivet.client
			 * @namespace
			 */
			const changelog = {};

			changelog.Entry = (function () {
				/**
				 * Properties of an Entry.
				 * @memberof rivet.client.changelog
				 * @interface IEntry
				 * @property {string|null} [id] Entry id
				 * @property {rivet.client.identity.IHandle|null} [author] Entry author
				 * @property {number|Long|null} [ts] Entry ts
				 * @property {string|null} [title] Entry title
				 * @property {string|null} [body] Entry body
				 * @property {string|null} [thumbnailUrl] Entry thumbnailUrl
				 */

				/**
				 * Constructs a new Entry.
				 * @memberof rivet.client.changelog
				 * @classdesc Represents an Entry.
				 * @implements IEntry
				 * @constructor
				 * @param {rivet.client.changelog.IEntry=} [properties] Properties to set
				 */
				function Entry(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Entry id.
				 * @member {string} id
				 * @memberof rivet.client.changelog.Entry
				 * @instance
				 */
				Entry.prototype.id = '';

				/**
				 * Entry author.
				 * @member {rivet.client.identity.IHandle|null|undefined} author
				 * @memberof rivet.client.changelog.Entry
				 * @instance
				 */
				Entry.prototype.author = null;

				/**
				 * Entry ts.
				 * @member {number|Long} ts
				 * @memberof rivet.client.changelog.Entry
				 * @instance
				 */
				Entry.prototype.ts = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

				/**
				 * Entry title.
				 * @member {string} title
				 * @memberof rivet.client.changelog.Entry
				 * @instance
				 */
				Entry.prototype.title = '';

				/**
				 * Entry body.
				 * @member {string} body
				 * @memberof rivet.client.changelog.Entry
				 * @instance
				 */
				Entry.prototype.body = '';

				/**
				 * Entry thumbnailUrl.
				 * @member {string} thumbnailUrl
				 * @memberof rivet.client.changelog.Entry
				 * @instance
				 */
				Entry.prototype.thumbnailUrl = '';

				/**
				 * Creates a new Entry instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.changelog.Entry
				 * @static
				 * @param {rivet.client.changelog.IEntry=} [properties] Properties to set
				 * @returns {rivet.client.changelog.Entry} Entry instance
				 */
				Entry.create = function create(properties) {
					return new Entry(properties);
				};

				/**
				 * Encodes the specified Entry message. Does not implicitly {@link rivet.client.changelog.Entry.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.changelog.Entry
				 * @static
				 * @param {rivet.client.changelog.IEntry} message Entry message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Entry.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
					if (message.author != null && Object.hasOwnProperty.call(message, 'author'))
						$root.rivet.client.identity.Handle.encode(
							message.author,
							writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
						).ldelim();
					if (message.ts != null && Object.hasOwnProperty.call(message, 'ts'))
						writer.uint32(/* id 3, wireType 0 =*/ 24).uint64(message.ts);
					if (message.title != null && Object.hasOwnProperty.call(message, 'title'))
						writer.uint32(/* id 100, wireType 2 =*/ 802).string(message.title);
					if (message.body != null && Object.hasOwnProperty.call(message, 'body'))
						writer.uint32(/* id 101, wireType 2 =*/ 810).string(message.body);
					if (message.thumbnailUrl != null && Object.hasOwnProperty.call(message, 'thumbnailUrl'))
						writer.uint32(/* id 102, wireType 2 =*/ 818).string(message.thumbnailUrl);
					return writer;
				};

				/**
				 * Decodes an Entry message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.changelog.Entry
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.changelog.Entry} Entry
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Entry.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.changelog.Entry();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.id = reader.string();
								break;
							case 2:
								message.author = $root.rivet.client.identity.Handle.decode(
									reader,
									reader.uint32()
								);
								break;
							case 3:
								message.ts = reader.uint64();
								break;
							case 100:
								message.title = reader.string();
								break;
							case 101:
								message.body = reader.string();
								break;
							case 102:
								message.thumbnailUrl = reader.string();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies an Entry message.
				 * @function verify
				 * @memberof rivet.client.changelog.Entry
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Entry.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.id != null && message.hasOwnProperty('id'))
						if (!$util.isString(message.id)) return 'id: string expected';
					if (message.author != null && message.hasOwnProperty('author')) {
						let error = $root.rivet.client.identity.Handle.verify(message.author);
						if (error) return 'author.' + error;
					}
					if (message.ts != null && message.hasOwnProperty('ts'))
						if (
							!$util.isInteger(message.ts) &&
							!(
								message.ts &&
								$util.isInteger(message.ts.low) &&
								$util.isInteger(message.ts.high)
							)
						)
							return 'ts: integer|Long expected';
					if (message.title != null && message.hasOwnProperty('title'))
						if (!$util.isString(message.title)) return 'title: string expected';
					if (message.body != null && message.hasOwnProperty('body'))
						if (!$util.isString(message.body)) return 'body: string expected';
					if (message.thumbnailUrl != null && message.hasOwnProperty('thumbnailUrl'))
						if (!$util.isString(message.thumbnailUrl)) return 'thumbnailUrl: string expected';
					return null;
				};

				return Entry;
			})();

			return changelog;
		})();

		client.chat = (function () {
			/**
			 * Namespace chat.
			 * @memberof rivet.client
			 * @namespace
			 */
			const chat = {};

			chat.ThreadExternalLinks = (function () {
				/**
				 * Properties of a ThreadExternalLinks.
				 * @memberof rivet.client.chat
				 * @interface IThreadExternalLinks
				 * @property {string|null} [chat] ThreadExternalLinks chat
				 */

				/**
				 * Constructs a new ThreadExternalLinks.
				 * @memberof rivet.client.chat
				 * @classdesc Represents a ThreadExternalLinks.
				 * @implements IThreadExternalLinks
				 * @constructor
				 * @param {rivet.client.chat.IThreadExternalLinks=} [properties] Properties to set
				 */
				function ThreadExternalLinks(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * ThreadExternalLinks chat.
				 * @member {string} chat
				 * @memberof rivet.client.chat.ThreadExternalLinks
				 * @instance
				 */
				ThreadExternalLinks.prototype.chat = '';

				/**
				 * Creates a new ThreadExternalLinks instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.chat.ThreadExternalLinks
				 * @static
				 * @param {rivet.client.chat.IThreadExternalLinks=} [properties] Properties to set
				 * @returns {rivet.client.chat.ThreadExternalLinks} ThreadExternalLinks instance
				 */
				ThreadExternalLinks.create = function create(properties) {
					return new ThreadExternalLinks(properties);
				};

				/**
				 * Encodes the specified ThreadExternalLinks message. Does not implicitly {@link rivet.client.chat.ThreadExternalLinks.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.chat.ThreadExternalLinks
				 * @static
				 * @param {rivet.client.chat.IThreadExternalLinks} message ThreadExternalLinks message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				ThreadExternalLinks.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.chat != null && Object.hasOwnProperty.call(message, 'chat'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.chat);
					return writer;
				};

				/**
				 * Decodes a ThreadExternalLinks message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.chat.ThreadExternalLinks
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.chat.ThreadExternalLinks} ThreadExternalLinks
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				ThreadExternalLinks.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.chat.ThreadExternalLinks();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.chat = reader.string();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a ThreadExternalLinks message.
				 * @function verify
				 * @memberof rivet.client.chat.ThreadExternalLinks
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				ThreadExternalLinks.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.chat != null && message.hasOwnProperty('chat'))
						if (!$util.isString(message.chat)) return 'chat: string expected';
					return null;
				};

				return ThreadExternalLinks;
			})();

			chat.Message = (function () {
				/**
				 * Properties of a Message.
				 * @memberof rivet.client.chat
				 * @interface IMessage
				 * @property {string|null} [id] Message id
				 * @property {string|null} [threadId] Message threadId
				 * @property {number|Long|null} [sendTs] Message sendTs
				 * @property {rivet.client.chat.IMessageBody|null} [body] Message body
				 */

				/**
				 * Constructs a new Message.
				 * @memberof rivet.client.chat
				 * @classdesc Represents a Message.
				 * @implements IMessage
				 * @constructor
				 * @param {rivet.client.chat.IMessage=} [properties] Properties to set
				 */
				function Message(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Message id.
				 * @member {string} id
				 * @memberof rivet.client.chat.Message
				 * @instance
				 */
				Message.prototype.id = '';

				/**
				 * Message threadId.
				 * @member {string} threadId
				 * @memberof rivet.client.chat.Message
				 * @instance
				 */
				Message.prototype.threadId = '';

				/**
				 * Message sendTs.
				 * @member {number|Long} sendTs
				 * @memberof rivet.client.chat.Message
				 * @instance
				 */
				Message.prototype.sendTs = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

				/**
				 * Message body.
				 * @member {rivet.client.chat.IMessageBody|null|undefined} body
				 * @memberof rivet.client.chat.Message
				 * @instance
				 */
				Message.prototype.body = null;

				/**
				 * Creates a new Message instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.chat.Message
				 * @static
				 * @param {rivet.client.chat.IMessage=} [properties] Properties to set
				 * @returns {rivet.client.chat.Message} Message instance
				 */
				Message.create = function create(properties) {
					return new Message(properties);
				};

				/**
				 * Encodes the specified Message message. Does not implicitly {@link rivet.client.chat.Message.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.chat.Message
				 * @static
				 * @param {rivet.client.chat.IMessage} message Message message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Message.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
					if (message.threadId != null && Object.hasOwnProperty.call(message, 'threadId'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.threadId);
					if (message.sendTs != null && Object.hasOwnProperty.call(message, 'sendTs'))
						writer.uint32(/* id 3, wireType 0 =*/ 24).uint64(message.sendTs);
					if (message.body != null && Object.hasOwnProperty.call(message, 'body'))
						$root.rivet.client.chat.MessageBody.encode(
							message.body,
							writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
						).ldelim();
					return writer;
				};

				/**
				 * Decodes a Message message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.chat.Message
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.chat.Message} Message
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Message.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.chat.Message();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.id = reader.string();
								break;
							case 2:
								message.threadId = reader.string();
								break;
							case 3:
								message.sendTs = reader.uint64();
								break;
							case 4:
								message.body = $root.rivet.client.chat.MessageBody.decode(
									reader,
									reader.uint32()
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Message message.
				 * @function verify
				 * @memberof rivet.client.chat.Message
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Message.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.id != null && message.hasOwnProperty('id'))
						if (!$util.isString(message.id)) return 'id: string expected';
					if (message.threadId != null && message.hasOwnProperty('threadId'))
						if (!$util.isString(message.threadId)) return 'threadId: string expected';
					if (message.sendTs != null && message.hasOwnProperty('sendTs'))
						if (
							!$util.isInteger(message.sendTs) &&
							!(
								message.sendTs &&
								$util.isInteger(message.sendTs.low) &&
								$util.isInteger(message.sendTs.high)
							)
						)
							return 'sendTs: integer|Long expected';
					if (message.body != null && message.hasOwnProperty('body')) {
						let error = $root.rivet.client.chat.MessageBody.verify(message.body);
						if (error) return 'body.' + error;
					}
					return null;
				};

				return Message;
			})();

			chat.MessageBody = (function () {
				/**
				 * Properties of a MessageBody.
				 * @memberof rivet.client.chat
				 * @interface IMessageBody
				 * @property {rivet.client.chat.MessageBody.IText|null} [text] MessageBody text
				 * @property {rivet.client.chat.MessageBody.IChatCreate|null} [chatCreate] MessageBody chatCreate
				 * @property {rivet.client.chat.MessageBody.IIdentityFollow|null} [identityFollow] MessageBody identityFollow
				 * @property {rivet.client.chat.MessageBody.IGroupJoin|null} [groupJoin] MessageBody groupJoin
				 * @property {rivet.client.chat.MessageBody.IGroupLeave|null} [groupLeave] MessageBody groupLeave
				 * @property {rivet.client.chat.MessageBody.IPartyInvite|null} [partyInvite] MessageBody partyInvite
				 * @property {rivet.client.chat.MessageBody.IPartyJoin|null} [partyJoin] MessageBody partyJoin
				 * @property {rivet.client.chat.MessageBody.IPartyLeave|null} [partyLeave] MessageBody partyLeave
				 * @property {rivet.client.chat.MessageBody.IPartyActivityChange|null} [partyActivityChange] MessageBody partyActivityChange
				 */

				/**
				 * Constructs a new MessageBody.
				 * @memberof rivet.client.chat
				 * @classdesc Represents a MessageBody.
				 * @implements IMessageBody
				 * @constructor
				 * @param {rivet.client.chat.IMessageBody=} [properties] Properties to set
				 */
				function MessageBody(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * MessageBody text.
				 * @member {rivet.client.chat.MessageBody.IText|null|undefined} text
				 * @memberof rivet.client.chat.MessageBody
				 * @instance
				 */
				MessageBody.prototype.text = null;

				/**
				 * MessageBody chatCreate.
				 * @member {rivet.client.chat.MessageBody.IChatCreate|null|undefined} chatCreate
				 * @memberof rivet.client.chat.MessageBody
				 * @instance
				 */
				MessageBody.prototype.chatCreate = null;

				/**
				 * MessageBody identityFollow.
				 * @member {rivet.client.chat.MessageBody.IIdentityFollow|null|undefined} identityFollow
				 * @memberof rivet.client.chat.MessageBody
				 * @instance
				 */
				MessageBody.prototype.identityFollow = null;

				/**
				 * MessageBody groupJoin.
				 * @member {rivet.client.chat.MessageBody.IGroupJoin|null|undefined} groupJoin
				 * @memberof rivet.client.chat.MessageBody
				 * @instance
				 */
				MessageBody.prototype.groupJoin = null;

				/**
				 * MessageBody groupLeave.
				 * @member {rivet.client.chat.MessageBody.IGroupLeave|null|undefined} groupLeave
				 * @memberof rivet.client.chat.MessageBody
				 * @instance
				 */
				MessageBody.prototype.groupLeave = null;

				/**
				 * MessageBody partyInvite.
				 * @member {rivet.client.chat.MessageBody.IPartyInvite|null|undefined} partyInvite
				 * @memberof rivet.client.chat.MessageBody
				 * @instance
				 */
				MessageBody.prototype.partyInvite = null;

				/**
				 * MessageBody partyJoin.
				 * @member {rivet.client.chat.MessageBody.IPartyJoin|null|undefined} partyJoin
				 * @memberof rivet.client.chat.MessageBody
				 * @instance
				 */
				MessageBody.prototype.partyJoin = null;

				/**
				 * MessageBody partyLeave.
				 * @member {rivet.client.chat.MessageBody.IPartyLeave|null|undefined} partyLeave
				 * @memberof rivet.client.chat.MessageBody
				 * @instance
				 */
				MessageBody.prototype.partyLeave = null;

				/**
				 * MessageBody partyActivityChange.
				 * @member {rivet.client.chat.MessageBody.IPartyActivityChange|null|undefined} partyActivityChange
				 * @memberof rivet.client.chat.MessageBody
				 * @instance
				 */
				MessageBody.prototype.partyActivityChange = null;

				// OneOf field names bound to virtual getters and setters
				let $oneOfFields;

				/**
				 * MessageBody kind.
				 * @member {"text"|"chatCreate"|"identityFollow"|"groupJoin"|"groupLeave"|"partyInvite"|"partyJoin"|"partyLeave"|"partyActivityChange"|undefined} kind
				 * @memberof rivet.client.chat.MessageBody
				 * @instance
				 */
				Object.defineProperty(MessageBody.prototype, 'kind', {
					get: $util.oneOfGetter(
						($oneOfFields = [
							'text',
							'chatCreate',
							'identityFollow',
							'groupJoin',
							'groupLeave',
							'partyInvite',
							'partyJoin',
							'partyLeave',
							'partyActivityChange'
						])
					),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Creates a new MessageBody instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.chat.MessageBody
				 * @static
				 * @param {rivet.client.chat.IMessageBody=} [properties] Properties to set
				 * @returns {rivet.client.chat.MessageBody} MessageBody instance
				 */
				MessageBody.create = function create(properties) {
					return new MessageBody(properties);
				};

				/**
				 * Encodes the specified MessageBody message. Does not implicitly {@link rivet.client.chat.MessageBody.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.chat.MessageBody
				 * @static
				 * @param {rivet.client.chat.IMessageBody} message MessageBody message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				MessageBody.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.text != null && Object.hasOwnProperty.call(message, 'text'))
						$root.rivet.client.chat.MessageBody.Text.encode(
							message.text,
							writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
						).ldelim();
					if (message.chatCreate != null && Object.hasOwnProperty.call(message, 'chatCreate'))
						$root.rivet.client.chat.MessageBody.ChatCreate.encode(
							message.chatCreate,
							writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
						).ldelim();
					if (
						message.identityFollow != null &&
						Object.hasOwnProperty.call(message, 'identityFollow')
					)
						$root.rivet.client.chat.MessageBody.IdentityFollow.encode(
							message.identityFollow,
							writer.uint32(/* id 101, wireType 2 =*/ 810).fork()
						).ldelim();
					if (message.groupJoin != null && Object.hasOwnProperty.call(message, 'groupJoin'))
						$root.rivet.client.chat.MessageBody.GroupJoin.encode(
							message.groupJoin,
							writer.uint32(/* id 201, wireType 2 =*/ 1610).fork()
						).ldelim();
					if (message.groupLeave != null && Object.hasOwnProperty.call(message, 'groupLeave'))
						$root.rivet.client.chat.MessageBody.GroupLeave.encode(
							message.groupLeave,
							writer.uint32(/* id 202, wireType 2 =*/ 1618).fork()
						).ldelim();
					if (message.partyInvite != null && Object.hasOwnProperty.call(message, 'partyInvite'))
						$root.rivet.client.chat.MessageBody.PartyInvite.encode(
							message.partyInvite,
							writer.uint32(/* id 301, wireType 2 =*/ 2410).fork()
						).ldelim();
					if (message.partyJoin != null && Object.hasOwnProperty.call(message, 'partyJoin'))
						$root.rivet.client.chat.MessageBody.PartyJoin.encode(
							message.partyJoin,
							writer.uint32(/* id 302, wireType 2 =*/ 2418).fork()
						).ldelim();
					if (message.partyLeave != null && Object.hasOwnProperty.call(message, 'partyLeave'))
						$root.rivet.client.chat.MessageBody.PartyLeave.encode(
							message.partyLeave,
							writer.uint32(/* id 303, wireType 2 =*/ 2426).fork()
						).ldelim();
					if (
						message.partyActivityChange != null &&
						Object.hasOwnProperty.call(message, 'partyActivityChange')
					)
						$root.rivet.client.chat.MessageBody.PartyActivityChange.encode(
							message.partyActivityChange,
							writer.uint32(/* id 304, wireType 2 =*/ 2434).fork()
						).ldelim();
					return writer;
				};

				/**
				 * Decodes a MessageBody message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.chat.MessageBody
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.chat.MessageBody} MessageBody
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				MessageBody.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.chat.MessageBody();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 2:
								message.text = $root.rivet.client.chat.MessageBody.Text.decode(
									reader,
									reader.uint32()
								);
								break;
							case 3:
								message.chatCreate = $root.rivet.client.chat.MessageBody.ChatCreate.decode(
									reader,
									reader.uint32()
								);
								break;
							case 101:
								message.identityFollow =
									$root.rivet.client.chat.MessageBody.IdentityFollow.decode(
										reader,
										reader.uint32()
									);
								break;
							case 201:
								message.groupJoin = $root.rivet.client.chat.MessageBody.GroupJoin.decode(
									reader,
									reader.uint32()
								);
								break;
							case 202:
								message.groupLeave = $root.rivet.client.chat.MessageBody.GroupLeave.decode(
									reader,
									reader.uint32()
								);
								break;
							case 301:
								message.partyInvite = $root.rivet.client.chat.MessageBody.PartyInvite.decode(
									reader,
									reader.uint32()
								);
								break;
							case 302:
								message.partyJoin = $root.rivet.client.chat.MessageBody.PartyJoin.decode(
									reader,
									reader.uint32()
								);
								break;
							case 303:
								message.partyLeave = $root.rivet.client.chat.MessageBody.PartyLeave.decode(
									reader,
									reader.uint32()
								);
								break;
							case 304:
								message.partyActivityChange =
									$root.rivet.client.chat.MessageBody.PartyActivityChange.decode(
										reader,
										reader.uint32()
									);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a MessageBody message.
				 * @function verify
				 * @memberof rivet.client.chat.MessageBody
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				MessageBody.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					let properties = {};
					if (message.text != null && message.hasOwnProperty('text')) {
						properties.kind = 1;
						{
							let error = $root.rivet.client.chat.MessageBody.Text.verify(message.text);
							if (error) return 'text.' + error;
						}
					}
					if (message.chatCreate != null && message.hasOwnProperty('chatCreate')) {
						if (properties.kind === 1) return 'kind: multiple values';
						properties.kind = 1;
						{
							let error = $root.rivet.client.chat.MessageBody.ChatCreate.verify(
								message.chatCreate
							);
							if (error) return 'chatCreate.' + error;
						}
					}
					if (message.identityFollow != null && message.hasOwnProperty('identityFollow')) {
						if (properties.kind === 1) return 'kind: multiple values';
						properties.kind = 1;
						{
							let error = $root.rivet.client.chat.MessageBody.IdentityFollow.verify(
								message.identityFollow
							);
							if (error) return 'identityFollow.' + error;
						}
					}
					if (message.groupJoin != null && message.hasOwnProperty('groupJoin')) {
						if (properties.kind === 1) return 'kind: multiple values';
						properties.kind = 1;
						{
							let error = $root.rivet.client.chat.MessageBody.GroupJoin.verify(
								message.groupJoin
							);
							if (error) return 'groupJoin.' + error;
						}
					}
					if (message.groupLeave != null && message.hasOwnProperty('groupLeave')) {
						if (properties.kind === 1) return 'kind: multiple values';
						properties.kind = 1;
						{
							let error = $root.rivet.client.chat.MessageBody.GroupLeave.verify(
								message.groupLeave
							);
							if (error) return 'groupLeave.' + error;
						}
					}
					if (message.partyInvite != null && message.hasOwnProperty('partyInvite')) {
						if (properties.kind === 1) return 'kind: multiple values';
						properties.kind = 1;
						{
							let error = $root.rivet.client.chat.MessageBody.PartyInvite.verify(
								message.partyInvite
							);
							if (error) return 'partyInvite.' + error;
						}
					}
					if (message.partyJoin != null && message.hasOwnProperty('partyJoin')) {
						if (properties.kind === 1) return 'kind: multiple values';
						properties.kind = 1;
						{
							let error = $root.rivet.client.chat.MessageBody.PartyJoin.verify(
								message.partyJoin
							);
							if (error) return 'partyJoin.' + error;
						}
					}
					if (message.partyLeave != null && message.hasOwnProperty('partyLeave')) {
						if (properties.kind === 1) return 'kind: multiple values';
						properties.kind = 1;
						{
							let error = $root.rivet.client.chat.MessageBody.PartyLeave.verify(
								message.partyLeave
							);
							if (error) return 'partyLeave.' + error;
						}
					}
					if (
						message.partyActivityChange != null &&
						message.hasOwnProperty('partyActivityChange')
					) {
						if (properties.kind === 1) return 'kind: multiple values';
						properties.kind = 1;
						{
							let error = $root.rivet.client.chat.MessageBody.PartyActivityChange.verify(
								message.partyActivityChange
							);
							if (error) return 'partyActivityChange.' + error;
						}
					}
					return null;
				};

				MessageBody.Text = (function () {
					/**
					 * Properties of a Text.
					 * @memberof rivet.client.chat.MessageBody
					 * @interface IText
					 * @property {rivet.client.identity.IHandle|null} [sender] Text sender
					 * @property {string|null} [body] Text body
					 */

					/**
					 * Constructs a new Text.
					 * @memberof rivet.client.chat.MessageBody
					 * @classdesc Represents a Text.
					 * @implements IText
					 * @constructor
					 * @param {rivet.client.chat.MessageBody.IText=} [properties] Properties to set
					 */
					function Text(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * Text sender.
					 * @member {rivet.client.identity.IHandle|null|undefined} sender
					 * @memberof rivet.client.chat.MessageBody.Text
					 * @instance
					 */
					Text.prototype.sender = null;

					/**
					 * Text body.
					 * @member {string} body
					 * @memberof rivet.client.chat.MessageBody.Text
					 * @instance
					 */
					Text.prototype.body = '';

					/**
					 * Creates a new Text instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.chat.MessageBody.Text
					 * @static
					 * @param {rivet.client.chat.MessageBody.IText=} [properties] Properties to set
					 * @returns {rivet.client.chat.MessageBody.Text} Text instance
					 */
					Text.create = function create(properties) {
						return new Text(properties);
					};

					/**
					 * Encodes the specified Text message. Does not implicitly {@link rivet.client.chat.MessageBody.Text.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.chat.MessageBody.Text
					 * @static
					 * @param {rivet.client.chat.MessageBody.IText} message Text message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					Text.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.sender != null && Object.hasOwnProperty.call(message, 'sender'))
							$root.rivet.client.identity.Handle.encode(
								message.sender,
								writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
							).ldelim();
						if (message.body != null && Object.hasOwnProperty.call(message, 'body'))
							writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.body);
						return writer;
					};

					/**
					 * Decodes a Text message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.chat.MessageBody.Text
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.chat.MessageBody.Text} Text
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					Text.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.chat.MessageBody.Text();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.sender = $root.rivet.client.identity.Handle.decode(
										reader,
										reader.uint32()
									);
									break;
								case 2:
									message.body = reader.string();
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a Text message.
					 * @function verify
					 * @memberof rivet.client.chat.MessageBody.Text
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					Text.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						if (message.sender != null && message.hasOwnProperty('sender')) {
							let error = $root.rivet.client.identity.Handle.verify(message.sender);
							if (error) return 'sender.' + error;
						}
						if (message.body != null && message.hasOwnProperty('body'))
							if (!$util.isString(message.body)) return 'body: string expected';
						return null;
					};

					return Text;
				})();

				MessageBody.ChatCreate = (function () {
					/**
					 * Properties of a ChatCreate.
					 * @memberof rivet.client.chat.MessageBody
					 * @interface IChatCreate
					 */

					/**
					 * Constructs a new ChatCreate.
					 * @memberof rivet.client.chat.MessageBody
					 * @classdesc Represents a ChatCreate.
					 * @implements IChatCreate
					 * @constructor
					 * @param {rivet.client.chat.MessageBody.IChatCreate=} [properties] Properties to set
					 */
					function ChatCreate(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * Creates a new ChatCreate instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.chat.MessageBody.ChatCreate
					 * @static
					 * @param {rivet.client.chat.MessageBody.IChatCreate=} [properties] Properties to set
					 * @returns {rivet.client.chat.MessageBody.ChatCreate} ChatCreate instance
					 */
					ChatCreate.create = function create(properties) {
						return new ChatCreate(properties);
					};

					/**
					 * Encodes the specified ChatCreate message. Does not implicitly {@link rivet.client.chat.MessageBody.ChatCreate.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.chat.MessageBody.ChatCreate
					 * @static
					 * @param {rivet.client.chat.MessageBody.IChatCreate} message ChatCreate message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					ChatCreate.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						return writer;
					};

					/**
					 * Decodes a ChatCreate message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.chat.MessageBody.ChatCreate
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.chat.MessageBody.ChatCreate} ChatCreate
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					ChatCreate.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.chat.MessageBody.ChatCreate();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a ChatCreate message.
					 * @function verify
					 * @memberof rivet.client.chat.MessageBody.ChatCreate
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					ChatCreate.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						return null;
					};

					return ChatCreate;
				})();

				MessageBody.IdentityFollow = (function () {
					/**
					 * Properties of an IdentityFollow.
					 * @memberof rivet.client.chat.MessageBody
					 * @interface IIdentityFollow
					 */

					/**
					 * Constructs a new IdentityFollow.
					 * @memberof rivet.client.chat.MessageBody
					 * @classdesc Represents an IdentityFollow.
					 * @implements IIdentityFollow
					 * @constructor
					 * @param {rivet.client.chat.MessageBody.IIdentityFollow=} [properties] Properties to set
					 */
					function IdentityFollow(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * Creates a new IdentityFollow instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.chat.MessageBody.IdentityFollow
					 * @static
					 * @param {rivet.client.chat.MessageBody.IIdentityFollow=} [properties] Properties to set
					 * @returns {rivet.client.chat.MessageBody.IdentityFollow} IdentityFollow instance
					 */
					IdentityFollow.create = function create(properties) {
						return new IdentityFollow(properties);
					};

					/**
					 * Encodes the specified IdentityFollow message. Does not implicitly {@link rivet.client.chat.MessageBody.IdentityFollow.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.chat.MessageBody.IdentityFollow
					 * @static
					 * @param {rivet.client.chat.MessageBody.IIdentityFollow} message IdentityFollow message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					IdentityFollow.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						return writer;
					};

					/**
					 * Decodes an IdentityFollow message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.chat.MessageBody.IdentityFollow
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.chat.MessageBody.IdentityFollow} IdentityFollow
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					IdentityFollow.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.chat.MessageBody.IdentityFollow();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies an IdentityFollow message.
					 * @function verify
					 * @memberof rivet.client.chat.MessageBody.IdentityFollow
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					IdentityFollow.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						return null;
					};

					return IdentityFollow;
				})();

				MessageBody.GroupJoin = (function () {
					/**
					 * Properties of a GroupJoin.
					 * @memberof rivet.client.chat.MessageBody
					 * @interface IGroupJoin
					 * @property {rivet.client.identity.IHandle|null} [identity] GroupJoin identity
					 */

					/**
					 * Constructs a new GroupJoin.
					 * @memberof rivet.client.chat.MessageBody
					 * @classdesc Represents a GroupJoin.
					 * @implements IGroupJoin
					 * @constructor
					 * @param {rivet.client.chat.MessageBody.IGroupJoin=} [properties] Properties to set
					 */
					function GroupJoin(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * GroupJoin identity.
					 * @member {rivet.client.identity.IHandle|null|undefined} identity
					 * @memberof rivet.client.chat.MessageBody.GroupJoin
					 * @instance
					 */
					GroupJoin.prototype.identity = null;

					/**
					 * Creates a new GroupJoin instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.chat.MessageBody.GroupJoin
					 * @static
					 * @param {rivet.client.chat.MessageBody.IGroupJoin=} [properties] Properties to set
					 * @returns {rivet.client.chat.MessageBody.GroupJoin} GroupJoin instance
					 */
					GroupJoin.create = function create(properties) {
						return new GroupJoin(properties);
					};

					/**
					 * Encodes the specified GroupJoin message. Does not implicitly {@link rivet.client.chat.MessageBody.GroupJoin.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.chat.MessageBody.GroupJoin
					 * @static
					 * @param {rivet.client.chat.MessageBody.IGroupJoin} message GroupJoin message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					GroupJoin.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.identity != null && Object.hasOwnProperty.call(message, 'identity'))
							$root.rivet.client.identity.Handle.encode(
								message.identity,
								writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
							).ldelim();
						return writer;
					};

					/**
					 * Decodes a GroupJoin message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.chat.MessageBody.GroupJoin
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.chat.MessageBody.GroupJoin} GroupJoin
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					GroupJoin.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.chat.MessageBody.GroupJoin();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.identity = $root.rivet.client.identity.Handle.decode(
										reader,
										reader.uint32()
									);
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a GroupJoin message.
					 * @function verify
					 * @memberof rivet.client.chat.MessageBody.GroupJoin
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					GroupJoin.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						if (message.identity != null && message.hasOwnProperty('identity')) {
							let error = $root.rivet.client.identity.Handle.verify(message.identity);
							if (error) return 'identity.' + error;
						}
						return null;
					};

					return GroupJoin;
				})();

				MessageBody.GroupLeave = (function () {
					/**
					 * Properties of a GroupLeave.
					 * @memberof rivet.client.chat.MessageBody
					 * @interface IGroupLeave
					 * @property {rivet.client.identity.IHandle|null} [identity] GroupLeave identity
					 */

					/**
					 * Constructs a new GroupLeave.
					 * @memberof rivet.client.chat.MessageBody
					 * @classdesc Represents a GroupLeave.
					 * @implements IGroupLeave
					 * @constructor
					 * @param {rivet.client.chat.MessageBody.IGroupLeave=} [properties] Properties to set
					 */
					function GroupLeave(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * GroupLeave identity.
					 * @member {rivet.client.identity.IHandle|null|undefined} identity
					 * @memberof rivet.client.chat.MessageBody.GroupLeave
					 * @instance
					 */
					GroupLeave.prototype.identity = null;

					/**
					 * Creates a new GroupLeave instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.chat.MessageBody.GroupLeave
					 * @static
					 * @param {rivet.client.chat.MessageBody.IGroupLeave=} [properties] Properties to set
					 * @returns {rivet.client.chat.MessageBody.GroupLeave} GroupLeave instance
					 */
					GroupLeave.create = function create(properties) {
						return new GroupLeave(properties);
					};

					/**
					 * Encodes the specified GroupLeave message. Does not implicitly {@link rivet.client.chat.MessageBody.GroupLeave.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.chat.MessageBody.GroupLeave
					 * @static
					 * @param {rivet.client.chat.MessageBody.IGroupLeave} message GroupLeave message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					GroupLeave.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.identity != null && Object.hasOwnProperty.call(message, 'identity'))
							$root.rivet.client.identity.Handle.encode(
								message.identity,
								writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
							).ldelim();
						return writer;
					};

					/**
					 * Decodes a GroupLeave message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.chat.MessageBody.GroupLeave
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.chat.MessageBody.GroupLeave} GroupLeave
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					GroupLeave.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.chat.MessageBody.GroupLeave();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.identity = $root.rivet.client.identity.Handle.decode(
										reader,
										reader.uint32()
									);
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a GroupLeave message.
					 * @function verify
					 * @memberof rivet.client.chat.MessageBody.GroupLeave
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					GroupLeave.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						if (message.identity != null && message.hasOwnProperty('identity')) {
							let error = $root.rivet.client.identity.Handle.verify(message.identity);
							if (error) return 'identity.' + error;
						}
						return null;
					};

					return GroupLeave;
				})();

				MessageBody.PartyInvite = (function () {
					/**
					 * Properties of a PartyInvite.
					 * @memberof rivet.client.chat.MessageBody
					 * @interface IPartyInvite
					 * @property {rivet.client.identity.IHandle|null} [sender] PartyInvite sender
					 * @property {rivet.client.party.IHandle|null} [party] PartyInvite party
					 * @property {string|null} [inviteToken] PartyInvite inviteToken
					 */

					/**
					 * Constructs a new PartyInvite.
					 * @memberof rivet.client.chat.MessageBody
					 * @classdesc Represents a PartyInvite.
					 * @implements IPartyInvite
					 * @constructor
					 * @param {rivet.client.chat.MessageBody.IPartyInvite=} [properties] Properties to set
					 */
					function PartyInvite(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * PartyInvite sender.
					 * @member {rivet.client.identity.IHandle|null|undefined} sender
					 * @memberof rivet.client.chat.MessageBody.PartyInvite
					 * @instance
					 */
					PartyInvite.prototype.sender = null;

					/**
					 * PartyInvite party.
					 * @member {rivet.client.party.IHandle|null|undefined} party
					 * @memberof rivet.client.chat.MessageBody.PartyInvite
					 * @instance
					 */
					PartyInvite.prototype.party = null;

					/**
					 * PartyInvite inviteToken.
					 * @member {string|null|undefined} inviteToken
					 * @memberof rivet.client.chat.MessageBody.PartyInvite
					 * @instance
					 */
					PartyInvite.prototype.inviteToken = null;

					// OneOf field names bound to virtual getters and setters
					let $oneOfFields;

					/**
					 * PartyInvite _party.
					 * @member {"party"|undefined} _party
					 * @memberof rivet.client.chat.MessageBody.PartyInvite
					 * @instance
					 */
					Object.defineProperty(PartyInvite.prototype, '_party', {
						get: $util.oneOfGetter(($oneOfFields = ['party'])),
						set: $util.oneOfSetter($oneOfFields)
					});

					/**
					 * PartyInvite _inviteToken.
					 * @member {"inviteToken"|undefined} _inviteToken
					 * @memberof rivet.client.chat.MessageBody.PartyInvite
					 * @instance
					 */
					Object.defineProperty(PartyInvite.prototype, '_inviteToken', {
						get: $util.oneOfGetter(($oneOfFields = ['inviteToken'])),
						set: $util.oneOfSetter($oneOfFields)
					});

					/**
					 * Creates a new PartyInvite instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.chat.MessageBody.PartyInvite
					 * @static
					 * @param {rivet.client.chat.MessageBody.IPartyInvite=} [properties] Properties to set
					 * @returns {rivet.client.chat.MessageBody.PartyInvite} PartyInvite instance
					 */
					PartyInvite.create = function create(properties) {
						return new PartyInvite(properties);
					};

					/**
					 * Encodes the specified PartyInvite message. Does not implicitly {@link rivet.client.chat.MessageBody.PartyInvite.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.chat.MessageBody.PartyInvite
					 * @static
					 * @param {rivet.client.chat.MessageBody.IPartyInvite} message PartyInvite message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					PartyInvite.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.sender != null && Object.hasOwnProperty.call(message, 'sender'))
							$root.rivet.client.identity.Handle.encode(
								message.sender,
								writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
							).ldelim();
						if (message.party != null && Object.hasOwnProperty.call(message, 'party'))
							$root.rivet.client.party.Handle.encode(
								message.party,
								writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
							).ldelim();
						if (message.inviteToken != null && Object.hasOwnProperty.call(message, 'inviteToken'))
							writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.inviteToken);
						return writer;
					};

					/**
					 * Decodes a PartyInvite message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.chat.MessageBody.PartyInvite
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.chat.MessageBody.PartyInvite} PartyInvite
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					PartyInvite.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.chat.MessageBody.PartyInvite();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.sender = $root.rivet.client.identity.Handle.decode(
										reader,
										reader.uint32()
									);
									break;
								case 2:
									message.party = $root.rivet.client.party.Handle.decode(
										reader,
										reader.uint32()
									);
									break;
								case 3:
									message.inviteToken = reader.string();
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a PartyInvite message.
					 * @function verify
					 * @memberof rivet.client.chat.MessageBody.PartyInvite
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					PartyInvite.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						let properties = {};
						if (message.sender != null && message.hasOwnProperty('sender')) {
							let error = $root.rivet.client.identity.Handle.verify(message.sender);
							if (error) return 'sender.' + error;
						}
						if (message.party != null && message.hasOwnProperty('party')) {
							properties._party = 1;
							{
								let error = $root.rivet.client.party.Handle.verify(message.party);
								if (error) return 'party.' + error;
							}
						}
						if (message.inviteToken != null && message.hasOwnProperty('inviteToken')) {
							properties._inviteToken = 1;
							if (!$util.isString(message.inviteToken)) return 'inviteToken: string expected';
						}
						return null;
					};

					return PartyInvite;
				})();

				MessageBody.PartyJoin = (function () {
					/**
					 * Properties of a PartyJoin.
					 * @memberof rivet.client.chat.MessageBody
					 * @interface IPartyJoin
					 * @property {rivet.client.identity.IHandle|null} [identity] PartyJoin identity
					 */

					/**
					 * Constructs a new PartyJoin.
					 * @memberof rivet.client.chat.MessageBody
					 * @classdesc Represents a PartyJoin.
					 * @implements IPartyJoin
					 * @constructor
					 * @param {rivet.client.chat.MessageBody.IPartyJoin=} [properties] Properties to set
					 */
					function PartyJoin(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * PartyJoin identity.
					 * @member {rivet.client.identity.IHandle|null|undefined} identity
					 * @memberof rivet.client.chat.MessageBody.PartyJoin
					 * @instance
					 */
					PartyJoin.prototype.identity = null;

					/**
					 * Creates a new PartyJoin instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.chat.MessageBody.PartyJoin
					 * @static
					 * @param {rivet.client.chat.MessageBody.IPartyJoin=} [properties] Properties to set
					 * @returns {rivet.client.chat.MessageBody.PartyJoin} PartyJoin instance
					 */
					PartyJoin.create = function create(properties) {
						return new PartyJoin(properties);
					};

					/**
					 * Encodes the specified PartyJoin message. Does not implicitly {@link rivet.client.chat.MessageBody.PartyJoin.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.chat.MessageBody.PartyJoin
					 * @static
					 * @param {rivet.client.chat.MessageBody.IPartyJoin} message PartyJoin message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					PartyJoin.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.identity != null && Object.hasOwnProperty.call(message, 'identity'))
							$root.rivet.client.identity.Handle.encode(
								message.identity,
								writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
							).ldelim();
						return writer;
					};

					/**
					 * Decodes a PartyJoin message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.chat.MessageBody.PartyJoin
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.chat.MessageBody.PartyJoin} PartyJoin
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					PartyJoin.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.chat.MessageBody.PartyJoin();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.identity = $root.rivet.client.identity.Handle.decode(
										reader,
										reader.uint32()
									);
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a PartyJoin message.
					 * @function verify
					 * @memberof rivet.client.chat.MessageBody.PartyJoin
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					PartyJoin.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						if (message.identity != null && message.hasOwnProperty('identity')) {
							let error = $root.rivet.client.identity.Handle.verify(message.identity);
							if (error) return 'identity.' + error;
						}
						return null;
					};

					return PartyJoin;
				})();

				MessageBody.PartyLeave = (function () {
					/**
					 * Properties of a PartyLeave.
					 * @memberof rivet.client.chat.MessageBody
					 * @interface IPartyLeave
					 * @property {rivet.client.identity.IHandle|null} [identity] PartyLeave identity
					 */

					/**
					 * Constructs a new PartyLeave.
					 * @memberof rivet.client.chat.MessageBody
					 * @classdesc Represents a PartyLeave.
					 * @implements IPartyLeave
					 * @constructor
					 * @param {rivet.client.chat.MessageBody.IPartyLeave=} [properties] Properties to set
					 */
					function PartyLeave(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * PartyLeave identity.
					 * @member {rivet.client.identity.IHandle|null|undefined} identity
					 * @memberof rivet.client.chat.MessageBody.PartyLeave
					 * @instance
					 */
					PartyLeave.prototype.identity = null;

					/**
					 * Creates a new PartyLeave instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.chat.MessageBody.PartyLeave
					 * @static
					 * @param {rivet.client.chat.MessageBody.IPartyLeave=} [properties] Properties to set
					 * @returns {rivet.client.chat.MessageBody.PartyLeave} PartyLeave instance
					 */
					PartyLeave.create = function create(properties) {
						return new PartyLeave(properties);
					};

					/**
					 * Encodes the specified PartyLeave message. Does not implicitly {@link rivet.client.chat.MessageBody.PartyLeave.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.chat.MessageBody.PartyLeave
					 * @static
					 * @param {rivet.client.chat.MessageBody.IPartyLeave} message PartyLeave message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					PartyLeave.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.identity != null && Object.hasOwnProperty.call(message, 'identity'))
							$root.rivet.client.identity.Handle.encode(
								message.identity,
								writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
							).ldelim();
						return writer;
					};

					/**
					 * Decodes a PartyLeave message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.chat.MessageBody.PartyLeave
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.chat.MessageBody.PartyLeave} PartyLeave
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					PartyLeave.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.chat.MessageBody.PartyLeave();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.identity = $root.rivet.client.identity.Handle.decode(
										reader,
										reader.uint32()
									);
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a PartyLeave message.
					 * @function verify
					 * @memberof rivet.client.chat.MessageBody.PartyLeave
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					PartyLeave.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						if (message.identity != null && message.hasOwnProperty('identity')) {
							let error = $root.rivet.client.identity.Handle.verify(message.identity);
							if (error) return 'identity.' + error;
						}
						return null;
					};

					return PartyLeave;
				})();

				MessageBody.PartyActivityChange = (function () {
					/**
					 * Properties of a PartyActivityChange.
					 * @memberof rivet.client.chat.MessageBody
					 * @interface IPartyActivityChange
					 */

					/**
					 * Constructs a new PartyActivityChange.
					 * @memberof rivet.client.chat.MessageBody
					 * @classdesc Represents a PartyActivityChange.
					 * @implements IPartyActivityChange
					 * @constructor
					 * @param {rivet.client.chat.MessageBody.IPartyActivityChange=} [properties] Properties to set
					 */
					function PartyActivityChange(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * Creates a new PartyActivityChange instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.chat.MessageBody.PartyActivityChange
					 * @static
					 * @param {rivet.client.chat.MessageBody.IPartyActivityChange=} [properties] Properties to set
					 * @returns {rivet.client.chat.MessageBody.PartyActivityChange} PartyActivityChange instance
					 */
					PartyActivityChange.create = function create(properties) {
						return new PartyActivityChange(properties);
					};

					/**
					 * Encodes the specified PartyActivityChange message. Does not implicitly {@link rivet.client.chat.MessageBody.PartyActivityChange.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.chat.MessageBody.PartyActivityChange
					 * @static
					 * @param {rivet.client.chat.MessageBody.IPartyActivityChange} message PartyActivityChange message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					PartyActivityChange.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						return writer;
					};

					/**
					 * Decodes a PartyActivityChange message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.chat.MessageBody.PartyActivityChange
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.chat.MessageBody.PartyActivityChange} PartyActivityChange
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					PartyActivityChange.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.chat.MessageBody.PartyActivityChange();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a PartyActivityChange message.
					 * @function verify
					 * @memberof rivet.client.chat.MessageBody.PartyActivityChange
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					PartyActivityChange.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						return null;
					};

					return PartyActivityChange;
				})();

				return MessageBody;
			})();

			chat.Thread = (function () {
				/**
				 * Properties of a Thread.
				 * @memberof rivet.client.chat
				 * @interface IThread
				 * @property {string|null} [id] Thread id
				 * @property {number|Long|null} [createTs] Thread createTs
				 * @property {rivet.client.chat.ITopicContext|null} [topic] Thread topic
				 * @property {rivet.client.chat.IMessage|null} [tailMessage] Thread tailMessage
				 * @property {number|Long|null} [lastReadTs] Thread lastReadTs
				 * @property {number|Long|null} [unreadCount] Thread unreadCount
				 * @property {rivet.client.chat.IThreadExternalLinks|null} [external] Thread external
				 */

				/**
				 * Constructs a new Thread.
				 * @memberof rivet.client.chat
				 * @classdesc Represents a Thread.
				 * @implements IThread
				 * @constructor
				 * @param {rivet.client.chat.IThread=} [properties] Properties to set
				 */
				function Thread(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Thread id.
				 * @member {string} id
				 * @memberof rivet.client.chat.Thread
				 * @instance
				 */
				Thread.prototype.id = '';

				/**
				 * Thread createTs.
				 * @member {number|Long} createTs
				 * @memberof rivet.client.chat.Thread
				 * @instance
				 */
				Thread.prototype.createTs = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

				/**
				 * Thread topic.
				 * @member {rivet.client.chat.ITopicContext|null|undefined} topic
				 * @memberof rivet.client.chat.Thread
				 * @instance
				 */
				Thread.prototype.topic = null;

				/**
				 * Thread tailMessage.
				 * @member {rivet.client.chat.IMessage|null|undefined} tailMessage
				 * @memberof rivet.client.chat.Thread
				 * @instance
				 */
				Thread.prototype.tailMessage = null;

				/**
				 * Thread lastReadTs.
				 * @member {number|Long} lastReadTs
				 * @memberof rivet.client.chat.Thread
				 * @instance
				 */
				Thread.prototype.lastReadTs = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

				/**
				 * Thread unreadCount.
				 * @member {number|Long} unreadCount
				 * @memberof rivet.client.chat.Thread
				 * @instance
				 */
				Thread.prototype.unreadCount = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

				/**
				 * Thread external.
				 * @member {rivet.client.chat.IThreadExternalLinks|null|undefined} external
				 * @memberof rivet.client.chat.Thread
				 * @instance
				 */
				Thread.prototype.external = null;

				/**
				 * Creates a new Thread instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.chat.Thread
				 * @static
				 * @param {rivet.client.chat.IThread=} [properties] Properties to set
				 * @returns {rivet.client.chat.Thread} Thread instance
				 */
				Thread.create = function create(properties) {
					return new Thread(properties);
				};

				/**
				 * Encodes the specified Thread message. Does not implicitly {@link rivet.client.chat.Thread.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.chat.Thread
				 * @static
				 * @param {rivet.client.chat.IThread} message Thread message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Thread.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
					if (message.createTs != null && Object.hasOwnProperty.call(message, 'createTs'))
						writer.uint32(/* id 2, wireType 0 =*/ 16).uint64(message.createTs);
					if (message.topic != null && Object.hasOwnProperty.call(message, 'topic'))
						$root.rivet.client.chat.TopicContext.encode(
							message.topic,
							writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
						).ldelim();
					if (message.tailMessage != null && Object.hasOwnProperty.call(message, 'tailMessage'))
						$root.rivet.client.chat.Message.encode(
							message.tailMessage,
							writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
						).ldelim();
					if (message.lastReadTs != null && Object.hasOwnProperty.call(message, 'lastReadTs'))
						writer.uint32(/* id 5, wireType 0 =*/ 40).uint64(message.lastReadTs);
					if (message.unreadCount != null && Object.hasOwnProperty.call(message, 'unreadCount'))
						writer.uint32(/* id 6, wireType 0 =*/ 48).uint64(message.unreadCount);
					if (message.external != null && Object.hasOwnProperty.call(message, 'external'))
						$root.rivet.client.chat.ThreadExternalLinks.encode(
							message.external,
							writer.uint32(/* id 7, wireType 2 =*/ 58).fork()
						).ldelim();
					return writer;
				};

				/**
				 * Decodes a Thread message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.chat.Thread
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.chat.Thread} Thread
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Thread.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.chat.Thread();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.id = reader.string();
								break;
							case 2:
								message.createTs = reader.uint64();
								break;
							case 3:
								message.topic = $root.rivet.client.chat.TopicContext.decode(
									reader,
									reader.uint32()
								);
								break;
							case 4:
								message.tailMessage = $root.rivet.client.chat.Message.decode(
									reader,
									reader.uint32()
								);
								break;
							case 5:
								message.lastReadTs = reader.uint64();
								break;
							case 6:
								message.unreadCount = reader.uint64();
								break;
							case 7:
								message.external = $root.rivet.client.chat.ThreadExternalLinks.decode(
									reader,
									reader.uint32()
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Thread message.
				 * @function verify
				 * @memberof rivet.client.chat.Thread
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Thread.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.id != null && message.hasOwnProperty('id'))
						if (!$util.isString(message.id)) return 'id: string expected';
					if (message.createTs != null && message.hasOwnProperty('createTs'))
						if (
							!$util.isInteger(message.createTs) &&
							!(
								message.createTs &&
								$util.isInteger(message.createTs.low) &&
								$util.isInteger(message.createTs.high)
							)
						)
							return 'createTs: integer|Long expected';
					if (message.topic != null && message.hasOwnProperty('topic')) {
						let error = $root.rivet.client.chat.TopicContext.verify(message.topic);
						if (error) return 'topic.' + error;
					}
					if (message.tailMessage != null && message.hasOwnProperty('tailMessage')) {
						let error = $root.rivet.client.chat.Message.verify(message.tailMessage);
						if (error) return 'tailMessage.' + error;
					}
					if (message.lastReadTs != null && message.hasOwnProperty('lastReadTs'))
						if (
							!$util.isInteger(message.lastReadTs) &&
							!(
								message.lastReadTs &&
								$util.isInteger(message.lastReadTs.low) &&
								$util.isInteger(message.lastReadTs.high)
							)
						)
							return 'lastReadTs: integer|Long expected';
					if (message.unreadCount != null && message.hasOwnProperty('unreadCount'))
						if (
							!$util.isInteger(message.unreadCount) &&
							!(
								message.unreadCount &&
								$util.isInteger(message.unreadCount.low) &&
								$util.isInteger(message.unreadCount.high)
							)
						)
							return 'unreadCount: integer|Long expected';
					if (message.external != null && message.hasOwnProperty('external')) {
						let error = $root.rivet.client.chat.ThreadExternalLinks.verify(message.external);
						if (error) return 'external.' + error;
					}
					return null;
				};

				return Thread;
			})();

			chat.TopicContext = (function () {
				/**
				 * Properties of a TopicContext.
				 * @memberof rivet.client.chat
				 * @interface ITopicContext
				 * @property {rivet.client.chat.TopicContext.IGroup|null} [group] TopicContext group
				 * @property {rivet.client.chat.TopicContext.IParty|null} [party] TopicContext party
				 * @property {rivet.client.chat.TopicContext.IDirect|null} [direct] TopicContext direct
				 */

				/**
				 * Constructs a new TopicContext.
				 * @memberof rivet.client.chat
				 * @classdesc Represents a TopicContext.
				 * @implements ITopicContext
				 * @constructor
				 * @param {rivet.client.chat.ITopicContext=} [properties] Properties to set
				 */
				function TopicContext(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * TopicContext group.
				 * @member {rivet.client.chat.TopicContext.IGroup|null|undefined} group
				 * @memberof rivet.client.chat.TopicContext
				 * @instance
				 */
				TopicContext.prototype.group = null;

				/**
				 * TopicContext party.
				 * @member {rivet.client.chat.TopicContext.IParty|null|undefined} party
				 * @memberof rivet.client.chat.TopicContext
				 * @instance
				 */
				TopicContext.prototype.party = null;

				/**
				 * TopicContext direct.
				 * @member {rivet.client.chat.TopicContext.IDirect|null|undefined} direct
				 * @memberof rivet.client.chat.TopicContext
				 * @instance
				 */
				TopicContext.prototype.direct = null;

				// OneOf field names bound to virtual getters and setters
				let $oneOfFields;

				/**
				 * TopicContext kind.
				 * @member {"group"|"party"|"direct"|undefined} kind
				 * @memberof rivet.client.chat.TopicContext
				 * @instance
				 */
				Object.defineProperty(TopicContext.prototype, 'kind', {
					get: $util.oneOfGetter(($oneOfFields = ['group', 'party', 'direct'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Creates a new TopicContext instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.chat.TopicContext
				 * @static
				 * @param {rivet.client.chat.ITopicContext=} [properties] Properties to set
				 * @returns {rivet.client.chat.TopicContext} TopicContext instance
				 */
				TopicContext.create = function create(properties) {
					return new TopicContext(properties);
				};

				/**
				 * Encodes the specified TopicContext message. Does not implicitly {@link rivet.client.chat.TopicContext.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.chat.TopicContext
				 * @static
				 * @param {rivet.client.chat.ITopicContext} message TopicContext message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				TopicContext.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.group != null && Object.hasOwnProperty.call(message, 'group'))
						$root.rivet.client.chat.TopicContext.Group.encode(
							message.group,
							writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
						).ldelim();
					if (message.party != null && Object.hasOwnProperty.call(message, 'party'))
						$root.rivet.client.chat.TopicContext.Party.encode(
							message.party,
							writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
						).ldelim();
					if (message.direct != null && Object.hasOwnProperty.call(message, 'direct'))
						$root.rivet.client.chat.TopicContext.Direct.encode(
							message.direct,
							writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
						).ldelim();
					return writer;
				};

				/**
				 * Decodes a TopicContext message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.chat.TopicContext
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.chat.TopicContext} TopicContext
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				TopicContext.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.chat.TopicContext();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.group = $root.rivet.client.chat.TopicContext.Group.decode(
									reader,
									reader.uint32()
								);
								break;
							case 2:
								message.party = $root.rivet.client.chat.TopicContext.Party.decode(
									reader,
									reader.uint32()
								);
								break;
							case 3:
								message.direct = $root.rivet.client.chat.TopicContext.Direct.decode(
									reader,
									reader.uint32()
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a TopicContext message.
				 * @function verify
				 * @memberof rivet.client.chat.TopicContext
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				TopicContext.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					let properties = {};
					if (message.group != null && message.hasOwnProperty('group')) {
						properties.kind = 1;
						{
							let error = $root.rivet.client.chat.TopicContext.Group.verify(message.group);
							if (error) return 'group.' + error;
						}
					}
					if (message.party != null && message.hasOwnProperty('party')) {
						if (properties.kind === 1) return 'kind: multiple values';
						properties.kind = 1;
						{
							let error = $root.rivet.client.chat.TopicContext.Party.verify(message.party);
							if (error) return 'party.' + error;
						}
					}
					if (message.direct != null && message.hasOwnProperty('direct')) {
						if (properties.kind === 1) return 'kind: multiple values';
						properties.kind = 1;
						{
							let error = $root.rivet.client.chat.TopicContext.Direct.verify(message.direct);
							if (error) return 'direct.' + error;
						}
					}
					return null;
				};

				TopicContext.Group = (function () {
					/**
					 * Properties of a Group.
					 * @memberof rivet.client.chat.TopicContext
					 * @interface IGroup
					 * @property {rivet.client.group.IHandle|null} [group] Group group
					 */

					/**
					 * Constructs a new Group.
					 * @memberof rivet.client.chat.TopicContext
					 * @classdesc Represents a Group.
					 * @implements IGroup
					 * @constructor
					 * @param {rivet.client.chat.TopicContext.IGroup=} [properties] Properties to set
					 */
					function Group(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * Group group.
					 * @member {rivet.client.group.IHandle|null|undefined} group
					 * @memberof rivet.client.chat.TopicContext.Group
					 * @instance
					 */
					Group.prototype.group = null;

					/**
					 * Creates a new Group instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.chat.TopicContext.Group
					 * @static
					 * @param {rivet.client.chat.TopicContext.IGroup=} [properties] Properties to set
					 * @returns {rivet.client.chat.TopicContext.Group} Group instance
					 */
					Group.create = function create(properties) {
						return new Group(properties);
					};

					/**
					 * Encodes the specified Group message. Does not implicitly {@link rivet.client.chat.TopicContext.Group.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.chat.TopicContext.Group
					 * @static
					 * @param {rivet.client.chat.TopicContext.IGroup} message Group message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					Group.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.group != null && Object.hasOwnProperty.call(message, 'group'))
							$root.rivet.client.group.Handle.encode(
								message.group,
								writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
							).ldelim();
						return writer;
					};

					/**
					 * Decodes a Group message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.chat.TopicContext.Group
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.chat.TopicContext.Group} Group
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					Group.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.chat.TopicContext.Group();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.group = $root.rivet.client.group.Handle.decode(
										reader,
										reader.uint32()
									);
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a Group message.
					 * @function verify
					 * @memberof rivet.client.chat.TopicContext.Group
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					Group.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						if (message.group != null && message.hasOwnProperty('group')) {
							let error = $root.rivet.client.group.Handle.verify(message.group);
							if (error) return 'group.' + error;
						}
						return null;
					};

					return Group;
				})();

				TopicContext.Party = (function () {
					/**
					 * Properties of a Party.
					 * @memberof rivet.client.chat.TopicContext
					 * @interface IParty
					 * @property {rivet.client.party.IHandle|null} [party] Party party
					 */

					/**
					 * Constructs a new Party.
					 * @memberof rivet.client.chat.TopicContext
					 * @classdesc Represents a Party.
					 * @implements IParty
					 * @constructor
					 * @param {rivet.client.chat.TopicContext.IParty=} [properties] Properties to set
					 */
					function Party(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * Party party.
					 * @member {rivet.client.party.IHandle|null|undefined} party
					 * @memberof rivet.client.chat.TopicContext.Party
					 * @instance
					 */
					Party.prototype.party = null;

					/**
					 * Creates a new Party instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.chat.TopicContext.Party
					 * @static
					 * @param {rivet.client.chat.TopicContext.IParty=} [properties] Properties to set
					 * @returns {rivet.client.chat.TopicContext.Party} Party instance
					 */
					Party.create = function create(properties) {
						return new Party(properties);
					};

					/**
					 * Encodes the specified Party message. Does not implicitly {@link rivet.client.chat.TopicContext.Party.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.chat.TopicContext.Party
					 * @static
					 * @param {rivet.client.chat.TopicContext.IParty} message Party message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					Party.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.party != null && Object.hasOwnProperty.call(message, 'party'))
							$root.rivet.client.party.Handle.encode(
								message.party,
								writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
							).ldelim();
						return writer;
					};

					/**
					 * Decodes a Party message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.chat.TopicContext.Party
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.chat.TopicContext.Party} Party
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					Party.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.chat.TopicContext.Party();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.party = $root.rivet.client.party.Handle.decode(
										reader,
										reader.uint32()
									);
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a Party message.
					 * @function verify
					 * @memberof rivet.client.chat.TopicContext.Party
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					Party.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						if (message.party != null && message.hasOwnProperty('party')) {
							let error = $root.rivet.client.party.Handle.verify(message.party);
							if (error) return 'party.' + error;
						}
						return null;
					};

					return Party;
				})();

				TopicContext.Direct = (function () {
					/**
					 * Properties of a Direct.
					 * @memberof rivet.client.chat.TopicContext
					 * @interface IDirect
					 * @property {rivet.client.identity.IHandle|null} [identityA] Direct identityA
					 * @property {rivet.client.identity.IHandle|null} [identityB] Direct identityB
					 */

					/**
					 * Constructs a new Direct.
					 * @memberof rivet.client.chat.TopicContext
					 * @classdesc Represents a Direct.
					 * @implements IDirect
					 * @constructor
					 * @param {rivet.client.chat.TopicContext.IDirect=} [properties] Properties to set
					 */
					function Direct(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * Direct identityA.
					 * @member {rivet.client.identity.IHandle|null|undefined} identityA
					 * @memberof rivet.client.chat.TopicContext.Direct
					 * @instance
					 */
					Direct.prototype.identityA = null;

					/**
					 * Direct identityB.
					 * @member {rivet.client.identity.IHandle|null|undefined} identityB
					 * @memberof rivet.client.chat.TopicContext.Direct
					 * @instance
					 */
					Direct.prototype.identityB = null;

					/**
					 * Creates a new Direct instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.chat.TopicContext.Direct
					 * @static
					 * @param {rivet.client.chat.TopicContext.IDirect=} [properties] Properties to set
					 * @returns {rivet.client.chat.TopicContext.Direct} Direct instance
					 */
					Direct.create = function create(properties) {
						return new Direct(properties);
					};

					/**
					 * Encodes the specified Direct message. Does not implicitly {@link rivet.client.chat.TopicContext.Direct.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.chat.TopicContext.Direct
					 * @static
					 * @param {rivet.client.chat.TopicContext.IDirect} message Direct message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					Direct.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.identityA != null && Object.hasOwnProperty.call(message, 'identityA'))
							$root.rivet.client.identity.Handle.encode(
								message.identityA,
								writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
							).ldelim();
						if (message.identityB != null && Object.hasOwnProperty.call(message, 'identityB'))
							$root.rivet.client.identity.Handle.encode(
								message.identityB,
								writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
							).ldelim();
						return writer;
					};

					/**
					 * Decodes a Direct message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.chat.TopicContext.Direct
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.chat.TopicContext.Direct} Direct
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					Direct.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.chat.TopicContext.Direct();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.identityA = $root.rivet.client.identity.Handle.decode(
										reader,
										reader.uint32()
									);
									break;
								case 2:
									message.identityB = $root.rivet.client.identity.Handle.decode(
										reader,
										reader.uint32()
									);
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a Direct message.
					 * @function verify
					 * @memberof rivet.client.chat.TopicContext.Direct
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					Direct.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						if (message.identityA != null && message.hasOwnProperty('identityA')) {
							let error = $root.rivet.client.identity.Handle.verify(message.identityA);
							if (error) return 'identityA.' + error;
						}
						if (message.identityB != null && message.hasOwnProperty('identityB')) {
							let error = $root.rivet.client.identity.Handle.verify(message.identityB);
							if (error) return 'identityB.' + error;
						}
						return null;
					};

					return Direct;
				})();

				return TopicContext;
			})();

			return chat;
		})();

		client.cloud = (function () {
			/**
			 * Namespace cloud.
			 * @memberof rivet.client
			 * @namespace
			 */
			const cloud = {};

			cloud.game = (function () {
				/**
				 * Namespace game.
				 * @memberof rivet.client.cloud
				 * @namespace
				 */
				const game = {};

				game.GameSummary = (function () {
					/**
					 * Properties of a GameSummary.
					 * @memberof rivet.client.cloud.game
					 * @interface IGameSummary
					 * @property {string|null} [id] GameSummary id
					 * @property {number|Long|null} [createTs] GameSummary createTs
					 * @property {string|null} [nameId] GameSummary nameId
					 * @property {string|null} [displayName] GameSummary displayName
					 * @property {string|null} [developerGroupId] GameSummary developerGroupId
					 * @property {number|Long|null} [totalPlayerCount] GameSummary totalPlayerCount
					 * @property {string|null} [logoUrl] GameSummary logoUrl
					 * @property {string|null} [bannerUrl] GameSummary bannerUrl
					 */

					/**
					 * Constructs a new GameSummary.
					 * @memberof rivet.client.cloud.game
					 * @classdesc Represents a GameSummary.
					 * @implements IGameSummary
					 * @constructor
					 * @param {rivet.client.cloud.game.IGameSummary=} [properties] Properties to set
					 */
					function GameSummary(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * GameSummary id.
					 * @member {string} id
					 * @memberof rivet.client.cloud.game.GameSummary
					 * @instance
					 */
					GameSummary.prototype.id = '';

					/**
					 * GameSummary createTs.
					 * @member {number|Long} createTs
					 * @memberof rivet.client.cloud.game.GameSummary
					 * @instance
					 */
					GameSummary.prototype.createTs = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

					/**
					 * GameSummary nameId.
					 * @member {string} nameId
					 * @memberof rivet.client.cloud.game.GameSummary
					 * @instance
					 */
					GameSummary.prototype.nameId = '';

					/**
					 * GameSummary displayName.
					 * @member {string} displayName
					 * @memberof rivet.client.cloud.game.GameSummary
					 * @instance
					 */
					GameSummary.prototype.displayName = '';

					/**
					 * GameSummary developerGroupId.
					 * @member {string} developerGroupId
					 * @memberof rivet.client.cloud.game.GameSummary
					 * @instance
					 */
					GameSummary.prototype.developerGroupId = '';

					/**
					 * GameSummary totalPlayerCount.
					 * @member {number|Long} totalPlayerCount
					 * @memberof rivet.client.cloud.game.GameSummary
					 * @instance
					 */
					GameSummary.prototype.totalPlayerCount = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

					/**
					 * GameSummary logoUrl.
					 * @member {string|null|undefined} logoUrl
					 * @memberof rivet.client.cloud.game.GameSummary
					 * @instance
					 */
					GameSummary.prototype.logoUrl = null;

					/**
					 * GameSummary bannerUrl.
					 * @member {string|null|undefined} bannerUrl
					 * @memberof rivet.client.cloud.game.GameSummary
					 * @instance
					 */
					GameSummary.prototype.bannerUrl = null;

					// OneOf field names bound to virtual getters and setters
					let $oneOfFields;

					/**
					 * GameSummary _logoUrl.
					 * @member {"logoUrl"|undefined} _logoUrl
					 * @memberof rivet.client.cloud.game.GameSummary
					 * @instance
					 */
					Object.defineProperty(GameSummary.prototype, '_logoUrl', {
						get: $util.oneOfGetter(($oneOfFields = ['logoUrl'])),
						set: $util.oneOfSetter($oneOfFields)
					});

					/**
					 * GameSummary _bannerUrl.
					 * @member {"bannerUrl"|undefined} _bannerUrl
					 * @memberof rivet.client.cloud.game.GameSummary
					 * @instance
					 */
					Object.defineProperty(GameSummary.prototype, '_bannerUrl', {
						get: $util.oneOfGetter(($oneOfFields = ['bannerUrl'])),
						set: $util.oneOfSetter($oneOfFields)
					});

					/**
					 * Creates a new GameSummary instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.cloud.game.GameSummary
					 * @static
					 * @param {rivet.client.cloud.game.IGameSummary=} [properties] Properties to set
					 * @returns {rivet.client.cloud.game.GameSummary} GameSummary instance
					 */
					GameSummary.create = function create(properties) {
						return new GameSummary(properties);
					};

					/**
					 * Encodes the specified GameSummary message. Does not implicitly {@link rivet.client.cloud.game.GameSummary.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.cloud.game.GameSummary
					 * @static
					 * @param {rivet.client.cloud.game.IGameSummary} message GameSummary message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					GameSummary.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
							writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
						if (message.createTs != null && Object.hasOwnProperty.call(message, 'createTs'))
							writer.uint32(/* id 2, wireType 0 =*/ 16).uint64(message.createTs);
						if (message.nameId != null && Object.hasOwnProperty.call(message, 'nameId'))
							writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.nameId);
						if (message.displayName != null && Object.hasOwnProperty.call(message, 'displayName'))
							writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.displayName);
						if (
							message.developerGroupId != null &&
							Object.hasOwnProperty.call(message, 'developerGroupId')
						)
							writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.developerGroupId);
						if (
							message.totalPlayerCount != null &&
							Object.hasOwnProperty.call(message, 'totalPlayerCount')
						)
							writer.uint32(/* id 6, wireType 0 =*/ 48).uint64(message.totalPlayerCount);
						if (message.logoUrl != null && Object.hasOwnProperty.call(message, 'logoUrl'))
							writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.logoUrl);
						if (message.bannerUrl != null && Object.hasOwnProperty.call(message, 'bannerUrl'))
							writer.uint32(/* id 8, wireType 2 =*/ 66).string(message.bannerUrl);
						return writer;
					};

					/**
					 * Decodes a GameSummary message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.cloud.game.GameSummary
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.cloud.game.GameSummary} GameSummary
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					GameSummary.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.cloud.game.GameSummary();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.id = reader.string();
									break;
								case 2:
									message.createTs = reader.uint64();
									break;
								case 3:
									message.nameId = reader.string();
									break;
								case 4:
									message.displayName = reader.string();
									break;
								case 5:
									message.developerGroupId = reader.string();
									break;
								case 6:
									message.totalPlayerCount = reader.uint64();
									break;
								case 7:
									message.logoUrl = reader.string();
									break;
								case 8:
									message.bannerUrl = reader.string();
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a GameSummary message.
					 * @function verify
					 * @memberof rivet.client.cloud.game.GameSummary
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					GameSummary.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						let properties = {};
						if (message.id != null && message.hasOwnProperty('id'))
							if (!$util.isString(message.id)) return 'id: string expected';
						if (message.createTs != null && message.hasOwnProperty('createTs'))
							if (
								!$util.isInteger(message.createTs) &&
								!(
									message.createTs &&
									$util.isInteger(message.createTs.low) &&
									$util.isInteger(message.createTs.high)
								)
							)
								return 'createTs: integer|Long expected';
						if (message.nameId != null && message.hasOwnProperty('nameId'))
							if (!$util.isString(message.nameId)) return 'nameId: string expected';
						if (message.displayName != null && message.hasOwnProperty('displayName'))
							if (!$util.isString(message.displayName)) return 'displayName: string expected';
						if (message.developerGroupId != null && message.hasOwnProperty('developerGroupId'))
							if (!$util.isString(message.developerGroupId))
								return 'developerGroupId: string expected';
						if (message.totalPlayerCount != null && message.hasOwnProperty('totalPlayerCount'))
							if (
								!$util.isInteger(message.totalPlayerCount) &&
								!(
									message.totalPlayerCount &&
									$util.isInteger(message.totalPlayerCount.low) &&
									$util.isInteger(message.totalPlayerCount.high)
								)
							)
								return 'totalPlayerCount: integer|Long expected';
						if (message.logoUrl != null && message.hasOwnProperty('logoUrl')) {
							properties._logoUrl = 1;
							if (!$util.isString(message.logoUrl)) return 'logoUrl: string expected';
						}
						if (message.bannerUrl != null && message.hasOwnProperty('bannerUrl')) {
							properties._bannerUrl = 1;
							if (!$util.isString(message.bannerUrl)) return 'bannerUrl: string expected';
						}
						return null;
					};

					return GameSummary;
				})();

				game.GameFull = (function () {
					/**
					 * Properties of a GameFull.
					 * @memberof rivet.client.cloud.game
					 * @interface IGameFull
					 * @property {string|null} [id] GameFull id
					 * @property {number|Long|null} [createTs] GameFull createTs
					 * @property {string|null} [nameId] GameFull nameId
					 * @property {string|null} [displayName] GameFull displayName
					 * @property {string|null} [developerGroupId] GameFull developerGroupId
					 * @property {number|Long|null} [totalPlayerCount] GameFull totalPlayerCount
					 * @property {string|null} [logoUrl] GameFull logoUrl
					 * @property {string|null} [bannerUrl] GameFull bannerUrl
					 * @property {Array.<rivet.client.cloud.game.INamespaceSummary>|null} [namespaces] GameFull namespaces
					 * @property {Array.<rivet.client.cloud.game.IVersionSummary>|null} [versions] GameFull versions
					 * @property {Array.<rivet.client.cloud.game.IRegionSummary>|null} [availableRegions] GameFull availableRegions
					 */

					/**
					 * Constructs a new GameFull.
					 * @memberof rivet.client.cloud.game
					 * @classdesc Represents a GameFull.
					 * @implements IGameFull
					 * @constructor
					 * @param {rivet.client.cloud.game.IGameFull=} [properties] Properties to set
					 */
					function GameFull(properties) {
						this.namespaces = [];
						this.versions = [];
						this.availableRegions = [];
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * GameFull id.
					 * @member {string} id
					 * @memberof rivet.client.cloud.game.GameFull
					 * @instance
					 */
					GameFull.prototype.id = '';

					/**
					 * GameFull createTs.
					 * @member {number|Long} createTs
					 * @memberof rivet.client.cloud.game.GameFull
					 * @instance
					 */
					GameFull.prototype.createTs = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

					/**
					 * GameFull nameId.
					 * @member {string} nameId
					 * @memberof rivet.client.cloud.game.GameFull
					 * @instance
					 */
					GameFull.prototype.nameId = '';

					/**
					 * GameFull displayName.
					 * @member {string} displayName
					 * @memberof rivet.client.cloud.game.GameFull
					 * @instance
					 */
					GameFull.prototype.displayName = '';

					/**
					 * GameFull developerGroupId.
					 * @member {string} developerGroupId
					 * @memberof rivet.client.cloud.game.GameFull
					 * @instance
					 */
					GameFull.prototype.developerGroupId = '';

					/**
					 * GameFull totalPlayerCount.
					 * @member {number|Long} totalPlayerCount
					 * @memberof rivet.client.cloud.game.GameFull
					 * @instance
					 */
					GameFull.prototype.totalPlayerCount = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

					/**
					 * GameFull logoUrl.
					 * @member {string|null|undefined} logoUrl
					 * @memberof rivet.client.cloud.game.GameFull
					 * @instance
					 */
					GameFull.prototype.logoUrl = null;

					/**
					 * GameFull bannerUrl.
					 * @member {string|null|undefined} bannerUrl
					 * @memberof rivet.client.cloud.game.GameFull
					 * @instance
					 */
					GameFull.prototype.bannerUrl = null;

					/**
					 * GameFull namespaces.
					 * @member {Array.<rivet.client.cloud.game.INamespaceSummary>} namespaces
					 * @memberof rivet.client.cloud.game.GameFull
					 * @instance
					 */
					GameFull.prototype.namespaces = $util.emptyArray;

					/**
					 * GameFull versions.
					 * @member {Array.<rivet.client.cloud.game.IVersionSummary>} versions
					 * @memberof rivet.client.cloud.game.GameFull
					 * @instance
					 */
					GameFull.prototype.versions = $util.emptyArray;

					/**
					 * GameFull availableRegions.
					 * @member {Array.<rivet.client.cloud.game.IRegionSummary>} availableRegions
					 * @memberof rivet.client.cloud.game.GameFull
					 * @instance
					 */
					GameFull.prototype.availableRegions = $util.emptyArray;

					// OneOf field names bound to virtual getters and setters
					let $oneOfFields;

					/**
					 * GameFull _logoUrl.
					 * @member {"logoUrl"|undefined} _logoUrl
					 * @memberof rivet.client.cloud.game.GameFull
					 * @instance
					 */
					Object.defineProperty(GameFull.prototype, '_logoUrl', {
						get: $util.oneOfGetter(($oneOfFields = ['logoUrl'])),
						set: $util.oneOfSetter($oneOfFields)
					});

					/**
					 * GameFull _bannerUrl.
					 * @member {"bannerUrl"|undefined} _bannerUrl
					 * @memberof rivet.client.cloud.game.GameFull
					 * @instance
					 */
					Object.defineProperty(GameFull.prototype, '_bannerUrl', {
						get: $util.oneOfGetter(($oneOfFields = ['bannerUrl'])),
						set: $util.oneOfSetter($oneOfFields)
					});

					/**
					 * Creates a new GameFull instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.cloud.game.GameFull
					 * @static
					 * @param {rivet.client.cloud.game.IGameFull=} [properties] Properties to set
					 * @returns {rivet.client.cloud.game.GameFull} GameFull instance
					 */
					GameFull.create = function create(properties) {
						return new GameFull(properties);
					};

					/**
					 * Encodes the specified GameFull message. Does not implicitly {@link rivet.client.cloud.game.GameFull.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.cloud.game.GameFull
					 * @static
					 * @param {rivet.client.cloud.game.IGameFull} message GameFull message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					GameFull.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
							writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
						if (message.createTs != null && Object.hasOwnProperty.call(message, 'createTs'))
							writer.uint32(/* id 2, wireType 0 =*/ 16).uint64(message.createTs);
						if (message.nameId != null && Object.hasOwnProperty.call(message, 'nameId'))
							writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.nameId);
						if (message.displayName != null && Object.hasOwnProperty.call(message, 'displayName'))
							writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.displayName);
						if (
							message.developerGroupId != null &&
							Object.hasOwnProperty.call(message, 'developerGroupId')
						)
							writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.developerGroupId);
						if (
							message.totalPlayerCount != null &&
							Object.hasOwnProperty.call(message, 'totalPlayerCount')
						)
							writer.uint32(/* id 6, wireType 0 =*/ 48).uint64(message.totalPlayerCount);
						if (message.logoUrl != null && Object.hasOwnProperty.call(message, 'logoUrl'))
							writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.logoUrl);
						if (message.bannerUrl != null && Object.hasOwnProperty.call(message, 'bannerUrl'))
							writer.uint32(/* id 8, wireType 2 =*/ 66).string(message.bannerUrl);
						if (message.namespaces != null && message.namespaces.length)
							for (let i = 0; i < message.namespaces.length; ++i)
								$root.rivet.client.cloud.game.NamespaceSummary.encode(
									message.namespaces[i],
									writer.uint32(/* id 101, wireType 2 =*/ 810).fork()
								).ldelim();
						if (message.versions != null && message.versions.length)
							for (let i = 0; i < message.versions.length; ++i)
								$root.rivet.client.cloud.game.VersionSummary.encode(
									message.versions[i],
									writer.uint32(/* id 102, wireType 2 =*/ 818).fork()
								).ldelim();
						if (message.availableRegions != null && message.availableRegions.length)
							for (let i = 0; i < message.availableRegions.length; ++i)
								$root.rivet.client.cloud.game.RegionSummary.encode(
									message.availableRegions[i],
									writer.uint32(/* id 103, wireType 2 =*/ 826).fork()
								).ldelim();
						return writer;
					};

					/**
					 * Decodes a GameFull message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.cloud.game.GameFull
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.cloud.game.GameFull} GameFull
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					GameFull.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.cloud.game.GameFull();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.id = reader.string();
									break;
								case 2:
									message.createTs = reader.uint64();
									break;
								case 3:
									message.nameId = reader.string();
									break;
								case 4:
									message.displayName = reader.string();
									break;
								case 5:
									message.developerGroupId = reader.string();
									break;
								case 6:
									message.totalPlayerCount = reader.uint64();
									break;
								case 7:
									message.logoUrl = reader.string();
									break;
								case 8:
									message.bannerUrl = reader.string();
									break;
								case 101:
									if (!(message.namespaces && message.namespaces.length))
										message.namespaces = [];
									message.namespaces.push(
										$root.rivet.client.cloud.game.NamespaceSummary.decode(
											reader,
											reader.uint32()
										)
									);
									break;
								case 102:
									if (!(message.versions && message.versions.length)) message.versions = [];
									message.versions.push(
										$root.rivet.client.cloud.game.VersionSummary.decode(
											reader,
											reader.uint32()
										)
									);
									break;
								case 103:
									if (!(message.availableRegions && message.availableRegions.length))
										message.availableRegions = [];
									message.availableRegions.push(
										$root.rivet.client.cloud.game.RegionSummary.decode(
											reader,
											reader.uint32()
										)
									);
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a GameFull message.
					 * @function verify
					 * @memberof rivet.client.cloud.game.GameFull
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					GameFull.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						let properties = {};
						if (message.id != null && message.hasOwnProperty('id'))
							if (!$util.isString(message.id)) return 'id: string expected';
						if (message.createTs != null && message.hasOwnProperty('createTs'))
							if (
								!$util.isInteger(message.createTs) &&
								!(
									message.createTs &&
									$util.isInteger(message.createTs.low) &&
									$util.isInteger(message.createTs.high)
								)
							)
								return 'createTs: integer|Long expected';
						if (message.nameId != null && message.hasOwnProperty('nameId'))
							if (!$util.isString(message.nameId)) return 'nameId: string expected';
						if (message.displayName != null && message.hasOwnProperty('displayName'))
							if (!$util.isString(message.displayName)) return 'displayName: string expected';
						if (message.developerGroupId != null && message.hasOwnProperty('developerGroupId'))
							if (!$util.isString(message.developerGroupId))
								return 'developerGroupId: string expected';
						if (message.totalPlayerCount != null && message.hasOwnProperty('totalPlayerCount'))
							if (
								!$util.isInteger(message.totalPlayerCount) &&
								!(
									message.totalPlayerCount &&
									$util.isInteger(message.totalPlayerCount.low) &&
									$util.isInteger(message.totalPlayerCount.high)
								)
							)
								return 'totalPlayerCount: integer|Long expected';
						if (message.logoUrl != null && message.hasOwnProperty('logoUrl')) {
							properties._logoUrl = 1;
							if (!$util.isString(message.logoUrl)) return 'logoUrl: string expected';
						}
						if (message.bannerUrl != null && message.hasOwnProperty('bannerUrl')) {
							properties._bannerUrl = 1;
							if (!$util.isString(message.bannerUrl)) return 'bannerUrl: string expected';
						}
						if (message.namespaces != null && message.hasOwnProperty('namespaces')) {
							if (!Array.isArray(message.namespaces)) return 'namespaces: array expected';
							for (let i = 0; i < message.namespaces.length; ++i) {
								let error = $root.rivet.client.cloud.game.NamespaceSummary.verify(
									message.namespaces[i]
								);
								if (error) return 'namespaces.' + error;
							}
						}
						if (message.versions != null && message.hasOwnProperty('versions')) {
							if (!Array.isArray(message.versions)) return 'versions: array expected';
							for (let i = 0; i < message.versions.length; ++i) {
								let error = $root.rivet.client.cloud.game.VersionSummary.verify(
									message.versions[i]
								);
								if (error) return 'versions.' + error;
							}
						}
						if (message.availableRegions != null && message.hasOwnProperty('availableRegions')) {
							if (!Array.isArray(message.availableRegions))
								return 'availableRegions: array expected';
							for (let i = 0; i < message.availableRegions.length; ++i) {
								let error = $root.rivet.client.cloud.game.RegionSummary.verify(
									message.availableRegions[i]
								);
								if (error) return 'availableRegions.' + error;
							}
						}
						return null;
					};

					return GameFull;
				})();

				game.NamespaceSummary = (function () {
					/**
					 * Properties of a NamespaceSummary.
					 * @memberof rivet.client.cloud.game
					 * @interface INamespaceSummary
					 * @property {string|null} [namespaceId] NamespaceSummary namespaceId
					 * @property {number|Long|null} [createTs] NamespaceSummary createTs
					 * @property {string|null} [displayName] NamespaceSummary displayName
					 * @property {string|null} [versionId] NamespaceSummary versionId
					 * @property {string|null} [nameId] NamespaceSummary nameId
					 */

					/**
					 * Constructs a new NamespaceSummary.
					 * @memberof rivet.client.cloud.game
					 * @classdesc Represents a NamespaceSummary.
					 * @implements INamespaceSummary
					 * @constructor
					 * @param {rivet.client.cloud.game.INamespaceSummary=} [properties] Properties to set
					 */
					function NamespaceSummary(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * NamespaceSummary namespaceId.
					 * @member {string} namespaceId
					 * @memberof rivet.client.cloud.game.NamespaceSummary
					 * @instance
					 */
					NamespaceSummary.prototype.namespaceId = '';

					/**
					 * NamespaceSummary createTs.
					 * @member {number|Long} createTs
					 * @memberof rivet.client.cloud.game.NamespaceSummary
					 * @instance
					 */
					NamespaceSummary.prototype.createTs = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

					/**
					 * NamespaceSummary displayName.
					 * @member {string} displayName
					 * @memberof rivet.client.cloud.game.NamespaceSummary
					 * @instance
					 */
					NamespaceSummary.prototype.displayName = '';

					/**
					 * NamespaceSummary versionId.
					 * @member {string} versionId
					 * @memberof rivet.client.cloud.game.NamespaceSummary
					 * @instance
					 */
					NamespaceSummary.prototype.versionId = '';

					/**
					 * NamespaceSummary nameId.
					 * @member {string} nameId
					 * @memberof rivet.client.cloud.game.NamespaceSummary
					 * @instance
					 */
					NamespaceSummary.prototype.nameId = '';

					/**
					 * Creates a new NamespaceSummary instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.cloud.game.NamespaceSummary
					 * @static
					 * @param {rivet.client.cloud.game.INamespaceSummary=} [properties] Properties to set
					 * @returns {rivet.client.cloud.game.NamespaceSummary} NamespaceSummary instance
					 */
					NamespaceSummary.create = function create(properties) {
						return new NamespaceSummary(properties);
					};

					/**
					 * Encodes the specified NamespaceSummary message. Does not implicitly {@link rivet.client.cloud.game.NamespaceSummary.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.cloud.game.NamespaceSummary
					 * @static
					 * @param {rivet.client.cloud.game.INamespaceSummary} message NamespaceSummary message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					NamespaceSummary.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.namespaceId != null && Object.hasOwnProperty.call(message, 'namespaceId'))
							writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.namespaceId);
						if (message.createTs != null && Object.hasOwnProperty.call(message, 'createTs'))
							writer.uint32(/* id 2, wireType 0 =*/ 16).uint64(message.createTs);
						if (message.displayName != null && Object.hasOwnProperty.call(message, 'displayName'))
							writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.displayName);
						if (message.versionId != null && Object.hasOwnProperty.call(message, 'versionId'))
							writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.versionId);
						if (message.nameId != null && Object.hasOwnProperty.call(message, 'nameId'))
							writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.nameId);
						return writer;
					};

					/**
					 * Decodes a NamespaceSummary message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.cloud.game.NamespaceSummary
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.cloud.game.NamespaceSummary} NamespaceSummary
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					NamespaceSummary.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.cloud.game.NamespaceSummary();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.namespaceId = reader.string();
									break;
								case 2:
									message.createTs = reader.uint64();
									break;
								case 3:
									message.displayName = reader.string();
									break;
								case 4:
									message.versionId = reader.string();
									break;
								case 5:
									message.nameId = reader.string();
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a NamespaceSummary message.
					 * @function verify
					 * @memberof rivet.client.cloud.game.NamespaceSummary
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					NamespaceSummary.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						if (message.namespaceId != null && message.hasOwnProperty('namespaceId'))
							if (!$util.isString(message.namespaceId)) return 'namespaceId: string expected';
						if (message.createTs != null && message.hasOwnProperty('createTs'))
							if (
								!$util.isInteger(message.createTs) &&
								!(
									message.createTs &&
									$util.isInteger(message.createTs.low) &&
									$util.isInteger(message.createTs.high)
								)
							)
								return 'createTs: integer|Long expected';
						if (message.displayName != null && message.hasOwnProperty('displayName'))
							if (!$util.isString(message.displayName)) return 'displayName: string expected';
						if (message.versionId != null && message.hasOwnProperty('versionId'))
							if (!$util.isString(message.versionId)) return 'versionId: string expected';
						if (message.nameId != null && message.hasOwnProperty('nameId'))
							if (!$util.isString(message.nameId)) return 'nameId: string expected';
						return null;
					};

					return NamespaceSummary;
				})();

				game.VersionSummary = (function () {
					/**
					 * Properties of a VersionSummary.
					 * @memberof rivet.client.cloud.game
					 * @interface IVersionSummary
					 * @property {string|null} [versionId] VersionSummary versionId
					 * @property {number|Long|null} [createTs] VersionSummary createTs
					 * @property {string|null} [displayName] VersionSummary displayName
					 */

					/**
					 * Constructs a new VersionSummary.
					 * @memberof rivet.client.cloud.game
					 * @classdesc Represents a VersionSummary.
					 * @implements IVersionSummary
					 * @constructor
					 * @param {rivet.client.cloud.game.IVersionSummary=} [properties] Properties to set
					 */
					function VersionSummary(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * VersionSummary versionId.
					 * @member {string} versionId
					 * @memberof rivet.client.cloud.game.VersionSummary
					 * @instance
					 */
					VersionSummary.prototype.versionId = '';

					/**
					 * VersionSummary createTs.
					 * @member {number|Long} createTs
					 * @memberof rivet.client.cloud.game.VersionSummary
					 * @instance
					 */
					VersionSummary.prototype.createTs = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

					/**
					 * VersionSummary displayName.
					 * @member {string} displayName
					 * @memberof rivet.client.cloud.game.VersionSummary
					 * @instance
					 */
					VersionSummary.prototype.displayName = '';

					/**
					 * Creates a new VersionSummary instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.cloud.game.VersionSummary
					 * @static
					 * @param {rivet.client.cloud.game.IVersionSummary=} [properties] Properties to set
					 * @returns {rivet.client.cloud.game.VersionSummary} VersionSummary instance
					 */
					VersionSummary.create = function create(properties) {
						return new VersionSummary(properties);
					};

					/**
					 * Encodes the specified VersionSummary message. Does not implicitly {@link rivet.client.cloud.game.VersionSummary.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.cloud.game.VersionSummary
					 * @static
					 * @param {rivet.client.cloud.game.IVersionSummary} message VersionSummary message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					VersionSummary.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.versionId != null && Object.hasOwnProperty.call(message, 'versionId'))
							writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.versionId);
						if (message.createTs != null && Object.hasOwnProperty.call(message, 'createTs'))
							writer.uint32(/* id 2, wireType 0 =*/ 16).uint64(message.createTs);
						if (message.displayName != null && Object.hasOwnProperty.call(message, 'displayName'))
							writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.displayName);
						return writer;
					};

					/**
					 * Decodes a VersionSummary message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.cloud.game.VersionSummary
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.cloud.game.VersionSummary} VersionSummary
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					VersionSummary.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.cloud.game.VersionSummary();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.versionId = reader.string();
									break;
								case 2:
									message.createTs = reader.uint64();
									break;
								case 3:
									message.displayName = reader.string();
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a VersionSummary message.
					 * @function verify
					 * @memberof rivet.client.cloud.game.VersionSummary
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					VersionSummary.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						if (message.versionId != null && message.hasOwnProperty('versionId'))
							if (!$util.isString(message.versionId)) return 'versionId: string expected';
						if (message.createTs != null && message.hasOwnProperty('createTs'))
							if (
								!$util.isInteger(message.createTs) &&
								!(
									message.createTs &&
									$util.isInteger(message.createTs.low) &&
									$util.isInteger(message.createTs.high)
								)
							)
								return 'createTs: integer|Long expected';
						if (message.displayName != null && message.hasOwnProperty('displayName'))
							if (!$util.isString(message.displayName)) return 'displayName: string expected';
						return null;
					};

					return VersionSummary;
				})();

				game.RegionSummary = (function () {
					/**
					 * Properties of a RegionSummary.
					 * @memberof rivet.client.cloud.game
					 * @interface IRegionSummary
					 * @property {string|null} [regionId] RegionSummary regionId
					 * @property {string|null} [provider] RegionSummary provider
					 * @property {number|null} [universalRegion] RegionSummary universalRegion
					 * @property {string|null} [providerDisplayName] RegionSummary providerDisplayName
					 * @property {string|null} [regionDisplayName] RegionSummary regionDisplayName
					 */

					/**
					 * Constructs a new RegionSummary.
					 * @memberof rivet.client.cloud.game
					 * @classdesc Represents a RegionSummary.
					 * @implements IRegionSummary
					 * @constructor
					 * @param {rivet.client.cloud.game.IRegionSummary=} [properties] Properties to set
					 */
					function RegionSummary(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * RegionSummary regionId.
					 * @member {string} regionId
					 * @memberof rivet.client.cloud.game.RegionSummary
					 * @instance
					 */
					RegionSummary.prototype.regionId = '';

					/**
					 * RegionSummary provider.
					 * @member {string} provider
					 * @memberof rivet.client.cloud.game.RegionSummary
					 * @instance
					 */
					RegionSummary.prototype.provider = '';

					/**
					 * RegionSummary universalRegion.
					 * @member {number} universalRegion
					 * @memberof rivet.client.cloud.game.RegionSummary
					 * @instance
					 */
					RegionSummary.prototype.universalRegion = 0;

					/**
					 * RegionSummary providerDisplayName.
					 * @member {string} providerDisplayName
					 * @memberof rivet.client.cloud.game.RegionSummary
					 * @instance
					 */
					RegionSummary.prototype.providerDisplayName = '';

					/**
					 * RegionSummary regionDisplayName.
					 * @member {string} regionDisplayName
					 * @memberof rivet.client.cloud.game.RegionSummary
					 * @instance
					 */
					RegionSummary.prototype.regionDisplayName = '';

					/**
					 * Creates a new RegionSummary instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.cloud.game.RegionSummary
					 * @static
					 * @param {rivet.client.cloud.game.IRegionSummary=} [properties] Properties to set
					 * @returns {rivet.client.cloud.game.RegionSummary} RegionSummary instance
					 */
					RegionSummary.create = function create(properties) {
						return new RegionSummary(properties);
					};

					/**
					 * Encodes the specified RegionSummary message. Does not implicitly {@link rivet.client.cloud.game.RegionSummary.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.cloud.game.RegionSummary
					 * @static
					 * @param {rivet.client.cloud.game.IRegionSummary} message RegionSummary message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					RegionSummary.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.regionId != null && Object.hasOwnProperty.call(message, 'regionId'))
							writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.regionId);
						if (message.provider != null && Object.hasOwnProperty.call(message, 'provider'))
							writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.provider);
						if (
							message.universalRegion != null &&
							Object.hasOwnProperty.call(message, 'universalRegion')
						)
							writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.universalRegion);
						if (
							message.providerDisplayName != null &&
							Object.hasOwnProperty.call(message, 'providerDisplayName')
						)
							writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.providerDisplayName);
						if (
							message.regionDisplayName != null &&
							Object.hasOwnProperty.call(message, 'regionDisplayName')
						)
							writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.regionDisplayName);
						return writer;
					};

					/**
					 * Decodes a RegionSummary message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.cloud.game.RegionSummary
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.cloud.game.RegionSummary} RegionSummary
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					RegionSummary.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.cloud.game.RegionSummary();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.regionId = reader.string();
									break;
								case 2:
									message.provider = reader.string();
									break;
								case 3:
									message.universalRegion = reader.uint32();
									break;
								case 4:
									message.providerDisplayName = reader.string();
									break;
								case 5:
									message.regionDisplayName = reader.string();
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a RegionSummary message.
					 * @function verify
					 * @memberof rivet.client.cloud.game.RegionSummary
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					RegionSummary.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						if (message.regionId != null && message.hasOwnProperty('regionId'))
							if (!$util.isString(message.regionId)) return 'regionId: string expected';
						if (message.provider != null && message.hasOwnProperty('provider'))
							if (!$util.isString(message.provider)) return 'provider: string expected';
						if (message.universalRegion != null && message.hasOwnProperty('universalRegion'))
							if (!$util.isInteger(message.universalRegion))
								return 'universalRegion: integer expected';
						if (
							message.providerDisplayName != null &&
							message.hasOwnProperty('providerDisplayName')
						)
							if (!$util.isString(message.providerDisplayName))
								return 'providerDisplayName: string expected';
						if (message.regionDisplayName != null && message.hasOwnProperty('regionDisplayName'))
							if (!$util.isString(message.regionDisplayName))
								return 'regionDisplayName: string expected';
						return null;
					};

					return RegionSummary;
				})();

				return game;
			})();

			cloud.group = (function () {
				/**
				 * Namespace group.
				 * @memberof rivet.client.cloud
				 * @namespace
				 */
				const group = {};

				group.GroupSummary = (function () {
					/**
					 * Properties of a GroupSummary.
					 * @memberof rivet.client.cloud.group
					 * @interface IGroupSummary
					 * @property {string|null} [groupId] GroupSummary groupId
					 * @property {string|null} [displayName] GroupSummary displayName
					 * @property {string|null} [avatarUrl] GroupSummary avatarUrl
					 * @property {boolean|null} [isDeveloper] GroupSummary isDeveloper
					 */

					/**
					 * Constructs a new GroupSummary.
					 * @memberof rivet.client.cloud.group
					 * @classdesc Represents a GroupSummary.
					 * @implements IGroupSummary
					 * @constructor
					 * @param {rivet.client.cloud.group.IGroupSummary=} [properties] Properties to set
					 */
					function GroupSummary(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * GroupSummary groupId.
					 * @member {string} groupId
					 * @memberof rivet.client.cloud.group.GroupSummary
					 * @instance
					 */
					GroupSummary.prototype.groupId = '';

					/**
					 * GroupSummary displayName.
					 * @member {string} displayName
					 * @memberof rivet.client.cloud.group.GroupSummary
					 * @instance
					 */
					GroupSummary.prototype.displayName = '';

					/**
					 * GroupSummary avatarUrl.
					 * @member {string} avatarUrl
					 * @memberof rivet.client.cloud.group.GroupSummary
					 * @instance
					 */
					GroupSummary.prototype.avatarUrl = '';

					/**
					 * GroupSummary isDeveloper.
					 * @member {boolean} isDeveloper
					 * @memberof rivet.client.cloud.group.GroupSummary
					 * @instance
					 */
					GroupSummary.prototype.isDeveloper = false;

					/**
					 * Creates a new GroupSummary instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.cloud.group.GroupSummary
					 * @static
					 * @param {rivet.client.cloud.group.IGroupSummary=} [properties] Properties to set
					 * @returns {rivet.client.cloud.group.GroupSummary} GroupSummary instance
					 */
					GroupSummary.create = function create(properties) {
						return new GroupSummary(properties);
					};

					/**
					 * Encodes the specified GroupSummary message. Does not implicitly {@link rivet.client.cloud.group.GroupSummary.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.cloud.group.GroupSummary
					 * @static
					 * @param {rivet.client.cloud.group.IGroupSummary} message GroupSummary message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					GroupSummary.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.groupId != null && Object.hasOwnProperty.call(message, 'groupId'))
							writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.groupId);
						if (message.displayName != null && Object.hasOwnProperty.call(message, 'displayName'))
							writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.displayName);
						if (message.avatarUrl != null && Object.hasOwnProperty.call(message, 'avatarUrl'))
							writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.avatarUrl);
						if (message.isDeveloper != null && Object.hasOwnProperty.call(message, 'isDeveloper'))
							writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.isDeveloper);
						return writer;
					};

					/**
					 * Decodes a GroupSummary message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.cloud.group.GroupSummary
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.cloud.group.GroupSummary} GroupSummary
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					GroupSummary.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.cloud.group.GroupSummary();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.groupId = reader.string();
									break;
								case 2:
									message.displayName = reader.string();
									break;
								case 3:
									message.avatarUrl = reader.string();
									break;
								case 4:
									message.isDeveloper = reader.bool();
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a GroupSummary message.
					 * @function verify
					 * @memberof rivet.client.cloud.group.GroupSummary
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					GroupSummary.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						if (message.groupId != null && message.hasOwnProperty('groupId'))
							if (!$util.isString(message.groupId)) return 'groupId: string expected';
						if (message.displayName != null && message.hasOwnProperty('displayName'))
							if (!$util.isString(message.displayName)) return 'displayName: string expected';
						if (message.avatarUrl != null && message.hasOwnProperty('avatarUrl'))
							if (!$util.isString(message.avatarUrl)) return 'avatarUrl: string expected';
						if (message.isDeveloper != null && message.hasOwnProperty('isDeveloper'))
							if (typeof message.isDeveloper !== 'boolean')
								return 'isDeveloper: boolean expected';
						return null;
					};

					return GroupSummary;
				})();

				return group;
			})();

			return cloud;
		})();

		client.feed = (function () {
			/**
			 * Namespace feed.
			 * @memberof rivet.client
			 * @namespace
			 */
			const feed = {};

			feed.Item = (function () {
				/**
				 * Properties of an Item.
				 * @memberof rivet.client.feed
				 * @interface IItem
				 * @property {rivet.client.feed.IIdentityItem|null} [identity] Item identity
				 * @property {rivet.client.feed.ITournamentItem|null} [tournament] Item tournament
				 */

				/**
				 * Constructs a new Item.
				 * @memberof rivet.client.feed
				 * @classdesc Represents an Item.
				 * @implements IItem
				 * @constructor
				 * @param {rivet.client.feed.IItem=} [properties] Properties to set
				 */
				function Item(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Item identity.
				 * @member {rivet.client.feed.IIdentityItem|null|undefined} identity
				 * @memberof rivet.client.feed.Item
				 * @instance
				 */
				Item.prototype.identity = null;

				/**
				 * Item tournament.
				 * @member {rivet.client.feed.ITournamentItem|null|undefined} tournament
				 * @memberof rivet.client.feed.Item
				 * @instance
				 */
				Item.prototype.tournament = null;

				// OneOf field names bound to virtual getters and setters
				let $oneOfFields;

				/**
				 * Item item.
				 * @member {"identity"|"tournament"|undefined} item
				 * @memberof rivet.client.feed.Item
				 * @instance
				 */
				Object.defineProperty(Item.prototype, 'item', {
					get: $util.oneOfGetter(($oneOfFields = ['identity', 'tournament'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Creates a new Item instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.feed.Item
				 * @static
				 * @param {rivet.client.feed.IItem=} [properties] Properties to set
				 * @returns {rivet.client.feed.Item} Item instance
				 */
				Item.create = function create(properties) {
					return new Item(properties);
				};

				/**
				 * Encodes the specified Item message. Does not implicitly {@link rivet.client.feed.Item.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.feed.Item
				 * @static
				 * @param {rivet.client.feed.IItem} message Item message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Item.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.identity != null && Object.hasOwnProperty.call(message, 'identity'))
						$root.rivet.client.feed.IdentityItem.encode(
							message.identity,
							writer.uint32(/* id 100, wireType 2 =*/ 802).fork()
						).ldelim();
					if (message.tournament != null && Object.hasOwnProperty.call(message, 'tournament'))
						$root.rivet.client.feed.TournamentItem.encode(
							message.tournament,
							writer.uint32(/* id 101, wireType 2 =*/ 810).fork()
						).ldelim();
					return writer;
				};

				/**
				 * Decodes an Item message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.feed.Item
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.feed.Item} Item
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Item.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.feed.Item();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 100:
								message.identity = $root.rivet.client.feed.IdentityItem.decode(
									reader,
									reader.uint32()
								);
								break;
							case 101:
								message.tournament = $root.rivet.client.feed.TournamentItem.decode(
									reader,
									reader.uint32()
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies an Item message.
				 * @function verify
				 * @memberof rivet.client.feed.Item
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Item.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					let properties = {};
					if (message.identity != null && message.hasOwnProperty('identity')) {
						properties.item = 1;
						{
							let error = $root.rivet.client.feed.IdentityItem.verify(message.identity);
							if (error) return 'identity.' + error;
						}
					}
					if (message.tournament != null && message.hasOwnProperty('tournament')) {
						if (properties.item === 1) return 'item: multiple values';
						properties.item = 1;
						{
							let error = $root.rivet.client.feed.TournamentItem.verify(message.tournament);
							if (error) return 'tournament.' + error;
						}
					}
					return null;
				};

				return Item;
			})();

			feed.IdentityItem = (function () {
				/**
				 * Properties of an IdentityItem.
				 * @memberof rivet.client.feed
				 * @interface IIdentityItem
				 * @property {rivet.client.identity.IHandle|null} [identity] IdentityItem identity
				 */

				/**
				 * Constructs a new IdentityItem.
				 * @memberof rivet.client.feed
				 * @classdesc Represents an IdentityItem.
				 * @implements IIdentityItem
				 * @constructor
				 * @param {rivet.client.feed.IIdentityItem=} [properties] Properties to set
				 */
				function IdentityItem(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * IdentityItem identity.
				 * @member {rivet.client.identity.IHandle|null|undefined} identity
				 * @memberof rivet.client.feed.IdentityItem
				 * @instance
				 */
				IdentityItem.prototype.identity = null;

				/**
				 * Creates a new IdentityItem instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.feed.IdentityItem
				 * @static
				 * @param {rivet.client.feed.IIdentityItem=} [properties] Properties to set
				 * @returns {rivet.client.feed.IdentityItem} IdentityItem instance
				 */
				IdentityItem.create = function create(properties) {
					return new IdentityItem(properties);
				};

				/**
				 * Encodes the specified IdentityItem message. Does not implicitly {@link rivet.client.feed.IdentityItem.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.feed.IdentityItem
				 * @static
				 * @param {rivet.client.feed.IIdentityItem} message IdentityItem message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				IdentityItem.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.identity != null && Object.hasOwnProperty.call(message, 'identity'))
						$root.rivet.client.identity.Handle.encode(
							message.identity,
							writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
						).ldelim();
					return writer;
				};

				/**
				 * Decodes an IdentityItem message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.feed.IdentityItem
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.feed.IdentityItem} IdentityItem
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				IdentityItem.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.feed.IdentityItem();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.identity = $root.rivet.client.identity.Handle.decode(
									reader,
									reader.uint32()
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies an IdentityItem message.
				 * @function verify
				 * @memberof rivet.client.feed.IdentityItem
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				IdentityItem.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.identity != null && message.hasOwnProperty('identity')) {
						let error = $root.rivet.client.identity.Handle.verify(message.identity);
						if (error) return 'identity.' + error;
					}
					return null;
				};

				return IdentityItem;
			})();

			feed.TournamentItem = (function () {
				/**
				 * Properties of a TournamentItem.
				 * @memberof rivet.client.feed
				 * @interface ITournamentItem
				 * @property {string|null} [id] TournamentItem id
				 * @property {string|null} [title] TournamentItem title
				 * @property {string|null} [description] TournamentItem description
				 * @property {string|null} [url] TournamentItem url
				 */

				/**
				 * Constructs a new TournamentItem.
				 * @memberof rivet.client.feed
				 * @classdesc Represents a TournamentItem.
				 * @implements ITournamentItem
				 * @constructor
				 * @param {rivet.client.feed.ITournamentItem=} [properties] Properties to set
				 */
				function TournamentItem(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * TournamentItem id.
				 * @member {string} id
				 * @memberof rivet.client.feed.TournamentItem
				 * @instance
				 */
				TournamentItem.prototype.id = '';

				/**
				 * TournamentItem title.
				 * @member {string} title
				 * @memberof rivet.client.feed.TournamentItem
				 * @instance
				 */
				TournamentItem.prototype.title = '';

				/**
				 * TournamentItem description.
				 * @member {string} description
				 * @memberof rivet.client.feed.TournamentItem
				 * @instance
				 */
				TournamentItem.prototype.description = '';

				/**
				 * TournamentItem url.
				 * @member {string} url
				 * @memberof rivet.client.feed.TournamentItem
				 * @instance
				 */
				TournamentItem.prototype.url = '';

				/**
				 * Creates a new TournamentItem instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.feed.TournamentItem
				 * @static
				 * @param {rivet.client.feed.ITournamentItem=} [properties] Properties to set
				 * @returns {rivet.client.feed.TournamentItem} TournamentItem instance
				 */
				TournamentItem.create = function create(properties) {
					return new TournamentItem(properties);
				};

				/**
				 * Encodes the specified TournamentItem message. Does not implicitly {@link rivet.client.feed.TournamentItem.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.feed.TournamentItem
				 * @static
				 * @param {rivet.client.feed.ITournamentItem} message TournamentItem message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				TournamentItem.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
					if (message.title != null && Object.hasOwnProperty.call(message, 'title'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.title);
					if (message.url != null && Object.hasOwnProperty.call(message, 'url'))
						writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.url);
					if (message.description != null && Object.hasOwnProperty.call(message, 'description'))
						writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.description);
					return writer;
				};

				/**
				 * Decodes a TournamentItem message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.feed.TournamentItem
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.feed.TournamentItem} TournamentItem
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				TournamentItem.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.feed.TournamentItem();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.id = reader.string();
								break;
							case 2:
								message.title = reader.string();
								break;
							case 4:
								message.description = reader.string();
								break;
							case 3:
								message.url = reader.string();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a TournamentItem message.
				 * @function verify
				 * @memberof rivet.client.feed.TournamentItem
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				TournamentItem.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.id != null && message.hasOwnProperty('id'))
						if (!$util.isString(message.id)) return 'id: string expected';
					if (message.title != null && message.hasOwnProperty('title'))
						if (!$util.isString(message.title)) return 'title: string expected';
					if (message.description != null && message.hasOwnProperty('description'))
						if (!$util.isString(message.description)) return 'description: string expected';
					if (message.url != null && message.hasOwnProperty('url'))
						if (!$util.isString(message.url)) return 'url: string expected';
					return null;
				};

				return TournamentItem;
			})();

			return feed;
		})();

		client.game = (function () {
			/**
			 * Namespace game.
			 * @memberof rivet.client
			 * @namespace
			 */
			const game = {};

			game.Handle = (function () {
				/**
				 * Properties of a Handle.
				 * @memberof rivet.client.game
				 * @interface IHandle
				 * @property {string|null} [id] Handle id
				 * @property {string|null} [nameId] Handle nameId
				 * @property {string|null} [displayName] Handle displayName
				 * @property {string|null} [logoUrl] Handle logoUrl
				 * @property {string|null} [bannerUrl] Handle bannerUrl
				 */

				/**
				 * Constructs a new Handle.
				 * @memberof rivet.client.game
				 * @classdesc Represents a Handle.
				 * @implements IHandle
				 * @constructor
				 * @param {rivet.client.game.IHandle=} [properties] Properties to set
				 */
				function Handle(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Handle id.
				 * @member {string} id
				 * @memberof rivet.client.game.Handle
				 * @instance
				 */
				Handle.prototype.id = '';

				/**
				 * Handle nameId.
				 * @member {string} nameId
				 * @memberof rivet.client.game.Handle
				 * @instance
				 */
				Handle.prototype.nameId = '';

				/**
				 * Handle displayName.
				 * @member {string} displayName
				 * @memberof rivet.client.game.Handle
				 * @instance
				 */
				Handle.prototype.displayName = '';

				/**
				 * Handle logoUrl.
				 * @member {string|null|undefined} logoUrl
				 * @memberof rivet.client.game.Handle
				 * @instance
				 */
				Handle.prototype.logoUrl = null;

				/**
				 * Handle bannerUrl.
				 * @member {string|null|undefined} bannerUrl
				 * @memberof rivet.client.game.Handle
				 * @instance
				 */
				Handle.prototype.bannerUrl = null;

				// OneOf field names bound to virtual getters and setters
				let $oneOfFields;

				/**
				 * Handle _logoUrl.
				 * @member {"logoUrl"|undefined} _logoUrl
				 * @memberof rivet.client.game.Handle
				 * @instance
				 */
				Object.defineProperty(Handle.prototype, '_logoUrl', {
					get: $util.oneOfGetter(($oneOfFields = ['logoUrl'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Handle _bannerUrl.
				 * @member {"bannerUrl"|undefined} _bannerUrl
				 * @memberof rivet.client.game.Handle
				 * @instance
				 */
				Object.defineProperty(Handle.prototype, '_bannerUrl', {
					get: $util.oneOfGetter(($oneOfFields = ['bannerUrl'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Creates a new Handle instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.game.Handle
				 * @static
				 * @param {rivet.client.game.IHandle=} [properties] Properties to set
				 * @returns {rivet.client.game.Handle} Handle instance
				 */
				Handle.create = function create(properties) {
					return new Handle(properties);
				};

				/**
				 * Encodes the specified Handle message. Does not implicitly {@link rivet.client.game.Handle.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.game.Handle
				 * @static
				 * @param {rivet.client.game.IHandle} message Handle message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Handle.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
					if (message.nameId != null && Object.hasOwnProperty.call(message, 'nameId'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.nameId);
					if (message.displayName != null && Object.hasOwnProperty.call(message, 'displayName'))
						writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.displayName);
					if (message.logoUrl != null && Object.hasOwnProperty.call(message, 'logoUrl'))
						writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.logoUrl);
					if (message.bannerUrl != null && Object.hasOwnProperty.call(message, 'bannerUrl'))
						writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.bannerUrl);
					return writer;
				};

				/**
				 * Decodes a Handle message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.game.Handle
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.game.Handle} Handle
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Handle.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.game.Handle();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.id = reader.string();
								break;
							case 2:
								message.nameId = reader.string();
								break;
							case 3:
								message.displayName = reader.string();
								break;
							case 4:
								message.logoUrl = reader.string();
								break;
							case 5:
								message.bannerUrl = reader.string();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Handle message.
				 * @function verify
				 * @memberof rivet.client.game.Handle
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Handle.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					let properties = {};
					if (message.id != null && message.hasOwnProperty('id'))
						if (!$util.isString(message.id)) return 'id: string expected';
					if (message.nameId != null && message.hasOwnProperty('nameId'))
						if (!$util.isString(message.nameId)) return 'nameId: string expected';
					if (message.displayName != null && message.hasOwnProperty('displayName'))
						if (!$util.isString(message.displayName)) return 'displayName: string expected';
					if (message.logoUrl != null && message.hasOwnProperty('logoUrl')) {
						properties._logoUrl = 1;
						if (!$util.isString(message.logoUrl)) return 'logoUrl: string expected';
					}
					if (message.bannerUrl != null && message.hasOwnProperty('bannerUrl')) {
						properties._bannerUrl = 1;
						if (!$util.isString(message.bannerUrl)) return 'bannerUrl: string expected';
					}
					return null;
				};

				return Handle;
			})();

			game.LeaderboardCategory = (function () {
				/**
				 * Properties of a LeaderboardCategory.
				 * @memberof rivet.client.game
				 * @interface ILeaderboardCategory
				 * @property {string|null} [displayName] LeaderboardCategory displayName
				 */

				/**
				 * Constructs a new LeaderboardCategory.
				 * @memberof rivet.client.game
				 * @classdesc Represents a LeaderboardCategory.
				 * @implements ILeaderboardCategory
				 * @constructor
				 * @param {rivet.client.game.ILeaderboardCategory=} [properties] Properties to set
				 */
				function LeaderboardCategory(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * LeaderboardCategory displayName.
				 * @member {string} displayName
				 * @memberof rivet.client.game.LeaderboardCategory
				 * @instance
				 */
				LeaderboardCategory.prototype.displayName = '';

				/**
				 * Creates a new LeaderboardCategory instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.game.LeaderboardCategory
				 * @static
				 * @param {rivet.client.game.ILeaderboardCategory=} [properties] Properties to set
				 * @returns {rivet.client.game.LeaderboardCategory} LeaderboardCategory instance
				 */
				LeaderboardCategory.create = function create(properties) {
					return new LeaderboardCategory(properties);
				};

				/**
				 * Encodes the specified LeaderboardCategory message. Does not implicitly {@link rivet.client.game.LeaderboardCategory.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.game.LeaderboardCategory
				 * @static
				 * @param {rivet.client.game.ILeaderboardCategory} message LeaderboardCategory message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				LeaderboardCategory.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.displayName != null && Object.hasOwnProperty.call(message, 'displayName'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.displayName);
					return writer;
				};

				/**
				 * Decodes a LeaderboardCategory message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.game.LeaderboardCategory
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.game.LeaderboardCategory} LeaderboardCategory
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				LeaderboardCategory.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.game.LeaderboardCategory();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.displayName = reader.string();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a LeaderboardCategory message.
				 * @function verify
				 * @memberof rivet.client.game.LeaderboardCategory
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				LeaderboardCategory.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.displayName != null && message.hasOwnProperty('displayName'))
						if (!$util.isString(message.displayName)) return 'displayName: string expected';
					return null;
				};

				return LeaderboardCategory;
			})();

			game.LeaderboardRow = (function () {
				/**
				 * Properties of a LeaderboardRow.
				 * @memberof rivet.client.game
				 * @interface ILeaderboardRow
				 * @property {rivet.client.game.ILeaderboardRowOwner|null} [owner] LeaderboardRow owner
				 * @property {Array.<number>|null} [values] LeaderboardRow values
				 */

				/**
				 * Constructs a new LeaderboardRow.
				 * @memberof rivet.client.game
				 * @classdesc Represents a LeaderboardRow.
				 * @implements ILeaderboardRow
				 * @constructor
				 * @param {rivet.client.game.ILeaderboardRow=} [properties] Properties to set
				 */
				function LeaderboardRow(properties) {
					this.values = [];
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * LeaderboardRow owner.
				 * @member {rivet.client.game.ILeaderboardRowOwner|null|undefined} owner
				 * @memberof rivet.client.game.LeaderboardRow
				 * @instance
				 */
				LeaderboardRow.prototype.owner = null;

				/**
				 * LeaderboardRow values.
				 * @member {Array.<number>} values
				 * @memberof rivet.client.game.LeaderboardRow
				 * @instance
				 */
				LeaderboardRow.prototype.values = $util.emptyArray;

				/**
				 * Creates a new LeaderboardRow instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.game.LeaderboardRow
				 * @static
				 * @param {rivet.client.game.ILeaderboardRow=} [properties] Properties to set
				 * @returns {rivet.client.game.LeaderboardRow} LeaderboardRow instance
				 */
				LeaderboardRow.create = function create(properties) {
					return new LeaderboardRow(properties);
				};

				/**
				 * Encodes the specified LeaderboardRow message. Does not implicitly {@link rivet.client.game.LeaderboardRow.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.game.LeaderboardRow
				 * @static
				 * @param {rivet.client.game.ILeaderboardRow} message LeaderboardRow message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				LeaderboardRow.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.owner != null && Object.hasOwnProperty.call(message, 'owner'))
						$root.rivet.client.game.LeaderboardRowOwner.encode(
							message.owner,
							writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
						).ldelim();
					if (message.values != null && message.values.length) {
						writer.uint32(/* id 2, wireType 2 =*/ 18).fork();
						for (let i = 0; i < message.values.length; ++i) writer.float(message.values[i]);
						writer.ldelim();
					}
					return writer;
				};

				/**
				 * Decodes a LeaderboardRow message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.game.LeaderboardRow
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.game.LeaderboardRow} LeaderboardRow
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				LeaderboardRow.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.game.LeaderboardRow();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.owner = $root.rivet.client.game.LeaderboardRowOwner.decode(
									reader,
									reader.uint32()
								);
								break;
							case 2:
								if (!(message.values && message.values.length)) message.values = [];
								if ((tag & 7) === 2) {
									let end2 = reader.uint32() + reader.pos;
									while (reader.pos < end2) message.values.push(reader.float());
								} else message.values.push(reader.float());
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a LeaderboardRow message.
				 * @function verify
				 * @memberof rivet.client.game.LeaderboardRow
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				LeaderboardRow.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.owner != null && message.hasOwnProperty('owner')) {
						let error = $root.rivet.client.game.LeaderboardRowOwner.verify(message.owner);
						if (error) return 'owner.' + error;
					}
					if (message.values != null && message.hasOwnProperty('values')) {
						if (!Array.isArray(message.values)) return 'values: array expected';
						for (let i = 0; i < message.values.length; ++i)
							if (typeof message.values[i] !== 'number') return 'values: number[] expected';
					}
					return null;
				};

				return LeaderboardRow;
			})();

			game.LeaderboardRowOwner = (function () {
				/**
				 * Properties of a LeaderboardRowOwner.
				 * @memberof rivet.client.game
				 * @interface ILeaderboardRowOwner
				 * @property {rivet.client.identity.IHandle|null} [identity] LeaderboardRowOwner identity
				 * @property {rivet.client.group.IHandle|null} [group] LeaderboardRowOwner group
				 */

				/**
				 * Constructs a new LeaderboardRowOwner.
				 * @memberof rivet.client.game
				 * @classdesc Represents a LeaderboardRowOwner.
				 * @implements ILeaderboardRowOwner
				 * @constructor
				 * @param {rivet.client.game.ILeaderboardRowOwner=} [properties] Properties to set
				 */
				function LeaderboardRowOwner(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * LeaderboardRowOwner identity.
				 * @member {rivet.client.identity.IHandle|null|undefined} identity
				 * @memberof rivet.client.game.LeaderboardRowOwner
				 * @instance
				 */
				LeaderboardRowOwner.prototype.identity = null;

				/**
				 * LeaderboardRowOwner group.
				 * @member {rivet.client.group.IHandle|null|undefined} group
				 * @memberof rivet.client.game.LeaderboardRowOwner
				 * @instance
				 */
				LeaderboardRowOwner.prototype.group = null;

				// OneOf field names bound to virtual getters and setters
				let $oneOfFields;

				/**
				 * LeaderboardRowOwner _identity.
				 * @member {"identity"|undefined} _identity
				 * @memberof rivet.client.game.LeaderboardRowOwner
				 * @instance
				 */
				Object.defineProperty(LeaderboardRowOwner.prototype, '_identity', {
					get: $util.oneOfGetter(($oneOfFields = ['identity'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * LeaderboardRowOwner _group.
				 * @member {"group"|undefined} _group
				 * @memberof rivet.client.game.LeaderboardRowOwner
				 * @instance
				 */
				Object.defineProperty(LeaderboardRowOwner.prototype, '_group', {
					get: $util.oneOfGetter(($oneOfFields = ['group'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Creates a new LeaderboardRowOwner instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.game.LeaderboardRowOwner
				 * @static
				 * @param {rivet.client.game.ILeaderboardRowOwner=} [properties] Properties to set
				 * @returns {rivet.client.game.LeaderboardRowOwner} LeaderboardRowOwner instance
				 */
				LeaderboardRowOwner.create = function create(properties) {
					return new LeaderboardRowOwner(properties);
				};

				/**
				 * Encodes the specified LeaderboardRowOwner message. Does not implicitly {@link rivet.client.game.LeaderboardRowOwner.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.game.LeaderboardRowOwner
				 * @static
				 * @param {rivet.client.game.ILeaderboardRowOwner} message LeaderboardRowOwner message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				LeaderboardRowOwner.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.identity != null && Object.hasOwnProperty.call(message, 'identity'))
						$root.rivet.client.identity.Handle.encode(
							message.identity,
							writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
						).ldelim();
					if (message.group != null && Object.hasOwnProperty.call(message, 'group'))
						$root.rivet.client.group.Handle.encode(
							message.group,
							writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
						).ldelim();
					return writer;
				};

				/**
				 * Decodes a LeaderboardRowOwner message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.game.LeaderboardRowOwner
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.game.LeaderboardRowOwner} LeaderboardRowOwner
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				LeaderboardRowOwner.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.game.LeaderboardRowOwner();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.identity = $root.rivet.client.identity.Handle.decode(
									reader,
									reader.uint32()
								);
								break;
							case 2:
								message.group = $root.rivet.client.group.Handle.decode(
									reader,
									reader.uint32()
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a LeaderboardRowOwner message.
				 * @function verify
				 * @memberof rivet.client.game.LeaderboardRowOwner
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				LeaderboardRowOwner.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					let properties = {};
					if (message.identity != null && message.hasOwnProperty('identity')) {
						properties._identity = 1;
						{
							let error = $root.rivet.client.identity.Handle.verify(message.identity);
							if (error) return 'identity.' + error;
						}
					}
					if (message.group != null && message.hasOwnProperty('group')) {
						properties._group = 1;
						{
							let error = $root.rivet.client.group.Handle.verify(message.group);
							if (error) return 'group.' + error;
						}
					}
					return null;
				};

				return LeaderboardRowOwner;
			})();

			game.Profile = (function () {
				/**
				 * Properties of a Profile.
				 * @memberof rivet.client.game
				 * @interface IProfile
				 * @property {string|null} [id] Profile id
				 * @property {string|null} [nameId] Profile nameId
				 * @property {string|null} [displayName] Profile displayName
				 * @property {string|null} [logoUrl] Profile logoUrl
				 * @property {string|null} [bannerUrl] Profile bannerUrl
				 * @property {string|null} [url] Profile url
				 * @property {rivet.client.group.ISummary|null} [developer] Profile developer
				 * @property {Array.<string>|null} [tags] Profile tags
				 * @property {boolean|null} [isStarred] Profile isStarred
				 * @property {number|null} [starCount] Profile starCount
				 * @property {string|null} [description] Profile description
				 * @property {Array.<rivet.client.game.IPlatformLink>|null} [platforms] Profile platforms
				 * @property {Array.<rivet.client.group.ISummary>|null} [popularGroups] Profile popularGroups
				 * @property {Array.<rivet.client.game.ILeaderboardCategory>|null} [identityLeaderboardCategories] Profile identityLeaderboardCategories
				 * @property {Array.<rivet.client.game.ILeaderboardCategory>|null} [groupLeaderboardCategories] Profile groupLeaderboardCategories
				 */

				/**
				 * Constructs a new Profile.
				 * @memberof rivet.client.game
				 * @classdesc Represents a Profile.
				 * @implements IProfile
				 * @constructor
				 * @param {rivet.client.game.IProfile=} [properties] Properties to set
				 */
				function Profile(properties) {
					this.tags = [];
					this.platforms = [];
					this.popularGroups = [];
					this.identityLeaderboardCategories = [];
					this.groupLeaderboardCategories = [];
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Profile id.
				 * @member {string} id
				 * @memberof rivet.client.game.Profile
				 * @instance
				 */
				Profile.prototype.id = '';

				/**
				 * Profile nameId.
				 * @member {string} nameId
				 * @memberof rivet.client.game.Profile
				 * @instance
				 */
				Profile.prototype.nameId = '';

				/**
				 * Profile displayName.
				 * @member {string} displayName
				 * @memberof rivet.client.game.Profile
				 * @instance
				 */
				Profile.prototype.displayName = '';

				/**
				 * Profile logoUrl.
				 * @member {string|null|undefined} logoUrl
				 * @memberof rivet.client.game.Profile
				 * @instance
				 */
				Profile.prototype.logoUrl = null;

				/**
				 * Profile bannerUrl.
				 * @member {string|null|undefined} bannerUrl
				 * @memberof rivet.client.game.Profile
				 * @instance
				 */
				Profile.prototype.bannerUrl = null;

				/**
				 * Profile url.
				 * @member {string} url
				 * @memberof rivet.client.game.Profile
				 * @instance
				 */
				Profile.prototype.url = '';

				/**
				 * Profile developer.
				 * @member {rivet.client.group.ISummary|null|undefined} developer
				 * @memberof rivet.client.game.Profile
				 * @instance
				 */
				Profile.prototype.developer = null;

				/**
				 * Profile tags.
				 * @member {Array.<string>} tags
				 * @memberof rivet.client.game.Profile
				 * @instance
				 */
				Profile.prototype.tags = $util.emptyArray;

				/**
				 * Profile isStarred.
				 * @member {boolean} isStarred
				 * @memberof rivet.client.game.Profile
				 * @instance
				 */
				Profile.prototype.isStarred = false;

				/**
				 * Profile starCount.
				 * @member {number} starCount
				 * @memberof rivet.client.game.Profile
				 * @instance
				 */
				Profile.prototype.starCount = 0;

				/**
				 * Profile description.
				 * @member {string} description
				 * @memberof rivet.client.game.Profile
				 * @instance
				 */
				Profile.prototype.description = '';

				/**
				 * Profile platforms.
				 * @member {Array.<rivet.client.game.IPlatformLink>} platforms
				 * @memberof rivet.client.game.Profile
				 * @instance
				 */
				Profile.prototype.platforms = $util.emptyArray;

				/**
				 * Profile popularGroups.
				 * @member {Array.<rivet.client.group.ISummary>} popularGroups
				 * @memberof rivet.client.game.Profile
				 * @instance
				 */
				Profile.prototype.popularGroups = $util.emptyArray;

				/**
				 * Profile identityLeaderboardCategories.
				 * @member {Array.<rivet.client.game.ILeaderboardCategory>} identityLeaderboardCategories
				 * @memberof rivet.client.game.Profile
				 * @instance
				 */
				Profile.prototype.identityLeaderboardCategories = $util.emptyArray;

				/**
				 * Profile groupLeaderboardCategories.
				 * @member {Array.<rivet.client.game.ILeaderboardCategory>} groupLeaderboardCategories
				 * @memberof rivet.client.game.Profile
				 * @instance
				 */
				Profile.prototype.groupLeaderboardCategories = $util.emptyArray;

				// OneOf field names bound to virtual getters and setters
				let $oneOfFields;

				/**
				 * Profile _logoUrl.
				 * @member {"logoUrl"|undefined} _logoUrl
				 * @memberof rivet.client.game.Profile
				 * @instance
				 */
				Object.defineProperty(Profile.prototype, '_logoUrl', {
					get: $util.oneOfGetter(($oneOfFields = ['logoUrl'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Profile _bannerUrl.
				 * @member {"bannerUrl"|undefined} _bannerUrl
				 * @memberof rivet.client.game.Profile
				 * @instance
				 */
				Object.defineProperty(Profile.prototype, '_bannerUrl', {
					get: $util.oneOfGetter(($oneOfFields = ['bannerUrl'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Creates a new Profile instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.game.Profile
				 * @static
				 * @param {rivet.client.game.IProfile=} [properties] Properties to set
				 * @returns {rivet.client.game.Profile} Profile instance
				 */
				Profile.create = function create(properties) {
					return new Profile(properties);
				};

				/**
				 * Encodes the specified Profile message. Does not implicitly {@link rivet.client.game.Profile.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.game.Profile
				 * @static
				 * @param {rivet.client.game.IProfile} message Profile message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Profile.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
					if (message.nameId != null && Object.hasOwnProperty.call(message, 'nameId'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.nameId);
					if (message.displayName != null && Object.hasOwnProperty.call(message, 'displayName'))
						writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.displayName);
					if (message.logoUrl != null && Object.hasOwnProperty.call(message, 'logoUrl'))
						writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.logoUrl);
					if (message.bannerUrl != null && Object.hasOwnProperty.call(message, 'bannerUrl'))
						writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.bannerUrl);
					if (message.url != null && Object.hasOwnProperty.call(message, 'url'))
						writer.uint32(/* id 100, wireType 2 =*/ 802).string(message.url);
					if (message.developer != null && Object.hasOwnProperty.call(message, 'developer'))
						$root.rivet.client.group.Summary.encode(
							message.developer,
							writer.uint32(/* id 101, wireType 2 =*/ 810).fork()
						).ldelim();
					if (message.tags != null && message.tags.length)
						for (let i = 0; i < message.tags.length; ++i)
							writer.uint32(/* id 102, wireType 2 =*/ 818).string(message.tags[i]);
					if (message.isStarred != null && Object.hasOwnProperty.call(message, 'isStarred'))
						writer.uint32(/* id 103, wireType 0 =*/ 824).bool(message.isStarred);
					if (message.starCount != null && Object.hasOwnProperty.call(message, 'starCount'))
						writer.uint32(/* id 200, wireType 0 =*/ 1600).uint32(message.starCount);
					if (message.description != null && Object.hasOwnProperty.call(message, 'description'))
						writer.uint32(/* id 201, wireType 2 =*/ 1610).string(message.description);
					if (message.platforms != null && message.platforms.length)
						for (let i = 0; i < message.platforms.length; ++i)
							$root.rivet.client.game.PlatformLink.encode(
								message.platforms[i],
								writer.uint32(/* id 202, wireType 2 =*/ 1618).fork()
							).ldelim();
					if (message.popularGroups != null && message.popularGroups.length)
						for (let i = 0; i < message.popularGroups.length; ++i)
							$root.rivet.client.group.Summary.encode(
								message.popularGroups[i],
								writer.uint32(/* id 203, wireType 2 =*/ 1626).fork()
							).ldelim();
					if (
						message.identityLeaderboardCategories != null &&
						message.identityLeaderboardCategories.length
					)
						for (let i = 0; i < message.identityLeaderboardCategories.length; ++i)
							$root.rivet.client.game.LeaderboardCategory.encode(
								message.identityLeaderboardCategories[i],
								writer.uint32(/* id 204, wireType 2 =*/ 1634).fork()
							).ldelim();
					if (
						message.groupLeaderboardCategories != null &&
						message.groupLeaderboardCategories.length
					)
						for (let i = 0; i < message.groupLeaderboardCategories.length; ++i)
							$root.rivet.client.game.LeaderboardCategory.encode(
								message.groupLeaderboardCategories[i],
								writer.uint32(/* id 205, wireType 2 =*/ 1642).fork()
							).ldelim();
					return writer;
				};

				/**
				 * Decodes a Profile message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.game.Profile
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.game.Profile} Profile
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Profile.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.game.Profile();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.id = reader.string();
								break;
							case 2:
								message.nameId = reader.string();
								break;
							case 3:
								message.displayName = reader.string();
								break;
							case 4:
								message.logoUrl = reader.string();
								break;
							case 5:
								message.bannerUrl = reader.string();
								break;
							case 100:
								message.url = reader.string();
								break;
							case 101:
								message.developer = $root.rivet.client.group.Summary.decode(
									reader,
									reader.uint32()
								);
								break;
							case 102:
								if (!(message.tags && message.tags.length)) message.tags = [];
								message.tags.push(reader.string());
								break;
							case 103:
								message.isStarred = reader.bool();
								break;
							case 200:
								message.starCount = reader.uint32();
								break;
							case 201:
								message.description = reader.string();
								break;
							case 202:
								if (!(message.platforms && message.platforms.length)) message.platforms = [];
								message.platforms.push(
									$root.rivet.client.game.PlatformLink.decode(reader, reader.uint32())
								);
								break;
							case 203:
								if (!(message.popularGroups && message.popularGroups.length))
									message.popularGroups = [];
								message.popularGroups.push(
									$root.rivet.client.group.Summary.decode(reader, reader.uint32())
								);
								break;
							case 204:
								if (
									!(
										message.identityLeaderboardCategories &&
										message.identityLeaderboardCategories.length
									)
								)
									message.identityLeaderboardCategories = [];
								message.identityLeaderboardCategories.push(
									$root.rivet.client.game.LeaderboardCategory.decode(
										reader,
										reader.uint32()
									)
								);
								break;
							case 205:
								if (
									!(
										message.groupLeaderboardCategories &&
										message.groupLeaderboardCategories.length
									)
								)
									message.groupLeaderboardCategories = [];
								message.groupLeaderboardCategories.push(
									$root.rivet.client.game.LeaderboardCategory.decode(
										reader,
										reader.uint32()
									)
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Profile message.
				 * @function verify
				 * @memberof rivet.client.game.Profile
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Profile.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					let properties = {};
					if (message.id != null && message.hasOwnProperty('id'))
						if (!$util.isString(message.id)) return 'id: string expected';
					if (message.nameId != null && message.hasOwnProperty('nameId'))
						if (!$util.isString(message.nameId)) return 'nameId: string expected';
					if (message.displayName != null && message.hasOwnProperty('displayName'))
						if (!$util.isString(message.displayName)) return 'displayName: string expected';
					if (message.logoUrl != null && message.hasOwnProperty('logoUrl')) {
						properties._logoUrl = 1;
						if (!$util.isString(message.logoUrl)) return 'logoUrl: string expected';
					}
					if (message.bannerUrl != null && message.hasOwnProperty('bannerUrl')) {
						properties._bannerUrl = 1;
						if (!$util.isString(message.bannerUrl)) return 'bannerUrl: string expected';
					}
					if (message.url != null && message.hasOwnProperty('url'))
						if (!$util.isString(message.url)) return 'url: string expected';
					if (message.developer != null && message.hasOwnProperty('developer')) {
						let error = $root.rivet.client.group.Summary.verify(message.developer);
						if (error) return 'developer.' + error;
					}
					if (message.tags != null && message.hasOwnProperty('tags')) {
						if (!Array.isArray(message.tags)) return 'tags: array expected';
						for (let i = 0; i < message.tags.length; ++i)
							if (!$util.isString(message.tags[i])) return 'tags: string[] expected';
					}
					if (message.isStarred != null && message.hasOwnProperty('isStarred'))
						if (typeof message.isStarred !== 'boolean') return 'isStarred: boolean expected';
					if (message.starCount != null && message.hasOwnProperty('starCount'))
						if (!$util.isInteger(message.starCount)) return 'starCount: integer expected';
					if (message.description != null && message.hasOwnProperty('description'))
						if (!$util.isString(message.description)) return 'description: string expected';
					if (message.platforms != null && message.hasOwnProperty('platforms')) {
						if (!Array.isArray(message.platforms)) return 'platforms: array expected';
						for (let i = 0; i < message.platforms.length; ++i) {
							let error = $root.rivet.client.game.PlatformLink.verify(message.platforms[i]);
							if (error) return 'platforms.' + error;
						}
					}
					if (message.popularGroups != null && message.hasOwnProperty('popularGroups')) {
						if (!Array.isArray(message.popularGroups)) return 'popularGroups: array expected';
						for (let i = 0; i < message.popularGroups.length; ++i) {
							let error = $root.rivet.client.group.Summary.verify(message.popularGroups[i]);
							if (error) return 'popularGroups.' + error;
						}
					}
					if (
						message.identityLeaderboardCategories != null &&
						message.hasOwnProperty('identityLeaderboardCategories')
					) {
						if (!Array.isArray(message.identityLeaderboardCategories))
							return 'identityLeaderboardCategories: array expected';
						for (let i = 0; i < message.identityLeaderboardCategories.length; ++i) {
							let error = $root.rivet.client.game.LeaderboardCategory.verify(
								message.identityLeaderboardCategories[i]
							);
							if (error) return 'identityLeaderboardCategories.' + error;
						}
					}
					if (
						message.groupLeaderboardCategories != null &&
						message.hasOwnProperty('groupLeaderboardCategories')
					) {
						if (!Array.isArray(message.groupLeaderboardCategories))
							return 'groupLeaderboardCategories: array expected';
						for (let i = 0; i < message.groupLeaderboardCategories.length; ++i) {
							let error = $root.rivet.client.game.LeaderboardCategory.verify(
								message.groupLeaderboardCategories[i]
							);
							if (error) return 'groupLeaderboardCategories.' + error;
						}
					}
					return null;
				};

				return Profile;
			})();

			game.PlatformLink = (function () {
				/**
				 * Properties of a PlatformLink.
				 * @memberof rivet.client.game
				 * @interface IPlatformLink
				 * @property {string|null} [displayName] PlatformLink displayName
				 * @property {string|null} [url] PlatformLink url
				 */

				/**
				 * Constructs a new PlatformLink.
				 * @memberof rivet.client.game
				 * @classdesc Represents a PlatformLink.
				 * @implements IPlatformLink
				 * @constructor
				 * @param {rivet.client.game.IPlatformLink=} [properties] Properties to set
				 */
				function PlatformLink(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * PlatformLink displayName.
				 * @member {string} displayName
				 * @memberof rivet.client.game.PlatformLink
				 * @instance
				 */
				PlatformLink.prototype.displayName = '';

				/**
				 * PlatformLink url.
				 * @member {string} url
				 * @memberof rivet.client.game.PlatformLink
				 * @instance
				 */
				PlatformLink.prototype.url = '';

				/**
				 * Creates a new PlatformLink instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.game.PlatformLink
				 * @static
				 * @param {rivet.client.game.IPlatformLink=} [properties] Properties to set
				 * @returns {rivet.client.game.PlatformLink} PlatformLink instance
				 */
				PlatformLink.create = function create(properties) {
					return new PlatformLink(properties);
				};

				/**
				 * Encodes the specified PlatformLink message. Does not implicitly {@link rivet.client.game.PlatformLink.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.game.PlatformLink
				 * @static
				 * @param {rivet.client.game.IPlatformLink} message PlatformLink message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				PlatformLink.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.displayName != null && Object.hasOwnProperty.call(message, 'displayName'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.displayName);
					if (message.url != null && Object.hasOwnProperty.call(message, 'url'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.url);
					return writer;
				};

				/**
				 * Decodes a PlatformLink message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.game.PlatformLink
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.game.PlatformLink} PlatformLink
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				PlatformLink.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.game.PlatformLink();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.displayName = reader.string();
								break;
							case 2:
								message.url = reader.string();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a PlatformLink message.
				 * @function verify
				 * @memberof rivet.client.game.PlatformLink
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				PlatformLink.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.displayName != null && message.hasOwnProperty('displayName'))
						if (!$util.isString(message.displayName)) return 'displayName: string expected';
					if (message.url != null && message.hasOwnProperty('url'))
						if (!$util.isString(message.url)) return 'url: string expected';
					return null;
				};

				return PlatformLink;
			})();

			game.StatConfig = (function () {
				/**
				 * Properties of a StatConfig.
				 * @memberof rivet.client.game
				 * @interface IStatConfig
				 * @property {string|null} [recordId] StatConfig recordId
				 * @property {string|null} [iconId] StatConfig iconId
				 * @property {string|null} [format] StatConfig format
				 * @property {string|null} [aggregation] StatConfig aggregation
				 * @property {string|null} [sorting] StatConfig sorting
				 * @property {number|null} [priority] StatConfig priority
				 * @property {string|null} [displayName] StatConfig displayName
				 * @property {string|null} [postfixSingular] StatConfig postfixSingular
				 * @property {string|null} [postfixPlural] StatConfig postfixPlural
				 * @property {string|null} [prefixSingular] StatConfig prefixSingular
				 * @property {string|null} [prefixPlural] StatConfig prefixPlural
				 */

				/**
				 * Constructs a new StatConfig.
				 * @memberof rivet.client.game
				 * @classdesc Represents a StatConfig.
				 * @implements IStatConfig
				 * @constructor
				 * @param {rivet.client.game.IStatConfig=} [properties] Properties to set
				 */
				function StatConfig(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * StatConfig recordId.
				 * @member {string} recordId
				 * @memberof rivet.client.game.StatConfig
				 * @instance
				 */
				StatConfig.prototype.recordId = '';

				/**
				 * StatConfig iconId.
				 * @member {string} iconId
				 * @memberof rivet.client.game.StatConfig
				 * @instance
				 */
				StatConfig.prototype.iconId = '';

				/**
				 * StatConfig format.
				 * @member {string} format
				 * @memberof rivet.client.game.StatConfig
				 * @instance
				 */
				StatConfig.prototype.format = '';

				/**
				 * StatConfig aggregation.
				 * @member {string} aggregation
				 * @memberof rivet.client.game.StatConfig
				 * @instance
				 */
				StatConfig.prototype.aggregation = '';

				/**
				 * StatConfig sorting.
				 * @member {string} sorting
				 * @memberof rivet.client.game.StatConfig
				 * @instance
				 */
				StatConfig.prototype.sorting = '';

				/**
				 * StatConfig priority.
				 * @member {number} priority
				 * @memberof rivet.client.game.StatConfig
				 * @instance
				 */
				StatConfig.prototype.priority = 0;

				/**
				 * StatConfig displayName.
				 * @member {string} displayName
				 * @memberof rivet.client.game.StatConfig
				 * @instance
				 */
				StatConfig.prototype.displayName = '';

				/**
				 * StatConfig postfixSingular.
				 * @member {string|null|undefined} postfixSingular
				 * @memberof rivet.client.game.StatConfig
				 * @instance
				 */
				StatConfig.prototype.postfixSingular = null;

				/**
				 * StatConfig postfixPlural.
				 * @member {string|null|undefined} postfixPlural
				 * @memberof rivet.client.game.StatConfig
				 * @instance
				 */
				StatConfig.prototype.postfixPlural = null;

				/**
				 * StatConfig prefixSingular.
				 * @member {string|null|undefined} prefixSingular
				 * @memberof rivet.client.game.StatConfig
				 * @instance
				 */
				StatConfig.prototype.prefixSingular = null;

				/**
				 * StatConfig prefixPlural.
				 * @member {string|null|undefined} prefixPlural
				 * @memberof rivet.client.game.StatConfig
				 * @instance
				 */
				StatConfig.prototype.prefixPlural = null;

				// OneOf field names bound to virtual getters and setters
				let $oneOfFields;

				/**
				 * StatConfig _postfixSingular.
				 * @member {"postfixSingular"|undefined} _postfixSingular
				 * @memberof rivet.client.game.StatConfig
				 * @instance
				 */
				Object.defineProperty(StatConfig.prototype, '_postfixSingular', {
					get: $util.oneOfGetter(($oneOfFields = ['postfixSingular'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * StatConfig _postfixPlural.
				 * @member {"postfixPlural"|undefined} _postfixPlural
				 * @memberof rivet.client.game.StatConfig
				 * @instance
				 */
				Object.defineProperty(StatConfig.prototype, '_postfixPlural', {
					get: $util.oneOfGetter(($oneOfFields = ['postfixPlural'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * StatConfig _prefixSingular.
				 * @member {"prefixSingular"|undefined} _prefixSingular
				 * @memberof rivet.client.game.StatConfig
				 * @instance
				 */
				Object.defineProperty(StatConfig.prototype, '_prefixSingular', {
					get: $util.oneOfGetter(($oneOfFields = ['prefixSingular'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * StatConfig _prefixPlural.
				 * @member {"prefixPlural"|undefined} _prefixPlural
				 * @memberof rivet.client.game.StatConfig
				 * @instance
				 */
				Object.defineProperty(StatConfig.prototype, '_prefixPlural', {
					get: $util.oneOfGetter(($oneOfFields = ['prefixPlural'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Creates a new StatConfig instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.game.StatConfig
				 * @static
				 * @param {rivet.client.game.IStatConfig=} [properties] Properties to set
				 * @returns {rivet.client.game.StatConfig} StatConfig instance
				 */
				StatConfig.create = function create(properties) {
					return new StatConfig(properties);
				};

				/**
				 * Encodes the specified StatConfig message. Does not implicitly {@link rivet.client.game.StatConfig.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.game.StatConfig
				 * @static
				 * @param {rivet.client.game.IStatConfig} message StatConfig message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				StatConfig.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.recordId != null && Object.hasOwnProperty.call(message, 'recordId'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.recordId);
					if (message.iconId != null && Object.hasOwnProperty.call(message, 'iconId'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.iconId);
					if (message.format != null && Object.hasOwnProperty.call(message, 'format'))
						writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.format);
					if (message.aggregation != null && Object.hasOwnProperty.call(message, 'aggregation'))
						writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.aggregation);
					if (message.sorting != null && Object.hasOwnProperty.call(message, 'sorting'))
						writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.sorting);
					if (message.priority != null && Object.hasOwnProperty.call(message, 'priority'))
						writer.uint32(/* id 6, wireType 0 =*/ 48).uint32(message.priority);
					if (message.displayName != null && Object.hasOwnProperty.call(message, 'displayName'))
						writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.displayName);
					if (
						message.postfixSingular != null &&
						Object.hasOwnProperty.call(message, 'postfixSingular')
					)
						writer.uint32(/* id 8, wireType 2 =*/ 66).string(message.postfixSingular);
					if (message.postfixPlural != null && Object.hasOwnProperty.call(message, 'postfixPlural'))
						writer.uint32(/* id 9, wireType 2 =*/ 74).string(message.postfixPlural);
					if (
						message.prefixSingular != null &&
						Object.hasOwnProperty.call(message, 'prefixSingular')
					)
						writer.uint32(/* id 10, wireType 2 =*/ 82).string(message.prefixSingular);
					if (message.prefixPlural != null && Object.hasOwnProperty.call(message, 'prefixPlural'))
						writer.uint32(/* id 11, wireType 2 =*/ 90).string(message.prefixPlural);
					return writer;
				};

				/**
				 * Decodes a StatConfig message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.game.StatConfig
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.game.StatConfig} StatConfig
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				StatConfig.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.game.StatConfig();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.recordId = reader.string();
								break;
							case 2:
								message.iconId = reader.string();
								break;
							case 3:
								message.format = reader.string();
								break;
							case 4:
								message.aggregation = reader.string();
								break;
							case 5:
								message.sorting = reader.string();
								break;
							case 6:
								message.priority = reader.uint32();
								break;
							case 7:
								message.displayName = reader.string();
								break;
							case 8:
								message.postfixSingular = reader.string();
								break;
							case 9:
								message.postfixPlural = reader.string();
								break;
							case 10:
								message.prefixSingular = reader.string();
								break;
							case 11:
								message.prefixPlural = reader.string();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a StatConfig message.
				 * @function verify
				 * @memberof rivet.client.game.StatConfig
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				StatConfig.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					let properties = {};
					if (message.recordId != null && message.hasOwnProperty('recordId'))
						if (!$util.isString(message.recordId)) return 'recordId: string expected';
					if (message.iconId != null && message.hasOwnProperty('iconId'))
						if (!$util.isString(message.iconId)) return 'iconId: string expected';
					if (message.format != null && message.hasOwnProperty('format'))
						if (!$util.isString(message.format)) return 'format: string expected';
					if (message.aggregation != null && message.hasOwnProperty('aggregation'))
						if (!$util.isString(message.aggregation)) return 'aggregation: string expected';
					if (message.sorting != null && message.hasOwnProperty('sorting'))
						if (!$util.isString(message.sorting)) return 'sorting: string expected';
					if (message.priority != null && message.hasOwnProperty('priority'))
						if (!$util.isInteger(message.priority)) return 'priority: integer expected';
					if (message.displayName != null && message.hasOwnProperty('displayName'))
						if (!$util.isString(message.displayName)) return 'displayName: string expected';
					if (message.postfixSingular != null && message.hasOwnProperty('postfixSingular')) {
						properties._postfixSingular = 1;
						if (!$util.isString(message.postfixSingular))
							return 'postfixSingular: string expected';
					}
					if (message.postfixPlural != null && message.hasOwnProperty('postfixPlural')) {
						properties._postfixPlural = 1;
						if (!$util.isString(message.postfixPlural)) return 'postfixPlural: string expected';
					}
					if (message.prefixSingular != null && message.hasOwnProperty('prefixSingular')) {
						properties._prefixSingular = 1;
						if (!$util.isString(message.prefixSingular)) return 'prefixSingular: string expected';
					}
					if (message.prefixPlural != null && message.hasOwnProperty('prefixPlural')) {
						properties._prefixPlural = 1;
						if (!$util.isString(message.prefixPlural)) return 'prefixPlural: string expected';
					}
					return null;
				};

				return StatConfig;
			})();

			game.StatSummary = (function () {
				/**
				 * Properties of a StatSummary.
				 * @memberof rivet.client.game
				 * @interface IStatSummary
				 * @property {rivet.client.game.IHandle|null} [game] StatSummary game
				 * @property {Array.<rivet.client.game.IStat>|null} [stats] StatSummary stats
				 */

				/**
				 * Constructs a new StatSummary.
				 * @memberof rivet.client.game
				 * @classdesc Represents a StatSummary.
				 * @implements IStatSummary
				 * @constructor
				 * @param {rivet.client.game.IStatSummary=} [properties] Properties to set
				 */
				function StatSummary(properties) {
					this.stats = [];
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * StatSummary game.
				 * @member {rivet.client.game.IHandle|null|undefined} game
				 * @memberof rivet.client.game.StatSummary
				 * @instance
				 */
				StatSummary.prototype.game = null;

				/**
				 * StatSummary stats.
				 * @member {Array.<rivet.client.game.IStat>} stats
				 * @memberof rivet.client.game.StatSummary
				 * @instance
				 */
				StatSummary.prototype.stats = $util.emptyArray;

				/**
				 * Creates a new StatSummary instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.game.StatSummary
				 * @static
				 * @param {rivet.client.game.IStatSummary=} [properties] Properties to set
				 * @returns {rivet.client.game.StatSummary} StatSummary instance
				 */
				StatSummary.create = function create(properties) {
					return new StatSummary(properties);
				};

				/**
				 * Encodes the specified StatSummary message. Does not implicitly {@link rivet.client.game.StatSummary.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.game.StatSummary
				 * @static
				 * @param {rivet.client.game.IStatSummary} message StatSummary message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				StatSummary.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.game != null && Object.hasOwnProperty.call(message, 'game'))
						$root.rivet.client.game.Handle.encode(
							message.game,
							writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
						).ldelim();
					if (message.stats != null && message.stats.length)
						for (let i = 0; i < message.stats.length; ++i)
							$root.rivet.client.game.Stat.encode(
								message.stats[i],
								writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
							).ldelim();
					return writer;
				};

				/**
				 * Decodes a StatSummary message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.game.StatSummary
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.game.StatSummary} StatSummary
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				StatSummary.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.game.StatSummary();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.game = $root.rivet.client.game.Handle.decode(reader, reader.uint32());
								break;
							case 2:
								if (!(message.stats && message.stats.length)) message.stats = [];
								message.stats.push(
									$root.rivet.client.game.Stat.decode(reader, reader.uint32())
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a StatSummary message.
				 * @function verify
				 * @memberof rivet.client.game.StatSummary
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				StatSummary.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.game != null && message.hasOwnProperty('game')) {
						let error = $root.rivet.client.game.Handle.verify(message.game);
						if (error) return 'game.' + error;
					}
					if (message.stats != null && message.hasOwnProperty('stats')) {
						if (!Array.isArray(message.stats)) return 'stats: array expected';
						for (let i = 0; i < message.stats.length; ++i) {
							let error = $root.rivet.client.game.Stat.verify(message.stats[i]);
							if (error) return 'stats.' + error;
						}
					}
					return null;
				};

				return StatSummary;
			})();

			game.Stat = (function () {
				/**
				 * Properties of a Stat.
				 * @memberof rivet.client.game
				 * @interface IStat
				 * @property {rivet.client.game.IStatConfig|null} [config] Stat config
				 * @property {number|null} [overallValue] Stat overallValue
				 */

				/**
				 * Constructs a new Stat.
				 * @memberof rivet.client.game
				 * @classdesc Represents a Stat.
				 * @implements IStat
				 * @constructor
				 * @param {rivet.client.game.IStat=} [properties] Properties to set
				 */
				function Stat(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Stat config.
				 * @member {rivet.client.game.IStatConfig|null|undefined} config
				 * @memberof rivet.client.game.Stat
				 * @instance
				 */
				Stat.prototype.config = null;

				/**
				 * Stat overallValue.
				 * @member {number} overallValue
				 * @memberof rivet.client.game.Stat
				 * @instance
				 */
				Stat.prototype.overallValue = 0;

				/**
				 * Creates a new Stat instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.game.Stat
				 * @static
				 * @param {rivet.client.game.IStat=} [properties] Properties to set
				 * @returns {rivet.client.game.Stat} Stat instance
				 */
				Stat.create = function create(properties) {
					return new Stat(properties);
				};

				/**
				 * Encodes the specified Stat message. Does not implicitly {@link rivet.client.game.Stat.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.game.Stat
				 * @static
				 * @param {rivet.client.game.IStat} message Stat message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Stat.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.config != null && Object.hasOwnProperty.call(message, 'config'))
						$root.rivet.client.game.StatConfig.encode(
							message.config,
							writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
						).ldelim();
					if (message.overallValue != null && Object.hasOwnProperty.call(message, 'overallValue'))
						writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.overallValue);
					return writer;
				};

				/**
				 * Decodes a Stat message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.game.Stat
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.game.Stat} Stat
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Stat.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.game.Stat();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.config = $root.rivet.client.game.StatConfig.decode(
									reader,
									reader.uint32()
								);
								break;
							case 2:
								message.overallValue = reader.float();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Stat message.
				 * @function verify
				 * @memberof rivet.client.game.Stat
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Stat.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.config != null && message.hasOwnProperty('config')) {
						let error = $root.rivet.client.game.StatConfig.verify(message.config);
						if (error) return 'config.' + error;
					}
					if (message.overallValue != null && message.hasOwnProperty('overallValue'))
						if (typeof message.overallValue !== 'number') return 'overallValue: number expected';
					return null;
				};

				return Stat;
			})();

			game.ExpandedStatSummary = (function () {
				/**
				 * Properties of an ExpandedStatSummary.
				 * @memberof rivet.client.game
				 * @interface IExpandedStatSummary
				 * @property {rivet.client.game.IHandle|null} [game] ExpandedStatSummary game
				 * @property {Array.<rivet.client.game.IExpandedStat>|null} [stats] ExpandedStatSummary stats
				 */

				/**
				 * Constructs a new ExpandedStatSummary.
				 * @memberof rivet.client.game
				 * @classdesc Represents an ExpandedStatSummary.
				 * @implements IExpandedStatSummary
				 * @constructor
				 * @param {rivet.client.game.IExpandedStatSummary=} [properties] Properties to set
				 */
				function ExpandedStatSummary(properties) {
					this.stats = [];
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * ExpandedStatSummary game.
				 * @member {rivet.client.game.IHandle|null|undefined} game
				 * @memberof rivet.client.game.ExpandedStatSummary
				 * @instance
				 */
				ExpandedStatSummary.prototype.game = null;

				/**
				 * ExpandedStatSummary stats.
				 * @member {Array.<rivet.client.game.IExpandedStat>} stats
				 * @memberof rivet.client.game.ExpandedStatSummary
				 * @instance
				 */
				ExpandedStatSummary.prototype.stats = $util.emptyArray;

				/**
				 * Creates a new ExpandedStatSummary instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.game.ExpandedStatSummary
				 * @static
				 * @param {rivet.client.game.IExpandedStatSummary=} [properties] Properties to set
				 * @returns {rivet.client.game.ExpandedStatSummary} ExpandedStatSummary instance
				 */
				ExpandedStatSummary.create = function create(properties) {
					return new ExpandedStatSummary(properties);
				};

				/**
				 * Encodes the specified ExpandedStatSummary message. Does not implicitly {@link rivet.client.game.ExpandedStatSummary.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.game.ExpandedStatSummary
				 * @static
				 * @param {rivet.client.game.IExpandedStatSummary} message ExpandedStatSummary message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				ExpandedStatSummary.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.game != null && Object.hasOwnProperty.call(message, 'game'))
						$root.rivet.client.game.Handle.encode(
							message.game,
							writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
						).ldelim();
					if (message.stats != null && message.stats.length)
						for (let i = 0; i < message.stats.length; ++i)
							$root.rivet.client.game.ExpandedStat.encode(
								message.stats[i],
								writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
							).ldelim();
					return writer;
				};

				/**
				 * Decodes an ExpandedStatSummary message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.game.ExpandedStatSummary
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.game.ExpandedStatSummary} ExpandedStatSummary
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				ExpandedStatSummary.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.game.ExpandedStatSummary();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.game = $root.rivet.client.game.Handle.decode(reader, reader.uint32());
								break;
							case 2:
								if (!(message.stats && message.stats.length)) message.stats = [];
								message.stats.push(
									$root.rivet.client.game.ExpandedStat.decode(reader, reader.uint32())
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies an ExpandedStatSummary message.
				 * @function verify
				 * @memberof rivet.client.game.ExpandedStatSummary
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				ExpandedStatSummary.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.game != null && message.hasOwnProperty('game')) {
						let error = $root.rivet.client.game.Handle.verify(message.game);
						if (error) return 'game.' + error;
					}
					if (message.stats != null && message.hasOwnProperty('stats')) {
						if (!Array.isArray(message.stats)) return 'stats: array expected';
						for (let i = 0; i < message.stats.length; ++i) {
							let error = $root.rivet.client.game.ExpandedStat.verify(message.stats[i]);
							if (error) return 'stats.' + error;
						}
					}
					return null;
				};

				return ExpandedStatSummary;
			})();

			game.ExpandedStat = (function () {
				/**
				 * Properties of an ExpandedStat.
				 * @memberof rivet.client.game
				 * @interface IExpandedStat
				 * @property {rivet.client.game.IStatConfig|null} [config] ExpandedStat config
				 * @property {number|null} [overallValue] ExpandedStat overallValue
				 * @property {rivet.client.game.IRating|null} [rating] ExpandedStat rating
				 * @property {Array.<number>|null} [timelineX] ExpandedStat timelineX
				 * @property {Array.<number>|null} [timelineY] ExpandedStat timelineY
				 */

				/**
				 * Constructs a new ExpandedStat.
				 * @memberof rivet.client.game
				 * @classdesc Represents an ExpandedStat.
				 * @implements IExpandedStat
				 * @constructor
				 * @param {rivet.client.game.IExpandedStat=} [properties] Properties to set
				 */
				function ExpandedStat(properties) {
					this.timelineX = [];
					this.timelineY = [];
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * ExpandedStat config.
				 * @member {rivet.client.game.IStatConfig|null|undefined} config
				 * @memberof rivet.client.game.ExpandedStat
				 * @instance
				 */
				ExpandedStat.prototype.config = null;

				/**
				 * ExpandedStat overallValue.
				 * @member {number} overallValue
				 * @memberof rivet.client.game.ExpandedStat
				 * @instance
				 */
				ExpandedStat.prototype.overallValue = 0;

				/**
				 * ExpandedStat rating.
				 * @member {rivet.client.game.IRating|null|undefined} rating
				 * @memberof rivet.client.game.ExpandedStat
				 * @instance
				 */
				ExpandedStat.prototype.rating = null;

				/**
				 * ExpandedStat timelineX.
				 * @member {Array.<number>} timelineX
				 * @memberof rivet.client.game.ExpandedStat
				 * @instance
				 */
				ExpandedStat.prototype.timelineX = $util.emptyArray;

				/**
				 * ExpandedStat timelineY.
				 * @member {Array.<number>} timelineY
				 * @memberof rivet.client.game.ExpandedStat
				 * @instance
				 */
				ExpandedStat.prototype.timelineY = $util.emptyArray;

				/**
				 * Creates a new ExpandedStat instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.game.ExpandedStat
				 * @static
				 * @param {rivet.client.game.IExpandedStat=} [properties] Properties to set
				 * @returns {rivet.client.game.ExpandedStat} ExpandedStat instance
				 */
				ExpandedStat.create = function create(properties) {
					return new ExpandedStat(properties);
				};

				/**
				 * Encodes the specified ExpandedStat message. Does not implicitly {@link rivet.client.game.ExpandedStat.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.game.ExpandedStat
				 * @static
				 * @param {rivet.client.game.IExpandedStat} message ExpandedStat message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				ExpandedStat.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.config != null && Object.hasOwnProperty.call(message, 'config'))
						$root.rivet.client.game.StatConfig.encode(
							message.config,
							writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
						).ldelim();
					if (message.overallValue != null && Object.hasOwnProperty.call(message, 'overallValue'))
						writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.overallValue);
					if (message.rating != null && Object.hasOwnProperty.call(message, 'rating'))
						$root.rivet.client.game.Rating.encode(
							message.rating,
							writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
						).ldelim();
					if (message.timelineX != null && message.timelineX.length) {
						writer.uint32(/* id 4, wireType 2 =*/ 34).fork();
						for (let i = 0; i < message.timelineX.length; ++i) writer.float(message.timelineX[i]);
						writer.ldelim();
					}
					if (message.timelineY != null && message.timelineY.length) {
						writer.uint32(/* id 5, wireType 2 =*/ 42).fork();
						for (let i = 0; i < message.timelineY.length; ++i) writer.float(message.timelineY[i]);
						writer.ldelim();
					}
					return writer;
				};

				/**
				 * Decodes an ExpandedStat message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.game.ExpandedStat
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.game.ExpandedStat} ExpandedStat
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				ExpandedStat.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.game.ExpandedStat();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.config = $root.rivet.client.game.StatConfig.decode(
									reader,
									reader.uint32()
								);
								break;
							case 2:
								message.overallValue = reader.float();
								break;
							case 3:
								message.rating = $root.rivet.client.game.Rating.decode(
									reader,
									reader.uint32()
								);
								break;
							case 4:
								if (!(message.timelineX && message.timelineX.length)) message.timelineX = [];
								if ((tag & 7) === 2) {
									let end2 = reader.uint32() + reader.pos;
									while (reader.pos < end2) message.timelineX.push(reader.float());
								} else message.timelineX.push(reader.float());
								break;
							case 5:
								if (!(message.timelineY && message.timelineY.length)) message.timelineY = [];
								if ((tag & 7) === 2) {
									let end2 = reader.uint32() + reader.pos;
									while (reader.pos < end2) message.timelineY.push(reader.float());
								} else message.timelineY.push(reader.float());
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies an ExpandedStat message.
				 * @function verify
				 * @memberof rivet.client.game.ExpandedStat
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				ExpandedStat.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.config != null && message.hasOwnProperty('config')) {
						let error = $root.rivet.client.game.StatConfig.verify(message.config);
						if (error) return 'config.' + error;
					}
					if (message.overallValue != null && message.hasOwnProperty('overallValue'))
						if (typeof message.overallValue !== 'number') return 'overallValue: number expected';
					if (message.rating != null && message.hasOwnProperty('rating')) {
						let error = $root.rivet.client.game.Rating.verify(message.rating);
						if (error) return 'rating.' + error;
					}
					if (message.timelineX != null && message.hasOwnProperty('timelineX')) {
						if (!Array.isArray(message.timelineX)) return 'timelineX: array expected';
						for (let i = 0; i < message.timelineX.length; ++i)
							if (typeof message.timelineX[i] !== 'number')
								return 'timelineX: number[] expected';
					}
					if (message.timelineY != null && message.hasOwnProperty('timelineY')) {
						if (!Array.isArray(message.timelineY)) return 'timelineY: array expected';
						for (let i = 0; i < message.timelineY.length; ++i)
							if (typeof message.timelineY[i] !== 'number')
								return 'timelineY: number[] expected';
					}
					return null;
				};

				return ExpandedStat;
			})();

			game.Rating = (function () {
				/**
				 * Properties of a Rating.
				 * @memberof rivet.client.game
				 * @interface IRating
				 * @property {number|null} [position] Rating position
				 * @property {number|null} [total] Rating total
				 */

				/**
				 * Constructs a new Rating.
				 * @memberof rivet.client.game
				 * @classdesc Represents a Rating.
				 * @implements IRating
				 * @constructor
				 * @param {rivet.client.game.IRating=} [properties] Properties to set
				 */
				function Rating(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Rating position.
				 * @member {number} position
				 * @memberof rivet.client.game.Rating
				 * @instance
				 */
				Rating.prototype.position = 0;

				/**
				 * Rating total.
				 * @member {number} total
				 * @memberof rivet.client.game.Rating
				 * @instance
				 */
				Rating.prototype.total = 0;

				/**
				 * Creates a new Rating instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.game.Rating
				 * @static
				 * @param {rivet.client.game.IRating=} [properties] Properties to set
				 * @returns {rivet.client.game.Rating} Rating instance
				 */
				Rating.create = function create(properties) {
					return new Rating(properties);
				};

				/**
				 * Encodes the specified Rating message. Does not implicitly {@link rivet.client.game.Rating.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.game.Rating
				 * @static
				 * @param {rivet.client.game.IRating} message Rating message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Rating.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.position != null && Object.hasOwnProperty.call(message, 'position'))
						writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.position);
					if (message.total != null && Object.hasOwnProperty.call(message, 'total'))
						writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.total);
					return writer;
				};

				/**
				 * Decodes a Rating message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.game.Rating
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.game.Rating} Rating
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Rating.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.game.Rating();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.position = reader.int32();
								break;
							case 2:
								message.total = reader.int32();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Rating message.
				 * @function verify
				 * @memberof rivet.client.game.Rating
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Rating.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.position != null && message.hasOwnProperty('position'))
						if (!$util.isInteger(message.position)) return 'position: integer expected';
					if (message.total != null && message.hasOwnProperty('total'))
						if (!$util.isInteger(message.total)) return 'total: integer expected';
					return null;
				};

				return Rating;
			})();

			game.Summary = (function () {
				/**
				 * Properties of a Summary.
				 * @memberof rivet.client.game
				 * @interface ISummary
				 * @property {string|null} [id] Summary id
				 * @property {string|null} [nameId] Summary nameId
				 * @property {string|null} [displayName] Summary displayName
				 * @property {string|null} [logoUrl] Summary logoUrl
				 * @property {string|null} [bannerUrl] Summary bannerUrl
				 * @property {string|null} [url] Summary url
				 * @property {rivet.client.group.IHandle|null} [developer] Summary developer
				 * @property {boolean|null} [isStarred] Summary isStarred
				 * @property {Array.<string>|null} [tags] Summary tags
				 */

				/**
				 * Constructs a new Summary.
				 * @memberof rivet.client.game
				 * @classdesc Represents a Summary.
				 * @implements ISummary
				 * @constructor
				 * @param {rivet.client.game.ISummary=} [properties] Properties to set
				 */
				function Summary(properties) {
					this.tags = [];
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Summary id.
				 * @member {string} id
				 * @memberof rivet.client.game.Summary
				 * @instance
				 */
				Summary.prototype.id = '';

				/**
				 * Summary nameId.
				 * @member {string} nameId
				 * @memberof rivet.client.game.Summary
				 * @instance
				 */
				Summary.prototype.nameId = '';

				/**
				 * Summary displayName.
				 * @member {string} displayName
				 * @memberof rivet.client.game.Summary
				 * @instance
				 */
				Summary.prototype.displayName = '';

				/**
				 * Summary logoUrl.
				 * @member {string|null|undefined} logoUrl
				 * @memberof rivet.client.game.Summary
				 * @instance
				 */
				Summary.prototype.logoUrl = null;

				/**
				 * Summary bannerUrl.
				 * @member {string|null|undefined} bannerUrl
				 * @memberof rivet.client.game.Summary
				 * @instance
				 */
				Summary.prototype.bannerUrl = null;

				/**
				 * Summary url.
				 * @member {string} url
				 * @memberof rivet.client.game.Summary
				 * @instance
				 */
				Summary.prototype.url = '';

				/**
				 * Summary developer.
				 * @member {rivet.client.group.IHandle|null|undefined} developer
				 * @memberof rivet.client.game.Summary
				 * @instance
				 */
				Summary.prototype.developer = null;

				/**
				 * Summary isStarred.
				 * @member {boolean} isStarred
				 * @memberof rivet.client.game.Summary
				 * @instance
				 */
				Summary.prototype.isStarred = false;

				/**
				 * Summary tags.
				 * @member {Array.<string>} tags
				 * @memberof rivet.client.game.Summary
				 * @instance
				 */
				Summary.prototype.tags = $util.emptyArray;

				// OneOf field names bound to virtual getters and setters
				let $oneOfFields;

				/**
				 * Summary _logoUrl.
				 * @member {"logoUrl"|undefined} _logoUrl
				 * @memberof rivet.client.game.Summary
				 * @instance
				 */
				Object.defineProperty(Summary.prototype, '_logoUrl', {
					get: $util.oneOfGetter(($oneOfFields = ['logoUrl'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Summary _bannerUrl.
				 * @member {"bannerUrl"|undefined} _bannerUrl
				 * @memberof rivet.client.game.Summary
				 * @instance
				 */
				Object.defineProperty(Summary.prototype, '_bannerUrl', {
					get: $util.oneOfGetter(($oneOfFields = ['bannerUrl'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Creates a new Summary instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.game.Summary
				 * @static
				 * @param {rivet.client.game.ISummary=} [properties] Properties to set
				 * @returns {rivet.client.game.Summary} Summary instance
				 */
				Summary.create = function create(properties) {
					return new Summary(properties);
				};

				/**
				 * Encodes the specified Summary message. Does not implicitly {@link rivet.client.game.Summary.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.game.Summary
				 * @static
				 * @param {rivet.client.game.ISummary} message Summary message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Summary.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
					if (message.nameId != null && Object.hasOwnProperty.call(message, 'nameId'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.nameId);
					if (message.displayName != null && Object.hasOwnProperty.call(message, 'displayName'))
						writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.displayName);
					if (message.logoUrl != null && Object.hasOwnProperty.call(message, 'logoUrl'))
						writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.logoUrl);
					if (message.bannerUrl != null && Object.hasOwnProperty.call(message, 'bannerUrl'))
						writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.bannerUrl);
					if (message.url != null && Object.hasOwnProperty.call(message, 'url'))
						writer.uint32(/* id 100, wireType 2 =*/ 802).string(message.url);
					if (message.developer != null && Object.hasOwnProperty.call(message, 'developer'))
						$root.rivet.client.group.Handle.encode(
							message.developer,
							writer.uint32(/* id 101, wireType 2 =*/ 810).fork()
						).ldelim();
					if (message.isStarred != null && Object.hasOwnProperty.call(message, 'isStarred'))
						writer.uint32(/* id 104, wireType 0 =*/ 832).bool(message.isStarred);
					if (message.tags != null && message.tags.length)
						for (let i = 0; i < message.tags.length; ++i)
							writer.uint32(/* id 105, wireType 2 =*/ 842).string(message.tags[i]);
					return writer;
				};

				/**
				 * Decodes a Summary message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.game.Summary
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.game.Summary} Summary
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Summary.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.game.Summary();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.id = reader.string();
								break;
							case 2:
								message.nameId = reader.string();
								break;
							case 3:
								message.displayName = reader.string();
								break;
							case 4:
								message.logoUrl = reader.string();
								break;
							case 5:
								message.bannerUrl = reader.string();
								break;
							case 100:
								message.url = reader.string();
								break;
							case 101:
								message.developer = $root.rivet.client.group.Handle.decode(
									reader,
									reader.uint32()
								);
								break;
							case 104:
								message.isStarred = reader.bool();
								break;
							case 105:
								if (!(message.tags && message.tags.length)) message.tags = [];
								message.tags.push(reader.string());
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Summary message.
				 * @function verify
				 * @memberof rivet.client.game.Summary
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Summary.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					let properties = {};
					if (message.id != null && message.hasOwnProperty('id'))
						if (!$util.isString(message.id)) return 'id: string expected';
					if (message.nameId != null && message.hasOwnProperty('nameId'))
						if (!$util.isString(message.nameId)) return 'nameId: string expected';
					if (message.displayName != null && message.hasOwnProperty('displayName'))
						if (!$util.isString(message.displayName)) return 'displayName: string expected';
					if (message.logoUrl != null && message.hasOwnProperty('logoUrl')) {
						properties._logoUrl = 1;
						if (!$util.isString(message.logoUrl)) return 'logoUrl: string expected';
					}
					if (message.bannerUrl != null && message.hasOwnProperty('bannerUrl')) {
						properties._bannerUrl = 1;
						if (!$util.isString(message.bannerUrl)) return 'bannerUrl: string expected';
					}
					if (message.url != null && message.hasOwnProperty('url'))
						if (!$util.isString(message.url)) return 'url: string expected';
					if (message.developer != null && message.hasOwnProperty('developer')) {
						let error = $root.rivet.client.group.Handle.verify(message.developer);
						if (error) return 'developer.' + error;
					}
					if (message.isStarred != null && message.hasOwnProperty('isStarred'))
						if (typeof message.isStarred !== 'boolean') return 'isStarred: boolean expected';
					if (message.tags != null && message.hasOwnProperty('tags')) {
						if (!Array.isArray(message.tags)) return 'tags: array expected';
						for (let i = 0; i < message.tags.length; ++i)
							if (!$util.isString(message.tags[i])) return 'tags: string[] expected';
					}
					return null;
				};

				return Summary;
			})();

			return game;
		})();

		client.group = (function () {
			/**
			 * Namespace group.
			 * @memberof rivet.client
			 * @namespace
			 */
			const group = {};

			group.Channel = (function () {
				/**
				 * Properties of a Channel.
				 * @memberof rivet.client.group
				 * @interface IChannel
				 * @property {string|null} [label] Channel label
				 * @property {string|null} [threadId] Channel threadId
				 */

				/**
				 * Constructs a new Channel.
				 * @memberof rivet.client.group
				 * @classdesc Represents a Channel.
				 * @implements IChannel
				 * @constructor
				 * @param {rivet.client.group.IChannel=} [properties] Properties to set
				 */
				function Channel(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Channel label.
				 * @member {string} label
				 * @memberof rivet.client.group.Channel
				 * @instance
				 */
				Channel.prototype.label = '';

				/**
				 * Channel threadId.
				 * @member {string} threadId
				 * @memberof rivet.client.group.Channel
				 * @instance
				 */
				Channel.prototype.threadId = '';

				/**
				 * Creates a new Channel instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.group.Channel
				 * @static
				 * @param {rivet.client.group.IChannel=} [properties] Properties to set
				 * @returns {rivet.client.group.Channel} Channel instance
				 */
				Channel.create = function create(properties) {
					return new Channel(properties);
				};

				/**
				 * Encodes the specified Channel message. Does not implicitly {@link rivet.client.group.Channel.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.group.Channel
				 * @static
				 * @param {rivet.client.group.IChannel} message Channel message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Channel.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.label != null && Object.hasOwnProperty.call(message, 'label'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.label);
					if (message.threadId != null && Object.hasOwnProperty.call(message, 'threadId'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.threadId);
					return writer;
				};

				/**
				 * Decodes a Channel message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.group.Channel
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.group.Channel} Channel
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Channel.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.group.Channel();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.label = reader.string();
								break;
							case 2:
								message.threadId = reader.string();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Channel message.
				 * @function verify
				 * @memberof rivet.client.group.Channel
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Channel.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.label != null && message.hasOwnProperty('label'))
						if (!$util.isString(message.label)) return 'label: string expected';
					if (message.threadId != null && message.hasOwnProperty('threadId'))
						if (!$util.isString(message.threadId)) return 'threadId: string expected';
					return null;
				};

				return Channel;
			})();

			group.ExternalLinks = (function () {
				/**
				 * Properties of an ExternalLinks.
				 * @memberof rivet.client.group
				 * @interface IExternalLinks
				 * @property {string|null} [profile] ExternalLinks profile
				 * @property {string|null} [chat] ExternalLinks chat
				 */

				/**
				 * Constructs a new ExternalLinks.
				 * @memberof rivet.client.group
				 * @classdesc Represents an ExternalLinks.
				 * @implements IExternalLinks
				 * @constructor
				 * @param {rivet.client.group.IExternalLinks=} [properties] Properties to set
				 */
				function ExternalLinks(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * ExternalLinks profile.
				 * @member {string} profile
				 * @memberof rivet.client.group.ExternalLinks
				 * @instance
				 */
				ExternalLinks.prototype.profile = '';

				/**
				 * ExternalLinks chat.
				 * @member {string} chat
				 * @memberof rivet.client.group.ExternalLinks
				 * @instance
				 */
				ExternalLinks.prototype.chat = '';

				/**
				 * Creates a new ExternalLinks instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.group.ExternalLinks
				 * @static
				 * @param {rivet.client.group.IExternalLinks=} [properties] Properties to set
				 * @returns {rivet.client.group.ExternalLinks} ExternalLinks instance
				 */
				ExternalLinks.create = function create(properties) {
					return new ExternalLinks(properties);
				};

				/**
				 * Encodes the specified ExternalLinks message. Does not implicitly {@link rivet.client.group.ExternalLinks.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.group.ExternalLinks
				 * @static
				 * @param {rivet.client.group.IExternalLinks} message ExternalLinks message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				ExternalLinks.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.profile != null && Object.hasOwnProperty.call(message, 'profile'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.profile);
					if (message.chat != null && Object.hasOwnProperty.call(message, 'chat'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.chat);
					return writer;
				};

				/**
				 * Decodes an ExternalLinks message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.group.ExternalLinks
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.group.ExternalLinks} ExternalLinks
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				ExternalLinks.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.group.ExternalLinks();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.profile = reader.string();
								break;
							case 2:
								message.chat = reader.string();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies an ExternalLinks message.
				 * @function verify
				 * @memberof rivet.client.group.ExternalLinks
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				ExternalLinks.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.profile != null && message.hasOwnProperty('profile'))
						if (!$util.isString(message.profile)) return 'profile: string expected';
					if (message.chat != null && message.hasOwnProperty('chat'))
						if (!$util.isString(message.chat)) return 'chat: string expected';
					return null;
				};

				return ExternalLinks;
			})();

			group.Handle = (function () {
				/**
				 * Properties of a Handle.
				 * @memberof rivet.client.group
				 * @interface IHandle
				 * @property {string|null} [id] Handle id
				 * @property {string|null} [displayName] Handle displayName
				 * @property {string|null} [avatarUrl] Handle avatarUrl
				 * @property {rivet.client.group.IExternalLinks|null} [external] Handle external
				 * @property {boolean|null} [isDeveloper] Handle isDeveloper
				 */

				/**
				 * Constructs a new Handle.
				 * @memberof rivet.client.group
				 * @classdesc Represents a Handle.
				 * @implements IHandle
				 * @constructor
				 * @param {rivet.client.group.IHandle=} [properties] Properties to set
				 */
				function Handle(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Handle id.
				 * @member {string} id
				 * @memberof rivet.client.group.Handle
				 * @instance
				 */
				Handle.prototype.id = '';

				/**
				 * Handle displayName.
				 * @member {string} displayName
				 * @memberof rivet.client.group.Handle
				 * @instance
				 */
				Handle.prototype.displayName = '';

				/**
				 * Handle avatarUrl.
				 * @member {string|null|undefined} avatarUrl
				 * @memberof rivet.client.group.Handle
				 * @instance
				 */
				Handle.prototype.avatarUrl = null;

				/**
				 * Handle external.
				 * @member {rivet.client.group.IExternalLinks|null|undefined} external
				 * @memberof rivet.client.group.Handle
				 * @instance
				 */
				Handle.prototype.external = null;

				/**
				 * Handle isDeveloper.
				 * @member {boolean} isDeveloper
				 * @memberof rivet.client.group.Handle
				 * @instance
				 */
				Handle.prototype.isDeveloper = false;

				// OneOf field names bound to virtual getters and setters
				let $oneOfFields;

				/**
				 * Handle _avatarUrl.
				 * @member {"avatarUrl"|undefined} _avatarUrl
				 * @memberof rivet.client.group.Handle
				 * @instance
				 */
				Object.defineProperty(Handle.prototype, '_avatarUrl', {
					get: $util.oneOfGetter(($oneOfFields = ['avatarUrl'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Creates a new Handle instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.group.Handle
				 * @static
				 * @param {rivet.client.group.IHandle=} [properties] Properties to set
				 * @returns {rivet.client.group.Handle} Handle instance
				 */
				Handle.create = function create(properties) {
					return new Handle(properties);
				};

				/**
				 * Encodes the specified Handle message. Does not implicitly {@link rivet.client.group.Handle.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.group.Handle
				 * @static
				 * @param {rivet.client.group.IHandle} message Handle message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Handle.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
					if (message.displayName != null && Object.hasOwnProperty.call(message, 'displayName'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.displayName);
					if (message.avatarUrl != null && Object.hasOwnProperty.call(message, 'avatarUrl'))
						writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.avatarUrl);
					if (message.external != null && Object.hasOwnProperty.call(message, 'external'))
						$root.rivet.client.group.ExternalLinks.encode(
							message.external,
							writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
						).ldelim();
					if (message.isDeveloper != null && Object.hasOwnProperty.call(message, 'isDeveloper'))
						writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.isDeveloper);
					return writer;
				};

				/**
				 * Decodes a Handle message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.group.Handle
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.group.Handle} Handle
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Handle.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.group.Handle();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.id = reader.string();
								break;
							case 2:
								message.displayName = reader.string();
								break;
							case 3:
								message.avatarUrl = reader.string();
								break;
							case 4:
								message.external = $root.rivet.client.group.ExternalLinks.decode(
									reader,
									reader.uint32()
								);
								break;
							case 5:
								message.isDeveloper = reader.bool();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Handle message.
				 * @function verify
				 * @memberof rivet.client.group.Handle
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Handle.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					let properties = {};
					if (message.id != null && message.hasOwnProperty('id'))
						if (!$util.isString(message.id)) return 'id: string expected';
					if (message.displayName != null && message.hasOwnProperty('displayName'))
						if (!$util.isString(message.displayName)) return 'displayName: string expected';
					if (message.avatarUrl != null && message.hasOwnProperty('avatarUrl')) {
						properties._avatarUrl = 1;
						if (!$util.isString(message.avatarUrl)) return 'avatarUrl: string expected';
					}
					if (message.external != null && message.hasOwnProperty('external')) {
						let error = $root.rivet.client.group.ExternalLinks.verify(message.external);
						if (error) return 'external.' + error;
					}
					if (message.isDeveloper != null && message.hasOwnProperty('isDeveloper'))
						if (typeof message.isDeveloper !== 'boolean') return 'isDeveloper: boolean expected';
					return null;
				};

				return Handle;
			})();

			group.Member = (function () {
				/**
				 * Properties of a Member.
				 * @memberof rivet.client.group
				 * @interface IMember
				 * @property {rivet.client.identity.IHandle|null} [identity] Member identity
				 * @property {Array.<string>|null} [roles] Member roles
				 */

				/**
				 * Constructs a new Member.
				 * @memberof rivet.client.group
				 * @classdesc Represents a Member.
				 * @implements IMember
				 * @constructor
				 * @param {rivet.client.group.IMember=} [properties] Properties to set
				 */
				function Member(properties) {
					this.roles = [];
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Member identity.
				 * @member {rivet.client.identity.IHandle|null|undefined} identity
				 * @memberof rivet.client.group.Member
				 * @instance
				 */
				Member.prototype.identity = null;

				/**
				 * Member roles.
				 * @member {Array.<string>} roles
				 * @memberof rivet.client.group.Member
				 * @instance
				 */
				Member.prototype.roles = $util.emptyArray;

				/**
				 * Creates a new Member instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.group.Member
				 * @static
				 * @param {rivet.client.group.IMember=} [properties] Properties to set
				 * @returns {rivet.client.group.Member} Member instance
				 */
				Member.create = function create(properties) {
					return new Member(properties);
				};

				/**
				 * Encodes the specified Member message. Does not implicitly {@link rivet.client.group.Member.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.group.Member
				 * @static
				 * @param {rivet.client.group.IMember} message Member message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Member.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.identity != null && Object.hasOwnProperty.call(message, 'identity'))
						$root.rivet.client.identity.Handle.encode(
							message.identity,
							writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
						).ldelim();
					if (message.roles != null && message.roles.length)
						for (let i = 0; i < message.roles.length; ++i)
							writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.roles[i]);
					return writer;
				};

				/**
				 * Decodes a Member message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.group.Member
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.group.Member} Member
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Member.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.group.Member();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.identity = $root.rivet.client.identity.Handle.decode(
									reader,
									reader.uint32()
								);
								break;
							case 2:
								if (!(message.roles && message.roles.length)) message.roles = [];
								message.roles.push(reader.string());
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Member message.
				 * @function verify
				 * @memberof rivet.client.group.Member
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Member.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.identity != null && message.hasOwnProperty('identity')) {
						let error = $root.rivet.client.identity.Handle.verify(message.identity);
						if (error) return 'identity.' + error;
					}
					if (message.roles != null && message.hasOwnProperty('roles')) {
						if (!Array.isArray(message.roles)) return 'roles: array expected';
						for (let i = 0; i < message.roles.length; ++i)
							if (!$util.isString(message.roles[i])) return 'roles: string[] expected';
					}
					return null;
				};

				return Member;
			})();

			group.JoinRequest = (function () {
				/**
				 * Properties of a JoinRequest.
				 * @memberof rivet.client.group
				 * @interface IJoinRequest
				 * @property {rivet.client.identity.IHandle|null} [identity] JoinRequest identity
				 * @property {number|Long|null} [ts] JoinRequest ts
				 */

				/**
				 * Constructs a new JoinRequest.
				 * @memberof rivet.client.group
				 * @classdesc Represents a JoinRequest.
				 * @implements IJoinRequest
				 * @constructor
				 * @param {rivet.client.group.IJoinRequest=} [properties] Properties to set
				 */
				function JoinRequest(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * JoinRequest identity.
				 * @member {rivet.client.identity.IHandle|null|undefined} identity
				 * @memberof rivet.client.group.JoinRequest
				 * @instance
				 */
				JoinRequest.prototype.identity = null;

				/**
				 * JoinRequest ts.
				 * @member {number|Long} ts
				 * @memberof rivet.client.group.JoinRequest
				 * @instance
				 */
				JoinRequest.prototype.ts = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

				/**
				 * Creates a new JoinRequest instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.group.JoinRequest
				 * @static
				 * @param {rivet.client.group.IJoinRequest=} [properties] Properties to set
				 * @returns {rivet.client.group.JoinRequest} JoinRequest instance
				 */
				JoinRequest.create = function create(properties) {
					return new JoinRequest(properties);
				};

				/**
				 * Encodes the specified JoinRequest message. Does not implicitly {@link rivet.client.group.JoinRequest.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.group.JoinRequest
				 * @static
				 * @param {rivet.client.group.IJoinRequest} message JoinRequest message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				JoinRequest.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.identity != null && Object.hasOwnProperty.call(message, 'identity'))
						$root.rivet.client.identity.Handle.encode(
							message.identity,
							writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
						).ldelim();
					if (message.ts != null && Object.hasOwnProperty.call(message, 'ts'))
						writer.uint32(/* id 2, wireType 0 =*/ 16).uint64(message.ts);
					return writer;
				};

				/**
				 * Decodes a JoinRequest message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.group.JoinRequest
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.group.JoinRequest} JoinRequest
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				JoinRequest.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.group.JoinRequest();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.identity = $root.rivet.client.identity.Handle.decode(
									reader,
									reader.uint32()
								);
								break;
							case 2:
								message.ts = reader.uint64();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a JoinRequest message.
				 * @function verify
				 * @memberof rivet.client.group.JoinRequest
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				JoinRequest.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.identity != null && message.hasOwnProperty('identity')) {
						let error = $root.rivet.client.identity.Handle.verify(message.identity);
						if (error) return 'identity.' + error;
					}
					if (message.ts != null && message.hasOwnProperty('ts'))
						if (
							!$util.isInteger(message.ts) &&
							!(
								message.ts &&
								$util.isInteger(message.ts.low) &&
								$util.isInteger(message.ts.high)
							)
						)
							return 'ts: integer|Long expected';
					return null;
				};

				return JoinRequest;
			})();

			group.Profile = (function () {
				/**
				 * Properties of a Profile.
				 * @memberof rivet.client.group
				 * @interface IProfile
				 * @property {string|null} [id] Profile id
				 * @property {string|null} [displayName] Profile displayName
				 * @property {string|null} [bio] Profile bio
				 * @property {string|null} [avatarUrl] Profile avatarUrl
				 * @property {rivet.client.group.IExternalLinks|null} [external] Profile external
				 * @property {boolean|null} [isDeveloper] Profile isDeveloper
				 * @property {boolean|null} [isCurrentIdentityMember] Profile isCurrentIdentityMember
				 * @property {string|null} [publicity] Profile publicity
				 * @property {number|null} [memberCount] Profile memberCount
				 * @property {Array.<rivet.client.group.IMember>|null} [members] Profile members
				 * @property {Array.<rivet.client.group.IRole>|null} [roles] Profile roles
				 * @property {Array.<rivet.client.group.IJoinRequest>|null} [joinRequests] Profile joinRequests
				 * @property {boolean|null} [isCurrentIdentityRequestingJoin] Profile isCurrentIdentityRequestingJoin
				 * @property {string|null} [ownerIdentityId] Profile ownerIdentityId
				 * @property {Array.<rivet.client.group.IChannel>|null} [channels] Profile channels
				 * @property {Array.<rivet.client.game.IStatSummary>|null} [gameStats] Profile gameStats
				 */

				/**
				 * Constructs a new Profile.
				 * @memberof rivet.client.group
				 * @classdesc Represents a Profile.
				 * @implements IProfile
				 * @constructor
				 * @param {rivet.client.group.IProfile=} [properties] Properties to set
				 */
				function Profile(properties) {
					this.members = [];
					this.roles = [];
					this.joinRequests = [];
					this.channels = [];
					this.gameStats = [];
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Profile id.
				 * @member {string} id
				 * @memberof rivet.client.group.Profile
				 * @instance
				 */
				Profile.prototype.id = '';

				/**
				 * Profile displayName.
				 * @member {string} displayName
				 * @memberof rivet.client.group.Profile
				 * @instance
				 */
				Profile.prototype.displayName = '';

				/**
				 * Profile bio.
				 * @member {string} bio
				 * @memberof rivet.client.group.Profile
				 * @instance
				 */
				Profile.prototype.bio = '';

				/**
				 * Profile avatarUrl.
				 * @member {string|null|undefined} avatarUrl
				 * @memberof rivet.client.group.Profile
				 * @instance
				 */
				Profile.prototype.avatarUrl = null;

				/**
				 * Profile external.
				 * @member {rivet.client.group.IExternalLinks|null|undefined} external
				 * @memberof rivet.client.group.Profile
				 * @instance
				 */
				Profile.prototype.external = null;

				/**
				 * Profile isDeveloper.
				 * @member {boolean} isDeveloper
				 * @memberof rivet.client.group.Profile
				 * @instance
				 */
				Profile.prototype.isDeveloper = false;

				/**
				 * Profile isCurrentIdentityMember.
				 * @member {boolean} isCurrentIdentityMember
				 * @memberof rivet.client.group.Profile
				 * @instance
				 */
				Profile.prototype.isCurrentIdentityMember = false;

				/**
				 * Profile publicity.
				 * @member {string} publicity
				 * @memberof rivet.client.group.Profile
				 * @instance
				 */
				Profile.prototype.publicity = '';

				/**
				 * Profile memberCount.
				 * @member {number} memberCount
				 * @memberof rivet.client.group.Profile
				 * @instance
				 */
				Profile.prototype.memberCount = 0;

				/**
				 * Profile members.
				 * @member {Array.<rivet.client.group.IMember>} members
				 * @memberof rivet.client.group.Profile
				 * @instance
				 */
				Profile.prototype.members = $util.emptyArray;

				/**
				 * Profile roles.
				 * @member {Array.<rivet.client.group.IRole>} roles
				 * @memberof rivet.client.group.Profile
				 * @instance
				 */
				Profile.prototype.roles = $util.emptyArray;

				/**
				 * Profile joinRequests.
				 * @member {Array.<rivet.client.group.IJoinRequest>} joinRequests
				 * @memberof rivet.client.group.Profile
				 * @instance
				 */
				Profile.prototype.joinRequests = $util.emptyArray;

				/**
				 * Profile isCurrentIdentityRequestingJoin.
				 * @member {boolean} isCurrentIdentityRequestingJoin
				 * @memberof rivet.client.group.Profile
				 * @instance
				 */
				Profile.prototype.isCurrentIdentityRequestingJoin = false;

				/**
				 * Profile ownerIdentityId.
				 * @member {string} ownerIdentityId
				 * @memberof rivet.client.group.Profile
				 * @instance
				 */
				Profile.prototype.ownerIdentityId = '';

				/**
				 * Profile channels.
				 * @member {Array.<rivet.client.group.IChannel>} channels
				 * @memberof rivet.client.group.Profile
				 * @instance
				 */
				Profile.prototype.channels = $util.emptyArray;

				/**
				 * Profile gameStats.
				 * @member {Array.<rivet.client.game.IStatSummary>} gameStats
				 * @memberof rivet.client.group.Profile
				 * @instance
				 */
				Profile.prototype.gameStats = $util.emptyArray;

				// OneOf field names bound to virtual getters and setters
				let $oneOfFields;

				/**
				 * Profile _avatarUrl.
				 * @member {"avatarUrl"|undefined} _avatarUrl
				 * @memberof rivet.client.group.Profile
				 * @instance
				 */
				Object.defineProperty(Profile.prototype, '_avatarUrl', {
					get: $util.oneOfGetter(($oneOfFields = ['avatarUrl'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Creates a new Profile instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.group.Profile
				 * @static
				 * @param {rivet.client.group.IProfile=} [properties] Properties to set
				 * @returns {rivet.client.group.Profile} Profile instance
				 */
				Profile.create = function create(properties) {
					return new Profile(properties);
				};

				/**
				 * Encodes the specified Profile message. Does not implicitly {@link rivet.client.group.Profile.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.group.Profile
				 * @static
				 * @param {rivet.client.group.IProfile} message Profile message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Profile.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
					if (message.displayName != null && Object.hasOwnProperty.call(message, 'displayName'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.displayName);
					if (message.bio != null && Object.hasOwnProperty.call(message, 'bio'))
						writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.bio);
					if (message.avatarUrl != null && Object.hasOwnProperty.call(message, 'avatarUrl'))
						writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.avatarUrl);
					if (message.external != null && Object.hasOwnProperty.call(message, 'external'))
						$root.rivet.client.group.ExternalLinks.encode(
							message.external,
							writer.uint32(/* id 5, wireType 2 =*/ 42).fork()
						).ldelim();
					if (message.isDeveloper != null && Object.hasOwnProperty.call(message, 'isDeveloper'))
						writer.uint32(/* id 6, wireType 0 =*/ 48).bool(message.isDeveloper);
					if (
						message.isCurrentIdentityMember != null &&
						Object.hasOwnProperty.call(message, 'isCurrentIdentityMember')
					)
						writer.uint32(/* id 100, wireType 0 =*/ 800).bool(message.isCurrentIdentityMember);
					if (message.publicity != null && Object.hasOwnProperty.call(message, 'publicity'))
						writer.uint32(/* id 101, wireType 2 =*/ 810).string(message.publicity);
					if (message.memberCount != null && Object.hasOwnProperty.call(message, 'memberCount'))
						writer.uint32(/* id 102, wireType 0 =*/ 816).uint32(message.memberCount);
					if (message.members != null && message.members.length)
						for (let i = 0; i < message.members.length; ++i)
							$root.rivet.client.group.Member.encode(
								message.members[i],
								writer.uint32(/* id 200, wireType 2 =*/ 1602).fork()
							).ldelim();
					if (message.roles != null && message.roles.length)
						for (let i = 0; i < message.roles.length; ++i)
							$root.rivet.client.group.Role.encode(
								message.roles[i],
								writer.uint32(/* id 201, wireType 2 =*/ 1610).fork()
							).ldelim();
					if (message.joinRequests != null && message.joinRequests.length)
						for (let i = 0; i < message.joinRequests.length; ++i)
							$root.rivet.client.group.JoinRequest.encode(
								message.joinRequests[i],
								writer.uint32(/* id 202, wireType 2 =*/ 1618).fork()
							).ldelim();
					if (
						message.isCurrentIdentityRequestingJoin != null &&
						Object.hasOwnProperty.call(message, 'isCurrentIdentityRequestingJoin')
					)
						writer
							.uint32(/* id 203, wireType 0 =*/ 1624)
							.bool(message.isCurrentIdentityRequestingJoin);
					if (
						message.ownerIdentityId != null &&
						Object.hasOwnProperty.call(message, 'ownerIdentityId')
					)
						writer.uint32(/* id 204, wireType 2 =*/ 1634).string(message.ownerIdentityId);
					if (message.channels != null && message.channels.length)
						for (let i = 0; i < message.channels.length; ++i)
							$root.rivet.client.group.Channel.encode(
								message.channels[i],
								writer.uint32(/* id 205, wireType 2 =*/ 1642).fork()
							).ldelim();
					if (message.gameStats != null && message.gameStats.length)
						for (let i = 0; i < message.gameStats.length; ++i)
							$root.rivet.client.game.StatSummary.encode(
								message.gameStats[i],
								writer.uint32(/* id 206, wireType 2 =*/ 1650).fork()
							).ldelim();
					return writer;
				};

				/**
				 * Decodes a Profile message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.group.Profile
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.group.Profile} Profile
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Profile.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.group.Profile();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.id = reader.string();
								break;
							case 2:
								message.displayName = reader.string();
								break;
							case 3:
								message.bio = reader.string();
								break;
							case 4:
								message.avatarUrl = reader.string();
								break;
							case 5:
								message.external = $root.rivet.client.group.ExternalLinks.decode(
									reader,
									reader.uint32()
								);
								break;
							case 6:
								message.isDeveloper = reader.bool();
								break;
							case 100:
								message.isCurrentIdentityMember = reader.bool();
								break;
							case 101:
								message.publicity = reader.string();
								break;
							case 102:
								message.memberCount = reader.uint32();
								break;
							case 200:
								if (!(message.members && message.members.length)) message.members = [];
								message.members.push(
									$root.rivet.client.group.Member.decode(reader, reader.uint32())
								);
								break;
							case 201:
								if (!(message.roles && message.roles.length)) message.roles = [];
								message.roles.push(
									$root.rivet.client.group.Role.decode(reader, reader.uint32())
								);
								break;
							case 202:
								if (!(message.joinRequests && message.joinRequests.length))
									message.joinRequests = [];
								message.joinRequests.push(
									$root.rivet.client.group.JoinRequest.decode(reader, reader.uint32())
								);
								break;
							case 203:
								message.isCurrentIdentityRequestingJoin = reader.bool();
								break;
							case 204:
								message.ownerIdentityId = reader.string();
								break;
							case 205:
								if (!(message.channels && message.channels.length)) message.channels = [];
								message.channels.push(
									$root.rivet.client.group.Channel.decode(reader, reader.uint32())
								);
								break;
							case 206:
								if (!(message.gameStats && message.gameStats.length)) message.gameStats = [];
								message.gameStats.push(
									$root.rivet.client.game.StatSummary.decode(reader, reader.uint32())
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Profile message.
				 * @function verify
				 * @memberof rivet.client.group.Profile
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Profile.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					let properties = {};
					if (message.id != null && message.hasOwnProperty('id'))
						if (!$util.isString(message.id)) return 'id: string expected';
					if (message.displayName != null && message.hasOwnProperty('displayName'))
						if (!$util.isString(message.displayName)) return 'displayName: string expected';
					if (message.bio != null && message.hasOwnProperty('bio'))
						if (!$util.isString(message.bio)) return 'bio: string expected';
					if (message.avatarUrl != null && message.hasOwnProperty('avatarUrl')) {
						properties._avatarUrl = 1;
						if (!$util.isString(message.avatarUrl)) return 'avatarUrl: string expected';
					}
					if (message.external != null && message.hasOwnProperty('external')) {
						let error = $root.rivet.client.group.ExternalLinks.verify(message.external);
						if (error) return 'external.' + error;
					}
					if (message.isDeveloper != null && message.hasOwnProperty('isDeveloper'))
						if (typeof message.isDeveloper !== 'boolean') return 'isDeveloper: boolean expected';
					if (
						message.isCurrentIdentityMember != null &&
						message.hasOwnProperty('isCurrentIdentityMember')
					)
						if (typeof message.isCurrentIdentityMember !== 'boolean')
							return 'isCurrentIdentityMember: boolean expected';
					if (message.publicity != null && message.hasOwnProperty('publicity'))
						if (!$util.isString(message.publicity)) return 'publicity: string expected';
					if (message.memberCount != null && message.hasOwnProperty('memberCount'))
						if (!$util.isInteger(message.memberCount)) return 'memberCount: integer expected';
					if (message.members != null && message.hasOwnProperty('members')) {
						if (!Array.isArray(message.members)) return 'members: array expected';
						for (let i = 0; i < message.members.length; ++i) {
							let error = $root.rivet.client.group.Member.verify(message.members[i]);
							if (error) return 'members.' + error;
						}
					}
					if (message.roles != null && message.hasOwnProperty('roles')) {
						if (!Array.isArray(message.roles)) return 'roles: array expected';
						for (let i = 0; i < message.roles.length; ++i) {
							let error = $root.rivet.client.group.Role.verify(message.roles[i]);
							if (error) return 'roles.' + error;
						}
					}
					if (message.joinRequests != null && message.hasOwnProperty('joinRequests')) {
						if (!Array.isArray(message.joinRequests)) return 'joinRequests: array expected';
						for (let i = 0; i < message.joinRequests.length; ++i) {
							let error = $root.rivet.client.group.JoinRequest.verify(message.joinRequests[i]);
							if (error) return 'joinRequests.' + error;
						}
					}
					if (
						message.isCurrentIdentityRequestingJoin != null &&
						message.hasOwnProperty('isCurrentIdentityRequestingJoin')
					)
						if (typeof message.isCurrentIdentityRequestingJoin !== 'boolean')
							return 'isCurrentIdentityRequestingJoin: boolean expected';
					if (message.ownerIdentityId != null && message.hasOwnProperty('ownerIdentityId'))
						if (!$util.isString(message.ownerIdentityId))
							return 'ownerIdentityId: string expected';
					if (message.channels != null && message.hasOwnProperty('channels')) {
						if (!Array.isArray(message.channels)) return 'channels: array expected';
						for (let i = 0; i < message.channels.length; ++i) {
							let error = $root.rivet.client.group.Channel.verify(message.channels[i]);
							if (error) return 'channels.' + error;
						}
					}
					if (message.gameStats != null && message.hasOwnProperty('gameStats')) {
						if (!Array.isArray(message.gameStats)) return 'gameStats: array expected';
						for (let i = 0; i < message.gameStats.length; ++i) {
							let error = $root.rivet.client.game.StatSummary.verify(message.gameStats[i]);
							if (error) return 'gameStats.' + error;
						}
					}
					return null;
				};

				return Profile;
			})();

			group.Role = (function () {
				/**
				 * Properties of a Role.
				 * @memberof rivet.client.group
				 * @interface IRole
				 * @property {string|null} [roleId] Role roleId
				 * @property {string|null} [label] Role label
				 */

				/**
				 * Constructs a new Role.
				 * @memberof rivet.client.group
				 * @classdesc Represents a Role.
				 * @implements IRole
				 * @constructor
				 * @param {rivet.client.group.IRole=} [properties] Properties to set
				 */
				function Role(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Role roleId.
				 * @member {string} roleId
				 * @memberof rivet.client.group.Role
				 * @instance
				 */
				Role.prototype.roleId = '';

				/**
				 * Role label.
				 * @member {string} label
				 * @memberof rivet.client.group.Role
				 * @instance
				 */
				Role.prototype.label = '';

				/**
				 * Creates a new Role instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.group.Role
				 * @static
				 * @param {rivet.client.group.IRole=} [properties] Properties to set
				 * @returns {rivet.client.group.Role} Role instance
				 */
				Role.create = function create(properties) {
					return new Role(properties);
				};

				/**
				 * Encodes the specified Role message. Does not implicitly {@link rivet.client.group.Role.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.group.Role
				 * @static
				 * @param {rivet.client.group.IRole} message Role message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Role.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.roleId != null && Object.hasOwnProperty.call(message, 'roleId'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.roleId);
					if (message.label != null && Object.hasOwnProperty.call(message, 'label'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.label);
					return writer;
				};

				/**
				 * Decodes a Role message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.group.Role
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.group.Role} Role
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Role.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.group.Role();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.roleId = reader.string();
								break;
							case 2:
								message.label = reader.string();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Role message.
				 * @function verify
				 * @memberof rivet.client.group.Role
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Role.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.roleId != null && message.hasOwnProperty('roleId'))
						if (!$util.isString(message.roleId)) return 'roleId: string expected';
					if (message.label != null && message.hasOwnProperty('label'))
						if (!$util.isString(message.label)) return 'label: string expected';
					return null;
				};

				return Role;
			})();

			group.Summary = (function () {
				/**
				 * Properties of a Summary.
				 * @memberof rivet.client.group
				 * @interface ISummary
				 * @property {string|null} [id] Summary id
				 * @property {string|null} [displayName] Summary displayName
				 * @property {string|null} [bio] Summary bio
				 * @property {string|null} [avatarUrl] Summary avatarUrl
				 * @property {rivet.client.group.IExternalLinks|null} [external] Summary external
				 * @property {boolean|null} [isDeveloper] Summary isDeveloper
				 * @property {boolean|null} [isCurrentIdentityMember] Summary isCurrentIdentityMember
				 * @property {string|null} [publicity] Summary publicity
				 * @property {number|null} [memberCount] Summary memberCount
				 */

				/**
				 * Constructs a new Summary.
				 * @memberof rivet.client.group
				 * @classdesc Represents a Summary.
				 * @implements ISummary
				 * @constructor
				 * @param {rivet.client.group.ISummary=} [properties] Properties to set
				 */
				function Summary(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Summary id.
				 * @member {string} id
				 * @memberof rivet.client.group.Summary
				 * @instance
				 */
				Summary.prototype.id = '';

				/**
				 * Summary displayName.
				 * @member {string} displayName
				 * @memberof rivet.client.group.Summary
				 * @instance
				 */
				Summary.prototype.displayName = '';

				/**
				 * Summary bio.
				 * @member {string} bio
				 * @memberof rivet.client.group.Summary
				 * @instance
				 */
				Summary.prototype.bio = '';

				/**
				 * Summary avatarUrl.
				 * @member {string|null|undefined} avatarUrl
				 * @memberof rivet.client.group.Summary
				 * @instance
				 */
				Summary.prototype.avatarUrl = null;

				/**
				 * Summary external.
				 * @member {rivet.client.group.IExternalLinks|null|undefined} external
				 * @memberof rivet.client.group.Summary
				 * @instance
				 */
				Summary.prototype.external = null;

				/**
				 * Summary isDeveloper.
				 * @member {boolean} isDeveloper
				 * @memberof rivet.client.group.Summary
				 * @instance
				 */
				Summary.prototype.isDeveloper = false;

				/**
				 * Summary isCurrentIdentityMember.
				 * @member {boolean} isCurrentIdentityMember
				 * @memberof rivet.client.group.Summary
				 * @instance
				 */
				Summary.prototype.isCurrentIdentityMember = false;

				/**
				 * Summary publicity.
				 * @member {string} publicity
				 * @memberof rivet.client.group.Summary
				 * @instance
				 */
				Summary.prototype.publicity = '';

				/**
				 * Summary memberCount.
				 * @member {number} memberCount
				 * @memberof rivet.client.group.Summary
				 * @instance
				 */
				Summary.prototype.memberCount = 0;

				// OneOf field names bound to virtual getters and setters
				let $oneOfFields;

				/**
				 * Summary _avatarUrl.
				 * @member {"avatarUrl"|undefined} _avatarUrl
				 * @memberof rivet.client.group.Summary
				 * @instance
				 */
				Object.defineProperty(Summary.prototype, '_avatarUrl', {
					get: $util.oneOfGetter(($oneOfFields = ['avatarUrl'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Creates a new Summary instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.group.Summary
				 * @static
				 * @param {rivet.client.group.ISummary=} [properties] Properties to set
				 * @returns {rivet.client.group.Summary} Summary instance
				 */
				Summary.create = function create(properties) {
					return new Summary(properties);
				};

				/**
				 * Encodes the specified Summary message. Does not implicitly {@link rivet.client.group.Summary.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.group.Summary
				 * @static
				 * @param {rivet.client.group.ISummary} message Summary message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Summary.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
					if (message.displayName != null && Object.hasOwnProperty.call(message, 'displayName'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.displayName);
					if (message.bio != null && Object.hasOwnProperty.call(message, 'bio'))
						writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.bio);
					if (message.avatarUrl != null && Object.hasOwnProperty.call(message, 'avatarUrl'))
						writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.avatarUrl);
					if (message.external != null && Object.hasOwnProperty.call(message, 'external'))
						$root.rivet.client.group.ExternalLinks.encode(
							message.external,
							writer.uint32(/* id 5, wireType 2 =*/ 42).fork()
						).ldelim();
					if (message.isDeveloper != null && Object.hasOwnProperty.call(message, 'isDeveloper'))
						writer.uint32(/* id 6, wireType 0 =*/ 48).bool(message.isDeveloper);
					if (
						message.isCurrentIdentityMember != null &&
						Object.hasOwnProperty.call(message, 'isCurrentIdentityMember')
					)
						writer.uint32(/* id 100, wireType 0 =*/ 800).bool(message.isCurrentIdentityMember);
					if (message.publicity != null && Object.hasOwnProperty.call(message, 'publicity'))
						writer.uint32(/* id 101, wireType 2 =*/ 810).string(message.publicity);
					if (message.memberCount != null && Object.hasOwnProperty.call(message, 'memberCount'))
						writer.uint32(/* id 102, wireType 0 =*/ 816).uint32(message.memberCount);
					return writer;
				};

				/**
				 * Decodes a Summary message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.group.Summary
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.group.Summary} Summary
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Summary.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.group.Summary();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.id = reader.string();
								break;
							case 2:
								message.displayName = reader.string();
								break;
							case 3:
								message.bio = reader.string();
								break;
							case 4:
								message.avatarUrl = reader.string();
								break;
							case 5:
								message.external = $root.rivet.client.group.ExternalLinks.decode(
									reader,
									reader.uint32()
								);
								break;
							case 6:
								message.isDeveloper = reader.bool();
								break;
							case 100:
								message.isCurrentIdentityMember = reader.bool();
								break;
							case 101:
								message.publicity = reader.string();
								break;
							case 102:
								message.memberCount = reader.uint32();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Summary message.
				 * @function verify
				 * @memberof rivet.client.group.Summary
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Summary.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					let properties = {};
					if (message.id != null && message.hasOwnProperty('id'))
						if (!$util.isString(message.id)) return 'id: string expected';
					if (message.displayName != null && message.hasOwnProperty('displayName'))
						if (!$util.isString(message.displayName)) return 'displayName: string expected';
					if (message.bio != null && message.hasOwnProperty('bio'))
						if (!$util.isString(message.bio)) return 'bio: string expected';
					if (message.avatarUrl != null && message.hasOwnProperty('avatarUrl')) {
						properties._avatarUrl = 1;
						if (!$util.isString(message.avatarUrl)) return 'avatarUrl: string expected';
					}
					if (message.external != null && message.hasOwnProperty('external')) {
						let error = $root.rivet.client.group.ExternalLinks.verify(message.external);
						if (error) return 'external.' + error;
					}
					if (message.isDeveloper != null && message.hasOwnProperty('isDeveloper'))
						if (typeof message.isDeveloper !== 'boolean') return 'isDeveloper: boolean expected';
					if (
						message.isCurrentIdentityMember != null &&
						message.hasOwnProperty('isCurrentIdentityMember')
					)
						if (typeof message.isCurrentIdentityMember !== 'boolean')
							return 'isCurrentIdentityMember: boolean expected';
					if (message.publicity != null && message.hasOwnProperty('publicity'))
						if (!$util.isString(message.publicity)) return 'publicity: string expected';
					if (message.memberCount != null && message.hasOwnProperty('memberCount'))
						if (!$util.isInteger(message.memberCount)) return 'memberCount: integer expected';
					return null;
				};

				return Summary;
			})();

			return group;
		})();

		client.identity = (function () {
			/**
			 * Namespace identity.
			 * @memberof rivet.client
			 * @namespace
			 */
			const identity = {};

			identity.ExternalLinks = (function () {
				/**
				 * Properties of an ExternalLinks.
				 * @memberof rivet.client.identity
				 * @interface IExternalLinks
				 * @property {string|null} [profile] ExternalLinks profile
				 * @property {string|null} [settings] ExternalLinks settings
				 * @property {string|null} [chat] ExternalLinks chat
				 */

				/**
				 * Constructs a new ExternalLinks.
				 * @memberof rivet.client.identity
				 * @classdesc Represents an ExternalLinks.
				 * @implements IExternalLinks
				 * @constructor
				 * @param {rivet.client.identity.IExternalLinks=} [properties] Properties to set
				 */
				function ExternalLinks(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * ExternalLinks profile.
				 * @member {string} profile
				 * @memberof rivet.client.identity.ExternalLinks
				 * @instance
				 */
				ExternalLinks.prototype.profile = '';

				/**
				 * ExternalLinks settings.
				 * @member {string|null|undefined} settings
				 * @memberof rivet.client.identity.ExternalLinks
				 * @instance
				 */
				ExternalLinks.prototype.settings = null;

				/**
				 * ExternalLinks chat.
				 * @member {string|null|undefined} chat
				 * @memberof rivet.client.identity.ExternalLinks
				 * @instance
				 */
				ExternalLinks.prototype.chat = null;

				// OneOf field names bound to virtual getters and setters
				let $oneOfFields;

				/**
				 * ExternalLinks _settings.
				 * @member {"settings"|undefined} _settings
				 * @memberof rivet.client.identity.ExternalLinks
				 * @instance
				 */
				Object.defineProperty(ExternalLinks.prototype, '_settings', {
					get: $util.oneOfGetter(($oneOfFields = ['settings'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * ExternalLinks _chat.
				 * @member {"chat"|undefined} _chat
				 * @memberof rivet.client.identity.ExternalLinks
				 * @instance
				 */
				Object.defineProperty(ExternalLinks.prototype, '_chat', {
					get: $util.oneOfGetter(($oneOfFields = ['chat'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Creates a new ExternalLinks instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.identity.ExternalLinks
				 * @static
				 * @param {rivet.client.identity.IExternalLinks=} [properties] Properties to set
				 * @returns {rivet.client.identity.ExternalLinks} ExternalLinks instance
				 */
				ExternalLinks.create = function create(properties) {
					return new ExternalLinks(properties);
				};

				/**
				 * Encodes the specified ExternalLinks message. Does not implicitly {@link rivet.client.identity.ExternalLinks.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.identity.ExternalLinks
				 * @static
				 * @param {rivet.client.identity.IExternalLinks} message ExternalLinks message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				ExternalLinks.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.profile != null && Object.hasOwnProperty.call(message, 'profile'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.profile);
					if (message.settings != null && Object.hasOwnProperty.call(message, 'settings'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.settings);
					if (message.chat != null && Object.hasOwnProperty.call(message, 'chat'))
						writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.chat);
					return writer;
				};

				/**
				 * Decodes an ExternalLinks message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.identity.ExternalLinks
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.identity.ExternalLinks} ExternalLinks
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				ExternalLinks.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.identity.ExternalLinks();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.profile = reader.string();
								break;
							case 2:
								message.settings = reader.string();
								break;
							case 3:
								message.chat = reader.string();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies an ExternalLinks message.
				 * @function verify
				 * @memberof rivet.client.identity.ExternalLinks
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				ExternalLinks.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					let properties = {};
					if (message.profile != null && message.hasOwnProperty('profile'))
						if (!$util.isString(message.profile)) return 'profile: string expected';
					if (message.settings != null && message.hasOwnProperty('settings')) {
						properties._settings = 1;
						if (!$util.isString(message.settings)) return 'settings: string expected';
					}
					if (message.chat != null && message.hasOwnProperty('chat')) {
						properties._chat = 1;
						if (!$util.isString(message.chat)) return 'chat: string expected';
					}
					return null;
				};

				return ExternalLinks;
			})();

			identity.Handle = (function () {
				/**
				 * Properties of a Handle.
				 * @memberof rivet.client.identity
				 * @interface IHandle
				 * @property {string|null} [id] Handle id
				 * @property {string|null} [displayName] Handle displayName
				 * @property {number|null} [accountNumber] Handle accountNumber
				 * @property {string|null} [avatarUrl] Handle avatarUrl
				 * @property {rivet.client.identity.IPresence|null} [presence] Handle presence
				 * @property {boolean|null} [isRegistered] Handle isRegistered
				 * @property {boolean|null} [isClaimed] Handle isClaimed
				 * @property {rivet.client.identity.IExternalLinks|null} [external] Handle external
				 */

				/**
				 * Constructs a new Handle.
				 * @memberof rivet.client.identity
				 * @classdesc Represents a Handle.
				 * @implements IHandle
				 * @constructor
				 * @param {rivet.client.identity.IHandle=} [properties] Properties to set
				 */
				function Handle(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Handle id.
				 * @member {string} id
				 * @memberof rivet.client.identity.Handle
				 * @instance
				 */
				Handle.prototype.id = '';

				/**
				 * Handle displayName.
				 * @member {string} displayName
				 * @memberof rivet.client.identity.Handle
				 * @instance
				 */
				Handle.prototype.displayName = '';

				/**
				 * Handle accountNumber.
				 * @member {number} accountNumber
				 * @memberof rivet.client.identity.Handle
				 * @instance
				 */
				Handle.prototype.accountNumber = 0;

				/**
				 * Handle avatarUrl.
				 * @member {string} avatarUrl
				 * @memberof rivet.client.identity.Handle
				 * @instance
				 */
				Handle.prototype.avatarUrl = '';

				/**
				 * Handle presence.
				 * @member {rivet.client.identity.IPresence|null|undefined} presence
				 * @memberof rivet.client.identity.Handle
				 * @instance
				 */
				Handle.prototype.presence = null;

				/**
				 * Handle isRegistered.
				 * @member {boolean} isRegistered
				 * @memberof rivet.client.identity.Handle
				 * @instance
				 */
				Handle.prototype.isRegistered = false;

				/**
				 * Handle isClaimed.
				 * @member {boolean} isClaimed
				 * @memberof rivet.client.identity.Handle
				 * @instance
				 */
				Handle.prototype.isClaimed = false;

				/**
				 * Handle external.
				 * @member {rivet.client.identity.IExternalLinks|null|undefined} external
				 * @memberof rivet.client.identity.Handle
				 * @instance
				 */
				Handle.prototype.external = null;

				/**
				 * Creates a new Handle instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.identity.Handle
				 * @static
				 * @param {rivet.client.identity.IHandle=} [properties] Properties to set
				 * @returns {rivet.client.identity.Handle} Handle instance
				 */
				Handle.create = function create(properties) {
					return new Handle(properties);
				};

				/**
				 * Encodes the specified Handle message. Does not implicitly {@link rivet.client.identity.Handle.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.identity.Handle
				 * @static
				 * @param {rivet.client.identity.IHandle} message Handle message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Handle.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
					if (message.displayName != null && Object.hasOwnProperty.call(message, 'displayName'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.displayName);
					if (message.accountNumber != null && Object.hasOwnProperty.call(message, 'accountNumber'))
						writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.accountNumber);
					if (message.avatarUrl != null && Object.hasOwnProperty.call(message, 'avatarUrl'))
						writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.avatarUrl);
					if (message.presence != null && Object.hasOwnProperty.call(message, 'presence'))
						$root.rivet.client.identity.Presence.encode(
							message.presence,
							writer.uint32(/* id 5, wireType 2 =*/ 42).fork()
						).ldelim();
					if (message.isRegistered != null && Object.hasOwnProperty.call(message, 'isRegistered'))
						writer.uint32(/* id 6, wireType 0 =*/ 48).bool(message.isRegistered);
					if (message.isClaimed != null && Object.hasOwnProperty.call(message, 'isClaimed'))
						writer.uint32(/* id 7, wireType 0 =*/ 56).bool(message.isClaimed);
					if (message.external != null && Object.hasOwnProperty.call(message, 'external'))
						$root.rivet.client.identity.ExternalLinks.encode(
							message.external,
							writer.uint32(/* id 8, wireType 2 =*/ 66).fork()
						).ldelim();
					return writer;
				};

				/**
				 * Decodes a Handle message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.identity.Handle
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.identity.Handle} Handle
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Handle.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.identity.Handle();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.id = reader.string();
								break;
							case 2:
								message.displayName = reader.string();
								break;
							case 3:
								message.accountNumber = reader.uint32();
								break;
							case 4:
								message.avatarUrl = reader.string();
								break;
							case 5:
								message.presence = $root.rivet.client.identity.Presence.decode(
									reader,
									reader.uint32()
								);
								break;
							case 6:
								message.isRegistered = reader.bool();
								break;
							case 7:
								message.isClaimed = reader.bool();
								break;
							case 8:
								message.external = $root.rivet.client.identity.ExternalLinks.decode(
									reader,
									reader.uint32()
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Handle message.
				 * @function verify
				 * @memberof rivet.client.identity.Handle
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Handle.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.id != null && message.hasOwnProperty('id'))
						if (!$util.isString(message.id)) return 'id: string expected';
					if (message.displayName != null && message.hasOwnProperty('displayName'))
						if (!$util.isString(message.displayName)) return 'displayName: string expected';
					if (message.accountNumber != null && message.hasOwnProperty('accountNumber'))
						if (!$util.isInteger(message.accountNumber)) return 'accountNumber: integer expected';
					if (message.avatarUrl != null && message.hasOwnProperty('avatarUrl'))
						if (!$util.isString(message.avatarUrl)) return 'avatarUrl: string expected';
					if (message.presence != null && message.hasOwnProperty('presence')) {
						let error = $root.rivet.client.identity.Presence.verify(message.presence);
						if (error) return 'presence.' + error;
					}
					if (message.isRegistered != null && message.hasOwnProperty('isRegistered'))
						if (typeof message.isRegistered !== 'boolean')
							return 'isRegistered: boolean expected';
					if (message.isClaimed != null && message.hasOwnProperty('isClaimed'))
						if (typeof message.isClaimed !== 'boolean') return 'isClaimed: boolean expected';
					if (message.external != null && message.hasOwnProperty('external')) {
						let error = $root.rivet.client.identity.ExternalLinks.verify(message.external);
						if (error) return 'external.' + error;
					}
					return null;
				};

				return Handle;
			})();

			identity.Presence = (function () {
				/**
				 * Properties of a Presence.
				 * @memberof rivet.client.identity
				 * @interface IPresence
				 * @property {number|Long|null} [updateTs] Presence updateTs
				 * @property {string|null} [status] Presence status
				 * @property {rivet.client.party.IHandle|null} [party] Presence party
				 * @property {rivet.client.identity.Presence.IGameActivity|null} [gameActivity] Presence gameActivity
				 */

				/**
				 * Constructs a new Presence.
				 * @memberof rivet.client.identity
				 * @classdesc Represents a Presence.
				 * @implements IPresence
				 * @constructor
				 * @param {rivet.client.identity.IPresence=} [properties] Properties to set
				 */
				function Presence(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Presence updateTs.
				 * @member {number|Long} updateTs
				 * @memberof rivet.client.identity.Presence
				 * @instance
				 */
				Presence.prototype.updateTs = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

				/**
				 * Presence status.
				 * @member {string} status
				 * @memberof rivet.client.identity.Presence
				 * @instance
				 */
				Presence.prototype.status = '';

				/**
				 * Presence party.
				 * @member {rivet.client.party.IHandle|null|undefined} party
				 * @memberof rivet.client.identity.Presence
				 * @instance
				 */
				Presence.prototype.party = null;

				/**
				 * Presence gameActivity.
				 * @member {rivet.client.identity.Presence.IGameActivity|null|undefined} gameActivity
				 * @memberof rivet.client.identity.Presence
				 * @instance
				 */
				Presence.prototype.gameActivity = null;

				// OneOf field names bound to virtual getters and setters
				let $oneOfFields;

				/**
				 * Presence _party.
				 * @member {"party"|undefined} _party
				 * @memberof rivet.client.identity.Presence
				 * @instance
				 */
				Object.defineProperty(Presence.prototype, '_party', {
					get: $util.oneOfGetter(($oneOfFields = ['party'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Presence _gameActivity.
				 * @member {"gameActivity"|undefined} _gameActivity
				 * @memberof rivet.client.identity.Presence
				 * @instance
				 */
				Object.defineProperty(Presence.prototype, '_gameActivity', {
					get: $util.oneOfGetter(($oneOfFields = ['gameActivity'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Creates a new Presence instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.identity.Presence
				 * @static
				 * @param {rivet.client.identity.IPresence=} [properties] Properties to set
				 * @returns {rivet.client.identity.Presence} Presence instance
				 */
				Presence.create = function create(properties) {
					return new Presence(properties);
				};

				/**
				 * Encodes the specified Presence message. Does not implicitly {@link rivet.client.identity.Presence.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.identity.Presence
				 * @static
				 * @param {rivet.client.identity.IPresence} message Presence message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Presence.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.updateTs != null && Object.hasOwnProperty.call(message, 'updateTs'))
						writer.uint32(/* id 1, wireType 0 =*/ 8).uint64(message.updateTs);
					if (message.status != null && Object.hasOwnProperty.call(message, 'status'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.status);
					if (message.party != null && Object.hasOwnProperty.call(message, 'party'))
						$root.rivet.client.party.Handle.encode(
							message.party,
							writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
						).ldelim();
					if (message.gameActivity != null && Object.hasOwnProperty.call(message, 'gameActivity'))
						$root.rivet.client.identity.Presence.GameActivity.encode(
							message.gameActivity,
							writer.uint32(/* id 5, wireType 2 =*/ 42).fork()
						).ldelim();
					return writer;
				};

				/**
				 * Decodes a Presence message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.identity.Presence
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.identity.Presence} Presence
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Presence.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.identity.Presence();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.updateTs = reader.uint64();
								break;
							case 2:
								message.status = reader.string();
								break;
							case 3:
								message.party = $root.rivet.client.party.Handle.decode(
									reader,
									reader.uint32()
								);
								break;
							case 5:
								message.gameActivity =
									$root.rivet.client.identity.Presence.GameActivity.decode(
										reader,
										reader.uint32()
									);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Presence message.
				 * @function verify
				 * @memberof rivet.client.identity.Presence
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Presence.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					let properties = {};
					if (message.updateTs != null && message.hasOwnProperty('updateTs'))
						if (
							!$util.isInteger(message.updateTs) &&
							!(
								message.updateTs &&
								$util.isInteger(message.updateTs.low) &&
								$util.isInteger(message.updateTs.high)
							)
						)
							return 'updateTs: integer|Long expected';
					if (message.status != null && message.hasOwnProperty('status'))
						if (!$util.isString(message.status)) return 'status: string expected';
					if (message.party != null && message.hasOwnProperty('party')) {
						properties._party = 1;
						{
							let error = $root.rivet.client.party.Handle.verify(message.party);
							if (error) return 'party.' + error;
						}
					}
					if (message.gameActivity != null && message.hasOwnProperty('gameActivity')) {
						properties._gameActivity = 1;
						{
							let error = $root.rivet.client.identity.Presence.GameActivity.verify(
								message.gameActivity
							);
							if (error) return 'gameActivity.' + error;
						}
					}
					return null;
				};

				Presence.GameActivity = (function () {
					/**
					 * Properties of a GameActivity.
					 * @memberof rivet.client.identity.Presence
					 * @interface IGameActivity
					 * @property {rivet.client.game.IHandle|null} [game] GameActivity game
					 * @property {string|null} [message] GameActivity message
					 * @property {Uint8Array|null} [publicMetadata] GameActivity publicMetadata
					 * @property {Uint8Array|null} [friendMetadata] GameActivity friendMetadata
					 */

					/**
					 * Constructs a new GameActivity.
					 * @memberof rivet.client.identity.Presence
					 * @classdesc Represents a GameActivity.
					 * @implements IGameActivity
					 * @constructor
					 * @param {rivet.client.identity.Presence.IGameActivity=} [properties] Properties to set
					 */
					function GameActivity(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * GameActivity game.
					 * @member {rivet.client.game.IHandle|null|undefined} game
					 * @memberof rivet.client.identity.Presence.GameActivity
					 * @instance
					 */
					GameActivity.prototype.game = null;

					/**
					 * GameActivity message.
					 * @member {string} message
					 * @memberof rivet.client.identity.Presence.GameActivity
					 * @instance
					 */
					GameActivity.prototype.message = '';

					/**
					 * GameActivity publicMetadata.
					 * @member {Uint8Array|null|undefined} publicMetadata
					 * @memberof rivet.client.identity.Presence.GameActivity
					 * @instance
					 */
					GameActivity.prototype.publicMetadata = null;

					/**
					 * GameActivity friendMetadata.
					 * @member {Uint8Array|null|undefined} friendMetadata
					 * @memberof rivet.client.identity.Presence.GameActivity
					 * @instance
					 */
					GameActivity.prototype.friendMetadata = null;

					// OneOf field names bound to virtual getters and setters
					let $oneOfFields;

					/**
					 * GameActivity _publicMetadata.
					 * @member {"publicMetadata"|undefined} _publicMetadata
					 * @memberof rivet.client.identity.Presence.GameActivity
					 * @instance
					 */
					Object.defineProperty(GameActivity.prototype, '_publicMetadata', {
						get: $util.oneOfGetter(($oneOfFields = ['publicMetadata'])),
						set: $util.oneOfSetter($oneOfFields)
					});

					/**
					 * GameActivity _friendMetadata.
					 * @member {"friendMetadata"|undefined} _friendMetadata
					 * @memberof rivet.client.identity.Presence.GameActivity
					 * @instance
					 */
					Object.defineProperty(GameActivity.prototype, '_friendMetadata', {
						get: $util.oneOfGetter(($oneOfFields = ['friendMetadata'])),
						set: $util.oneOfSetter($oneOfFields)
					});

					/**
					 * Creates a new GameActivity instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.identity.Presence.GameActivity
					 * @static
					 * @param {rivet.client.identity.Presence.IGameActivity=} [properties] Properties to set
					 * @returns {rivet.client.identity.Presence.GameActivity} GameActivity instance
					 */
					GameActivity.create = function create(properties) {
						return new GameActivity(properties);
					};

					/**
					 * Encodes the specified GameActivity message. Does not implicitly {@link rivet.client.identity.Presence.GameActivity.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.identity.Presence.GameActivity
					 * @static
					 * @param {rivet.client.identity.Presence.IGameActivity} message GameActivity message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					GameActivity.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.game != null && Object.hasOwnProperty.call(message, 'game'))
							$root.rivet.client.game.Handle.encode(
								message.game,
								writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
							).ldelim();
						if (message.message != null && Object.hasOwnProperty.call(message, 'message'))
							writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.message);
						if (
							message.publicMetadata != null &&
							Object.hasOwnProperty.call(message, 'publicMetadata')
						)
							writer.uint32(/* id 3, wireType 2 =*/ 26).bytes(message.publicMetadata);
						if (
							message.friendMetadata != null &&
							Object.hasOwnProperty.call(message, 'friendMetadata')
						)
							writer.uint32(/* id 4, wireType 2 =*/ 34).bytes(message.friendMetadata);
						return writer;
					};

					/**
					 * Decodes a GameActivity message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.identity.Presence.GameActivity
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.identity.Presence.GameActivity} GameActivity
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					GameActivity.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.identity.Presence.GameActivity();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.game = $root.rivet.client.game.Handle.decode(
										reader,
										reader.uint32()
									);
									break;
								case 2:
									message.message = reader.string();
									break;
								case 3:
									message.publicMetadata = reader.bytes();
									break;
								case 4:
									message.friendMetadata = reader.bytes();
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a GameActivity message.
					 * @function verify
					 * @memberof rivet.client.identity.Presence.GameActivity
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					GameActivity.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						let properties = {};
						if (message.game != null && message.hasOwnProperty('game')) {
							let error = $root.rivet.client.game.Handle.verify(message.game);
							if (error) return 'game.' + error;
						}
						if (message.message != null && message.hasOwnProperty('message'))
							if (!$util.isString(message.message)) return 'message: string expected';
						if (message.publicMetadata != null && message.hasOwnProperty('publicMetadata')) {
							properties._publicMetadata = 1;
							if (
								!(
									(message.publicMetadata &&
										typeof message.publicMetadata.length === 'number') ||
									$util.isString(message.publicMetadata)
								)
							)
								return 'publicMetadata: buffer expected';
						}
						if (message.friendMetadata != null && message.hasOwnProperty('friendMetadata')) {
							properties._friendMetadata = 1;
							if (
								!(
									(message.friendMetadata &&
										typeof message.friendMetadata.length === 'number') ||
									$util.isString(message.friendMetadata)
								)
							)
								return 'friendMetadata: buffer expected';
						}
						return null;
					};

					return GameActivity;
				})();

				return Presence;
			})();

			identity.Profile = (function () {
				/**
				 * Properties of a Profile.
				 * @memberof rivet.client.identity
				 * @interface IProfile
				 * @property {string|null} [id] Profile id
				 * @property {string|null} [displayName] Profile displayName
				 * @property {number|null} [accountNumber] Profile accountNumber
				 * @property {string|null} [avatarUrl] Profile avatarUrl
				 * @property {rivet.client.identity.IPresence|null} [presence] Profile presence
				 * @property {boolean|null} [isRegistered] Profile isRegistered
				 * @property {boolean|null} [isClaimed] Profile isClaimed
				 * @property {rivet.client.identity.IExternalLinks|null} [external] Profile external
				 * @property {number|null} [followerCount] Profile followerCount
				 * @property {number|null} [followingCount] Profile followingCount
				 * @property {boolean|null} [isCurrentIdentityFollowing] Profile isCurrentIdentityFollowing
				 * @property {boolean|null} [isCurrentIdentityFollower] Profile isCurrentIdentityFollower
				 * @property {number|Long|null} [joinTs] Profile joinTs
				 * @property {string|null} [bio] Profile bio
				 * @property {Array.<rivet.client.linked_account.ILinkedAccount>|null} [linkedAccounts] Profile linkedAccounts
				 * @property {boolean|null} [isAdmin] Profile isAdmin
				 * @property {string|null} [devState] Profile devState
				 * @property {Array.<rivet.client.identity.Profile.IGroup>|null} [groups] Profile groups
				 * @property {Array.<rivet.client.game.IStatSummary>|null} [games] Profile games
				 */

				/**
				 * Constructs a new Profile.
				 * @memberof rivet.client.identity
				 * @classdesc Represents a Profile.
				 * @implements IProfile
				 * @constructor
				 * @param {rivet.client.identity.IProfile=} [properties] Properties to set
				 */
				function Profile(properties) {
					this.linkedAccounts = [];
					this.groups = [];
					this.games = [];
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Profile id.
				 * @member {string} id
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.id = '';

				/**
				 * Profile displayName.
				 * @member {string} displayName
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.displayName = '';

				/**
				 * Profile accountNumber.
				 * @member {number} accountNumber
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.accountNumber = 0;

				/**
				 * Profile avatarUrl.
				 * @member {string} avatarUrl
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.avatarUrl = '';

				/**
				 * Profile presence.
				 * @member {rivet.client.identity.IPresence|null|undefined} presence
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.presence = null;

				/**
				 * Profile isRegistered.
				 * @member {boolean} isRegistered
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.isRegistered = false;

				/**
				 * Profile isClaimed.
				 * @member {boolean} isClaimed
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.isClaimed = false;

				/**
				 * Profile external.
				 * @member {rivet.client.identity.IExternalLinks|null|undefined} external
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.external = null;

				/**
				 * Profile followerCount.
				 * @member {number} followerCount
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.followerCount = 0;

				/**
				 * Profile followingCount.
				 * @member {number} followingCount
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.followingCount = 0;

				/**
				 * Profile isCurrentIdentityFollowing.
				 * @member {boolean} isCurrentIdentityFollowing
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.isCurrentIdentityFollowing = false;

				/**
				 * Profile isCurrentIdentityFollower.
				 * @member {boolean} isCurrentIdentityFollower
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.isCurrentIdentityFollower = false;

				/**
				 * Profile joinTs.
				 * @member {number|Long} joinTs
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.joinTs = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

				/**
				 * Profile bio.
				 * @member {string} bio
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.bio = '';

				/**
				 * Profile linkedAccounts.
				 * @member {Array.<rivet.client.linked_account.ILinkedAccount>} linkedAccounts
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.linkedAccounts = $util.emptyArray;

				/**
				 * Profile isAdmin.
				 * @member {boolean} isAdmin
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.isAdmin = false;

				/**
				 * Profile devState.
				 * @member {string} devState
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.devState = '';

				/**
				 * Profile groups.
				 * @member {Array.<rivet.client.identity.Profile.IGroup>} groups
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.groups = $util.emptyArray;

				/**
				 * Profile games.
				 * @member {Array.<rivet.client.game.IStatSummary>} games
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Profile.prototype.games = $util.emptyArray;

				// OneOf field names bound to virtual getters and setters
				let $oneOfFields;

				/**
				 * Profile _presence.
				 * @member {"presence"|undefined} _presence
				 * @memberof rivet.client.identity.Profile
				 * @instance
				 */
				Object.defineProperty(Profile.prototype, '_presence', {
					get: $util.oneOfGetter(($oneOfFields = ['presence'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Creates a new Profile instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.identity.Profile
				 * @static
				 * @param {rivet.client.identity.IProfile=} [properties] Properties to set
				 * @returns {rivet.client.identity.Profile} Profile instance
				 */
				Profile.create = function create(properties) {
					return new Profile(properties);
				};

				/**
				 * Encodes the specified Profile message. Does not implicitly {@link rivet.client.identity.Profile.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.identity.Profile
				 * @static
				 * @param {rivet.client.identity.IProfile} message Profile message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Profile.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
					if (message.displayName != null && Object.hasOwnProperty.call(message, 'displayName'))
						writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.displayName);
					if (message.accountNumber != null && Object.hasOwnProperty.call(message, 'accountNumber'))
						writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.accountNumber);
					if (message.avatarUrl != null && Object.hasOwnProperty.call(message, 'avatarUrl'))
						writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.avatarUrl);
					if (message.presence != null && Object.hasOwnProperty.call(message, 'presence'))
						$root.rivet.client.identity.Presence.encode(
							message.presence,
							writer.uint32(/* id 5, wireType 2 =*/ 42).fork()
						).ldelim();
					if (message.isRegistered != null && Object.hasOwnProperty.call(message, 'isRegistered'))
						writer.uint32(/* id 6, wireType 0 =*/ 48).bool(message.isRegistered);
					if (message.isClaimed != null && Object.hasOwnProperty.call(message, 'isClaimed'))
						writer.uint32(/* id 7, wireType 0 =*/ 56).bool(message.isClaimed);
					if (message.external != null && Object.hasOwnProperty.call(message, 'external'))
						$root.rivet.client.identity.ExternalLinks.encode(
							message.external,
							writer.uint32(/* id 8, wireType 2 =*/ 66).fork()
						).ldelim();
					if (message.followerCount != null && Object.hasOwnProperty.call(message, 'followerCount'))
						writer.uint32(/* id 100, wireType 0 =*/ 800).uint32(message.followerCount);
					if (
						message.followingCount != null &&
						Object.hasOwnProperty.call(message, 'followingCount')
					)
						writer.uint32(/* id 101, wireType 0 =*/ 808).uint32(message.followingCount);
					if (
						message.isCurrentIdentityFollowing != null &&
						Object.hasOwnProperty.call(message, 'isCurrentIdentityFollowing')
					)
						writer.uint32(/* id 102, wireType 0 =*/ 816).bool(message.isCurrentIdentityFollowing);
					if (
						message.isCurrentIdentityFollower != null &&
						Object.hasOwnProperty.call(message, 'isCurrentIdentityFollower')
					)
						writer.uint32(/* id 103, wireType 0 =*/ 824).bool(message.isCurrentIdentityFollower);
					if (message.joinTs != null && Object.hasOwnProperty.call(message, 'joinTs'))
						writer.uint32(/* id 104, wireType 0 =*/ 832).uint64(message.joinTs);
					if (message.bio != null && Object.hasOwnProperty.call(message, 'bio'))
						writer.uint32(/* id 105, wireType 2 =*/ 842).string(message.bio);
					if (message.linkedAccounts != null && message.linkedAccounts.length)
						for (let i = 0; i < message.linkedAccounts.length; ++i)
							$root.rivet.client.linked_account.LinkedAccount.encode(
								message.linkedAccounts[i],
								writer.uint32(/* id 106, wireType 2 =*/ 850).fork()
							).ldelim();
					if (message.isAdmin != null && Object.hasOwnProperty.call(message, 'isAdmin'))
						writer.uint32(/* id 107, wireType 0 =*/ 856).bool(message.isAdmin);
					if (message.devState != null && Object.hasOwnProperty.call(message, 'devState'))
						writer.uint32(/* id 108, wireType 2 =*/ 866).string(message.devState);
					if (message.groups != null && message.groups.length)
						for (let i = 0; i < message.groups.length; ++i)
							$root.rivet.client.identity.Profile.Group.encode(
								message.groups[i],
								writer.uint32(/* id 200, wireType 2 =*/ 1602).fork()
							).ldelim();
					if (message.games != null && message.games.length)
						for (let i = 0; i < message.games.length; ++i)
							$root.rivet.client.game.StatSummary.encode(
								message.games[i],
								writer.uint32(/* id 300, wireType 2 =*/ 2402).fork()
							).ldelim();
					return writer;
				};

				/**
				 * Decodes a Profile message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.identity.Profile
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.identity.Profile} Profile
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Profile.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.identity.Profile();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.id = reader.string();
								break;
							case 2:
								message.displayName = reader.string();
								break;
							case 3:
								message.accountNumber = reader.uint32();
								break;
							case 4:
								message.avatarUrl = reader.string();
								break;
							case 5:
								message.presence = $root.rivet.client.identity.Presence.decode(
									reader,
									reader.uint32()
								);
								break;
							case 6:
								message.isRegistered = reader.bool();
								break;
							case 7:
								message.isClaimed = reader.bool();
								break;
							case 8:
								message.external = $root.rivet.client.identity.ExternalLinks.decode(
									reader,
									reader.uint32()
								);
								break;
							case 100:
								message.followerCount = reader.uint32();
								break;
							case 101:
								message.followingCount = reader.uint32();
								break;
							case 102:
								message.isCurrentIdentityFollowing = reader.bool();
								break;
							case 103:
								message.isCurrentIdentityFollower = reader.bool();
								break;
							case 104:
								message.joinTs = reader.uint64();
								break;
							case 105:
								message.bio = reader.string();
								break;
							case 106:
								if (!(message.linkedAccounts && message.linkedAccounts.length))
									message.linkedAccounts = [];
								message.linkedAccounts.push(
									$root.rivet.client.linked_account.LinkedAccount.decode(
										reader,
										reader.uint32()
									)
								);
								break;
							case 107:
								message.isAdmin = reader.bool();
								break;
							case 108:
								message.devState = reader.string();
								break;
							case 200:
								if (!(message.groups && message.groups.length)) message.groups = [];
								message.groups.push(
									$root.rivet.client.identity.Profile.Group.decode(reader, reader.uint32())
								);
								break;
							case 300:
								if (!(message.games && message.games.length)) message.games = [];
								message.games.push(
									$root.rivet.client.game.StatSummary.decode(reader, reader.uint32())
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Profile message.
				 * @function verify
				 * @memberof rivet.client.identity.Profile
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Profile.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					let properties = {};
					if (message.id != null && message.hasOwnProperty('id'))
						if (!$util.isString(message.id)) return 'id: string expected';
					if (message.displayName != null && message.hasOwnProperty('displayName'))
						if (!$util.isString(message.displayName)) return 'displayName: string expected';
					if (message.accountNumber != null && message.hasOwnProperty('accountNumber'))
						if (!$util.isInteger(message.accountNumber)) return 'accountNumber: integer expected';
					if (message.avatarUrl != null && message.hasOwnProperty('avatarUrl'))
						if (!$util.isString(message.avatarUrl)) return 'avatarUrl: string expected';
					if (message.presence != null && message.hasOwnProperty('presence')) {
						properties._presence = 1;
						{
							let error = $root.rivet.client.identity.Presence.verify(message.presence);
							if (error) return 'presence.' + error;
						}
					}
					if (message.isRegistered != null && message.hasOwnProperty('isRegistered'))
						if (typeof message.isRegistered !== 'boolean')
							return 'isRegistered: boolean expected';
					if (message.isClaimed != null && message.hasOwnProperty('isClaimed'))
						if (typeof message.isClaimed !== 'boolean') return 'isClaimed: boolean expected';
					if (message.external != null && message.hasOwnProperty('external')) {
						let error = $root.rivet.client.identity.ExternalLinks.verify(message.external);
						if (error) return 'external.' + error;
					}
					if (message.followerCount != null && message.hasOwnProperty('followerCount'))
						if (!$util.isInteger(message.followerCount)) return 'followerCount: integer expected';
					if (message.followingCount != null && message.hasOwnProperty('followingCount'))
						if (!$util.isInteger(message.followingCount))
							return 'followingCount: integer expected';
					if (
						message.isCurrentIdentityFollowing != null &&
						message.hasOwnProperty('isCurrentIdentityFollowing')
					)
						if (typeof message.isCurrentIdentityFollowing !== 'boolean')
							return 'isCurrentIdentityFollowing: boolean expected';
					if (
						message.isCurrentIdentityFollower != null &&
						message.hasOwnProperty('isCurrentIdentityFollower')
					)
						if (typeof message.isCurrentIdentityFollower !== 'boolean')
							return 'isCurrentIdentityFollower: boolean expected';
					if (message.joinTs != null && message.hasOwnProperty('joinTs'))
						if (
							!$util.isInteger(message.joinTs) &&
							!(
								message.joinTs &&
								$util.isInteger(message.joinTs.low) &&
								$util.isInteger(message.joinTs.high)
							)
						)
							return 'joinTs: integer|Long expected';
					if (message.bio != null && message.hasOwnProperty('bio'))
						if (!$util.isString(message.bio)) return 'bio: string expected';
					if (message.linkedAccounts != null && message.hasOwnProperty('linkedAccounts')) {
						if (!Array.isArray(message.linkedAccounts)) return 'linkedAccounts: array expected';
						for (let i = 0; i < message.linkedAccounts.length; ++i) {
							let error = $root.rivet.client.linked_account.LinkedAccount.verify(
								message.linkedAccounts[i]
							);
							if (error) return 'linkedAccounts.' + error;
						}
					}
					if (message.isAdmin != null && message.hasOwnProperty('isAdmin'))
						if (typeof message.isAdmin !== 'boolean') return 'isAdmin: boolean expected';
					if (message.devState != null && message.hasOwnProperty('devState'))
						if (!$util.isString(message.devState)) return 'devState: string expected';
					if (message.groups != null && message.hasOwnProperty('groups')) {
						if (!Array.isArray(message.groups)) return 'groups: array expected';
						for (let i = 0; i < message.groups.length; ++i) {
							let error = $root.rivet.client.identity.Profile.Group.verify(message.groups[i]);
							if (error) return 'groups.' + error;
						}
					}
					if (message.games != null && message.hasOwnProperty('games')) {
						if (!Array.isArray(message.games)) return 'games: array expected';
						for (let i = 0; i < message.games.length; ++i) {
							let error = $root.rivet.client.game.StatSummary.verify(message.games[i]);
							if (error) return 'games.' + error;
						}
					}
					return null;
				};

				Profile.Group = (function () {
					/**
					 * Properties of a Group.
					 * @memberof rivet.client.identity.Profile
					 * @interface IGroup
					 * @property {rivet.client.group.IHandle|null} [group] Group group
					 * @property {Array.<rivet.client.group.IRole>|null} [roles] Group roles
					 */

					/**
					 * Constructs a new Group.
					 * @memberof rivet.client.identity.Profile
					 * @classdesc Represents a Group.
					 * @implements IGroup
					 * @constructor
					 * @param {rivet.client.identity.Profile.IGroup=} [properties] Properties to set
					 */
					function Group(properties) {
						this.roles = [];
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * Group group.
					 * @member {rivet.client.group.IHandle|null|undefined} group
					 * @memberof rivet.client.identity.Profile.Group
					 * @instance
					 */
					Group.prototype.group = null;

					/**
					 * Group roles.
					 * @member {Array.<rivet.client.group.IRole>} roles
					 * @memberof rivet.client.identity.Profile.Group
					 * @instance
					 */
					Group.prototype.roles = $util.emptyArray;

					/**
					 * Creates a new Group instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.identity.Profile.Group
					 * @static
					 * @param {rivet.client.identity.Profile.IGroup=} [properties] Properties to set
					 * @returns {rivet.client.identity.Profile.Group} Group instance
					 */
					Group.create = function create(properties) {
						return new Group(properties);
					};

					/**
					 * Encodes the specified Group message. Does not implicitly {@link rivet.client.identity.Profile.Group.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.identity.Profile.Group
					 * @static
					 * @param {rivet.client.identity.Profile.IGroup} message Group message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					Group.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.group != null && Object.hasOwnProperty.call(message, 'group'))
							$root.rivet.client.group.Handle.encode(
								message.group,
								writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
							).ldelim();
						if (message.roles != null && message.roles.length)
							for (let i = 0; i < message.roles.length; ++i)
								$root.rivet.client.group.Role.encode(
									message.roles[i],
									writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
								).ldelim();
						return writer;
					};

					/**
					 * Decodes a Group message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.identity.Profile.Group
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.identity.Profile.Group} Group
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					Group.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.identity.Profile.Group();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.group = $root.rivet.client.group.Handle.decode(
										reader,
										reader.uint32()
									);
									break;
								case 2:
									if (!(message.roles && message.roles.length)) message.roles = [];
									message.roles.push(
										$root.rivet.client.group.Role.decode(reader, reader.uint32())
									);
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a Group message.
					 * @function verify
					 * @memberof rivet.client.identity.Profile.Group
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					Group.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						if (message.group != null && message.hasOwnProperty('group')) {
							let error = $root.rivet.client.group.Handle.verify(message.group);
							if (error) return 'group.' + error;
						}
						if (message.roles != null && message.hasOwnProperty('roles')) {
							if (!Array.isArray(message.roles)) return 'roles: array expected';
							for (let i = 0; i < message.roles.length; ++i) {
								let error = $root.rivet.client.group.Role.verify(message.roles[i]);
								if (error) return 'roles.' + error;
							}
						}
						return null;
					};

					return Group;
				})();

				return Profile;
			})();

			return identity;
		})();

		client.linked_account = (function () {
			/**
			 * Namespace linked_account.
			 * @memberof rivet.client
			 * @namespace
			 */
			const linked_account = {};

			linked_account.LinkedAccount = (function () {
				/**
				 * Properties of a LinkedAccount.
				 * @memberof rivet.client.linked_account
				 * @interface ILinkedAccount
				 * @property {rivet.client.linked_account.LinkedAccount.IEmail|null} [email] LinkedAccount email
				 */

				/**
				 * Constructs a new LinkedAccount.
				 * @memberof rivet.client.linked_account
				 * @classdesc Represents a LinkedAccount.
				 * @implements ILinkedAccount
				 * @constructor
				 * @param {rivet.client.linked_account.ILinkedAccount=} [properties] Properties to set
				 */
				function LinkedAccount(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * LinkedAccount email.
				 * @member {rivet.client.linked_account.LinkedAccount.IEmail|null|undefined} email
				 * @memberof rivet.client.linked_account.LinkedAccount
				 * @instance
				 */
				LinkedAccount.prototype.email = null;

				// OneOf field names bound to virtual getters and setters
				let $oneOfFields;

				/**
				 * LinkedAccount kind.
				 * @member {"email"|undefined} kind
				 * @memberof rivet.client.linked_account.LinkedAccount
				 * @instance
				 */
				Object.defineProperty(LinkedAccount.prototype, 'kind', {
					get: $util.oneOfGetter(($oneOfFields = ['email'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Creates a new LinkedAccount instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.linked_account.LinkedAccount
				 * @static
				 * @param {rivet.client.linked_account.ILinkedAccount=} [properties] Properties to set
				 * @returns {rivet.client.linked_account.LinkedAccount} LinkedAccount instance
				 */
				LinkedAccount.create = function create(properties) {
					return new LinkedAccount(properties);
				};

				/**
				 * Encodes the specified LinkedAccount message. Does not implicitly {@link rivet.client.linked_account.LinkedAccount.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.linked_account.LinkedAccount
				 * @static
				 * @param {rivet.client.linked_account.ILinkedAccount} message LinkedAccount message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				LinkedAccount.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.email != null && Object.hasOwnProperty.call(message, 'email'))
						$root.rivet.client.linked_account.LinkedAccount.Email.encode(
							message.email,
							writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
						).ldelim();
					return writer;
				};

				/**
				 * Decodes a LinkedAccount message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.linked_account.LinkedAccount
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.linked_account.LinkedAccount} LinkedAccount
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				LinkedAccount.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.linked_account.LinkedAccount();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.email = $root.rivet.client.linked_account.LinkedAccount.Email.decode(
									reader,
									reader.uint32()
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a LinkedAccount message.
				 * @function verify
				 * @memberof rivet.client.linked_account.LinkedAccount
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				LinkedAccount.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					let properties = {};
					if (message.email != null && message.hasOwnProperty('email')) {
						properties.kind = 1;
						{
							let error = $root.rivet.client.linked_account.LinkedAccount.Email.verify(
								message.email
							);
							if (error) return 'email.' + error;
						}
					}
					return null;
				};

				LinkedAccount.Email = (function () {
					/**
					 * Properties of an Email.
					 * @memberof rivet.client.linked_account.LinkedAccount
					 * @interface IEmail
					 * @property {string|null} [email] Email email
					 */

					/**
					 * Constructs a new Email.
					 * @memberof rivet.client.linked_account.LinkedAccount
					 * @classdesc Represents an Email.
					 * @implements IEmail
					 * @constructor
					 * @param {rivet.client.linked_account.LinkedAccount.IEmail=} [properties] Properties to set
					 */
					function Email(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * Email email.
					 * @member {string} email
					 * @memberof rivet.client.linked_account.LinkedAccount.Email
					 * @instance
					 */
					Email.prototype.email = '';

					/**
					 * Creates a new Email instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.linked_account.LinkedAccount.Email
					 * @static
					 * @param {rivet.client.linked_account.LinkedAccount.IEmail=} [properties] Properties to set
					 * @returns {rivet.client.linked_account.LinkedAccount.Email} Email instance
					 */
					Email.create = function create(properties) {
						return new Email(properties);
					};

					/**
					 * Encodes the specified Email message. Does not implicitly {@link rivet.client.linked_account.LinkedAccount.Email.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.linked_account.LinkedAccount.Email
					 * @static
					 * @param {rivet.client.linked_account.LinkedAccount.IEmail} message Email message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					Email.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.email != null && Object.hasOwnProperty.call(message, 'email'))
							writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.email);
						return writer;
					};

					/**
					 * Decodes an Email message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.linked_account.LinkedAccount.Email
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.linked_account.LinkedAccount.Email} Email
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					Email.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.linked_account.LinkedAccount.Email();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.email = reader.string();
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies an Email message.
					 * @function verify
					 * @memberof rivet.client.linked_account.LinkedAccount.Email
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					Email.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						if (message.email != null && message.hasOwnProperty('email'))
							if (!$util.isString(message.email)) return 'email: string expected';
						return null;
					};

					return Email;
				})();

				return LinkedAccount;
			})();

			return linked_account;
		})();

		client.notification = (function () {
			/**
			 * Namespace notification.
			 * @memberof rivet.client
			 * @namespace
			 */
			const notification = {};

			notification.IdentityNotification = (function () {
				/**
				 * Properties of an IdentityNotification.
				 * @memberof rivet.client.notification
				 * @interface IIdentityNotification
				 * @property {string|null} [id] IdentityNotification id
				 * @property {rivet.client.chat.IMessage|null} [chatMessage] IdentityNotification chatMessage
				 * @property {rivet.client.chat.ITopicContext|null} [topic] IdentityNotification topic
				 */

				/**
				 * Constructs a new IdentityNotification.
				 * @memberof rivet.client.notification
				 * @classdesc Represents an IdentityNotification.
				 * @implements IIdentityNotification
				 * @constructor
				 * @param {rivet.client.notification.IIdentityNotification=} [properties] Properties to set
				 */
				function IdentityNotification(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * IdentityNotification id.
				 * @member {string} id
				 * @memberof rivet.client.notification.IdentityNotification
				 * @instance
				 */
				IdentityNotification.prototype.id = '';

				/**
				 * IdentityNotification chatMessage.
				 * @member {rivet.client.chat.IMessage|null|undefined} chatMessage
				 * @memberof rivet.client.notification.IdentityNotification
				 * @instance
				 */
				IdentityNotification.prototype.chatMessage = null;

				/**
				 * IdentityNotification topic.
				 * @member {rivet.client.chat.ITopicContext|null|undefined} topic
				 * @memberof rivet.client.notification.IdentityNotification
				 * @instance
				 */
				IdentityNotification.prototype.topic = null;

				/**
				 * Creates a new IdentityNotification instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.notification.IdentityNotification
				 * @static
				 * @param {rivet.client.notification.IIdentityNotification=} [properties] Properties to set
				 * @returns {rivet.client.notification.IdentityNotification} IdentityNotification instance
				 */
				IdentityNotification.create = function create(properties) {
					return new IdentityNotification(properties);
				};

				/**
				 * Encodes the specified IdentityNotification message. Does not implicitly {@link rivet.client.notification.IdentityNotification.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.notification.IdentityNotification
				 * @static
				 * @param {rivet.client.notification.IIdentityNotification} message IdentityNotification message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				IdentityNotification.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
					if (message.chatMessage != null && Object.hasOwnProperty.call(message, 'chatMessage'))
						$root.rivet.client.chat.Message.encode(
							message.chatMessage,
							writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
						).ldelim();
					if (message.topic != null && Object.hasOwnProperty.call(message, 'topic'))
						$root.rivet.client.chat.TopicContext.encode(
							message.topic,
							writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
						).ldelim();
					return writer;
				};

				/**
				 * Decodes an IdentityNotification message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.notification.IdentityNotification
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.notification.IdentityNotification} IdentityNotification
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				IdentityNotification.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.notification.IdentityNotification();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.id = reader.string();
								break;
							case 2:
								message.chatMessage = $root.rivet.client.chat.Message.decode(
									reader,
									reader.uint32()
								);
								break;
							case 3:
								message.topic = $root.rivet.client.chat.TopicContext.decode(
									reader,
									reader.uint32()
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies an IdentityNotification message.
				 * @function verify
				 * @memberof rivet.client.notification.IdentityNotification
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				IdentityNotification.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.id != null && message.hasOwnProperty('id'))
						if (!$util.isString(message.id)) return 'id: string expected';
					if (message.chatMessage != null && message.hasOwnProperty('chatMessage')) {
						let error = $root.rivet.client.chat.Message.verify(message.chatMessage);
						if (error) return 'chatMessage.' + error;
					}
					if (message.topic != null && message.hasOwnProperty('topic')) {
						let error = $root.rivet.client.chat.TopicContext.verify(message.topic);
						if (error) return 'topic.' + error;
					}
					return null;
				};

				return IdentityNotification;
			})();

			return notification;
		})();

		client.party = (function () {
			/**
			 * Namespace party.
			 * @memberof rivet.client
			 * @namespace
			 */
			const party = {};

			party.Activity = (function () {
				/**
				 * Properties of an Activity.
				 * @memberof rivet.client.party
				 * @interface IActivity
				 * @property {rivet.client.party.Activity.IIdle|null} [idle] Activity idle
				 * @property {rivet.client.party.Activity.IMatchmakerFindingLobby|null} [matchmakerFindingLobby] Activity matchmakerFindingLobby
				 * @property {rivet.client.party.Activity.IMatchmakerLobby|null} [matchmakerLobby] Activity matchmakerLobby
				 */

				/**
				 * Constructs a new Activity.
				 * @memberof rivet.client.party
				 * @classdesc Represents an Activity.
				 * @implements IActivity
				 * @constructor
				 * @param {rivet.client.party.IActivity=} [properties] Properties to set
				 */
				function Activity(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Activity idle.
				 * @member {rivet.client.party.Activity.IIdle|null|undefined} idle
				 * @memberof rivet.client.party.Activity
				 * @instance
				 */
				Activity.prototype.idle = null;

				/**
				 * Activity matchmakerFindingLobby.
				 * @member {rivet.client.party.Activity.IMatchmakerFindingLobby|null|undefined} matchmakerFindingLobby
				 * @memberof rivet.client.party.Activity
				 * @instance
				 */
				Activity.prototype.matchmakerFindingLobby = null;

				/**
				 * Activity matchmakerLobby.
				 * @member {rivet.client.party.Activity.IMatchmakerLobby|null|undefined} matchmakerLobby
				 * @memberof rivet.client.party.Activity
				 * @instance
				 */
				Activity.prototype.matchmakerLobby = null;

				// OneOf field names bound to virtual getters and setters
				let $oneOfFields;

				/**
				 * Activity kind.
				 * @member {"idle"|"matchmakerFindingLobby"|"matchmakerLobby"|undefined} kind
				 * @memberof rivet.client.party.Activity
				 * @instance
				 */
				Object.defineProperty(Activity.prototype, 'kind', {
					get: $util.oneOfGetter(
						($oneOfFields = ['idle', 'matchmakerFindingLobby', 'matchmakerLobby'])
					),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Creates a new Activity instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.party.Activity
				 * @static
				 * @param {rivet.client.party.IActivity=} [properties] Properties to set
				 * @returns {rivet.client.party.Activity} Activity instance
				 */
				Activity.create = function create(properties) {
					return new Activity(properties);
				};

				/**
				 * Encodes the specified Activity message. Does not implicitly {@link rivet.client.party.Activity.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.party.Activity
				 * @static
				 * @param {rivet.client.party.IActivity} message Activity message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Activity.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.idle != null && Object.hasOwnProperty.call(message, 'idle'))
						$root.rivet.client.party.Activity.Idle.encode(
							message.idle,
							writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
						).ldelim();
					if (
						message.matchmakerFindingLobby != null &&
						Object.hasOwnProperty.call(message, 'matchmakerFindingLobby')
					)
						$root.rivet.client.party.Activity.MatchmakerFindingLobby.encode(
							message.matchmakerFindingLobby,
							writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
						).ldelim();
					if (
						message.matchmakerLobby != null &&
						Object.hasOwnProperty.call(message, 'matchmakerLobby')
					)
						$root.rivet.client.party.Activity.MatchmakerLobby.encode(
							message.matchmakerLobby,
							writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
						).ldelim();
					return writer;
				};

				/**
				 * Decodes an Activity message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.party.Activity
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.party.Activity} Activity
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Activity.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.party.Activity();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.idle = $root.rivet.client.party.Activity.Idle.decode(
									reader,
									reader.uint32()
								);
								break;
							case 2:
								message.matchmakerFindingLobby =
									$root.rivet.client.party.Activity.MatchmakerFindingLobby.decode(
										reader,
										reader.uint32()
									);
								break;
							case 3:
								message.matchmakerLobby =
									$root.rivet.client.party.Activity.MatchmakerLobby.decode(
										reader,
										reader.uint32()
									);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies an Activity message.
				 * @function verify
				 * @memberof rivet.client.party.Activity
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Activity.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					let properties = {};
					if (message.idle != null && message.hasOwnProperty('idle')) {
						properties.kind = 1;
						{
							let error = $root.rivet.client.party.Activity.Idle.verify(message.idle);
							if (error) return 'idle.' + error;
						}
					}
					if (
						message.matchmakerFindingLobby != null &&
						message.hasOwnProperty('matchmakerFindingLobby')
					) {
						if (properties.kind === 1) return 'kind: multiple values';
						properties.kind = 1;
						{
							let error = $root.rivet.client.party.Activity.MatchmakerFindingLobby.verify(
								message.matchmakerFindingLobby
							);
							if (error) return 'matchmakerFindingLobby.' + error;
						}
					}
					if (message.matchmakerLobby != null && message.hasOwnProperty('matchmakerLobby')) {
						if (properties.kind === 1) return 'kind: multiple values';
						properties.kind = 1;
						{
							let error = $root.rivet.client.party.Activity.MatchmakerLobby.verify(
								message.matchmakerLobby
							);
							if (error) return 'matchmakerLobby.' + error;
						}
					}
					return null;
				};

				Activity.Idle = (function () {
					/**
					 * Properties of an Idle.
					 * @memberof rivet.client.party.Activity
					 * @interface IIdle
					 */

					/**
					 * Constructs a new Idle.
					 * @memberof rivet.client.party.Activity
					 * @classdesc Represents an Idle.
					 * @implements IIdle
					 * @constructor
					 * @param {rivet.client.party.Activity.IIdle=} [properties] Properties to set
					 */
					function Idle(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * Creates a new Idle instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.party.Activity.Idle
					 * @static
					 * @param {rivet.client.party.Activity.IIdle=} [properties] Properties to set
					 * @returns {rivet.client.party.Activity.Idle} Idle instance
					 */
					Idle.create = function create(properties) {
						return new Idle(properties);
					};

					/**
					 * Encodes the specified Idle message. Does not implicitly {@link rivet.client.party.Activity.Idle.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.party.Activity.Idle
					 * @static
					 * @param {rivet.client.party.Activity.IIdle} message Idle message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					Idle.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						return writer;
					};

					/**
					 * Decodes an Idle message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.party.Activity.Idle
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.party.Activity.Idle} Idle
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					Idle.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.party.Activity.Idle();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies an Idle message.
					 * @function verify
					 * @memberof rivet.client.party.Activity.Idle
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					Idle.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						return null;
					};

					return Idle;
				})();

				Activity.MatchmakerFindingLobby = (function () {
					/**
					 * Properties of a MatchmakerFindingLobby.
					 * @memberof rivet.client.party.Activity
					 * @interface IMatchmakerFindingLobby
					 * @property {rivet.client.game.IHandle|null} [game] MatchmakerFindingLobby game
					 */

					/**
					 * Constructs a new MatchmakerFindingLobby.
					 * @memberof rivet.client.party.Activity
					 * @classdesc Represents a MatchmakerFindingLobby.
					 * @implements IMatchmakerFindingLobby
					 * @constructor
					 * @param {rivet.client.party.Activity.IMatchmakerFindingLobby=} [properties] Properties to set
					 */
					function MatchmakerFindingLobby(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * MatchmakerFindingLobby game.
					 * @member {rivet.client.game.IHandle|null|undefined} game
					 * @memberof rivet.client.party.Activity.MatchmakerFindingLobby
					 * @instance
					 */
					MatchmakerFindingLobby.prototype.game = null;

					/**
					 * Creates a new MatchmakerFindingLobby instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.party.Activity.MatchmakerFindingLobby
					 * @static
					 * @param {rivet.client.party.Activity.IMatchmakerFindingLobby=} [properties] Properties to set
					 * @returns {rivet.client.party.Activity.MatchmakerFindingLobby} MatchmakerFindingLobby instance
					 */
					MatchmakerFindingLobby.create = function create(properties) {
						return new MatchmakerFindingLobby(properties);
					};

					/**
					 * Encodes the specified MatchmakerFindingLobby message. Does not implicitly {@link rivet.client.party.Activity.MatchmakerFindingLobby.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.party.Activity.MatchmakerFindingLobby
					 * @static
					 * @param {rivet.client.party.Activity.IMatchmakerFindingLobby} message MatchmakerFindingLobby message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					MatchmakerFindingLobby.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.game != null && Object.hasOwnProperty.call(message, 'game'))
							$root.rivet.client.game.Handle.encode(
								message.game,
								writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
							).ldelim();
						return writer;
					};

					/**
					 * Decodes a MatchmakerFindingLobby message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.party.Activity.MatchmakerFindingLobby
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.party.Activity.MatchmakerFindingLobby} MatchmakerFindingLobby
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					MatchmakerFindingLobby.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.party.Activity.MatchmakerFindingLobby();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.game = $root.rivet.client.game.Handle.decode(
										reader,
										reader.uint32()
									);
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a MatchmakerFindingLobby message.
					 * @function verify
					 * @memberof rivet.client.party.Activity.MatchmakerFindingLobby
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					MatchmakerFindingLobby.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						if (message.game != null && message.hasOwnProperty('game')) {
							let error = $root.rivet.client.game.Handle.verify(message.game);
							if (error) return 'game.' + error;
						}
						return null;
					};

					return MatchmakerFindingLobby;
				})();

				Activity.MatchmakerLobby = (function () {
					/**
					 * Properties of a MatchmakerLobby.
					 * @memberof rivet.client.party.Activity
					 * @interface IMatchmakerLobby
					 * @property {rivet.client.game.IHandle|null} [game] MatchmakerLobby game
					 * @property {rivet.client.party.Activity.MatchmakerLobby.ILobby|null} [lobby] MatchmakerLobby lobby
					 */

					/**
					 * Constructs a new MatchmakerLobby.
					 * @memberof rivet.client.party.Activity
					 * @classdesc Represents a MatchmakerLobby.
					 * @implements IMatchmakerLobby
					 * @constructor
					 * @param {rivet.client.party.Activity.IMatchmakerLobby=} [properties] Properties to set
					 */
					function MatchmakerLobby(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * MatchmakerLobby game.
					 * @member {rivet.client.game.IHandle|null|undefined} game
					 * @memberof rivet.client.party.Activity.MatchmakerLobby
					 * @instance
					 */
					MatchmakerLobby.prototype.game = null;

					/**
					 * MatchmakerLobby lobby.
					 * @member {rivet.client.party.Activity.MatchmakerLobby.ILobby|null|undefined} lobby
					 * @memberof rivet.client.party.Activity.MatchmakerLobby
					 * @instance
					 */
					MatchmakerLobby.prototype.lobby = null;

					/**
					 * Creates a new MatchmakerLobby instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.party.Activity.MatchmakerLobby
					 * @static
					 * @param {rivet.client.party.Activity.IMatchmakerLobby=} [properties] Properties to set
					 * @returns {rivet.client.party.Activity.MatchmakerLobby} MatchmakerLobby instance
					 */
					MatchmakerLobby.create = function create(properties) {
						return new MatchmakerLobby(properties);
					};

					/**
					 * Encodes the specified MatchmakerLobby message. Does not implicitly {@link rivet.client.party.Activity.MatchmakerLobby.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.party.Activity.MatchmakerLobby
					 * @static
					 * @param {rivet.client.party.Activity.IMatchmakerLobby} message MatchmakerLobby message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					MatchmakerLobby.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.game != null && Object.hasOwnProperty.call(message, 'game'))
							$root.rivet.client.game.Handle.encode(
								message.game,
								writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
							).ldelim();
						if (message.lobby != null && Object.hasOwnProperty.call(message, 'lobby'))
							$root.rivet.client.party.Activity.MatchmakerLobby.Lobby.encode(
								message.lobby,
								writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
							).ldelim();
						return writer;
					};

					/**
					 * Decodes a MatchmakerLobby message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.party.Activity.MatchmakerLobby
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.party.Activity.MatchmakerLobby} MatchmakerLobby
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					MatchmakerLobby.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.party.Activity.MatchmakerLobby();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.game = $root.rivet.client.game.Handle.decode(
										reader,
										reader.uint32()
									);
									break;
								case 2:
									message.lobby =
										$root.rivet.client.party.Activity.MatchmakerLobby.Lobby.decode(
											reader,
											reader.uint32()
										);
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a MatchmakerLobby message.
					 * @function verify
					 * @memberof rivet.client.party.Activity.MatchmakerLobby
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					MatchmakerLobby.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						if (message.game != null && message.hasOwnProperty('game')) {
							let error = $root.rivet.client.game.Handle.verify(message.game);
							if (error) return 'game.' + error;
						}
						if (message.lobby != null && message.hasOwnProperty('lobby')) {
							let error = $root.rivet.client.party.Activity.MatchmakerLobby.Lobby.verify(
								message.lobby
							);
							if (error) return 'lobby.' + error;
						}
						return null;
					};

					MatchmakerLobby.Lobby = (function () {
						/**
						 * Properties of a Lobby.
						 * @memberof rivet.client.party.Activity.MatchmakerLobby
						 * @interface ILobby
						 * @property {string|null} [lobbyId] Lobby lobbyId
						 */

						/**
						 * Constructs a new Lobby.
						 * @memberof rivet.client.party.Activity.MatchmakerLobby
						 * @classdesc Represents a Lobby.
						 * @implements ILobby
						 * @constructor
						 * @param {rivet.client.party.Activity.MatchmakerLobby.ILobby=} [properties] Properties to set
						 */
						function Lobby(properties) {
							if (properties)
								for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
									if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
						}

						/**
						 * Lobby lobbyId.
						 * @member {string} lobbyId
						 * @memberof rivet.client.party.Activity.MatchmakerLobby.Lobby
						 * @instance
						 */
						Lobby.prototype.lobbyId = '';

						/**
						 * Creates a new Lobby instance using the specified properties.
						 * @function create
						 * @memberof rivet.client.party.Activity.MatchmakerLobby.Lobby
						 * @static
						 * @param {rivet.client.party.Activity.MatchmakerLobby.ILobby=} [properties] Properties to set
						 * @returns {rivet.client.party.Activity.MatchmakerLobby.Lobby} Lobby instance
						 */
						Lobby.create = function create(properties) {
							return new Lobby(properties);
						};

						/**
						 * Encodes the specified Lobby message. Does not implicitly {@link rivet.client.party.Activity.MatchmakerLobby.Lobby.verify|verify} messages.
						 * @function encode
						 * @memberof rivet.client.party.Activity.MatchmakerLobby.Lobby
						 * @static
						 * @param {rivet.client.party.Activity.MatchmakerLobby.ILobby} message Lobby message or plain object to encode
						 * @param {$protobuf.Writer} [writer] Writer to encode to
						 * @returns {$protobuf.Writer} Writer
						 */
						Lobby.encode = function encode(message, writer) {
							if (!writer) writer = $Writer.create();
							if (message.lobbyId != null && Object.hasOwnProperty.call(message, 'lobbyId'))
								writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.lobbyId);
							return writer;
						};

						/**
						 * Decodes a Lobby message from the specified reader or buffer.
						 * @function decode
						 * @memberof rivet.client.party.Activity.MatchmakerLobby.Lobby
						 * @static
						 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
						 * @param {number} [length] Message length if known beforehand
						 * @returns {rivet.client.party.Activity.MatchmakerLobby.Lobby} Lobby
						 * @throws {Error} If the payload is not a reader or valid buffer
						 * @throws {$protobuf.util.ProtocolError} If required fields are missing
						 */
						Lobby.decode = function decode(reader, length) {
							if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
							let end = length === undefined ? reader.len : reader.pos + length,
								message = new $root.rivet.client.party.Activity.MatchmakerLobby.Lobby();
							while (reader.pos < end) {
								let tag = reader.uint32();
								switch (tag >>> 3) {
									case 1:
										message.lobbyId = reader.string();
										break;
									default:
										reader.skipType(tag & 7);
										break;
								}
							}
							return message;
						};

						/**
						 * Verifies a Lobby message.
						 * @function verify
						 * @memberof rivet.client.party.Activity.MatchmakerLobby.Lobby
						 * @static
						 * @param {Object.<string,*>} message Plain object to verify
						 * @returns {string|null} `null` if valid, otherwise the reason why it is not
						 */
						Lobby.verify = function verify(message) {
							if (typeof message !== 'object' || message === null) return 'object expected';
							if (message.lobbyId != null && message.hasOwnProperty('lobbyId'))
								if (!$util.isString(message.lobbyId)) return 'lobbyId: string expected';
							return null;
						};

						return Lobby;
					})();

					return MatchmakerLobby;
				})();

				return Activity;
			})();

			party.ExternalLinks = (function () {
				/**
				 * Properties of an ExternalLinks.
				 * @memberof rivet.client.party
				 * @interface IExternalLinks
				 * @property {string|null} [chat] ExternalLinks chat
				 */

				/**
				 * Constructs a new ExternalLinks.
				 * @memberof rivet.client.party
				 * @classdesc Represents an ExternalLinks.
				 * @implements IExternalLinks
				 * @constructor
				 * @param {rivet.client.party.IExternalLinks=} [properties] Properties to set
				 */
				function ExternalLinks(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * ExternalLinks chat.
				 * @member {string} chat
				 * @memberof rivet.client.party.ExternalLinks
				 * @instance
				 */
				ExternalLinks.prototype.chat = '';

				/**
				 * Creates a new ExternalLinks instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.party.ExternalLinks
				 * @static
				 * @param {rivet.client.party.IExternalLinks=} [properties] Properties to set
				 * @returns {rivet.client.party.ExternalLinks} ExternalLinks instance
				 */
				ExternalLinks.create = function create(properties) {
					return new ExternalLinks(properties);
				};

				/**
				 * Encodes the specified ExternalLinks message. Does not implicitly {@link rivet.client.party.ExternalLinks.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.party.ExternalLinks
				 * @static
				 * @param {rivet.client.party.IExternalLinks} message ExternalLinks message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				ExternalLinks.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.chat != null && Object.hasOwnProperty.call(message, 'chat'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.chat);
					return writer;
				};

				/**
				 * Decodes an ExternalLinks message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.party.ExternalLinks
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.party.ExternalLinks} ExternalLinks
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				ExternalLinks.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.party.ExternalLinks();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.chat = reader.string();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies an ExternalLinks message.
				 * @function verify
				 * @memberof rivet.client.party.ExternalLinks
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				ExternalLinks.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.chat != null && message.hasOwnProperty('chat'))
						if (!$util.isString(message.chat)) return 'chat: string expected';
					return null;
				};

				return ExternalLinks;
			})();

			party.InviteExternalLinks = (function () {
				/**
				 * Properties of an InviteExternalLinks.
				 * @memberof rivet.client.party
				 * @interface IInviteExternalLinks
				 * @property {string|null} [invite] InviteExternalLinks invite
				 */

				/**
				 * Constructs a new InviteExternalLinks.
				 * @memberof rivet.client.party
				 * @classdesc Represents an InviteExternalLinks.
				 * @implements IInviteExternalLinks
				 * @constructor
				 * @param {rivet.client.party.IInviteExternalLinks=} [properties] Properties to set
				 */
				function InviteExternalLinks(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * InviteExternalLinks invite.
				 * @member {string} invite
				 * @memberof rivet.client.party.InviteExternalLinks
				 * @instance
				 */
				InviteExternalLinks.prototype.invite = '';

				/**
				 * Creates a new InviteExternalLinks instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.party.InviteExternalLinks
				 * @static
				 * @param {rivet.client.party.IInviteExternalLinks=} [properties] Properties to set
				 * @returns {rivet.client.party.InviteExternalLinks} InviteExternalLinks instance
				 */
				InviteExternalLinks.create = function create(properties) {
					return new InviteExternalLinks(properties);
				};

				/**
				 * Encodes the specified InviteExternalLinks message. Does not implicitly {@link rivet.client.party.InviteExternalLinks.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.party.InviteExternalLinks
				 * @static
				 * @param {rivet.client.party.IInviteExternalLinks} message InviteExternalLinks message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				InviteExternalLinks.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.invite != null && Object.hasOwnProperty.call(message, 'invite'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.invite);
					return writer;
				};

				/**
				 * Decodes an InviteExternalLinks message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.party.InviteExternalLinks
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.party.InviteExternalLinks} InviteExternalLinks
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				InviteExternalLinks.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.party.InviteExternalLinks();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.invite = reader.string();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies an InviteExternalLinks message.
				 * @function verify
				 * @memberof rivet.client.party.InviteExternalLinks
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				InviteExternalLinks.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.invite != null && message.hasOwnProperty('invite'))
						if (!$util.isString(message.invite)) return 'invite: string expected';
					return null;
				};

				return InviteExternalLinks;
			})();

			party.Handle = (function () {
				/**
				 * Properties of a Handle.
				 * @memberof rivet.client.party
				 * @interface IHandle
				 * @property {string|null} [id] Handle id
				 * @property {number|Long|null} [createTs] Handle createTs
				 * @property {rivet.client.party.IActivity|null} [activity] Handle activity
				 * @property {rivet.client.party.IExternalLinks|null} [external] Handle external
				 */

				/**
				 * Constructs a new Handle.
				 * @memberof rivet.client.party
				 * @classdesc Represents a Handle.
				 * @implements IHandle
				 * @constructor
				 * @param {rivet.client.party.IHandle=} [properties] Properties to set
				 */
				function Handle(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Handle id.
				 * @member {string} id
				 * @memberof rivet.client.party.Handle
				 * @instance
				 */
				Handle.prototype.id = '';

				/**
				 * Handle createTs.
				 * @member {number|Long} createTs
				 * @memberof rivet.client.party.Handle
				 * @instance
				 */
				Handle.prototype.createTs = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

				/**
				 * Handle activity.
				 * @member {rivet.client.party.IActivity|null|undefined} activity
				 * @memberof rivet.client.party.Handle
				 * @instance
				 */
				Handle.prototype.activity = null;

				/**
				 * Handle external.
				 * @member {rivet.client.party.IExternalLinks|null|undefined} external
				 * @memberof rivet.client.party.Handle
				 * @instance
				 */
				Handle.prototype.external = null;

				/**
				 * Creates a new Handle instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.party.Handle
				 * @static
				 * @param {rivet.client.party.IHandle=} [properties] Properties to set
				 * @returns {rivet.client.party.Handle} Handle instance
				 */
				Handle.create = function create(properties) {
					return new Handle(properties);
				};

				/**
				 * Encodes the specified Handle message. Does not implicitly {@link rivet.client.party.Handle.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.party.Handle
				 * @static
				 * @param {rivet.client.party.IHandle} message Handle message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Handle.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
					if (message.createTs != null && Object.hasOwnProperty.call(message, 'createTs'))
						writer.uint32(/* id 2, wireType 0 =*/ 16).uint64(message.createTs);
					if (message.activity != null && Object.hasOwnProperty.call(message, 'activity'))
						$root.rivet.client.party.Activity.encode(
							message.activity,
							writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
						).ldelim();
					if (message.external != null && Object.hasOwnProperty.call(message, 'external'))
						$root.rivet.client.party.ExternalLinks.encode(
							message.external,
							writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
						).ldelim();
					return writer;
				};

				/**
				 * Decodes a Handle message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.party.Handle
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.party.Handle} Handle
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Handle.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.party.Handle();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.id = reader.string();
								break;
							case 2:
								message.createTs = reader.uint64();
								break;
							case 3:
								message.activity = $root.rivet.client.party.Activity.decode(
									reader,
									reader.uint32()
								);
								break;
							case 4:
								message.external = $root.rivet.client.party.ExternalLinks.decode(
									reader,
									reader.uint32()
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Handle message.
				 * @function verify
				 * @memberof rivet.client.party.Handle
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Handle.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.id != null && message.hasOwnProperty('id'))
						if (!$util.isString(message.id)) return 'id: string expected';
					if (message.createTs != null && message.hasOwnProperty('createTs'))
						if (
							!$util.isInteger(message.createTs) &&
							!(
								message.createTs &&
								$util.isInteger(message.createTs.low) &&
								$util.isInteger(message.createTs.high)
							)
						)
							return 'createTs: integer|Long expected';
					if (message.activity != null && message.hasOwnProperty('activity')) {
						let error = $root.rivet.client.party.Activity.verify(message.activity);
						if (error) return 'activity.' + error;
					}
					if (message.external != null && message.hasOwnProperty('external')) {
						let error = $root.rivet.client.party.ExternalLinks.verify(message.external);
						if (error) return 'external.' + error;
					}
					return null;
				};

				return Handle;
			})();

			party.Invite = (function () {
				/**
				 * Properties of an Invite.
				 * @memberof rivet.client.party
				 * @interface IInvite
				 * @property {string|null} [inviteId] Invite inviteId
				 * @property {number|Long|null} [createTs] Invite createTs
				 * @property {string|null} [token] Invite token
				 * @property {rivet.client.party.Invite.IAlias|null} [alias] Invite alias
				 * @property {rivet.client.party.IInviteExternalLinks|null} [external] Invite external
				 */

				/**
				 * Constructs a new Invite.
				 * @memberof rivet.client.party
				 * @classdesc Represents an Invite.
				 * @implements IInvite
				 * @constructor
				 * @param {rivet.client.party.IInvite=} [properties] Properties to set
				 */
				function Invite(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Invite inviteId.
				 * @member {string} inviteId
				 * @memberof rivet.client.party.Invite
				 * @instance
				 */
				Invite.prototype.inviteId = '';

				/**
				 * Invite createTs.
				 * @member {number|Long} createTs
				 * @memberof rivet.client.party.Invite
				 * @instance
				 */
				Invite.prototype.createTs = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

				/**
				 * Invite token.
				 * @member {string} token
				 * @memberof rivet.client.party.Invite
				 * @instance
				 */
				Invite.prototype.token = '';

				/**
				 * Invite alias.
				 * @member {rivet.client.party.Invite.IAlias|null|undefined} alias
				 * @memberof rivet.client.party.Invite
				 * @instance
				 */
				Invite.prototype.alias = null;

				/**
				 * Invite external.
				 * @member {rivet.client.party.IInviteExternalLinks|null|undefined} external
				 * @memberof rivet.client.party.Invite
				 * @instance
				 */
				Invite.prototype.external = null;

				// OneOf field names bound to virtual getters and setters
				let $oneOfFields;

				/**
				 * Invite _alias.
				 * @member {"alias"|undefined} _alias
				 * @memberof rivet.client.party.Invite
				 * @instance
				 */
				Object.defineProperty(Invite.prototype, '_alias', {
					get: $util.oneOfGetter(($oneOfFields = ['alias'])),
					set: $util.oneOfSetter($oneOfFields)
				});

				/**
				 * Creates a new Invite instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.party.Invite
				 * @static
				 * @param {rivet.client.party.IInvite=} [properties] Properties to set
				 * @returns {rivet.client.party.Invite} Invite instance
				 */
				Invite.create = function create(properties) {
					return new Invite(properties);
				};

				/**
				 * Encodes the specified Invite message. Does not implicitly {@link rivet.client.party.Invite.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.party.Invite
				 * @static
				 * @param {rivet.client.party.IInvite} message Invite message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Invite.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.inviteId != null && Object.hasOwnProperty.call(message, 'inviteId'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.inviteId);
					if (message.createTs != null && Object.hasOwnProperty.call(message, 'createTs'))
						writer.uint32(/* id 2, wireType 0 =*/ 16).uint64(message.createTs);
					if (message.token != null && Object.hasOwnProperty.call(message, 'token'))
						writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.token);
					if (message.alias != null && Object.hasOwnProperty.call(message, 'alias'))
						$root.rivet.client.party.Invite.Alias.encode(
							message.alias,
							writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
						).ldelim();
					if (message.external != null && Object.hasOwnProperty.call(message, 'external'))
						$root.rivet.client.party.InviteExternalLinks.encode(
							message.external,
							writer.uint32(/* id 5, wireType 2 =*/ 42).fork()
						).ldelim();
					return writer;
				};

				/**
				 * Decodes an Invite message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.party.Invite
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.party.Invite} Invite
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Invite.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.party.Invite();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.inviteId = reader.string();
								break;
							case 2:
								message.createTs = reader.uint64();
								break;
							case 3:
								message.token = reader.string();
								break;
							case 4:
								message.alias = $root.rivet.client.party.Invite.Alias.decode(
									reader,
									reader.uint32()
								);
								break;
							case 5:
								message.external = $root.rivet.client.party.InviteExternalLinks.decode(
									reader,
									reader.uint32()
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies an Invite message.
				 * @function verify
				 * @memberof rivet.client.party.Invite
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Invite.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					let properties = {};
					if (message.inviteId != null && message.hasOwnProperty('inviteId'))
						if (!$util.isString(message.inviteId)) return 'inviteId: string expected';
					if (message.createTs != null && message.hasOwnProperty('createTs'))
						if (
							!$util.isInteger(message.createTs) &&
							!(
								message.createTs &&
								$util.isInteger(message.createTs.low) &&
								$util.isInteger(message.createTs.high)
							)
						)
							return 'createTs: integer|Long expected';
					if (message.token != null && message.hasOwnProperty('token'))
						if (!$util.isString(message.token)) return 'token: string expected';
					if (message.alias != null && message.hasOwnProperty('alias')) {
						properties._alias = 1;
						{
							let error = $root.rivet.client.party.Invite.Alias.verify(message.alias);
							if (error) return 'alias.' + error;
						}
					}
					if (message.external != null && message.hasOwnProperty('external')) {
						let error = $root.rivet.client.party.InviteExternalLinks.verify(message.external);
						if (error) return 'external.' + error;
					}
					return null;
				};

				Invite.Alias = (function () {
					/**
					 * Properties of an Alias.
					 * @memberof rivet.client.party.Invite
					 * @interface IAlias
					 * @property {string|null} [namespaceId] Alias namespaceId
					 * @property {string|null} [alias] Alias alias
					 */

					/**
					 * Constructs a new Alias.
					 * @memberof rivet.client.party.Invite
					 * @classdesc Represents an Alias.
					 * @implements IAlias
					 * @constructor
					 * @param {rivet.client.party.Invite.IAlias=} [properties] Properties to set
					 */
					function Alias(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * Alias namespaceId.
					 * @member {string} namespaceId
					 * @memberof rivet.client.party.Invite.Alias
					 * @instance
					 */
					Alias.prototype.namespaceId = '';

					/**
					 * Alias alias.
					 * @member {string} alias
					 * @memberof rivet.client.party.Invite.Alias
					 * @instance
					 */
					Alias.prototype.alias = '';

					/**
					 * Creates a new Alias instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.party.Invite.Alias
					 * @static
					 * @param {rivet.client.party.Invite.IAlias=} [properties] Properties to set
					 * @returns {rivet.client.party.Invite.Alias} Alias instance
					 */
					Alias.create = function create(properties) {
						return new Alias(properties);
					};

					/**
					 * Encodes the specified Alias message. Does not implicitly {@link rivet.client.party.Invite.Alias.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.party.Invite.Alias
					 * @static
					 * @param {rivet.client.party.Invite.IAlias} message Alias message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					Alias.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.namespaceId != null && Object.hasOwnProperty.call(message, 'namespaceId'))
							writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.namespaceId);
						if (message.alias != null && Object.hasOwnProperty.call(message, 'alias'))
							writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.alias);
						return writer;
					};

					/**
					 * Decodes an Alias message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.party.Invite.Alias
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.party.Invite.Alias} Alias
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					Alias.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.party.Invite.Alias();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.namespaceId = reader.string();
									break;
								case 2:
									message.alias = reader.string();
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies an Alias message.
					 * @function verify
					 * @memberof rivet.client.party.Invite.Alias
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					Alias.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						if (message.namespaceId != null && message.hasOwnProperty('namespaceId'))
							if (!$util.isString(message.namespaceId)) return 'namespaceId: string expected';
						if (message.alias != null && message.hasOwnProperty('alias'))
							if (!$util.isString(message.alias)) return 'alias: string expected';
						return null;
					};

					return Alias;
				})();

				return Invite;
			})();

			party.Member = (function () {
				/**
				 * Properties of a Member.
				 * @memberof rivet.client.party
				 * @interface IMember
				 * @property {rivet.client.identity.IHandle|null} [identity] Member identity
				 * @property {boolean|null} [isLeader] Member isLeader
				 * @property {number|Long|null} [joinTs] Member joinTs
				 * @property {rivet.client.party.Member.IState|null} [state] Member state
				 */

				/**
				 * Constructs a new Member.
				 * @memberof rivet.client.party
				 * @classdesc Represents a Member.
				 * @implements IMember
				 * @constructor
				 * @param {rivet.client.party.IMember=} [properties] Properties to set
				 */
				function Member(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Member identity.
				 * @member {rivet.client.identity.IHandle|null|undefined} identity
				 * @memberof rivet.client.party.Member
				 * @instance
				 */
				Member.prototype.identity = null;

				/**
				 * Member isLeader.
				 * @member {boolean} isLeader
				 * @memberof rivet.client.party.Member
				 * @instance
				 */
				Member.prototype.isLeader = false;

				/**
				 * Member joinTs.
				 * @member {number|Long} joinTs
				 * @memberof rivet.client.party.Member
				 * @instance
				 */
				Member.prototype.joinTs = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

				/**
				 * Member state.
				 * @member {rivet.client.party.Member.IState|null|undefined} state
				 * @memberof rivet.client.party.Member
				 * @instance
				 */
				Member.prototype.state = null;

				/**
				 * Creates a new Member instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.party.Member
				 * @static
				 * @param {rivet.client.party.IMember=} [properties] Properties to set
				 * @returns {rivet.client.party.Member} Member instance
				 */
				Member.create = function create(properties) {
					return new Member(properties);
				};

				/**
				 * Encodes the specified Member message. Does not implicitly {@link rivet.client.party.Member.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.party.Member
				 * @static
				 * @param {rivet.client.party.IMember} message Member message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Member.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.identity != null && Object.hasOwnProperty.call(message, 'identity'))
						$root.rivet.client.identity.Handle.encode(
							message.identity,
							writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
						).ldelim();
					if (message.isLeader != null && Object.hasOwnProperty.call(message, 'isLeader'))
						writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.isLeader);
					if (message.joinTs != null && Object.hasOwnProperty.call(message, 'joinTs'))
						writer.uint32(/* id 3, wireType 0 =*/ 24).uint64(message.joinTs);
					if (message.state != null && Object.hasOwnProperty.call(message, 'state'))
						$root.rivet.client.party.Member.State.encode(
							message.state,
							writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
						).ldelim();
					return writer;
				};

				/**
				 * Decodes a Member message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.party.Member
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.party.Member} Member
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Member.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.party.Member();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.identity = $root.rivet.client.identity.Handle.decode(
									reader,
									reader.uint32()
								);
								break;
							case 2:
								message.isLeader = reader.bool();
								break;
							case 3:
								message.joinTs = reader.uint64();
								break;
							case 4:
								message.state = $root.rivet.client.party.Member.State.decode(
									reader,
									reader.uint32()
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Member message.
				 * @function verify
				 * @memberof rivet.client.party.Member
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Member.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.identity != null && message.hasOwnProperty('identity')) {
						let error = $root.rivet.client.identity.Handle.verify(message.identity);
						if (error) return 'identity.' + error;
					}
					if (message.isLeader != null && message.hasOwnProperty('isLeader'))
						if (typeof message.isLeader !== 'boolean') return 'isLeader: boolean expected';
					if (message.joinTs != null && message.hasOwnProperty('joinTs'))
						if (
							!$util.isInteger(message.joinTs) &&
							!(
								message.joinTs &&
								$util.isInteger(message.joinTs.low) &&
								$util.isInteger(message.joinTs.high)
							)
						)
							return 'joinTs: integer|Long expected';
					if (message.state != null && message.hasOwnProperty('state')) {
						let error = $root.rivet.client.party.Member.State.verify(message.state);
						if (error) return 'state.' + error;
					}
					return null;
				};

				Member.State = (function () {
					/**
					 * Properties of a State.
					 * @memberof rivet.client.party.Member
					 * @interface IState
					 * @property {rivet.client.party.Member.State.IIdle|null} [idle] State idle
					 * @property {rivet.client.party.Member.State.IMatchmakerPending|null} [matchmakerPending] State matchmakerPending
					 * @property {rivet.client.party.Member.State.IMatchmakerFindingLobby|null} [matchmakerFindingLobby] State matchmakerFindingLobby
					 * @property {rivet.client.party.Member.State.IMatchmakerLobby|null} [matchmakerLobby] State matchmakerLobby
					 */

					/**
					 * Constructs a new State.
					 * @memberof rivet.client.party.Member
					 * @classdesc Represents a State.
					 * @implements IState
					 * @constructor
					 * @param {rivet.client.party.Member.IState=} [properties] Properties to set
					 */
					function State(properties) {
						if (properties)
							for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
								if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
					}

					/**
					 * State idle.
					 * @member {rivet.client.party.Member.State.IIdle|null|undefined} idle
					 * @memberof rivet.client.party.Member.State
					 * @instance
					 */
					State.prototype.idle = null;

					/**
					 * State matchmakerPending.
					 * @member {rivet.client.party.Member.State.IMatchmakerPending|null|undefined} matchmakerPending
					 * @memberof rivet.client.party.Member.State
					 * @instance
					 */
					State.prototype.matchmakerPending = null;

					/**
					 * State matchmakerFindingLobby.
					 * @member {rivet.client.party.Member.State.IMatchmakerFindingLobby|null|undefined} matchmakerFindingLobby
					 * @memberof rivet.client.party.Member.State
					 * @instance
					 */
					State.prototype.matchmakerFindingLobby = null;

					/**
					 * State matchmakerLobby.
					 * @member {rivet.client.party.Member.State.IMatchmakerLobby|null|undefined} matchmakerLobby
					 * @memberof rivet.client.party.Member.State
					 * @instance
					 */
					State.prototype.matchmakerLobby = null;

					// OneOf field names bound to virtual getters and setters
					let $oneOfFields;

					/**
					 * State kind.
					 * @member {"idle"|"matchmakerPending"|"matchmakerFindingLobby"|"matchmakerLobby"|undefined} kind
					 * @memberof rivet.client.party.Member.State
					 * @instance
					 */
					Object.defineProperty(State.prototype, 'kind', {
						get: $util.oneOfGetter(
							($oneOfFields = [
								'idle',
								'matchmakerPending',
								'matchmakerFindingLobby',
								'matchmakerLobby'
							])
						),
						set: $util.oneOfSetter($oneOfFields)
					});

					/**
					 * Creates a new State instance using the specified properties.
					 * @function create
					 * @memberof rivet.client.party.Member.State
					 * @static
					 * @param {rivet.client.party.Member.IState=} [properties] Properties to set
					 * @returns {rivet.client.party.Member.State} State instance
					 */
					State.create = function create(properties) {
						return new State(properties);
					};

					/**
					 * Encodes the specified State message. Does not implicitly {@link rivet.client.party.Member.State.verify|verify} messages.
					 * @function encode
					 * @memberof rivet.client.party.Member.State
					 * @static
					 * @param {rivet.client.party.Member.IState} message State message or plain object to encode
					 * @param {$protobuf.Writer} [writer] Writer to encode to
					 * @returns {$protobuf.Writer} Writer
					 */
					State.encode = function encode(message, writer) {
						if (!writer) writer = $Writer.create();
						if (message.idle != null && Object.hasOwnProperty.call(message, 'idle'))
							$root.rivet.client.party.Member.State.Idle.encode(
								message.idle,
								writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
							).ldelim();
						if (
							message.matchmakerPending != null &&
							Object.hasOwnProperty.call(message, 'matchmakerPending')
						)
							$root.rivet.client.party.Member.State.MatchmakerPending.encode(
								message.matchmakerPending,
								writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
							).ldelim();
						if (
							message.matchmakerFindingLobby != null &&
							Object.hasOwnProperty.call(message, 'matchmakerFindingLobby')
						)
							$root.rivet.client.party.Member.State.MatchmakerFindingLobby.encode(
								message.matchmakerFindingLobby,
								writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
							).ldelim();
						if (
							message.matchmakerLobby != null &&
							Object.hasOwnProperty.call(message, 'matchmakerLobby')
						)
							$root.rivet.client.party.Member.State.MatchmakerLobby.encode(
								message.matchmakerLobby,
								writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
							).ldelim();
						return writer;
					};

					/**
					 * Decodes a State message from the specified reader or buffer.
					 * @function decode
					 * @memberof rivet.client.party.Member.State
					 * @static
					 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
					 * @param {number} [length] Message length if known beforehand
					 * @returns {rivet.client.party.Member.State} State
					 * @throws {Error} If the payload is not a reader or valid buffer
					 * @throws {$protobuf.util.ProtocolError} If required fields are missing
					 */
					State.decode = function decode(reader, length) {
						if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
						let end = length === undefined ? reader.len : reader.pos + length,
							message = new $root.rivet.client.party.Member.State();
						while (reader.pos < end) {
							let tag = reader.uint32();
							switch (tag >>> 3) {
								case 1:
									message.idle = $root.rivet.client.party.Member.State.Idle.decode(
										reader,
										reader.uint32()
									);
									break;
								case 2:
									message.matchmakerPending =
										$root.rivet.client.party.Member.State.MatchmakerPending.decode(
											reader,
											reader.uint32()
										);
									break;
								case 3:
									message.matchmakerFindingLobby =
										$root.rivet.client.party.Member.State.MatchmakerFindingLobby.decode(
											reader,
											reader.uint32()
										);
									break;
								case 4:
									message.matchmakerLobby =
										$root.rivet.client.party.Member.State.MatchmakerLobby.decode(
											reader,
											reader.uint32()
										);
									break;
								default:
									reader.skipType(tag & 7);
									break;
							}
						}
						return message;
					};

					/**
					 * Verifies a State message.
					 * @function verify
					 * @memberof rivet.client.party.Member.State
					 * @static
					 * @param {Object.<string,*>} message Plain object to verify
					 * @returns {string|null} `null` if valid, otherwise the reason why it is not
					 */
					State.verify = function verify(message) {
						if (typeof message !== 'object' || message === null) return 'object expected';
						let properties = {};
						if (message.idle != null && message.hasOwnProperty('idle')) {
							properties.kind = 1;
							{
								let error = $root.rivet.client.party.Member.State.Idle.verify(message.idle);
								if (error) return 'idle.' + error;
							}
						}
						if (
							message.matchmakerPending != null &&
							message.hasOwnProperty('matchmakerPending')
						) {
							if (properties.kind === 1) return 'kind: multiple values';
							properties.kind = 1;
							{
								let error = $root.rivet.client.party.Member.State.MatchmakerPending.verify(
									message.matchmakerPending
								);
								if (error) return 'matchmakerPending.' + error;
							}
						}
						if (
							message.matchmakerFindingLobby != null &&
							message.hasOwnProperty('matchmakerFindingLobby')
						) {
							if (properties.kind === 1) return 'kind: multiple values';
							properties.kind = 1;
							{
								let error =
									$root.rivet.client.party.Member.State.MatchmakerFindingLobby.verify(
										message.matchmakerFindingLobby
									);
								if (error) return 'matchmakerFindingLobby.' + error;
							}
						}
						if (message.matchmakerLobby != null && message.hasOwnProperty('matchmakerLobby')) {
							if (properties.kind === 1) return 'kind: multiple values';
							properties.kind = 1;
							{
								let error = $root.rivet.client.party.Member.State.MatchmakerLobby.verify(
									message.matchmakerLobby
								);
								if (error) return 'matchmakerLobby.' + error;
							}
						}
						return null;
					};

					State.Idle = (function () {
						/**
						 * Properties of an Idle.
						 * @memberof rivet.client.party.Member.State
						 * @interface IIdle
						 */

						/**
						 * Constructs a new Idle.
						 * @memberof rivet.client.party.Member.State
						 * @classdesc Represents an Idle.
						 * @implements IIdle
						 * @constructor
						 * @param {rivet.client.party.Member.State.IIdle=} [properties] Properties to set
						 */
						function Idle(properties) {
							if (properties)
								for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
									if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
						}

						/**
						 * Creates a new Idle instance using the specified properties.
						 * @function create
						 * @memberof rivet.client.party.Member.State.Idle
						 * @static
						 * @param {rivet.client.party.Member.State.IIdle=} [properties] Properties to set
						 * @returns {rivet.client.party.Member.State.Idle} Idle instance
						 */
						Idle.create = function create(properties) {
							return new Idle(properties);
						};

						/**
						 * Encodes the specified Idle message. Does not implicitly {@link rivet.client.party.Member.State.Idle.verify|verify} messages.
						 * @function encode
						 * @memberof rivet.client.party.Member.State.Idle
						 * @static
						 * @param {rivet.client.party.Member.State.IIdle} message Idle message or plain object to encode
						 * @param {$protobuf.Writer} [writer] Writer to encode to
						 * @returns {$protobuf.Writer} Writer
						 */
						Idle.encode = function encode(message, writer) {
							if (!writer) writer = $Writer.create();
							return writer;
						};

						/**
						 * Decodes an Idle message from the specified reader or buffer.
						 * @function decode
						 * @memberof rivet.client.party.Member.State.Idle
						 * @static
						 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
						 * @param {number} [length] Message length if known beforehand
						 * @returns {rivet.client.party.Member.State.Idle} Idle
						 * @throws {Error} If the payload is not a reader or valid buffer
						 * @throws {$protobuf.util.ProtocolError} If required fields are missing
						 */
						Idle.decode = function decode(reader, length) {
							if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
							let end = length === undefined ? reader.len : reader.pos + length,
								message = new $root.rivet.client.party.Member.State.Idle();
							while (reader.pos < end) {
								let tag = reader.uint32();
								switch (tag >>> 3) {
									default:
										reader.skipType(tag & 7);
										break;
								}
							}
							return message;
						};

						/**
						 * Verifies an Idle message.
						 * @function verify
						 * @memberof rivet.client.party.Member.State.Idle
						 * @static
						 * @param {Object.<string,*>} message Plain object to verify
						 * @returns {string|null} `null` if valid, otherwise the reason why it is not
						 */
						Idle.verify = function verify(message) {
							if (typeof message !== 'object' || message === null) return 'object expected';
							return null;
						};

						return Idle;
					})();

					State.MatchmakerPending = (function () {
						/**
						 * Properties of a MatchmakerPending.
						 * @memberof rivet.client.party.Member.State
						 * @interface IMatchmakerPending
						 */

						/**
						 * Constructs a new MatchmakerPending.
						 * @memberof rivet.client.party.Member.State
						 * @classdesc Represents a MatchmakerPending.
						 * @implements IMatchmakerPending
						 * @constructor
						 * @param {rivet.client.party.Member.State.IMatchmakerPending=} [properties] Properties to set
						 */
						function MatchmakerPending(properties) {
							if (properties)
								for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
									if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
						}

						/**
						 * Creates a new MatchmakerPending instance using the specified properties.
						 * @function create
						 * @memberof rivet.client.party.Member.State.MatchmakerPending
						 * @static
						 * @param {rivet.client.party.Member.State.IMatchmakerPending=} [properties] Properties to set
						 * @returns {rivet.client.party.Member.State.MatchmakerPending} MatchmakerPending instance
						 */
						MatchmakerPending.create = function create(properties) {
							return new MatchmakerPending(properties);
						};

						/**
						 * Encodes the specified MatchmakerPending message. Does not implicitly {@link rivet.client.party.Member.State.MatchmakerPending.verify|verify} messages.
						 * @function encode
						 * @memberof rivet.client.party.Member.State.MatchmakerPending
						 * @static
						 * @param {rivet.client.party.Member.State.IMatchmakerPending} message MatchmakerPending message or plain object to encode
						 * @param {$protobuf.Writer} [writer] Writer to encode to
						 * @returns {$protobuf.Writer} Writer
						 */
						MatchmakerPending.encode = function encode(message, writer) {
							if (!writer) writer = $Writer.create();
							return writer;
						};

						/**
						 * Decodes a MatchmakerPending message from the specified reader or buffer.
						 * @function decode
						 * @memberof rivet.client.party.Member.State.MatchmakerPending
						 * @static
						 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
						 * @param {number} [length] Message length if known beforehand
						 * @returns {rivet.client.party.Member.State.MatchmakerPending} MatchmakerPending
						 * @throws {Error} If the payload is not a reader or valid buffer
						 * @throws {$protobuf.util.ProtocolError} If required fields are missing
						 */
						MatchmakerPending.decode = function decode(reader, length) {
							if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
							let end = length === undefined ? reader.len : reader.pos + length,
								message = new $root.rivet.client.party.Member.State.MatchmakerPending();
							while (reader.pos < end) {
								let tag = reader.uint32();
								switch (tag >>> 3) {
									default:
										reader.skipType(tag & 7);
										break;
								}
							}
							return message;
						};

						/**
						 * Verifies a MatchmakerPending message.
						 * @function verify
						 * @memberof rivet.client.party.Member.State.MatchmakerPending
						 * @static
						 * @param {Object.<string,*>} message Plain object to verify
						 * @returns {string|null} `null` if valid, otherwise the reason why it is not
						 */
						MatchmakerPending.verify = function verify(message) {
							if (typeof message !== 'object' || message === null) return 'object expected';
							return null;
						};

						return MatchmakerPending;
					})();

					State.MatchmakerFindingLobby = (function () {
						/**
						 * Properties of a MatchmakerFindingLobby.
						 * @memberof rivet.client.party.Member.State
						 * @interface IMatchmakerFindingLobby
						 */

						/**
						 * Constructs a new MatchmakerFindingLobby.
						 * @memberof rivet.client.party.Member.State
						 * @classdesc Represents a MatchmakerFindingLobby.
						 * @implements IMatchmakerFindingLobby
						 * @constructor
						 * @param {rivet.client.party.Member.State.IMatchmakerFindingLobby=} [properties] Properties to set
						 */
						function MatchmakerFindingLobby(properties) {
							if (properties)
								for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
									if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
						}

						/**
						 * Creates a new MatchmakerFindingLobby instance using the specified properties.
						 * @function create
						 * @memberof rivet.client.party.Member.State.MatchmakerFindingLobby
						 * @static
						 * @param {rivet.client.party.Member.State.IMatchmakerFindingLobby=} [properties] Properties to set
						 * @returns {rivet.client.party.Member.State.MatchmakerFindingLobby} MatchmakerFindingLobby instance
						 */
						MatchmakerFindingLobby.create = function create(properties) {
							return new MatchmakerFindingLobby(properties);
						};

						/**
						 * Encodes the specified MatchmakerFindingLobby message. Does not implicitly {@link rivet.client.party.Member.State.MatchmakerFindingLobby.verify|verify} messages.
						 * @function encode
						 * @memberof rivet.client.party.Member.State.MatchmakerFindingLobby
						 * @static
						 * @param {rivet.client.party.Member.State.IMatchmakerFindingLobby} message MatchmakerFindingLobby message or plain object to encode
						 * @param {$protobuf.Writer} [writer] Writer to encode to
						 * @returns {$protobuf.Writer} Writer
						 */
						MatchmakerFindingLobby.encode = function encode(message, writer) {
							if (!writer) writer = $Writer.create();
							return writer;
						};

						/**
						 * Decodes a MatchmakerFindingLobby message from the specified reader or buffer.
						 * @function decode
						 * @memberof rivet.client.party.Member.State.MatchmakerFindingLobby
						 * @static
						 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
						 * @param {number} [length] Message length if known beforehand
						 * @returns {rivet.client.party.Member.State.MatchmakerFindingLobby} MatchmakerFindingLobby
						 * @throws {Error} If the payload is not a reader or valid buffer
						 * @throws {$protobuf.util.ProtocolError} If required fields are missing
						 */
						MatchmakerFindingLobby.decode = function decode(reader, length) {
							if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
							let end = length === undefined ? reader.len : reader.pos + length,
								message = new $root.rivet.client.party.Member.State.MatchmakerFindingLobby();
							while (reader.pos < end) {
								let tag = reader.uint32();
								switch (tag >>> 3) {
									default:
										reader.skipType(tag & 7);
										break;
								}
							}
							return message;
						};

						/**
						 * Verifies a MatchmakerFindingLobby message.
						 * @function verify
						 * @memberof rivet.client.party.Member.State.MatchmakerFindingLobby
						 * @static
						 * @param {Object.<string,*>} message Plain object to verify
						 * @returns {string|null} `null` if valid, otherwise the reason why it is not
						 */
						MatchmakerFindingLobby.verify = function verify(message) {
							if (typeof message !== 'object' || message === null) return 'object expected';
							return null;
						};

						return MatchmakerFindingLobby;
					})();

					State.MatchmakerLobby = (function () {
						/**
						 * Properties of a MatchmakerLobby.
						 * @memberof rivet.client.party.Member.State
						 * @interface IMatchmakerLobby
						 * @property {string|null} [playerId] MatchmakerLobby playerId
						 */

						/**
						 * Constructs a new MatchmakerLobby.
						 * @memberof rivet.client.party.Member.State
						 * @classdesc Represents a MatchmakerLobby.
						 * @implements IMatchmakerLobby
						 * @constructor
						 * @param {rivet.client.party.Member.State.IMatchmakerLobby=} [properties] Properties to set
						 */
						function MatchmakerLobby(properties) {
							if (properties)
								for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
									if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
						}

						/**
						 * MatchmakerLobby playerId.
						 * @member {string} playerId
						 * @memberof rivet.client.party.Member.State.MatchmakerLobby
						 * @instance
						 */
						MatchmakerLobby.prototype.playerId = '';

						/**
						 * Creates a new MatchmakerLobby instance using the specified properties.
						 * @function create
						 * @memberof rivet.client.party.Member.State.MatchmakerLobby
						 * @static
						 * @param {rivet.client.party.Member.State.IMatchmakerLobby=} [properties] Properties to set
						 * @returns {rivet.client.party.Member.State.MatchmakerLobby} MatchmakerLobby instance
						 */
						MatchmakerLobby.create = function create(properties) {
							return new MatchmakerLobby(properties);
						};

						/**
						 * Encodes the specified MatchmakerLobby message. Does not implicitly {@link rivet.client.party.Member.State.MatchmakerLobby.verify|verify} messages.
						 * @function encode
						 * @memberof rivet.client.party.Member.State.MatchmakerLobby
						 * @static
						 * @param {rivet.client.party.Member.State.IMatchmakerLobby} message MatchmakerLobby message or plain object to encode
						 * @param {$protobuf.Writer} [writer] Writer to encode to
						 * @returns {$protobuf.Writer} Writer
						 */
						MatchmakerLobby.encode = function encode(message, writer) {
							if (!writer) writer = $Writer.create();
							if (message.playerId != null && Object.hasOwnProperty.call(message, 'playerId'))
								writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.playerId);
							return writer;
						};

						/**
						 * Decodes a MatchmakerLobby message from the specified reader or buffer.
						 * @function decode
						 * @memberof rivet.client.party.Member.State.MatchmakerLobby
						 * @static
						 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
						 * @param {number} [length] Message length if known beforehand
						 * @returns {rivet.client.party.Member.State.MatchmakerLobby} MatchmakerLobby
						 * @throws {Error} If the payload is not a reader or valid buffer
						 * @throws {$protobuf.util.ProtocolError} If required fields are missing
						 */
						MatchmakerLobby.decode = function decode(reader, length) {
							if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
							let end = length === undefined ? reader.len : reader.pos + length,
								message = new $root.rivet.client.party.Member.State.MatchmakerLobby();
							while (reader.pos < end) {
								let tag = reader.uint32();
								switch (tag >>> 3) {
									case 1:
										message.playerId = reader.string();
										break;
									default:
										reader.skipType(tag & 7);
										break;
								}
							}
							return message;
						};

						/**
						 * Verifies a MatchmakerLobby message.
						 * @function verify
						 * @memberof rivet.client.party.Member.State.MatchmakerLobby
						 * @static
						 * @param {Object.<string,*>} message Plain object to verify
						 * @returns {string|null} `null` if valid, otherwise the reason why it is not
						 */
						MatchmakerLobby.verify = function verify(message) {
							if (typeof message !== 'object' || message === null) return 'object expected';
							if (message.playerId != null && message.hasOwnProperty('playerId'))
								if (!$util.isString(message.playerId)) return 'playerId: string expected';
							return null;
						};

						return MatchmakerLobby;
					})();

					return State;
				})();

				return Member;
			})();

			party.Summary = (function () {
				/**
				 * Properties of a Summary.
				 * @memberof rivet.client.party
				 * @interface ISummary
				 * @property {string|null} [id] Summary id
				 * @property {number|Long|null} [createTs] Summary createTs
				 * @property {rivet.client.party.IActivity|null} [activity] Summary activity
				 * @property {rivet.client.party.IExternalLinks|null} [external] Summary external
				 * @property {number|null} [partySize] Summary partySize
				 * @property {Array.<rivet.client.party.IMember>|null} [members] Summary members
				 * @property {string|null} [threadId] Summary threadId
				 * @property {Array.<rivet.client.party.IInvite>|null} [invites] Summary invites
				 */

				/**
				 * Constructs a new Summary.
				 * @memberof rivet.client.party
				 * @classdesc Represents a Summary.
				 * @implements ISummary
				 * @constructor
				 * @param {rivet.client.party.ISummary=} [properties] Properties to set
				 */
				function Summary(properties) {
					this.members = [];
					this.invites = [];
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * Summary id.
				 * @member {string} id
				 * @memberof rivet.client.party.Summary
				 * @instance
				 */
				Summary.prototype.id = '';

				/**
				 * Summary createTs.
				 * @member {number|Long} createTs
				 * @memberof rivet.client.party.Summary
				 * @instance
				 */
				Summary.prototype.createTs = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

				/**
				 * Summary activity.
				 * @member {rivet.client.party.IActivity|null|undefined} activity
				 * @memberof rivet.client.party.Summary
				 * @instance
				 */
				Summary.prototype.activity = null;

				/**
				 * Summary external.
				 * @member {rivet.client.party.IExternalLinks|null|undefined} external
				 * @memberof rivet.client.party.Summary
				 * @instance
				 */
				Summary.prototype.external = null;

				/**
				 * Summary partySize.
				 * @member {number} partySize
				 * @memberof rivet.client.party.Summary
				 * @instance
				 */
				Summary.prototype.partySize = 0;

				/**
				 * Summary members.
				 * @member {Array.<rivet.client.party.IMember>} members
				 * @memberof rivet.client.party.Summary
				 * @instance
				 */
				Summary.prototype.members = $util.emptyArray;

				/**
				 * Summary threadId.
				 * @member {string} threadId
				 * @memberof rivet.client.party.Summary
				 * @instance
				 */
				Summary.prototype.threadId = '';

				/**
				 * Summary invites.
				 * @member {Array.<rivet.client.party.IInvite>} invites
				 * @memberof rivet.client.party.Summary
				 * @instance
				 */
				Summary.prototype.invites = $util.emptyArray;

				/**
				 * Creates a new Summary instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.party.Summary
				 * @static
				 * @param {rivet.client.party.ISummary=} [properties] Properties to set
				 * @returns {rivet.client.party.Summary} Summary instance
				 */
				Summary.create = function create(properties) {
					return new Summary(properties);
				};

				/**
				 * Encodes the specified Summary message. Does not implicitly {@link rivet.client.party.Summary.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.party.Summary
				 * @static
				 * @param {rivet.client.party.ISummary} message Summary message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				Summary.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
					if (message.createTs != null && Object.hasOwnProperty.call(message, 'createTs'))
						writer.uint32(/* id 2, wireType 0 =*/ 16).uint64(message.createTs);
					if (message.activity != null && Object.hasOwnProperty.call(message, 'activity'))
						$root.rivet.client.party.Activity.encode(
							message.activity,
							writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
						).ldelim();
					if (message.external != null && Object.hasOwnProperty.call(message, 'external'))
						$root.rivet.client.party.ExternalLinks.encode(
							message.external,
							writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
						).ldelim();
					if (message.partySize != null && Object.hasOwnProperty.call(message, 'partySize'))
						writer.uint32(/* id 100, wireType 0 =*/ 800).uint32(message.partySize);
					if (message.members != null && message.members.length)
						for (let i = 0; i < message.members.length; ++i)
							$root.rivet.client.party.Member.encode(
								message.members[i],
								writer.uint32(/* id 101, wireType 2 =*/ 810).fork()
							).ldelim();
					if (message.threadId != null && Object.hasOwnProperty.call(message, 'threadId'))
						writer.uint32(/* id 102, wireType 2 =*/ 818).string(message.threadId);
					if (message.invites != null && message.invites.length)
						for (let i = 0; i < message.invites.length; ++i)
							$root.rivet.client.party.Invite.encode(
								message.invites[i],
								writer.uint32(/* id 103, wireType 2 =*/ 826).fork()
							).ldelim();
					return writer;
				};

				/**
				 * Decodes a Summary message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.party.Summary
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.party.Summary} Summary
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				Summary.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.party.Summary();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.id = reader.string();
								break;
							case 2:
								message.createTs = reader.uint64();
								break;
							case 3:
								message.activity = $root.rivet.client.party.Activity.decode(
									reader,
									reader.uint32()
								);
								break;
							case 4:
								message.external = $root.rivet.client.party.ExternalLinks.decode(
									reader,
									reader.uint32()
								);
								break;
							case 100:
								message.partySize = reader.uint32();
								break;
							case 101:
								if (!(message.members && message.members.length)) message.members = [];
								message.members.push(
									$root.rivet.client.party.Member.decode(reader, reader.uint32())
								);
								break;
							case 102:
								message.threadId = reader.string();
								break;
							case 103:
								if (!(message.invites && message.invites.length)) message.invites = [];
								message.invites.push(
									$root.rivet.client.party.Invite.decode(reader, reader.uint32())
								);
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a Summary message.
				 * @function verify
				 * @memberof rivet.client.party.Summary
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				Summary.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.id != null && message.hasOwnProperty('id'))
						if (!$util.isString(message.id)) return 'id: string expected';
					if (message.createTs != null && message.hasOwnProperty('createTs'))
						if (
							!$util.isInteger(message.createTs) &&
							!(
								message.createTs &&
								$util.isInteger(message.createTs.low) &&
								$util.isInteger(message.createTs.high)
							)
						)
							return 'createTs: integer|Long expected';
					if (message.activity != null && message.hasOwnProperty('activity')) {
						let error = $root.rivet.client.party.Activity.verify(message.activity);
						if (error) return 'activity.' + error;
					}
					if (message.external != null && message.hasOwnProperty('external')) {
						let error = $root.rivet.client.party.ExternalLinks.verify(message.external);
						if (error) return 'external.' + error;
					}
					if (message.partySize != null && message.hasOwnProperty('partySize'))
						if (!$util.isInteger(message.partySize)) return 'partySize: integer expected';
					if (message.members != null && message.hasOwnProperty('members')) {
						if (!Array.isArray(message.members)) return 'members: array expected';
						for (let i = 0; i < message.members.length; ++i) {
							let error = $root.rivet.client.party.Member.verify(message.members[i]);
							if (error) return 'members.' + error;
						}
					}
					if (message.threadId != null && message.hasOwnProperty('threadId'))
						if (!$util.isString(message.threadId)) return 'threadId: string expected';
					if (message.invites != null && message.hasOwnProperty('invites')) {
						if (!Array.isArray(message.invites)) return 'invites: array expected';
						for (let i = 0; i < message.invites.length; ++i) {
							let error = $root.rivet.client.party.Invite.verify(message.invites[i]);
							if (error) return 'invites.' + error;
						}
					}
					return null;
				};

				return Summary;
			})();

			return party;
		})();

		client.watch_index = (function () {
			/**
			 * Namespace watch_index.
			 * @memberof rivet.client
			 * @namespace
			 */
			const watch_index = {};

			watch_index.WatchIndex = (function () {
				/**
				 * Properties of a WatchIndex.
				 * @memberof rivet.client.watch_index
				 * @interface IWatchIndex
				 * @property {string|null} [index] WatchIndex index
				 */

				/**
				 * Constructs a new WatchIndex.
				 * @memberof rivet.client.watch_index
				 * @classdesc Represents a WatchIndex.
				 * @implements IWatchIndex
				 * @constructor
				 * @param {rivet.client.watch_index.IWatchIndex=} [properties] Properties to set
				 */
				function WatchIndex(properties) {
					if (properties)
						for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
							if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
				}

				/**
				 * WatchIndex index.
				 * @member {string} index
				 * @memberof rivet.client.watch_index.WatchIndex
				 * @instance
				 */
				WatchIndex.prototype.index = '';

				/**
				 * Creates a new WatchIndex instance using the specified properties.
				 * @function create
				 * @memberof rivet.client.watch_index.WatchIndex
				 * @static
				 * @param {rivet.client.watch_index.IWatchIndex=} [properties] Properties to set
				 * @returns {rivet.client.watch_index.WatchIndex} WatchIndex instance
				 */
				WatchIndex.create = function create(properties) {
					return new WatchIndex(properties);
				};

				/**
				 * Encodes the specified WatchIndex message. Does not implicitly {@link rivet.client.watch_index.WatchIndex.verify|verify} messages.
				 * @function encode
				 * @memberof rivet.client.watch_index.WatchIndex
				 * @static
				 * @param {rivet.client.watch_index.IWatchIndex} message WatchIndex message or plain object to encode
				 * @param {$protobuf.Writer} [writer] Writer to encode to
				 * @returns {$protobuf.Writer} Writer
				 */
				WatchIndex.encode = function encode(message, writer) {
					if (!writer) writer = $Writer.create();
					if (message.index != null && Object.hasOwnProperty.call(message, 'index'))
						writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.index);
					return writer;
				};

				/**
				 * Decodes a WatchIndex message from the specified reader or buffer.
				 * @function decode
				 * @memberof rivet.client.watch_index.WatchIndex
				 * @static
				 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
				 * @param {number} [length] Message length if known beforehand
				 * @returns {rivet.client.watch_index.WatchIndex} WatchIndex
				 * @throws {Error} If the payload is not a reader or valid buffer
				 * @throws {$protobuf.util.ProtocolError} If required fields are missing
				 */
				WatchIndex.decode = function decode(reader, length) {
					if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
					let end = length === undefined ? reader.len : reader.pos + length,
						message = new $root.rivet.client.watch_index.WatchIndex();
					while (reader.pos < end) {
						let tag = reader.uint32();
						switch (tag >>> 3) {
							case 1:
								message.index = reader.string();
								break;
							default:
								reader.skipType(tag & 7);
								break;
						}
					}
					return message;
				};

				/**
				 * Verifies a WatchIndex message.
				 * @function verify
				 * @memberof rivet.client.watch_index.WatchIndex
				 * @static
				 * @param {Object.<string,*>} message Plain object to verify
				 * @returns {string|null} `null` if valid, otherwise the reason why it is not
				 */
				WatchIndex.verify = function verify(message) {
					if (typeof message !== 'object' || message === null) return 'object expected';
					if (message.index != null && message.hasOwnProperty('index'))
						if (!$util.isString(message.index)) return 'index: string expected';
					return null;
				};

				return WatchIndex;
			})();

			return watch_index;
		})();

		return client;
	})();

	return rivet;
})());

export { $root as default };
