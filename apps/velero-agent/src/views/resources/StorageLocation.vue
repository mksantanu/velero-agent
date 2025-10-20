<template>
  <Resource :error="!!error" :page="Pages.STORAGE_LOCATIONS">
    <template #left>
      <StorageLocationActions :location="data" />
      <StorageLocationStatus :location="data" />
      <StorageLocationDetails :location="data" />
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
import StorageLocationActions from '@velero-agent-app/components/StorageLocation/StorageLocationActions.vue';
import StorageLocationStatus from '@velero-agent-app/components/StorageLocation/StorageLocationStatus.vue';
import StorageLocationDetails from '@velero-agent-app/components/StorageLocation/StorageLocationDetails.vue';
import { Resources, type V1BackupStorageLocation } from '@velero-agent/velero';
import { useKubernetesWatchObject } from '@velero-agent-app/composables/useKubernetesWatchObject';
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { Pages } from '@velero-agent-app/utils/constants.utils';
import Resource from '@velero-agent-app/components/Resource/Resource.vue';

const router: Router = useRouter();

const { on, off, data, error } =
  useKubernetesWatchObject<V1BackupStorageLocation>(
    Resources.BACKUP_STORAGE_LOCATION,
    router.currentRoute.value.params.name as string
  );

onBeforeMount((): void => on());
onBeforeUnmount((): void => off());
</script>
