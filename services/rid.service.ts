import { skipToken, useQuery } from '@tanstack/react-query';

import ridRepository from '@/db/repositories/rid.repository';

const ridKeys = {
  details: (id: number) => ['rid', id] as const,
};

export const useRID = (id: number) => {
  return useQuery({
    queryKey: ridKeys.details(id),
    queryFn: id ? () => ridRepository.getRIDById(id) : skipToken,
    gcTime: 0,
    staleTime: 0,
  });
};
