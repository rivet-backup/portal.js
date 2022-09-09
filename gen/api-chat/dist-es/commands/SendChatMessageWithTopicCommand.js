import { __extends } from "tslib";
import { SendChatMessageWithTopicInput, SendChatMessageWithTopicOutput, } from "../models/models_0";
import { deserializeAws_restJson1SendChatMessageWithTopicCommand, serializeAws_restJson1SendChatMessageWithTopicCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var SendChatMessageWithTopicCommand = (function (_super) {
    __extends(SendChatMessageWithTopicCommand, _super);
    function SendChatMessageWithTopicCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    SendChatMessageWithTopicCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ChatServiceClient";
        var commandName = "SendChatMessageWithTopicCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SendChatMessageWithTopicInput.filterSensitiveLog,
            outputFilterSensitiveLog: SendChatMessageWithTopicOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SendChatMessageWithTopicCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1SendChatMessageWithTopicCommand(input, context);
    };
    SendChatMessageWithTopicCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1SendChatMessageWithTopicCommand(output, context);
    };
    return SendChatMessageWithTopicCommand;
}($Command));
export { SendChatMessageWithTopicCommand };
