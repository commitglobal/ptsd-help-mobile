import { useQuery } from '@tanstack/react-query';
import sleepActivitiesRepository, { SleepActivityType } from '@/db/repositories/sleep-activities.repository';

const sleepActivitiesKeys = {
  details: () => ['sleep-activities'] as const,
};

export const useSleepActivitiesByType = (type: SleepActivityType) => {
  return useQuery({
    queryKey: sleepActivitiesKeys.details(),
    queryFn: () => sleepActivitiesRepository.getSleepActivityByType(type),
    gcTime: 0,
    staleTime: 0,
  });
};
