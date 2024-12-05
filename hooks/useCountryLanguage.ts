import { KVStore } from '@/helpers/mmkv';

import { STORE_KEYS } from '@/constants/store-keys';
import { useQuery } from '@tanstack/react-query';

export default function useCountryLanguage() {
  return useQuery({
    queryKey: ['country-language'],
    queryFn: () => {
      const countryCode = KVStore().getString(STORE_KEYS.COUNTRY);
      const languageCode = KVStore().getString(STORE_KEYS.LANGUAGE);
      return { countryCode, languageCode };
    },
  });
}
