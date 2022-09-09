import { __assign, __extends } from "tslib";
import { GroupServiceServiceException as __BaseException } from "./GroupServiceServiceException";
export var ConsumeGroupInviteInput;
(function (ConsumeGroupInviteInput) {
    ConsumeGroupInviteInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ConsumeGroupInviteInput || (ConsumeGroupInviteInput = {}));
export var GroupInviteErrorCode;
(function (GroupInviteErrorCode) {
    GroupInviteErrorCode["IDENTITY_ALREADY_GROUP_MEMBER"] = "identity_already_group_member";
    GroupInviteErrorCode["INVITE_ALREADY_USED"] = "invite_already_used";
    GroupInviteErrorCode["INVITE_CODE_INVALID"] = "invite_code_invalid";
    GroupInviteErrorCode["INVITE_EXPIRED"] = "invite_expired";
    GroupInviteErrorCode["INVITE_REVOKED"] = "invite_revoked";
    GroupInviteErrorCode["UNKNOWN"] = "unknown";
})(GroupInviteErrorCode || (GroupInviteErrorCode = {}));
export var ConsumeGroupInviteOutput;
(function (ConsumeGroupInviteOutput) {
    ConsumeGroupInviteOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ConsumeGroupInviteOutput || (ConsumeGroupInviteOutput = {}));
export var CreateGroupInput;
(function (CreateGroupInput) {
    CreateGroupInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGroupInput || (CreateGroupInput = {}));
export var CreateGroupOutput;
(function (CreateGroupOutput) {
    CreateGroupOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGroupOutput || (CreateGroupOutput = {}));
export var CreateGroupInviteInput;
(function (CreateGroupInviteInput) {
    CreateGroupInviteInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGroupInviteInput || (CreateGroupInviteInput = {}));
export var CreateGroupInviteOutput;
(function (CreateGroupInviteOutput) {
    CreateGroupInviteOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGroupInviteOutput || (CreateGroupInviteOutput = {}));
export var GetGroupProfileInput;
(function (GetGroupProfileInput) {
    GetGroupProfileInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGroupProfileInput || (GetGroupProfileInput = {}));
export var GroupChannel;
(function (GroupChannel) {
    GroupChannel.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupChannel || (GroupChannel = {}));
export var GroupExternalLinks;
(function (GroupExternalLinks) {
    GroupExternalLinks.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupExternalLinks || (GroupExternalLinks = {}));
export var GameHandle;
(function (GameHandle) {
    GameHandle.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameHandle || (GameHandle = {}));
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
export var IdentityExternalLinks;
(function (IdentityExternalLinks) {
    IdentityExternalLinks.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdentityExternalLinks || (IdentityExternalLinks = {}));
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
export var GroupJoinRequest;
(function (GroupJoinRequest) {
    GroupJoinRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
    }))); };
})(GroupJoinRequest || (GroupJoinRequest = {}));
export var GroupRole;
(function (GroupRole) {
    GroupRole.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupRole || (GroupRole = {}));
export var GroupMember;
(function (GroupMember) {
    GroupMember.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.identity && { identity: IdentityHandle.filterSensitiveLog(obj.identity)
    }))); };
})(GroupMember || (GroupMember = {}));
export var GroupPublicity;
(function (GroupPublicity) {
    GroupPublicity["CLOSED"] = "closed";
    GroupPublicity["OPEN"] = "open";
})(GroupPublicity || (GroupPublicity = {}));
export var GroupProfile;
(function (GroupProfile) {
    GroupProfile.filterSensitiveLog = function (obj) { return (__assign(__assign(__assign({}, obj), (obj.members && { members: obj.members.map(function (item) {
            return GroupMember.filterSensitiveLog(item);
        })
    })), (obj.joinRequests && { joinRequests: obj.joinRequests.map(function (item) {
            return GroupJoinRequest.filterSensitiveLog(item);
        })
    }))); };
})(GroupProfile || (GroupProfile = {}));
export var WatchResponse;
(function (WatchResponse) {
    WatchResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(WatchResponse || (WatchResponse = {}));
export var GetGroupProfileOutput;
(function (GetGroupProfileOutput) {
    GetGroupProfileOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.group && { group: GroupProfile.filterSensitiveLog(obj.group)
    }))); };
})(GetGroupProfileOutput || (GetGroupProfileOutput = {}));
export var GetGroupSummaryInput;
(function (GetGroupSummaryInput) {
    GetGroupSummaryInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGroupSummaryInput || (GetGroupSummaryInput = {}));
export var GroupSummary;
(function (GroupSummary) {
    GroupSummary.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupSummary || (GroupSummary = {}));
export var GetGroupSummaryOutput;
(function (GetGroupSummaryOutput) {
    GetGroupSummaryOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGroupSummaryOutput || (GetGroupSummaryOutput = {}));
export var GetSuggestedGroupsInput;
(function (GetSuggestedGroupsInput) {
    GetSuggestedGroupsInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetSuggestedGroupsInput || (GetSuggestedGroupsInput = {}));
export var GetSuggestedGroupsOutput;
(function (GetSuggestedGroupsOutput) {
    GetSuggestedGroupsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetSuggestedGroupsOutput || (GetSuggestedGroupsOutput = {}));
export var GroupAvatarUploadCompleteInput;
(function (GroupAvatarUploadCompleteInput) {
    GroupAvatarUploadCompleteInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupAvatarUploadCompleteInput || (GroupAvatarUploadCompleteInput = {}));
export var GroupAvatarUploadCompleteOutput;
(function (GroupAvatarUploadCompleteOutput) {
    GroupAvatarUploadCompleteOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupAvatarUploadCompleteOutput || (GroupAvatarUploadCompleteOutput = {}));
export var GroupAvatarUploadPrepareInput;
(function (GroupAvatarUploadPrepareInput) {
    GroupAvatarUploadPrepareInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupAvatarUploadPrepareInput || (GroupAvatarUploadPrepareInput = {}));
export var UploadPresignedRequest;
(function (UploadPresignedRequest) {
    UploadPresignedRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UploadPresignedRequest || (UploadPresignedRequest = {}));
export var GroupAvatarUploadPrepareOutput;
(function (GroupAvatarUploadPrepareOutput) {
    GroupAvatarUploadPrepareOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupAvatarUploadPrepareOutput || (GroupAvatarUploadPrepareOutput = {}));
export var JoinGroupInput;
(function (JoinGroupInput) {
    JoinGroupInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(JoinGroupInput || (JoinGroupInput = {}));
export var JoinGroupOutput;
(function (JoinGroupOutput) {
    JoinGroupOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(JoinGroupOutput || (JoinGroupOutput = {}));
export var LeaveGroupInput;
(function (LeaveGroupInput) {
    LeaveGroupInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LeaveGroupInput || (LeaveGroupInput = {}));
export var LeaveGroupOutput;
(function (LeaveGroupOutput) {
    LeaveGroupOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LeaveGroupOutput || (LeaveGroupOutput = {}));
export var RequestJoinGroupInput;
(function (RequestJoinGroupInput) {
    RequestJoinGroupInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RequestJoinGroupInput || (RequestJoinGroupInput = {}));
export var RequestJoinGroupOutput;
(function (RequestJoinGroupOutput) {
    RequestJoinGroupOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RequestJoinGroupOutput || (RequestJoinGroupOutput = {}));
export var ResolveGroupJoinRequestInput;
(function (ResolveGroupJoinRequestInput) {
    ResolveGroupJoinRequestInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ResolveGroupJoinRequestInput || (ResolveGroupJoinRequestInput = {}));
export var ResolveGroupJoinRequestOutput;
(function (ResolveGroupJoinRequestOutput) {
    ResolveGroupJoinRequestOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ResolveGroupJoinRequestOutput || (ResolveGroupJoinRequestOutput = {}));
export var SearchGroupsInput;
(function (SearchGroupsInput) {
    SearchGroupsInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SearchGroupsInput || (SearchGroupsInput = {}));
export var GroupHandle;
(function (GroupHandle) {
    GroupHandle.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupHandle || (GroupHandle = {}));
export var SearchGroupsOutput;
(function (SearchGroupsOutput) {
    SearchGroupsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SearchGroupsOutput || (SearchGroupsOutput = {}));
export var TransferGroupOwnershipInput;
(function (TransferGroupOwnershipInput) {
    TransferGroupOwnershipInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TransferGroupOwnershipInput || (TransferGroupOwnershipInput = {}));
export var TransferGroupOwnershipOutput;
(function (TransferGroupOwnershipOutput) {
    TransferGroupOwnershipOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TransferGroupOwnershipOutput || (TransferGroupOwnershipOutput = {}));
export var UpdateGroupProfileInput;
(function (UpdateGroupProfileInput) {
    UpdateGroupProfileInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateGroupProfileInput || (UpdateGroupProfileInput = {}));
export var UpdateGroupProfileOutput;
(function (UpdateGroupProfileOutput) {
    UpdateGroupProfileOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateGroupProfileOutput || (UpdateGroupProfileOutput = {}));
export var ValidateGroupProfileInput;
(function (ValidateGroupProfileInput) {
    ValidateGroupProfileInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateGroupProfileInput || (ValidateGroupProfileInput = {}));
export var ValidationError;
(function (ValidationError) {
    ValidationError.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidationError || (ValidationError = {}));
export var ValidateGroupProfileOutput;
(function (ValidateGroupProfileOutput) {
    ValidateGroupProfileOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateGroupProfileOutput || (ValidateGroupProfileOutput = {}));
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
