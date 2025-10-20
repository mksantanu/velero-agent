<template>
  <Resource :error="!!error" :page="Pages.BACKUP_REPOSITORIES">
    <template #left>
      <BackupRepositoryActions :repository="data" />
      <BackupRepositoryStatus :repository="data" />
      <BackupRepositoryDetails :spec="data?.spec" />
    </template>
    <template #right>
      <ResourceManifest :data="data" />
    </template>
  </Resource>
</template>

<script lang="ts" setup>
import ResourceManifest from '@velero-agent-app/components/Resource/ResourceManifest.vue';
import type { Router } from 'vue-router';
import { useRouter } from 'vue-router';
import BackupRepositoryActions from '@velero-agent-app/components/BackupRepository/BackupRepositoryActions.vue';
import BackupRepositoryStatus from '@velero-agent-app/components/BackupRepository/BackupRepositoryStatus.vue';
import BackupRepositoryDetails from '@velero-agent-app/components/BackupRepository/BackupRepositoryDetails.vue';
import { Resources, type V1BackupRepository } from '@velero-agent/velero';
import { useKubernetesWatchObject } from '@velero-agent-app/composables/useKubernetesWatchObject';
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { Pages } from '@velero-agent-app/utils/constants.utils';
import Resource from '@velero-agent-app/components/Resource/Resource.vue';

const router: Router = useRouter();

const { on, off, data, error } = useKubernetesWatchObject<V1BackupRepository>(
  Resources.BACKUP_REPOSITORY,
  router.currentRoute.value.params.name as string
);

onBeforeMount((): void => on());
onBeforeUnmount((): void => off());
</script>
