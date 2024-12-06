import {
  getLocalToolsAssetsFolderPath,
  getLocalToolsAssetsMappingFilePath,
  getRemoteToolsAssetsMappingFilePath,
  getToolsAssetsFolderName,
  TOOLS_ASSETS_FOLDER,
  TOOLS_ASSETS_MAPPING_FILE_NAME,
} from './tools-assets.helper';
import * as FileSystem from 'expo-file-system';
import { RemoteToolsAssetsMapping, LocalToolsAssetsMapping } from './tools-assets.type';
import { DownloadProgress, DownloadProgressTracker } from '@/helpers/download-progress';

const fetchRemoteToolsAssets = async (countryCode: string, languageCode: string) => {
  try {
    const response = await fetch(getRemoteToolsAssetsMappingFilePath(countryCode, languageCode));
    const data = await response.json(); // { assets: { ... }, lastUpdated: "2024-11-20T12:00:00Z" }
    return data;
  } catch (error) {
    console.error('Error fetching media mapping:', error);
    return null;
  }
};

const fetchLocalToolsAssets = async (countryCode: string, languageCode: string) => {
  // Try to load existing local mapping
  let localMapping: LocalToolsAssetsMapping = {} as LocalToolsAssetsMapping;
  try {
    const localMappingJson = await FileSystem.readAsStringAsync(
      getLocalToolsAssetsMappingFilePath(countryCode, languageCode)
    );
    localMapping = JSON.parse(localMappingJson);
  } catch (error) {
    console.log('No existing local mapping found, creating new one', error);
    return null;
  }

  return localMapping;
};

const cleanUpUnusedDirectoriesOrFiles = async (workDir: string, validFilesOrFolders: string[]) => {
  const filesOrFolders = await FileSystem.readDirectoryAsync(workDir);
  const unusedFilesOrFolders = filesOrFolders.filter((fileOrFolder) => !validFilesOrFolders.includes(fileOrFolder));

  try {
    await Promise.all(unusedFilesOrFolders.map((fileOrFolder) => FileSystem.deleteAsync(`${workDir}/${fileOrFolder}`)));
  } catch (error) {
    console.error(`Error cleaning up unused directories or files:`, error);
  }
};

export const processToolsAssets = async (
  cmsMapping: RemoteToolsAssetsMapping,
  localMapping: LocalToolsAssetsMapping | null,
  countryCode: string,
  languageCode: string,
  onProgress?: (progress: DownloadProgress) => void
): Promise<LocalToolsAssetsMapping | null> => {
  const progressTracker = new DownloadProgressTracker(onProgress);
  const updatedMapping: LocalToolsAssetsMapping = localMapping ? { ...localMapping } : ({} as LocalToolsAssetsMapping);
  const assetsFolder = getLocalToolsAssetsFolderPath(countryCode, languageCode);

  const folderInfo = await FileSystem.getInfoAsync(assetsFolder);
  if (!folderInfo.exists) {
    await FileSystem.makeDirectoryAsync(assetsFolder, { intermediates: true });
  }

  let hasChanges = false;

  progressTracker.setTotalFiles(Object.keys(cmsMapping)?.length || 0);

  // Download and update mapping for each asset
  const timeStart = new Date().getTime();

  await Promise.all(
    Object.entries(cmsMapping).map(async ([key, { uri, lastUpdatedAt }]) => {
      const fileName = uri.split('/').pop();
      const localFilePath = `${assetsFolder}/${fileName}`;
      const fileInfo = await FileSystem.getInfoAsync(localFilePath);

      const needsDownload =
        !fileInfo.exists || (fileInfo.exists && new Date(lastUpdatedAt).getTime() > fileInfo.modificationTime! * 1000);

      if (needsDownload) {
        hasChanges = true;
        try {
          console.log(`Downloading: ${uri}`);
          const result = await FileSystem.downloadAsync(uri, localFilePath);
          updatedMapping[key as keyof LocalToolsAssetsMapping] = result.uri;
          progressTracker.incrementDownloaded();
        } catch (error) {
          console.error(`Error downloading ${uri}:`, error);
        }
      } else {
        updatedMapping[key as keyof LocalToolsAssetsMapping] = localFilePath;
        progressTracker.incrementDownloaded();
      }
    })
  );

  console.log(`Media mapping download time: ${new Date().getTime() - timeStart}ms`);

  if (hasChanges) {
    // Clean up unused files in the assets folder
    const validFilePaths = new Set(
      Object.values(updatedMapping)
        .map((uri) => uri.split('/').pop() || '')
        .filter(Boolean)
    );
    await cleanUpUnusedDirectoriesOrFiles(assetsFolder, Array.from(validFilePaths));
  }

  // Clean up unused folders in the tools-assets folder
  const validFolder = getToolsAssetsFolderName(countryCode, languageCode);
  await cleanUpUnusedDirectoriesOrFiles(TOOLS_ASSETS_FOLDER, [validFolder]);

  // Save updated mapping if changes occurred
  if (hasChanges) {
    try {
      // Clean up old mapping files
      const files = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}`);
      await Promise.all(
        files
          .filter((file) => file.startsWith(TOOLS_ASSETS_MAPPING_FILE_NAME) && file.endsWith('.json'))
          .map((file) => FileSystem.deleteAsync(`${FileSystem.documentDirectory}${file}`))
      );

      // Save new mapping
      const mappingPath = getLocalToolsAssetsMappingFilePath(countryCode, languageCode);
      await FileSystem.writeAsStringAsync(mappingPath, JSON.stringify(updatedMapping, null, 2));
      console.log(`Mapping saved to: ${mappingPath}`);
    } catch (error) {
      console.error('Error saving local mapping:', error);
    }
  }

  if (!updatedMapping || Object.keys(updatedMapping).length === 0) {
    return null;
  }

  return updatedMapping;
};

export const fetchToolsAssets = async (
  countryCode: string,
  languageCode: string,
  onProgress?: (progress: DownloadProgress) => void
) => {
  console.log('🔨 fetchToolsAssets', countryCode, languageCode);
  // Try to load existing local mapping
  const localMapping = await fetchLocalToolsAssets(countryCode, languageCode);

  // Fetch remote mapping
  const remoteMapping = await fetchRemoteToolsAssets(countryCode, languageCode);

  if (!localMapping && !remoteMapping) {
    return null;
  }

  // Process remote mapping
  const updatedMapping = await processToolsAssets(remoteMapping, localMapping, countryCode, languageCode, onProgress);

  return updatedMapping;
};
