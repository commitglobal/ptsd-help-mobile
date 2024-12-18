import { Stack } from 'expo-router';

const SleepLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='awake-activities' options={{ headerShown: false }} />
      <Stack.Screen name='no-sleep-activities' options={{ headerShown: false }} />
      <Stack.Screen name='relaxing-activities' options={{ headerShown: false }} />
      <Stack.Screen name='wake-up-activities' options={{ headerShown: false }} />
      <Stack.Screen name='info' options={{ headerShown: false, presentation: 'modal' }} />
    </Stack>
  );
};

export default SleepLayout;
