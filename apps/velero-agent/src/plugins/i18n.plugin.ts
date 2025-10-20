import { createI18n } from 'vue-i18n';
import { getMessages } from '@velero-agent/i18n';
import { getDefaultLocal } from '@velero-agent-app/utils/config.utils';

export const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocal(),
  fallbackLocale: 'en',
  messages: getMessages(),
});
