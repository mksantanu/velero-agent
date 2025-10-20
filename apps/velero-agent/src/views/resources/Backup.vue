<template>
  <Resource :error="!!error" :page="Pages.BACKUPS">
    <template #left>
      <BackupActions :backup="data" />
      <BackupStatus :backup="data" />
      <BackupDetails :spec="data?.spec" :schedule="data?.metadata?.labels?.['velero.io/schedule-name']" />
    </template>
    <template #right>
      <ResourceManifest :data="data" />
    </template>
    <template #bottom>
      <PodVolumes v-if="can(Action.Read, Resources.POD_VOLUME_BACKUP.plural)" />
      <ResourceLogs
        v-if="can(Action.Logs, Resources.BACKUP.plural)"
        :data="logs"
        :loading="isFetching"
        :name="data?.metadata?.name"
        :type="V1DownloadTargetKind.BackupLog"
        class="pb-4"
      />
    </template>
  </Resource>
</template>

<script lang="ts" setup>
import type { Router } from 'vue-router';
import { useRouter } from 'vue-router';

import {
  Resources,
  type V1Backup,
  V1DownloadTargetKind,
} from '@velero-agent/velero';
import { onBeforeMount, onBeforeUnmount } from 'vue';
import BackupActions from '@velero-agent-app/components/Backup/BackupActions.vue';
import BackupStatus from '@velero-agent-app/components/Backup/BackupStatus.vue';
import BackupDetails from '@velero-agent-app/components/Backup/BackupDetails.vue';
import ResourceManifest from '@velero-agent-app/components/Resource/ResourceManifest.vue';
import Logs from '@velero-agent-app/components/Log/Logs.vue';
import { useLogsGet } from '@velero-agent-app/composables/useLogsGet';
import { useKubernetesWatchObject } from '@velero-agent-app/composables/useKubernetesWatchObject';
import ResourceNotFound from '@velero-agent-app/components/Resource/ResourceNotFound.vue';
import { Pages } from '@velero-agent-app/utils/constants.utils';
import PodVolumes from '@velero-agent-app/components/PodVolume/PodVolumes.vue';
import { Action } from '@velero-agent/shared-types';
import { can } from '@velero-agent-app/utils/policy.utils';
import Resource from '@velero-agent-app/components/Resource/Resource.vue';
import ResourceLogs from '@velero-agent-app/components/Resource/ResourceLogs.vue';

const router: Router = useRouter();

const { on, off, data, error } = useKubernetesWatchObject<V1Backup>(
  Resources.BACKUP,
  router.currentRoute.value.params.name as string
);

const {
  isFetching,
  data: logs,
  refetch,
} = useLogsGet(
  router.currentRoute.value.params.name as string,
  V1DownloadTargetKind.BackupLog
);

onBeforeMount((): void => on());
onBeforeUnmount((): void => off());
onBeforeMount(() =>
  can(Action.Logs, Resources.BACKUP.plural) ? refetch() : void 0
);
</script>
