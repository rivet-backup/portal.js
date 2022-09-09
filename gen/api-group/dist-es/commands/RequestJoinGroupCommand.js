import { __extends } from "tslib";
import { RequestJoinGroupInput, RequestJoinGroupOutput, } from "../models/models_0";
import { deserializeAws_restJson1RequestJoinGroupCommand, serializeAws_restJson1RequestJoinGroupCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var RequestJoinGroupCommand = (function (_super) {
    __extends(RequestJoinGroupCommand, _super);
    function RequestJoinGroupCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    RequestJoinGroupCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "RequestJoinGroupCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: RequestJoinGroupInput.filterSensitiveLog,
            outputFilterSensitiveLog: RequestJoinGroupOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    RequestJoinGroupCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1RequestJoinGroupCommand(input, context);
    };
    RequestJoinGroupCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1RequestJoinGroupCommand(output, context);
    };
    return RequestJoinGroupCommand;
}($Command));
export { RequestJoinGroupCommand };
