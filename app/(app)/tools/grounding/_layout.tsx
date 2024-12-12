import { Stack } from 'expo-router';

export default function GroundingLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
  );
}
