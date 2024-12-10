import { Stack } from 'expo-router';

export default function ConnectWithOthersLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
  );
}
