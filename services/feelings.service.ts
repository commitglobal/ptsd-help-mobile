import { skipToken, useQuery } from '@tanstack/react-query';

import feelingsRepository from '@/db/repositories/feelings.repository';

const feelingsKeys = {
  details: (id: number) => ['feelings', id] as const,
};

export const useFeeling = (id: number) => {
  return useQuery({
    queryKey: feelingsKeys.details(id),
    queryFn: id ? () => feelingsRepository.getFeelingById(id) : skipToken,
    gcTime: 0,
    staleTime: 0,
  });
};
