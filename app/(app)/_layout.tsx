import i18n from '@/common/config/i18n';
import { Country } from '@/constants/countries';
import { STORE_KEYS } from '@/constants/store-keys';
import { toolsLocalesMap } from '@/constants/tools';
import { AssetsManagerContextProvider } from '@/contexts/AssetsManagerContextProvider';
import ToolManagerContextProvider from '@/contexts/ToolManagerContextProvider';
import { KVStore } from '@/helpers/mmkv';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

export default function AppLayout() {
  useEffect(() => {
    const country = KVStore().getString(STORE_KEYS.COUNTRY);
    const selectedLanguage = KVStore().getString(STORE_KEYS.LANGUAGE);

    if (country && selectedLanguage) {
      const tools = toolsLocalesMap[country.toUpperCase() as Country][selectedLanguage];
      // ✅ Merge properly instead of overwriting
      i18n.addResourceBundle(selectedLanguage, 'tools', tools, true, true);
    }
  }, []);

  return (
    <AssetsManagerContextProvider>
      <ToolManagerContextProvider>
        <Stack>
          <Stack.Screen name='(drawer)' options={{ headerShown: false }} />
          <Stack.Screen name='tools' options={{ headerShown: false }} />
          <Stack.Screen name='content' options={{ headerShown: false }} />

          <Stack.Screen name='about' options={{ headerShown: false }} />
          <Stack.Screen name='settings' options={{ headerShown: false }} />
          <Stack.Screen name='contacts' options={{ headerShown: false }} />
          <Stack.Screen name='privacy-policy' options={{ headerShown: false }} />
          <Stack.Screen name='profile' options={{ headerShown: false }} />
          <Stack.Screen name='localization' options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name='webview' options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name='info' options={{ headerShown: false, presentation: 'modal' }} />
        </Stack>
      </ToolManagerContextProvider>
    </AssetsManagerContextProvider>
  );
}
