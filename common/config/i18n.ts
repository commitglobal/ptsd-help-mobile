import i18n, { ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';

import roEN from '../../assets/locales/ro/EN/ro-EN.json';
import toolsRoEn from '../../assets/locales/ro/EN/tools.json';

import roRO from '../../assets/locales/ro/RO/ro-RO.json';
import toolsRoRo from '../../assets/locales/ro/RO/tools.json';
import { STORE_KEYS } from '@/constants/store-keys';

import { MKKV } from '@/helpers/mmkv';

import * as Localization from 'expo-localization';

const systemLocale = MKKV().getString(STORE_KEYS.LANGUAGE) || Localization.getLocales()?.[0]?.languageCode || 'en';

// handle RTL languages
const language = Localization.getLocales().find((lang) => lang.languageCode === systemLocale);
export const isRTL = language?.textDirection === 'rtl';

i18n.use(initReactI18next).init<ResourceLanguage>({
  lng: systemLocale || 'en',
  fallbackLng: ['en', 'ro'],
  compatibilityJSON: 'v3',
  supportedLngs: ['en', 'ro'],
  resources: {
    en: {
      translation: roEN,
      tools: toolsRoEn,
    },
    ro: {
      translation: roRO,
      tools: toolsRoRo,
    },
  },
  defaultNS: 'translation',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
