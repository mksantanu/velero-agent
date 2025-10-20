<template>
  <Resource :error="!!error" :page="Pages.SNAPSHOT_LOCATIONS">
    <template #left>
      <SnapshotLocationActions :location="data" />
    </template>
    <template #right>
      <ResourceManifest :data="data" />
    </template>
  </Resource>
</template>

<script lang="ts" setup>
import ResourceManifest from '@velero-agent-app/components/Resource/ResourceManifest.vue';
import SnapshotLocationActions from '@velero-agent-app/components/SnapshotLocation/SnapshotLocationActions.vue';
import type { Router } from 'vue-router';
import { useRouter } from 'vue-router';
import { Resources, type V1VolumeSnapshotLocation } from '@velero-agent/velero';
import { useKubernetesWatchObject } from '@velero-agent-app/composables/useKubernetesWatchObject';
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { Pages } from '@velero-agent-app/utils/constants.utils';
import Resource from '@velero-agent-app/components/Resource/Resource.vue';

const router: Router = useRouter();

const { on, off, data, error } =
  useKubernetesWatchObject<V1VolumeSnapshotLocation>(
    Resources.VOLUME_SNAPSHOT_LOCATION,
    router.currentRoute.value.params.name as string
  );

onBeforeMount((): void => on());
onBeforeUnmount((): void => off());
</script>
