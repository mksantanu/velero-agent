<template>
  <ListHeader>
    <template #bulk-buttons>
      <BulkButton
        v-if="can(Action.Delete, Resources.POD_VOLUME_RESTORE.plural)"
        :icon="faTrashCan"
        :loading="isLoadingDeleting"
        @click="showModalBulkRemove = !showModalBulkRemove"
      />
    </template>
    <template #filters>
      <SearchFilter :type="Filter.Backup" />
      <SearchFilter :type="Filter.StorageLocation" />
      <SearchFilter :type="Filter.Status" />
    </template>
  </ListHeader>
  <ListContent :component="PodVolumeLine" />
  <ListFooter />
  <ModalConfirmation
    v-if="showModalBulkRemove"
    :icon="faExclamationCircle"
    :text="
      t('modal.text.confirmation.deleteMany', {
        items: checkedItems.size,
      })
    "
    @on-close="showModalBulkRemove = false"
    @on-confirm="
      remove({
        names: [...checkedItems],
      })
    "
  >
    <template #content>
      <div class="flex flex-col justify-center mb-6">
        <span
          v-for="(item, index) in checkedItems.keys()"
          :key="index"
          class="mt-2 px-1 text-sm rounded bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-200"
          >{{ item }}</span
        >
      </div>
    </template>
  </ModalConfirmation>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { useListStore } from '@velero-agent-app/stores/list.store';
import {
  faExclamationCircle,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import ListHeader from '@velero-agent-app/components/List/ListHeader.vue';
import ListFooter from '@velero-agent-app/components/List/ListFooter.vue';
import ListContent from '@velero-agent-app/components/List/ListContent.vue';
import PodVolumeLine from '@velero-agent-app/components/PodVolume/PodVolumeLine.vue';
import ModalConfirmation from '@velero-agent-app/components/Modals/ModalConfirmation.vue';
import { useDeleteManyKubernetesObjects } from '@velero-agent-app/composables/useDeleteManyKubernetesObjects';
import { Resources } from '@velero-agent/velero';
import { useI18n } from 'vue-i18n';
import { can } from '@velero-agent-app/utils/policy.utils';
import { Action, Filter, SortBy, SortDirection } from '@velero-agent/shared-types';
import SearchFilter from '@velero-agent-app/components/Search/SearchFilter.vue';
import { storeToRefs } from 'pinia';
import BulkButton from '@velero-agent-app/components/BulkButton.vue';

const { t } = useI18n();

const listStore = useListStore();
const { checkedItems } = storeToRefs(listStore);
const { mutate: remove, isPending: isLoadingDeleting } =
  useDeleteManyKubernetesObjects(Resources.POD_VOLUME_RESTORE);

onBeforeMount(() =>
  listStore.setHeaders([
    {
      name: 'list.header.name',
      sort: {
        type: SortBy.Name,
        selected: true,
        direction: SortDirection.Ascending,
      },
    },
    {
      name: 'list.header.fromBackup',
    },
    {
      name: 'storageLocations.title',
      sort: {
        type: SortBy.StorageLocation,
        selected: false,
      },
    },
    {
      name: 'list.header.volume',
    },
    {
      name: 'list.header.status',
    },
    {
      name: 'list.header.actions',
    },
  ])
);

const showModalBulkRemove = ref(false);
</script>
