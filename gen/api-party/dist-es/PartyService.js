import { __extends } from "tslib";
import { PartyServiceClient } from "./PartyServiceClient";
import { CreatePartyCommand, } from "./commands/CreatePartyCommand";
import { CreatePartyInviteCommand, } from "./commands/CreatePartyInviteCommand";
import { FindMatchmakerLobbyCommand, } from "./commands/FindMatchmakerLobbyCommand";
import { GetPartyFromInviteCommand, } from "./commands/GetPartyFromInviteCommand";
import { GetPartySelfSummaryCommand, } from "./commands/GetPartySelfSummaryCommand";
import { GetPartySummaryCommand, } from "./commands/GetPartySummaryCommand";
import { JoinMatchmakerLobbyCommand, } from "./commands/JoinMatchmakerLobbyCommand";
import { JoinPartyCommand, } from "./commands/JoinPartyCommand";
import { KickMemberCommand, } from "./commands/KickMemberCommand";
import { LeavePartyCommand, } from "./commands/LeavePartyCommand";
import { RequestMatchmakerPlayerCommand, } from "./commands/RequestMatchmakerPlayerCommand";
import { RevokePartyInviteCommand, } from "./commands/RevokePartyInviteCommand";
import { SendInviteChatMessageCommand, } from "./commands/SendInviteChatMessageCommand";
import { SetActivityIdleCommand, } from "./commands/SetActivityIdleCommand";
import { TransferOwnershipCommand, } from "./commands/TransferOwnershipCommand";
var PartyService = (function (_super) {
    __extends(PartyService, _super);
    function PartyService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PartyService.prototype.createParty = function (args, optionsOrCb, cb) {
        var command = new CreatePartyCommand(args);
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
    PartyService.prototype.createPartyInvite = function (args, optionsOrCb, cb) {
        var command = new CreatePartyInviteCommand(args);
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
    PartyService.prototype.getPartyFromInvite = function (args, optionsOrCb, cb) {
        var command = new GetPartyFromInviteCommand(args);
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
    PartyService.prototype.getPartySelfSummary = function (args, optionsOrCb, cb) {
        var command = new GetPartySelfSummaryCommand(args);
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
    PartyService.prototype.getPartySummary = function (args, optionsOrCb, cb) {
        var command = new GetPartySummaryCommand(args);
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
    PartyService.prototype.joinParty = function (args, optionsOrCb, cb) {
        var command = new JoinPartyCommand(args);
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
    PartyService.prototype.kickMember = function (args, optionsOrCb, cb) {
        var command = new KickMemberCommand(args);
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
    PartyService.prototype.leaveParty = function (args, optionsOrCb, cb) {
        var command = new LeavePartyCommand(args);
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
    PartyService.prototype.revokePartyInvite = function (args, optionsOrCb, cb) {
        var command = new RevokePartyInviteCommand(args);
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
    PartyService.prototype.sendInviteChatMessage = function (args, optionsOrCb, cb) {
        var command = new SendInviteChatMessageCommand(args);
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
    PartyService.prototype.transferOwnership = function (args, optionsOrCb, cb) {
        var command = new TransferOwnershipCommand(args);
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
    PartyService.prototype.findMatchmakerLobby = function (args, optionsOrCb, cb) {
        var command = new FindMatchmakerLobbyCommand(args);
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
    PartyService.prototype.joinMatchmakerLobby = function (args, optionsOrCb, cb) {
        var command = new JoinMatchmakerLobbyCommand(args);
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
    PartyService.prototype.requestMatchmakerPlayer = function (args, optionsOrCb, cb) {
        var command = new RequestMatchmakerPlayerCommand(args);
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
    PartyService.prototype.setActivityIdle = function (args, optionsOrCb, cb) {
        var command = new SetActivityIdleCommand(args);
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
    return PartyService;
}(PartyServiceClient));
export { PartyService };
