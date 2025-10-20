"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2alpha1DataUploadPhase = exports.V2alpha1DataUploadSnapshotType = void 0;
var V2alpha1DataUploadSnapshotType;
(function (V2alpha1DataUploadSnapshotType) {
    V2alpha1DataUploadSnapshotType["CSI"] = "CSI";
})(V2alpha1DataUploadSnapshotType || (exports.V2alpha1DataUploadSnapshotType = V2alpha1DataUploadSnapshotType = {}));
var V2alpha1DataUploadPhase;
(function (V2alpha1DataUploadPhase) {
    V2alpha1DataUploadPhase["New"] = "New";
    V2alpha1DataUploadPhase["Accepted"] = "Accepted";
    V2alpha1DataUploadPhase["Prepared"] = "Prepared";
    V2alpha1DataUploadPhase["InProgress"] = "InProgress";
    V2alpha1DataUploadPhase["Canceling"] = "Canceling";
    V2alpha1DataUploadPhase["Canceled"] = "Canceled";
    V2alpha1DataUploadPhase["Completed"] = "Completed";
    V2alpha1DataUploadPhase["Failed"] = "Failed";
})(V2alpha1DataUploadPhase || (exports.V2alpha1DataUploadPhase = V2alpha1DataUploadPhase = {}));
//# sourceMappingURL=v2alpha1DataUpload.js.map