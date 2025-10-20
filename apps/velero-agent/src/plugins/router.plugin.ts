import type { Router, RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import Default from '../layouts/default/Default.vue';
import Auth from '../layouts/auth/Auth.vue';
import { guard, resourceGuard } from '../utils/guard.utils';
import BackupList from '@velero-agent-app/views/list/BackupList.vue';
import NotFound from '../layouts/not-found/NotFound.vue';
import ScheduleList from '@velero-agent-app/views/list/ScheduleList.vue';
import RestoreList from '@velero-agent-app/views/list/RestoreList.vue';
import StorageLocationList from '@velero-agent-app/views/list/StorageLocationList.vue';
import Backup from '@velero-agent-app/views/resources/Backup.vue';
import { Pages } from '../utils/constants.utils';
import SnapshotLocationList from '@velero-agent-app/views/list/SnapshotLocationList.vue';
import Settings from '../views/Settings.vue';
import Schedule from '@velero-agent-app/views/resources/Schedule.vue';
import StorageLocation from '@velero-agent-app/views/resources/StorageLocation.vue';
import SnapshotLocation from '@velero-agent-app/views/resources/SnapshotLocation.vue';
import { useListStore } from '../stores/list.store';
import Dashboard from '@velero-agent-app/views/Dashboard.vue';
import Restore from '@velero-agent-app/views/resources/Restore.vue';
import DownloadRequestList from '@velero-agent-app/views/list/DownloadRequestList.vue';
import ServerStatusRequestList from '@velero-agent-app/views/list/ServerStatusRequestList.vue';
import DeleteBackupRequestList from '@velero-agent-app/views/list/DeleteBackupRequestList.vue';
import BackupRepositoryList from '@velero-agent-app/views/list/BackupRepositoryList.vue';
import BackupRepository from '@velero-agent-app/views/resources/BackupRepository.vue';
import PodVolumeRestoreList from '@velero-agent-app/views/list/PodVolumeRestoreList.vue';
import PodVolumeBackupList from '@velero-agent-app/views/list/PodVolumeBackupList.vue';
import PodVolume from '@velero-agent-app/views/resources/PodVolume.vue';
import { Resources } from '@velero-agent/velero';
import { Action, Filter, type SearchFilters } from '@velero-agent/shared-types';

const routes: Array<RouteRecordRaw> = [
  {
    component: Default,
    redirect: Pages.LOGIN.path,
    path: '/',
    children: [
      {
        ...Pages.HOME,
        component: Dashboard,
      },
      {
        path: Pages.BACKUPS.path,
        beforeEnter: () => resourceGuard(Action.Read, Resources.BACKUP.plural),
        children: [
          {
            path: '',
            component: BackupList,
            name: Pages.BACKUPS.name,
            beforeEnter: () => useListStore().setObjectType(Resources.BACKUP),
          },
          {
            ...Pages.BACKUP,
            component: Backup,
          },
        ],
      },
      {
        path: Pages.STORAGE_LOCATIONS.path,
        beforeEnter: () =>
          resourceGuard(Action.Read, Resources.BACKUP_STORAGE_LOCATION.plural),
        children: [
          {
            path: '',
            component: StorageLocationList,
            name: Pages.STORAGE_LOCATIONS.name,
            beforeEnter: () =>
              useListStore().setObjectType(Resources.BACKUP_STORAGE_LOCATION),
          },
          {
            ...Pages.STORAGE_LOCATION,
            component: StorageLocation,
          },
        ],
      },
      {
        path: Pages.RESTORES.path,
        beforeEnter: () => resourceGuard(Action.Read, Resources.RESTORE.plural),
        children: [
          {
            path: '',
            component: RestoreList,
            name: Pages.RESTORES.name,
            beforeEnter: () => useListStore().setObjectType(Resources.RESTORE),
          },
          {
            ...Pages.RESTORE,
            component: Restore,
          },
        ],
      },
      {
        path: Pages.SCHEDULES.path,
        beforeEnter: () =>
          resourceGuard(Action.Read, Resources.SCHEDULE.plural),
        children: [
          {
            path: '',
            component: ScheduleList,
            name: Pages.SCHEDULES.name,
            beforeEnter: () => useListStore().setObjectType(Resources.SCHEDULE),
          },
          {
            ...Pages.SCHEDULE,
            component: Schedule,
          },
        ],
      },
      {
        path: Pages.SNAPSHOT_LOCATIONS.path,
        beforeEnter: () =>
          resourceGuard(Action.Read, Resources.VOLUME_SNAPSHOT_LOCATION.plural),
        children: [
          {
            path: '',
            component: SnapshotLocationList,
            name: Pages.SNAPSHOT_LOCATIONS.name,
            beforeEnter: () =>
              useListStore().setObjectType(Resources.VOLUME_SNAPSHOT_LOCATION),
          },
          {
            ...Pages.SNAPSHOT_LOCATION,
            component: SnapshotLocation,
          },
        ],
      },
      {
        path: Pages.BACKUP_REPOSITORIES.path,
        beforeEnter: () =>
          resourceGuard(Action.Read, Resources.BACKUP_REPOSITORY.plural),
        children: [
          {
            path: '',
            component: BackupRepositoryList,
            name: Pages.BACKUP_REPOSITORIES.name,
            beforeEnter: () =>
              useListStore().setObjectType(Resources.BACKUP_REPOSITORY),
          },
          {
            ...Pages.BACKUP_REPOSITORY,
            component: BackupRepository,
          },
        ],
      },
      {
        path: Pages.POD_VOLUME_BACKUPS.path,
        beforeEnter: () =>
          resourceGuard(Action.Read, Resources.POD_VOLUME_BACKUP.plural),
        children: [
          {
            path: '',
            component: PodVolumeBackupList,
            name: Pages.POD_VOLUME_BACKUPS.name,
            beforeEnter: () =>
              useListStore().setObjectType(Resources.POD_VOLUME_BACKUP),
          },
          {
            ...Pages.POD_VOLUME_BACKUP,
            component: PodVolume,
          },
        ],
      },
      {
        path: Pages.POD_VOLUME_RESTORES.path,
        beforeEnter: () =>
          resourceGuard(Action.Read, Resources.POD_VOLUME_RESTORE.plural),
        children: [
          {
            path: '',
            component: PodVolumeRestoreList,
            name: Pages.POD_VOLUME_RESTORES.name,
            beforeEnter: () =>
              useListStore().setObjectType(Resources.POD_VOLUME_RESTORE),
          },
          {
            ...Pages.POD_VOLUME_RESTORE,
            component: PodVolume,
          },
        ],
      },
      {
        ...Pages.DOWNLOAD_REQUESTS,
        component: DownloadRequestList,
        beforeEnter: () => {
          useListStore().setObjectType(Resources.DOWNLOAD_REQUEST);
          return resourceGuard(Action.Read, Resources.DOWNLOAD_REQUEST.plural);
        },
      },
      {
        ...Pages.SERVER_STATUS_REQUESTS,
        component: ServerStatusRequestList,
        beforeEnter: () => {
          useListStore().setObjectType(Resources.SERVER_STATUS_REQUEST);
          return resourceGuard(
            Action.Read,
            Resources.SERVER_STATUS_REQUEST.plural
          );
        },
      },
      {
        ...Pages.DELETE_BACKUP_REQUESTS,
        component: DeleteBackupRequestList,
        beforeEnter: () => {
          useListStore().setObjectType(Resources.DELETE_BACKUP_REQUEST);
          return resourceGuard(
            Action.Read,
            Resources.DELETE_BACKUP_REQUEST.plural
          );
        },
      },
      {
        ...Pages.SETTINGS,
        beforeEnter: () => resourceGuard(Action.Manage, 'all'),
        component: Settings,
      },
    ],
  },
  {
    ...Pages.LOGIN,
    component: Auth,
  },
  {
    ...Pages.NOT_FOUND,
    component: NotFound,
  },
];

const router: Router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach(guard);

router.beforeEach((to) => {
  let title = 'Velero UI';

  if (to.name) {
    title += ` - ${to.name.toString()}`;
  }
  if (to.params.name) {
    title += ` - ${to.params.name}`;
  }

  document.title = title;
});

router.afterEach((to) => {
  const listStore = useListStore();

  const filters: SearchFilters = {};
  for (const key of Object.keys(to.query)) {
    if (Object.values(Filter).includes(key as Filter)) {
      filters[key] = to.query[key] as string;
    }
  }

  listStore.setFilters(filters);
});

export default router;
