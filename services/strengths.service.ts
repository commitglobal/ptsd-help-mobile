import { skipToken, useQuery } from '@tanstack/react-query';

import strengthsRepository from '@/db/repositories/strengths.repository';

const strengthsKeys = {
  details: (id: number) => ['strength', id] as const,
};

export const useStrength = (id: number) => {
  return useQuery({
    queryKey: strengthsKeys.details(id),
    queryFn: id ? () => strengthsRepository.getStrengthById(id) : skipToken,
    gcTime: 0,
    staleTime: 0,
  });
};
