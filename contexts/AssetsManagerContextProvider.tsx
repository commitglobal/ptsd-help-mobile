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

import { createContext, useContext, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { skipToken, useQuery } from '@tanstack/react-query';
import { Typography } from '@/components/Typography';

const S3_CMS_BASE_URL = 'https://ptsdhelp-cms-test.s3.eu-central-1.amazonaws.com';
const S3_CMS_CONFIG_FOLDER = `${S3_CMS_BASE_URL}/config/`;
const ASSETS_FOLDER_LOCAL = 'assets/';

type AssetsManagerContextType = {
  mediaMapping: any;
};

export interface MediaItem {
  uri: string;
  lastUpdatedAt: number;
}

export type FlatCMSMediaMapping = {
  [key: string]: MediaItem; // e.g., "RELATIONSHIPS.I_MESSAGES.headerImage"
};

export type FlatLocalMediaMapping = {
  [key: string]: string; // e.g., "RELATIONSHIPS.I_MESSAGES.headerImage" -> local URI
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

  const downloadPromises = Object.entries(cmsMapping).map(async ([key, { uri, lastUpdatedAt }]) => {
    const fileName = uri.split('/').pop(); // Extract file name

    const folderInfo = await FileSystem.getInfoAsync(assetsFolder);
    if (!folderInfo.exists) {
      await FileSystem.makeDirectoryAsync(assetsFolder, { intermediates: true });
    }

    const localFilePath = `${assetsFolder}${fileName}`; // !Le bag intr-un folder assets/ ca sa pot sa sterg tot ce nu exista in localMapping fara sa sterg config files

    // Check if the file exists and is up-to-date
    const fileInfo = await FileSystem.getInfoAsync(localFilePath);
    const needsDownload = !fileInfo.exists || (fileInfo.exists && lastUpdatedAt > fileInfo.modificationTime! * 1000);

    console.log(`${key}: ${needsDownload ? 'DOWNLOAD' : 'SKIP'}`);
    console.log(`${fileInfo.exists ? 'EXISTS' : 'NOT EXISTS'}`);
    console.log(`${fileInfo.exists ? `Modification Time: ${fileInfo.modificationTime}` : 'N/A'}`);

    if (needsDownload) {
      try {
        console.log(`Downloading: ${uri}`);
        const result = await FileSystem.downloadAsync(uri, localFilePath);
        updatedMapping[key] = result.uri; // Update with local URI
      } catch (error) {
        console.error(`Error downloading ${uri}:`, error);
      }
    } else {
      console.log(`File is up-to-date: ${localFilePath}`);
      updatedMapping[key] = localFilePath; // Use existing file
    }
  });

  await Promise.all(downloadPromises);

  const timeEnd = new Date().getTime();
  console.log(`Download time: ${timeEnd - timeStart}ms`);

  // Get all files in assets folder
  const assetFiles = await FileSystem.readDirectoryAsync(assetsFolder);

  // Get all file paths from the updated mapping
  const validFilePaths = new Set(Object.values(updatedMapping).map((uri) => uri.split('/').pop()));

  // Delete files that are not in the mapping
  for (const file of assetFiles) {
    if (!validFilePaths.has(file)) {
      const filePath = `${assetsFolder}${file}`;
      try {
        await FileSystem.deleteAsync(filePath);
        console.log(`Deleted unused file: ${filePath}`);
      } catch (error) {
        console.error(`Error deleting file ${filePath}:`, error);
      }
    }
  }

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
          const LOCAL_MAPPING_FILE_NAME = `localMapping_${countryCode}.json`;
          const destinationFolder = `${FileSystem.documentDirectory}`;

          // Try to load existing local mapping
          let localMapping: FlatLocalMediaMapping = {};
          try {
            const localMappingJson = await FileSystem.readAsStringAsync(
              `${destinationFolder}${LOCAL_MAPPING_FILE_NAME}`
            );
            localMapping = JSON.parse(localMappingJson);
          } catch (error) {
            console.log('No existing local mapping found, creating new one');
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
  const countryCode = 'EN';
  const { data: mediaMapping, isFetching } = useMediaMapper(countryCode);

  if (!isFetching && !mediaMapping) {
    return <Typography>FATAL: No media mapping found</Typography>;
  }

  return isFetching ? (
    <Typography>Loading media mapping...</Typography>
  ) : (
    <AssetsManagerContext.Provider value={{ mediaMapping }}>{children}</AssetsManagerContext.Provider>
  );
};

export const useAssetsManagerContext = () => {
  const context = useContext(AssetsManagerContext);
  if (context === null) {
    throw new Error('useAssetsManagerContext must be used within an AssetsManagerContextProvider');
  }
  return context;
};
