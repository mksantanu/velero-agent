"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1RestorePhase = exports.V1PolicyType = void 0;
var V1PolicyType;
(function (V1PolicyType) {
    V1PolicyType["none"] = "none";
    V1PolicyType["update"] = "update";
})(V1PolicyType || (exports.V1PolicyType = V1PolicyType = {}));
var V1RestorePhase;
(function (V1RestorePhase) {
    V1RestorePhase["New"] = "New";
    V1RestorePhase["FailedValidation"] = "FailedValidation";
    V1RestorePhase["InProgress"] = "InProgress";
    V1RestorePhase["WaitingForPluginOperations"] = "WaitingForPluginOperations";
    V1RestorePhase["WaitingForPluginOperationsPartiallyFailed"] = "WaitingForPluginOperationsPartiallyFailed";
    V1RestorePhase["Completed"] = "Completed";
    V1RestorePhase["PartiallyFailed"] = "PartiallyFailed";
    V1RestorePhase["Failed"] = "Failed";
})(V1RestorePhase || (exports.V1RestorePhase = V1RestorePhase = {}));
//# sourceMappingURL=v1Restore.js.map