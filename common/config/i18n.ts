import i18n, { ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next";
// import * as Localization from "expo-localization";
import en from "../../assets/locales/en/translations.json";

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
  lng: "en",
  fallbackLng: ["en"],
  compatibilityJSON: "v3",
  supportedLngs: ["en"],
  resources: {
    en,
  },
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
