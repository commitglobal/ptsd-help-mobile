import * as FileSystem from 'expo-file-system';
import { KVStore } from '@/helpers/mmkv';

import { STORE_KEYS } from '@/constants/store-keys';
import { useQuery } from '@tanstack/react-query';

// Removes cached learn/support content and foggles so they are downloaded again from the CMS.
// Set after a user is moved to a different country (see common/config/i18n.ts).
const resetContentCache = async () => {
  const dir = FileSystem.documentDirectory;
  try {
    await FileSystem.deleteAsync(`${dir}content`, { idempotent: true });
    const files = await FileSystem.readDirectoryAsync(dir!);
    await Promise.all(
      files
        .filter((file) => file.startsWith('foggles_') && file.endsWith('.json'))
        .map((file) => FileSystem.deleteAsync(`${dir}${file}`, { idempotent: true }))
    );
    KVStore().delete(STORE_KEYS.RESET_CONTENT_CACHE);
  } catch (error) {
    // Flag stays set, so the reset is retried on the next launch.
    console.error('Error resetting content cache:', error);
  }
};

export default function useCountryLanguage() {
  return useQuery({
    queryKey: ['country-language'],
    // Content queries wait for this data, so the cache is cleared before anything is fetched.
    queryFn: async () => {
      if (KVStore().getBoolean(STORE_KEYS.RESET_CONTENT_CACHE)) {
        await resetContentCache();
      }
      const countryCode = KVStore().getString(STORE_KEYS.COUNTRY);
      const languageCode = KVStore().getString(STORE_KEYS.LANGUAGE);
      return { countryCode, languageCode };
    },
  });
}
