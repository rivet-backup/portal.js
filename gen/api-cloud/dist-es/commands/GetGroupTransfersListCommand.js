import { __extends } from "tslib";
import { GetGroupTransfersListInput, GetGroupTransfersListOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetGroupTransfersListCommand, serializeAws_restJson1GetGroupTransfersListCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetGroupTransfersListCommand = (function (_super) {
    __extends(GetGroupTransfersListCommand, _super);
    function GetGroupTransfersListCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetGroupTransfersListCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "GetGroupTransfersListCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetGroupTransfersListInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetGroupTransfersListOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetGroupTransfersListCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetGroupTransfersListCommand(input, context);
    };
    GetGroupTransfersListCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetGroupTransfersListCommand(output, context);
    };
    return GetGroupTransfersListCommand;
}($Command));
export { GetGroupTransfersListCommand };
