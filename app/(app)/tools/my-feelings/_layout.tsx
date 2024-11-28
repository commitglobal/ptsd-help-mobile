import { FeelingsContextProvider } from '@/contexts/FeelingsContextProvider';
import { Stack } from 'expo-router';

export default function MyFeelingsLayout() {
  return (
    <FeelingsContextProvider>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='choose-main-feelings' options={{ headerShown: false }} />
        <Stack.Screen name='choose-secondary-feelings' options={{ headerShown: false }} />
        <Stack.Screen name='discomfort-meter' options={{ headerShown: false }} />
        <Stack.Screen name='feelings-summary' options={{ headerShown: false }} />
        <Stack.Screen name='delete-feeling' options={{ headerShown: false }} />
      </Stack>
    </FeelingsContextProvider>
  );
}
