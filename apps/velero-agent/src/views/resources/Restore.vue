<template>
  <Resource :error="!!error" :page="Pages.RESTORES">
    <template #left>
      <RestoreActions :restore="data" />
      <RestoreStatus :restore="data" />
      <RestoreDetails :spec="data?.spec" />
    </template>
    <template #right>
      <ResourceManifest :data="data" />
    </template>
    <template #bottom>
      <PodVolumes v-if="can(Action.Read, Resources.RESTORE.plural)" />
      <ResourceLogs
        v-if="can(Action.Logs, Resources.RESTORE.plural)"
        :data="logs"
        :loading="isLoading"
        :name="data?.metadata?.name"
        :type="V1DownloadTargetKind.RestoreLog"
        class="pb-6"
      />
    </template>
  </Resource>
</template>

<script lang="ts" setup>
import type { Router } from 'vue-router';
import { useRouter } from 'vue-router';

import {
  Resources,
  V1DownloadTargetKind,
  type V1Restore,
} from '@velero-agent/velero';
import { onBeforeMount, onBeforeUnmount } from 'vue';
import ResourceManifest from '@velero-agent-app/components/Resource/ResourceManifest.vue';
import { useLogsGet } from '@velero-agent-app/composables/useLogsGet';
import RestoreActions from '@velero-agent-app/components/Restore/RestoreActions.vue';
import RestoreStatus from '@velero-agent-app/components/Restore/RestoreStatus.vue';
import RestoreDetails from '@velero-agent-app/components/Restore/RestoreDetails.vue';
import { useKubernetesWatchObject } from '@velero-agent-app/composables/useKubernetesWatchObject';
import { Pages } from '@velero-agent-app/utils/constants.utils';
import PodVolumes from '@velero-agent-app/components/PodVolume/PodVolumes.vue';
import { can } from '@velero-agent-app/utils/policy.utils';
import { Action } from '@velero-agent/shared-types';
import Resource from '@velero-agent-app/components/Resource/Resource.vue';

const router: Router = useRouter();

const { on, off, data, error } = useKubernetesWatchObject<V1Restore>(
  Resources.RESTORE,
  router.currentRoute.value.params.name as string
);

const {
  data: logs,
  isLoading,
  refetch,
} = useLogsGet(
  router.currentRoute.value.params.name as string,
  V1DownloadTargetKind.RestoreLog
);

onBeforeMount((): void => on());
onBeforeUnmount((): void => off());
onBeforeMount(() =>
  can(Action.Read, Resources.RESTORE.plural) ? refetch() : void 0
);
</script>
