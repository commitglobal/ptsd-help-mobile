import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
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
import { AssetsManagerContextProvider } from '@/contexts/AssetsManagerContextProvider';

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
    <TamaguiProvider config={appConfig}>
      <QueryClientProvider client={queryClient}>
        <PortalProvider>
          <AssetsManagerContextProvider>
            <ToolManagerContextProvider>
              <Slot />
            </ToolManagerContextProvider>
          </AssetsManagerContextProvider>
        </PortalProvider>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
