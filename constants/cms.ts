export type CmsUrls = {
  foggles: (countryCode: string) => string;
  toolsAssetsMapping: (countryCode: string, languageCode: string) => string;
  learn: (countryCode: string, languageCode: string) => string;
  support: (countryCode: string, languageCode: string) => string;
};

/** The app reads its content from the Strapi /api/app/* endpoints at `cmsUrl`. */
export const buildCmsUrls = (cmsUrl?: string): CmsUrls => {
  if (!cmsUrl) {
    throw new Error('EXPO_PUBLIC_CMS_URL is not set: the app needs the Strapi CMS url to load its content.');
  }

  const base = cmsUrl.replace(/\/$/, '');
  return {
    foggles: (country) => `${base}/api/app/config/foggles/${country}`,
    toolsAssetsMapping: (country, language) => `${base}/api/app/config/tools-assets/${country}/${language}`,
    learn: (country, language) => `${base}/api/app/content/${country}/${language}/learn`,
    support: (country, language) => `${base}/api/app/content/${country}/${language}/support`,
  };
};

export const cmsUrls = buildCmsUrls(process.env.EXPO_PUBLIC_CMS_URL);
