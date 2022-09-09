import { __extends } from "tslib";
import { GetEventsInput, GetEventsOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetEventsCommand, serializeAws_restJson1GetEventsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetEventsCommand = (function (_super) {
    __extends(GetEventsCommand, _super);
    function GetEventsCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetEventsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "GetEventsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetEventsInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetEventsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetEventsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetEventsCommand(input, context);
    };
    GetEventsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetEventsCommand(output, context);
    };
    return GetEventsCommand;
}($Command));
export { GetEventsCommand };
