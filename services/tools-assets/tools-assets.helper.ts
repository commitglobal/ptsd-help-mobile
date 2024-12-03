import * as FileSystem from 'expo-file-system';
import { S3_CMS_CONFIG_FOLDER } from '@/constants/cms';

export const TOOLS_ASSETS_FOLDER = FileSystem.documentDirectory + 'tools-assets';

export const TOOLS_ASSETS_MAPPING_FILE_NAME = 'ToolsAssetsMapping';

export const getToolsAssetsFolderName = (countryCode: string, languageCode: string) => `${countryCode}-${languageCode}`;

export const getRemoteToolsAssetsMappingFilePath = (countryCode: string, languageCode: string) =>
  `${S3_CMS_CONFIG_FOLDER}CMSToolsAssetsMapping_${countryCode}_${languageCode}.json`;

export const getLocalToolsAssetsMappingFilePath = (countryCode: string, languageCode: string) =>
  `${FileSystem.documentDirectory}${TOOLS_ASSETS_MAPPING_FILE_NAME}_${countryCode}_${languageCode}.json`;

export const getLocalToolsAssetsFolderPath = (countryCode: string, languageCode: string) =>
  `${TOOLS_ASSETS_FOLDER}/${getToolsAssetsFolderName(countryCode, languageCode)}`;
