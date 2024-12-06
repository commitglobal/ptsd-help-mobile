/**
 * AssetsManagerContext provides a centralized way to manage media assets in the app.
 *
 * Use Case:
 * - The app needs to display images, audio files and other media that are hosted on a CMS
 * - To avoid downloading assets repeatedly and ensure offline availability:
 *   1. Assets are downloaded once and stored locally on the device
 *   2. A mapping is maintained between CMS URIs and local file paths
 *   3. Assets are only re-downloaded if they've been updated on the CMS
 * - The context provides the current mapping to all components via useAssetsManagerContext()
 *
 * Flow:
 * 1. On app start, loads existing local mapping if available
 * 2. Fetches latest asset metadata from CMS
 * 3. Downloads any new/updated assets and updates local mapping
 * 4. Cleans up unused assets to free storage space
 * 5. Provides mapping to components to resolve asset URIs
 */

import { createContext, useContext, useMemo, useState } from 'react';
import { Typography } from '@/components/Typography';
import { useFoggles } from '@/services/foggles/foggles.query';
import { FogglesConfig } from '@/services/foggles/foggles.type';
import { useLearnContent } from '@/services/learn/learn.query';
import { LearnContent } from '@/services/learn/learn.type';
import { LocalToolsAssetsMapping } from '@/services/tools-assets/tools-assets.type';
import { useToolsAssetsMapper } from '@/services/tools-assets/tools-assets.query';
import LoadingAssets from '@/components/LoadingAssets';
import { DownloadProgress } from '@/helpers/download-progress';
import useCountryLanguage from '@/hooks/useCountryLanguage';

type AssetsManagerContextType = {
  mediaMapping: LocalToolsAssetsMapping;
  foggles: FogglesConfig;
  learnContent: LearnContent;
};

const AssetsManagerContext = createContext<AssetsManagerContextType | null>(null);

// TODO: Fallback to default country and language if there are no assets for the current country and language

export const AssetsManagerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: countryLanguage } = useCountryLanguage();

  const [toolsAssetsTotalProgress, setToolsAssetsTotalProgress] = useState<DownloadProgress>();
  const [learnContentTotalProgress, setLearnContentTotalProgress] = useState<DownloadProgress>();

  const totalAssetsProgress = useMemo(() => {
    if (!toolsAssetsTotalProgress || !learnContentTotalProgress) {
      return null;
    }
    return Math.round(
      (((toolsAssetsTotalProgress?.filesDownloaded || 0) + (learnContentTotalProgress?.filesDownloaded || 0)) /
        ((toolsAssetsTotalProgress?.totalNumberOfFiles || 0) + (learnContentTotalProgress?.totalNumberOfFiles || 0))) *
        100
    );
  }, [toolsAssetsTotalProgress, learnContentTotalProgress]);

  const { data: mediaMapping, isFetching: isFetchingMedia } = useToolsAssetsMapper(
    countryLanguage?.countryCode,
    countryLanguage?.languageCode,
    (progress) => setToolsAssetsTotalProgress(progress)
  );

  const { data: foggles, isFetching: isFetchingFoggles } = useFoggles(countryLanguage?.countryCode);

  const { data: learnContent, isFetching: isFetchingLearnContent } = useLearnContent(
    countryLanguage?.countryCode,
    countryLanguage?.languageCode,
    (progress) => setLearnContentTotalProgress(progress)
  );

  const toReturn = useMemo(() => {
    return { mediaMapping, foggles, learnContent };
  }, [mediaMapping, foggles, learnContent]);

  if (isFetchingMedia || isFetchingFoggles || isFetchingLearnContent) {
    return <LoadingAssets progress={totalAssetsProgress} />;
  }

  if (!toReturn.mediaMapping) {
    return <Typography>FATAL: No media mapping found</Typography>;
  }

  if (!toReturn.learnContent) {
    return <Typography>FATAL: No learn content found</Typography>;
  }

  return (
    <AssetsManagerContext.Provider value={toReturn as AssetsManagerContextType}>
      {children}
    </AssetsManagerContext.Provider>
  );
};

export const useAssetsManagerContext = () => {
  const context = useContext(AssetsManagerContext);
  if (context === null) {
    throw new Error('useAssetsManagerContext must be used within an AssetsManagerContextProvider');
  }
  return context;
};
