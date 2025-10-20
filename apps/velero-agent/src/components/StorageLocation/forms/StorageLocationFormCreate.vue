<template>
  <div class="flex p-4 md:p-5 justify-center flex-col sm:mx-10">
    <Form
      :is-loading="isPending"
      :step-components="[
        {
          name: t('global.info'),
          optional: false,
          component: shallowRef(StorageLocationCreateInfo),
        },
        {
          name: t('global.credentials'),
          optional: true,
          component: shallowRef(StorageLocationCreateCredential),
        },
        {
          name: t('global.configurationAndLabels'),
          optional: true,
          component: shallowRef(StorageLocationCreateConfig),
        },
        {
          name: t('global.confirmation'),
          optional: false,
          component: shallowRef(StorageLocationCreateConfirm),
        },
      ]"
      @dismiss-error="dismissError()"
      @on-submit="onSubmit()"
    />
  </div>
</template>

<script lang="ts" setup>
import Form from '@velero-agent-app/components/Form.vue';
import { useFormStore } from '@velero-agent-app/stores/form.store';
import { storeToRefs } from 'pinia';
import StorageLocationCreateConfirm from '@velero-agent-app/components/StorageLocation/forms/StorageLocationFormConfirm.vue';
import StorageLocationCreateInfo from '@velero-agent-app/components/StorageLocation/forms/StorageLocationFormInfo.vue';
import StorageLocationCreateCredential from '@velero-agent-app/components/StorageLocation/forms/StorageLocationFormCredential.vue';
import StorageLocationCreateConfig from '@velero-agent-app/components/StorageLocation/forms/StorageLocationFormConfig.vue';
import type { CreateFormBody } from '@velero-agent/shared-types';
import { onBeforeUnmount, shallowRef, watch } from 'vue';
import { useKubernetesCreateObject } from '@velero-agent-app/composables/useKubernetesCreateObject';
import { Resources, type V1BackupStorageLocationSpec } from '@velero-agent/velero';
import { useI18n } from 'vue-i18n';

const { mutate, isPending, isError, isSuccess } = useKubernetesCreateObject(
  Resources.BACKUP_STORAGE_LOCATION,
);

const { t } = useI18n();
const formStore = useFormStore();
const { formContent } = storeToRefs(formStore);

onBeforeUnmount(() => formStore.reset());

const emit = defineEmits(['onConfirm', 'onCancel', 'onClose']);

const dismissError = () => {};

const onSubmit = () => {
  const form: CreateFormBody<V1BackupStorageLocationSpec> = {
    name: formContent.value[0].name,
    spec: {
      accessMode: formContent.value[0].accessMode,
      objectStorage: {
        bucket: formContent.value[0].bucket,
        caCert: formContent.value[0].caCert,
        prefix: formContent.value[0].prefix,
      },
      provider: formContent.value[0].provider,
    },
  };

  if (formContent.value[0].backupSyncPeriod?.value) {
    form.spec.backupSyncPeriod = formContent.value[0].backupSyncPeriod.value +
        formContent.value[0].backupSyncPeriod.unit;
  }

  if (formContent.value[0].validationFrequency?.value) {
    form.spec.validationFrequency = formContent.value[0].validationFrequency.value +
        formContent.value[0].validationFrequency.unit;
  }

  if (formContent.value[0].default) {
    form.spec.default = formContent.value[0].default;
  }

  if (formContent.value[1].credential.name) {
    form.spec.credential = {
      key: formContent.value[1].credential.key,
      name: formContent.value[1].credential.name,
    };
  }

  if (Object.entries(formContent.value[2].configuration).length > 0) {
    form.spec.config = formContent.value[2].configuration;
  }

  if (Object.entries(formContent.value[2].labels).length > 0) {
    form.labels = formContent.value[2].labels;
  }
  mutate(form);
};

watch(isError, () => {
  if (isError.value) {
    formStore.previous();
  }
});

watch(isSuccess, () => {
  if (isSuccess.value) {
    emit('onClose');
  }
});
</script>
