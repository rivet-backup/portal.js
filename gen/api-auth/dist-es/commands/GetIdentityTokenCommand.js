import { __extends } from "tslib";
import { GetIdentityTokenInput, GetIdentityTokenOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetIdentityTokenCommand, serializeAws_restJson1GetIdentityTokenCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetIdentityTokenCommand = (function (_super) {
    __extends(GetIdentityTokenCommand, _super);
    function GetIdentityTokenCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetIdentityTokenCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "AuthServiceClient";
        var commandName = "GetIdentityTokenCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetIdentityTokenInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetIdentityTokenOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetIdentityTokenCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetIdentityTokenCommand(input, context);
    };
    GetIdentityTokenCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetIdentityTokenCommand(output, context);
    };
    return GetIdentityTokenCommand;
}($Command));
export { GetIdentityTokenCommand };
