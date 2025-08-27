import { Country } from './countries';

export const CountryLanguageMap: Record<Country, string[]> = {
  [Country.Ukraine]: ['uk'],
  [Country.Romania]: ['ro', 'uk'],
  [Country.Armenia]: ['hy'],
} as const;
