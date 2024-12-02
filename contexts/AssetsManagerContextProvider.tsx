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
import { FogglesConfig } from '@/models/CMSFoggles.type';
import { Category, LearnContent, Section, Topic } from '@/models/LearnContent.type';
import { S3_CMS_CONFIG_FOLDER, S3_CMS_CONTENT_FOLDER } from '@/constants/cms';
import { fetchFoggles } from '@/services/foggles/foggles.fetcher';

const ASSETS_FOLDER_LOCAL = 'assets/';

type AssetsManagerContextType = {
  mediaMapping: FlatLocalMediaMapping;
  foggles: FogglesConfig;
  learnContent: LearnContent;
};

export interface MediaItem {
  uri: string;
  lastUpdatedAt: number;
}

export type FlatCMSMediaMapping = {
  [key: string]: MediaItem; // e.g., "RELATIONSHIPS.I_MESSAGES.headerImage"
};

// TODO: 2. Add country/language specific assets in both Learn and Tools assets

export type FlatLocalMediaMapping = {
  'RELATIONSHIPS.CATEGORY_ICON': string;
  'AMBIENT_SOUNDS.CATEGORY_ICON': string;
  'RELATIONSHIPS.HEALTHY_ARGUMENTS.headerImage': string;
  'AMBIENT_SOUNDS.BIRDS.soundURI': string;
  'AMBIENT_SOUNDS.CRICKETS.soundURI': string;
  'AMBIENT_SOUNDS.FROGS.soundURI': string;
  'AMBIENT_SOUNDS.DRIPPING_WATER.soundURI': string;
  'AMBIENT_SOUNDS.MARSH.soundURI': string;
  'AMBIENT_SOUNDS.PUBLIC_POOL.soundURI': string;
  'AMBIENT_SOUNDS.BEACH.soundURI': string;
  'AMBIENT_SOUNDS.STREAM_WATER.soundURI': string;
  'AMBIENT_SOUNDS.WATERFALL.soundURI': string;
  'MINDFULNESS.CATEGORY_ICON': string;
  'AMBIENT_SOUNDS.RUNNING_WATER.soundURI': string;
  'MINDFULNESS.MINDFUL_WALKING.CATEGORY_ICON': string;
  'MINDFULNESS.MINDFUL_WALKING.soundURI': string;
  'MINDFULNESS.CONSCIOUS_BREATHING.CATEGORY_ICON': string;
  'MINDFULNESS.SENSE_AWARENESS.CATEGORY_ICON': string;
  'MINDFULNESS.SENSE_AWARENESS.soundURI': string;
  'MINDFULNESS.LOVING_KINDNESS.CATEGORY_ICON': string;
  'MINDFULNESS.LOVING_KINDNESS.soundURI': string;
  'RELATIONSHIPS.I_MESSAGES.CATEGORY_ICON': string;
  'MINDFULNESS.EMOTIONAL_DISCOMFORT.CATEGORY_ICON': string;
  'MINDFULNESS.EMOTIONAL_DISCOMFORT.soundURI': string;
  'RELATIONSHIPS.HEALTHY_ARGUMENTS.CATEGORY_ICON': string;
  'RELATIONSHIPS.I_MESSAGES.headerImage': string;
  'RELATIONSHIPS.POSITIVE_COMMUNICATION.CATEGORY_ICON': string;
  'RELATIONSHIPS.RECONNECT_WITH_PARTNER.CATEGORY_ICON': string;
  'AMBIENT_SOUNDS.RAIN.soundURI': string;
  'AMBIENT_SOUNDS.WIND.soundURI': string;
  'AMBIENT_SOUNDS.COUNTRY_ROAD.soundURI': string;
  'AMBIENT_SOUNDS.FOREST.soundURI': string;
  'PAUSE.CATEGORY_ICON': string;
  'MINDFULNESS.CONSCIOUS_BREATHING.soundURI': string;
  'MY_FEELINGS.CATEGORY_ICON': string;
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

export const fetchLearnContent = async (countryCode: string) => {
  const processImageContent = async (imageSrc: string, contentDir: string): Promise<string> => {
    const imageFileName = imageSrc.split('/').pop();
    const localImagePath = `${contentDir}/${imageFileName}`;
    try {
      await FileSystem.downloadAsync(imageSrc, localImagePath);
    } catch (error) {
      console.error('Error downloading image:', error);
      return '';
    }
    return localImagePath;
  };

  const processSection = async (section: Section, contentDir: string): Promise<Section> => {
    if (section.type === 'image') {
      return {
        ...section,
        src: await processImageContent(section.src, contentDir),
      };
    }

    if (section.type === 'multiContent') {
      const processedContent = await Promise.all(
        section.contentArray.map(async (content) => {
          if (content.type === 'image') {
            return {
              ...content,
              src: await processImageContent(content.src, contentDir),
            };
          }
          return content;
        })
      );

      return {
        ...section,
        contentArray: processedContent,
      };
    }

    if (section.type === 'multiPage') {
      const processedPages = await Promise.all(
        section.pageArray.map(async (page) =>
          Promise.all(
            page.map(async (content) => {
              if (content.type === 'image') {
                return {
                  ...content,
                  src: await processImageContent(content.src, contentDir),
                };
              }
              return content;
            })
          )
        )
      );

      return {
        ...section,
        pageArray: processedPages,
      };
    }

    return section;
  };

  const getLocalLearnContent = async () => {
    try {
      const localContentPath = `${FileSystem.documentDirectory}content/${countryCode}/learn.json`;
      const localContentJson = await FileSystem.readAsStringAsync(localContentPath);
      return JSON.parse(localContentJson);
    } catch (error) {
      console.log('No existing local learn content found', error);
      return null;
    }
  };

  const getRemoteLearnContent = async () => {
    try {
      const response = await fetch(`${S3_CMS_CONTENT_FOLDER}learn.json`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching remote learn content:', error);
      return null;
    }
  };

  const [localContent, remoteContent] = await Promise.all([getLocalLearnContent(), getRemoteLearnContent()]);

  if (!localContent && !remoteContent) {
    return null;
  }

  const shouldUpdateLocal =
    !localContent || new Date(remoteContent?.lastUpdatedAt) > new Date(localContent?.lastUpdatedAt);

  const contentDir = `${FileSystem.documentDirectory}content/${countryCode}/learn`;
  // Create content directory if it doesn't exist
  await FileSystem.makeDirectoryAsync(contentDir, { intermediates: true });

  if (shouldUpdateLocal && remoteContent) {
    // Get list of all files in learn directory
    const existingFiles = new Set(await FileSystem.readDirectoryAsync(contentDir));
    const usedFiles = new Set<string>();

    // Process categories
    const processedCategories: Category[] = await Promise.all(
      remoteContent.categories.map(async (category: Category) => {
        // Process category icon
        const processedIcon = category.icon ? await processImageContent(category.icon, contentDir) : category.icon;
        if (processedIcon) usedFiles.add(processedIcon.split('/').pop()!);

        // Process topics within category
        const processedTopics: Topic[] = await Promise.all(
          category.topics.map(async (topic: Topic) => {
            // Process topic icon
            const processedTopicIcon = topic.icon ? await processImageContent(topic.icon, contentDir) : topic.icon;
            if (processedTopicIcon) usedFiles.add(processedTopicIcon.split('/').pop()!);

            // Process sections
            const processedSections: Section[] = await Promise.all(
              topic.content.sections.map((section) => processSection(section, contentDir))
            );

            return {
              ...topic,
              icon: processedTopicIcon,
              content: {
                ...topic.content,
                sections: processedSections,
              },
            };
          })
        );

        return {
          ...category,
          icon: processedIcon,
          topics: processedTopics,
        };
      })
    );

    // Delete files that are not in usedFiles
    for (const file of existingFiles) {
      if (!usedFiles.has(file)) {
        try {
          await FileSystem.deleteAsync(`${contentDir}/${file}`);
          console.log(`Deleted unused file from learn: ${file}`);
        } catch (error) {
          console.error(`Error deleting file ${file}:`, error);
        }
      }
    }

    const toReturn: LearnContent = {
      ...remoteContent,
      categories: processedCategories,
    };

    // Save processed content
    const localContentPath = `${FileSystem.documentDirectory}content/${countryCode}/learn.json`;
    await FileSystem.writeAsStringAsync(localContentPath, JSON.stringify(toReturn, null, 2));

    return toReturn;
  }

  return localContent;
};

const useFoggles = (countryCode: string): UseQueryResult<FogglesConfig> => {
  return useQuery({
    queryKey: ['foggles', countryCode],
    queryFn: !countryCode
      ? skipToken
      : async () => {
          console.log('🐸 useFoggles');
          return fetchFoggles(countryCode);
        },
  });
};

const useLearnContent = (countryCode: string): UseQueryResult<LearnContent> => {
  return useQuery({
    queryKey: ['learn', countryCode],
    queryFn: !countryCode
      ? skipToken
      : async () => {
          console.log('📕 useLearnContent');
          return fetchLearnContent(countryCode);
        },
    staleTime: 60 * 60 * 1000, // 24 hours
  });
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
  // console.log(FileSystem.documentDirectory);
  const { data: mediaMapping, isFetching: isFetchingMedia } = useMediaMapper(countryCode);
  const { data: foggles, isFetching: isFetchingFoggles } = useFoggles(countryCode);
  const { data: learnContent, isFetching: isFetchingLearnContent } = useLearnContent(countryCode);

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
