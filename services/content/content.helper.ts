import { getS3CMSContentFolderLearnJSON, getS3CMSContentFolderSupportJSON } from '@/constants/cms';
import * as FileSystem from 'expo-file-system';
import { ContentFetcherConfig } from './content.fetcher';

const LEARN_CONTENT_DIR = 'content/learn';
const LEARN_CONTENT_FILE = 'learn.json';

export const getLocalRelativeLearnContentDir = (countryCode: string, languageCode: string) => {
  return `${LEARN_CONTENT_DIR}/${countryCode}/${languageCode}`;
};

export const getLocalLearnContentDir = (countryCode: string, languageCode: string) => {
  return `${FileSystem.documentDirectory}${getLocalRelativeLearnContentDir(countryCode, languageCode)}`;
};

export const getLocalLearnContentMappingFilePath = (countryCode: string, languageCode: string) => {
  return `${getLocalLearnContentDir(countryCode, languageCode)}/${LEARN_CONTENT_FILE}`;
};

export const getLearnContentConfig = (countryCode: string, languageCode: string): ContentFetcherConfig => {
  return {
    type: 'learn',
    remoteContentFolderUrl: getS3CMSContentFolderLearnJSON(countryCode, languageCode),
    localContentDir: getLocalLearnContentDir(countryCode, languageCode),
    localContentMappingFilePath: getLocalLearnContentMappingFilePath(countryCode, languageCode),
    localRelativeContentDir: getLocalRelativeLearnContentDir(countryCode, languageCode),
    countryCode,
    languageCode,
  };
};

// ====================== SUPPORT CONTENT ==============================

const SUPPORT_CONTENT_DIR = 'content/support';
const SUPPORT_CONTENT_FILE = 'support.json';

export const getLocalSupportContentDir = (countryCode: string, languageCode: string) => {
  return `${FileSystem.documentDirectory}${SUPPORT_CONTENT_DIR}/${countryCode}/${languageCode}`;
};

export const getLocalSupportContentMappingFilePath = (countryCode: string, languageCode: string) => {
  return `${getLocalSupportContentDir(countryCode, languageCode)}/${SUPPORT_CONTENT_FILE}`;
};

export const getSupportContentConfig = (countryCode: string, languageCode: string): ContentFetcherConfig => {
  return {
    type: 'support',
    remoteContentFolderUrl: getS3CMSContentFolderSupportJSON(countryCode, languageCode),
    localContentDir: getLocalSupportContentDir(countryCode, languageCode),
    localContentMappingFilePath: getLocalSupportContentMappingFilePath(countryCode, languageCode),
    localRelativeContentDir: getLocalRelativeLearnContentDir(countryCode, languageCode),
    countryCode,
    languageCode,
  };
};

export const getLocalContentFilePath = (relativeFilePath: string) => {
  return `${FileSystem.documentDirectory}/${relativeFilePath}`;
};
