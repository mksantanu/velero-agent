import type { App } from 'vue';

import { store } from '@velero-agent-app/plugins/pinia.plugin';
import router from '@velero-agent-app/plugins/router.plugin';
import { Axios } from '@velero-agent-app/plugins/axios.plugin';
import VueApexCharts from 'vue3-apexcharts';
import { SocketIO } from '@velero-agent-app/plugins/socket.plugin';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { i18n } from '@velero-agent-app/plugins/i18n.plugin';
import { FormKit } from '@velero-agent-app/plugins/formkit.plugin';

export const registerPlugins = (app: App): void => {
  app.use(store);
  app.use(router);
  app.use(i18n);
  app.use(VueApexCharts);
  app.use(VueQueryPlugin);
  app.use(FormKit);
  app.use(SocketIO);
  app.use(Axios);
};
