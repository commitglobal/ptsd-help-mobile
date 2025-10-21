import { DrawerItem } from '@/components/DrawerItem';
import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';
import { useNotifications } from '@/hooks/useNotifications';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollViewProps } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, XStack } from 'tamagui';

type DrawerContentProps = ScrollViewProps & {
  children?: React.ReactNode;
  backgroundColor: string;
};

export const DrawerContent = (props: DrawerContentProps & any) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { navigation } = props;
  const { t } = useTranslation();

  useNotifications();

  return (
    <DrawerContentScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 32 }}
      bounces={false}
      stickyHeaderIndices={[0]}
      {...props}>
      <XStack padding={16} justifyContent='flex-end'>
        <Icon icon='x' width={24} height={24} color={theme.blue1?.val} onPress={() => navigation.closeDrawer()} />
      </XStack>

      <DrawerItem label={t('drawer.my-profile')} icon='user' onPress={() => router.push('/profile')} />
      <DrawerItem label={t('drawer.about')} icon='info' onPress={() => router.push('/about')} />
      <DrawerItem label={t('drawer.privacy-policy')} icon='lockClosed' onPress={() => router.push('/privacy-policy')} />
      <DrawerItem label={t('drawer.settings')} icon='settings' onPress={() => router.push('/settings')} />
      <Typography
        color='white'
        marginTop='auto'
        marginLeft='$lg'>{`v${Constants.expoConfig?.version}${Constants.expoConfig?.extra?.updateVersion ? ` (${Constants.expoConfig?.extra?.updateVersion})` : ''} `}</Typography>
    </DrawerContentScrollView>
  );
};

export default function MainLayout() {
  const theme = useTheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} backgroundColor={theme.blue9?.val} />}
        screenOptions={{
          drawerType: 'front',
          headerShown: false,
        }}>
        <Drawer.Screen name='(tabs)' />
      </Drawer>
    </GestureHandlerRootView>
  );
}
