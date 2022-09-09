import { __extends } from "tslib";
import { FindMatchmakerLobbyInput, FindMatchmakerLobbyOutput, } from "../models/models_0";
import { deserializeAws_restJson1FindMatchmakerLobbyCommand, serializeAws_restJson1FindMatchmakerLobbyCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var FindMatchmakerLobbyCommand = (function (_super) {
    __extends(FindMatchmakerLobbyCommand, _super);
    function FindMatchmakerLobbyCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    FindMatchmakerLobbyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PartyServiceClient";
        var commandName = "FindMatchmakerLobbyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: FindMatchmakerLobbyInput.filterSensitiveLog,
            outputFilterSensitiveLog: FindMatchmakerLobbyOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    FindMatchmakerLobbyCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1FindMatchmakerLobbyCommand(input, context);
    };
    FindMatchmakerLobbyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1FindMatchmakerLobbyCommand(output, context);
    };
    return FindMatchmakerLobbyCommand;
}($Command));
export { FindMatchmakerLobbyCommand };
