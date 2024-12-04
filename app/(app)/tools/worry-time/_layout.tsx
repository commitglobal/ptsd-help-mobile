import React from 'react';
import { Stack } from 'expo-router';

export default function WorryTimeLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='help' options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  );
}
