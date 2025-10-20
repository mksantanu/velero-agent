import type { AxiosInstance } from 'axios';
import { inject } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { ApiRoutes } from '@velero-agent-app/utils/constants.utils';
import type { VeleroUiSettings } from '@velero-agent/shared-types';

export const useSettingsUI = () => {
  const axiosInstance: AxiosInstance = inject('axios') as AxiosInstance;

  return useQuery<VeleroUiSettings>({
    queryKey: ['settings', 'ui'],
    queryFn: async () =>
      (await axiosInstance.get(ApiRoutes.SETTINGS_VELERO_UI)).data,
  });
};
