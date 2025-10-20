import { inject } from 'vue';
import type { AxiosInstance } from 'axios';
import type { ScheduleStats } from '@velero-agent/shared-types';
import { useQuery } from '@tanstack/vue-query';
import { Resources } from '@velero-agent/velero';

export const useScheduleStats = (name: string) => {
  const axiosInstance: AxiosInstance = inject('axios') as AxiosInstance;

  return useQuery<ScheduleStats>({
    queryKey: [Resources.SCHEDULE.plural, name, 'stats'],
    queryFn: async () =>
      (
        await axiosInstance.get<ScheduleStats>(
          `${Resources.SCHEDULE.route}/${name}/stats`
        )
      ).data,
    refetchOnWindowFocus: false,
    initialData: {
      duration: {
        series: [],
      },
      size: {
        series: [],
      },
      items: {
        series: [],
      },
    },
  });
};
