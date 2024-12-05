import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name='(drawer)' options={{ headerShown: false }} />
      <Stack.Screen name='tools' options={{ headerShown: false }} />
      <Stack.Screen name='about' options={{ headerShown: false }} />
      <Stack.Screen name='settings' options={{ headerShown: false }} />
      <Stack.Screen name='profile' options={{ headerShown: false }} />
    </Stack>
  );
}
