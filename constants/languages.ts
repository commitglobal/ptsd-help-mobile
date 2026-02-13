import { Country } from './countries';

export const CountryLanguageMap: Record<Country, string[]> = {
  [Country.Armenia]: ['hy'],
  [Country.Romania]: ['ro', 'en'],
} as const;
