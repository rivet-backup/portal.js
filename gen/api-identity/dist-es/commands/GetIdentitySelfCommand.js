import { __extends } from "tslib";
import { GetIdentitySelfInput, GetIdentitySelfOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetIdentitySelfCommand, serializeAws_restJson1GetIdentitySelfCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetIdentitySelfCommand = (function (_super) {
    __extends(GetIdentitySelfCommand, _super);
    function GetIdentitySelfCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetIdentitySelfCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "GetIdentitySelfCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetIdentitySelfInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetIdentitySelfOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetIdentitySelfCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetIdentitySelfCommand(input, context);
    };
    GetIdentitySelfCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetIdentitySelfCommand(output, context);
    };
    return GetIdentitySelfCommand;
}($Command));
export { GetIdentitySelfCommand };
