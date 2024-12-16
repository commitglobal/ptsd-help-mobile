import { Stack } from 'expo-router';

const BodyScanLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='beach' options={{ headerShown: false }} />
      <Stack.Screen name='beach-player' options={{ headerShown: false }} />
      <Stack.Screen name='forest' options={{ headerShown: false }} />
      <Stack.Screen name='forest-player' options={{ headerShown: false }} />
      <Stack.Screen name='country-road' options={{ headerShown: false }} />
      <Stack.Screen name='country-road-player' options={{ headerShown: false }} />
    </Stack>
  );
};

export default BodyScanLayout;
