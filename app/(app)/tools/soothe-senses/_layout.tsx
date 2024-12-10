import { Stack } from 'expo-router';

export default function SootheSensesLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
  );
}
