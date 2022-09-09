import { __extends } from "tslib";
import { UpdateThreadReadInput, UpdateThreadReadOutput, } from "../models/models_0";
import { deserializeAws_restJson1UpdateThreadReadCommand, serializeAws_restJson1UpdateThreadReadCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var UpdateThreadReadCommand = (function (_super) {
    __extends(UpdateThreadReadCommand, _super);
    function UpdateThreadReadCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    UpdateThreadReadCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ChatServiceClient";
        var commandName = "UpdateThreadReadCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UpdateThreadReadInput.filterSensitiveLog,
            outputFilterSensitiveLog: UpdateThreadReadOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UpdateThreadReadCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1UpdateThreadReadCommand(input, context);
    };
    UpdateThreadReadCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1UpdateThreadReadCommand(output, context);
    };
    return UpdateThreadReadCommand;
}($Command));
export { UpdateThreadReadCommand };
