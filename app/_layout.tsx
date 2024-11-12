import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../common/config/i18n";
import { PortalProvider, TamaguiProvider } from "tamagui";
import appConfig from "@/tamagui.config";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    Roboto: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
    DMSans: require("../assets/fonts/DMSans-Regular.ttf"),
    DMSansBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMSansRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={appConfig}>
      <PortalProvider>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </PortalProvider>
    </TamaguiProvider>
  );
}
