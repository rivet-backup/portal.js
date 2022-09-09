import { __extends } from "tslib";
import { AddFriendInput, AddFriendOutput, } from "../models/models_0";
import { deserializeAws_restJson1AddFriendCommand, serializeAws_restJson1AddFriendCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var AddFriendCommand = (function (_super) {
    __extends(AddFriendCommand, _super);
    function AddFriendCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    AddFriendCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "AddFriendCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: AddFriendInput.filterSensitiveLog,
            outputFilterSensitiveLog: AddFriendOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    AddFriendCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1AddFriendCommand(input, context);
    };
    AddFriendCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1AddFriendCommand(output, context);
    };
    return AddFriendCommand;
}($Command));
export { AddFriendCommand };
