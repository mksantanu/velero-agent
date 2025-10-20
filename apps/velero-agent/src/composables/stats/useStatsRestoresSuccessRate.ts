import { inject } from 'vue';
import type { AxiosInstance } from 'axios';
import { ApiRoutes } from '@velero-agent-app/utils/constants.utils';
import type { RestoresSuccessRateStats } from '@velero-agent/shared-types';
import { useQuery } from '@tanstack/vue-query';

export const useStatsRestoresSuccessRate = () => {
  const axiosInstance: AxiosInstance = inject('axios') as AxiosInstance;

  return useQuery<RestoresSuccessRateStats>({
    queryKey: ['stats', 'restores-success-rate'],
    queryFn: async () =>
      (
        await axiosInstance.get<RestoresSuccessRateStats>(
          `${ApiRoutes.STATS}/restores/success-rate`,
        )
      ).data,
    refetchOnWindowFocus: false,
    initialData: {
      series: [],
    },
  });
};
