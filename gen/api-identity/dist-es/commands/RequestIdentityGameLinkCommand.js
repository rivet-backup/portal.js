import { __extends } from "tslib";
import { RequestIdentityGameLinkInput, RequestIdentityGameLinkOutput, } from "../models/models_0";
import { deserializeAws_restJson1RequestIdentityGameLinkCommand, serializeAws_restJson1RequestIdentityGameLinkCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var RequestIdentityGameLinkCommand = (function (_super) {
    __extends(RequestIdentityGameLinkCommand, _super);
    function RequestIdentityGameLinkCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    RequestIdentityGameLinkCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "RequestIdentityGameLinkCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: RequestIdentityGameLinkInput.filterSensitiveLog,
            outputFilterSensitiveLog: RequestIdentityGameLinkOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    RequestIdentityGameLinkCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1RequestIdentityGameLinkCommand(input, context);
    };
    RequestIdentityGameLinkCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1RequestIdentityGameLinkCommand(output, context);
    };
    return RequestIdentityGameLinkCommand;
}($Command));
export { RequestIdentityGameLinkCommand };
