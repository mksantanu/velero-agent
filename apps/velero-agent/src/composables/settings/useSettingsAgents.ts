import type { AxiosInstance } from 'axios';
import { inject } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { ApiRoutes } from '@velero-agent-app/utils/constants.utils';
import type { VeleroAgentSettings } from '@velero-agent/shared-types';

export const useSettingsAgents = () => {
  const axiosInstance: AxiosInstance = inject('axios') as AxiosInstance;

  return useQuery<VeleroAgentSettings[]>({
    queryKey: ['settings', 'agents'],
    queryFn: async () =>
      (await axiosInstance.get(ApiRoutes.SETTINGS_VELERO_AGENTS)).data,
    initialData: []
  });
};
