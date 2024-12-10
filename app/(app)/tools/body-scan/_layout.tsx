import { Stack } from 'expo-router';

const BodyScanLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='julia' options={{ headerShown: false }} />
      <Stack.Screen name='robyn' options={{ headerShown: false }} />
    </Stack>
  );
};

export default BodyScanLayout;
