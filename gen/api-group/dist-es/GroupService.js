import { __extends } from "tslib";
import { GroupServiceClient } from "./GroupServiceClient";
import { ConsumeGroupInviteCommand, } from "./commands/ConsumeGroupInviteCommand";
import { CreateGroupCommand, } from "./commands/CreateGroupCommand";
import { CreateGroupInviteCommand, } from "./commands/CreateGroupInviteCommand";
import { GetGroupProfileCommand, } from "./commands/GetGroupProfileCommand";
import { GetGroupSummaryCommand, } from "./commands/GetGroupSummaryCommand";
import { GetSuggestedGroupsCommand, } from "./commands/GetSuggestedGroupsCommand";
import { GroupAvatarUploadCompleteCommand, } from "./commands/GroupAvatarUploadCompleteCommand";
import { GroupAvatarUploadPrepareCommand, } from "./commands/GroupAvatarUploadPrepareCommand";
import { JoinGroupCommand, } from "./commands/JoinGroupCommand";
import { LeaveGroupCommand, } from "./commands/LeaveGroupCommand";
import { RequestJoinGroupCommand, } from "./commands/RequestJoinGroupCommand";
import { ResolveGroupJoinRequestCommand, } from "./commands/ResolveGroupJoinRequestCommand";
import { SearchGroupsCommand, } from "./commands/SearchGroupsCommand";
import { TransferGroupOwnershipCommand, } from "./commands/TransferGroupOwnershipCommand";
import { UpdateGroupProfileCommand, } from "./commands/UpdateGroupProfileCommand";
import { ValidateGroupProfileCommand, } from "./commands/ValidateGroupProfileCommand";
var GroupService = (function (_super) {
    __extends(GroupService, _super);
    function GroupService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupService.prototype.consumeGroupInvite = function (args, optionsOrCb, cb) {
        var command = new ConsumeGroupInviteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.createGroup = function (args, optionsOrCb, cb) {
        var command = new CreateGroupCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.createGroupInvite = function (args, optionsOrCb, cb) {
        var command = new CreateGroupInviteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.getGroupProfile = function (args, optionsOrCb, cb) {
        var command = new GetGroupProfileCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.getGroupSummary = function (args, optionsOrCb, cb) {
        var command = new GetGroupSummaryCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.getSuggestedGroups = function (args, optionsOrCb, cb) {
        var command = new GetSuggestedGroupsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.groupAvatarUploadComplete = function (args, optionsOrCb, cb) {
        var command = new GroupAvatarUploadCompleteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.groupAvatarUploadPrepare = function (args, optionsOrCb, cb) {
        var command = new GroupAvatarUploadPrepareCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.joinGroup = function (args, optionsOrCb, cb) {
        var command = new JoinGroupCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.leaveGroup = function (args, optionsOrCb, cb) {
        var command = new LeaveGroupCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.requestJoinGroup = function (args, optionsOrCb, cb) {
        var command = new RequestJoinGroupCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.resolveGroupJoinRequest = function (args, optionsOrCb, cb) {
        var command = new ResolveGroupJoinRequestCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.searchGroups = function (args, optionsOrCb, cb) {
        var command = new SearchGroupsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.transferGroupOwnership = function (args, optionsOrCb, cb) {
        var command = new TransferGroupOwnershipCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.updateGroupProfile = function (args, optionsOrCb, cb) {
        var command = new UpdateGroupProfileCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    GroupService.prototype.validateGroupProfile = function (args, optionsOrCb, cb) {
        var command = new ValidateGroupProfileCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    return GroupService;
}(GroupServiceClient));
export { GroupService };
