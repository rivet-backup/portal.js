import { __extends } from "tslib";
import { TransferOwnershipInput, TransferOwnershipOutput, } from "../models/models_0";
import { deserializeAws_restJson1TransferOwnershipCommand, serializeAws_restJson1TransferOwnershipCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var TransferOwnershipCommand = (function (_super) {
    __extends(TransferOwnershipCommand, _super);
    function TransferOwnershipCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    TransferOwnershipCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PartyServiceClient";
        var commandName = "TransferOwnershipCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: TransferOwnershipInput.filterSensitiveLog,
            outputFilterSensitiveLog: TransferOwnershipOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    TransferOwnershipCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1TransferOwnershipCommand(input, context);
    };
    TransferOwnershipCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1TransferOwnershipCommand(output, context);
    };
    return TransferOwnershipCommand;
}($Command));
export { TransferOwnershipCommand };
