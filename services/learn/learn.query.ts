import { useQuery, skipToken, UseQueryResult } from '@tanstack/react-query';
import { LearnContent } from './learn.type';
import { fetchLearnContent } from './learn.fetcher';

export const useLearnContent = (countryCode: string, languageCode: string): UseQueryResult<LearnContent> => {
  return useQuery({
    queryKey: ['learn', countryCode, languageCode],
    queryFn: !countryCode
      ? skipToken
      : async () => {
          console.log('📕 useLearnContent');
          return fetchLearnContent(countryCode, languageCode);
        },
  });
};
