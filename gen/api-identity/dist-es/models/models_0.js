import { __assign, __extends } from "tslib";
import { IdentityServiceServiceException as __BaseException } from "./IdentityServiceServiceException";
export var GetActivitiesInput;
(function (GetActivitiesInput) {
    GetActivitiesInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetActivitiesInput || (GetActivitiesInput = {}));
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
export var WatchResponse;
(function (WatchResponse) {
    WatchResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(WatchResponse || (WatchResponse = {}));
export var GetActivitiesOutput;
(function (GetActivitiesOutput) {
    GetActivitiesOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.identities && { identities: obj.identities.map(function (item) {
            return IdentityHandle.filterSensitiveLog(item);
        })
    }))); };
})(GetActivitiesOutput || (GetActivitiesOutput = {}));
export var AddFriendInput;
(function (AddFriendInput) {
    AddFriendInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AddFriendInput || (AddFriendInput = {}));
export var AddFriendOutput;
(function (AddFriendOutput) {
    AddFriendOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AddFriendOutput || (AddFriendOutput = {}));
export var GetEventsInput;
(function (GetEventsInput) {
    GetEventsInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetEventsInput || (GetEventsInput = {}));
export var ChatThreadExternalLinks;
(function (ChatThreadExternalLinks) {
    ChatThreadExternalLinks.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ChatThreadExternalLinks || (ChatThreadExternalLinks = {}));
export var ChatMessageBodyChatCreate;
(function (ChatMessageBodyChatCreate) {
    ChatMessageBodyChatCreate.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ChatMessageBodyChatCreate || (ChatMessageBodyChatCreate = {}));
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
export var ChatTopicDirectContext;
(function (ChatTopicDirectContext) {
    ChatTopicDirectContext.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign({}, obj), (obj.identityA && { identityA: IdentityHandle.filterSensitiveLog(obj.identityA)
    })), (obj.identityB && { identityB: IdentityHandle.filterSensitiveLog(obj.identityB)
    }))); };
})(ChatTopicDirectContext || (ChatTopicDirectContext = {}));
export var GroupExternalLinks;
(function (GroupExternalLinks) {
    GroupExternalLinks.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupExternalLinks || (GroupExternalLinks = {}));
export var GroupHandle;
(function (GroupHandle) {
    GroupHandle.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupHandle || (GroupHandle = {}));
export var ChatTopicGroupContext;
(function (ChatTopicGroupContext) {
    ChatTopicGroupContext.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ChatTopicGroupContext || (ChatTopicGroupContext = {}));
export var ChatTopicPartyContext;
(function (ChatTopicPartyContext) {
    ChatTopicPartyContext.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.party && { party: PartyHandle.filterSensitiveLog(obj.party)
    }))); };
})(ChatTopicPartyContext || (ChatTopicPartyContext = {}));
export var ChatTopicContext;
(function (ChatTopicContext) {
    ChatTopicContext.visit = function (value, visitor) {
        if (value.group !== undefined)
            return visitor.group(value.group);
        if (value.party !== undefined)
            return visitor.party(value.party);
        if (value.direct !== undefined)
            return visitor.direct(value.direct);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    ChatTopicContext.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.group !== undefined)
            return { group: ChatTopicGroupContext.filterSensitiveLog(obj.group)
            };
        if (obj.party !== undefined)
            return { party: ChatTopicPartyContext.filterSensitiveLog(obj.party)
            };
        if (obj.direct !== undefined)
            return { direct: ChatTopicDirectContext.filterSensitiveLog(obj.direct)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(ChatTopicContext || (ChatTopicContext = {}));
export var ChatThread;
(function (ChatThread) {
    ChatThread.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign({}, obj), (obj.topic && { topic: ChatTopicContext.filterSensitiveLog(obj.topic)
    })), (obj.tailMessage && { tailMessage: ChatMessage.filterSensitiveLog(obj.tailMessage)
    }))); };
})(ChatThread || (ChatThread = {}));
export var GlobalEventChatMessage;
(function (GlobalEventChatMessage) {
    GlobalEventChatMessage.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.thread && { thread: ChatThread.filterSensitiveLog(obj.thread)
    }))); };
})(GlobalEventChatMessage || (GlobalEventChatMessage = {}));
export var GlobalEventChatRead;
(function (GlobalEventChatRead) {
    GlobalEventChatRead.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GlobalEventChatRead || (GlobalEventChatRead = {}));
export var MatchmakerLobbyPlayer;
(function (MatchmakerLobbyPlayer) {
    MatchmakerLobbyPlayer.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(MatchmakerLobbyPlayer || (MatchmakerLobbyPlayer = {}));
export var MatchmakerLobbyPort;
(function (MatchmakerLobbyPort) {
    MatchmakerLobbyPort.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(MatchmakerLobbyPort || (MatchmakerLobbyPort = {}));
export var MatchmakerLobbyRegion;
(function (MatchmakerLobbyRegion) {
    MatchmakerLobbyRegion.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(MatchmakerLobbyRegion || (MatchmakerLobbyRegion = {}));
export var MatchmakerLobby;
(function (MatchmakerLobby) {
    MatchmakerLobby.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(MatchmakerLobby || (MatchmakerLobby = {}));
export var GlobalEventMatchmakerLobbyJoin;
(function (GlobalEventMatchmakerLobbyJoin) {
    GlobalEventMatchmakerLobbyJoin.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GlobalEventMatchmakerLobbyJoin || (GlobalEventMatchmakerLobbyJoin = {}));
export var PartyInviteAlias;
(function (PartyInviteAlias) {
    PartyInviteAlias.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyInviteAlias || (PartyInviteAlias = {}));
export var PartyInviteExternalLinks;
(function (PartyInviteExternalLinks) {
    PartyInviteExternalLinks.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyInviteExternalLinks || (PartyInviteExternalLinks = {}));
export var PartyInvite;
(function (PartyInvite) {
    PartyInvite.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyInvite || (PartyInvite = {}));
export var PartyMemberStateIdle;
(function (PartyMemberStateIdle) {
    PartyMemberStateIdle.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyMemberStateIdle || (PartyMemberStateIdle = {}));
export var PartyMemberStateMatchmakerFindingLobby;
(function (PartyMemberStateMatchmakerFindingLobby) {
    PartyMemberStateMatchmakerFindingLobby.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyMemberStateMatchmakerFindingLobby || (PartyMemberStateMatchmakerFindingLobby = {}));
export var PartyMemberStateMatchmakerLobby;
(function (PartyMemberStateMatchmakerLobby) {
    PartyMemberStateMatchmakerLobby.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyMemberStateMatchmakerLobby || (PartyMemberStateMatchmakerLobby = {}));
export var PartyMemberStateMatchmakerPending;
(function (PartyMemberStateMatchmakerPending) {
    PartyMemberStateMatchmakerPending.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartyMemberStateMatchmakerPending || (PartyMemberStateMatchmakerPending = {}));
export var PartyMemberState;
(function (PartyMemberState) {
    PartyMemberState.visit = function (value, visitor) {
        if (value.idle !== undefined)
            return visitor.idle(value.idle);
        if (value.matchmakerPending !== undefined)
            return visitor.matchmakerPending(value.matchmakerPending);
        if (value.matchmakerFindingLobby !== undefined)
            return visitor.matchmakerFindingLobby(value.matchmakerFindingLobby);
        if (value.matchmakerLobby !== undefined)
            return visitor.matchmakerLobby(value.matchmakerLobby);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    PartyMemberState.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.idle !== undefined)
            return { idle: PartyMemberStateIdle.filterSensitiveLog(obj.idle)
            };
        if (obj.matchmakerPending !== undefined)
            return { matchmakerPending: PartyMemberStateMatchmakerPending.filterSensitiveLog(obj.matchmakerPending)
            };
        if (obj.matchmakerFindingLobby !== undefined)
            return { matchmakerFindingLobby: PartyMemberStateMatchmakerFindingLobby.filterSensitiveLog(obj.matchmakerFindingLobby)
            };
        if (obj.matchmakerLobby !== undefined)
            return { matchmakerLobby: PartyMemberStateMatchmakerLobby.filterSensitiveLog(obj.matchmakerLobby)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(PartyMemberState || (PartyMemberState = {}));
export var PartyMemberSummary;
(function (PartyMemberSummary) {
    PartyMemberSummary.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign({}, obj), (obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
    })), (obj.state && { state: PartyMemberState.filterSensitiveLog(obj.state)
    }))); };
})(PartyMemberSummary || (PartyMemberSummary = {}));
export var PartySummary;
(function (PartySummary) {
    PartySummary.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign({}, obj), (obj.activity && { activity: PartyActivity.filterSensitiveLog(obj.activity)
    })), (obj.members && { members: obj.members.map(function (item) {
            return PartyMemberSummary.filterSensitiveLog(item);
        })
    }))); };
})(PartySummary || (PartySummary = {}));
export var GlobalEventPartyUpdate;
(function (GlobalEventPartyUpdate) {
    GlobalEventPartyUpdate.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.party && { party: PartySummary.filterSensitiveLog(obj.party)
    }))); };
})(GlobalEventPartyUpdate || (GlobalEventPartyUpdate = {}));
export var GlobalEventKind;
(function (GlobalEventKind) {
    GlobalEventKind.visit = function (value, visitor) {
        if (value.chatMessage !== undefined)
            return visitor.chatMessage(value.chatMessage);
        if (value.chatRead !== undefined)
            return visitor.chatRead(value.chatRead);
        if (value.partyUpdate !== undefined)
            return visitor.partyUpdate(value.partyUpdate);
        if (value.matchmakerLobbyJoin !== undefined)
            return visitor.matchmakerLobbyJoin(value.matchmakerLobbyJoin);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    GlobalEventKind.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.chatMessage !== undefined)
            return { chatMessage: GlobalEventChatMessage.filterSensitiveLog(obj.chatMessage)
            };
        if (obj.chatRead !== undefined)
            return { chatRead: GlobalEventChatRead.filterSensitiveLog(obj.chatRead)
            };
        if (obj.partyUpdate !== undefined)
            return { partyUpdate: GlobalEventPartyUpdate.filterSensitiveLog(obj.partyUpdate)
            };
        if (obj.matchmakerLobbyJoin !== undefined)
            return { matchmakerLobbyJoin: GlobalEventMatchmakerLobbyJoin.filterSensitiveLog(obj.matchmakerLobbyJoin)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(GlobalEventKind || (GlobalEventKind = {}));
export var GlobalEventNotification;
(function (GlobalEventNotification) {
    GlobalEventNotification.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GlobalEventNotification || (GlobalEventNotification = {}));
export var GlobalEvent;
(function (GlobalEvent) {
    GlobalEvent.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.kind && { kind: GlobalEventKind.filterSensitiveLog(obj.kind)
    }))); };
})(GlobalEvent || (GlobalEvent = {}));
export var GetEventsOutput;
(function (GetEventsOutput) {
    GetEventsOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.events && { events: obj.events.map(function (item) {
            return GlobalEvent.filterSensitiveLog(item);
        })
    }))); };
})(GetEventsOutput || (GetEventsOutput = {}));
export var GameIdentityLinkInput;
(function (GameIdentityLinkInput) {
    GameIdentityLinkInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameIdentityLinkInput || (GameIdentityLinkInput = {}));
export var GameIdentityLinkOutput;
(function (GameIdentityLinkOutput) {
    GameIdentityLinkOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameIdentityLinkOutput || (GameIdentityLinkOutput = {}));
export var GameIdentityLinkCompleteInput;
(function (GameIdentityLinkCompleteInput) {
    GameIdentityLinkCompleteInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameIdentityLinkCompleteInput || (GameIdentityLinkCompleteInput = {}));
export var GameIdentityLinkCompleteOutput;
(function (GameIdentityLinkCompleteOutput) {
    GameIdentityLinkCompleteOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameIdentityLinkCompleteOutput || (GameIdentityLinkCompleteOutput = {}));
export var GetIdentityGameLinkStatusInput;
(function (GetIdentityGameLinkStatusInput) {
    GetIdentityGameLinkStatusInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetIdentityGameLinkStatusInput || (GetIdentityGameLinkStatusInput = {}));
export var IdentityGameLinkStatus;
(function (IdentityGameLinkStatus) {
    IdentityGameLinkStatus["COMPLETE"] = "complete";
    IdentityGameLinkStatus["INCOMPLETE"] = "incomplete";
    IdentityGameLinkStatus["REVOKED"] = "revoked";
})(IdentityGameLinkStatus || (IdentityGameLinkStatus = {}));
export var GetIdentityGameLinkStatusOutput;
(function (GetIdentityGameLinkStatusOutput) {
    GetIdentityGameLinkStatusOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetIdentityGameLinkStatusOutput || (GetIdentityGameLinkStatusOutput = {}));
export var GetIdentityProfileInput;
(function (GetIdentityProfileInput) {
    GetIdentityProfileInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetIdentityProfileInput || (GetIdentityProfileInput = {}));
export var IdentityDevState;
(function (IdentityDevState) {
    IdentityDevState["ACCEPTED"] = "accepted";
    IdentityDevState["INACTIVE"] = "inactive";
    IdentityDevState["PENDING"] = "pending";
})(IdentityDevState || (IdentityDevState = {}));
export var GameStatAggregationMethod;
(function (GameStatAggregationMethod) {
    GameStatAggregationMethod["AVERAGE"] = "average";
    GameStatAggregationMethod["MAX"] = "max";
    GameStatAggregationMethod["MIN"] = "min";
    GameStatAggregationMethod["SUM"] = "sum";
})(GameStatAggregationMethod || (GameStatAggregationMethod = {}));
export var GameStatFormatMethod;
(function (GameStatFormatMethod) {
    GameStatFormatMethod["DURACTION_SECOND"] = "duration_second";
    GameStatFormatMethod["DURATION_HUNDREDTH_SECOND"] = "duration_hundredth_second";
    GameStatFormatMethod["DURATION_MINUTE"] = "duration_minute";
    GameStatFormatMethod["FLOAT_1"] = "float_1";
    GameStatFormatMethod["FLOAT_2"] = "float_2";
    GameStatFormatMethod["FLOAT_3"] = "float_3";
    GameStatFormatMethod["INTEGER"] = "integer";
})(GameStatFormatMethod || (GameStatFormatMethod = {}));
export var GameStatSortingMethod;
(function (GameStatSortingMethod) {
    GameStatSortingMethod["ASC"] = "asc";
    GameStatSortingMethod["DESC"] = "desc";
})(GameStatSortingMethod || (GameStatSortingMethod = {}));
export var GameStatConfig;
(function (GameStatConfig) {
    GameStatConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameStatConfig || (GameStatConfig = {}));
export var GameStat;
(function (GameStat) {
    GameStat.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameStat || (GameStat = {}));
export var GameStatSummary;
(function (GameStatSummary) {
    GameStatSummary.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameStatSummary || (GameStatSummary = {}));
export var GroupRole;
(function (GroupRole) {
    GroupRole.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupRole || (GroupRole = {}));
export var IdentityGroup;
(function (IdentityGroup) {
    IdentityGroup.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdentityGroup || (IdentityGroup = {}));
export var IdentityEmailLinkedAccount;
(function (IdentityEmailLinkedAccount) {
    IdentityEmailLinkedAccount.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdentityEmailLinkedAccount || (IdentityEmailLinkedAccount = {}));
export var IdentityLinkedAccount;
(function (IdentityLinkedAccount) {
    IdentityLinkedAccount.visit = function (value, visitor) {
        if (value.email !== undefined)
            return visitor.email(value.email);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    IdentityLinkedAccount.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.email !== undefined)
            return { email: IdentityEmailLinkedAccount.filterSensitiveLog(obj.email)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(IdentityLinkedAccount || (IdentityLinkedAccount = {}));
export var IdentityProfile;
(function (IdentityProfile) {
    IdentityProfile.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign({}, obj), (obj.presence && { presence: IdentityPresence.filterSensitiveLog(obj.presence)
    })), (obj.linkedAccounts && { linkedAccounts: obj.linkedAccounts.map(function (item) {
            return IdentityLinkedAccount.filterSensitiveLog(item);
        })
    }))); };
})(IdentityProfile || (IdentityProfile = {}));
export var GetIdentityProfileOutput;
(function (GetIdentityProfileOutput) {
    GetIdentityProfileOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.identity && { identity: IdentityProfile.filterSensitiveLog(obj.identity)
    }))); };
})(GetIdentityProfileOutput || (GetIdentityProfileOutput = {}));
export var GetIdentitySelfInput;
(function (GetIdentitySelfInput) {
    GetIdentitySelfInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetIdentitySelfInput || (GetIdentitySelfInput = {}));
export var GetIdentitySelfOutput;
(function (GetIdentitySelfOutput) {
    GetIdentitySelfOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.identity && { identity: IdentityProfile.filterSensitiveLog(obj.identity)
    }))); };
})(GetIdentitySelfOutput || (GetIdentitySelfOutput = {}));
export var IdentityAvatarUploadCompleteInput;
(function (IdentityAvatarUploadCompleteInput) {
    IdentityAvatarUploadCompleteInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdentityAvatarUploadCompleteInput || (IdentityAvatarUploadCompleteInput = {}));
export var IdentityAvatarUploadCompleteOutput;
(function (IdentityAvatarUploadCompleteOutput) {
    IdentityAvatarUploadCompleteOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdentityAvatarUploadCompleteOutput || (IdentityAvatarUploadCompleteOutput = {}));
export var IdentityAvatarUploadPrepareInput;
(function (IdentityAvatarUploadPrepareInput) {
    IdentityAvatarUploadPrepareInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdentityAvatarUploadPrepareInput || (IdentityAvatarUploadPrepareInput = {}));
export var UploadPresignedRequest;
(function (UploadPresignedRequest) {
    UploadPresignedRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UploadPresignedRequest || (UploadPresignedRequest = {}));
export var IdentityAvatarUploadPrepareOutput;
(function (IdentityAvatarUploadPrepareOutput) {
    IdentityAvatarUploadPrepareOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdentityAvatarUploadPrepareOutput || (IdentityAvatarUploadPrepareOutput = {}));
export var RemoveFriendInput;
(function (RemoveFriendInput) {
    RemoveFriendInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RemoveFriendInput || (RemoveFriendInput = {}));
export var RemoveFriendOutput;
(function (RemoveFriendOutput) {
    RemoveFriendOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RemoveFriendOutput || (RemoveFriendOutput = {}));
export var RemoveIdentityGameActivityInput;
(function (RemoveIdentityGameActivityInput) {
    RemoveIdentityGameActivityInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RemoveIdentityGameActivityInput || (RemoveIdentityGameActivityInput = {}));
export var RemoveIdentityGameActivityOutput;
(function (RemoveIdentityGameActivityOutput) {
    RemoveIdentityGameActivityOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RemoveIdentityGameActivityOutput || (RemoveIdentityGameActivityOutput = {}));
export var RequestIdentityGameLinkInput;
(function (RequestIdentityGameLinkInput) {
    RequestIdentityGameLinkInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RequestIdentityGameLinkInput || (RequestIdentityGameLinkInput = {}));
export var RequestIdentityGameLinkOutput;
(function (RequestIdentityGameLinkOutput) {
    RequestIdentityGameLinkOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RequestIdentityGameLinkOutput || (RequestIdentityGameLinkOutput = {}));
export var SearchIdentitiesInput;
(function (SearchIdentitiesInput) {
    SearchIdentitiesInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SearchIdentitiesInput || (SearchIdentitiesInput = {}));
export var SearchIdentitiesOutput;
(function (SearchIdentitiesOutput) {
    SearchIdentitiesOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.identities && { identities: obj.identities.map(function (item) {
            return IdentityHandle.filterSensitiveLog(item);
        })
    }))); };
})(SearchIdentitiesOutput || (SearchIdentitiesOutput = {}));
export var UpdateIdentityGameActivity;
(function (UpdateIdentityGameActivity) {
    UpdateIdentityGameActivity.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateIdentityGameActivity || (UpdateIdentityGameActivity = {}));
export var SetIdentityGameActivityInput;
(function (SetIdentityGameActivityInput) {
    SetIdentityGameActivityInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SetIdentityGameActivityInput || (SetIdentityGameActivityInput = {}));
export var SetIdentityGameActivityOutput;
(function (SetIdentityGameActivityOutput) {
    SetIdentityGameActivityOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SetIdentityGameActivityOutput || (SetIdentityGameActivityOutput = {}));
export var SetupIdentityInput;
(function (SetupIdentityInput) {
    SetupIdentityInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SetupIdentityInput || (SetupIdentityInput = {}));
export var SetupIdentityOutput;
(function (SetupIdentityOutput) {
    SetupIdentityOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.identity && { identity: IdentityProfile.filterSensitiveLog(obj.identity)
    }))); };
})(SetupIdentityOutput || (SetupIdentityOutput = {}));
export var SignupForBetaInput;
(function (SignupForBetaInput) {
    SignupForBetaInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SignupForBetaInput || (SignupForBetaInput = {}));
export var SignupForBetaOutput;
(function (SignupForBetaOutput) {
    SignupForBetaOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SignupForBetaOutput || (SignupForBetaOutput = {}));
export var UpdateIdentityProfileInput;
(function (UpdateIdentityProfileInput) {
    UpdateIdentityProfileInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateIdentityProfileInput || (UpdateIdentityProfileInput = {}));
export var UpdateIdentityProfileOutput;
(function (UpdateIdentityProfileOutput) {
    UpdateIdentityProfileOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateIdentityProfileOutput || (UpdateIdentityProfileOutput = {}));
export var UpdateIdentityStatusInput;
(function (UpdateIdentityStatusInput) {
    UpdateIdentityStatusInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateIdentityStatusInput || (UpdateIdentityStatusInput = {}));
export var UpdateIdentityStatusOutput;
(function (UpdateIdentityStatusOutput) {
    UpdateIdentityStatusOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateIdentityStatusOutput || (UpdateIdentityStatusOutput = {}));
export var ValidateIdentityProfileInput;
(function (ValidateIdentityProfileInput) {
    ValidateIdentityProfileInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateIdentityProfileInput || (ValidateIdentityProfileInput = {}));
export var ValidationError;
(function (ValidationError) {
    ValidationError.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidationError || (ValidationError = {}));
export var ValidateIdentityProfileOutput;
(function (ValidateIdentityProfileOutput) {
    ValidateIdentityProfileOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateIdentityProfileOutput || (ValidateIdentityProfileOutput = {}));
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
