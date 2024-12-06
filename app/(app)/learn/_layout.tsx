import { Stack } from 'expo-router';

export default function LearnLayout() {
  return (
    <Stack>
      <Stack.Screen name='category' options={{ headerShown: false }} />
      <Stack.Screen name='topic' options={{ headerShown: false }} />
    </Stack>
  );
}
