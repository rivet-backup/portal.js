import { __extends } from "tslib";
import { GroupAvatarUploadPrepareInput, GroupAvatarUploadPrepareOutput, } from "../models/models_0";
import { deserializeAws_restJson1GroupAvatarUploadPrepareCommand, serializeAws_restJson1GroupAvatarUploadPrepareCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GroupAvatarUploadPrepareCommand = (function (_super) {
    __extends(GroupAvatarUploadPrepareCommand, _super);
    function GroupAvatarUploadPrepareCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GroupAvatarUploadPrepareCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "GroupAvatarUploadPrepareCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GroupAvatarUploadPrepareInput.filterSensitiveLog,
            outputFilterSensitiveLog: GroupAvatarUploadPrepareOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GroupAvatarUploadPrepareCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GroupAvatarUploadPrepareCommand(input, context);
    };
    GroupAvatarUploadPrepareCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GroupAvatarUploadPrepareCommand(output, context);
    };
    return GroupAvatarUploadPrepareCommand;
}($Command));
export { GroupAvatarUploadPrepareCommand };
