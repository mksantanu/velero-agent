"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1BackupRepositoryMaintenanceResult = exports.V1BackupRepositoryType = exports.V1BackupRepositoryPhase = void 0;
var V1BackupRepositoryPhase;
(function (V1BackupRepositoryPhase) {
    V1BackupRepositoryPhase["New"] = "New";
    V1BackupRepositoryPhase["Ready"] = "Ready";
    V1BackupRepositoryPhase["NotReady"] = "NotReady";
})(V1BackupRepositoryPhase || (exports.V1BackupRepositoryPhase = V1BackupRepositoryPhase = {}));
var V1BackupRepositoryType;
(function (V1BackupRepositoryType) {
    V1BackupRepositoryType["Restic"] = "restic";
    V1BackupRepositoryType["Kopia"] = "kopia";
})(V1BackupRepositoryType || (exports.V1BackupRepositoryType = V1BackupRepositoryType = {}));
var V1BackupRepositoryMaintenanceResult;
(function (V1BackupRepositoryMaintenanceResult) {
    V1BackupRepositoryMaintenanceResult["Succeeded"] = "Succeeded";
    V1BackupRepositoryMaintenanceResult["Failed"] = "Failed";
})(V1BackupRepositoryMaintenanceResult || (exports.V1BackupRepositoryMaintenanceResult = V1BackupRepositoryMaintenanceResult = {}));
//# sourceMappingURL=v1BackupRepository.js.map