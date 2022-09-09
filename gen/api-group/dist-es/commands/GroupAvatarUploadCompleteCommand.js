import { __extends } from "tslib";
import { GroupAvatarUploadCompleteInput, GroupAvatarUploadCompleteOutput, } from "../models/models_0";
import { deserializeAws_restJson1GroupAvatarUploadCompleteCommand, serializeAws_restJson1GroupAvatarUploadCompleteCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GroupAvatarUploadCompleteCommand = (function (_super) {
    __extends(GroupAvatarUploadCompleteCommand, _super);
    function GroupAvatarUploadCompleteCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GroupAvatarUploadCompleteCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "GroupAvatarUploadCompleteCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GroupAvatarUploadCompleteInput.filterSensitiveLog,
            outputFilterSensitiveLog: GroupAvatarUploadCompleteOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GroupAvatarUploadCompleteCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GroupAvatarUploadCompleteCommand(input, context);
    };
    GroupAvatarUploadCompleteCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GroupAvatarUploadCompleteCommand(output, context);
    };
    return GroupAvatarUploadCompleteCommand;
}($Command));
export { GroupAvatarUploadCompleteCommand };
