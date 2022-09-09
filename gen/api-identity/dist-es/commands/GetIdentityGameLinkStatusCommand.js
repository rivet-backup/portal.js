import { __extends } from "tslib";
import { GetIdentityGameLinkStatusInput, GetIdentityGameLinkStatusOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetIdentityGameLinkStatusCommand, serializeAws_restJson1GetIdentityGameLinkStatusCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetIdentityGameLinkStatusCommand = (function (_super) {
    __extends(GetIdentityGameLinkStatusCommand, _super);
    function GetIdentityGameLinkStatusCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetIdentityGameLinkStatusCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "GetIdentityGameLinkStatusCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetIdentityGameLinkStatusInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetIdentityGameLinkStatusOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetIdentityGameLinkStatusCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetIdentityGameLinkStatusCommand(input, context);
    };
    GetIdentityGameLinkStatusCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetIdentityGameLinkStatusCommand(output, context);
    };
    return GetIdentityGameLinkStatusCommand;
}($Command));
export { GetIdentityGameLinkStatusCommand };
