import { __extends } from "tslib";
import { GameIdentityLinkInput, GameIdentityLinkOutput, } from "../models/models_0";
import { deserializeAws_restJson1GameIdentityLinkCommand, serializeAws_restJson1GameIdentityLinkCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GameIdentityLinkCommand = (function (_super) {
    __extends(GameIdentityLinkCommand, _super);
    function GameIdentityLinkCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GameIdentityLinkCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "GameIdentityLinkCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GameIdentityLinkInput.filterSensitiveLog,
            outputFilterSensitiveLog: GameIdentityLinkOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GameIdentityLinkCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GameIdentityLinkCommand(input, context);
    };
    GameIdentityLinkCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GameIdentityLinkCommand(output, context);
    };
    return GameIdentityLinkCommand;
}($Command));
export { GameIdentityLinkCommand };
