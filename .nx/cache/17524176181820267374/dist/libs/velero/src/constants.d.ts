export declare const ResourceList: readonly ["BACKUP", "RESTORE", "SCHEDULE", "DOWNLOAD_REQUEST", "DELETE_BACKUP_REQUEST", "POD_VOLUME_BACKUP", "POD_VOLUME_RESTORE", "BACKUP_REPOSITORY", "RESTIC_REPOSITORY", "BACKUP_STORAGE_LOCATION", "VOLUME_SNAPSHOT_LOCATION", "SERVER_STATUS_REQUEST"];
export interface Resource {
    name: string;
    kind: string;
    plural: PluralsNames;
    route: string;
}
export type ResourcesNames = typeof ResourceList[number];
export declare const PLURALS: readonly ["backups", "restores", "schedules", "downloadrequests", "deletebackuprequests", "podvolumebackups", "podvolumerestores", "backuprepositories", "resticrepositories", "backupstoragelocations", "volumesnapshotlocations", "serverstatusrequests"];
export type PluralsNames = typeof PLURALS[number];
export declare const Resources: Record<ResourcesNames, Resource>;
