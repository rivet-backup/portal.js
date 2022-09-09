import { __extends } from "tslib";
import { SetActivityIdleInput, SetActivityIdleOutput, } from "../models/models_0";
import { deserializeAws_restJson1SetActivityIdleCommand, serializeAws_restJson1SetActivityIdleCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var SetActivityIdleCommand = (function (_super) {
    __extends(SetActivityIdleCommand, _super);
    function SetActivityIdleCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    SetActivityIdleCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PartyServiceClient";
        var commandName = "SetActivityIdleCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SetActivityIdleInput.filterSensitiveLog,
            outputFilterSensitiveLog: SetActivityIdleOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SetActivityIdleCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1SetActivityIdleCommand(input, context);
    };
    SetActivityIdleCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1SetActivityIdleCommand(output, context);
    };
    return SetActivityIdleCommand;
}($Command));
export { SetActivityIdleCommand };
