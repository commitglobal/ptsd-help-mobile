import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';


import ToolManagerContextProvider from '@/contexts/ToolManagerContextProvider';
import { PortalProvider, TamaguiProvider } from 'tamagui';
import appConfig from '@/tamagui.config';

import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import db from '@/db/db';
import migrations from '@/drizzle/migrations';
import { Typography } from '@/components/Typography';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import '../common/config/i18n';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 0,
      staleTime: 0,
    },
  },
});

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  // const hasOnboardingDone = KeyValueStorage().getBoolean(STORE_KEYS.ONBOARDING_DONE) || false;

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    Roboto: require('../assets/fonts/Roboto-Medium.ttf'),
    RobotoBold: require('../assets/fonts/Roboto-Bold.ttf'),
    DMSans: require('../assets/fonts/DMSans-Regular.ttf'),
    DMSansBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMSansRegular: require('../assets/fonts/DMSans-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  /**
   * Handle migrations
   */
  // TODO: show splash screen maybe here!!!
  if (!success) {
    return <Typography>Migrations are running...</Typography>;
  }

  // TODO: what to do here?
  if (error) {
    return <Typography>Error applying migrations: {error.message}</Typography>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={appConfig}>
        <PortalProvider>
          <ToolManagerContextProvider>
            <Stack>
              <Stack.Screen redirect={false} name='onboarding' options={{ headerShown: false }} />
              <Stack.Screen name='(drawer)' options={{ headerShown: false }} />
              <Stack.Screen name='tools' options={{ headerShown: false }} />
              <Stack.Screen name='+not-found' />
            </Stack>
          </ToolManagerContextProvider>
        </PortalProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
