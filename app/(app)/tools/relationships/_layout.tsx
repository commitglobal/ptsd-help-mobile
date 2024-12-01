import { Stack } from 'expo-router';
import { useEffect } from 'react';

const RelationshipsLayout = () => {
  useEffect(() => {
    console.log('👍 Relationship Layout mounted');

    return () => {
      console.log('👎 Relationship Layout unmounted');
    };
  }, []);

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='reconnect-with-partner/index' options={{ headerShown: false }} />
      <Stack.Screen name='positive-communication/index' options={{ headerShown: false }} />

      {/* <Stack.Screen name='iMessages/index' options={{ headerShown: false }} />
      <Stack.Screen name='iMessages/new-message' options={{ headerShown: false }} />
      <Stack.Screen name='iMessages/edit-message' options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default RelationshipsLayout;