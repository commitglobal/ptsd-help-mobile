import { skipToken, useQuery } from '@tanstack/react-query';

import repository from '@/db/repository';

const messagesKeys = {
  details: (id: number) => ['messages', id] as const,
};

export const useMessage = (id: number) => {
  return useQuery({
    queryKey: messagesKeys.details(id),
    queryFn: id ? () => repository.getMessageById(id) : skipToken,
    gcTime: 0,
    staleTime: 0,
  });
};
