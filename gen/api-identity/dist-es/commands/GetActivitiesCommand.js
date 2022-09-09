import { __extends } from "tslib";
import { GetActivitiesInput, GetActivitiesOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetActivitiesCommand, serializeAws_restJson1GetActivitiesCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetActivitiesCommand = (function (_super) {
    __extends(GetActivitiesCommand, _super);
    function GetActivitiesCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetActivitiesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "GetActivitiesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetActivitiesInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetActivitiesOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetActivitiesCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetActivitiesCommand(input, context);
    };
    GetActivitiesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetActivitiesCommand(output, context);
    };
    return GetActivitiesCommand;
}($Command));
export { GetActivitiesCommand };
