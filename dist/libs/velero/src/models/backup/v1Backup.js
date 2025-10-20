"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1BackupPhase = exports.V1HookErrorMode = void 0;
var V1HookErrorMode;
(function (V1HookErrorMode) {
    V1HookErrorMode["Continue"] = "Continue";
    V1HookErrorMode["Fail"] = "Fail";
})(V1HookErrorMode || (exports.V1HookErrorMode = V1HookErrorMode = {}));
var V1BackupPhase;
(function (V1BackupPhase) {
    V1BackupPhase["New"] = "New";
    V1BackupPhase["FailedValidation"] = "FailedValidation";
    V1BackupPhase["InProgress"] = "InProgress";
    V1BackupPhase["WaitingForPluginOperations"] = "WaitingForPluginOperations";
    V1BackupPhase["WaitingForPluginOperationsPartiallyFailed"] = "WaitingForPluginOperationsPartiallyFailed";
    V1BackupPhase["Finalizing"] = "Finalizing";
    V1BackupPhase["FinalizingPartiallyFailed"] = "FinalizingPartiallyFailed";
    V1BackupPhase["Completed"] = "Completed";
    V1BackupPhase["PartiallyFailed"] = "PartiallyFailed";
    V1BackupPhase["Failed"] = "Failed";
    V1BackupPhase["Deleting"] = "Deleting";
})(V1BackupPhase || (exports.V1BackupPhase = V1BackupPhase = {}));
//# sourceMappingURL=v1Backup.js.map