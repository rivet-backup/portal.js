import { __extends } from "tslib";
import { GetSuggestedBlogsInput, GetSuggestedBlogsOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetSuggestedBlogsCommand, serializeAws_restJson1GetSuggestedBlogsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetSuggestedBlogsCommand = (function (_super) {
    __extends(GetSuggestedBlogsCommand, _super);
    function GetSuggestedBlogsCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetSuggestedBlogsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PortalServiceClient";
        var commandName = "GetSuggestedBlogsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetSuggestedBlogsInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetSuggestedBlogsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetSuggestedBlogsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetSuggestedBlogsCommand(input, context);
    };
    GetSuggestedBlogsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetSuggestedBlogsCommand(output, context);
    };
    return GetSuggestedBlogsCommand;
}($Command));
export { GetSuggestedBlogsCommand };
