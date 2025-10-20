import type { AxiosInstance } from 'axios';
import { inject } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { ApiRoutes } from '@velero-agent-app/utils/constants.utils';
import type { ClusterSettings } from '@velero-agent/shared-types';

export const useSettingsCluster = () => {
  const axiosInstance: AxiosInstance = inject('axios') as AxiosInstance;

  return useQuery<ClusterSettings>({
    queryKey: ['settings', 'cluster'],
    queryFn: async () =>
      (await axiosInstance.get(ApiRoutes.SETTINGS_CLUSTER)).data,
  });
};
