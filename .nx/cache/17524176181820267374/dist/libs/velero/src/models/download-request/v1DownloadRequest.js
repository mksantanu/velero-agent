"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1DownloadRequestPhase = exports.V1DownloadTargetKind = void 0;
var V1DownloadTargetKind;
(function (V1DownloadTargetKind) {
    V1DownloadTargetKind["BackupLog"] = "BackupLog";
    V1DownloadTargetKind["BackupContents"] = "BackupContents";
    V1DownloadTargetKind["BackupVolumeSnapshots"] = "BackupVolumeSnapshots";
    V1DownloadTargetKind["BackupItemOperations"] = "BackupItemOperations";
    V1DownloadTargetKind["BackupResourceList"] = "BackupResourceList";
    V1DownloadTargetKind["BackupResults"] = "BackupResults";
    V1DownloadTargetKind["RestoreLog"] = "RestoreLog";
    V1DownloadTargetKind["RestoreResults"] = "RestoreResults";
    V1DownloadTargetKind["RestoreResourceList"] = "RestoreResourceList";
    V1DownloadTargetKind["RestoreItemOperations"] = "RestoreItemOperations";
    V1DownloadTargetKind["CSIBackupVolumeSnapshots"] = "CSIBackupVolumeSnapshots";
    V1DownloadTargetKind["CSIBackupVolumeSnapshotContents"] = "CSIBackupVolumeSnapshotContents";
    V1DownloadTargetKind["BackupVolumeInfos"] = "BackupVolumeInfos";
})(V1DownloadTargetKind || (exports.V1DownloadTargetKind = V1DownloadTargetKind = {}));
var V1DownloadRequestPhase;
(function (V1DownloadRequestPhase) {
    V1DownloadRequestPhase["New"] = "New";
    V1DownloadRequestPhase["Processed"] = "Processed";
})(V1DownloadRequestPhase || (exports.V1DownloadRequestPhase = V1DownloadRequestPhase = {}));
//# sourceMappingURL=v1DownloadRequest.js.map