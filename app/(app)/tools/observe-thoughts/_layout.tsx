import { Stack } from 'expo-router';

const BodyScanLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='clouds-player' options={{ headerShown: false }} />
      <Stack.Screen name='river-player' options={{ headerShown: false }} />
      <Stack.Screen name='clouds' options={{ headerShown: false }} />
      <Stack.Screen name='river' options={{ headerShown: false }} />
    </Stack>
  );
};

export default BodyScanLayout;
