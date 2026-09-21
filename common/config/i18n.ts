/* eslint-disable camelcase */
import i18n, { ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../../assets/locales/en/translations.json';
import ro from '../../assets/locales/ro/translations.json';
import hy from '../../assets/locales/hy/translations.json';
import uk from '../../assets/locales/uk/translations.json';

import { STORE_KEYS } from '@/constants/store-keys';
import { AppCountries, Country } from '@/constants/countries';
import { CountryLanguageMap } from '@/constants/languages';

import { KVStore } from '@/helpers/mmkv';

import * as Localization from 'expo-localization';

// Users who previously picked a country that is no longer selectable (e.g. Romania) are moved to
// the default country and its language, before the language is read below.
const storedCountry = KVStore().getString(STORE_KEYS.COUNTRY);
if (storedCountry && !(AppCountries as readonly string[]).includes(storedCountry.toUpperCase())) {
  KVStore().set(STORE_KEYS.COUNTRY, AppCountries[0]);
  KVStore().set(STORE_KEYS.LANGUAGE, CountryLanguageMap[AppCountries[0] as Country][0]);
  // Cached content is cleared (async) by useCountryLanguage so it is re-downloaded for the new country.
  KVStore().set(STORE_KEYS.RESET_CONTENT_CACHE, true);
}

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
