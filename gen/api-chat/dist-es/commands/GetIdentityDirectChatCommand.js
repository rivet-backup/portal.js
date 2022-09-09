import { __extends } from "tslib";
import { GetIdentityDirectChatInput, GetIdentityDirectChatOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetIdentityDirectChatCommand, serializeAws_restJson1GetIdentityDirectChatCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetIdentityDirectChatCommand = (function (_super) {
    __extends(GetIdentityDirectChatCommand, _super);
    function GetIdentityDirectChatCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetIdentityDirectChatCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ChatServiceClient";
        var commandName = "GetIdentityDirectChatCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetIdentityDirectChatInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetIdentityDirectChatOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetIdentityDirectChatCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetIdentityDirectChatCommand(input, context);
    };
    GetIdentityDirectChatCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetIdentityDirectChatCommand(output, context);
    };
    return GetIdentityDirectChatCommand;
}($Command));
export { GetIdentityDirectChatCommand };
