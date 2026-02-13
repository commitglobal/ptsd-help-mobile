import { Country } from './countries';

export const toolsLocalesMap: Record<Country, Record<string, any>> = {
  [Country.Romania]: {
    ro: require('../assets/tools/RO/ro/tools.json'),
    uk: require('../assets/tools/RO/uk/tools.json'),
    en: require('../assets/tools/RO/en/tools.json'),
  },
  // [Country.Ukraine]: { ua: require('../assets/tools/UA/uk/tools.json') },
  [Country.Armenia]: { hy: require('../assets/tools/AM/hy/tools.json') },
} as const;
