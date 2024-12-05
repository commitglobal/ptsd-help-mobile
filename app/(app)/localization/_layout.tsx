import { Stack } from 'expo-router';
import React from 'react';

export default function LocalizationLayout() {
  return (
    <Stack>
      <Stack.Screen name='change-country' options={{ headerShown: false }} />
      <Stack.Screen name='change-language' options={{ headerShown: false }} />
    </Stack>
  );
}
