import { __extends } from "tslib";
import { UpdateTypingStatusInput, UpdateTypingStatusOutput, } from "../models/models_0";
import { deserializeAws_restJson1UpdateTypingStatusCommand, serializeAws_restJson1UpdateTypingStatusCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var UpdateTypingStatusCommand = (function (_super) {
    __extends(UpdateTypingStatusCommand, _super);
    function UpdateTypingStatusCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    UpdateTypingStatusCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ChatServiceClient";
        var commandName = "UpdateTypingStatusCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UpdateTypingStatusInput.filterSensitiveLog,
            outputFilterSensitiveLog: UpdateTypingStatusOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UpdateTypingStatusCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1UpdateTypingStatusCommand(input, context);
    };
    UpdateTypingStatusCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1UpdateTypingStatusCommand(output, context);
    };
    return UpdateTypingStatusCommand;
}($Command));
export { UpdateTypingStatusCommand };
