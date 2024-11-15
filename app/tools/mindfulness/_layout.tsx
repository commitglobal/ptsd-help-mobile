import { Stack } from 'expo-router';

const MindfulnessLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='conscious-breathing/index' options={{ headerShown: false }} />
      <Stack.Screen name='mindful-walking/index' options={{ headerShown: false }} />
      <Stack.Screen name='emotional-discomfort/index' options={{ headerShown: false }} />
      <Stack.Screen name='sense-awareness/index' options={{ headerShown: false }} />
      <Stack.Screen name='loving-kindness/index' options={{ headerShown: false }} />
    </Stack>
  );
};

export default MindfulnessLayout;
