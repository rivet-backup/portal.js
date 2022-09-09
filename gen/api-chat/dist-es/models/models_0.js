import { __assign, __extends } from "tslib";
import { ChatServiceServiceException as __BaseException } from "./ChatServiceServiceException";
export var QueryDirection;
(function (QueryDirection) {
    QueryDirection["AFTER"] = "after";
    QueryDirection["BEFORE"] = "before";
    QueryDirection["BEFORE_AND_AFTER"] = "before_and_after";
})(QueryDirection || (QueryDirection = {}));
export var GetThreadHistoryInput;
(function (GetThreadHistoryInput) {
    GetThreadHistoryInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetThreadHistoryInput || (GetThreadHistoryInput = {}));
export var ChatMessageBodyChatCreate;
(function (ChatMessageBodyChatCreate) {
    ChatMessageBodyChatCreate.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ChatMessageBodyChatCreate || (ChatMessageBodyChatCreate = {}));
export var IdentityExternalLinks;
(function (IdentityExternalLinks) {
    IdentityExternalLinks.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdentityExternalLinks || (IdentityExternalLinks = {}));
export var GameHandle;
(function (GameHandle) {
    GameHandle.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameHandle || (GameHandle = {}));
export var IdentityGameActivity;
(function (IdentityGameActivity) {
    IdentityGameActivity.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdentityGameActivity || (IdentityGameActivity = {}));
export var PartyActivityIdle;
(function (PartyActivityIdle) {
    PartyActivityIdle.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyActivityIdle || (PartyActivityIdle = {}));
export var PartyActivityMatchmakerFindingLobby;
(function (PartyActivityMatchmakerFindingLobby) {
    PartyActivityMatchmakerFindingLobby.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyActivityMatchmakerFindingLobby || (PartyActivityMatchmakerFindingLobby = {}));
export var PartyMatchmakerLobby;
(function (PartyMatchmakerLobby) {
    PartyMatchmakerLobby.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyMatchmakerLobby || (PartyMatchmakerLobby = {}));
export var PartyActivityMatchmakerLobby;
(function (PartyActivityMatchmakerLobby) {
    PartyActivityMatchmakerLobby.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyActivityMatchmakerLobby || (PartyActivityMatchmakerLobby = {}));
export var PartyActivity;
(function (PartyActivity) {
    PartyActivity.visit = function (value, visitor) {
        if (value.idle !== undefined)
            return visitor.idle(value.idle);
        if (value.matchmakerFindingLobby !== undefined)
            return visitor.matchmakerFindingLobby(value.matchmakerFindingLobby);
        if (value.matchmakerLobby !== undefined)
            return visitor.matchmakerLobby(value.matchmakerLobby);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    PartyActivity.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.idle !== undefined)
            return { idle: PartyActivityIdle.filterSensitiveLog(obj.idle)
            };
        if (obj.matchmakerFindingLobby !== undefined)
            return { matchmakerFindingLobby: PartyActivityMatchmakerFindingLobby.filterSensitiveLog(obj.matchmakerFindingLobby)
            };
        if (obj.matchmakerLobby !== undefined)
            return { matchmakerLobby: PartyActivityMatchmakerLobby.filterSensitiveLog(obj.matchmakerLobby)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(PartyActivity || (PartyActivity = {}));
export var PartyExternalLinks;
(function (PartyExternalLinks) {
    PartyExternalLinks.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyExternalLinks || (PartyExternalLinks = {}));
export var PartyHandle;
(function (PartyHandle) {
    PartyHandle.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.activity && { activity: PartyActivity.filterSensitiveLog(obj.activity)
    }))); };
})(PartyHandle || (PartyHandle = {}));
export var IdentityStatus;
(function (IdentityStatus) {
    IdentityStatus["AWAY"] = "away";
    IdentityStatus["OFFLINE"] = "offline";
    IdentityStatus["ONLINE"] = "online";
})(IdentityStatus || (IdentityStatus = {}));
export var IdentityPresence;
(function (IdentityPresence) {
    IdentityPresence.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.party && { party: PartyHandle.filterSensitiveLog(obj.party)
    }))); };
})(IdentityPresence || (IdentityPresence = {}));
export var IdentityHandle;
(function (IdentityHandle) {
    IdentityHandle.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.presence && { presence: IdentityPresence.filterSensitiveLog(obj.presence)
    }))); };
})(IdentityHandle || (IdentityHandle = {}));
export var ChatMessageBodyGroupJoin;
(function (ChatMessageBodyGroupJoin) {
    ChatMessageBodyGroupJoin.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
    }))); };
})(ChatMessageBodyGroupJoin || (ChatMessageBodyGroupJoin = {}));
export var ChatMessageBodyGroupLeave;
(function (ChatMessageBodyGroupLeave) {
    ChatMessageBodyGroupLeave.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
    }))); };
})(ChatMessageBodyGroupLeave || (ChatMessageBodyGroupLeave = {}));
export var ChatMessageBodyIdentityFollow;
(function (ChatMessageBodyIdentityFollow) {
    ChatMessageBodyIdentityFollow.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ChatMessageBodyIdentityFollow || (ChatMessageBodyIdentityFollow = {}));
export var ChatMessageBodyPartyActivityChange;
(function (ChatMessageBodyPartyActivityChange) {
    ChatMessageBodyPartyActivityChange.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ChatMessageBodyPartyActivityChange || (ChatMessageBodyPartyActivityChange = {}));
export var ChatMessageBodyPartyInvite;
(function (ChatMessageBodyPartyInvite) {
    ChatMessageBodyPartyInvite.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign({}, obj), (obj.sender && { sender: IdentityHandle.filterSensitiveLog(obj.sender)
    })), (obj.party && { party: PartyHandle.filterSensitiveLog(obj.party)
    }))); };
})(ChatMessageBodyPartyInvite || (ChatMessageBodyPartyInvite = {}));
export var ChatMessageBodyPartyJoin;
(function (ChatMessageBodyPartyJoin) {
    ChatMessageBodyPartyJoin.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
    }))); };
})(ChatMessageBodyPartyJoin || (ChatMessageBodyPartyJoin = {}));
export var ChatMessageBodyPartyLeave;
(function (ChatMessageBodyPartyLeave) {
    ChatMessageBodyPartyLeave.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
    }))); };
})(ChatMessageBodyPartyLeave || (ChatMessageBodyPartyLeave = {}));
export var ChatMessageBodyText;
(function (ChatMessageBodyText) {
    ChatMessageBodyText.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.sender && { sender: IdentityHandle.filterSensitiveLog(obj.sender)
    }))); };
})(ChatMessageBodyText || (ChatMessageBodyText = {}));
export var ChatMessageBody;
(function (ChatMessageBody) {
    ChatMessageBody.visit = function (value, visitor) {
        if (value.text !== undefined)
            return visitor.text(value.text);
        if (value.chatCreate !== undefined)
            return visitor.chatCreate(value.chatCreate);
        if (value.identityFollow !== undefined)
            return visitor.identityFollow(value.identityFollow);
        if (value.groupJoin !== undefined)
            return visitor.groupJoin(value.groupJoin);
        if (value.groupLeave !== undefined)
            return visitor.groupLeave(value.groupLeave);
        if (value.partyInvite !== undefined)
            return visitor.partyInvite(value.partyInvite);
        if (value.partyJoin !== undefined)
            return visitor.partyJoin(value.partyJoin);
        if (value.partyLeave !== undefined)
            return visitor.partyLeave(value.partyLeave);
        if (value.partyActivityChange !== undefined)
            return visitor.partyActivityChange(value.partyActivityChange);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    ChatMessageBody.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.text !== undefined)
            return { text: ChatMessageBodyText.filterSensitiveLog(obj.text)
            };
        if (obj.chatCreate !== undefined)
            return { chatCreate: ChatMessageBodyChatCreate.filterSensitiveLog(obj.chatCreate)
            };
        if (obj.identityFollow !== undefined)
            return { identityFollow: ChatMessageBodyIdentityFollow.filterSensitiveLog(obj.identityFollow)
            };
        if (obj.groupJoin !== undefined)
            return { groupJoin: ChatMessageBodyGroupJoin.filterSensitiveLog(obj.groupJoin)
            };
        if (obj.groupLeave !== undefined)
            return { groupLeave: ChatMessageBodyGroupLeave.filterSensitiveLog(obj.groupLeave)
            };
        if (obj.partyInvite !== undefined)
            return { partyInvite: ChatMessageBodyPartyInvite.filterSensitiveLog(obj.partyInvite)
            };
        if (obj.partyJoin !== undefined)
            return { partyJoin: ChatMessageBodyPartyJoin.filterSensitiveLog(obj.partyJoin)
            };
        if (obj.partyLeave !== undefined)
            return { partyLeave: ChatMessageBodyPartyLeave.filterSensitiveLog(obj.partyLeave)
            };
        if (obj.partyActivityChange !== undefined)
            return { partyActivityChange: ChatMessageBodyPartyActivityChange.filterSensitiveLog(obj.partyActivityChange)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(ChatMessageBody || (ChatMessageBody = {}));
export var ChatMessage;
(function (ChatMessage) {
    ChatMessage.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.body && { body: ChatMessageBody.filterSensitiveLog(obj.body)
    }))); };
})(ChatMessage || (ChatMessage = {}));
export var GetThreadHistoryOutput;
(function (GetThreadHistoryOutput) {
    GetThreadHistoryOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.chatMessages && { chatMessages: obj.chatMessages.map(function (item) {
            return ChatMessage.filterSensitiveLog(item);
        })
    }))); };
})(GetThreadHistoryOutput || (GetThreadHistoryOutput = {}));
export var GetThreadLiveInput;
(function (GetThreadLiveInput) {
    GetThreadLiveInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetThreadLiveInput || (GetThreadLiveInput = {}));
export var Unit;
(function (Unit) {
    Unit.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Unit || (Unit = {}));
export var ChatTypingStatus;
(function (ChatTypingStatus) {
    ChatTypingStatus.visit = function (value, visitor) {
        if (value.idle !== undefined)
            return visitor.idle(value.idle);
        if (value.typing !== undefined)
            return visitor.typing(value.typing);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    ChatTypingStatus.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.idle !== undefined)
            return { idle: Unit.filterSensitiveLog(obj.idle)
            };
        if (obj.typing !== undefined)
            return { typing: Unit.filterSensitiveLog(obj.typing)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(ChatTypingStatus || (ChatTypingStatus = {}));
export var ChatIdentityTypingStatus;
(function (ChatIdentityTypingStatus) {
    ChatIdentityTypingStatus.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign({}, obj), (obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
    })), (obj.status && { status: ChatTypingStatus.filterSensitiveLog(obj.status)
    }))); };
})(ChatIdentityTypingStatus || (ChatIdentityTypingStatus = {}));
export var WatchResponse;
(function (WatchResponse) {
    WatchResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(WatchResponse || (WatchResponse = {}));
export var GetThreadLiveOutput;
(function (GetThreadLiveOutput) {
    GetThreadLiveOutput.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign({}, obj), (obj.chatMessages && { chatMessages: obj.chatMessages.map(function (item) {
            return ChatMessage.filterSensitiveLog(item);
        })
    })), (obj.typingStatuses && { typingStatuses: obj.typingStatuses.map(function (item) {
            return ChatIdentityTypingStatus.filterSensitiveLog(item);
        })
    }))); };
})(GetThreadLiveOutput || (GetThreadLiveOutput = {}));
export var GetThreadTopicInput;
(function (GetThreadTopicInput) {
    GetThreadTopicInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetThreadTopicInput || (GetThreadTopicInput = {}));
export var ChatSimpleTopicDirectContext;
(function (ChatSimpleTopicDirectContext) {
    ChatSimpleTopicDirectContext.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ChatSimpleTopicDirectContext || (ChatSimpleTopicDirectContext = {}));
export var ChatSimpleTopicGroupContext;
(function (ChatSimpleTopicGroupContext) {
    ChatSimpleTopicGroupContext.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ChatSimpleTopicGroupContext || (ChatSimpleTopicGroupContext = {}));
export var ChatSimpleTopicPartyContext;
(function (ChatSimpleTopicPartyContext) {
    ChatSimpleTopicPartyContext.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ChatSimpleTopicPartyContext || (ChatSimpleTopicPartyContext = {}));
export var ChatSimpleTopicContext;
(function (ChatSimpleTopicContext) {
    ChatSimpleTopicContext.visit = function (value, visitor) {
        if (value.group !== undefined)
            return visitor.group(value.group);
        if (value.party !== undefined)
            return visitor.party(value.party);
        if (value.direct !== undefined)
            return visitor.direct(value.direct);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    ChatSimpleTopicContext.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.group !== undefined)
            return { group: ChatSimpleTopicGroupContext.filterSensitiveLog(obj.group)
            };
        if (obj.party !== undefined)
            return { party: ChatSimpleTopicPartyContext.filterSensitiveLog(obj.party)
            };
        if (obj.direct !== undefined)
            return { direct: ChatSimpleTopicDirectContext.filterSensitiveLog(obj.direct)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(ChatSimpleTopicContext || (ChatSimpleTopicContext = {}));
export var GetThreadTopicOutput;
(function (GetThreadTopicOutput) {
    GetThreadTopicOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.topic && { topic: ChatSimpleTopicContext.filterSensitiveLog(obj.topic)
    }))); };
})(GetThreadTopicOutput || (GetThreadTopicOutput = {}));
export var SendMessageBodyText;
(function (SendMessageBodyText) {
    SendMessageBodyText.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SendMessageBodyText || (SendMessageBodyText = {}));
export var SendMessageBody;
(function (SendMessageBody) {
    SendMessageBody.visit = function (value, visitor) {
        if (value.text !== undefined)
            return visitor.text(value.text);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    SendMessageBody.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.text !== undefined)
            return { text: SendMessageBodyText.filterSensitiveLog(obj.text)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(SendMessageBody || (SendMessageBody = {}));
export var SendChatMessageInput;
(function (SendChatMessageInput) {
    SendChatMessageInput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.messageBody && { messageBody: SendMessageBody.filterSensitiveLog(obj.messageBody)
    }))); };
})(SendChatMessageInput || (SendChatMessageInput = {}));
export var SendChatMessageOutput;
(function (SendChatMessageOutput) {
    SendChatMessageOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SendChatMessageOutput || (SendChatMessageOutput = {}));
export var SendChatMessageWithTopicInput;
(function (SendChatMessageWithTopicInput) {
    SendChatMessageWithTopicInput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.messageBody && { messageBody: SendMessageBody.filterSensitiveLog(obj.messageBody)
    }))); };
})(SendChatMessageWithTopicInput || (SendChatMessageWithTopicInput = {}));
export var SendChatMessageWithTopicOutput;
(function (SendChatMessageWithTopicOutput) {
    SendChatMessageWithTopicOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SendChatMessageWithTopicOutput || (SendChatMessageWithTopicOutput = {}));
export var UpdateThreadReadInput;
(function (UpdateThreadReadInput) {
    UpdateThreadReadInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateThreadReadInput || (UpdateThreadReadInput = {}));
export var UpdateThreadReadOutput;
(function (UpdateThreadReadOutput) {
    UpdateThreadReadOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateThreadReadOutput || (UpdateThreadReadOutput = {}));
export var UpdateTypingStatusInput;
(function (UpdateTypingStatusInput) {
    UpdateTypingStatusInput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.status && { status: ChatTypingStatus.filterSensitiveLog(obj.status)
    }))); };
})(UpdateTypingStatusInput || (UpdateTypingStatusInput = {}));
export var UpdateTypingStatusOutput;
(function (UpdateTypingStatusOutput) {
    UpdateTypingStatusOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateTypingStatusOutput || (UpdateTypingStatusOutput = {}));
export var GetIdentityDirectChatInput;
(function (GetIdentityDirectChatInput) {
    GetIdentityDirectChatInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetIdentityDirectChatInput || (GetIdentityDirectChatInput = {}));
export var GetIdentityDirectChatOutput;
(function (GetIdentityDirectChatOutput) {
    GetIdentityDirectChatOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
    }))); };
})(GetIdentityDirectChatOutput || (GetIdentityDirectChatOutput = {}));
var BadRequestError = (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(opts) {
        var _this = _super.call(this, __assign({ name: "BadRequestError", $fault: "client" }, opts)) || this;
        _this.name = "BadRequestError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, BadRequestError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return BadRequestError;
}(__BaseException));
export { BadRequestError };
var ForbiddenError = (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(opts) {
        var _this = _super.call(this, __assign({ name: "ForbiddenError", $fault: "client" }, opts)) || this;
        _this.name = "ForbiddenError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, ForbiddenError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return ForbiddenError;
}(__BaseException));
export { ForbiddenError };
var InternalError = (function (_super) {
    __extends(InternalError, _super);
    function InternalError(opts) {
        var _this = _super.call(this, __assign({ name: "InternalError", $fault: "server" }, opts)) || this;
        _this.name = "InternalError";
        _this.$fault = "server";
        _this.$retryable = {};
        Object.setPrototypeOf(_this, InternalError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return InternalError;
}(__BaseException));
export { InternalError };
var NotFoundError = (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(opts) {
        var _this = _super.call(this, __assign({ name: "NotFoundError", $fault: "client" }, opts)) || this;
        _this.name = "NotFoundError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, NotFoundError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return NotFoundError;
}(__BaseException));
export { NotFoundError };
var RateLimitError = (function (_super) {
    __extends(RateLimitError, _super);
    function RateLimitError(opts) {
        var _this = _super.call(this, __assign({ name: "RateLimitError", $fault: "client" }, opts)) || this;
        _this.name = "RateLimitError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, RateLimitError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return RateLimitError;
}(__BaseException));
export { RateLimitError };
var UnauthorizedError = (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(opts) {
        var _this = _super.call(this, __assign({ name: "UnauthorizedError", $fault: "client" }, opts)) || this;
        _this.name = "UnauthorizedError";
        _this.$fault = "client";
        _this.$retryable = {};
        Object.setPrototypeOf(_this, UnauthorizedError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return UnauthorizedError;
}(__BaseException));
export { UnauthorizedError };
