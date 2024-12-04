import { Stack } from 'expo-router';

const SleepLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='sleep-habits/index' options={{ headerShown: false }} />
      <Stack.Screen name='sleep-help/index' options={{ headerShown: false }} />
      <Stack.Screen name='sleep-perspective/index' options={{ headerShown: false }} />
    </Stack>
  );
};

export default SleepLayout;
