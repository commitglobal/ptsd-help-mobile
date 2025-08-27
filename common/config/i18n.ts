/* eslint-disable camelcase */
import i18n, { ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../../assets/locales/en/translations.json';
import ro from '../../assets/locales/ro/translations.json';
import hy from '../../assets/locales/hy/translations.json';
import uk from '../../assets/locales/uk/translations.json';

import { STORE_KEYS } from '@/constants/store-keys';

import { KVStore } from '@/helpers/mmkv';

import * as Localization from 'expo-localization';

const systemLocale = KVStore().getString(STORE_KEYS.LANGUAGE) || Localization.getLocales()?.[0]?.languageCode || 'en';

// handle RTL languages
const language = Localization.getLocales().find((lang) => lang.languageCode === systemLocale); // TODO: We need to use the user's preferred language FIRST
export const isRTL = language?.textDirection === 'rtl';

i18n.use(initReactI18next).init<ResourceLanguage>({
  lng: systemLocale || 'en',
  fallbackLng: ['en', 'ro', 'hy', 'uk'],
  compatibilityJSON: 'v3',
  supportedLngs: ['en', 'ro', 'hy', 'uk'],
  resources: {
    en: {
      translation: en,
    },
    ro: {
      translation: ro,
    },
    hy: {
      translation: hy,
    },
    uk: {
      translation: uk,
    },
  },
  defaultNS: 'translation',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
