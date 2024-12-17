import { useQuery } from '@tanstack/react-query';
import contactsRepository from '@/db/repositories/contacts.repository';

const contactsKeys = {
  details: () => ['contacts'] as const,
};

export const useContacts = () => {
  return useQuery({
    queryKey: contactsKeys.details(),
    queryFn: () => contactsRepository.getContacts(),
    gcTime: 0,
    staleTime: 0,
  });
};
