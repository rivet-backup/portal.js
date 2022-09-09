import { __extends } from "tslib";
import { JoinMatchmakerLobbyInput, JoinMatchmakerLobbyOutput, } from "../models/models_0";
import { deserializeAws_restJson1JoinMatchmakerLobbyCommand, serializeAws_restJson1JoinMatchmakerLobbyCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var JoinMatchmakerLobbyCommand = (function (_super) {
    __extends(JoinMatchmakerLobbyCommand, _super);
    function JoinMatchmakerLobbyCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    JoinMatchmakerLobbyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PartyServiceClient";
        var commandName = "JoinMatchmakerLobbyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: JoinMatchmakerLobbyInput.filterSensitiveLog,
            outputFilterSensitiveLog: JoinMatchmakerLobbyOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    JoinMatchmakerLobbyCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1JoinMatchmakerLobbyCommand(input, context);
    };
    JoinMatchmakerLobbyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1JoinMatchmakerLobbyCommand(output, context);
    };
    return JoinMatchmakerLobbyCommand;
}($Command));
export { JoinMatchmakerLobbyCommand };
