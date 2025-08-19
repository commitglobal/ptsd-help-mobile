/* eslint-disable camelcase */
import i18n, { ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../../assets/locales/en/translations.json';
import toolsEn from '../../assets/locales/en/tools.json';

import ro from '../../assets/locales/ro/translations.json';
import toolsRo from '../../assets/locales/ro/tools.json';

import hy from '../../assets/locales/hy/translations.json';
import toolsHy from '../../assets/locales/hy/tools.json';

import { STORE_KEYS } from '@/constants/store-keys';

import { KVStore } from '@/helpers/mmkv';

import * as Localization from 'expo-localization';

const systemLocale = KVStore().getString(STORE_KEYS.LANGUAGE) || Localization.getLocales()?.[0]?.languageCode || 'en';

// handle RTL languages
const language = Localization.getLocales().find((lang) => lang.languageCode === systemLocale); // TODO: We need to use the user's preferred language FIRST
export const isRTL = language?.textDirection === 'rtl';

i18n.use(initReactI18next).init<ResourceLanguage>({
  lng: systemLocale || 'en',
  fallbackLng: ['en', 'ro', 'hy'],
  compatibilityJSON: 'v3',
  supportedLngs: ['en', 'ro', 'hy'],
  resources: {
    en: {
      translation: en,
      tools: toolsEn,
    },
    ro: {
      translation: ro,
      tools: toolsRo,
    },
    hy: {
      translation: hy,
      tools: toolsHy,
    },
  },
  defaultNS: 'translation',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
