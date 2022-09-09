import { __extends } from "tslib";
import { GetThreadLiveInput, GetThreadLiveOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetThreadLiveCommand, serializeAws_restJson1GetThreadLiveCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetThreadLiveCommand = (function (_super) {
    __extends(GetThreadLiveCommand, _super);
    function GetThreadLiveCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetThreadLiveCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ChatServiceClient";
        var commandName = "GetThreadLiveCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetThreadLiveInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetThreadLiveOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetThreadLiveCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetThreadLiveCommand(input, context);
    };
    GetThreadLiveCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetThreadLiveCommand(output, context);
    };
    return GetThreadLiveCommand;
}($Command));
export { GetThreadLiveCommand };
