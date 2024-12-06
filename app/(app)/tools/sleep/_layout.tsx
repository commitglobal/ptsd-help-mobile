import { Stack } from 'expo-router';

const SleepLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='sleep-habits' options={{ headerShown: false }} />
      <Stack.Screen name='sleep-help' options={{ headerShown: false }} />
      <Stack.Screen name='sleep-perspective' options={{ headerShown: false }} />
    </Stack>
  );
};

export default SleepLayout;
