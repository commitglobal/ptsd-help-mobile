import { Stack } from 'expo-router';
import React from 'react';

const MyStrengthsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='add-strength' options={{ headerShown: false }} />
    </Stack>
  );
};

export default MyStrengthsLayout;
