import { createContext, useContext, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { skipToken, useQuery } from '@tanstack/react-query';
import { Typography } from '@/components/Typography';

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

  const downloadPromises = Object.entries(cmsMapping).map(async ([key, { uri, lastUpdatedAt }]) => {
    const fileName = uri.split('/').pop(); // Extract file name
    const localFilePath = `${destinationFolder}${fileName}`;

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

  try {
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
    const response = await fetch(
      `https://ptsdhelp-cms-test.s3.eu-central-1.amazonaws.com/config/CMSMapping_${countryCode}.json`
    );
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
