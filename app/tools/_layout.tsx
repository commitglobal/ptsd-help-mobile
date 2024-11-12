import ToolManagerContextProvider, {
  useToolManagerContext,
} from '@/contexts/ToolManagerContextProvider';
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
      <Stack.Screen name="distress-meter/pre" options={{ headerShown: false }} />
      <Stack.Screen name="distress-meter/post" options={{ headerShown: false }} />

      <Stack.Screen name="relationships" options={{ headerShown: false }} />
    </Stack>
  );
}
