import { __extends } from "tslib";
import { IdentityServiceClient } from "./IdentityServiceClient";
import { AddFriendCommand, } from "./commands/AddFriendCommand";
import { GameIdentityLinkCommand, } from "./commands/GameIdentityLinkCommand";
import { GameIdentityLinkCompleteCommand, } from "./commands/GameIdentityLinkCompleteCommand";
import { GetActivitiesCommand, } from "./commands/GetActivitiesCommand";
import { GetEventsCommand, } from "./commands/GetEventsCommand";
import { GetIdentityGameLinkStatusCommand, } from "./commands/GetIdentityGameLinkStatusCommand";
import { GetIdentityProfileCommand, } from "./commands/GetIdentityProfileCommand";
import { GetIdentitySelfCommand, } from "./commands/GetIdentitySelfCommand";
import { IdentityAvatarUploadCompleteCommand, } from "./commands/IdentityAvatarUploadCompleteCommand";
import { IdentityAvatarUploadPrepareCommand, } from "./commands/IdentityAvatarUploadPrepareCommand";
import { RemoveFriendCommand, } from "./commands/RemoveFriendCommand";
import { RemoveIdentityGameActivityCommand, } from "./commands/RemoveIdentityGameActivityCommand";
import { RequestIdentityGameLinkCommand, } from "./commands/RequestIdentityGameLinkCommand";
import { SearchIdentitiesCommand, } from "./commands/SearchIdentitiesCommand";
import { SetIdentityGameActivityCommand, } from "./commands/SetIdentityGameActivityCommand";
import { SetupIdentityCommand, } from "./commands/SetupIdentityCommand";
import { SignupForBetaCommand, } from "./commands/SignupForBetaCommand";
import { UpdateIdentityProfileCommand, } from "./commands/UpdateIdentityProfileCommand";
import { UpdateIdentityStatusCommand, } from "./commands/UpdateIdentityStatusCommand";
import { ValidateIdentityProfileCommand, } from "./commands/ValidateIdentityProfileCommand";
var IdentityService = (function (_super) {
    __extends(IdentityService, _super);
    function IdentityService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IdentityService.prototype.addFriend = function (args, optionsOrCb, cb) {
        var command = new AddFriendCommand(args);
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
    IdentityService.prototype.gameIdentityLink = function (args, optionsOrCb, cb) {
        var command = new GameIdentityLinkCommand(args);
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
    IdentityService.prototype.gameIdentityLinkComplete = function (args, optionsOrCb, cb) {
        var command = new GameIdentityLinkCompleteCommand(args);
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
    IdentityService.prototype.getActivities = function (args, optionsOrCb, cb) {
        var command = new GetActivitiesCommand(args);
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
    IdentityService.prototype.getEvents = function (args, optionsOrCb, cb) {
        var command = new GetEventsCommand(args);
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
    IdentityService.prototype.getIdentityGameLinkStatus = function (args, optionsOrCb, cb) {
        var command = new GetIdentityGameLinkStatusCommand(args);
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
    IdentityService.prototype.getIdentityProfile = function (args, optionsOrCb, cb) {
        var command = new GetIdentityProfileCommand(args);
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
    IdentityService.prototype.getIdentitySelf = function (args, optionsOrCb, cb) {
        var command = new GetIdentitySelfCommand(args);
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
    IdentityService.prototype.identityAvatarUploadComplete = function (args, optionsOrCb, cb) {
        var command = new IdentityAvatarUploadCompleteCommand(args);
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
    IdentityService.prototype.identityAvatarUploadPrepare = function (args, optionsOrCb, cb) {
        var command = new IdentityAvatarUploadPrepareCommand(args);
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
    IdentityService.prototype.removeFriend = function (args, optionsOrCb, cb) {
        var command = new RemoveFriendCommand(args);
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
    IdentityService.prototype.removeIdentityGameActivity = function (args, optionsOrCb, cb) {
        var command = new RemoveIdentityGameActivityCommand(args);
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
    IdentityService.prototype.requestIdentityGameLink = function (args, optionsOrCb, cb) {
        var command = new RequestIdentityGameLinkCommand(args);
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
    IdentityService.prototype.searchIdentities = function (args, optionsOrCb, cb) {
        var command = new SearchIdentitiesCommand(args);
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
    IdentityService.prototype.setIdentityGameActivity = function (args, optionsOrCb, cb) {
        var command = new SetIdentityGameActivityCommand(args);
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
    IdentityService.prototype.setupIdentity = function (args, optionsOrCb, cb) {
        var command = new SetupIdentityCommand(args);
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
    IdentityService.prototype.signupForBeta = function (args, optionsOrCb, cb) {
        var command = new SignupForBetaCommand(args);
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
    IdentityService.prototype.updateIdentityProfile = function (args, optionsOrCb, cb) {
        var command = new UpdateIdentityProfileCommand(args);
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
    IdentityService.prototype.updateIdentityStatus = function (args, optionsOrCb, cb) {
        var command = new UpdateIdentityStatusCommand(args);
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
    IdentityService.prototype.validateIdentityProfile = function (args, optionsOrCb, cb) {
        var command = new ValidateIdentityProfileCommand(args);
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
    return IdentityService;
}(IdentityServiceClient));
export { IdentityService };
