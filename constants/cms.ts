export const S3_CMS_BASE_URL = 'https://ptsdhelp-cms-test.s3.eu-central-1.amazonaws.com';
export const S3_CMS_CONFIG_FOLDER = `${S3_CMS_BASE_URL}/config/`;

export const getS3CMSContentFolder = (countryCode: string, languageCode: string) =>
  `${S3_CMS_BASE_URL}/content/resources/${countryCode}/${languageCode}/learn.json`;
