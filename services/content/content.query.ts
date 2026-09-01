import { useQuery, skipToken, UseQueryResult } from '@tanstack/react-query';
import { ContentType } from './content.type';
import { DownloadProgress } from '@/helpers/download-progress';
import { fetchLearnContent } from './content.fetcher';
import { getLearnContentConfig, getSupportContentConfig } from './content.helper';

export const useLearnContent = (
  countryCode: string | undefined,
  languageCode: string | undefined,
  onProgress?: (progress: DownloadProgress) => void
): UseQueryResult<ContentType | null> => {
  return useQuery({
    queryKey: ['learn', countryCode, languageCode],
    queryFn:
      !countryCode || !languageCode
        ? skipToken
        : async () => {
            console.log('📕 useLearnContent');
            const config = getLearnContentConfig(countryCode, languageCode);
            return fetchLearnContent({ ...config, onProgress });
          },
    retry: 0,
  });
};

export const useSupportContent = (
  countryCode: string | undefined,
  languageCode: string | undefined,
  onProgress?: (progress: DownloadProgress) => void
): UseQueryResult<ContentType | null> => {
  return useQuery({
    queryKey: ['support', countryCode, languageCode],
    queryFn:
      !countryCode || !languageCode
        ? skipToken
        : async () => {
            console.log('📕 useSupportContent');
            const config = getSupportContentConfig(countryCode, languageCode);
            return fetchLearnContent({ ...config, onProgress });
          },
    retry: 0,
  });
};
