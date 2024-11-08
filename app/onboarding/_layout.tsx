import { Stack } from "expo-router";
import React from "react";

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="licence-agreement" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding-slider" options={{ headerShown: false }} />
      <Stack.Screen name="choose-country" options={{ headerShown: false }} />
      <Stack.Screen name="choose-language" options={{ headerShown: false }} />
    </Stack>
  );
}
