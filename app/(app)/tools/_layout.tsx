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

      <Stack.Screen name='ambient-sounds' options={{ headerShown: false }} />
      <Stack.Screen name='my-feelings' options={{ headerShown: false }} />
      <Stack.Screen name='sleep' options={{ headerShown: false }} />
      <Stack.Screen name='worry-time' options={{ headerShown: false }} />
      <Stack.Screen name='rid' options={{ headerShown: false }} />
      <Stack.Screen name='soothe-senses' options={{ headerShown: false }} />
      <Stack.Screen name='connect-with-others' options={{ headerShown: false }} />
      <Stack.Screen name='change-perspective' options={{ headerShown: false }} />
      <Stack.Screen name='grounding' options={{ headerShown: false }} />
      <Stack.Screen name='quotes' options={{ headerShown: false }} />
      <Stack.Screen name='recreational-activities' options={{ headerShown: false }} />
      <Stack.Screen name='my-strengths' options={{ headerShown: false }} />
      <Stack.Screen name='shift-thoughts' options={{ headerShown: false }} />
    </Stack>
  );
}
