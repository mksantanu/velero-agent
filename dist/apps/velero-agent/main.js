/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-socket.io");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const throttler_1 = __webpack_require__(6);
const core_1 = __webpack_require__(3);
const backup_module_1 = __webpack_require__(7);
const schedule_module_1 = __webpack_require__(99);
const storage_location_module_1 = __webpack_require__(104);
const restore_module_1 = __webpack_require__(109);
const serve_static_1 = __webpack_require__(113);
const path_1 = __webpack_require__(114);
const health_module_1 = __webpack_require__(115);
const axios_1 = __webpack_require__(79);
const velero_module_1 = __webpack_require__(122);
const settings_module_1 = __webpack_require__(123);
const config_1 = __webpack_require__(50);
const snapshot_location_module_1 = __webpack_require__(165);
const k8s_custom_object_module_1 = __webpack_require__(169);
const backup_repository_module_1 = __webpack_require__(171);
const stats_module_1 = __webpack_require__(173);
const app_config_module_1 = __webpack_require__(178);
const auth_module_1 = __webpack_require__(144);
const jwt_auth_guard_1 = __webpack_require__(180);
const logger_module_1 = __webpack_require__(181);
const velero_config_1 = tslib_1.__importDefault(__webpack_require__(182));
const k8s_config_1 = tslib_1.__importDefault(__webpack_require__(184));
const app_config_1 = tslib_1.__importDefault(__webpack_require__(185));
const basic_auth_config_1 = tslib_1.__importDefault(__webpack_require__(186));
const ldap_config_1 = tslib_1.__importDefault(__webpack_require__(187));
const google_config_1 = tslib_1.__importDefault(__webpack_require__(188));
const github_config_1 = tslib_1.__importDefault(__webpack_require__(189));
const gitlab_config_1 = tslib_1.__importDefault(__webpack_require__(190));
const microsoft_config_1 = tslib_1.__importDefault(__webpack_require__(191));
const oauth_config_1 = tslib_1.__importDefault(__webpack_require__(192));
const form_module_1 = __webpack_require__(193);
const http_exception_filter_1 = __webpack_require__(196);
const pod_volume_backup_module_1 = __webpack_require__(197);
const pod_volume_restore_module_1 = __webpack_require__(199);
const nestjs_kubernetes_1 = __webpack_require__(201);
const k8s_utils_1 = __webpack_require__(9);
const casl_module_1 = __webpack_require__(164);
const cache_manager_1 = __webpack_require__(92);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [
                    velero_config_1.default,
                    k8s_config_1.default,
                    basic_auth_config_1.default,
                    app_config_1.default,
                    ldap_config_1.default,
                    google_config_1.default,
                    github_config_1.default,
                    gitlab_config_1.default,
                    microsoft_config_1.default,
                    oauth_config_1.default,
                ],
            }),
            cache_manager_1.CacheModule.registerAsync({
                isGlobal: true,
                useFactory: (configService) => ({
                    ttl: configService.get('app.cacheTTL'),
                }),
                inject: [config_1.ConfigService]
            }),
            logger_module_1.LoggerModule.forRoot(),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, 'static'),
            }),
            nestjs_kubernetes_1.KubernetesModule.registerAsync({
                servers: [
                    {
                        name: k8s_utils_1.K8S_CONNECTION,
                        useFactory: (configService) => configService.get('k8s.configPath')
                            ? {
                                loadFrom: nestjs_kubernetes_1.LoadFrom.FILE,
                                opts: {
                                    file: configService.get('k8s.configPath'),
                                    context: configService.get('k8s.context'),
                                },
                            }
                            : { loadFrom: nestjs_kubernetes_1.LoadFrom.CLUSTER },
                        inject: [config_1.ConfigService],
                    },
                ],
                isGlobal: true,
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 1000,
                },
            ]),
            axios_1.HttpModule,
            backup_module_1.BackupModule,
            schedule_module_1.ScheduleModule,
            storage_location_module_1.StorageLocationModule,
            restore_module_1.RestoreModule,
            health_module_1.HealthModule,
            form_module_1.FormModule,
            velero_module_1.VeleroModule,
            settings_module_1.SettingsModule,
            snapshot_location_module_1.SnapshotLocationModule,
            k8s_custom_object_module_1.K8sCustomObjectModule,
            backup_repository_module_1.BackupRepositoryModule,
            pod_volume_backup_module_1.PodVolumeBackupModule,
            pod_volume_restore_module_1.PodVolumeRestoreModule,
            stats_module_1.StatsModule,
            app_config_module_1.AppConfigModule,
            auth_module_1.AuthModule,
            logger_module_1.LoggerModule,
            casl_module_1.CaslModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BackupModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const backup_service_1 = __webpack_require__(8);
const backup_controller_1 = __webpack_require__(85);
const axios_1 = __webpack_require__(79);
const delete_backup_request_module_1 = __webpack_require__(94);
const download_request_module_1 = __webpack_require__(96);
const https_1 = tslib_1.__importDefault(__webpack_require__(98));
let BackupModule = class BackupModule {
};
exports.BackupModule = BackupModule;
exports.BackupModule = BackupModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.register({
                httpsAgent: new https_1.default.Agent({
                    rejectUnauthorized: false,
                }),
            }),
            delete_backup_request_module_1.DeleteBackupRequestModule,
            download_request_module_1.DownloadRequestModule,
        ],
        providers: [backup_service_1.BackupService],
        controllers: [backup_controller_1.BackupController],
        exports: [backup_service_1.BackupService],
    })
], BackupModule);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var BackupService_1;
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BackupService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const k8s_utils_1 = __webpack_require__(9);
const client_node_1 = __webpack_require__(10);
const rxjs_1 = __webpack_require__(11);
const velero_1 = __webpack_require__(12);
const download_request_service_1 = __webpack_require__(49);
const axios_1 = __webpack_require__(79);
const zlib_1 = __webpack_require__(80);
const backup_dto_1 = __webpack_require__(81);
const k8s_custom_object_service_1 = __webpack_require__(56);
const config_1 = __webpack_require__(50);
const shared_types_1 = __webpack_require__(59);
const logger_service_1 = __webpack_require__(57);
const k8s_custom_object_utils_1 = __webpack_require__(52);
const logs_utils_1 = __webpack_require__(84);
let BackupService = BackupService_1 = class BackupService {
    constructor(k8s, logger, downloadRequestService, httpService, k8sCustomObjectService, configService) {
        this.k8s = k8s;
        this.logger = logger;
        this.downloadRequestService = downloadRequestService;
        this.httpService = httpService;
        this.k8sCustomObjectService = k8sCustomObjectService;
        this.configService = configService;
    }
    downloadByName(name) {
        return this.downloadRequestService
            .create({
            name,
            kind: velero_1.V1DownloadTargetKind.BackupContents,
        })
            .pipe((0, rxjs_1.concatMap)((request) => this.httpService.get(request.status.downloadURL, {
            responseType: 'stream',
        })));
    }
    logs(name) {
        this.logger.debug(`Getting logs for ${name}...`, BackupService_1.name);
        return (0, rxjs_1.from)(this.downloadRequestService.create({
            name,
            kind: velero_1.V1DownloadTargetKind.BackupLog,
        }))
            .pipe((0, rxjs_1.concatMap)((downloadRequest) => this.httpService.get(downloadRequest?.status?.downloadURL, {
            responseType: 'arraybuffer',
        })))
            .pipe((0, rxjs_1.map)((response) => response.data))
            .pipe((0, rxjs_1.map)((buffer) => (0, zlib_1.unzipSync)(buffer)))
            .pipe((0, rxjs_1.map)((content) => content
            .toString()
            .split('\n')
            .map((line) => (0, logs_utils_1.parseVeleroLog)(line))
            .filter((log) => !!log)));
    }
    create(data) {
        if (data.type === shared_types_1.CreateBackupTypeEnum.FROM_SCRATCH &&
            data.spec instanceof backup_dto_1.CreateBackupScratchDto) {
            return (0, rxjs_1.of)((0, k8s_custom_object_utils_1.createK8sCustomObject)(data.name, this.configService.get('velero.namespace'), velero_1.Resources.BACKUP, data.labels, data.spec)).pipe((0, rxjs_1.concatMap)((body) => this.k8sCustomObjectService.create(velero_1.Resources.BACKUP.plural, body)));
        }
        else if (data.type === shared_types_1.CreateBackupTypeEnum.FROM_SCHEDULE &&
            data.spec instanceof backup_dto_1.CreateBackupScheduleDto) {
            return (0, rxjs_1.from)(this.k8sCustomObjectService.getByName(velero_1.Resources.SCHEDULE.plural, data.spec.name))
                .pipe((0, rxjs_1.map)((schedule) => (0, k8s_custom_object_utils_1.createK8sCustomObject)(data.name, this.configService.get('velero.namespace'), velero_1.Resources.BACKUP, data.labels, schedule.spec.template)))
                .pipe((0, rxjs_1.concatMap)((body) => this.k8sCustomObjectService.create(velero_1.Resources.BACKUP.plural, body)));
        }
        else {
            throw new common_1.BadRequestException('Invalid body');
        }
    }
    delete(names) {
        return (0, rxjs_1.from)(names).pipe((0, rxjs_1.concatMap)((name) => this.deleteByName(name)));
    }
    deleteByName(name) {
        return (0, rxjs_1.of)((0, k8s_custom_object_utils_1.createK8sCustomObject)(name, this.configService.get('velero.namespace'), velero_1.Resources.DELETE_BACKUP_REQUEST, {}, {
            backupName: name,
        })).pipe((0, rxjs_1.concatMap)((body) => this.k8sCustomObjectService.create(velero_1.Resources.DELETE_BACKUP_REQUEST.plural, body)));
    }
    getContentSize(name) {
        return (0, rxjs_1.from)(this.downloadRequestService.create({
            name,
            kind: velero_1.V1DownloadTargetKind.BackupContents,
        })).pipe((0, rxjs_1.filter)((request) => !!request.status?.downloadURL), (0, rxjs_1.concatMap)((request) => this.httpService
            .get(request.status.downloadURL, {
            headers: {
                Range: 'bytes=0-0',
            },
            responseType: 'arraybuffer',
        })
            .pipe((0, rxjs_1.map)((response) => parseInt(response.headers['content-range']?.split('/')[1] || '0', 10)), (0, rxjs_1.catchError)(() => (0, rxjs_1.of)(0)), (0, rxjs_1.concatMap)((size) => this.k8sCustomObjectService
            .deleteByName(velero_1.Resources.DOWNLOAD_REQUEST.plural, request.metadata.name)
            .pipe((0, rxjs_1.catchError)((err) => {
            return (0, rxjs_1.of)(0);
        }), (0, rxjs_1.map)(() => size))))));
    }
};
exports.BackupService = BackupService;
exports.BackupService = BackupService = BackupService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(k8s_utils_1.K8S_CONNECTION)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof client_node_1.KubeConfig !== "undefined" && client_node_1.KubeConfig) === "function" ? _a : Object, typeof (_b = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _b : Object, typeof (_c = typeof download_request_service_1.DownloadRequestService !== "undefined" && download_request_service_1.DownloadRequestService) === "function" ? _c : Object, typeof (_d = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _d : Object, typeof (_e = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _e : Object, typeof (_f = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _f : Object])
], BackupService);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.K8S_CONNECTION = void 0;
exports.K8S_CONNECTION = 'K8sConnection';


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@kubernetes/client-node");

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(13), exports);
tslib_1.__exportStar(__webpack_require__(14), exports);
tslib_1.__exportStar(__webpack_require__(17), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);
tslib_1.__exportStar(__webpack_require__(26), exports);
tslib_1.__exportStar(__webpack_require__(29), exports);
tslib_1.__exportStar(__webpack_require__(32), exports);
tslib_1.__exportStar(__webpack_require__(35), exports);
tslib_1.__exportStar(__webpack_require__(38), exports);
tslib_1.__exportStar(__webpack_require__(41), exports);
tslib_1.__exportStar(__webpack_require__(44), exports);
tslib_1.__exportStar(__webpack_require__(46), exports);
// export * from './models/data-download/index';
// export * from './models/data-upload/index';


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Resources = exports.PLURALS = exports.ResourceList = void 0;
exports.ResourceList = [
    'BACKUP',
    'RESTORE',
    'SCHEDULE',
    'DOWNLOAD_REQUEST',
    'DELETE_BACKUP_REQUEST',
    'POD_VOLUME_BACKUP',
    'POD_VOLUME_RESTORE',
    'BACKUP_REPOSITORY',
    'RESTIC_REPOSITORY',
    'BACKUP_STORAGE_LOCATION',
    'VOLUME_SNAPSHOT_LOCATION',
    'SERVER_STATUS_REQUEST',
];
exports.PLURALS = [
    'backups',
    'restores',
    'schedules',
    'downloadrequests',
    'deletebackuprequests',
    'podvolumebackups',
    'podvolumerestores',
    'backuprepositories',
    'resticrepositories',
    'backupstoragelocations',
    'volumesnapshotlocations',
    'serverstatusrequests'
];
exports.Resources = {
    BACKUP: {
        name: 'Backup',
        kind: 'Backup',
        plural: 'backups',
        route: '/backups',
    },
    RESTORE: {
        name: 'Restore',
        kind: 'Restore',
        plural: 'restores',
        route: '/restores',
    },
    SCHEDULE: {
        name: 'Schedule',
        kind: 'Schedule',
        plural: 'schedules',
        route: '/schedules',
    },
    DOWNLOAD_REQUEST: {
        name: 'Download Request',
        kind: 'DownloadRequest',
        plural: 'downloadrequests',
        route: '/download-requests',
    },
    DELETE_BACKUP_REQUEST: {
        name: 'Delete backup Request',
        kind: 'DeleteBackupRequest',
        plural: 'deletebackuprequests',
        route: '/delete-backup-requests',
    },
    POD_VOLUME_BACKUP: {
        name: 'Pod Volume Backup',
        kind: 'PodVolumeBackup',
        plural: 'podvolumebackups',
        route: '/pod-volume-backups',
    },
    POD_VOLUME_RESTORE: {
        name: 'Pod Volume Restore',
        kind: 'PodVolumeRestore',
        plural: 'podvolumerestores',
        route: '/podvolumerestores',
    },
    BACKUP_REPOSITORY: {
        // >= v1.10.x
        name: 'Backup Repository',
        kind: 'BackupRepository',
        plural: 'backuprepositories',
        route: '/backup-repositories',
    },
    RESTIC_REPOSITORY: {
        // < v1.10.x
        name: 'Restic Repository',
        kind: 'ResticRepository',
        plural: 'resticrepositories',
        route: '/restic-repositories',
    },
    BACKUP_STORAGE_LOCATION: {
        name: 'Backup Storage Location',
        kind: 'BackupStorageLocation',
        plural: 'backupstoragelocations',
        route: '/backup-storage-locations',
    },
    VOLUME_SNAPSHOT_LOCATION: {
        name: 'Volume Snapshot Location',
        kind: 'VolumeSnapshotLocation',
        plural: 'volumesnapshotlocations',
        route: '/volume-snapshot-locations',
    },
    SERVER_STATUS_REQUEST: {
        name: 'Server Status Request',
        kind: 'ServerStatusRequest',
        plural: 'serverstatusrequests',
        route: '/server-status-requests',
    },
};


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(15), exports);
tslib_1.__exportStar(__webpack_require__(16), exports);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(18), exports);
tslib_1.__exportStar(__webpack_require__(19), exports);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.V1BackupStorageLocationPhase = exports.V1BackupStorageLocationAccessMode = void 0;
var V1BackupStorageLocationAccessMode;
(function (V1BackupStorageLocationAccessMode) {
    V1BackupStorageLocationAccessMode["ReadOnly"] = "ReadOnly";
    V1BackupStorageLocationAccessMode["ReadWrite"] = "ReadWrite";
})(V1BackupStorageLocationAccessMode || (exports.V1BackupStorageLocationAccessMode = V1BackupStorageLocationAccessMode = {}));
var V1BackupStorageLocationPhase;
(function (V1BackupStorageLocationPhase) {
    V1BackupStorageLocationPhase["Available"] = "Available";
    V1BackupStorageLocationPhase["Unavailable"] = "Unavailable";
})(V1BackupStorageLocationPhase || (exports.V1BackupStorageLocationPhase = V1BackupStorageLocationPhase = {}));


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(25), exports);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.V1DeleteBackupRequestPhase = void 0;
var V1DeleteBackupRequestPhase;
(function (V1DeleteBackupRequestPhase) {
    V1DeleteBackupRequestPhase["New"] = "New";
    V1DeleteBackupRequestPhase["InProgress"] = "InProgress";
    V1DeleteBackupRequestPhase["Processed"] = "Processed";
})(V1DeleteBackupRequestPhase || (exports.V1DeleteBackupRequestPhase = V1DeleteBackupRequestPhase = {}));


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(27), exports);
tslib_1.__exportStar(__webpack_require__(28), exports);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(30), exports);
tslib_1.__exportStar(__webpack_require__(31), exports);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.V1PodVolumeBackupPhase = void 0;
var V1PodVolumeBackupPhase;
(function (V1PodVolumeBackupPhase) {
    V1PodVolumeBackupPhase["New"] = "New";
    V1PodVolumeBackupPhase["Accepted"] = "Accepted";
    V1PodVolumeBackupPhase["Prepared"] = "Prepared";
    V1PodVolumeBackupPhase["InProgress"] = "InProgress";
    V1PodVolumeBackupPhase["Completed"] = "Completed";
    V1PodVolumeBackupPhase["Canceling"] = "Canceling";
    V1PodVolumeBackupPhase["Canceled"] = "Canceled";
    V1PodVolumeBackupPhase["Failed"] = "Failed";
})(V1PodVolumeBackupPhase || (exports.V1PodVolumeBackupPhase = V1PodVolumeBackupPhase = {}));


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(33), exports);
tslib_1.__exportStar(__webpack_require__(34), exports);


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.V1PodVolumeRestorePhase = void 0;
var V1PodVolumeRestorePhase;
(function (V1PodVolumeRestorePhase) {
    V1PodVolumeRestorePhase["New"] = "New";
    V1PodVolumeRestorePhase["Accepted"] = "Accepted";
    V1PodVolumeRestorePhase["Prepared"] = "Prepared";
    V1PodVolumeRestorePhase["InProgress"] = "InProgress";
    V1PodVolumeRestorePhase["Completed"] = "Completed";
    V1PodVolumeRestorePhase["Canceling"] = "Canceling";
    V1PodVolumeRestorePhase["Canceled"] = "Canceled";
    V1PodVolumeRestorePhase["Failed"] = "Failed";
})(V1PodVolumeRestorePhase || (exports.V1PodVolumeRestorePhase = V1PodVolumeRestorePhase = {}));


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(36), exports);
tslib_1.__exportStar(__webpack_require__(37), exports);


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(39), exports);
tslib_1.__exportStar(__webpack_require__(40), exports);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.V1SchedulePhase = void 0;
var V1SchedulePhase;
(function (V1SchedulePhase) {
    V1SchedulePhase["New"] = "New";
    V1SchedulePhase["Enabled"] = "Enabled";
    V1SchedulePhase["FailedValidation"] = "FailedValidation";
})(V1SchedulePhase || (exports.V1SchedulePhase = V1SchedulePhase = {}));


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(42), exports);
tslib_1.__exportStar(__webpack_require__(43), exports);


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.V1ServerStatusRequestPhase = void 0;
var V1ServerStatusRequestPhase;
(function (V1ServerStatusRequestPhase) {
    V1ServerStatusRequestPhase["New"] = "New";
    V1ServerStatusRequestPhase["Processed"] = "Processed";
})(V1ServerStatusRequestPhase || (exports.V1ServerStatusRequestPhase = V1ServerStatusRequestPhase = {}));


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(45), exports);


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeOS = void 0;
var NodeOS;
(function (NodeOS) {
    NodeOS["Linux"] = "linux";
    NodeOS["Windows"] = "windows";
    NodeOS["auto"] = "auto";
})(NodeOS || (exports.NodeOS = NodeOS = {}));


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(47), exports);
tslib_1.__exportStar(__webpack_require__(48), exports);


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.V1VolumeSnapshotLocationPhase = void 0;
var V1VolumeSnapshotLocationPhase;
(function (V1VolumeSnapshotLocationPhase) {
    V1VolumeSnapshotLocationPhase["Available"] = "Available";
    V1VolumeSnapshotLocationPhase["Unavailable"] = "Unavailable";
})(V1VolumeSnapshotLocationPhase || (exports.V1VolumeSnapshotLocationPhase = V1VolumeSnapshotLocationPhase = {}));


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DownloadRequestService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const k8s_utils_1 = __webpack_require__(9);
const client_node_1 = __webpack_require__(10);
const velero_1 = __webpack_require__(12);
const config_1 = __webpack_require__(50);
const rxjs_1 = __webpack_require__(11);
const velero_constants_1 = __webpack_require__(51);
const k8s_custom_object_utils_1 = __webpack_require__(52);
const k8s_custom_object_service_1 = __webpack_require__(56);
let DownloadRequestService = class DownloadRequestService {
    constructor(k8s, k8sCustomObjectService, configService) {
        this.k8s = k8s;
        this.k8sCustomObjectService = k8sCustomObjectService;
        this.configService = configService;
        this.k8sCustomObjectApi = this.k8s.makeApiClient(client_node_1.CustomObjectsApi);
    }
    create(body) {
        return (0, rxjs_1.of)((0, k8s_custom_object_utils_1.createK8sCustomObject)(body.name, this.configService.get('velero.namespace'), velero_1.Resources.DOWNLOAD_REQUEST, {}, {
            target: body,
        }))
            .pipe((0, rxjs_1.concatMap)((body) => this.k8sCustomObjectService.create(velero_1.Resources.DOWNLOAD_REQUEST.plural, body)))
            .pipe((0, rxjs_1.concatMap)((request) => this.waitAndGetDownloadRequest(request)));
    }
    waitAndGetDownloadRequest(request) {
        return (0, rxjs_1.defer)(() => (0, rxjs_1.from)(this.k8sCustomObjectApi.getNamespacedCustomObject({
            group: velero_constants_1.VELERO.GROUP,
            version: velero_constants_1.VELERO.VERSION,
            namespace: this.configService.get('velero.namespace'),
            plural: velero_1.Resources.DOWNLOAD_REQUEST.plural,
            name: request.metadata.name,
        }))).pipe((0, rxjs_1.map)((requestStatus) => {
            if (requestStatus?.status?.phase !== velero_1.V1DownloadRequestPhase.Processed) {
                throw new Error('Download request is not ready!');
            }
            return requestStatus;
        }), (0, rxjs_1.retry)({
            count: 5,
            delay: 4000,
        }), (0, rxjs_1.catchError)(() => {
            return (0, rxjs_1.throwError)(() => new Error('Download request is not ready after 5 retries!'));
        }));
    }
};
exports.DownloadRequestService = DownloadRequestService;
exports.DownloadRequestService = DownloadRequestService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(k8s_utils_1.K8S_CONNECTION)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof client_node_1.KubeConfig !== "undefined" && client_node_1.KubeConfig) === "function" ? _a : Object, typeof (_b = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], DownloadRequestService);


/***/ }),
/* 50 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VELERO = void 0;
exports.VELERO = {
    GROUP: 'velero.io',
    VERSION: 'v1',
    IMAGE: 'velero/velero',
    SERVER_CONTAINER_NAME: 'velero',
    UI_CONTAINER_NAME: 'velero-agent',
    AGENT_CONTAINER_NAME: 'node-agent',
};


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.patchK8sCustomObjectSpec = exports.createK8sCustomObject = void 0;
const velero_1 = __webpack_require__(12);
const velero_utils_1 = __webpack_require__(53);
const uuid_utils_1 = __webpack_require__(54);
const generateNameType = (kind, name) => {
    switch (kind) {
        case velero_1.Resources.BACKUP.kind:
        case velero_1.Resources.RESTORE.kind:
            return (0, uuid_utils_1.generateDateName)(name);
        case velero_1.Resources.DELETE_BACKUP_REQUEST.kind:
        case velero_1.Resources.DOWNLOAD_REQUEST.kind:
        case velero_1.Resources.SERVER_STATUS_REQUEST.kind:
            return (0, uuid_utils_1.generateUuidName)(name);
        default:
            return name;
    }
};
const createK8sCustomObject = (name, namespace, resource, labels = {}, body) => ({
    apiVersion: (0, velero_utils_1.getApiVersion)(),
    kind: resource.kind,
    metadata: {
        name: generateNameType(resource.kind, name),
        namespace,
        labels,
    },
    spec: body,
});
exports.createK8sCustomObject = createK8sCustomObject;
const patchK8sCustomObjectSpec = (spec) => [
    {
        op: 'replace',
        path: '/spec',
        value: spec,
    },
];
exports.patchK8sCustomObjectSpec = patchK8sCustomObjectSpec;


/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getApiVersion = void 0;
const velero_constants_1 = __webpack_require__(51);
const getApiVersion = () => `${velero_constants_1.VELERO.GROUP}/${velero_constants_1.VELERO.VERSION}`;
exports.getApiVersion = getApiVersion;


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateDateName = exports.generateUuidName = void 0;
const uuid_1 = __webpack_require__(55);
const generateUuidName = (name) => `${name}-${(0, uuid_1.v4)()}`;
exports.generateUuidName = generateUuidName;
const generateDateName = (name) => {
    const d = new Date();
    return `${name}-${d.getFullYear()}${('0' + d.getMonth() + 1).slice(-2)}${('0' + d.getDay()).slice(-2)}${('0' + d.getHours()).slice(-2)}${('0' + d.getMinutes()).slice(-2)}${d.getSeconds()}`;
};
exports.generateDateName = generateDateName;


/***/ }),
/* 55 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var K8sCustomObjectService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.K8sCustomObjectService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const client_node_1 = __webpack_require__(10);
const k8s_utils_1 = __webpack_require__(9);
const config_1 = __webpack_require__(50);
const rxjs_1 = __webpack_require__(11);
const velero_constants_1 = __webpack_require__(51);
const logger_service_1 = __webpack_require__(57);
const search_utils_1 = __webpack_require__(78);
let K8sCustomObjectService = K8sCustomObjectService_1 = class K8sCustomObjectService {
    constructor(k8s, logger, configService) {
        this.k8s = k8s;
        this.logger = logger;
        this.configService = configService;
        this.activeWatchers = new Map();
        this.k8sCustomObjectApi = this.k8s.makeApiClient(client_node_1.CustomObjectsApi);
        this.k8sWatcher = new client_node_1.Watch(this.k8s);
    }
    get(plural, search) {
        this.logger.debug(`Fetching resources in "${plural}" (offset: ${search?.offset}, limit: ${search?.limit}, search: ${search?.search}, sortBy: ${search?.sortBy}, sortDirection: ${search?.sortDirection})...`, K8sCustomObjectService_1.name);
        return (0, rxjs_1.from)(this.k8sCustomObjectApi.listNamespacedCustomObject({
            group: velero_constants_1.VELERO.GROUP,
            version: velero_constants_1.VELERO.VERSION,
            namespace: this.configService.get('velero.namespace'),
            plural,
        })).pipe((0, rxjs_1.map)((r) => (0, search_utils_1.filters)(r, search)), (0, rxjs_1.map)((r) => (0, search_utils_1.sort)(r, search?.sortBy, search?.sortDirection)), (0, rxjs_1.map)((r) => (0, search_utils_1.slice)(r, search?.offset, search?.limit)), (0, rxjs_1.catchError)((err) => {
            console.error(err);
            this.logger.error(`Error while fetching "${plural}": ${err.message}`, K8sCustomObjectService_1.name);
            return (0, rxjs_1.throwError)(() => new common_1.HttpException(err.message, err.code));
        }));
    }
    getByName(plural, name) {
        this.logger.debug(`Fetching resource ${name} in "${plural}"...`, K8sCustomObjectService_1.name);
        return (0, rxjs_1.from)(this.k8sCustomObjectApi.getNamespacedCustomObject({
            group: velero_constants_1.VELERO.GROUP,
            version: velero_constants_1.VELERO.VERSION,
            namespace: this.configService.get('velero.namespace'),
            plural,
            name,
        })).pipe((0, rxjs_1.catchError)((err) => {
            this.logger.error(`Error while fetching "${name}" in "${plural}": ${err.message}`, K8sCustomObjectService_1.name);
            return (0, rxjs_1.throwError)(() => new common_1.HttpException(err.message, err.code));
        }));
    }
    count(plural) {
        this.logger.debug(`Counting resources "${plural}"...`, K8sCustomObjectService_1.name);
        return (0, rxjs_1.from)(this.k8sCustomObjectApi.listNamespacedCustomObject({
            group: velero_constants_1.VELERO.GROUP,
            version: velero_constants_1.VELERO.VERSION,
            namespace: this.configService.get('velero.namespace'),
            plural,
        })).pipe((0, rxjs_1.map)((r) => r.items.length), (0, rxjs_1.catchError)(() => (0, rxjs_1.of)(0)));
    }
    create(plural, body) {
        this.logger.debug(`Creating resource in "${plural}": ${body}`, K8sCustomObjectService_1.name);
        return (0, rxjs_1.from)(this.k8sCustomObjectApi.createNamespacedCustomObject({
            group: velero_constants_1.VELERO.GROUP,
            version: velero_constants_1.VELERO.VERSION,
            namespace: this.configService.get('velero.namespace'),
            plural,
            body,
        })).pipe((0, rxjs_1.catchError)((e) => {
            this.logger.error(e.message, K8sCustomObjectService_1.name);
            return (0, rxjs_1.throwError)(() => e);
        }), (0, rxjs_1.tap)((body) => this.logger.debug(`Creating resource ${body?.metadata?.name} in "${plural}"... SUCCESS`, K8sCustomObjectService_1.name)));
    }
    edit(plural, name, body) {
        this.logger.debug(`Editing resource  ${name} in ${plural} ...`, K8sCustomObjectService_1.name);
        return (0, rxjs_1.from)(this.k8sCustomObjectApi.patchNamespacedCustomObject({
            group: velero_constants_1.VELERO.GROUP,
            version: velero_constants_1.VELERO.VERSION,
            namespace: this.configService.get('velero.namespace'),
            plural,
            name,
            body,
        }, (0, client_node_1.setHeaderOptions)('Content-Type', client_node_1.PatchStrategy.JsonPatch))).pipe((0, rxjs_1.catchError)((e) => {
            this.logger.error(e.message, K8sCustomObjectService_1.name);
            return (0, rxjs_1.throwError)(() => e);
        }), (0, rxjs_1.tap)(() => this.logger.debug(`Edited ${name} in ${plural}... SUCCESS`, K8sCustomObjectService_1.name)));
    }
    delete(plural, names) {
        this.logger.debug(`Deleting resources ${names.join(',')} in "${plural}"...`, K8sCustomObjectService_1.name);
        return (0, rxjs_1.from)(names)
            .pipe((0, rxjs_1.concatMap)((name) => this.k8sCustomObjectApi.deleteNamespacedCustomObject({
            group: velero_constants_1.VELERO.GROUP,
            version: velero_constants_1.VELERO.VERSION,
            namespace: this.configService.get('velero.namespace'),
            plural,
            name,
        })))
            .pipe((0, rxjs_1.catchError)((e) => {
            this.logger.error(e.message, K8sCustomObjectService_1.name);
            return (0, rxjs_1.throwError)(() => e);
        }), (0, rxjs_1.tap)(() => this.logger.debug(`Deleting resources ${names.join(',')} in "${plural}"... SUCCESS`, K8sCustomObjectService_1.name)), (0, rxjs_1.map)(() => void 0));
    }
    deleteByName(plural, name) {
        this.logger.debug(`Deleting resource ${name} in "${plural}"...`, K8sCustomObjectService_1.name);
        return (0, rxjs_1.from)(this.k8sCustomObjectApi.deleteNamespacedCustomObject({
            group: velero_constants_1.VELERO.GROUP,
            version: velero_constants_1.VELERO.VERSION,
            namespace: this.configService.get('velero.namespace'),
            plural,
            name,
        })).pipe((0, rxjs_1.catchError)((e) => {
            this.logger.error(e.message, K8sCustomObjectService_1.name);
            return (0, rxjs_1.throwError)(() => e);
        }), (0, rxjs_1.tap)(() => this.logger.debug(`Deleting resource ${name} in "${plural}"... SUCCESS`, K8sCustomObjectService_1.name)), (0, rxjs_1.map)(() => void 0));
    }
    async watch(client, plural, name, version) {
        if (this.activeWatchers.has(client.id)) {
            this.unWatch(client, name);
        }
        this.logger.debug(`Watching ${name ? name : 'resources'} in "${plural}" (revision: ${version})...`, K8sCustomObjectService_1.name);
        try {
            const fieldSelector = name ? `metadata.name=${name}` : undefined;
            const resourceVersion = version ? version : undefined;
            const controller = await this.k8sWatcher.watch(`/apis/${velero_constants_1.VELERO.GROUP}/${velero_constants_1.VELERO.VERSION}/namespaces/${this.configService.get('velero.namespace')}/${plural}`, { fieldSelector, resourceVersion }, (phase, obj) => {
                this.logger.debug(`watch:${plural}${obj.metadata.name}:${phase}`, K8sCustomObjectService_1.name);
                client.emit(`watch:${plural}${name ? `:${name}` : ''}:${phase}`, obj);
            }, () => void 0);
            this.activeWatchers.set(client.id, {
                name,
                controller,
            });
        }
        catch (error) {
            console.error('Error watch streaming:', error);
            this.activeWatchers.delete(client.id);
        }
    }
    unWatch(client, name) {
        for (const [key, { name: resourceName, controller }] of this
            .activeWatchers) {
            if (key === client.id && resourceName === name) {
                controller?.abort();
                this.activeWatchers.delete(key);
            }
        }
    }
};
exports.K8sCustomObjectService = K8sCustomObjectService;
exports.K8sCustomObjectService = K8sCustomObjectService = K8sCustomObjectService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(k8s_utils_1.K8S_CONNECTION)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof client_node_1.KubeConfig !== "undefined" && client_node_1.KubeConfig) === "function" ? _a : Object, typeof (_b = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], K8sCustomObjectService);


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppLogger = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const winston_1 = __webpack_require__(58);
const config_1 = __webpack_require__(50);
const shared_types_1 = __webpack_require__(59);
let AppLogger = class AppLogger {
    constructor(configService) {
        this.configService = configService;
        this.logger = (0, winston_1.createLogger)({
            level: this.configService.get('app.logLevel', { infer: true }),
            transports: [
                new winston_1.transports.Console({
                    format: winston_1.format.combine(...this.getFormat()),
                }),
            ],
        });
    }
    log(message, context) {
        this.logger.log('info', this.formatMessage(message), { context });
    }
    info(message, context) {
        this.logger.log('info', this.formatMessage(message), { context });
    }
    debug(message, context) {
        this.logger.log('debug', this.formatMessage(message), { context });
    }
    warn(message, context) {
        this.logger.log('warn', this.formatMessage(message), { context });
    }
    error(message, context) {
        this.logger.log('error', this.formatMessage(message), { context });
    }
    verbose(message, context) {
        this.logger.log('verbose', this.formatMessage(message), { context });
    }
    formatMessage(message) {
        if (message instanceof Error) {
            return `${message.message} \nStack Trace: ${message.stack}`;
        }
        if (typeof message === 'object') {
            return JSON.stringify(message);
        }
        return message;
    }
    getFormat() {
        const env = this.configService.get('app.environment', {
            infer: true,
        });
        if (env === shared_types_1.Environment.PRODUCTION) {
            return [
                winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston_1.format.ms(),
                winston_1.format.json(),
            ];
        }
        return [
            winston_1.format.colorize({ all: true }),
            winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston_1.format.printf(({ timestamp, level, message, context }) => {
                const scope = context ?? 'App';
                return `${timestamp} ${level} [${scope}]: ${message}`;
            }),
        ];
    }
};
exports.AppLogger = AppLogger;
exports.AppLogger = AppLogger = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], AppLogger);


/***/ }),
/* 58 */
/***/ ((module) => {

module.exports = require("winston");

/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(60), exports);
tslib_1.__exportStar(__webpack_require__(61), exports);
tslib_1.__exportStar(__webpack_require__(62), exports);
tslib_1.__exportStar(__webpack_require__(63), exports);
tslib_1.__exportStar(__webpack_require__(64), exports);
tslib_1.__exportStar(__webpack_require__(65), exports);
tslib_1.__exportStar(__webpack_require__(66), exports);
tslib_1.__exportStar(__webpack_require__(67), exports);
tslib_1.__exportStar(__webpack_require__(68), exports);
tslib_1.__exportStar(__webpack_require__(69), exports);
tslib_1.__exportStar(__webpack_require__(75), exports);
tslib_1.__exportStar(__webpack_require__(70), exports);
tslib_1.__exportStar(__webpack_require__(76), exports);


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImagePullPolicyEnum = void 0;
var ImagePullPolicyEnum;
(function (ImagePullPolicyEnum) {
    ImagePullPolicyEnum["ALWAYS"] = "Always";
    ImagePullPolicyEnum["IF_NOT_PRESENT"] = "IfNotPresent";
    ImagePullPolicyEnum["NEVER"] = "never";
})(ImagePullPolicyEnum || (exports.ImagePullPolicyEnum = ImagePullPolicyEnum = {}));


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Environment = void 0;
var Environment;
(function (Environment) {
    Environment["DEVELOPMENT"] = "development";
    Environment["PRODUCTION"] = "production";
})(Environment || (exports.Environment = Environment = {}));


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBackupTypeEnum = void 0;
var CreateBackupTypeEnum;
(function (CreateBackupTypeEnum) {
    CreateBackupTypeEnum["FROM_SCHEDULE"] = "schedule";
    CreateBackupTypeEnum["FROM_SCRATCH"] = "custom";
})(CreateBackupTypeEnum || (exports.CreateBackupTypeEnum = CreateBackupTypeEnum = {}));


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRestoreTypeEnum = void 0;
var CreateRestoreTypeEnum;
(function (CreateRestoreTypeEnum) {
    CreateRestoreTypeEnum["FROM_SCHEDULE"] = "schedule";
    CreateRestoreTypeEnum["FROM_BACKUP"] = "backup";
})(CreateRestoreTypeEnum || (exports.CreateRestoreTypeEnum = CreateRestoreTypeEnum = {}));


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const enums_1 = __webpack_require__(70);


/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(71), exports);
tslib_1.__exportStar(__webpack_require__(72), exports);
tslib_1.__exportStar(__webpack_require__(73), exports);
tslib_1.__exportStar(__webpack_require__(74), exports);


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PolicyType = exports.Action = void 0;
var Action;
(function (Action) {
    Action["Manage"] = "manage";
    Action["Create"] = "create";
    Action["Read"] = "read";
    Action["Update"] = "update";
    Action["Delete"] = "delete";
    Action["Download"] = "download";
    Action["Logs"] = "logs";
})(Action || (exports.Action = Action = {}));
var PolicyType;
(function (PolicyType) {
    PolicyType["Group"] = "g";
    PolicyType["User"] = "u";
})(PolicyType || (exports.PolicyType = PolicyType = {}));


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Filter = void 0;
var Filter;
(function (Filter) {
    Filter["Search"] = "search";
    Filter["StorageLocation"] = "storageLocation";
    Filter["Schedule"] = "schedule";
    Filter["Status"] = "status";
    Filter["Backup"] = "backup";
    Filter["RepositoryType"] = "repositoryType";
    Filter["AccessMode"] = "accessMode";
    Filter["Provider"] = "provider";
    Filter["Paused"] = "paused";
    Filter["TargetKind"] = "targetKind";
})(Filter || (exports.Filter = Filter = {}));


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogType = void 0;
var LogType;
(function (LogType) {
    LogType["VeleroServer"] = "velero";
    LogType["VeleroAgent"] = "velero-agent";
    LogType["VeleroUI"] = "velero-agent";
})(LogType || (exports.LogType = LogType = {}));


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(77), exports);


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.REGEX = void 0;
exports.REGEX = {
    k8sResourceName: /^[A-Za-z0-9]([A-Za-z0-9_.-]{0,61}[A-Za-z0-9])?$/,
    k8sSimpleResource: /^[a-z]+$/,
    k8sGroupedResource: /^([a-z0-9.-]+\.[a-z]{2,})\/[a-z]+$/,
    k8sLabel: /^(?:[a-z0-9](?:[-a-z0-9]*[a-z0-9])?\.)*[a-z]{2,}\/[A-Za-z0-9]([A-Za-z0-9_.-]{0,61}[A-Za-z0-9])?$/,
    s3Bucket: /^(?!^\d+\.\d+\.\d+\.\d+$)(?!-)[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/,
    field: /^[a-zA-Z0-9_-]+$/,
};


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sortDate = exports.sortAlphabetically = exports.slice = exports.sort = exports.filters = void 0;
const shared_types_1 = __webpack_require__(59);
const filterValueGetters = {
    [shared_types_1.Filter.AccessMode]: (item) => item.spec?.accessMode,
    [shared_types_1.Filter.Provider]: (item) => item.spec?.provider,
    [shared_types_1.Filter.RepositoryType]: (item) => item.spec?.repositoryType,
    [shared_types_1.Filter.Schedule]: (item) => item.metadata?.labels?.['velero.io/schedule-name'] ||
        item.spec?.scheduleName,
    [shared_types_1.Filter.StorageLocation]: (item) => item.spec?.backupStorageLocation || item.spec?.template?.storageLocation,
    [shared_types_1.Filter.Backup]: (item) => item.spec?.backupName || item.spec?.tags?.backup,
    [shared_types_1.Filter.Status]: (item) => item.status?.phase,
    [shared_types_1.Filter.Paused]: (item) => item.spec?.paused?.toString(),
    [shared_types_1.Filter.TargetKind]: (item) => item.spec?.target?.kind,
};
const sortGetters = {
    [shared_types_1.SortBy.Name]: (item) => item.metadata?.name || 'z',
    [shared_types_1.SortBy.Schedule]: (item) => item.metadata?.labels?.['velero.io/schedule-name'] ||
        item.spec?.scheduleName,
    [shared_types_1.SortBy.StorageLocation]: (item) => item.spec?.template?.storageLocation ||
        item.spec?.backupStorageLocation ||
        '',
    [shared_types_1.SortBy.Provider]: (item) => item.spec?.provider,
    [shared_types_1.SortBy.RepositoryType]: (item) => item.spec?.repositoryType,
    [shared_types_1.SortBy.Expiration]: (item) => new Date(item.status?.expiration),
    [shared_types_1.SortBy.LastMaintenanceTime]: (item) => new Date(item.status?.lastMaintenanceTime),
    [shared_types_1.SortBy.StartTimestamp]: (item) => new Date(item.status?.startTimestamp),
    [shared_types_1.SortBy.CompletionTimestamp]: (item) => new Date(item.status?.completionTimestamp),
    [shared_types_1.SortBy.ProcessedTimestamp]: (item) => new Date(item.status?.processedTimestamp),
    [shared_types_1.SortBy.LastBackup]: (item) => new Date(item.status?.lastBackup),
    [shared_types_1.SortBy.LastSync]: (item) => new Date(item.status?.lastSyncedTime),
};
const initAvailableFilters = () => {
    return Object.fromEntries(Object.values(shared_types_1.Filter).map((key) => [key, []]));
};
const hasFilterValue = (filters, filterType, value) => {
    if (!value) {
        return true;
    }
    return filters[filterType]?.some((filter) => filter.value === value);
};
function getValidValuesForFilter(items, activeFilters, targetFilter) {
    return items
        .filter((item) => {
        return Object.entries(activeFilters).every(([key, value]) => {
            if (key === targetFilter || !value) {
                return true;
            }
            const getter = filterValueGetters[key];
            if (!getter) {
                return true;
            }
            const val = getter(item);
            if (key === shared_types_1.Filter.Status) {
                return value.split(',').includes(val);
            }
            return val === value;
        });
    })
        .map((item) => filterValueGetters[targetFilter]?.(item))
        .filter((v, i, self) => v && self.indexOf(v) === i);
}
const getFiltersValues = (filters, item) => {
    Object.entries(filterValueGetters).forEach(([filterKey, getter]) => {
        const value = getter(item);
        if (value && !hasFilterValue(filters, filterKey, value)) {
            filters[filterKey].push({ value, disabled: false });
        }
    });
};
const filters = (response, search) => {
    const availableFilters = initAvailableFilters();
    const originalItems = [...response.items];
    const filterTypes = Object.values(shared_types_1.Filter).filter((f) => f !== shared_types_1.Filter.Search);
    response.items = response.items.filter((item) => {
        getFiltersValues(availableFilters, item);
        if (search?.[shared_types_1.Filter.Search] &&
            !item.metadata.name
                .toLowerCase()
                .includes(search?.[shared_types_1.Filter.Search].toLowerCase())) {
            return false;
        }
        return !filterTypes.some((filterType) => search?.[filterType] &&
            filterValueGetters[filterType]?.(item) !== search?.[filterType]);
    });
    filterTypes.forEach((filterType) => {
        const validValues = getValidValuesForFilter(originalItems, search || {}, filterType);
        availableFilters[filterType].forEach((option) => {
            option.disabled = !validValues.includes(option.value);
        });
    });
    return {
        ...response,
        total: response.items.length,
        filters: {
            [shared_types_1.Filter.Status]: availableFilters[shared_types_1.Filter.Status],
            [shared_types_1.Filter.AccessMode]: availableFilters[shared_types_1.Filter.AccessMode],
            [shared_types_1.Filter.Provider]: availableFilters[shared_types_1.Filter.Provider],
            [shared_types_1.Filter.RepositoryType]: availableFilters[shared_types_1.Filter.RepositoryType],
            [shared_types_1.Filter.Schedule]: availableFilters[shared_types_1.Filter.Schedule],
            [shared_types_1.Filter.StorageLocation]: availableFilters[shared_types_1.Filter.StorageLocation],
            [shared_types_1.Filter.Backup]: availableFilters[shared_types_1.Filter.Backup],
            [shared_types_1.Filter.TargetKind]: availableFilters[shared_types_1.Filter.TargetKind],
            [shared_types_1.Filter.Paused]: availableFilters[shared_types_1.Filter.Paused],
        },
    };
};
exports.filters = filters;
const sort = (response, by, direction) => {
    const getter = sortGetters[by];
    if (!getter) {
        return response;
    }
    const isDateSort = getter(new Proxy({}, { get: () => undefined })) instanceof Date;
    response.items = [...response.items].sort((a, b) => {
        const aValue = getter(a);
        const bValue = getter(b);
        if (isDateSort) {
            return (0, exports.sortDate)(aValue instanceof Date ? aValue : new Date(aValue || 0), bValue instanceof Date ? bValue : new Date(bValue || 0), direction === shared_types_1.SortDirection.Ascending);
        }
        else {
            return (0, exports.sortAlphabetically)(String(aValue || ''), String(bValue || ''), direction === shared_types_1.SortDirection.Ascending);
        }
    });
    return response;
};
exports.sort = sort;
const slice = (response, offset = 0, limit) => {
    return {
        ...response,
        items: limit
            ? response.items.slice(offset, offset + limit)
            : response.items,
    };
};
exports.slice = slice;
const sortAlphabetically = (a, b, ascending = true) => (ascending ? a?.localeCompare(b) : -1 * a?.localeCompare(b));
exports.sortAlphabetically = sortAlphabetically;
const sortDate = (a, b, ascending = true) => ascending ? a.getTime() - b.getTime() : b.getTime() - a.getTime();
exports.sortDate = sortDate;


/***/ }),
/* 79 */
/***/ ((module) => {

module.exports = require("@nestjs/axios");

/***/ }),
/* 80 */
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBackupDto = exports.CreateBackupScratchDto = exports.CreateBackupUploaderConfigDto = exports.CreateBackupScheduleDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(82);
const class_transformer_1 = __webpack_require__(83);
const velero_1 = __webpack_require__(12);
const shared_types_1 = __webpack_require__(59);
class CreateBackupScheduleDto {
}
exports.CreateBackupScheduleDto = CreateBackupScheduleDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateBackupScheduleDto.prototype, "name", void 0);
class CreateBackupUploaderConfigDto {
}
exports.CreateBackupUploaderConfigDto = CreateBackupUploaderConfigDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateBackupUploaderConfigDto.prototype, "parallelFilesUpload", void 0);
class CreateBackupScratchDto {
}
exports.CreateBackupScratchDto = CreateBackupScratchDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateBackupScratchDto.prototype, "includedNamespaces", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateBackupScratchDto.prototype, "excludedNamespaces", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateBackupScratchDto.prototype, "includedResources", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateBackupScratchDto.prototype, "excludedResources", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateBackupScratchDto.prototype, "includedClusterScopedResources", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateBackupScratchDto.prototype, "excludedClusterScopedResources", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateBackupScratchDto.prototype, "includedNamespaceScopedResources", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateBackupScratchDto.prototype, "excludedNamespaceScopedResources", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    tslib_1.__metadata("design:type", Object)
], CreateBackupScratchDto.prototype, "labelSelector", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], CreateBackupScratchDto.prototype, "orLabelSelectors", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateBackupScratchDto.prototype, "snapshotVolumes", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateBackupScratchDto.prototype, "ttl", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateBackupScratchDto.prototype, "includeClusterResources", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateBackupScratchDto.prototype, "storageLocation", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateBackupScratchDto.prototype, "volumeSnapshotLocations", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateBackupScratchDto.prototype, "defaultVolumesToFsBackup", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateBackupScratchDto.prototype, "orderedResources", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateBackupScratchDto.prototype, "sciSnapshotTimeout", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateBackupScratchDto.prototype, "itemOperationTimeout", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateBackupScratchDto.prototype, "snapshotMoveData", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateBackupScratchDto.prototype, "dataMover", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    tslib_1.__metadata("design:type", Object)
], CreateBackupScratchDto.prototype, "resourcePolicy", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateBackupUploaderConfigDto),
    tslib_1.__metadata("design:type", typeof (_b = typeof velero_1.V1UploaderConfigForBackup !== "undefined" && velero_1.V1UploaderConfigForBackup) === "function" ? _b : Object)
], CreateBackupScratchDto.prototype, "uploaderConfig", void 0);
class CreateBackupDto {
}
exports.CreateBackupDto = CreateBackupDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateBackupDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(shared_types_1.CreateBackupTypeEnum),
    tslib_1.__metadata("design:type", typeof (_c = typeof shared_types_1.CreateBackupTypeEnum !== "undefined" && shared_types_1.CreateBackupTypeEnum) === "function" ? _c : Object)
], CreateBackupDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Record !== "undefined" && Record) === "function" ? _d : Object)
], CreateBackupDto.prototype, "labels", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_transformer_1.Type)((opts) => opts.object.type === shared_types_1.CreateBackupTypeEnum.FROM_SCHEDULE
        ? CreateBackupScheduleDto
        : CreateBackupScratchDto),
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", Object)
], CreateBackupDto.prototype, "spec", void 0);


/***/ }),
/* 82 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 83 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseVeleroUILog = exports.parseVeleroLog = void 0;
const execRegex = (regex, line) => {
    const result = regex.exec(line);
    if (result && result[1]) {
        return result[1].replace(/velero\//, '').replace(/\/plugins\//, '');
    }
    return null;
};
const parseValueGetters = {
    plugin: (line) => execRegex(/plugin=([^\s]+)/, line),
    backupStorageLocation: (line) => execRegex(/backup-storage-location=([^\s]+)/, line) ||
        execRegex(/backupLocation=([^\s]+)/, line) ||
        execRegex(/bsl=([^\s]+)/, line),
    volumeSnapshotLocation: (line) => execRegex(/volume-snapshot-location=([^\s]+)/, line) ||
        execRegex(/volumeSnapshotLocation=([^\s]+)/, line) ||
        execRegex(/vsl=([^\s]+)/, line),
    backup: (line) => execRegex(/backup=([^\s]+)/, line),
    backupRepository: (line) => execRegex(/backupRepo=([^\s]+)/, line),
    podVolumeBackup: (line) => execRegex(/podvolumebackup=([^\s]+)/, line) ||
        execRegex(/pvb=([^\s]+)/, line),
    podVolumeRestore: (line) => execRegex(/podvolumerestore=([^\s]+)/, line) ||
        execRegex(/pvr=([^\s]+)/, line),
    namespace: (line) => execRegex(/namespace=([^\s]+)/, line),
    resource: (line) => execRegex(/resource=([^\s]+)/, line),
    group: (line) => execRegex(/group=([^\s]+)/, line),
    name: (line) => execRegex(/name=([^\s]+)/, line),
    logSource: (line) => execRegex(/logSource="([^"]+)"/, line),
    error: (line) => execRegex(/error="([^"]+)"/, line),
    expiration: (line) => execRegex(/error="([^"]+)"/, line),
    deleteBackupRequest: (line) => execRegex(/deleteBackupRequest=([^\s]+)/, line),
    serverStatusRequest: (line) => execRegex(/serverStatusRequest=([^\s]+)/, line),
    downloadRequest: (line) => execRegex(/downloadRequest=([^\s]+)/, line),
};
const parseVeleroLog = (line) => {
    try {
        const regex = /time="([^"]+)"\s+level=([^\s]+)\s+msg="([^"]+)"/;
        const match = regex.exec(line);
        if (!match) {
            return null;
        }
        const [, time, level, msg] = match;
        const object = {
            date: time,
            level,
            message: msg,
            raw: line,
        };
        Object.entries(parseValueGetters).forEach(([key, value]) => {
            const getter = parseValueGetters[key];
            if (!getter) {
                return null;
            }
            const val = getter(line);
            if (val) {
                object[key] = val;
            }
        });
        return object;
    }
    catch (error) {
        return null;
    }
};
exports.parseVeleroLog = parseVeleroLog;
const parseVeleroUILog = (line) => {
    if (!line) {
        return null;
    }
    try {
        const object = JSON.parse(line);
        if (!object) {
            return null;
        }
        return {
            date: object.timestamp,
            level: object.level,
            message: object.message,
            raw: line,
        };
    }
    catch (error) {
        return null;
    }
};
exports.parseVeleroUILog = parseVeleroUILog;


/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BackupController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const backup_service_1 = __webpack_require__(8);
const rxjs_1 = __webpack_require__(11);
const velero_1 = __webpack_require__(12);
const download_request_service_1 = __webpack_require__(49);
const k8s_custom_object_service_1 = __webpack_require__(56);
const backup_dto_1 = __webpack_require__(81);
const check_policies_decorator_1 = __webpack_require__(86);
const shared_types_1 = __webpack_require__(59);
const k8s_custom_object_controller_1 = __webpack_require__(87);
const subject_decorator_1 = __webpack_require__(91);
const k8s_custom_object_dto_1 = __webpack_require__(88);
const cache_manager_1 = __webpack_require__(92);
const express_1 = __webpack_require__(93);
let BackupController = class BackupController extends k8s_custom_object_controller_1.K8sCustomObjectController {
    constructor(backupService, downloadRequestService, k8sCustomObjectService) {
        super(k8sCustomObjectService, velero_1.Resources.BACKUP);
        this.backupService = backupService;
        this.downloadRequestService = downloadRequestService;
        this.k8sCustomObjectService = k8sCustomObjectService;
    }
    download(names) {
        return (0, rxjs_1.forkJoin)(names.map((name) => this.downloadRequestService.create({
            name,
            kind: velero_1.V1DownloadTargetKind.BackupContents,
        })));
    }
    create(data) {
        return this.backupService.create(data);
    }
    logs(name) {
        return this.backupService.logs(name);
    }
    async downloadByName(name, res) {
        const response = await (0, rxjs_1.lastValueFrom)(this.backupService.downloadByName(name));
        res.setHeader('Content-Disposition', `attachment; filename=${name}.tar.gz`);
        response.data.pipe(res);
    }
    delete(names, forced) {
        if (forced) {
            return super.delete(names, forced);
        }
        return this.backupService.delete(names);
    }
    deleteByName(params, forced) {
        if (forced) {
            return super.deleteByName(params, forced);
        }
        return this.backupService.deleteByName(params.name);
    }
};
exports.BackupController = BackupController;
tslib_1.__decorate([
    (0, common_1.Post)('/download'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", void 0)
], BackupController.prototype, "download", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Create, velero_1.Resources.BACKUP.plural)),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof backup_dto_1.CreateBackupDto !== "undefined" && backup_dto_1.CreateBackupDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BackupController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)('/:name/logs'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Logs, velero_1.Resources.BACKUP.plural)),
    tslib_1.__param(0, (0, common_1.Param)('name')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], BackupController.prototype, "logs", null);
tslib_1.__decorate([
    (0, common_1.Get)('/:name/download'),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Download, velero_1.Resources.BACKUP.plural)),
    tslib_1.__param(0, (0, common_1.Param)('name')),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BackupController.prototype, "downloadByName", null);
tslib_1.__decorate([
    (0, common_1.Delete)(),
    (0, check_policies_decorator_1.CheckPolicies)((ability, resource) => ability.can(shared_types_1.Action.Delete, resource)),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Query)('forced', new common_1.DefaultValuePipe(false), common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Boolean]),
    tslib_1.__metadata("design:returntype", void 0)
], BackupController.prototype, "delete", null);
tslib_1.__decorate([
    (0, common_1.Delete)('/:name'),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Delete, velero_1.Resources.BACKUP.plural)),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__param(1, (0, common_1.Query)('forced', new common_1.DefaultValuePipe(false), common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof k8s_custom_object_dto_1.K8sCustomObjectParams !== "undefined" && k8s_custom_object_dto_1.K8sCustomObjectParams) === "function" ? _g : Object, Boolean]),
    tslib_1.__metadata("design:returntype", void 0)
], BackupController.prototype, "deleteByName", null);
exports.BackupController = BackupController = tslib_1.__decorate([
    (0, common_1.Controller)(velero_1.Resources.BACKUP.route),
    (0, subject_decorator_1.Subject)(velero_1.Resources.BACKUP.plural),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof backup_service_1.BackupService !== "undefined" && backup_service_1.BackupService) === "function" ? _a : Object, typeof (_b = typeof download_request_service_1.DownloadRequestService !== "undefined" && download_request_service_1.DownloadRequestService) === "function" ? _b : Object, typeof (_c = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _c : Object])
], BackupController);


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckPolicies = exports.CHECK_POLICIES_KEY = void 0;
const common_1 = __webpack_require__(2);
exports.CHECK_POLICIES_KEY = 'check_policy';
const CheckPolicies = (...handlers) => (0, common_1.SetMetadata)(exports.CHECK_POLICIES_KEY, handlers);
exports.CheckPolicies = CheckPolicies;


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.K8sCustomObjectController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const rxjs_1 = __webpack_require__(11);
const k8s_custom_object_dto_1 = __webpack_require__(88);
const shared_types_1 = __webpack_require__(59);
const check_policies_decorator_1 = __webpack_require__(86);
const search_dto_1 = __webpack_require__(89);
class K8sCustomObjectController {
    constructor(k8sCustomObjectService, resource) {
        this.k8sCustomObjectService = k8sCustomObjectService;
        this.resource = resource;
    }
    get(params, queries) {
        return this.k8sCustomObjectService.get(this.resource.plural, queries);
    }
    getByName(params) {
        return this.k8sCustomObjectService.getByName(this.resource.plural, params.name);
    }
    delete(names, forced) {
        return this.k8sCustomObjectService.delete(this.resource.plural, names);
    }
    deleteByName(params, forced) {
        return this.k8sCustomObjectService.deleteByName(this.resource.plural, params.name);
    }
}
exports.K8sCustomObjectController = K8sCustomObjectController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, check_policies_decorator_1.CheckPolicies)((ability, resource) => ability.can(shared_types_1.Action.Read, resource)),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__param(1, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof k8s_custom_object_dto_1.K8sCustomObjectParams !== "undefined" && k8s_custom_object_dto_1.K8sCustomObjectParams) === "function" ? _a : Object, typeof (_b = typeof search_dto_1.SearchDto !== "undefined" && search_dto_1.SearchDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], K8sCustomObjectController.prototype, "get", null);
tslib_1.__decorate([
    (0, common_1.Get)('/:name'),
    (0, check_policies_decorator_1.CheckPolicies)((ability, resource) => ability.can(shared_types_1.Action.Read, resource)),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof k8s_custom_object_dto_1.K8sCustomObjectParams !== "undefined" && k8s_custom_object_dto_1.K8sCustomObjectParams) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], K8sCustomObjectController.prototype, "getByName", null);
tslib_1.__decorate([
    (0, common_1.Delete)(),
    (0, check_policies_decorator_1.CheckPolicies)((ability, resource) => ability.can(shared_types_1.Action.Delete, resource)),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Query)('forced', new common_1.DefaultValuePipe(false), common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Boolean]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _f : Object)
], K8sCustomObjectController.prototype, "delete", null);
tslib_1.__decorate([
    (0, common_1.Delete)('/:name'),
    (0, check_policies_decorator_1.CheckPolicies)((ability, resource) => ability.can(shared_types_1.Action.Delete, resource)),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__param(1, (0, common_1.Query)('forced', new common_1.DefaultValuePipe(false), common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof k8s_custom_object_dto_1.K8sCustomObjectParams !== "undefined" && k8s_custom_object_dto_1.K8sCustomObjectParams) === "function" ? _g : Object, Boolean]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], K8sCustomObjectController.prototype, "deleteByName", null);


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.K8sCustomObjectParams = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(82);
const velero_1 = __webpack_require__(12);
class K8sCustomObjectParams {
}
exports.K8sCustomObjectParams = K8sCustomObjectParams;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(velero_1.PLURALS),
    tslib_1.__metadata("design:type", String)
], K8sCustomObjectParams.prototype, "plural", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], K8sCustomObjectParams.prototype, "name", void 0);


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchDto = exports.SearchFiltersDto = exports.SearchSortDto = exports.SearchPaginationDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(82);
const class_transformer_1 = __webpack_require__(83);
const shared_types_1 = __webpack_require__(59);
const velero_1 = __webpack_require__(12);
const mapped_types_1 = __webpack_require__(90);
class SearchPaginationDto {
}
exports.SearchPaginationDto = SearchPaginationDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => (value !== undefined ? parseFloat(value) : 0)),
    tslib_1.__metadata("design:type", Number)
], SearchPaginationDto.prototype, "offset", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => (value !== undefined ? parseFloat(value) : 20)),
    tslib_1.__metadata("design:type", Number)
], SearchPaginationDto.prototype, "limit", void 0);
class SearchSortDto {
}
exports.SearchSortDto = SearchSortDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(shared_types_1.SortBy),
    tslib_1.__metadata("design:type", typeof (_a = typeof shared_types_1.SortBy !== "undefined" && shared_types_1.SortBy) === "function" ? _a : Object)
], SearchSortDto.prototype, "sortBy", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(shared_types_1.SortDirection),
    tslib_1.__metadata("design:type", typeof (_b = typeof shared_types_1.SortDirection !== "undefined" && shared_types_1.SortDirection) === "function" ? _b : Object)
], SearchSortDto.prototype, "sortDirection", void 0);
class SearchFiltersDto {
}
exports.SearchFiltersDto = SearchFiltersDto;
_c = shared_types_1.Filter.Search, _d = shared_types_1.Filter.StorageLocation, _e = shared_types_1.Filter.Schedule, _f = shared_types_1.Filter.Status, _g = shared_types_1.Filter.Backup, _j = shared_types_1.Filter.RepositoryType, _l = shared_types_1.Filter.AccessMode, _m = shared_types_1.Filter.Provider, _o = shared_types_1.Filter.TargetKind, _p = shared_types_1.Filter.Paused;
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value === '' ? undefined : value)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(shared_types_1.REGEX.k8sResourceName, {
        message: 'search must be 1 to 63 characters long, start and end with an alphanumeric character, and only contain letters, numbers, dashes, underscores, or dots',
    }),
    tslib_1.__metadata("design:type", String)
], SearchFiltersDto.prototype, _c, void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value === '' ? undefined : value)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SearchFiltersDto.prototype, _d, void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value === '' ? undefined : value)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SearchFiltersDto.prototype, _e, void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value === '' ? undefined : value)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SearchFiltersDto.prototype, _f, void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value === '' ? undefined : value)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SearchFiltersDto.prototype, _g, void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value === '' ? undefined : value)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(velero_1.V1BackupRepositoryType),
    tslib_1.__metadata("design:type", typeof (_h = typeof velero_1.V1BackupRepositoryType !== "undefined" && velero_1.V1BackupRepositoryType) === "function" ? _h : Object)
], SearchFiltersDto.prototype, _j, void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value === '' ? undefined : value)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(velero_1.V1BackupStorageLocationAccessMode),
    tslib_1.__metadata("design:type", typeof (_k = typeof velero_1.V1BackupStorageLocationAccessMode !== "undefined" && velero_1.V1BackupStorageLocationAccessMode) === "function" ? _k : Object)
], SearchFiltersDto.prototype, _l, void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value === '' ? undefined : value)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SearchFiltersDto.prototype, _m, void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value === '' ? undefined : value)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SearchFiltersDto.prototype, _o, void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value === '' ? undefined : value)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SearchFiltersDto.prototype, _p, void 0);
class SearchDto extends (0, mapped_types_1.IntersectionType)((0, mapped_types_1.IntersectionType)(SearchFiltersDto, SearchSortDto), SearchPaginationDto) {
}
exports.SearchDto = SearchDto;


/***/ }),
/* 90 */
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Subject = exports.SUBJECT_KEY = void 0;
const common_1 = __webpack_require__(2);
exports.SUBJECT_KEY = 'subject';
const Subject = (resource) => (0, common_1.SetMetadata)(exports.SUBJECT_KEY, resource);
exports.Subject = Subject;


/***/ }),
/* 92 */
/***/ ((module) => {

module.exports = require("@nestjs/cache-manager");

/***/ }),
/* 93 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteBackupRequestModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const delete_backup_request_controller_1 = __webpack_require__(95);
let DeleteBackupRequestModule = class DeleteBackupRequestModule {
};
exports.DeleteBackupRequestModule = DeleteBackupRequestModule;
exports.DeleteBackupRequestModule = DeleteBackupRequestModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [delete_backup_request_controller_1.DeleteBackupRequestController],
        providers: [],
        exports: [],
    })
], DeleteBackupRequestModule);


/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteBackupRequestController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const velero_1 = __webpack_require__(12);
const k8s_custom_object_service_1 = __webpack_require__(56);
const k8s_custom_object_controller_1 = __webpack_require__(87);
const subject_decorator_1 = __webpack_require__(91);
let DeleteBackupRequestController = class DeleteBackupRequestController extends k8s_custom_object_controller_1.K8sCustomObjectController {
    constructor(k8sCustomObjectService) {
        super(k8sCustomObjectService, velero_1.Resources.DELETE_BACKUP_REQUEST);
        this.k8sCustomObjectService = k8sCustomObjectService;
    }
};
exports.DeleteBackupRequestController = DeleteBackupRequestController;
exports.DeleteBackupRequestController = DeleteBackupRequestController = tslib_1.__decorate([
    (0, common_1.Controller)(velero_1.Resources.DELETE_BACKUP_REQUEST.route),
    (0, subject_decorator_1.Subject)(velero_1.Resources.DELETE_BACKUP_REQUEST.plural),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _a : Object])
], DeleteBackupRequestController);


/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DownloadRequestModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const download_request_service_1 = __webpack_require__(49);
const download_request_controller_1 = __webpack_require__(97);
let DownloadRequestModule = class DownloadRequestModule {
};
exports.DownloadRequestModule = DownloadRequestModule;
exports.DownloadRequestModule = DownloadRequestModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [download_request_controller_1.DownloadRequestController],
        providers: [download_request_service_1.DownloadRequestService],
        exports: [download_request_service_1.DownloadRequestService],
    })
], DownloadRequestModule);


/***/ }),
/* 97 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DownloadRequestController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const velero_1 = __webpack_require__(12);
const k8s_custom_object_service_1 = __webpack_require__(56);
const k8s_custom_object_controller_1 = __webpack_require__(87);
const subject_decorator_1 = __webpack_require__(91);
let DownloadRequestController = class DownloadRequestController extends k8s_custom_object_controller_1.K8sCustomObjectController {
    constructor(k8sCustomObjectService) {
        super(k8sCustomObjectService, velero_1.Resources.DOWNLOAD_REQUEST);
        this.k8sCustomObjectService = k8sCustomObjectService;
    }
};
exports.DownloadRequestController = DownloadRequestController;
exports.DownloadRequestController = DownloadRequestController = tslib_1.__decorate([
    (0, common_1.Controller)(velero_1.Resources.DOWNLOAD_REQUEST.route),
    (0, subject_decorator_1.Subject)(velero_1.Resources.DOWNLOAD_REQUEST.plural),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _a : Object])
], DownloadRequestController);


/***/ }),
/* 98 */
/***/ ((module) => {

module.exports = require("https");

/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScheduleModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const schedule_controller_1 = __webpack_require__(100);
const schedule_service_1 = __webpack_require__(101);
const backup_module_1 = __webpack_require__(7);
let ScheduleModule = class ScheduleModule {
};
exports.ScheduleModule = ScheduleModule;
exports.ScheduleModule = ScheduleModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [backup_module_1.BackupModule],
        controllers: [schedule_controller_1.ScheduleController],
        providers: [schedule_service_1.ScheduleService],
    })
], ScheduleModule);


/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScheduleController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const schedule_service_1 = __webpack_require__(101);
const rxjs_1 = __webpack_require__(11);
const velero_1 = __webpack_require__(12);
const k8s_custom_object_service_1 = __webpack_require__(56);
const schedule_dto_1 = __webpack_require__(103);
const subject_decorator_1 = __webpack_require__(91);
const k8s_custom_object_controller_1 = __webpack_require__(87);
const check_policies_decorator_1 = __webpack_require__(86);
const shared_types_1 = __webpack_require__(59);
const cache_manager_1 = __webpack_require__(92);
let ScheduleController = class ScheduleController extends k8s_custom_object_controller_1.K8sCustomObjectController {
    constructor(scheduleService, k8sCustomObjectService) {
        super(k8sCustomObjectService, velero_1.Resources.SCHEDULE);
        this.scheduleService = scheduleService;
        this.k8sCustomObjectService = k8sCustomObjectService;
    }
    create(data) {
        return this.scheduleService.create(data);
    }
    editByName(name, data) {
        return this.scheduleService.edit(name, data);
    }
    pause(name) {
        return this.scheduleService.togglePause(name, true);
    }
    unpause(name) {
        return this.scheduleService.togglePause(name, false);
    }
    stats(name) {
        return this.scheduleService.stats(name);
    }
};
exports.ScheduleController = ScheduleController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Create, velero_1.Resources.SCHEDULE.plural)),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof schedule_dto_1.CreateScheduleDto !== "undefined" && schedule_dto_1.CreateScheduleDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ScheduleController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Put)('/:name'),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Update, velero_1.Resources.SCHEDULE.plural)),
    tslib_1.__param(0, (0, common_1.Param)('name')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof schedule_dto_1.EditScheduleDto !== "undefined" && schedule_dto_1.EditScheduleDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ScheduleController.prototype, "editByName", null);
tslib_1.__decorate([
    (0, common_1.Post)('/:name/pause'),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Update, velero_1.Resources.SCHEDULE.plural)),
    tslib_1.__param(0, (0, common_1.Param)('name')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], ScheduleController.prototype, "pause", null);
tslib_1.__decorate([
    (0, common_1.Post)('/:name/unpause'),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Update, velero_1.Resources.SCHEDULE.plural)),
    tslib_1.__param(0, (0, common_1.Param)('name')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _f : Object)
], ScheduleController.prototype, "unpause", null);
tslib_1.__decorate([
    (0, common_1.Get)('/:name/stats'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Read, velero_1.Resources.SCHEDULE.plural)),
    tslib_1.__param(0, (0, common_1.Param)('name')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ScheduleController.prototype, "stats", null);
exports.ScheduleController = ScheduleController = tslib_1.__decorate([
    (0, common_1.Controller)(velero_1.Resources.SCHEDULE.route),
    (0, subject_decorator_1.Subject)(velero_1.Resources.SCHEDULE.plural),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof schedule_service_1.ScheduleService !== "undefined" && schedule_service_1.ScheduleService) === "function" ? _a : Object, typeof (_b = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _b : Object])
], ScheduleController);


/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var ScheduleService_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScheduleService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const client_node_1 = __webpack_require__(10);
const k8s_utils_1 = __webpack_require__(9);
const rxjs_1 = __webpack_require__(11);
const velero_1 = __webpack_require__(12);
const config_1 = __webpack_require__(50);
const schedule_utils_1 = __webpack_require__(102);
const logger_service_1 = __webpack_require__(57);
const k8s_custom_object_service_1 = __webpack_require__(56);
const k8s_custom_object_utils_1 = __webpack_require__(52);
const velero_constants_1 = __webpack_require__(51);
const shared_types_1 = __webpack_require__(59);
const backup_service_1 = __webpack_require__(8);
let ScheduleService = ScheduleService_1 = class ScheduleService {
    constructor(k8s, logger, configService, k8sCustomObjectService, backupService) {
        this.k8s = k8s;
        this.logger = logger;
        this.configService = configService;
        this.k8sCustomObjectService = k8sCustomObjectService;
        this.backupService = backupService;
        this.k8sCustomObjectApi = this.k8s.makeApiClient(client_node_1.CustomObjectsApi);
    }
    create(data) {
        return (0, rxjs_1.of)((0, k8s_custom_object_utils_1.createK8sCustomObject)(data.name, this.configService.get('velero.namespace'), velero_1.Resources.SCHEDULE, data.labels, data.spec)).pipe((0, rxjs_1.concatMap)((body) => this.k8sCustomObjectService.create(velero_1.Resources.SCHEDULE.plural, body)));
    }
    edit(name, data) {
        return (0, rxjs_1.of)((0, k8s_custom_object_utils_1.patchK8sCustomObjectSpec)(data.spec)).pipe((0, rxjs_1.concatMap)((body) => this.k8sCustomObjectService.edit(velero_1.Resources.SCHEDULE.plural, name, body)));
    }
    togglePause(name, paused) {
        this.logger.debug(`Toggle ${paused ? 'paused' : 'resumed'} for ${name}...`, ScheduleService_1.name);
        return (0, rxjs_1.of)((0, schedule_utils_1.patchPauseSchedule)(paused))
            .pipe((0, rxjs_1.concatMap)((body) => this.k8sCustomObjectApi.patchNamespacedCustomObject({
            group: velero_constants_1.VELERO.GROUP,
            version: velero_constants_1.VELERO.VERSION,
            namespace: this.configService.get('velero.namespace'),
            plural: velero_1.Resources.SCHEDULE.plural,
            name,
            body,
        }, (0, client_node_1.setHeaderOptions)('Content-Type', client_node_1.PatchStrategy.JsonPatch))))
            .pipe((0, rxjs_1.tap)(() => this.logger.debug(`Toggle ${paused ? 'paused' : 'resumed'} for ${name}... SUCCESS`, ScheduleService_1.name)));
    }
    stats(name) {
        const backups = this.k8sCustomObjectService.get(velero_1.Resources.BACKUP.plural, {
            search: name,
            sortBy: shared_types_1.SortBy.CompletionTimestamp,
            sortDirection: shared_types_1.SortDirection.Ascending,
        });
        const podVolumes = this.k8sCustomObjectService.get(velero_1.Resources.POD_VOLUME_BACKUP.plural, {
            search: name,
        });
        return (0, rxjs_1.forkJoin)([backups, podVolumes]).pipe((0, rxjs_1.switchMap)(([backups, podVolumes]) => {
            return (0, rxjs_1.forkJoin)(backups.items.map((backup) => this.backupService.getContentSize(backup.metadata.name).pipe((0, rxjs_1.catchError)(() => (0, rxjs_1.of)(0)), (0, rxjs_1.map)((size) => ({ name: backup.metadata.name, size }))))).pipe((0, rxjs_1.map)((backupsContentSizes) => {
                const stats = {
                    duration: { series: [{ name: 'Duration', data: [] }] },
                    size: {
                        series: [
                            { name: 'Pod Volumes', data: [] },
                            { name: 'Backup Content', data: [] },
                            { name: 'Total', data: [] },
                        ],
                    },
                    items: { series: [{ name: 'Items', data: [] }] },
                };
                for (const backup of backups.items) {
                    const backupName = backup.metadata.name.slice(name.length + 1);
                    const contentSize = backupsContentSizes.find((v) => v.name === backup.metadata.name)
                        ?.size || 0;
                    const durationMs = new Date(backup.status?.completionTimestamp).getTime() -
                        new Date(backup.status?.startTimestamp).getTime();
                    stats.duration.series[0].data.push({
                        x: backupName,
                        y: durationMs / 1000,
                    });
                    stats.items.series[0].data.push({
                        x: backupName,
                        y: backup.status?.progress?.itemsBackedUp || 0,
                    });
                    const podVolumeSize = podVolumes.items
                        .filter((pv) => pv.metadata.name.includes(backup.metadata.name))
                        .reduce((acc, pv) => acc + (pv.status?.progress?.bytesDone || 0), 0);
                    stats.size.series[0].data.push({
                        x: backupName,
                        y: podVolumeSize,
                    });
                    stats.size.series[1].data.push({ x: backupName, y: contentSize });
                    stats.size.series[2].data.push({
                        x: backupName,
                        y: podVolumeSize + contentSize,
                    });
                }
                return stats;
            }));
        }));
    }
};
exports.ScheduleService = ScheduleService;
exports.ScheduleService = ScheduleService = ScheduleService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(k8s_utils_1.K8S_CONNECTION)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof client_node_1.KubeConfig !== "undefined" && client_node_1.KubeConfig) === "function" ? _a : Object, typeof (_b = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object, typeof (_d = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _d : Object, typeof (_e = typeof backup_service_1.BackupService !== "undefined" && backup_service_1.BackupService) === "function" ? _e : Object])
], ScheduleService);


/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.patchPauseSchedule = void 0;
const patchPauseSchedule = (paused) => [
    {
        op: paused ? 'replace' : 'remove',
        path: '/spec/paused',
        value: true,
    },
];
exports.patchPauseSchedule = patchPauseSchedule;


/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EditScheduleDto = exports.CreateScheduleDto = exports.CreateScheduleSpecDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(82);
const class_transformer_1 = __webpack_require__(83);
const velero_1 = __webpack_require__(12);
const backup_dto_1 = __webpack_require__(81);
class CreateScheduleSpecDto {
    constructor() {
        this.useOwnerReferencesInBackup = true;
        this.paused = false;
        this.skipImmediately = false;
    }
}
exports.CreateScheduleSpecDto = CreateScheduleSpecDto;
tslib_1.__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => backup_dto_1.CreateBackupScratchDto),
    tslib_1.__metadata("design:type", typeof (_a = typeof velero_1.V1BackupSpec !== "undefined" && velero_1.V1BackupSpec) === "function" ? _a : Object)
], CreateScheduleSpecDto.prototype, "template", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateScheduleSpecDto.prototype, "schedule", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateScheduleSpecDto.prototype, "useOwnerReferencesInBackup", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateScheduleSpecDto.prototype, "paused", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateScheduleSpecDto.prototype, "skipImmediately", void 0);
class CreateScheduleDto {
}
exports.CreateScheduleDto = CreateScheduleDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateScheduleDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], CreateScheduleDto.prototype, "labels", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_transformer_1.Type)(() => CreateScheduleSpecDto),
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof velero_1.V1ScheduleSpec !== "undefined" && velero_1.V1ScheduleSpec) === "function" ? _c : Object)
], CreateScheduleDto.prototype, "spec", void 0);
class EditScheduleDto {
}
exports.EditScheduleDto = EditScheduleDto;
tslib_1.__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_transformer_1.Type)(() => CreateScheduleSpecDto),
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof velero_1.V1ScheduleSpec !== "undefined" && velero_1.V1ScheduleSpec) === "function" ? _d : Object)
], EditScheduleDto.prototype, "spec", void 0);


/***/ }),
/* 104 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageLocationModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const storage_location_controller_1 = __webpack_require__(105);
const storage_location_service_1 = __webpack_require__(106);
let StorageLocationModule = class StorageLocationModule {
};
exports.StorageLocationModule = StorageLocationModule;
exports.StorageLocationModule = StorageLocationModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [storage_location_controller_1.StorageLocationController],
        providers: [storage_location_service_1.StorageLocationService],
    })
], StorageLocationModule);


/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageLocationController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const storage_location_service_1 = __webpack_require__(106);
const velero_1 = __webpack_require__(12);
const k8s_custom_object_service_1 = __webpack_require__(56);
const storage_location_dto_1 = __webpack_require__(107);
const k8s_custom_object_controller_1 = __webpack_require__(87);
const subject_decorator_1 = __webpack_require__(91);
const check_policies_decorator_1 = __webpack_require__(86);
const shared_types_1 = __webpack_require__(59);
let StorageLocationController = class StorageLocationController extends k8s_custom_object_controller_1.K8sCustomObjectController {
    constructor(storageLocationService, k8sCustomObjectService) {
        super(k8sCustomObjectService, velero_1.Resources.BACKUP_STORAGE_LOCATION);
        this.storageLocationService = storageLocationService;
        this.k8sCustomObjectService = k8sCustomObjectService;
    }
    create(data) {
        return this.storageLocationService.create(data);
    }
    editByName(name, data) {
        return this.storageLocationService.edit(name, data);
    }
};
exports.StorageLocationController = StorageLocationController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Create, velero_1.Resources.BACKUP_STORAGE_LOCATION.plural)),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof storage_location_dto_1.CreateStorageLocationDto !== "undefined" && storage_location_dto_1.CreateStorageLocationDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], StorageLocationController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Put)('/:name'),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Update, velero_1.Resources.BACKUP_STORAGE_LOCATION.plural)),
    tslib_1.__param(0, (0, common_1.Param)('name')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof storage_location_dto_1.EditStorageLocationDto !== "undefined" && storage_location_dto_1.EditStorageLocationDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], StorageLocationController.prototype, "editByName", null);
exports.StorageLocationController = StorageLocationController = tslib_1.__decorate([
    (0, common_1.Controller)(velero_1.Resources.BACKUP_STORAGE_LOCATION.route),
    (0, subject_decorator_1.Subject)(velero_1.Resources.BACKUP_STORAGE_LOCATION.plural),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof storage_location_service_1.StorageLocationService !== "undefined" && storage_location_service_1.StorageLocationService) === "function" ? _a : Object, typeof (_b = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _b : Object])
], StorageLocationController);


/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageLocationService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const rxjs_1 = __webpack_require__(11);
const velero_1 = __webpack_require__(12);
const k8s_custom_object_service_1 = __webpack_require__(56);
const config_1 = __webpack_require__(50);
const k8s_custom_object_utils_1 = __webpack_require__(52);
let StorageLocationService = class StorageLocationService {
    constructor(k8sCustomObjectService, configService) {
        this.k8sCustomObjectService = k8sCustomObjectService;
        this.configService = configService;
    }
    create(data) {
        return (0, rxjs_1.of)((0, k8s_custom_object_utils_1.createK8sCustomObject)(data.name, this.configService.get('velero.namespace'), velero_1.Resources.BACKUP_STORAGE_LOCATION, data.labels, data.spec)).pipe((0, rxjs_1.concatMap)((body) => this.k8sCustomObjectService.create(velero_1.Resources.BACKUP_STORAGE_LOCATION.plural, body)));
    }
    edit(name, data) {
        return (0, rxjs_1.of)((0, k8s_custom_object_utils_1.patchK8sCustomObjectSpec)(data.spec)).pipe((0, rxjs_1.concatMap)((body) => this.k8sCustomObjectService.edit(velero_1.Resources.BACKUP_STORAGE_LOCATION.plural, name, body)));
    }
};
exports.StorageLocationService = StorageLocationService;
exports.StorageLocationService = StorageLocationService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], StorageLocationService);


/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EditStorageLocationDto = exports.CreateStorageLocationDto = exports.CreateStorageLocationSpecDto = exports.CreateStorageLocationObjectStorageDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(82);
const velero_1 = __webpack_require__(12);
const class_transformer_1 = __webpack_require__(83);
const shared_dto_1 = __webpack_require__(108);
class CreateStorageLocationObjectStorageDto {
}
exports.CreateStorageLocationObjectStorageDto = CreateStorageLocationObjectStorageDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateStorageLocationObjectStorageDto.prototype, "bucket", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateStorageLocationObjectStorageDto.prototype, "prefix", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateStorageLocationObjectStorageDto.prototype, "caCert", void 0);
class CreateStorageLocationSpecDto {
    constructor() {
        this.accessMode = velero_1.V1BackupStorageLocationAccessMode.ReadWrite;
        this.backupSyncPeriod = '1m';
        this.validationFrequency = '1m';
    }
}
exports.CreateStorageLocationSpecDto = CreateStorageLocationSpecDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(velero_1.V1BackupStorageLocationAccessMode),
    tslib_1.__metadata("design:type", typeof (_a = typeof velero_1.V1BackupStorageLocationAccessMode !== "undefined" && velero_1.V1BackupStorageLocationAccessMode) === "function" ? _a : Object)
], CreateStorageLocationSpecDto.prototype, "accessMode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateStorageLocationSpecDto.prototype, "provider", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateStorageLocationSpecDto.prototype, "backupSyncPeriod", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateStorageLocationSpecDto.prototype, "validationFrequency", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], CreateStorageLocationSpecDto.prototype, "labels", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => shared_dto_1.V1SpecCredentialDto),
    tslib_1.__metadata("design:type", typeof (_c = typeof velero_1.V1SpecCredential !== "undefined" && velero_1.V1SpecCredential) === "function" ? _c : Object)
], CreateStorageLocationSpecDto.prototype, "credential", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    tslib_1.__metadata("design:type", Object)
], CreateStorageLocationSpecDto.prototype, "config", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateStorageLocationObjectStorageDto),
    tslib_1.__metadata("design:type", typeof (_d = typeof velero_1.V1BackupStorageLocationObjectStorageLocation !== "undefined" && velero_1.V1BackupStorageLocationObjectStorageLocation) === "function" ? _d : Object)
], CreateStorageLocationSpecDto.prototype, "objectStorage", void 0);
class CreateStorageLocationDto {
}
exports.CreateStorageLocationDto = CreateStorageLocationDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateStorageLocationDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof Record !== "undefined" && Record) === "function" ? _e : Object)
], CreateStorageLocationDto.prototype, "labels", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_transformer_1.Type)(() => CreateStorageLocationSpecDto),
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", typeof (_f = typeof velero_1.V1BackupStorageLocationSpec !== "undefined" && velero_1.V1BackupStorageLocationSpec) === "function" ? _f : Object)
], CreateStorageLocationDto.prototype, "spec", void 0);
class EditStorageLocationDto {
}
exports.EditStorageLocationDto = EditStorageLocationDto;
tslib_1.__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_transformer_1.Type)(() => CreateStorageLocationSpecDto),
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", typeof (_g = typeof velero_1.V1BackupStorageLocationSpec !== "undefined" && velero_1.V1BackupStorageLocationSpec) === "function" ? _g : Object)
], EditStorageLocationDto.prototype, "spec", void 0);


/***/ }),
/* 108 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.V1SpecCredentialDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(82);
class V1SpecCredentialDto {
}
exports.V1SpecCredentialDto = V1SpecCredentialDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], V1SpecCredentialDto.prototype, "key", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], V1SpecCredentialDto.prototype, "name", void 0);


/***/ }),
/* 109 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RestoreModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const restore_controller_1 = __webpack_require__(110);
const restore_service_1 = __webpack_require__(111);
const delete_backup_request_module_1 = __webpack_require__(94);
const download_request_module_1 = __webpack_require__(96);
const axios_1 = __webpack_require__(79);
const https_1 = tslib_1.__importDefault(__webpack_require__(98));
let RestoreModule = class RestoreModule {
};
exports.RestoreModule = RestoreModule;
exports.RestoreModule = RestoreModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.register({
                httpsAgent: new https_1.default.Agent({
                    rejectUnauthorized: false,
                }),
            }),
            delete_backup_request_module_1.DeleteBackupRequestModule,
            download_request_module_1.DownloadRequestModule,
        ],
        controllers: [restore_controller_1.RestoreController],
        providers: [restore_service_1.RestoreService],
    })
], RestoreModule);


/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RestoreController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const restore_service_1 = __webpack_require__(111);
const rxjs_1 = __webpack_require__(11);
const velero_1 = __webpack_require__(12);
const k8s_custom_object_service_1 = __webpack_require__(56);
const download_request_service_1 = __webpack_require__(49);
const restore_dto_1 = __webpack_require__(112);
const subject_decorator_1 = __webpack_require__(91);
const k8s_custom_object_controller_1 = __webpack_require__(87);
const check_policies_decorator_1 = __webpack_require__(86);
const shared_types_1 = __webpack_require__(59);
const cache_manager_1 = __webpack_require__(92);
let RestoreController = class RestoreController extends k8s_custom_object_controller_1.K8sCustomObjectController {
    constructor(restoreService, downloadRequestService, k8sCustomObjectService) {
        super(k8sCustomObjectService, velero_1.Resources.RESTORE);
        this.restoreService = restoreService;
        this.downloadRequestService = downloadRequestService;
        this.k8sCustomObjectService = k8sCustomObjectService;
    }
    create(data) {
        return this.restoreService.create(data);
    }
    logs(name) {
        return this.restoreService.logs(name);
    }
};
exports.RestoreController = RestoreController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Create, velero_1.Resources.RESTORE.plural)),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof restore_dto_1.CreateRestoreDto !== "undefined" && restore_dto_1.CreateRestoreDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RestoreController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)('/:name/logs'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Logs, velero_1.Resources.RESTORE.plural)),
    tslib_1.__param(0, (0, common_1.Param)('name')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], RestoreController.prototype, "logs", null);
exports.RestoreController = RestoreController = tslib_1.__decorate([
    (0, common_1.Controller)(velero_1.Resources.RESTORE.route),
    (0, subject_decorator_1.Subject)(velero_1.Resources.RESTORE.plural),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof restore_service_1.RestoreService !== "undefined" && restore_service_1.RestoreService) === "function" ? _a : Object, typeof (_b = typeof download_request_service_1.DownloadRequestService !== "undefined" && download_request_service_1.DownloadRequestService) === "function" ? _b : Object, typeof (_c = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _c : Object])
], RestoreController);


/***/ }),
/* 111 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var RestoreService_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RestoreService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(50);
const rxjs_1 = __webpack_require__(11);
const velero_1 = __webpack_require__(12);
const zlib_1 = __webpack_require__(80);
const logger_service_1 = __webpack_require__(57);
const download_request_service_1 = __webpack_require__(49);
const axios_1 = __webpack_require__(79);
const k8s_custom_object_utils_1 = __webpack_require__(52);
const k8s_custom_object_service_1 = __webpack_require__(56);
const logs_utils_1 = __webpack_require__(84);
let RestoreService = RestoreService_1 = class RestoreService {
    constructor(logger, downloadRequestService, httpService, k8sCustomObjectService, configService) {
        this.logger = logger;
        this.downloadRequestService = downloadRequestService;
        this.httpService = httpService;
        this.k8sCustomObjectService = k8sCustomObjectService;
        this.configService = configService;
    }
    create(data) {
        return (0, rxjs_1.of)((0, k8s_custom_object_utils_1.createK8sCustomObject)(data.name, this.configService.get('velero.namespace'), velero_1.Resources.RESTORE, data.labels, data.spec)).pipe((0, rxjs_1.concatMap)((body) => this.k8sCustomObjectService.create(velero_1.Resources.RESTORE.plural, body)));
    }
    logs(name) {
        this.logger.debug(`Getting logs for ${name}...`, RestoreService_1.name);
        return (0, rxjs_1.from)(this.downloadRequestService.create({
            name,
            kind: velero_1.V1DownloadTargetKind.RestoreLog,
        }))
            .pipe((0, rxjs_1.concatMap)((downloadRequest) => this.httpService.get(downloadRequest?.status?.downloadURL, {
            responseType: 'arraybuffer',
        })))
            .pipe((0, rxjs_1.map)((response) => response.data))
            .pipe((0, rxjs_1.map)((buffer) => (0, zlib_1.unzipSync)(buffer)))
            .pipe((0, rxjs_1.map)((content) => content
            .toString()
            .split('\n')
            .map((line) => (0, logs_utils_1.parseVeleroLog)(line))
            .filter((log) => !!log)));
    }
};
exports.RestoreService = RestoreService;
exports.RestoreService = RestoreService = RestoreService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _a : Object, typeof (_b = typeof download_request_service_1.DownloadRequestService !== "undefined" && download_request_service_1.DownloadRequestService) === "function" ? _b : Object, typeof (_c = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _c : Object, typeof (_d = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _d : Object, typeof (_e = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _e : Object])
], RestoreService);


/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRestoreDto = exports.CreateRestoreSpecDto = exports.CreateRestoreStatusDto = exports.CreateRestoreUploaderConfigDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(82);
const velero_1 = __webpack_require__(12);
const class_transformer_1 = __webpack_require__(83);
class CreateRestoreUploaderConfigDto {
}
exports.CreateRestoreUploaderConfigDto = CreateRestoreUploaderConfigDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateRestoreUploaderConfigDto.prototype, "parallelFilesDownload", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateRestoreUploaderConfigDto.prototype, "writeSparseFiles", void 0);
class CreateRestoreStatusDto {
}
exports.CreateRestoreStatusDto = CreateRestoreStatusDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateRestoreStatusDto.prototype, "excludedNamespaces", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateRestoreStatusDto.prototype, "includedResources", void 0);
class CreateRestoreSpecDto {
    constructor() {
        this.restorePVs = true;
        this.preserveNodePorts = true;
        this.includeClusterResources = true;
    }
}
exports.CreateRestoreSpecDto = CreateRestoreSpecDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateRestoreSpecDto.prototype, "backupName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateRestoreSpecDto.prototype, "scheduleName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateRestoreSpecDto.prototype, "includedNamespaces", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateRestoreSpecDto.prototype, "excludedNamespaces", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateRestoreSpecDto.prototype, "includedResources", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateRestoreSpecDto.prototype, "excludedResources", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    tslib_1.__metadata("design:type", Object)
], CreateRestoreSpecDto.prototype, "namespaceMapping", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    tslib_1.__metadata("design:type", Object)
], CreateRestoreSpecDto.prototype, "labelSelector", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], CreateRestoreSpecDto.prototype, "orLabelSelectors", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateRestoreSpecDto.prototype, "restorePVs", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateRestoreStatusDto),
    tslib_1.__metadata("design:type", typeof (_b = typeof velero_1.V1RestoreStatusSpec !== "undefined" && velero_1.V1RestoreStatusSpec) === "function" ? _b : Object)
], CreateRestoreSpecDto.prototype, "restoreStatus", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateRestoreSpecDto.prototype, "preserveNodePorts", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateRestoreSpecDto.prototype, "includeClusterResources", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(velero_1.V1PolicyType),
    tslib_1.__metadata("design:type", typeof (_c = typeof velero_1.V1PolicyType !== "undefined" && velero_1.V1PolicyType) === "function" ? _c : Object)
], CreateRestoreSpecDto.prototype, "existingResourcePolicy", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateRestoreSpecDto.prototype, "itemOperationTimeout", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    tslib_1.__metadata("design:type", Object)
], CreateRestoreSpecDto.prototype, "resourceModifier", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateRestoreUploaderConfigDto),
    tslib_1.__metadata("design:type", typeof (_d = typeof velero_1.V1UploaderConfigForRestore !== "undefined" && velero_1.V1UploaderConfigForRestore) === "function" ? _d : Object)
], CreateRestoreSpecDto.prototype, "uploaderConfig", void 0);
class CreateRestoreDto {
}
exports.CreateRestoreDto = CreateRestoreDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateRestoreDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof Record !== "undefined" && Record) === "function" ? _e : Object)
], CreateRestoreDto.prototype, "labels", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateRestoreSpecDto),
    tslib_1.__metadata("design:type", typeof (_f = typeof velero_1.V1RestoreSpec !== "undefined" && velero_1.V1RestoreSpec) === "function" ? _f : Object)
], CreateRestoreDto.prototype, "spec", void 0);


/***/ }),
/* 113 */
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),
/* 114 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const health_controller_1 = __webpack_require__(116);
const terminus_1 = __webpack_require__(117);
const k8s_health_indicator_1 = __webpack_require__(121);
const axios_1 = __webpack_require__(79);
const velero_health_indicator_1 = __webpack_require__(118);
let HealthModule = class HealthModule {
};
exports.HealthModule = HealthModule;
exports.HealthModule = HealthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [terminus_1.TerminusModule, axios_1.HttpModule],
        controllers: [health_controller_1.HealthController],
        providers: [k8s_health_indicator_1.K8sHealthIndicator, velero_health_indicator_1.VeleroHealthIndicator],
    })
], HealthModule);


/***/ }),
/* 116 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const terminus_1 = __webpack_require__(117);
const rxjs_1 = __webpack_require__(11);
const velero_health_indicator_1 = __webpack_require__(118);
const public_decorator_1 = __webpack_require__(120);
const k8s_health_indicator_1 = __webpack_require__(121);
let HealthController = class HealthController {
    constructor(health, velero, k8s) {
        this.health = health;
        this.velero = velero;
        this.k8s = k8s;
    }
    check() {
        return this.health.check([
            () => (0, rxjs_1.lastValueFrom)(this.k8s.isHealthy()),
            () => (0, rxjs_1.lastValueFrom)(this.velero.isHealthy()),
        ]);
    }
};
exports.HealthController = HealthController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, terminus_1.HealthCheck)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], HealthController.prototype, "check", null);
exports.HealthController = HealthController = tslib_1.__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('health'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof terminus_1.HealthCheckService !== "undefined" && terminus_1.HealthCheckService) === "function" ? _a : Object, typeof (_b = typeof velero_health_indicator_1.VeleroHealthIndicator !== "undefined" && velero_health_indicator_1.VeleroHealthIndicator) === "function" ? _b : Object, typeof (_c = typeof k8s_health_indicator_1.K8sHealthIndicator !== "undefined" && k8s_health_indicator_1.K8sHealthIndicator) === "function" ? _c : Object])
], HealthController);


/***/ }),
/* 117 */
/***/ ((module) => {

module.exports = require("@nestjs/terminus");

/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VeleroHealthIndicator = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const rxjs_1 = __webpack_require__(11);
const terminus_1 = __webpack_require__(117);
const velero_service_1 = __webpack_require__(119);
let VeleroHealthIndicator = class VeleroHealthIndicator extends terminus_1.HealthIndicator {
    constructor(veleroService) {
        super();
        this.veleroService = veleroService;
    }
    isHealthy() {
        return (0, rxjs_1.from)(this.veleroService.getServerStatus()).pipe((0, rxjs_1.map)((podStatus) => this.getStatus('velero', podStatus?.phase === 'Running', {
            phase: podStatus?.phase,
        })));
    }
};
exports.VeleroHealthIndicator = VeleroHealthIndicator;
exports.VeleroHealthIndicator = VeleroHealthIndicator = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof velero_service_1.VeleroService !== "undefined" && velero_service_1.VeleroService) === "function" ? _a : Object])
], VeleroHealthIndicator);


/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var VeleroService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VeleroService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const client_node_1 = __webpack_require__(10);
const rxjs_1 = __webpack_require__(11);
const velero_constants_1 = __webpack_require__(51);
const config_1 = __webpack_require__(50);
const k8s_utils_1 = __webpack_require__(9);
const logger_service_1 = __webpack_require__(57);
let VeleroService = VeleroService_1 = class VeleroService {
    constructor(k8s, logger, configService) {
        this.k8s = k8s;
        this.logger = logger;
        this.configService = configService;
        this.k8sCoreV1Api = this.k8s.makeApiClient(client_node_1.CoreV1Api);
        this.findServer().subscribe();
    }
    checkServer() {
        return this.getServerStatus()
            .pipe((0, rxjs_1.catchError)(() => this.findServer()))
            .pipe((0, rxjs_1.map)(() => this.podServerName));
    }
    checkVeleroUI() {
        return this.getVeleroUIStatus()
            .pipe((0, rxjs_1.catchError)(() => this.findVeleroUI()))
            .pipe((0, rxjs_1.map)(() => this.podVeleroUIName));
    }
    getServerStatus() {
        return (0, rxjs_1.from)(this.k8sCoreV1Api.readNamespacedPodStatus({
            name: this.podServerName,
            namespace: this.configService.get('velero.namespace'),
        })).pipe((0, rxjs_1.map)((r) => r.status));
    }
    getVeleroUIStatus() {
        return (0, rxjs_1.from)(this.k8sCoreV1Api.readNamespacedPodStatus({
            name: this.podVeleroUIName,
            namespace: this.configService.get('app.namespace'),
        })).pipe((0, rxjs_1.map)((r) => r.status));
    }
    getVeleroUI() {
        return (0, rxjs_1.from)(this.k8sCoreV1Api.readNamespacedPod({
            name: this.podVeleroUIName,
            namespace: this.configService.get('app.namespace'),
        }));
    }
    getServer() {
        return (0, rxjs_1.from)(this.k8sCoreV1Api.readNamespacedPod({
            name: this.podServerName,
            namespace: this.configService.get('velero.namespace'),
        }));
    }
    getAgents() {
        this.logger.debug(`Finding Velero agent pods...`, VeleroService_1.name);
        return (0, rxjs_1.from)(this.k8sCoreV1Api.listNamespacedPod({
            namespace: this.configService.get('velero.namespace'),
        }))
            .pipe((0, rxjs_1.map)((r) => r.items))
            .pipe((0, rxjs_1.map)((pods) => pods.filter((pod) => pod.spec?.containers?.find((container) => container.name === velero_constants_1.VELERO.AGENT_CONTAINER_NAME))), (0, rxjs_1.tap)((pods) => this.logger.debug(`Found ${pods.length} Velero agent pods.`, VeleroService_1.name)));
    }
    findServer() {
        this.logger.debug(`Finding Velero server pod...`, VeleroService_1.name);
        return (0, rxjs_1.from)(this.k8sCoreV1Api.listNamespacedPod({
            namespace: this.configService.get('velero.namespace'),
        }))
            .pipe((0, rxjs_1.map)((r) => r.items))
            .pipe((0, rxjs_1.map)((pods) => pods.find((pod) => pod.spec?.containers?.find((container) => container.name === velero_constants_1.VELERO.SERVER_CONTAINER_NAME))))
            .pipe((0, rxjs_1.tap)((pod) => {
            if (pod) {
                this.logger.debug(`Found Velero server pod: ${pod.metadata.name}.`, VeleroService_1.name);
                this.podServerName = pod.metadata.name;
            }
            else {
                throw new Error('Cannot find Velero server!');
            }
        }));
    }
    findVeleroUI() {
        this.logger.debug(`Finding Velero UI pod...`, VeleroService_1.name);
        return (0, rxjs_1.from)(this.k8sCoreV1Api.listNamespacedPod({
            namespace: this.configService.get('app.namespace'),
        }))
            .pipe((0, rxjs_1.map)((r) => r.items))
            .pipe((0, rxjs_1.map)((pods) => pods.find((pod) => pod.spec?.containers?.find((container) => container.name === velero_constants_1.VELERO.UI_CONTAINER_NAME))))
            .pipe((0, rxjs_1.tap)((pod) => {
            if (pod) {
                this.logger.debug(`Found Velero UI pod: ${pod.metadata.name}.`, VeleroService_1.name);
                this.podVeleroUIName = pod.metadata.name;
            }
            else {
                throw new Error('Cannot find Velero UI!');
            }
        }));
    }
};
exports.VeleroService = VeleroService;
exports.VeleroService = VeleroService = VeleroService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(k8s_utils_1.K8S_CONNECTION)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof client_node_1.KubeConfig !== "undefined" && client_node_1.KubeConfig) === "function" ? _a : Object, typeof (_b = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], VeleroService);


/***/ }),
/* 120 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(2);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 121 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.K8sHealthIndicator = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const terminus_1 = __webpack_require__(117);
const k8s_utils_1 = __webpack_require__(9);
const client_node_1 = __webpack_require__(10);
const rxjs_1 = __webpack_require__(11);
const https_1 = tslib_1.__importDefault(__webpack_require__(98));
let K8sHealthIndicator = class K8sHealthIndicator extends terminus_1.HealthIndicator {
    constructor(k8s) {
        super();
        this.k8s = k8s;
        this.health = new client_node_1.Health(k8s);
    }
    isHealthy() {
        return (0, rxjs_1.from)(this.health.readyz({
            agent: new https_1.default.Agent({
                rejectUnauthorized: false,
            }),
        })).pipe((0, rxjs_1.map)((alive) => this.getStatus('k8s', alive)));
    }
};
exports.K8sHealthIndicator = K8sHealthIndicator;
exports.K8sHealthIndicator = K8sHealthIndicator = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(k8s_utils_1.K8S_CONNECTION)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof client_node_1.KubeConfig !== "undefined" && client_node_1.KubeConfig) === "function" ? _a : Object])
], K8sHealthIndicator);


/***/ }),
/* 122 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VeleroModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const velero_service_1 = __webpack_require__(119);
let VeleroModule = class VeleroModule {
};
exports.VeleroModule = VeleroModule;
exports.VeleroModule = VeleroModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [],
        providers: [velero_service_1.VeleroService],
        exports: [velero_service_1.VeleroService]
    })
], VeleroModule);


/***/ }),
/* 123 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SettingsModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const settings_controller_1 = __webpack_require__(124);
const settings_service_1 = __webpack_require__(125);
const server_status_request_module_1 = __webpack_require__(130);
const settings_gateway_1 = __webpack_require__(132);
const auth_module_1 = __webpack_require__(144);
const casl_module_1 = __webpack_require__(164);
let SettingsModule = class SettingsModule {
};
exports.SettingsModule = SettingsModule;
exports.SettingsModule = SettingsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, casl_module_1.CaslModule, server_status_request_module_1.ServerStatusRequestModule],
        controllers: [settings_controller_1.SettingsController],
        providers: [settings_service_1.SettingsService, settings_gateway_1.SettingsGateway],
    })
], SettingsModule);


/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SettingsController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const settings_service_1 = __webpack_require__(125);
const rxjs_1 = __webpack_require__(11);
const shared_types_1 = __webpack_require__(59);
const settings_dto_1 = __webpack_require__(129);
const check_policies_decorator_1 = __webpack_require__(86);
const cache_manager_1 = __webpack_require__(92);
let SettingsController = class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    getCluster() {
        return this.settingsService.getCluster();
    }
    getVeleroServer() {
        return this.settingsService.getVeleroServer();
    }
    getVeleroAgents() {
        return this.settingsService.getVeleroAgents();
    }
    getVeleroUi() {
        return this.settingsService.getVeleroUi();
    }
    getVeleroPlugins() {
        return this.settingsService.getPlugins();
    }
    addVeleroPlugin(data) {
        return {};
    }
    deleteVeleroPluginByName(name) {
        return {};
    }
};
exports.SettingsController = SettingsController;
tslib_1.__decorate([
    (0, common_1.Get)('/cluster'),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Manage, 'all')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _b : Object)
], SettingsController.prototype, "getCluster", null);
tslib_1.__decorate([
    (0, common_1.Get)('/velero/server'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], SettingsController.prototype, "getVeleroServer", null);
tslib_1.__decorate([
    (0, common_1.Get)('/velero/agents'),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Manage, 'all')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], SettingsController.prototype, "getVeleroAgents", null);
tslib_1.__decorate([
    (0, common_1.Get)('/velero/ui'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], SettingsController.prototype, "getVeleroUi", null);
tslib_1.__decorate([
    (0, common_1.Get)('/velero/plugins'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Manage, 'all')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _f : Object)
], SettingsController.prototype, "getVeleroPlugins", null);
tslib_1.__decorate([
    (0, common_1.Post)('/velero/plugins'),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Manage, 'all')),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof settings_dto_1.AddVeleroPluginDTO !== "undefined" && settings_dto_1.AddVeleroPluginDTO) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SettingsController.prototype, "addVeleroPlugin", null);
tslib_1.__decorate([
    (0, common_1.Delete)('/velero/plugins/:name'),
    tslib_1.__param(0, (0, common_1.Param)('name')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], SettingsController.prototype, "deleteVeleroPluginByName", null);
exports.SettingsController = SettingsController = tslib_1.__decorate([
    (0, common_1.Controller)('/settings'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof settings_service_1.SettingsService !== "undefined" && settings_service_1.SettingsService) === "function" ? _a : Object])
], SettingsController);


/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var SettingsService_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SettingsService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const rxjs_1 = __webpack_require__(11);
const shared_types_1 = __webpack_require__(59);
const client_node_1 = __webpack_require__(10);
const package_json_1 = __webpack_require__(126);
const config_1 = __webpack_require__(50);
const stream_1 = __webpack_require__(127);
const velero_constants_1 = __webpack_require__(51);
const k8s_utils_1 = __webpack_require__(9);
const velero_service_1 = __webpack_require__(119);
const server_status_request_service_1 = __webpack_require__(128);
const logger_service_1 = __webpack_require__(57);
const logs_utils_1 = __webpack_require__(84);
let SettingsService = SettingsService_1 = class SettingsService {
    constructor(k8s, logger, serverStatusRequestService, veleroService, configService) {
        this.k8s = k8s;
        this.logger = logger;
        this.serverStatusRequestService = serverStatusRequestService;
        this.veleroService = veleroService;
        this.configService = configService;
        this.activeServerLogStreams = new Map();
        this.k8sCoreV1Api = this.k8s.makeApiClient(client_node_1.CoreV1Api);
        this.k8sLog = new client_node_1.Log(k8s);
    }
    getCluster() {
        return (0, rxjs_1.from)(this.k8sCoreV1Api.listNode())
            .pipe((0, rxjs_1.map)((r) => r.items))
            .pipe((0, rxjs_1.map)((nodes) => ({
            connected: true,
            server: this.k8s.getCurrentCluster().server,
            version: nodes[0].status.nodeInfo.kubeProxyVersion,
        })), (0, rxjs_1.catchError)(() => (0, rxjs_1.of)({
            connected: false,
            server: this.k8s.getCurrentCluster().server,
            version: 'unknown',
        })));
    }
    getVeleroServer() {
        return this.veleroService
            .checkServer()
            .pipe((0, rxjs_1.concatMap)(() => this.veleroService.getServer()))
            .pipe((0, rxjs_1.map)((pod) => ({
            connected: pod.status?.phase === 'Running',
            name: pod.metadata?.name || 'unknown',
            namespace: pod.metadata?.namespace || 'unknown',
            version: pod.spec?.containers
                ?.find((container) => container.image?.startsWith(velero_constants_1.VELERO.IMAGE))
                ?.image?.split(':')[1] || 'unknown',
        })), (0, rxjs_1.catchError)((err) => {
            this.logger.error(err, SettingsService_1.name);
            return (0, rxjs_1.of)({
                connected: false,
                name: 'unknown',
                namespace: 'unknown',
                version: 'unknown',
            });
        }));
    }
    getVeleroAgents() {
        return this.veleroService
            .checkServer()
            .pipe((0, rxjs_1.mergeMap)(() => this.veleroService.getAgents()))
            .pipe((0, rxjs_1.map)((pods) => pods.map((pod) => ({
            name: pod.metadata?.name || 'unknown',
            namespace: pod.metadata?.namespace || 'unknown',
            connected: pod.status?.phase === 'Running',
            version: pod.spec?.containers
                ?.find((container) => container.image?.startsWith(velero_constants_1.VELERO.IMAGE))
                ?.image?.split(':')[1] || 'unknown',
            node: pod.spec?.nodeName || 'unknown',
            ip: pod.status?.podIP || 'unknown',
        }))), (0, rxjs_1.catchError)((err) => {
            this.logger.error(err, SettingsService_1.name);
            return (0, rxjs_1.of)([]);
        }));
    }
    getVeleroUi() {
        if (this.configService.get('k8s.configPath')) {
            return (0, rxjs_1.of)({
                version: package_json_1.version,
                mode: 'Standalone',
            });
        }
        else {
            return this.veleroService
                .checkVeleroUI()
                .pipe((0, rxjs_1.concatMap)(() => this.veleroService.getVeleroUI()))
                .pipe((0, rxjs_1.map)((pod) => ({
                version: package_json_1.version,
                mode: 'In Cluster',
                name: pod.metadata.name,
            })), (0, rxjs_1.catchError)(() => (0, rxjs_1.of)({
                version: package_json_1.version,
                mode: 'Standalone',
            })));
        }
    }
    getPlugins() {
        return this.serverStatusRequestService
            .create()
            .pipe((0, rxjs_1.map)((request) => request?.status?.plugins));
    }
    async openLogsStream(client, type, nodeName) {
        let name;
        let containerName;
        let namespace;
        if (type === shared_types_1.LogType.VeleroServer) {
            const veleroServer = await (0, rxjs_1.lastValueFrom)(this.getVeleroServer());
            name = veleroServer.name;
            containerName = 'velero';
            namespace = this.configService.get('velero.namespace');
        }
        else if (type === shared_types_1.LogType.VeleroUI) {
            const veleroUI = await (0, rxjs_1.lastValueFrom)(this.getVeleroUi());
            name = veleroUI.name;
            containerName = 'velero-agent';
            namespace = this.configService.get('app.namespace');
        }
        else {
            name = nodeName;
            containerName = 'node-agent';
            namespace = this.configService.get('velero.namespace');
        }
        if (this.activeServerLogStreams.has(client.id)) {
            return;
        }
        const stream = new stream_1.Writable({
            write: (chunk, encoding, callback) => {
                client.emit('settings:logs', chunk
                    .toString()
                    .split('\n')
                    .map((line) => type === shared_types_1.LogType.VeleroUI
                    ? (0, logs_utils_1.parseVeleroUILog)(line)
                    : (0, logs_utils_1.parseVeleroLog)(line))
                    .filter((log) => !!log));
                callback();
            },
        });
        this.activeServerLogStreams.set(client.id, stream);
        try {
            await this.k8sLog.log(namespace, name, containerName, stream, {
                follow: true,
                tailLines: 25,
            });
        }
        catch (error) {
            console.error('Error streaming logs:', error);
            this.activeServerLogStreams.delete(client.id);
            stream.end();
        }
    }
    closeLogsSteam(client) {
        for (const [key, stream] of this.activeServerLogStreams) {
            if (key === client.id) {
                stream.end();
                this.activeServerLogStreams.delete(key);
            }
        }
    }
    addVeleroPlugin(data) {
        return '';
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = SettingsService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(k8s_utils_1.K8S_CONNECTION)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof client_node_1.KubeConfig !== "undefined" && client_node_1.KubeConfig) === "function" ? _a : Object, typeof (_b = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _b : Object, typeof (_c = typeof server_status_request_service_1.ServerStatusRequestService !== "undefined" && server_status_request_service_1.ServerStatusRequestService) === "function" ? _c : Object, typeof (_d = typeof velero_service_1.VeleroService !== "undefined" && velero_service_1.VeleroService) === "function" ? _d : Object, typeof (_e = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _e : Object])
], SettingsService);


/***/ }),
/* 126 */
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"version":"0.10.1","keywords":["velero","backup","dashboard"],"scripts":{"prepare":"husky","docker:build":"nx build --run-many -t velero-agent velero-agent-api && docker build -t velero-agent"},"bugs":{"url":"https://github.com/mksantanu/velero-agent/issues","email":"mksantanu@me.com"},"engines":{"node":">=22"},"repository":{"type":"git","url":"https://github.com/mksantanu/velero-agent"},"private":false,"dependencies":{"@casl/ability":"6.7.3","@docusaurus/core":"3.9.1","@docusaurus/preset-classic":"3.9.1","@formkit/addons":"1.6.9","@formkit/vue":"1.6.9","@fortawesome/fontawesome-svg-core":"7.0.1","@fortawesome/free-brands-svg-icons":"7.0.1","@fortawesome/free-regular-svg-icons":"7.0.1","@fortawesome/free-solid-svg-icons":"7.0.1","@fortawesome/vue-fontawesome":"^3.1.2","@kubernetes/client-node":"1.3.0","@mdx-js/react":"3.1.1","@nestjs/axios":"4.0.1","@nestjs/cache-manager":"3.0.1","@nestjs/common":"11.1.6","@nestjs/config":"4.0.2","@nestjs/core":"11.1.6","@nestjs/jwt":"11.0.0","@nestjs/mapped-types":"2.1.0","@nestjs/passport":"11.0.5","@nestjs/platform-express":"11.1.6","@nestjs/platform-socket.io":"11.1.6","@nestjs/serve-static":"5.0.3","@nestjs/terminus":"11.0.0","@nestjs/throttler":"6.4.0","@nestjs/websockets":"11.1.6","@otwld/nestjs-kubernetes":"2.0.0","@tailwindcss/postcss":"4.1.13","@tailwindcss/vite":"4.1.13","@tanstack/vue-query":"5.90.2","apexcharts":"5.3.5","axios":"1.12.2","cache-manager":"7.2.2","class-transformer":"0.5.1","class-validator":"0.14.2","clsx":"2.1.1","cron-parser":"5.4.0","cron-validate":"1.5.2","docusaurus-lunr-search":"3.6.0","flowbite":"3.1.2","helmet":"8.1.0","jwks-rsa":"3.2.0","jwt-decode":"4.0.0","ldapts":"8.0.9","lodash":"4.17.21","nest-winston":"1.10.2","passport":"0.7.0","passport-github2":"0.1.12","passport-gitlab2":"5.0.0","passport-google-oauth":"2.0.0","passport-jwt":"4.0.1","passport-ldapauth":"3.0.1","passport-local":"1.0.0","passport-microsoft":"2.1.0","passport-oauth2":"1.8.0","pinia":"3.0.3","prism-react-renderer":"2.4.1","react":"18.3.1","react-dom":"18.3.1","reflect-metadata":"0.2.2","rxjs":"7.8.2","semver":"7.7.2","socket.io":"4.8.1","socket.io-client":"4.8.1","timezones-list":"3.1.0","tslib":"2.8.1","uuid":"13.0.0","vue":"3.5.22","vue-i18n":"11.1.12","vue-router":"4.5.1","vue3-apexcharts":"1.8.0","winston":"3.18.3","yaml":"2.8.1"},"devDependencies":{"@docusaurus/module-type-aliases":"3.9.1","@docusaurus/tsconfig":"3.9.1","@docusaurus/types":"3.9.1","@nestjs/schematics":"11.0.7","@nestjs/testing":"11.1.6","@nx-extend/docusaurus":"4.0.1","@nx/eslint":"21.6.2","@nx/eslint-plugin":"21.6.2","@nx/jest":"21.6.2","@nx/js":"21.6.2","@nx/nest":"21.6.2","@nx/node":"21.6.2","@nx/vite":"21.6.2","@nx/vue":"21.6.2","@nx/webpack":"21.6.2","@nx/workspace":"21.6.2","@pmmmwh/react-refresh-webpack-plugin":"0.6.1","@svgr/webpack":"8.1.0","@swc-node/register":"1.11.1","@swc/core":"1.13.5","@swc/helpers":"0.5.17","@types/jest":"30.0.0","@types/lodash":"4.17.20","@types/node":"22.15.33","@types/passport-github2":"1.2.9","@types/passport-google-oauth2":"0.1.10","@types/passport-jwt":"4.0.1","@types/passport-local":"1.0.38","@types/passport-microsoft":"2.1.0","@types/passport-oauth2":"1.8.0","@types/semver":"7.7.1","@types/uuid":"10.0.0","@typescript-eslint/eslint-plugin":"8.45.0","@typescript-eslint/parser":"8.45.0","@vitejs/plugin-vue":"6.0.1","@vitest/coverage-v8":"3.2.4","@vitest/ui":"3.2.4","@vue/eslint-config-prettier":"10.2.0","@vue/eslint-config-typescript":"14.6.0","@vue/test-utils":"2.4.6","@vue/tsconfig":"0.8.1","autoprefixer":"10.4.21","eslint":"9.36.0","eslint-config-prettier":"10.1.8","eslint-plugin-prettier":"5.5.4","eslint-plugin-vue":"10.5.0","husky":"^9.1.7","jest":"30.2.0","jest-environment-node":"30.2.0","jest-util":"30.2.0","jiti":"2.6.1","jsdom":"27.0.0","nx":"21.6.2","postcss":"8.5.6","prettier":"3.6.2","react-refresh":"0.17.0","sass":"1.93.2","tailwindcss":"4.1.13","ts-jest":"29.4.4","ts-node":"10.9.2","typescript":"5.9.3","url-loader":"4.1.1","vite":"7.1.7","vitest":"3.2.4","vue-tsc":"3.1.0"},"packageManager":"pnpm@7.27.0+sha1.572d3b6d6b0ff64f11edd1c4e8774cc7351f1089"}');

/***/ }),
/* 127 */
/***/ ((module) => {

module.exports = require("stream");

/***/ }),
/* 128 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServerStatusRequestService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const k8s_utils_1 = __webpack_require__(9);
const client_node_1 = __webpack_require__(10);
const config_1 = __webpack_require__(50);
const rxjs_1 = __webpack_require__(11);
const velero_1 = __webpack_require__(12);
const velero_constants_1 = __webpack_require__(51);
const k8s_custom_object_utils_1 = __webpack_require__(52);
const k8s_custom_object_service_1 = __webpack_require__(56);
let ServerStatusRequestService = class ServerStatusRequestService {
    constructor(k8s, k8sCustomObjectService, configService) {
        this.k8s = k8s;
        this.k8sCustomObjectService = k8sCustomObjectService;
        this.configService = configService;
        this.k8sCustomObjectApi = this.k8s.makeApiClient(client_node_1.CustomObjectsApi);
    }
    create() {
        return (0, rxjs_1.of)((0, k8s_custom_object_utils_1.createK8sCustomObject)('velero-agent', this.configService.get('velero.namespace'), velero_1.Resources.SERVER_STATUS_REQUEST, {}, {}))
            .pipe((0, rxjs_1.concatMap)((body) => this.k8sCustomObjectService.create(velero_1.Resources.SERVER_STATUS_REQUEST.plural, body)))
            .pipe((0, rxjs_1.concatMap)((request) => this.waitAndGetServerStatusRequest(request)));
    }
    waitAndGetServerStatusRequest(request) {
        return (0, rxjs_1.defer)(() => (0, rxjs_1.from)(this.k8sCustomObjectApi.getNamespacedCustomObject({
            group: velero_constants_1.VELERO.GROUP,
            version: velero_constants_1.VELERO.VERSION,
            namespace: this.configService.get('velero.namespace'),
            plural: velero_1.Resources.SERVER_STATUS_REQUEST.plural,
            name: request.metadata.name,
        }))).pipe((0, rxjs_1.map)((requestStatus) => {
            if (requestStatus?.status?.phase !== velero_1.V1ServerStatusRequestPhase.Processed) {
                throw new Error('Server status request is not ready!');
            }
            return requestStatus;
        }), (0, rxjs_1.retry)({
            count: 5,
            delay: 4000,
        }), (0, rxjs_1.catchError)(() => {
            return (0, rxjs_1.throwError)(() => new Error('Server status request is not ready after 5 retries!'));
        }));
    }
};
exports.ServerStatusRequestService = ServerStatusRequestService;
exports.ServerStatusRequestService = ServerStatusRequestService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(k8s_utils_1.K8S_CONNECTION)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof client_node_1.KubeConfig !== "undefined" && client_node_1.KubeConfig) === "function" ? _a : Object, typeof (_b = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], ServerStatusRequestService);


/***/ }),
/* 129 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddVeleroPluginDTO = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(82);
const shared_types_1 = __webpack_require__(59);
class AddVeleroPluginDTO {
}
exports.AddVeleroPluginDTO = AddVeleroPluginDTO;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AddVeleroPluginDTO.prototype, "image", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(shared_types_1.ImagePullPolicyEnum),
    tslib_1.__metadata("design:type", typeof (_a = typeof shared_types_1.ImagePullPolicyEnum !== "undefined" && shared_types_1.ImagePullPolicyEnum) === "function" ? _a : Object)
], AddVeleroPluginDTO.prototype, "imagePullPolicy", void 0);


/***/ }),
/* 130 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServerStatusRequestModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const server_status_request_service_1 = __webpack_require__(128);
const server_status_request_controller_1 = __webpack_require__(131);
let ServerStatusRequestModule = class ServerStatusRequestModule {
};
exports.ServerStatusRequestModule = ServerStatusRequestModule;
exports.ServerStatusRequestModule = ServerStatusRequestModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [server_status_request_controller_1.ServerStatusRequestController],
        providers: [server_status_request_service_1.ServerStatusRequestService],
        exports: [server_status_request_service_1.ServerStatusRequestService],
    })
], ServerStatusRequestModule);


/***/ }),
/* 131 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServerStatusRequestController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const velero_1 = __webpack_require__(12);
const k8s_custom_object_service_1 = __webpack_require__(56);
const k8s_custom_object_controller_1 = __webpack_require__(87);
const subject_decorator_1 = __webpack_require__(91);
let ServerStatusRequestController = class ServerStatusRequestController extends k8s_custom_object_controller_1.K8sCustomObjectController {
    constructor(k8sCustomObjectService) {
        super(k8sCustomObjectService, velero_1.Resources.SERVER_STATUS_REQUEST);
        this.k8sCustomObjectService = k8sCustomObjectService;
    }
};
exports.ServerStatusRequestController = ServerStatusRequestController;
exports.ServerStatusRequestController = ServerStatusRequestController = tslib_1.__decorate([
    (0, common_1.Controller)(velero_1.Resources.SERVER_STATUS_REQUEST.route),
    (0, subject_decorator_1.Subject)(velero_1.Resources.BACKUP.plural),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _a : Object])
], ServerStatusRequestController);


/***/ }),
/* 132 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SettingsGateway = void 0;
const tslib_1 = __webpack_require__(1);
const websockets_1 = __webpack_require__(133);
const socket_io_1 = __webpack_require__(134);
const settings_service_1 = __webpack_require__(125);
const logger_service_1 = __webpack_require__(57);
const common_1 = __webpack_require__(2);
const ws_jwt_auth_guard_1 = __webpack_require__(135);
const casl_ability_factory_1 = __webpack_require__(140);
const shared_types_1 = __webpack_require__(59);
const check_policies_decorator_1 = __webpack_require__(86);
let SettingsGateway = class SettingsGateway {
    constructor(settingsService, caslAbilityFactory, logger) {
        this.settingsService = settingsService;
        this.caslAbilityFactory = caslAbilityFactory;
        this.logger = logger;
    }
    handleConnection(client) {
        this.logger.debug(`Client connected ${client.id}`, websockets_1.WebSocketGateway.name);
    }
    handleDisconnect(client) {
        this.logger.debug(`Client disconnected ${client.id}`, websockets_1.WebSocketGateway.name);
        this.settingsService.closeLogsSteam(client);
    }
    logsServerOn(client, type, name) {
        this.settingsService.openLogsStream(client, type, name);
    }
    logsServerOff(client) {
        this.settingsService.closeLogsSteam(client);
    }
};
exports.SettingsGateway = SettingsGateway;
tslib_1.__decorate([
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SettingsGateway.prototype, "handleConnection", null);
tslib_1.__decorate([
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SettingsGateway.prototype, "handleDisconnect", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(ws_jwt_auth_guard_1.WsJwtAuthGuard),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Manage, 'all')),
    (0, websockets_1.SubscribeMessage)('settings:logs:on'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)('type')),
    tslib_1.__param(2, (0, websockets_1.MessageBody)('name')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _f : Object, typeof (_g = typeof shared_types_1.LogType !== "undefined" && shared_types_1.LogType) === "function" ? _g : Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], SettingsGateway.prototype, "logsServerOn", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(ws_jwt_auth_guard_1.WsJwtAuthGuard),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Manage, 'all')),
    (0, websockets_1.SubscribeMessage)('settings:logs:off'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SettingsGateway.prototype, "logsServerOff", null);
exports.SettingsGateway = SettingsGateway = tslib_1.__decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof settings_service_1.SettingsService !== "undefined" && settings_service_1.SettingsService) === "function" ? _a : Object, typeof (_b = typeof casl_ability_factory_1.CaslAbilityFactory !== "undefined" && casl_ability_factory_1.CaslAbilityFactory) === "function" ? _b : Object, typeof (_c = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _c : Object])
], SettingsGateway);


/***/ }),
/* 133 */
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),
/* 134 */
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),
/* 135 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var WsJwtAuthGuard_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WsJwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jwt = tslib_1.__importStar(__webpack_require__(136));
const config_1 = __webpack_require__(50);
const logger_service_1 = __webpack_require__(57);
const auth_service_1 = __webpack_require__(137);
const check_policies_decorator_1 = __webpack_require__(86);
const casl_ability_factory_1 = __webpack_require__(140);
const subject_decorator_1 = __webpack_require__(91);
const core_1 = __webpack_require__(3);
const websockets_1 = __webpack_require__(133);
let WsJwtAuthGuard = WsJwtAuthGuard_1 = class WsJwtAuthGuard {
    constructor(reflector, logger, configService, authService, caslAbilityFactory) {
        this.reflector = reflector;
        this.logger = logger;
        this.configService = configService;
        this.authService = authService;
        this.caslAbilityFactory = caslAbilityFactory;
    }
    canActivate(context) {
        const client = context.switchToWs().getClient();
        const token = client.handshake?.auth?.token;
        if (this.authService.noAuthRequired()) {
            return true;
        }
        if (!token) {
            client._error('Authentication error: No token provided');
            this.logger.error(`Client Authentication error ${client.id}: No token provided`, WsJwtAuthGuard_1.name);
            return false;
        }
        try {
            const decoded = jwt.verify(token, this.configService.get('app.secret'), {
                ignoreExpiration: false,
            });
            client.data.user = decoded;
            const ability = this.caslAbilityFactory.createForUser(client.data.user);
            const subject = this.reflector.getAllAndOverride(subject_decorator_1.SUBJECT_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);
            const policyHandlers = this.reflector.get(check_policies_decorator_1.CHECK_POLICIES_KEY, context.getHandler()) || [];
            const allAllowed = policyHandlers.every((handler) => this.execPolicyHandler(handler, ability, subject));
            if (!allAllowed) {
                throw new websockets_1.WsException('Access denied by policy');
            }
            return true;
        }
        catch (error) {
            client._error(`Authentication error: ${error.message}`);
            this.logger.error(`Client Authentication error ${client.id}: ${error.message}`, WsJwtAuthGuard_1.name);
        }
    }
    execPolicyHandler(handler, ability, subject) {
        if (typeof handler === 'function') {
            if (handler.length === 2) {
                return handler(ability, subject);
            }
            return handler(ability);
        }
        return handler.handle(ability);
    }
};
exports.WsJwtAuthGuard = WsJwtAuthGuard;
exports.WsJwtAuthGuard = WsJwtAuthGuard = WsJwtAuthGuard_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object, typeof (_d = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _d : Object, typeof (_e = typeof casl_ability_factory_1.CaslAbilityFactory !== "undefined" && casl_ability_factory_1.CaslAbilityFactory) === "function" ? _e : Object])
], WsJwtAuthGuard);


/***/ }),
/* 136 */
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),
/* 137 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(50);
const jwt_1 = __webpack_require__(138);
const authentication_exception_1 = __webpack_require__(139);
const casl_ability_factory_1 = __webpack_require__(140);
const shared_types_1 = __webpack_require__(59);
let AuthService = AuthService_1 = class AuthService {
    constructor(configService, jwtService, caslAbilityFactory) {
        this.configService = configService;
        this.jwtService = jwtService;
        this.caslAbilityFactory = caslAbilityFactory;
    }
    noAuthRequired() {
        return (!this.configService.get('basicAuth.enabled', { infer: true }) &&
            !this.configService.get('github.enabled', { infer: true }) &&
            !this.configService.get('gitlab.enabled', { infer: true }) &&
            !this.configService.get('google.enabled', { infer: true }) &&
            !this.configService.get('microsoft.enabled', { infer: true }) &&
            !this.configService.get('oauth.enabled', { infer: true }) &&
            !this.configService.get('ldap.enabled', { infer: true }));
    }
    validateBasicUser(username, password) {
        const { enabled, username: basicUsername, password: basicPassword, } = this.configService.get('basicAuth');
        return enabled && username === basicUsername && password === basicPassword;
    }
    login(req) {
        if (!req.user) {
            throw new authentication_exception_1.AuthenticationException('Invalid user', {
                cause: AuthService_1.name,
            });
        }
        const permissions = [];
        if (req.user.provider === 'local') {
            permissions.push({ action: shared_types_1.Action.Manage, subject: 'all' });
        }
        else {
            permissions.push(...this.caslAbilityFactory.getPermissionsForUser(req.user.policy?.user, req.user.policy?.groups));
        }
        const payload = {
            sub: req.user.id,
            email: req.user.email,
            name: req.user.displayName,
            picture: req.user.picture,
            provider: req.user.provider,
            permissions,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof casl_ability_factory_1.CaslAbilityFactory !== "undefined" && casl_ability_factory_1.CaslAbilityFactory) === "function" ? _c : Object])
], AuthService);


/***/ }),
/* 138 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 139 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthenticationException = void 0;
const common_1 = __webpack_require__(2);
class AuthenticationException extends common_1.HttpException {
    constructor(objectOrError, options) {
        super(objectOrError ? objectOrError : AuthenticationException.name, common_1.HttpStatus.UNAUTHORIZED, options);
        this.objectOrError = objectOrError;
    }
}
exports.AuthenticationException = AuthenticationException;


/***/ }),
/* 140 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CaslAbilityFactory_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CaslAbilityFactory = exports.AppAbilityClass = void 0;
const tslib_1 = __webpack_require__(1);
const ability_1 = __webpack_require__(141);
const shared_types_1 = __webpack_require__(59);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(50);
const logger_service_1 = __webpack_require__(57);
const node_fs_1 = __webpack_require__(142);
const policy_utils_1 = __webpack_require__(143);
exports.AppAbilityClass = ability_1.PureAbility;
let CaslAbilityFactory = CaslAbilityFactory_1 = class CaslAbilityFactory {
    constructor(configService, logger) {
        this.configService = configService;
        this.logger = logger;
        this.groupPermissions = new Map();
        this.userPermissions = new Map();
    }
    async onModuleInit() {
        const filePath = this.configService.get('app.policyPath');
        try {
            if (!filePath) {
                throw new Error('No policy.csv path specified, skipping!');
            }
            const raw = (0, node_fs_1.readFileSync)(filePath, 'utf-8');
            let lineRow = 0;
            const lines = raw
                .split('\n')
                .map((l) => l.trim())
                .filter(Boolean);
            for (const line of lines) {
                lineRow++;
                if (line.startsWith('#')) {
                    continue;
                }
                const [type, entity, action, subject] = line
                    .split(',')
                    .map((s) => s.trim());
                if (type === shared_types_1.PolicyType.Group && (0, policy_utils_1.isValidPermission)(action, subject)) {
                    const perm = {
                        subject: subject,
                        action: action,
                    };
                    const groupPerms = this.groupPermissions.get(entity) || [];
                    groupPerms.push(perm);
                    this.groupPermissions.set(entity, groupPerms);
                }
                else if (type === shared_types_1.PolicyType.User &&
                    (0, policy_utils_1.isValidPermission)(action, subject)) {
                    const perm = {
                        subject: subject,
                        action: action,
                    };
                    const userPerms = this.userPermissions.get(entity) || [];
                    userPerms.push(perm);
                    this.userPermissions.set(entity, userPerms);
                }
                else {
                    this.logger.warn(`Unknown policy type "${type},${entity},${action},${subject}" in line "${lineRow}", skipping!`, CaslAbilityFactory_1.name);
                }
            }
        }
        catch (error) {
            this.logger.warn(`Unable to read ${filePath} and extract policies, skipping!`, CaslAbilityFactory_1.name);
        }
        if (this.groupPermissions.size === 0 && this.userPermissions.size === 0) {
            this.userPermissions.set('*', [
                {
                    subject: 'all',
                    action: shared_types_1.Action.Manage,
                },
            ]);
        }
    }
    getPermissionsForUser(userId, groups = []) {
        const perms = [];
        const userPerms = this.userPermissions.get(userId) || [];
        const wildcardPerms = [
            ...(this.userPermissions.get('*') || []),
            ...(this.groupPermissions.get('*') || []),
        ];
        perms.push(...userPerms);
        perms.push(...wildcardPerms);
        for (const group of groups) {
            const groupPerms = this.groupPermissions.get(group) || [];
            perms.push(...groupPerms);
        }
        return perms;
    }
    createForUser(user) {
        const { can, build } = new ability_1.AbilityBuilder(exports.AppAbilityClass);
        if (user.permissions && Array.isArray(user.permissions)) {
            for (const perm of user.permissions) {
                can(perm.action, perm.subject);
            }
        }
        return build({
            detectSubjectType: (item) => item?.subjectType || item,
        });
    }
};
exports.CaslAbilityFactory = CaslAbilityFactory;
exports.CaslAbilityFactory = CaslAbilityFactory = CaslAbilityFactory_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _b : Object])
], CaslAbilityFactory);


/***/ }),
/* 141 */
/***/ ((module) => {

module.exports = require("@casl/ability");

/***/ }),
/* 142 */
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),
/* 143 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isValidPermission = void 0;
const shared_types_1 = __webpack_require__(59);
const velero_1 = __webpack_require__(12);
const isValidPermission = (action, subject) => {
    return (Object.values(shared_types_1.Action).includes(action) &&
        [...velero_1.PLURALS, 'all'].includes(subject));
};
exports.isValidPermission = isValidPermission;


/***/ }),
/* 144 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const auth_controller_1 = __webpack_require__(145);
const auth_service_1 = __webpack_require__(137);
const local_strategy_1 = __webpack_require__(147);
const passport_1 = __webpack_require__(146);
const jwt_1 = __webpack_require__(138);
const config_1 = __webpack_require__(50);
const jwt_strategy_1 = __webpack_require__(149);
const ldap_strategy_1 = __webpack_require__(151);
const google_strategy_1 = __webpack_require__(154);
const github_strategy_1 = __webpack_require__(156);
const gitlab_strategy_1 = __webpack_require__(158);
const microsoft_strategy_1 = __webpack_require__(160);
const oauth_strategy_1 = __webpack_require__(162);
const casl_module_1 = __webpack_require__(164);
const axios_1 = __webpack_require__(79);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => ({
                    secret: configService.get('app.secret'),
                    signOptions: {
                        expiresIn: configService.get('app.sessionDuration'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            casl_module_1.CaslModule,
            axios_1.HttpModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            ldap_strategy_1.LdapStrategy,
            google_strategy_1.GoogleStrategy,
            github_strategy_1.GithubStrategy,
            gitlab_strategy_1.GitlabStrategy,
            microsoft_strategy_1.MicrosoftStrategy,
            oauth_strategy_1.OauthStrategy,
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 145 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const auth_service_1 = __webpack_require__(137);
const public_decorator_1 = __webpack_require__(120);
const passport_1 = __webpack_require__(146);
const express_1 = __webpack_require__(93);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(req) {
        return this.authService.login(req);
    }
    googleAuthRedirect(req) {
        return this.authService.login(req);
    }
    githubAuthRedirect(req) {
        return this.authService.login(req);
    }
    gitlabAuthRedirect(req) {
        return this.authService.login(req);
    }
    microsoftAuthRedirect(req) {
        return this.authService.login(req);
    }
    oauthAuthRedirect(req) {
        return this.authService.login(req);
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(['local', 'ldap'])),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, common_1.Get)('/google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuthRedirect", null);
tslib_1.__decorate([
    (0, common_1.Get)('/github'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('github')),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "githubAuthRedirect", null);
tslib_1.__decorate([
    (0, common_1.Get)('/gitlab'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('gitlab')),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "gitlabAuthRedirect", null);
tslib_1.__decorate([
    (0, common_1.Get)('/microsoft'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('microsoft')),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "microsoftAuthRedirect", null);
tslib_1.__decorate([
    (0, common_1.Get)('/oauth'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('oauth')),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "oauthAuthRedirect", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 146 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 147 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var LocalStrategy_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const passport_local_1 = __webpack_require__(148);
const passport_1 = __webpack_require__(146);
const common_1 = __webpack_require__(2);
const auth_service_1 = __webpack_require__(137);
const logger_service_1 = __webpack_require__(57);
let LocalStrategy = LocalStrategy_1 = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy, 'local') {
    constructor(logger, authService) {
        super();
        this.logger = logger;
        this.authService = authService;
    }
    validate(username, password) {
        this.logger.debug(`Try to validate local user ${username} with password ****...`, LocalStrategy_1.name);
        const success = this.authService.validateBasicUser(username, password);
        if (!success) {
            return null;
        }
        this.logger.info(`Local user signed in.`, LocalStrategy_1.name);
        return {
            id: 'local',
            provider: 'local',
            displayName: username,
        };
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = LocalStrategy_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], LocalStrategy);


/***/ }),
/* 148 */
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),
/* 149 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const passport_jwt_1 = __webpack_require__(150);
const passport_1 = __webpack_require__(146);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(50);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('app.secret'),
        });
        this.configService = configService;
    }
    validate(payload) {
        return payload;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], JwtStrategy);


/***/ }),
/* 150 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 151 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var LdapStrategy_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LdapStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(146);
const passport_ldapauth_1 = tslib_1.__importDefault(__webpack_require__(152));
const config_1 = __webpack_require__(50);
const logger_service_1 = __webpack_require__(57);
const ldapts_1 = __webpack_require__(153);
let LdapStrategy = LdapStrategy_1 = class LdapStrategy extends (0, passport_1.PassportStrategy)(passport_ldapauth_1.default, 'ldap') {
    constructor(logger, configService) {
        super({
            passReqToCallback: true,
            server: {
                url: configService.get('ldap.url'),
                bindDN: configService.get('ldap.bindDn'),
                bindCredentials: configService.get('ldap.bindCredentials'),
                searchBase: configService.get('ldap.searchBase'),
                searchFilter: configService.get('ldap.searchFilter'),
                searchAttributes: configService.get('ldap.searchAttributes'),
            },
            credentialsLookup: (req) => {
                return req.body;
            },
        });
        this.logger = logger;
        this.configService = configService;
    }
    async validate(req, user) {
        this.logger.debug(`Try to validate LDAP user ${req.body?.username} with password ****...`, LdapStrategy_1.name);
        if (!user) {
            return null;
        }
        let groups = [];
        if (this.configService.get('ldap.groupSearchBase')) {
            groups = await this.getUserGroups(user);
        }
        this.logger.info(`LDAP user ${user.uid} signed in.`, LdapStrategy_1.name);
        return {
            id: user.uid,
            provider: 'ldap',
            displayName: user.givenName,
            permissions: {
                user: user.uid,
                groups
            },
        };
    }
    async getUserGroups(user) {
        const ldapUrl = this.configService.get('ldap.url');
        const client = new ldapts_1.Client({ url: ldapUrl });
        try {
            await client.bind(this.configService.get('ldap.bindDn'), this.configService.get('ldap.bindCredentials'));
            const groupSearchBase = this.configService.get('ldap.groupSearchBase');
            const userDn = `uid=${user.uid},${this.configService.get('ldap.searchBase')}`;
            const { searchEntries } = await client.search(groupSearchBase, {
                scope: 'sub',
                filter: `(member=${userDn})`,
                attributes: ['cn'],
            });
            return searchEntries.map((entry) => entry.cn);
        }
        catch (error) {
            this.logger.warn('Error fetching LDAP groups: ' + error.message, LdapStrategy_1.name);
            return [];
        }
    }
};
exports.LdapStrategy = LdapStrategy;
exports.LdapStrategy = LdapStrategy = LdapStrategy_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], LdapStrategy);


/***/ }),
/* 152 */
/***/ ((module) => {

module.exports = require("passport-ldapauth");

/***/ }),
/* 153 */
/***/ ((module) => {

module.exports = require("ldapts");

/***/ }),
/* 154 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var GoogleStrategy_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(146);
const config_1 = __webpack_require__(50);
const passport_google_oauth20_1 = __webpack_require__(155);
const logger_service_1 = __webpack_require__(57);
const authentication_exception_1 = __webpack_require__(139);
const rxjs_1 = __webpack_require__(11);
const axios_1 = __webpack_require__(79);
let GoogleStrategy = GoogleStrategy_1 = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(logger, configService, httpService) {
        super({
            clientID: configService.get('google.clientId') || ' ',
            clientSecret: configService.get('google.clientSecret'),
            scope: configService.get('google.scopes'),
            callbackURL: configService.get('google.redirectUri'),
        });
        this.logger = logger;
        this.configService = configService;
        this.httpService = httpService;
    }
    async validate(accessToken, refreshToken, profile) {
        const { emails, photos, id, provider, displayName } = profile;
        if (!profile) {
            throw new authentication_exception_1.AuthenticationException('Invalid User', {
                cause: GoogleStrategy_1.name,
            });
        }
        let groups = [];
        if (this.configService
            .get('google.scopes')
            .includes('cloud-identity.groups.readonly')) {
            groups = await (0, rxjs_1.lastValueFrom)(this.getUserGroups(accessToken));
        }
        this.logger.info(`Federated Google user ${id} signed in.`, GoogleStrategy_1.name);
        return {
            id,
            provider,
            displayName,
            email: emails[0].value,
            picture: photos[0].value,
            policy: {
                user: emails[0].value,
                groups,
            },
        };
    }
    getUserGroups(accessToken) {
        return this.httpService
            .get('https://cloudidentity.googleapis.com/v1/groups', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data
            ? res.data?.groups
                ?.map((group) => group.name)
                .filter((group) => group)
            : []), (0, rxjs_1.catchError)((err) => {
            this.logger.warn('Error fetching Google Cloud Identity groups: ' + err.message, GoogleStrategy_1.name);
            return (0, rxjs_1.of)([]);
        }));
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = GoogleStrategy_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _c : Object])
], GoogleStrategy);


/***/ }),
/* 155 */
/***/ ((module) => {

module.exports = require("passport-google-oauth20");

/***/ }),
/* 156 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var GithubStrategy_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GithubStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(146);
const config_1 = __webpack_require__(50);
const passport_github2_1 = __webpack_require__(157);
const authentication_exception_1 = __webpack_require__(139);
const logger_service_1 = __webpack_require__(57);
const axios_1 = __webpack_require__(79);
const rxjs_1 = __webpack_require__(11);
let GithubStrategy = GithubStrategy_1 = class GithubStrategy extends (0, passport_1.PassportStrategy)(passport_github2_1.Strategy, 'github') {
    constructor(logger, configService, httpService) {
        super({
            clientID: configService.get('github.clientId') || ' ',
            clientSecret: configService.get('github.clientSecret'),
            scope: configService.get('github.scopes'),
            callbackURL: configService.get('github.redirectUri'),
        });
        this.logger = logger;
        this.configService = configService;
        this.httpService = httpService;
    }
    async validate(accessToken, refreshToken, profile) {
        const { emails, photos, id, provider, displayName, username } = profile;
        if (!profile) {
            throw new authentication_exception_1.AuthenticationException('Invalid User', {
                cause: GithubStrategy_1.name,
            });
        }
        const groups = [];
        if (this.configService
            .get('github.scopes')
            .includes('read:org')) {
            const orgs = await (0, rxjs_1.lastValueFrom)(this.getUserOrganizations(accessToken));
            groups.push(...orgs);
            for (const org of orgs) {
                const role = await (0, rxjs_1.lastValueFrom)(this.getUserMembership(org, username, accessToken));
                if (role) {
                    groups.push(`${org}:${role}`);
                }
            }
        }
        this.logger.info(`Federated Github user ${id} signed in.`, GithubStrategy_1.name);
        return {
            id,
            provider,
            displayName,
            email: emails[0].value,
            picture: photos[0].value,
            policy: {
                user: emails[0].value,
                groups,
            },
        };
    }
    getUserOrganizations(accessToken) {
        return this.httpService
            .get('https://api.github.com/user/orgs', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/vnd.github.v3+json',
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data ? res.data?.map((org) => org.login) : []), (0, rxjs_1.catchError)((err) => {
            this.logger.warn('Failed to fetch GitHub organizations', err.message);
            return (0, rxjs_1.of)([]);
        }));
    }
    getUserMembership(org, username, accessToken) {
        return this.httpService
            .get(`https://api.github.com/orgs/${org}/memberships/${username}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/vnd.github.v3+json',
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data?.role), (0, rxjs_1.catchError)((err) => {
            this.logger.warn('Failed to fetch GitHub user membership: ' + err.message, GithubStrategy_1.name);
            return (0, rxjs_1.of)(null);
        }));
    }
};
exports.GithubStrategy = GithubStrategy;
exports.GithubStrategy = GithubStrategy = GithubStrategy_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _c : Object])
], GithubStrategy);


/***/ }),
/* 157 */
/***/ ((module) => {

module.exports = require("passport-github2");

/***/ }),
/* 158 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var GitlabStrategy_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GitlabStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(146);
const config_1 = __webpack_require__(50);
const passport_gitlab2_1 = __webpack_require__(159);
const logger_service_1 = __webpack_require__(57);
const authentication_exception_1 = __webpack_require__(139);
const axios_1 = __webpack_require__(79);
const rxjs_1 = __webpack_require__(11);
const GITLAB_ACCESS_LEVELS = {
    10: 'guest',
    20: 'reporter',
    30: 'developer',
    40: 'maintainer',
    50: 'owner',
};
let GitlabStrategy = GitlabStrategy_1 = class GitlabStrategy extends (0, passport_1.PassportStrategy)(passport_gitlab2_1.Strategy, 'gitlab') {
    constructor(logger, configService, httpService) {
        super({
            clientID: configService.get('gitlab.clientId') || ' ',
            clientSecret: configService.get('gitlab.clientSecret'),
            scope: configService.get('gitlab.scopes'),
            callbackURL: configService.get('gitlab.redirectUri'),
            baseURL: configService.get('gitlab.baseUrl'),
        });
        this.logger = logger;
        this.configService = configService;
        this.httpService = httpService;
    }
    async validate(accessToken, refreshToken, profile) {
        const { emails, avatarUrl, id, provider, displayName } = profile;
        if (!profile) {
            throw new authentication_exception_1.AuthenticationException('Invalid User', {
                cause: GitlabStrategy_1.name,
            });
        }
        const groups = [];
        if (this.configService
            .get('gitlab.scopes')
            .includes('read_api')) {
            const groupsWithRoles = await (0, rxjs_1.lastValueFrom)(this.getUserGroupsWithRoles(accessToken));
            for (const group of groupsWithRoles) {
                groups.push(group.name);
                if (group.accessLevel !== 'unknown') {
                    groups.push(`${group.name}:${group.accessLevel}`);
                }
            }
        }
        this.logger.info(`Federated Gitlab user ${id} signed in.`, GitlabStrategy_1.name);
        return {
            id,
            provider,
            displayName,
            email: emails[0].value,
            picture: avatarUrl,
            policy: {
                user: emails[0].value,
                groups,
            },
        };
    }
    getUserGroupsWithRoles(accessToken) {
        return this.httpService
            .get('https://gitlab.com/api/v4/groups', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data.map((group) => ({
            id: group.id,
            name: group.name,
            fullPath: group.full_path,
            accessLevel: GITLAB_ACCESS_LEVELS[group.permissions?.group_access?.access_level] || 'unknown',
        }))), (0, rxjs_1.catchError)((err) => {
            console.warn('GitLab API error: ' + err.response?.data || 0, GitlabStrategy_1.name);
            return (0, rxjs_1.of)([]);
        }));
    }
};
exports.GitlabStrategy = GitlabStrategy;
exports.GitlabStrategy = GitlabStrategy = GitlabStrategy_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _c : Object])
], GitlabStrategy);


/***/ }),
/* 159 */
/***/ ((module) => {

module.exports = require("passport-gitlab2");

/***/ }),
/* 160 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var MicrosoftStrategy_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MicrosoftStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(146);
const config_1 = __webpack_require__(50);
const passport_microsoft_1 = __webpack_require__(161);
const logger_service_1 = __webpack_require__(57);
const authentication_exception_1 = __webpack_require__(139);
const axios_1 = __webpack_require__(79);
const rxjs_1 = __webpack_require__(11);
let MicrosoftStrategy = MicrosoftStrategy_1 = class MicrosoftStrategy extends (0, passport_1.PassportStrategy)(passport_microsoft_1.Strategy, 'microsoft') {
    constructor(logger, configService, httpService) {
        super({
            clientID: configService.get('microsoft.clientId') || ' ',
            clientSecret: configService.get('microsoft.clientSecret'),
            scope: configService.get('microsoft.scopes'),
            callbackURL: configService.get('microsoft.redirectUri'),
            tenant: configService.get('microsoft.tenant'),
            authorizationURL: configService.get('microsoft.authorizationUrl'),
            tokenURL: configService.get('microsoft.tokenUrl'),
        });
        this.logger = logger;
        this.configService = configService;
        this.httpService = httpService;
    }
    async validate(accessToken, refreshToken, profile) {
        const { emails, id, provider, displayName } = profile;
        if (!profile) {
            throw new authentication_exception_1.AuthenticationException('Invalid User', {
                cause: MicrosoftStrategy_1.name,
            });
        }
        const groups = await (0, rxjs_1.lastValueFrom)(this.getUserGroups(accessToken));
        this.logger.info(`Federated Microsoft user ${id} signed in.`, MicrosoftStrategy_1.name);
        return {
            id,
            provider,
            displayName,
            email: emails[0].value,
            policy: {
                user: emails[0].value,
                groups,
            },
        };
    }
    getUserGroups(accessToken) {
        return this.httpService
            .get('https://graph.microsoft.com/v1.0/me/memberOf', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data
            ? res.data?.value
                ?.map((group) => group.displayName)
                .filter((group) => group)
            : []), (0, rxjs_1.catchError)((err) => {
            this.logger.warn('Error fetching Microsoft Graph groups: ' + err.response?.data ||
                0, MicrosoftStrategy_1.name);
            return (0, rxjs_1.of)([]);
        }));
    }
};
exports.MicrosoftStrategy = MicrosoftStrategy;
exports.MicrosoftStrategy = MicrosoftStrategy = MicrosoftStrategy_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _c : Object])
], MicrosoftStrategy);


/***/ }),
/* 161 */
/***/ ((module) => {

module.exports = require("passport-microsoft");

/***/ }),
/* 162 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var OauthStrategy_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OauthStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(146);
const config_1 = __webpack_require__(50);
const passport_oauth2_1 = __webpack_require__(163);
const logger_service_1 = __webpack_require__(57);
const authentication_exception_1 = __webpack_require__(139);
const shared_types_1 = __webpack_require__(59);
let OauthStrategy = OauthStrategy_1 = class OauthStrategy extends (0, passport_1.PassportStrategy)(passport_oauth2_1.Strategy, 'oauth') {
    constructor(logger, configService) {
        super({
            clientID: configService.get('oauth.clientId') || ' ',
            clientSecret: configService.get('oauth.clientSecret'),
            scope: configService.get('oauth.scopes'),
            callbackURL: configService.get('oauth.redirectUri'),
            authorizationURL: configService.get('oauth.authorizationUrl') || ' ',
            tokenURL: configService.get('oauth.tokenUrl') || ' ',
        });
        this.logger = logger;
        this.configService = configService;
        this._oauth2.useAuthorizationHeaderforGET(true);
    }
    async validate(accessToken) {
        try {
            const profile = await this.getUserProfile(accessToken);
            const { id, emails, provider, displayName } = profile;
            const groupClaim = this.configService.get('oauth.groupClaim');
            const groups = profile[groupClaim] ?? [];
            this.logger.info(`Federated OAuth2 user ${id} signed in.`, OauthStrategy_1.name);
            return {
                id,
                provider,
                displayName,
                email: emails[0].value,
                policy: {
                    user: emails[0].value,
                    groups,
                },
            };
        }
        catch (e) {
            this.logger.error(e, OauthStrategy_1.name);
            throw new authentication_exception_1.AuthenticationException('Invalid User', {
                cause: OauthStrategy_1.name,
            });
        }
    }
    async getUserProfile(accessToken) {
        return new Promise((resolve, reject) => {
            this._oauth2.get(this.configService.get('oauth.userInfoUrl'), accessToken, function (err, body) {
                if (err) {
                    reject(new passport_oauth2_1.InternalOAuthError('Failed to fetch user profile', err));
                    return;
                }
                try {
                    const json = JSON.parse(body);
                    const profile = {
                        provider: 'oauth',
                        id: json.sub,
                        displayName: json.name,
                        emails: [
                            {
                                value: json.email,
                            },
                        ],
                        permissions: [{ action: shared_types_1.Action.Manage, subject: 'all' }],
                        ...json,
                    };
                    resolve(profile);
                }
                catch (ex) {
                    reject(new Error('Failed to parse user profile'));
                }
            });
        });
    }
};
exports.OauthStrategy = OauthStrategy;
exports.OauthStrategy = OauthStrategy = OauthStrategy_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], OauthStrategy);


/***/ }),
/* 163 */
/***/ ((module) => {

module.exports = require("passport-oauth2");

/***/ }),
/* 164 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CaslModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const casl_ability_factory_1 = __webpack_require__(140);
let CaslModule = class CaslModule {
    constructor(caslAbilityFactory) {
        this.caslAbilityFactory = caslAbilityFactory;
    }
    onModuleInit() {
        return this.caslAbilityFactory.onModuleInit();
    }
};
exports.CaslModule = CaslModule;
exports.CaslModule = CaslModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [casl_ability_factory_1.CaslAbilityFactory],
        exports: [casl_ability_factory_1.CaslAbilityFactory],
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof casl_ability_factory_1.CaslAbilityFactory !== "undefined" && casl_ability_factory_1.CaslAbilityFactory) === "function" ? _a : Object])
], CaslModule);


/***/ }),
/* 165 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotLocationModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const snapshot_location_controller_1 = __webpack_require__(166);
const snapshot_location_service_1 = __webpack_require__(167);
let SnapshotLocationModule = class SnapshotLocationModule {
};
exports.SnapshotLocationModule = SnapshotLocationModule;
exports.SnapshotLocationModule = SnapshotLocationModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [snapshot_location_controller_1.SnapshotLocationController],
        providers: [snapshot_location_service_1.SnapshotLocationService],
    })
], SnapshotLocationModule);


/***/ }),
/* 166 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotLocationController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const snapshot_location_service_1 = __webpack_require__(167);
const velero_1 = __webpack_require__(12);
const k8s_custom_object_service_1 = __webpack_require__(56);
const snapshot_location_dto_1 = __webpack_require__(168);
const subject_decorator_1 = __webpack_require__(91);
const k8s_custom_object_controller_1 = __webpack_require__(87);
const check_policies_decorator_1 = __webpack_require__(86);
const shared_types_1 = __webpack_require__(59);
let SnapshotLocationController = class SnapshotLocationController extends k8s_custom_object_controller_1.K8sCustomObjectController {
    constructor(snapshotLocationService, k8sCustomObjectService) {
        super(k8sCustomObjectService, velero_1.Resources.VOLUME_SNAPSHOT_LOCATION);
        this.snapshotLocationService = snapshotLocationService;
        this.k8sCustomObjectService = k8sCustomObjectService;
    }
    create(data) {
        return this.snapshotLocationService.create(data);
    }
    editByName(name, data) {
        return this.snapshotLocationService.edit(name, data);
    }
};
exports.SnapshotLocationController = SnapshotLocationController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Create, velero_1.Resources.VOLUME_SNAPSHOT_LOCATION.plural)),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof snapshot_location_dto_1.CreateVolumeSnapshotLocationDto !== "undefined" && snapshot_location_dto_1.CreateVolumeSnapshotLocationDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SnapshotLocationController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Put)('/:name'),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(shared_types_1.Action.Update, velero_1.Resources.VOLUME_SNAPSHOT_LOCATION.plural)),
    tslib_1.__param(0, (0, common_1.Param)('name')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof snapshot_location_dto_1.EditVolumeSnapshotLocationDto !== "undefined" && snapshot_location_dto_1.EditVolumeSnapshotLocationDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SnapshotLocationController.prototype, "editByName", null);
exports.SnapshotLocationController = SnapshotLocationController = tslib_1.__decorate([
    (0, common_1.Controller)(velero_1.Resources.VOLUME_SNAPSHOT_LOCATION.route),
    (0, subject_decorator_1.Subject)(velero_1.Resources.VOLUME_SNAPSHOT_LOCATION.plural),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof snapshot_location_service_1.SnapshotLocationService !== "undefined" && snapshot_location_service_1.SnapshotLocationService) === "function" ? _a : Object, typeof (_b = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _b : Object])
], SnapshotLocationController);


/***/ }),
/* 167 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotLocationService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const rxjs_1 = __webpack_require__(11);
const velero_1 = __webpack_require__(12);
const k8s_custom_object_service_1 = __webpack_require__(56);
const config_1 = __webpack_require__(50);
const k8s_custom_object_utils_1 = __webpack_require__(52);
let SnapshotLocationService = class SnapshotLocationService {
    constructor(k8sCustomObjectService, configService) {
        this.k8sCustomObjectService = k8sCustomObjectService;
        this.configService = configService;
    }
    create(data) {
        return (0, rxjs_1.of)((0, k8s_custom_object_utils_1.createK8sCustomObject)(data.name, this.configService.get('velero.namespace'), velero_1.Resources.VOLUME_SNAPSHOT_LOCATION, data.labels, data.spec)).pipe((0, rxjs_1.concatMap)((body) => this.k8sCustomObjectService.create(velero_1.Resources.VOLUME_SNAPSHOT_LOCATION.plural, body)));
    }
    edit(name, data) {
        return (0, rxjs_1.of)((0, k8s_custom_object_utils_1.patchK8sCustomObjectSpec)(data.spec)).pipe((0, rxjs_1.concatMap)((body) => this.k8sCustomObjectService.edit(velero_1.Resources.VOLUME_SNAPSHOT_LOCATION.plural, name, body)));
    }
};
exports.SnapshotLocationService = SnapshotLocationService;
exports.SnapshotLocationService = SnapshotLocationService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], SnapshotLocationService);


/***/ }),
/* 168 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EditVolumeSnapshotLocationDto = exports.CreateVolumeSnapshotLocationDto = exports.CreateVolumeSnapshotLocationSpecDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(82);
const velero_1 = __webpack_require__(12);
const class_transformer_1 = __webpack_require__(83);
const shared_dto_1 = __webpack_require__(108);
class CreateVolumeSnapshotLocationSpecDto {
}
exports.CreateVolumeSnapshotLocationSpecDto = CreateVolumeSnapshotLocationSpecDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateVolumeSnapshotLocationSpecDto.prototype, "provider", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => shared_dto_1.V1SpecCredentialDto),
    tslib_1.__metadata("design:type", typeof (_a = typeof velero_1.V1SpecCredential !== "undefined" && velero_1.V1SpecCredential) === "function" ? _a : Object)
], CreateVolumeSnapshotLocationSpecDto.prototype, "credential", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    tslib_1.__metadata("design:type", Object)
], CreateVolumeSnapshotLocationSpecDto.prototype, "config", void 0);
class CreateVolumeSnapshotLocationDto {
}
exports.CreateVolumeSnapshotLocationDto = CreateVolumeSnapshotLocationDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateVolumeSnapshotLocationDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], CreateVolumeSnapshotLocationDto.prototype, "labels", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateVolumeSnapshotLocationSpecDto),
    tslib_1.__metadata("design:type", typeof (_c = typeof velero_1.V1VolumeSnapshotLocationSpec !== "undefined" && velero_1.V1VolumeSnapshotLocationSpec) === "function" ? _c : Object)
], CreateVolumeSnapshotLocationDto.prototype, "spec", void 0);
class EditVolumeSnapshotLocationDto {
}
exports.EditVolumeSnapshotLocationDto = EditVolumeSnapshotLocationDto;
tslib_1.__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateVolumeSnapshotLocationSpecDto),
    tslib_1.__metadata("design:type", typeof (_d = typeof velero_1.V1VolumeSnapshotLocationSpec !== "undefined" && velero_1.V1VolumeSnapshotLocationSpec) === "function" ? _d : Object)
], EditVolumeSnapshotLocationDto.prototype, "spec", void 0);


/***/ }),
/* 169 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.K8sCustomObjectModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const k8s_custom_object_service_1 = __webpack_require__(56);
const k8s_custom_object_gateway_1 = __webpack_require__(170);
const auth_module_1 = __webpack_require__(144);
const casl_module_1 = __webpack_require__(164);
let K8sCustomObjectModule = class K8sCustomObjectModule {
};
exports.K8sCustomObjectModule = K8sCustomObjectModule;
exports.K8sCustomObjectModule = K8sCustomObjectModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, casl_module_1.CaslModule],
        providers: [k8s_custom_object_service_1.K8sCustomObjectService, k8s_custom_object_gateway_1.K8sCustomObjectGateway],
        exports: [k8s_custom_object_service_1.K8sCustomObjectService],
        controllers: [],
    })
], K8sCustomObjectModule);


/***/ }),
/* 170 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.K8sCustomObjectGateway = void 0;
const tslib_1 = __webpack_require__(1);
const websockets_1 = __webpack_require__(133);
const socket_io_1 = __webpack_require__(134);
const common_1 = __webpack_require__(2);
const ws_jwt_auth_guard_1 = __webpack_require__(135);
const k8s_custom_object_service_1 = __webpack_require__(56);
const casl_ability_factory_1 = __webpack_require__(140);
const velero_1 = __webpack_require__(12);
const shared_types_1 = __webpack_require__(59);
let K8sCustomObjectGateway = class K8sCustomObjectGateway {
    constructor(k8sCustomObjectService, caslAbilityFactory) {
        this.k8sCustomObjectService = k8sCustomObjectService;
        this.caslAbilityFactory = caslAbilityFactory;
    }
    handleDisconnect(client) {
        this.k8sCustomObjectService.unWatch(client);
    }
    watchOn(client, name, plural, version) {
        const ability = this.caslAbilityFactory.createForUser(client.data.user);
        for (const [key, value] of Object.entries(velero_1.Resources)) {
            if (ability.can(shared_types_1.Action.Read, value.plural)) {
                this.k8sCustomObjectService.watch(client, plural, name, version);
                break;
            }
        }
        throw new websockets_1.WsException('Access denied by policy');
    }
    watchOff(client, name) {
        this.k8sCustomObjectService.unWatch(client, name);
    }
};
exports.K8sCustomObjectGateway = K8sCustomObjectGateway;
tslib_1.__decorate([
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], K8sCustomObjectGateway.prototype, "handleDisconnect", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(ws_jwt_auth_guard_1.WsJwtAuthGuard),
    (0, websockets_1.SubscribeMessage)(`watch:on`),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)('name')),
    tslib_1.__param(2, (0, websockets_1.MessageBody)('plural')),
    tslib_1.__param(3, (0, websockets_1.MessageBody)('version')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object, String, String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], K8sCustomObjectGateway.prototype, "watchOn", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(ws_jwt_auth_guard_1.WsJwtAuthGuard),
    (0, websockets_1.SubscribeMessage)(`watch:off`),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__param(1, (0, websockets_1.MessageBody)('name')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _e : Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], K8sCustomObjectGateway.prototype, "watchOff", null);
exports.K8sCustomObjectGateway = K8sCustomObjectGateway = tslib_1.__decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _a : Object, typeof (_b = typeof casl_ability_factory_1.CaslAbilityFactory !== "undefined" && casl_ability_factory_1.CaslAbilityFactory) === "function" ? _b : Object])
], K8sCustomObjectGateway);


/***/ }),
/* 171 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BackupRepositoryModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const backup_repository_controller_1 = __webpack_require__(172);
const delete_backup_request_module_1 = __webpack_require__(94);
const download_request_module_1 = __webpack_require__(96);
let BackupRepositoryModule = class BackupRepositoryModule {
};
exports.BackupRepositoryModule = BackupRepositoryModule;
exports.BackupRepositoryModule = BackupRepositoryModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [delete_backup_request_module_1.DeleteBackupRequestModule, download_request_module_1.DownloadRequestModule],
        controllers: [backup_repository_controller_1.BackupRepositoryController],
        providers: [],
    })
], BackupRepositoryModule);


/***/ }),
/* 172 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BackupRepositoryController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const k8s_custom_object_service_1 = __webpack_require__(56);
const velero_1 = __webpack_require__(12);
const subject_decorator_1 = __webpack_require__(91);
const k8s_custom_object_controller_1 = __webpack_require__(87);
let BackupRepositoryController = class BackupRepositoryController extends k8s_custom_object_controller_1.K8sCustomObjectController {
    constructor(k8sCustomObjectService) {
        super(k8sCustomObjectService, velero_1.Resources.BACKUP_REPOSITORY);
        this.k8sCustomObjectService = k8sCustomObjectService;
    }
};
exports.BackupRepositoryController = BackupRepositoryController;
exports.BackupRepositoryController = BackupRepositoryController = tslib_1.__decorate([
    (0, common_1.Controller)(velero_1.Resources.BACKUP_REPOSITORY.route),
    (0, subject_decorator_1.Subject)(velero_1.Resources.BACKUP_REPOSITORY.plural),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _a : Object])
], BackupRepositoryController);


/***/ }),
/* 173 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatsModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const stats_controller_1 = __webpack_require__(174);
const stats_service_1 = __webpack_require__(175);
let StatsModule = class StatsModule {
};
exports.StatsModule = StatsModule;
exports.StatsModule = StatsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [stats_controller_1.StatsController],
        providers: [stats_service_1.StatsService],
    })
], StatsModule);


/***/ }),
/* 174 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatsController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const stats_service_1 = __webpack_require__(175);
const rxjs_1 = __webpack_require__(11);
const cache_manager_1 = __webpack_require__(92);
let StatsController = class StatsController {
    constructor(statsService) {
        this.statsService = statsService;
    }
    getBasicStats() {
        return this.statsService.getBasicStats();
    }
    getBackupsStatus() {
        return this.statsService.getBackupsStatus();
    }
    getBackupsSuccessRate() {
        return this.statsService.getBackupsSuccessRate();
    }
    getRestoresStatus() {
        return this.statsService.getRestoresStatus();
    }
    getRestoresSuccessRate() {
        return this.statsService.getRestoresSuccessRate();
    }
    getNextScheduledBackups() {
        return this.statsService.getNextScheduledBackups();
    }
    getBackupLatest() {
        return this.statsService.getBackupLatest();
    }
    getUnscheduledNamespaces() {
        return this.statsService.getUnscheduledNamespaces();
    }
};
exports.StatsController = StatsController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _b : Object)
], StatsController.prototype, "getBasicStats", null);
tslib_1.__decorate([
    (0, common_1.Get)('/backups/status'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], StatsController.prototype, "getBackupsStatus", null);
tslib_1.__decorate([
    (0, common_1.Get)('/backups/success-rate'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], StatsController.prototype, "getBackupsSuccessRate", null);
tslib_1.__decorate([
    (0, common_1.Get)('/restores/status'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], StatsController.prototype, "getRestoresStatus", null);
tslib_1.__decorate([
    (0, common_1.Get)('/restores/success-rate'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _f : Object)
], StatsController.prototype, "getRestoresSuccessRate", null);
tslib_1.__decorate([
    (0, common_1.Get)('/backups/next-scheduled'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], StatsController.prototype, "getNextScheduledBackups", null);
tslib_1.__decorate([
    (0, common_1.Get)('/backups/latest'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], StatsController.prototype, "getBackupLatest", null);
tslib_1.__decorate([
    (0, common_1.Get)('/unscheduled-namespaces'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], StatsController.prototype, "getUnscheduledNamespaces", null);
exports.StatsController = StatsController = tslib_1.__decorate([
    (0, common_1.Controller)('stats'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof stats_service_1.StatsService !== "undefined" && stats_service_1.StatsService) === "function" ? _a : Object])
], StatsController);


/***/ }),
/* 175 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatsService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const rxjs_1 = __webpack_require__(11);
const cron_parser_1 = __webpack_require__(176);
const shared_types_1 = __webpack_require__(59);
const k8s_custom_object_service_1 = __webpack_require__(56);
const velero_1 = __webpack_require__(12);
const stats_utils_1 = __webpack_require__(177);
const client_node_1 = __webpack_require__(10);
const k8s_utils_1 = __webpack_require__(9);
let StatsService = class StatsService {
    constructor(k8s, k8sCustomObjectService) {
        this.k8s = k8s;
        this.k8sCustomObjectService = k8sCustomObjectService;
        this.k8sCoreApi = this.k8s.makeApiClient(client_node_1.CoreV1Api);
    }
    getBasicStats() {
        return (0, rxjs_1.forkJoin)({
            totalBackups: this.k8sCustomObjectService.count(velero_1.Resources.BACKUP.plural),
            totalSchedules: this.k8sCustomObjectService.count(velero_1.Resources.SCHEDULE.plural),
            totalRestores: this.k8sCustomObjectService.count(velero_1.Resources.RESTORE.plural),
            totalStorageLocations: this.k8sCustomObjectService.count(velero_1.Resources.BACKUP_STORAGE_LOCATION.plural),
        });
    }
    getBackupsStatus() {
        return this.k8sCustomObjectService
            .get(velero_1.Resources.BACKUP.plural)
            .pipe((0, rxjs_1.map)((backupList) => {
            const stats = {
                labels: [],
                series: [],
                colors: [],
            };
            for (const backup of backupList.items) {
                if (stats.labels.includes(backup?.status?.phase)) {
                    const index = stats.labels.findIndex((e) => e === backup?.status?.phase);
                    stats.series[index] += 1;
                }
                else {
                    stats.labels.push(backup.status?.phase);
                    stats.series.push(1);
                }
            }
            for (const label of stats.labels) {
                stats.colors.push((0, stats_utils_1.getBackupsStatusColor)(label));
            }
            return stats;
        }));
    }
    getBackupsSuccessRate() {
        return this.k8sCustomObjectService
            .get(velero_1.Resources.BACKUP.plural)
            .pipe((0, rxjs_1.map)((backupList) => {
            const stats = {
                series: [],
            };
            let success = 0;
            for (const backup of backupList.items) {
                if (backup?.status?.phase === velero_1.V1BackupPhase.Completed) {
                    success += 1;
                }
            }
            if (success > 0) {
                stats.series.push(Math.round((success * 100) / backupList.total));
            }
            return stats;
        }));
    }
    getRestoresStatus() {
        return this.k8sCustomObjectService
            .get(velero_1.Resources.RESTORE.plural)
            .pipe((0, rxjs_1.map)((restoreList) => {
            const stats = {
                labels: [],
                series: [],
                colors: [],
            };
            for (const restore of restoreList.items) {
                if (stats.labels.includes(restore?.status?.phase)) {
                    const index = stats.labels.findIndex((e) => e === restore?.status?.phase);
                    stats.series[index] += 1;
                }
                else {
                    stats.labels.push(restore.status?.phase);
                    stats.series.push(1);
                }
            }
            for (const label of stats.labels) {
                stats.colors.push((0, stats_utils_1.getRestoresStatusColor)(label));
            }
            return stats;
        }));
    }
    getRestoresSuccessRate() {
        return this.k8sCustomObjectService
            .get(velero_1.Resources.RESTORE.plural)
            .pipe((0, rxjs_1.map)((restoreList) => {
            const stats = {
                series: [],
            };
            let success = 0;
            for (const restore of restoreList.items) {
                if (restore?.status?.phase === velero_1.V1RestorePhase.Completed) {
                    success += 1;
                }
            }
            if (success > 0) {
                stats.series.push(Math.round((success * 100) / restoreList.total));
            }
            return stats;
        }));
    }
    getUnscheduledNamespaces() {
        return (0, rxjs_1.from)(this.k8sCoreApi.listNamespace()).pipe((0, rxjs_1.map)((response) => response.items
            .filter((ns) => !ns.metadata.labels?.['velero.io/exclude-from-backup'])
            .map((ns) => ns.metadata?.name)), (0, rxjs_1.switchMap)((allNamespaces) => this.k8sCustomObjectService
            .get(velero_1.Resources.SCHEDULE.plural)
            .pipe((0, rxjs_1.map)((scheduleList) => {
            const scheduledNamespaces = new Set();
            let hasWildcard = false;
            scheduleList.items.forEach((schedule) => {
                const included = schedule.spec?.template?.includedNamespaces;
                const excluded = schedule.spec?.template?.excludedNamespaces;
                if (included?.includes('*') || !included) {
                    hasWildcard = true;
                }
                else {
                    included?.forEach((ns) => scheduledNamespaces.add(ns));
                }
                excluded?.forEach((namespace) => scheduledNamespaces.add(namespace));
            });
            return hasWildcard
                ? ['*']
                : allNamespaces.filter((namespace) => !scheduledNamespaces.has(namespace));
        }))));
    }
    getNextScheduledBackups() {
        return this.k8sCustomObjectService
            .get(velero_1.Resources.SCHEDULE.plural)
            .pipe((0, rxjs_1.map)((scheduleList) => {
            return scheduleList.items
                .map((schedule) => {
                const cron = cron_parser_1.CronExpressionParser.parse(schedule.spec.schedule);
                if (cron.hasNext() && !schedule.spec.skipImmediately) {
                    return {
                        name: schedule.metadata.name,
                        schedule: schedule.spec.schedule,
                        nextRun: cron.next().toDate().toISOString(),
                    };
                }
                return null;
            })
                .filter(Boolean)
                .filter((schedule) => new Date(schedule.nextRun).getTime() - new Date().getTime() <=
                24 * 60 * 60 * 1000)
                .sort((a, b) => new Date(a.nextRun).getTime() - new Date(b.nextRun).getTime());
        }));
    }
    getBackupLatest() {
        return this.k8sCustomObjectService
            .get(velero_1.Resources.BACKUP.plural, {
            sortBy: shared_types_1.SortBy.CompletionTimestamp,
            sortDirection: shared_types_1.SortDirection.Descending,
        })
            .pipe((0, rxjs_1.map)((backupList) => backupList.items
            .map((backup) => ({
            name: backup.metadata.name,
            date: backup.status.completionTimestamp,
            phase: backup.status.phase,
        }))
            .filter((backup) => new Date().getTime() - new Date(backup.date).getTime() <=
            24 * 60 * 60 * 1000)));
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(k8s_utils_1.K8S_CONNECTION)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof client_node_1.KubeConfig !== "undefined" && client_node_1.KubeConfig) === "function" ? _a : Object, typeof (_b = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _b : Object])
], StatsService);


/***/ }),
/* 176 */
/***/ ((module) => {

module.exports = require("cron-parser");

/***/ }),
/* 177 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRestoresStatusColor = exports.getBackupsStatusColor = void 0;
const velero_1 = __webpack_require__(12);
const getBackupsStatusColor = (label) => {
    switch (label) {
        case velero_1.V1BackupPhase.New:
            return '#6C757D';
        case velero_1.V1BackupPhase.FailedValidation:
            return '#DC3545';
        case velero_1.V1BackupPhase.InProgress:
            return '#FFC107';
        case velero_1.V1BackupPhase.WaitingForPluginOperations:
            return '#17A2B8';
        case velero_1.V1BackupPhase.WaitingForPluginOperationsPartiallyFailed:
            return '#E0A800';
        case velero_1.V1BackupPhase.Finalizing:
            return '#007BFF';
        case velero_1.V1BackupPhase.FinalizingPartiallyFailed:
            return '#6610F2';
        case velero_1.V1BackupPhase.Completed:
            return '#28A745';
        case velero_1.V1BackupPhase.PartiallyFailed:
            return '#FD7E14';
        case velero_1.V1BackupPhase.Failed:
            return '#C82333';
        case velero_1.V1BackupPhase.Deleting:
            return '#6F42C1';
        default:
            return '#000000';
    }
};
exports.getBackupsStatusColor = getBackupsStatusColor;
const getRestoresStatusColor = (label) => {
    switch (label) {
        case velero_1.V1RestorePhase.New:
            return '#6C757D';
        case velero_1.V1RestorePhase.FailedValidation:
            return '#DC3545';
        case velero_1.V1RestorePhase.InProgress:
            return '#FFC107';
        case velero_1.V1RestorePhase.WaitingForPluginOperations:
            return '#17A2B8';
        case velero_1.V1RestorePhase.WaitingForPluginOperationsPartiallyFailed:
            return '#E0A800';
        case velero_1.V1RestorePhase.Completed:
            return '#28A745';
        case velero_1.V1RestorePhase.PartiallyFailed:
            return '#FD7E14';
        case velero_1.V1RestorePhase.Failed:
            return '#C82333';
        default:
            return '#000000';
    }
};
exports.getRestoresStatusColor = getRestoresStatusColor;


/***/ }),
/* 178 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConfigModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const app_config_controller_1 = __webpack_require__(179);
const auth_module_1 = __webpack_require__(144);
let AppConfigModule = class AppConfigModule {
};
exports.AppConfigModule = AppConfigModule;
exports.AppConfigModule = AppConfigModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [app_config_controller_1.AppConfigController],
        providers: [],
    })
], AppConfigModule);


/***/ }),
/* 179 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConfigController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const rxjs_1 = __webpack_require__(11);
const config_1 = __webpack_require__(50);
const public_decorator_1 = __webpack_require__(120);
const auth_service_1 = __webpack_require__(137);
const cache_manager_1 = __webpack_require__(92);
let AppConfigController = class AppConfigController {
    constructor(configService, authService) {
        this.configService = configService;
        this.authService = authService;
    }
    getAppConfig() {
        const { grafanaUrl, baseUrl } = this.configService.get('app');
        const { enabled: basicAuthEnabled } = this.configService.get('basicAuth');
        const { enabled: LDAPAuthEnabled } = this.configService.get('ldap');
        const config = {
            baseUrl,
            grafanaUrl,
            noAuthRequired: this.authService.noAuthRequired(),
            basicAuth: {
                enabled: basicAuthEnabled || LDAPAuthEnabled,
            },
            google: {
                enabled: this.configService.get('google.enabled') || false,
                scopes: this.configService.get('google.scopes'),
                clientId: this.configService.get('google.clientId'),
                redirectUri: this.configService.get('google.redirectUri'),
            },
            github: {
                enabled: this.configService.get('github.enabled') || false,
                scopes: this.configService.get('github.scopes'),
                clientId: this.configService.get('github.clientId'),
                redirectUri: this.configService.get('github.redirectUri'),
            },
            gitlab: {
                enabled: this.configService.get('gitlab.enabled') || false,
                scopes: this.configService.get('gitlab.scopes'),
                clientId: this.configService.get('gitlab.clientId'),
                redirectUri: this.configService.get('gitlab.redirectUri'),
                baseUrl: this.configService.get('gitlab.baseUrl'),
            },
            microsoft: {
                enabled: this.configService.get('microsoft.enabled') || false,
                scopes: this.configService.get('microsoft.scopes'),
                clientId: this.configService.get('microsoft.clientId'),
                redirectUri: this.configService.get('microsoft.redirectUri'),
                tenant: this.configService.get('microsoft.tenant'),
                authorizationUrl: this.configService.get('microsoft.authorizationUrl'),
            },
            oauth: {
                enabled: this.configService.get('oauth.enabled') || false,
                name: this.configService.get('oauth.name'),
                scopes: this.configService.get('oauth.scopes'),
                clientId: this.configService.get('oauth.clientId'),
                redirectUri: this.configService.get('oauth.redirectUri'),
                authorizationUrl: this.configService.get('oauth.authorizationUrl'),
            },
        };
        return (0, rxjs_1.of)(config);
    }
};
exports.AppConfigController = AppConfigController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, cache_manager_1.CacheTTL)(0),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], AppConfigController.prototype, "getAppConfig", null);
exports.AppConfigController = AppConfigController = tslib_1.__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('config'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], AppConfigController);


/***/ }),
/* 180 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(146);
const core_1 = __webpack_require__(3);
const public_decorator_1 = __webpack_require__(120);
const auth_service_1 = __webpack_require__(137);
const check_policies_decorator_1 = __webpack_require__(86);
const casl_ability_factory_1 = __webpack_require__(140);
const subject_decorator_1 = __webpack_require__(91);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)(['jwt']) {
    constructor(reflector, authService, caslAbilityFactory) {
        super();
        this.reflector = reflector;
        this.authService = authService;
        this.caslAbilityFactory = caslAbilityFactory;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if (isPublic || this.authService.noAuthRequired()) {
            return true;
        }
        if (!(await super.canActivate(context))) {
            return false;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const ability = this.caslAbilityFactory.createForUser(user);
        request.ability = ability;
        const subject = this.reflector.getAllAndOverride(subject_decorator_1.SUBJECT_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const policyHandlers = this.reflector.get(check_policies_decorator_1.CHECK_POLICIES_KEY, context.getHandler()) || [];
        const allAllowed = policyHandlers.every((handler) => this.execPolicyHandler(handler, ability, subject));
        if (!allAllowed) {
            throw new common_1.ForbiddenException('Access denied by policy');
        }
        return true;
    }
    execPolicyHandler(handler, ability, subject) {
        if (typeof handler === 'function') {
            if (handler.length === 2) {
                return handler(ability, subject);
            }
            return handler(ability);
        }
        return handler.handle(ability);
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object, typeof (_c = typeof casl_ability_factory_1.CaslAbilityFactory !== "undefined" && casl_ability_factory_1.CaslAbilityFactory) === "function" ? _c : Object])
], JwtAuthGuard);


/***/ }),
/* 181 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var LoggerModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const logger_service_1 = __webpack_require__(57);
let LoggerModule = LoggerModule_1 = class LoggerModule {
    static forRoot() {
        return {
            global: true,
            module: LoggerModule_1,
            imports: [],
            providers: [logger_service_1.AppLogger],
            exports: [logger_service_1.AppLogger],
        };
    }
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = LoggerModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [logger_service_1.AppLogger],
        exports: [logger_service_1.AppLogger],
    })
], LoggerModule);


/***/ }),
/* 182 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const config_1 = __webpack_require__(50);
const process = tslib_1.__importStar(__webpack_require__(183));
exports["default"] = (0, config_1.registerAs)('velero', () => {
    return {
        namespace: process.env.VELERO_NAMESPACE || 'velero',
    };
});


/***/ }),
/* 183 */
/***/ ((module) => {

module.exports = require("process");

/***/ }),
/* 184 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const config_1 = __webpack_require__(50);
const process = tslib_1.__importStar(__webpack_require__(183));
exports["default"] = (0, config_1.registerAs)('k8s', () => {
    return {
        configPath: process.env.KUBE_CONFIG_PATH,
        context: process.env.KUBE_CONTEXT,
    };
});


/***/ }),
/* 185 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const config_1 = __webpack_require__(50);
const process = tslib_1.__importStar(__webpack_require__(183));
exports["default"] = (0, config_1.registerAs)('app', () => {
    return {
        environment: process.env.NODE_ENV,
        grafanaUrl: process.env.GRAFANA_URL,
        baseUrl: process.env.BASE_URL || '',
        logLevel: process.env.LOG_LEVEL || 'info',
        secret: process.env.AUTH_SECRET_PASSPHRASE || 'this is the secret pass phrase',
        sessionDuration: process.env.AUTH_SESSION_DURATION || '1h',
        namespace: process.env.VELERO_UI_NAMESPACE || 'velero-agent',
        policyPath: process.env.POLICY_FILE_PATH,
        cacheTTL: parseInt(process.env.CACHE_TTL, 10) || 60000,
    };
});


/***/ }),
/* 186 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const config_1 = __webpack_require__(50);
const process = tslib_1.__importStar(__webpack_require__(183));
exports["default"] = (0, config_1.registerAs)('basicAuth', () => {
    return {
        enabled: process.env.BASIC_AUTH_ENABLED === 'true' || false,
        username: process.env.BASIC_AUTH_USERNAME || 'admin',
        password: process.env.BASIC_AUTH_PASSWORD || 'admin',
    };
});


/***/ }),
/* 187 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const config_1 = __webpack_require__(50);
const process_1 = tslib_1.__importDefault(__webpack_require__(183));
exports["default"] = (0, config_1.registerAs)('ldap', () => {
    return {
        enabled: process_1.default.env.LDAP_ENABLED === 'true' || false,
        url: process_1.default.env.LDAP_URL || '',
        bindDn: process_1.default.env.LDAP_BIND_DN || '',
        bindCredentials: process_1.default.env.LDAP_BIND_CREDENTIALS || '',
        searchBase: process_1.default.env.LDAP_SEARCH_BASE || '',
        searchFilter: process_1.default.env.LDAP_SEARCH_FILTER || '',
        searchAttributes: process_1.default.env.LDAP_SEARCH_ATTRIBUTES || '',
        groupSearchBase: process_1.default.env.LDAP_GROUP_SEARCH_BASE || '',
    };
});


/***/ }),
/* 188 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const config_1 = __webpack_require__(50);
const process = tslib_1.__importStar(__webpack_require__(183));
exports["default"] = (0, config_1.registerAs)('google', () => {
    return {
        enabled: process.env.GOOGLE_AUTH_ENABLED === 'true' || false,
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        scopes: process.env.GOOGLE_OAUTH_SCOPE || 'openid email profile',
        redirectUri: process.env.GOOGLE_REDIRECT_URI || '',
    };
});


/***/ }),
/* 189 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const config_1 = __webpack_require__(50);
const process = tslib_1.__importStar(__webpack_require__(183));
exports["default"] = (0, config_1.registerAs)('github', () => {
    return {
        enabled: process.env.GITHUB_AUTH_ENABLED === 'true' || false,
        clientId: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        scopes: process.env.GITHUB_OAUTH_SCOPE || 'openid email profile',
        redirectUri: process.env.GITHUB_REDIRECT_URI || '',
    };
});


/***/ }),
/* 190 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const config_1 = __webpack_require__(50);
const process = tslib_1.__importStar(__webpack_require__(183));
exports["default"] = (0, config_1.registerAs)('gitlab', () => {
    return {
        enabled: process.env.GITLAB_AUTH_ENABLED === 'true' || false,
        clientId: process.env.GITLAB_CLIENT_ID || '',
        clientSecret: process.env.GITLAB_CLIENT_SECRET || '',
        scopes: process.env.GITLAB_OAUTH_SCOPE || 'read_user',
        redirectUri: process.env.GITLAB_REDIRECT_URI || '',
        baseUrl: process.env.GITLAB_BASE_URL || 'https://gitlab.com/',
    };
});


/***/ }),
/* 191 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const config_1 = __webpack_require__(50);
const process = tslib_1.__importStar(__webpack_require__(183));
exports["default"] = (0, config_1.registerAs)('microsoft', () => {
    let authorizationUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
    let tokenUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/token';
    const tenant = process.env.MICROSOFT_TENANT || 'common';
    if (!process.env.MICROSOFT_AUTHORIZATION_URL &&
        !process.env.MICROSOFT_TOKEN_URL) {
        authorizationUrl = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`;
        tokenUrl = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`;
    }
    else {
        authorizationUrl = process.env.MICROSOFT_AUTHORIZATION_URL;
        tokenUrl = process.env.MICROSOFT_TOKEN_URL;
    }
    return {
        enabled: process.env.MICROSOFT_AUTH_ENABLED === 'true' || false,
        clientId: process.env.MICROSOFT_CLIENT_ID || '',
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET || '',
        scopes: process.env.MICROSOFT_OAUTH_SCOPE || 'user.read',
        redirectUri: process.env.MICROSOFT_REDIRECT_URI || '',
        tenant,
        authorizationUrl,
        tokenUrl,
    };
});


/***/ }),
/* 192 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const config_1 = __webpack_require__(50);
const process = tslib_1.__importStar(__webpack_require__(183));
exports["default"] = (0, config_1.registerAs)('oauth', () => {
    return {
        enabled: process.env.OAUTH_AUTH_ENABLED === 'true' || false,
        clientId: process.env.OAUTH_CLIENT_ID || '',
        clientSecret: process.env.OAUTH_CLIENT_SECRET || '',
        scopes: process.env.OAUTH_OAUTH_SCOPE || 'openid profile email',
        redirectUri: process.env.OAUTH_REDIRECT_URI || '',
        tokenUrl: process.env.OAUTH_TOKEN_URL || '',
        authorizationUrl: process.env.OAUTH_AUTHORIZATION_URL || '',
        userInfoUrl: process.env.OAUTH_USER_INFO_URL || '',
        name: process.env.OAUTH_NAME || 'SSO',
        groupClaim: process.env.OAUTH_GROUP_CLAIM || 'groups',
    };
});


/***/ }),
/* 193 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const form_controller_1 = __webpack_require__(194);
const form_service_1 = __webpack_require__(195);
let FormModule = class FormModule {
};
exports.FormModule = FormModule;
exports.FormModule = FormModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [form_controller_1.FormController],
        providers: [form_service_1.FormService],
    })
], FormModule);


/***/ }),
/* 194 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const form_service_1 = __webpack_require__(195);
const rxjs_1 = __webpack_require__(11);
let FormController = class FormController {
    constructor(formService) {
        this.formService = formService;
    }
    getFormSchedules() {
        return this.formService.getSchedules();
    }
    getFormBackups() {
        return this.formService.getBackups();
    }
    getNamespaces() {
        return this.formService.getNamespaces();
    }
    getStorageLocations() {
        return this.formService.getStorageLocations();
    }
    getSnapshotLocations() {
        return this.formService.getSnapshotLocations();
    }
    getFormSecrets() {
        return this.formService.getSecrets();
    }
    getFormConfigMaps() {
        return this.formService.getConfigMaps();
    }
};
exports.FormController = FormController;
tslib_1.__decorate([
    (0, common_1.Get)('/schedules'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _b : Object)
], FormController.prototype, "getFormSchedules", null);
tslib_1.__decorate([
    (0, common_1.Get)('/backups'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], FormController.prototype, "getFormBackups", null);
tslib_1.__decorate([
    (0, common_1.Get)('/namespaces'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], FormController.prototype, "getNamespaces", null);
tslib_1.__decorate([
    (0, common_1.Get)('/storage-locations'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], FormController.prototype, "getStorageLocations", null);
tslib_1.__decorate([
    (0, common_1.Get)('/snapshot-locations'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _f : Object)
], FormController.prototype, "getSnapshotLocations", null);
tslib_1.__decorate([
    (0, common_1.Get)('/secrets'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _g : Object)
], FormController.prototype, "getFormSecrets", null);
tslib_1.__decorate([
    (0, common_1.Get)('/config-maps'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _h : Object)
], FormController.prototype, "getFormConfigMaps", null);
exports.FormController = FormController = tslib_1.__decorate([
    (0, common_1.Controller)('form'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof form_service_1.FormService !== "undefined" && form_service_1.FormService) === "function" ? _a : Object])
], FormController);


/***/ }),
/* 195 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const client_node_1 = __webpack_require__(10);
const k8s_utils_1 = __webpack_require__(9);
const rxjs_1 = __webpack_require__(11);
const k8s_custom_object_service_1 = __webpack_require__(56);
const velero_1 = __webpack_require__(12);
const config_1 = __webpack_require__(50);
let FormService = class FormService {
    constructor(k8s, k8sCustomObjectService, configService) {
        this.k8s = k8s;
        this.k8sCustomObjectService = k8sCustomObjectService;
        this.configService = configService;
        this.k8sCoreApi = this.k8s.makeApiClient(client_node_1.CoreV1Api);
    }
    getNamespaces() {
        return (0, rxjs_1.from)(this.k8sCoreApi.listNamespace()).pipe((0, rxjs_1.map)((r) => ({
            total: r.items.length,
            items: r.items.map((n) => n.metadata.name),
        })));
    }
    getSchedules() {
        return (0, rxjs_1.from)(this.k8sCustomObjectService.get(velero_1.Resources.SCHEDULE.plural)).pipe((0, rxjs_1.map)((r) => ({
            total: r.items.length,
            items: r.items.map((n) => n.metadata.name),
        })));
    }
    getBackups() {
        return (0, rxjs_1.from)(this.k8sCustomObjectService.get(velero_1.Resources.BACKUP.plural)).pipe((0, rxjs_1.map)((r) => ({
            items: r.items
                .filter((b) => b.status?.phase === velero_1.V1BackupPhase.Completed ||
                b.status?.phase === velero_1.V1BackupPhase.PartiallyFailed)
                .map((b) => b.metadata.name),
            total: 0,
        })), (0, rxjs_1.map)((r) => ({
            ...r,
            total: r.items.length,
        })));
    }
    getStorageLocations() {
        return (0, rxjs_1.from)(this.k8sCustomObjectService.get(velero_1.Resources.BACKUP_STORAGE_LOCATION.plural)).pipe((0, rxjs_1.map)((r) => ({
            total: r.items.length,
            items: r.items.map((n) => n.metadata.name),
        })));
    }
    getSnapshotLocations() {
        return (0, rxjs_1.from)(this.k8sCustomObjectService.get(velero_1.Resources.VOLUME_SNAPSHOT_LOCATION.plural)).pipe((0, rxjs_1.map)((r) => ({
            total: r.items.length,
            items: r.items.map((n) => n.metadata.name),
        })));
    }
    getSecrets() {
        return (0, rxjs_1.from)(this.k8sCoreApi.listNamespacedSecret({
            namespace: this.configService.get('velero.namespace'),
        })).pipe((0, rxjs_1.map)((r) => ({
            total: r.items.length,
            items: r.items.map((n) => n.metadata.name),
        })));
    }
    getConfigMaps() {
        return (0, rxjs_1.from)(this.k8sCoreApi.listNamespacedConfigMap({
            namespace: this.configService.get('velero.namespace'),
        })).pipe((0, rxjs_1.map)((r) => ({
            total: r.items.length,
            items: r.items.map((n) => n.metadata.name),
        })));
    }
};
exports.FormService = FormService;
exports.FormService = FormService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(k8s_utils_1.K8S_CONNECTION)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof client_node_1.KubeConfig !== "undefined" && client_node_1.KubeConfig) === "function" ? _a : Object, typeof (_b = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], FormService);


/***/ }),
/* 196 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var HttpExceptionFilter_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const logger_service_1 = __webpack_require__(57);
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const cause = exception.cause;
        this.logger.error(exception.message, cause ? cause : HttpExceptionFilter_1.name);
        // @ts-expect-error handle response.status as function
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            ok: status < 400,
            message: exception.message,
            test: exception.name,
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = HttpExceptionFilter_1 = tslib_1.__decorate([
    (0, common_1.Catch)(common_1.HttpException),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _a : Object])
], HttpExceptionFilter);


/***/ }),
/* 197 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PodVolumeBackupModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const pod_volume_backup_controller_1 = __webpack_require__(198);
let PodVolumeBackupModule = class PodVolumeBackupModule {
};
exports.PodVolumeBackupModule = PodVolumeBackupModule;
exports.PodVolumeBackupModule = PodVolumeBackupModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [pod_volume_backup_controller_1.PodVolumeBackupController],
        providers: [],
        exports: [],
    })
], PodVolumeBackupModule);


/***/ }),
/* 198 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PodVolumeBackupController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const velero_1 = __webpack_require__(12);
const k8s_custom_object_service_1 = __webpack_require__(56);
const subject_decorator_1 = __webpack_require__(91);
const k8s_custom_object_controller_1 = __webpack_require__(87);
let PodVolumeBackupController = class PodVolumeBackupController extends k8s_custom_object_controller_1.K8sCustomObjectController {
    constructor(k8sCustomObjectService) {
        super(k8sCustomObjectService, velero_1.Resources.POD_VOLUME_BACKUP);
        this.k8sCustomObjectService = k8sCustomObjectService;
    }
};
exports.PodVolumeBackupController = PodVolumeBackupController;
exports.PodVolumeBackupController = PodVolumeBackupController = tslib_1.__decorate([
    (0, common_1.Controller)(velero_1.Resources.POD_VOLUME_BACKUP.route),
    (0, subject_decorator_1.Subject)(velero_1.Resources.POD_VOLUME_BACKUP.plural),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _a : Object])
], PodVolumeBackupController);


/***/ }),
/* 199 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PodVolumeRestoreModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const pod_volume_restore_controller_1 = __webpack_require__(200);
let PodVolumeRestoreModule = class PodVolumeRestoreModule {
};
exports.PodVolumeRestoreModule = PodVolumeRestoreModule;
exports.PodVolumeRestoreModule = PodVolumeRestoreModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [pod_volume_restore_controller_1.PodVolumeRestoreController],
        providers: [],
        exports: [],
    })
], PodVolumeRestoreModule);


/***/ }),
/* 200 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PodVolumeRestoreController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const velero_1 = __webpack_require__(12);
const k8s_custom_object_service_1 = __webpack_require__(56);
const k8s_custom_object_controller_1 = __webpack_require__(87);
const subject_decorator_1 = __webpack_require__(91);
let PodVolumeRestoreController = class PodVolumeRestoreController extends k8s_custom_object_controller_1.K8sCustomObjectController {
    constructor(k8sCustomObjectService) {
        super(k8sCustomObjectService, velero_1.Resources.POD_VOLUME_RESTORE);
        this.k8sCustomObjectService = k8sCustomObjectService;
    }
};
exports.PodVolumeRestoreController = PodVolumeRestoreController;
exports.PodVolumeRestoreController = PodVolumeRestoreController = tslib_1.__decorate([
    (0, common_1.Controller)(velero_1.Resources.POD_VOLUME_RESTORE.route),
    (0, subject_decorator_1.Subject)(velero_1.Resources.POD_VOLUME_RESTORE.plural),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof k8s_custom_object_service_1.K8sCustomObjectService !== "undefined" && k8s_custom_object_service_1.K8sCustomObjectService) === "function" ? _a : Object])
], PodVolumeRestoreController);


/***/ }),
/* 201 */
/***/ ((module) => {

module.exports = require("@otwld/nestjs-kubernetes");

/***/ }),
/* 202 */
/***/ ((module) => {

module.exports = require("passport");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(3);
const platform_socket_io_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
const passport_1 = tslib_1.__importDefault(__webpack_require__(202));
const logger_service_1 = __webpack_require__(57);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    app.setGlobalPrefix('api', {
        exclude: [{ path: 'health', method: common_1.RequestMethod.GET }],
    });
    app.useLogger(app.get(logger_service_1.AppLogger));
    app.enableCors();
    app.use(passport_1.default.initialize());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;