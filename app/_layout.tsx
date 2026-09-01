import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { PortalProvider, TamaguiProvider } from 'tamagui';
import appConfig from '@/tamagui.config';

import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import db from '@/db/db';
import migrations from '@/drizzle/migrations';
import { Typography } from '@/components/Typography';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LogBox } from 'react-native';
import * as Notifications from 'expo-notifications';

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

// https://github.com/meliorence/react-native-render-html/issues/661#issuecomment-2453476566
LogBox.ignoreLogs([/Support for defaultProps will be removed/]);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
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
   * Migration status messages and the app tree all render inside TamaguiProvider
   * so themed components (Typography -> SizableText) always have a theme.
   */
  const renderContent = () => {
    // Check error first: on a failed migration useMigrations keeps success=false
    // AND sets error, so an error-first check is required or it's never shown.
    if (error) {
      console.error('[migrations] failed to apply', error);
      return <Typography>Error applying migrations: {error.message}</Typography>;
    }

    // TODO: show splash screen maybe here!!!
    if (!success) {
      return <Typography>Migrations are running...</Typography>;
    }

    return (
      <QueryClientProvider client={queryClient}>
        <PortalProvider>
          <Slot />
        </PortalProvider>
      </QueryClientProvider>
    );
  };

  return (
    <TamaguiProvider config={appConfig}>{renderContent()}</TamaguiProvider>
  );
}
