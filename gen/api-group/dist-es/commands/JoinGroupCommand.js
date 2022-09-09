import { __extends } from "tslib";
import { JoinGroupInput, JoinGroupOutput, } from "../models/models_0";
import { deserializeAws_restJson1JoinGroupCommand, serializeAws_restJson1JoinGroupCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var JoinGroupCommand = (function (_super) {
    __extends(JoinGroupCommand, _super);
    function JoinGroupCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    JoinGroupCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "JoinGroupCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: JoinGroupInput.filterSensitiveLog,
            outputFilterSensitiveLog: JoinGroupOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    JoinGroupCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1JoinGroupCommand(input, context);
    };
    JoinGroupCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1JoinGroupCommand(output, context);
    };
    return JoinGroupCommand;
}($Command));
export { JoinGroupCommand };
