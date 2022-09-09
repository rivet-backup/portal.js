import { __extends } from "tslib";
import { CloudServiceClient } from "./CloudServiceClient";
import { CompleteUploadCommand, } from "./commands/CompleteUploadCommand";
import { ConvertGroupCommand, } from "./commands/ConvertGroupCommand";
import { CreateCloudTokenCommand, } from "./commands/CreateCloudTokenCommand";
import { CreateGameBuildCommand, } from "./commands/CreateGameBuildCommand";
import { CreateGameCdnSiteCommand, } from "./commands/CreateGameCdnSiteCommand";
import { CreateGameCommand, } from "./commands/CreateGameCommand";
import { CreateGameNamespaceCommand, } from "./commands/CreateGameNamespaceCommand";
import { CreateGameNamespaceTokenDevelopmentCommand, } from "./commands/CreateGameNamespaceTokenDevelopmentCommand";
import { CreateGameNamespaceTokenPublicCommand, } from "./commands/CreateGameNamespaceTokenPublicCommand";
import { CreateGameVersionCommand, } from "./commands/CreateGameVersionCommand";
import { DeleteMatchmakerLobbyCommand, } from "./commands/DeleteMatchmakerLobbyCommand";
import { ExportMatchmakerLobbyHistoryCommand, } from "./commands/ExportMatchmakerLobbyHistoryCommand";
import { GameBannerUploadCompleteCommand, } from "./commands/GameBannerUploadCompleteCommand";
import { GameBannerUploadPrepareCommand, } from "./commands/GameBannerUploadPrepareCommand";
import { GameLogoUploadCompleteCommand, } from "./commands/GameLogoUploadCompleteCommand";
import { GameLogoUploadPrepareCommand, } from "./commands/GameLogoUploadPrepareCommand";
import { GetGameByIdCommand, } from "./commands/GetGameByIdCommand";
import { GetGameNamespaceByIdCommand, } from "./commands/GetGameNamespaceByIdCommand";
import { GetGameVersionByIdCommand, } from "./commands/GetGameVersionByIdCommand";
import { GetGamesCommand, } from "./commands/GetGamesCommand";
import { GetGroupBillingCommand, } from "./commands/GetGroupBillingCommand";
import { GetGroupInvoicesListCommand, } from "./commands/GetGroupInvoicesListCommand";
import { GetGroupPaymentsListCommand, } from "./commands/GetGroupPaymentsListCommand";
import { GetGroupTransfersListCommand, } from "./commands/GetGroupTransfersListCommand";
import { GetNamespaceAnalyticsMatchmakerLiveCommand, } from "./commands/GetNamespaceAnalyticsMatchmakerLiveCommand";
import { GetNamespaceLobbyCommand, } from "./commands/GetNamespaceLobbyCommand";
import { GetRayPerfLogsCommand, } from "./commands/GetRayPerfLogsCommand";
import { GetRegionTiersCommand, } from "./commands/GetRegionTiersCommand";
import { GroupBillingCheckoutCommand, } from "./commands/GroupBillingCheckoutCommand";
import { InspectCommand, } from "./commands/InspectCommand";
import { ListGameBuildsCommand, } from "./commands/ListGameBuildsCommand";
import { ListGameCdnSitesCommand, } from "./commands/ListGameCdnSitesCommand";
import { ListNamespaceLobbiesCommand, } from "./commands/ListNamespaceLobbiesCommand";
import { RemoveNamespaceDomainCommand, } from "./commands/RemoveNamespaceDomainCommand";
import { ToggleNamespaceDomainPublicAuthCommand, } from "./commands/ToggleNamespaceDomainPublicAuthCommand";
import { UpdateGameNamespaceMatchmakerConfigCommand, } from "./commands/UpdateGameNamespaceMatchmakerConfigCommand";
import { UpdateGameNamespaceVersionCommand, } from "./commands/UpdateGameNamespaceVersionCommand";
import { UpdateNamespaceDomainCommand, } from "./commands/UpdateNamespaceDomainCommand";
import { ValidateGameCommand, } from "./commands/ValidateGameCommand";
import { ValidateGameNamespaceCommand, } from "./commands/ValidateGameNamespaceCommand";
import { ValidateGameNamespaceMatchmakerConfigCommand, } from "./commands/ValidateGameNamespaceMatchmakerConfigCommand";
import { ValidateGameNamespaceTokenDevelopmentCommand, } from "./commands/ValidateGameNamespaceTokenDevelopmentCommand";
import { ValidateGameVersionCommand, } from "./commands/ValidateGameVersionCommand";
import { ValidateGroupCommand, } from "./commands/ValidateGroupCommand";
var CloudService = (function (_super) {
    __extends(CloudService, _super);
    function CloudService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CloudService.prototype.completeUpload = function (args, optionsOrCb, cb) {
        var command = new CompleteUploadCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.convertGroup = function (args, optionsOrCb, cb) {
        var command = new ConvertGroupCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.createCloudToken = function (args, optionsOrCb, cb) {
        var command = new CreateCloudTokenCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.createGame = function (args, optionsOrCb, cb) {
        var command = new CreateGameCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.createGameBuild = function (args, optionsOrCb, cb) {
        var command = new CreateGameBuildCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.createGameCdnSite = function (args, optionsOrCb, cb) {
        var command = new CreateGameCdnSiteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.createGameNamespace = function (args, optionsOrCb, cb) {
        var command = new CreateGameNamespaceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.createGameNamespaceTokenDevelopment = function (args, optionsOrCb, cb) {
        var command = new CreateGameNamespaceTokenDevelopmentCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.createGameNamespaceTokenPublic = function (args, optionsOrCb, cb) {
        var command = new CreateGameNamespaceTokenPublicCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.createGameVersion = function (args, optionsOrCb, cb) {
        var command = new CreateGameVersionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.deleteMatchmakerLobby = function (args, optionsOrCb, cb) {
        var command = new DeleteMatchmakerLobbyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.exportMatchmakerLobbyHistory = function (args, optionsOrCb, cb) {
        var command = new ExportMatchmakerLobbyHistoryCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.gameBannerUploadComplete = function (args, optionsOrCb, cb) {
        var command = new GameBannerUploadCompleteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.gameBannerUploadPrepare = function (args, optionsOrCb, cb) {
        var command = new GameBannerUploadPrepareCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.gameLogoUploadComplete = function (args, optionsOrCb, cb) {
        var command = new GameLogoUploadCompleteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.gameLogoUploadPrepare = function (args, optionsOrCb, cb) {
        var command = new GameLogoUploadPrepareCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.getGameById = function (args, optionsOrCb, cb) {
        var command = new GetGameByIdCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.getGameNamespaceById = function (args, optionsOrCb, cb) {
        var command = new GetGameNamespaceByIdCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.getGames = function (args, optionsOrCb, cb) {
        var command = new GetGamesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.getGameVersionById = function (args, optionsOrCb, cb) {
        var command = new GetGameVersionByIdCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.getGroupBilling = function (args, optionsOrCb, cb) {
        var command = new GetGroupBillingCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.getGroupInvoicesList = function (args, optionsOrCb, cb) {
        var command = new GetGroupInvoicesListCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.getGroupPaymentsList = function (args, optionsOrCb, cb) {
        var command = new GetGroupPaymentsListCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.getGroupTransfersList = function (args, optionsOrCb, cb) {
        var command = new GetGroupTransfersListCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.getNamespaceAnalyticsMatchmakerLive = function (args, optionsOrCb, cb) {
        var command = new GetNamespaceAnalyticsMatchmakerLiveCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.getNamespaceLobby = function (args, optionsOrCb, cb) {
        var command = new GetNamespaceLobbyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.getRayPerfLogs = function (args, optionsOrCb, cb) {
        var command = new GetRayPerfLogsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.getRegionTiers = function (args, optionsOrCb, cb) {
        var command = new GetRegionTiersCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.groupBillingCheckout = function (args, optionsOrCb, cb) {
        var command = new GroupBillingCheckoutCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.inspect = function (args, optionsOrCb, cb) {
        var command = new InspectCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.listGameBuilds = function (args, optionsOrCb, cb) {
        var command = new ListGameBuildsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.listGameCdnSites = function (args, optionsOrCb, cb) {
        var command = new ListGameCdnSitesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.listNamespaceLobbies = function (args, optionsOrCb, cb) {
        var command = new ListNamespaceLobbiesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.removeNamespaceDomain = function (args, optionsOrCb, cb) {
        var command = new RemoveNamespaceDomainCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.toggleNamespaceDomainPublicAuth = function (args, optionsOrCb, cb) {
        var command = new ToggleNamespaceDomainPublicAuthCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.updateGameNamespaceMatchmakerConfig = function (args, optionsOrCb, cb) {
        var command = new UpdateGameNamespaceMatchmakerConfigCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.updateGameNamespaceVersion = function (args, optionsOrCb, cb) {
        var command = new UpdateGameNamespaceVersionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.updateNamespaceDomain = function (args, optionsOrCb, cb) {
        var command = new UpdateNamespaceDomainCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.validateGame = function (args, optionsOrCb, cb) {
        var command = new ValidateGameCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.validateGameNamespace = function (args, optionsOrCb, cb) {
        var command = new ValidateGameNamespaceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.validateGameNamespaceMatchmakerConfig = function (args, optionsOrCb, cb) {
        var command = new ValidateGameNamespaceMatchmakerConfigCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.validateGameNamespaceTokenDevelopment = function (args, optionsOrCb, cb) {
        var command = new ValidateGameNamespaceTokenDevelopmentCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.validateGameVersion = function (args, optionsOrCb, cb) {
        var command = new ValidateGameVersionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    CloudService.prototype.validateGroup = function (args, optionsOrCb, cb) {
        var command = new ValidateGroupCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error("Expect http options but get ".concat(typeof optionsOrCb));
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    };
    return CloudService;
}(CloudServiceClient));
export { CloudService };
