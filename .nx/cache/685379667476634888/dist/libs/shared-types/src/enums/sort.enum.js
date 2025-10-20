"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortDirection = exports.SortBy = void 0;
var SortBy;
(function (SortBy) {
    SortBy["Name"] = "name";
    SortBy["Schedule"] = "schedule";
    SortBy["StorageLocation"] = "storageLocation";
    SortBy["Expiration"] = "expiration";
    SortBy["LastBackup"] = "lastBackup";
    SortBy["StartTimestamp"] = "startTimestamp";
    SortBy["CompletionTimestamp"] = "completionTimestamp";
    SortBy["LastMaintenanceTime"] = "lastMaintenanceTime";
    SortBy["RepositoryType"] = "repositoryType";
    SortBy["ProcessedTimestamp"] = "processedTimestamp";
    SortBy["Provider"] = "provider";
    SortBy["LastSync"] = "lastSync";
})(SortBy || (exports.SortBy = SortBy = {}));
var SortDirection;
(function (SortDirection) {
    SortDirection["Ascending"] = "asc";
    SortDirection["Descending"] = "desc";
})(SortDirection || (exports.SortDirection = SortDirection = {}));
//# sourceMappingURL=sort.enum.js.map