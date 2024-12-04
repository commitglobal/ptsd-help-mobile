import { useQuery, skipToken } from '@tanstack/react-query';
import { fetchToolsAssets } from './tools-assets.fetcher';
import { DownloadProgress } from '@/helpers/download-progress';

/**
 * Custom hook that manages media asset mapping between CMS and local storage.
 *
 * This hook handles:
 * - Loading existing local media mapping from device storage
 * - Fetching latest media mapping from CMS
 * - Processing and downloading new/updated media assets
 * - Falling back to local mapping if CMS fetch fails
 *
 * @returns {UseQueryResult} Query result containing the media mapping or null if no mapping exists
 */
export const useToolsAssetsMapper = (
  countryCode: string | undefined,
  languageCode: string | undefined,
  onProgress?: (progress: DownloadProgress) => void
) => {
  return useQuery({
    queryKey: ['toolsAssetsMapper', countryCode, languageCode],
    queryFn: !countryCode || !languageCode ? skipToken : () => fetchToolsAssets(countryCode, languageCode, onProgress),
    retry: false,
  });
};
