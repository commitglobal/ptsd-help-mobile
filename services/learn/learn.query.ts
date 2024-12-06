import { useQuery, skipToken, UseQueryResult } from '@tanstack/react-query';
import { LearnContent } from './learn.type';
import { DownloadProgress } from '@/helpers/download-progress';
import { fetchLearnContent } from './learn.fetcher';

export const useLearnContent = (
  countryCode: string | undefined,
  languageCode: string | undefined,
  onProgress?: (progress: DownloadProgress) => void
): UseQueryResult<LearnContent> => {
  return useQuery({
    queryKey: ['learn', countryCode, languageCode],
    queryFn:
      !countryCode || !languageCode
        ? skipToken
        : async () => {
            console.log('📕 useLearnContent');
            return fetchLearnContent(countryCode, languageCode, onProgress);
          },
    retry: 0,
  });
};
