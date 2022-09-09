import { __extends } from "tslib";
import { UpdateNamespaceDomainInput, UpdateNamespaceDomainOutput, } from "../models/models_0";
import { deserializeAws_restJson1UpdateNamespaceDomainCommand, serializeAws_restJson1UpdateNamespaceDomainCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var UpdateNamespaceDomainCommand = (function (_super) {
    __extends(UpdateNamespaceDomainCommand, _super);
    function UpdateNamespaceDomainCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    UpdateNamespaceDomainCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "UpdateNamespaceDomainCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UpdateNamespaceDomainInput.filterSensitiveLog,
            outputFilterSensitiveLog: UpdateNamespaceDomainOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UpdateNamespaceDomainCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1UpdateNamespaceDomainCommand(input, context);
    };
    UpdateNamespaceDomainCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1UpdateNamespaceDomainCommand(output, context);
    };
    return UpdateNamespaceDomainCommand;
}($Command));
export { UpdateNamespaceDomainCommand };
