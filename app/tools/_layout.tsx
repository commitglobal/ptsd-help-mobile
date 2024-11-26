import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

export default function ToolsLayout() {
  const { resetToolManagerContext } = useToolManagerContext();

  useEffect(() => {
    return () => {
      resetToolManagerContext();
    };
  }, []);

  return (
    <Stack>
      <Stack.Screen name='distress-meter/pre' options={{ headerShown: false }} />
      <Stack.Screen name='distress-meter/post' options={{ headerShown: false }} />

      <Stack.Screen name='relationships' options={{ headerShown: false }} />
      <Stack.Screen name='mindfulness' options={{ headerShown: false }} />

      <Stack.Screen name='ambient-sounds/index' options={{ headerShown: false }} />
      <Stack.Screen name='my-feelings' options={{ headerShown: false }} />
      <Stack.Screen name='worry-time' options={{ headerShown: false }} />
    </Stack>
  );
}
