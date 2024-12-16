import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { ScrollViewProps } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useTheme, XStack } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { DrawerItem } from '@/components/DrawerItem';

type DrawerContentProps = ScrollViewProps & {
  children?: React.ReactNode;
  backgroundColor: string;
};

export const DrawerContent = (props: DrawerContentProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <DrawerContentScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 32 }}
      bounces={false}
      stickyHeaderIndices={[0]}
      {...props}>
      <XStack padding={16} justifyContent='flex-end'>
        <Icon
          icon='x'
          width={24}
          height={24}
          color={theme.blue1?.val}
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
        />
      </XStack>

      <DrawerItem key={0} label={t('drawer.my-profile')} icon='user' onPress={() => router.push('/profile')} />
      <DrawerItem key={1} label={t('drawer.about')} icon='info' onPress={() => router.push('/about')} />
      <DrawerItem
        key={2}
        label={t('drawer.privacy-policy')}
        icon='lockClosed'
        onPress={() => router.push('/privacy-policy')}
      />
      <DrawerItem key={3} label={t('drawer.settings')} icon='settings' onPress={() => router.push('/settings')} />
    </DrawerContentScrollView>
  );
};

export default function MainLayout() {
  const theme = useTheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={() => <DrawerContent backgroundColor={theme.blue9?.val} />}
        screenOptions={{
          drawerType: 'front',
          headerShown: false,
        }}>
        <Drawer.Screen name='(tabs)' />
      </Drawer>
    </GestureHandlerRootView>
  );
}
