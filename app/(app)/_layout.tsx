import { AssetsManagerContextProvider } from '@/contexts/AssetsManagerContextProvider';
import NotificationsContextProvider from '@/contexts/NotificationsContextProvider';
import ToolManagerContextProvider from '@/contexts/ToolManagerContextProvider';
import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <NotificationsContextProvider>
      <AssetsManagerContextProvider>
        <ToolManagerContextProvider>
          <Stack>
            <Stack.Screen name='(drawer)' options={{ headerShown: false }} />
            <Stack.Screen name='tools' options={{ headerShown: false }} />
            <Stack.Screen name='content' options={{ headerShown: false }} />

            <Stack.Screen name='about' options={{ headerShown: false }} />
            <Stack.Screen name='settings' options={{ headerShown: false }} />
            <Stack.Screen name='privacy-policy' options={{ headerShown: false }} />
            <Stack.Screen name='profile' options={{ headerShown: false }} />
            <Stack.Screen name='localization' options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name='webview' options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name='info' options={{ headerShown: false, presentation: 'modal' }} />
          </Stack>
        </ToolManagerContextProvider>
      </AssetsManagerContextProvider>
    </NotificationsContextProvider>
  );
}
