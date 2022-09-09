import { __extends } from "tslib";
import { GetSuggestedGroupsInput, GetSuggestedGroupsOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetSuggestedGroupsCommand, serializeAws_restJson1GetSuggestedGroupsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetSuggestedGroupsCommand = (function (_super) {
    __extends(GetSuggestedGroupsCommand, _super);
    function GetSuggestedGroupsCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetSuggestedGroupsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "GetSuggestedGroupsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetSuggestedGroupsInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetSuggestedGroupsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetSuggestedGroupsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetSuggestedGroupsCommand(input, context);
    };
    GetSuggestedGroupsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetSuggestedGroupsCommand(output, context);
    };
    return GetSuggestedGroupsCommand;
}($Command));
export { GetSuggestedGroupsCommand };
