import React from 'react';
import { Stack } from 'expo-router';
import { RIDContextProvider } from '@/contexts/RIDContextProvider';

const RIDLayout = () => {
  return (
    <RIDContextProvider>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='relax' options={{ headerShown: false }} />
        <Stack.Screen name='identify' options={{ headerShown: false }} />
        <Stack.Screen name='identify-form' options={{ headerShown: false }} />
        <Stack.Screen name='decide' options={{ headerShown: false }} />
        <Stack.Screen name='summary' options={{ headerShown: false }} />
        <Stack.Screen name='ridId' options={{ headerShown: false }} />
      </Stack>
    </RIDContextProvider>
  );
};

export default RIDLayout;
