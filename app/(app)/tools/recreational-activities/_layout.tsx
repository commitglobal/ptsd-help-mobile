import { Stack } from 'expo-router';

const RecreationalActivitiesLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='alone' options={{ headerShown: false }} />
      <Stack.Screen name='city' options={{ headerShown: false }} />
      <Stack.Screen name='nature' options={{ headerShown: false }} />
    </Stack>
  );
};

export default RecreationalActivitiesLayout;
