import * as FileSystem from 'expo-file-system';

const LEARN_CONTENT_DIR = 'content/learn';
const LEARN_CONTENT_FILE = 'learn.json';

export const getLocalLearnContentDir = (countryCode: string, languageCode: string) => {
  return `${FileSystem.documentDirectory}${LEARN_CONTENT_DIR}/${countryCode}/${languageCode}`;
};

export const getLocalLearnContentFilePath = (countryCode: string, languageCode: string) => {
  return `${getLocalLearnContentDir(countryCode, languageCode)}/${LEARN_CONTENT_FILE}`;
};
