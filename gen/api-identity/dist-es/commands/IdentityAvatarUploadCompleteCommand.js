import { __extends } from "tslib";
import { IdentityAvatarUploadCompleteInput, IdentityAvatarUploadCompleteOutput, } from "../models/models_0";
import { deserializeAws_restJson1IdentityAvatarUploadCompleteCommand, serializeAws_restJson1IdentityAvatarUploadCompleteCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var IdentityAvatarUploadCompleteCommand = (function (_super) {
    __extends(IdentityAvatarUploadCompleteCommand, _super);
    function IdentityAvatarUploadCompleteCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    IdentityAvatarUploadCompleteCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "IdentityAvatarUploadCompleteCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: IdentityAvatarUploadCompleteInput.filterSensitiveLog,
            outputFilterSensitiveLog: IdentityAvatarUploadCompleteOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    IdentityAvatarUploadCompleteCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1IdentityAvatarUploadCompleteCommand(input, context);
    };
    IdentityAvatarUploadCompleteCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1IdentityAvatarUploadCompleteCommand(output, context);
    };
    return IdentityAvatarUploadCompleteCommand;
}($Command));
export { IdentityAvatarUploadCompleteCommand };
