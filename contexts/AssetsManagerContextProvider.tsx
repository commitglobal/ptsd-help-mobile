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

import { createContext, useContext } from 'react';
import * as FileSystem from 'expo-file-system';
import { skipToken, useQuery, UseQueryResult } from '@tanstack/react-query';
import { Typography } from '@/components/Typography';
import { S3_CMS_CONFIG_FOLDER } from '@/constants/cms';
import { useFoggles } from '@/services/foggles/foggles.query';
import { FogglesConfig } from '@/services/foggles/foggles.type';
import { useLearnContent } from '@/services/learn/learn.query';
import { LearnContent } from '@/services/learn/learn.type';
import { FlatCMSMediaMapping } from '@/services/tools-assets/tools-assets.type';
import { FlatLocalMediaMapping } from '@/services/tools-assets/tools-assets.type';

const ASSETS_FOLDER_LOCAL = 'assets/';

type AssetsManagerContextType = {
  mediaMapping: FlatLocalMediaMapping;
  foggles: FogglesConfig;
  learnContent: LearnContent;
};

export const processFlatMediaAssets = async (
  cmsMapping: FlatCMSMediaMapping,
  localMapping: FlatLocalMediaMapping,
  destinationFolder: string,
  countryCode: string
): Promise<FlatLocalMediaMapping> => {
  const updatedMapping: FlatLocalMediaMapping = { ...localMapping };

  const timeStart = new Date().getTime();

  const assetsFolder = `${destinationFolder}${ASSETS_FOLDER_LOCAL}`;

  let hasChanges = false;

  const downloadPromises = Object.entries(cmsMapping).map(async ([key, { uri, lastUpdatedAt }]) => {
    const fileName = uri.split('/').pop(); // Extract file name

    const folderInfo = await FileSystem.getInfoAsync(assetsFolder);
    if (!folderInfo.exists) {
      await FileSystem.makeDirectoryAsync(assetsFolder, { intermediates: true });
    }

    const localFilePath = `${assetsFolder}${fileName}`;

    // Check if the file exists and is up-to-date
    const fileInfo = await FileSystem.getInfoAsync(localFilePath);
    const needsDownload = !fileInfo.exists || (fileInfo.exists && lastUpdatedAt > fileInfo.modificationTime! * 1000);

    if (needsDownload) {
      hasChanges = true;
      try {
        console.log(`Downloading: ${uri}`);
        const result = await FileSystem.downloadAsync(uri, localFilePath);
        updatedMapping[key as keyof FlatLocalMediaMapping] = result.uri; // Update with local URI
      } catch (error) {
        console.error(`Error downloading ${uri}:`, error);
      }
    } else {
      updatedMapping[key as keyof FlatLocalMediaMapping] = localFilePath; // Use existing file
    }
  });

  await Promise.all(downloadPromises);

  const timeEnd = new Date().getTime();
  console.log(`Media mapping download time: ${timeEnd - timeStart}ms`);

  // Get all files in assets folder
  const assetFiles = await FileSystem.readDirectoryAsync(assetsFolder);

  // Get all file paths from the updated mapping
  const validFilePaths = new Set(Object.values(updatedMapping).map((uri) => uri.split('/').pop()));

  // Delete files that are not in the mapping
  for (const file of assetFiles) {
    if (!validFilePaths.has(file)) {
      hasChanges = true;
      const filePath = `${assetsFolder}${file}`;
      try {
        await FileSystem.deleteAsync(filePath);
        console.log(`Deleted unused file: ${filePath}`);
      } catch (error) {
        console.error(`Error deleting file ${filePath}:`, error);
      }
    }
  }

  if (hasChanges) {
    try {
      // Delete any existing localMapping files
      const files = await FileSystem.readDirectoryAsync(destinationFolder);
      for (const file of files) {
        if (file.startsWith('localMapping_') && file.endsWith('.json')) {
          try {
            await FileSystem.deleteAsync(`${destinationFolder}${file}`);
            console.log(`Deleted old mapping file: ${file}`);
          } catch (error) {
            console.error(`Error deleting mapping file ${file}:`, error);
          }
        }
      }

      // Save new mapping
      const json = JSON.stringify(updatedMapping, null, 2);
      await FileSystem.writeAsStringAsync(`${destinationFolder}localMapping_${countryCode}.json`, json);
      console.log(`Mapping saved to: ${destinationFolder}localMapping_${countryCode}.json`);
    } catch (error) {
      console.error('Error saving local mapping:', error);
    }
  }

  return updatedMapping;
};

export const fetchMediaMapping = async (countryCode: string) => {
  try {
    const response = await fetch(`${S3_CMS_CONFIG_FOLDER}CMSMapping_${countryCode}.json`);
    const data = await response.json(); // { assets: { ... }, lastUpdated: "2024-11-20T12:00:00Z" }
    return data;
  } catch (error) {
    console.error('Error fetching media mapping:', error);
    return null;
  }
};

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
const useMediaMapper = (countryCode: string) => {
  return useQuery({
    queryKey: ['mediaMapper', countryCode],
    queryFn: !countryCode
      ? skipToken
      : async () => {
          console.log('🥳 useMediaMapper');

          const LOCAL_MAPPING_FILE_NAME = `localMapping_${countryCode}.json`;
          const destinationFolder = `${FileSystem.documentDirectory}`;

          // Try to load existing local mapping
          let localMapping: FlatLocalMediaMapping = {} as FlatLocalMediaMapping;
          try {
            const localMappingJson = await FileSystem.readAsStringAsync(
              `${destinationFolder}${LOCAL_MAPPING_FILE_NAME}`
            );
            localMapping = JSON.parse(localMappingJson);
          } catch (error) {
            console.log('No existing local mapping found, creating new one', error);
          }

          let cmsMapping: FlatCMSMediaMapping | null = null;

          try {
            cmsMapping = await fetchMediaMapping(countryCode);
            if (!cmsMapping) throw new Error('No CMS mapping found');

            const updatedMapping = await processFlatMediaAssets(
              cmsMapping,
              localMapping,
              destinationFolder,
              countryCode
            );
            return updatedMapping;
          } catch (error) {
            console.error('Error fetching media mapping:', error);

            if (localMapping) {
              return localMapping;
            }

            return null;
          }
        },
  });
};

const AssetsManagerContext = createContext<AssetsManagerContextType | null>(null);

export const AssetsManagerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const countryCode = 'RO';
  const languageCode = 'ro';
  // console.log(FileSystem.documentDirectory);
  const { data: mediaMapping, isFetching: isFetchingMedia } = useMediaMapper(countryCode);
  const { data: foggles, isFetching: isFetchingFoggles } = useFoggles(countryCode);
  const { data: learnContent, isFetching: isFetchingLearnContent } = useLearnContent(countryCode, languageCode);

  if (isFetchingMedia || isFetchingFoggles || isFetchingLearnContent) {
    return <Typography>Loading...</Typography>;
  }

  if (!mediaMapping) {
    return <Typography>FATAL: No media mapping found</Typography>;
  }

  if (!learnContent) {
    return <Typography>FATAL: No learn content found</Typography>;
  }

  return (
    <AssetsManagerContext.Provider value={{ mediaMapping, foggles, learnContent }}>
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
