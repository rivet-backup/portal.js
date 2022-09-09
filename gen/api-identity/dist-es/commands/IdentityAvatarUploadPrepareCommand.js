import { __extends } from "tslib";
import { IdentityAvatarUploadPrepareInput, IdentityAvatarUploadPrepareOutput, } from "../models/models_0";
import { deserializeAws_restJson1IdentityAvatarUploadPrepareCommand, serializeAws_restJson1IdentityAvatarUploadPrepareCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var IdentityAvatarUploadPrepareCommand = (function (_super) {
    __extends(IdentityAvatarUploadPrepareCommand, _super);
    function IdentityAvatarUploadPrepareCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    IdentityAvatarUploadPrepareCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "IdentityAvatarUploadPrepareCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: IdentityAvatarUploadPrepareInput.filterSensitiveLog,
            outputFilterSensitiveLog: IdentityAvatarUploadPrepareOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    IdentityAvatarUploadPrepareCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1IdentityAvatarUploadPrepareCommand(input, context);
    };
    IdentityAvatarUploadPrepareCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1IdentityAvatarUploadPrepareCommand(output, context);
    };
    return IdentityAvatarUploadPrepareCommand;
}($Command));
export { IdentityAvatarUploadPrepareCommand };
