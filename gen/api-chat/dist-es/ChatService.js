import { __extends } from "tslib";
import { ChatServiceClient } from "./ChatServiceClient";
import { GetIdentityDirectChatCommand, } from "./commands/GetIdentityDirectChatCommand";
import { GetThreadHistoryCommand, } from "./commands/GetThreadHistoryCommand";
import { GetThreadLiveCommand, } from "./commands/GetThreadLiveCommand";
import { GetThreadTopicCommand, } from "./commands/GetThreadTopicCommand";
import { SendChatMessageCommand, } from "./commands/SendChatMessageCommand";
import { SendChatMessageWithTopicCommand, } from "./commands/SendChatMessageWithTopicCommand";
import { UpdateThreadReadCommand, } from "./commands/UpdateThreadReadCommand";
import { UpdateTypingStatusCommand, } from "./commands/UpdateTypingStatusCommand";
var ChatService = (function (_super) {
    __extends(ChatService, _super);
    function ChatService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatService.prototype.getIdentityDirectChat = function (args, optionsOrCb, cb) {
        var command = new GetIdentityDirectChatCommand(args);
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
    ChatService.prototype.getThreadHistory = function (args, optionsOrCb, cb) {
        var command = new GetThreadHistoryCommand(args);
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
    ChatService.prototype.getThreadLive = function (args, optionsOrCb, cb) {
        var command = new GetThreadLiveCommand(args);
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
    ChatService.prototype.getThreadTopic = function (args, optionsOrCb, cb) {
        var command = new GetThreadTopicCommand(args);
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
    ChatService.prototype.sendChatMessage = function (args, optionsOrCb, cb) {
        var command = new SendChatMessageCommand(args);
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
    ChatService.prototype.sendChatMessageWithTopic = function (args, optionsOrCb, cb) {
        var command = new SendChatMessageWithTopicCommand(args);
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
    ChatService.prototype.updateThreadRead = function (args, optionsOrCb, cb) {
        var command = new UpdateThreadReadCommand(args);
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
    ChatService.prototype.updateTypingStatus = function (args, optionsOrCb, cb) {
        var command = new UpdateTypingStatusCommand(args);
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
    return ChatService;
}(ChatServiceClient));
export { ChatService };
