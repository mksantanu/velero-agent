<template>
  <Resource :error="!!error" :page="Pages.SCHEDULES">
    <template #left>
      <ScheduleActions :schedule="data" />
      <ScheduleStatus :schedule="data" />
      <BackupDetails :spec="data?.spec.template" />
    </template>
    <template #right>
      <ResourceManifest :data="data" />
    </template>
    <template #bottom>
      <ScheduleStats :name="router.currentRoute.value.params.name as string" />
      <ScheduleBackupList v-if="can(Action.Read, Resources.BACKUP.plural)" />
    </template>
  </Resource>
</template>

<script lang="ts" setup>
import ScheduleActions from '@velero-agent-app/components/Schedule/ScheduleActions.vue';
import ResourceManifest from '@velero-agent-app/components/Resource/ResourceManifest.vue';
import ScheduleStatus from '@velero-agent-app/components/Schedule/ScheduleStatus.vue';
import BackupDetails from '@velero-agent-app/components/Backup/BackupDetails.vue';
import type { Router } from 'vue-router';
import { useRouter } from 'vue-router';
import { Resources, type V1Schedule } from '@velero-agent/velero';
import { useKubernetesWatchObject } from '@velero-agent-app/composables/useKubernetesWatchObject';
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { Pages } from '@velero-agent-app/utils/constants.utils';
import ScheduleBackupList from '@velero-agent-app/components/Schedule/ScheduleBackupList.vue';
import { can } from '@velero-agent-app/utils/policy.utils';
import { Action } from '@velero-agent/shared-types';
import ScheduleStats from '@velero-agent-app/components/Schedule/ScheduleStats.vue';
import Resource from '@velero-agent-app/components/Resource/Resource.vue';

const router: Router = useRouter();

const { on, off, data, error } = useKubernetesWatchObject<V1Schedule>(
  Resources.SCHEDULE,
  router.currentRoute.value.params.name as string
);

onBeforeMount((): void => on());
onBeforeUnmount((): void => off());
</script>
