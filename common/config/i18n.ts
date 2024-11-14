import i18n, { ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';

import roEN from '../../assets/locales/ro/EN/ro-EN.json';
import tools_roEN from '../../assets/locales/ro/EN/tools.json';

import roRO from '../../assets/locales/ro/RO/ro-RO.json';
import tools_roRO from '../../assets/locales/ro/RO/tools.json';

// TODO: do we need the systemLocale?

// import { SECURE_STORAGE_KEYS } from "../constants";
// import { getSecureStoreItem } from "../../helpers/SecureStoreWrapper";

// const systemLocale =
//   getSecureStoreItem(SECURE_STORAGE_KEYS.I18N_LANGUAGE) ||
//   Localization.getLocales()?.[0]?.languageCode ||
//   "en";

// handle RTL languages
// const language = Localization.getLocales().find((lang) => lang.languageCode === systemLocale);
// export const isRTL = language?.textDirection === "rtl";

i18n.use(initReactI18next).init<ResourceLanguage>({
  lng: 'en',
  fallbackLng: ['en', 'ro'],
  compatibilityJSON: 'v3',
  supportedLngs: ['en', 'ro'],
  resources: {
    en: {
      translation: roEN,
      tools: tools_roEN,
    },
    ro: {
      translation: roRO,
      tools: tools_roRO,
    },
  },
  defaultNS: 'translation',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
