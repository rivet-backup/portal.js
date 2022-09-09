import { __assign, __extends } from "tslib";
import { AuthServiceServiceException as __BaseException } from "./AuthServiceServiceException";
export var CompleteEmailVerificationInput;
(function (CompleteEmailVerificationInput) {
    CompleteEmailVerificationInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CompleteEmailVerificationInput || (CompleteEmailVerificationInput = {}));
export var CompleteStatus;
(function (CompleteStatus) {
    CompleteStatus["ALREADY_COMPLETE"] = "already_complete";
    CompleteStatus["EXPIRED"] = "expired";
    CompleteStatus["INCORRECT"] = "incorrect";
    CompleteStatus["LINKED_ACCOUNT_ADDED"] = "linked_account_added";
    CompleteStatus["SWITCH_IDENTITY"] = "switch_identity";
    CompleteStatus["TOO_MANY_ATTEMPTS"] = "too_many_attempts";
})(CompleteStatus || (CompleteStatus = {}));
export var CompleteEmailVerificationOutput;
(function (CompleteEmailVerificationOutput) {
    CompleteEmailVerificationOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CompleteEmailVerificationOutput || (CompleteEmailVerificationOutput = {}));
export var StartEmailVerificationInput;
(function (StartEmailVerificationInput) {
    StartEmailVerificationInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartEmailVerificationInput || (StartEmailVerificationInput = {}));
export var StartEmailVerificationOutput;
(function (StartEmailVerificationOutput) {
    StartEmailVerificationOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartEmailVerificationOutput || (StartEmailVerificationOutput = {}));
export var GetIdentityTokenInput;
(function (GetIdentityTokenInput) {
    GetIdentityTokenInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetIdentityTokenInput || (GetIdentityTokenInput = {}));
export var GetIdentityTokenOutput;
(function (GetIdentityTokenOutput) {
    GetIdentityTokenOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetIdentityTokenOutput || (GetIdentityTokenOutput = {}));
var BadRequestError = (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(opts) {
        var _this = _super.call(this, __assign({ name: "BadRequestError", $fault: "client" }, opts)) || this;
        _this.name = "BadRequestError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, BadRequestError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return BadRequestError;
}(__BaseException));
export { BadRequestError };
var ForbiddenError = (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(opts) {
        var _this = _super.call(this, __assign({ name: "ForbiddenError", $fault: "client" }, opts)) || this;
        _this.name = "ForbiddenError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, ForbiddenError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return ForbiddenError;
}(__BaseException));
export { ForbiddenError };
var InternalError = (function (_super) {
    __extends(InternalError, _super);
    function InternalError(opts) {
        var _this = _super.call(this, __assign({ name: "InternalError", $fault: "server" }, opts)) || this;
        _this.name = "InternalError";
        _this.$fault = "server";
        _this.$retryable = {};
        Object.setPrototypeOf(_this, InternalError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return InternalError;
}(__BaseException));
export { InternalError };
var NotFoundError = (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(opts) {
        var _this = _super.call(this, __assign({ name: "NotFoundError", $fault: "client" }, opts)) || this;
        _this.name = "NotFoundError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, NotFoundError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return NotFoundError;
}(__BaseException));
export { NotFoundError };
var RateLimitError = (function (_super) {
    __extends(RateLimitError, _super);
    function RateLimitError(opts) {
        var _this = _super.call(this, __assign({ name: "RateLimitError", $fault: "client" }, opts)) || this;
        _this.name = "RateLimitError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, RateLimitError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return RateLimitError;
}(__BaseException));
export { RateLimitError };
var UnauthorizedError = (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(opts) {
        var _this = _super.call(this, __assign({ name: "UnauthorizedError", $fault: "client" }, opts)) || this;
        _this.name = "UnauthorizedError";
        _this.$fault = "client";
        _this.$retryable = {};
        Object.setPrototypeOf(_this, UnauthorizedError.prototype);
        _this.code = opts.code;
        _this.metadata = opts.metadata;
        return _this;
    }
    return UnauthorizedError;
}(__BaseException));
export { UnauthorizedError };
