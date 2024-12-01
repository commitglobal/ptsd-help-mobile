import { Icon } from '@/components/Icon';
import React from 'react';
import { Screen } from '@/components/Screen';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';
import { ListCard } from '@/components/ListCard';
import { YStack } from 'tamagui';

export default function Track() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const items = [
    { label: t('track.evaluate'), id: 'evaluate', icon: 'clipboard' },
    { label: t('track.history'), id: 'history', icon: 'clock' },
    { label: t('track.schedule'), id: 'schedule', icon: 'calendar' },
  ];

  return (
    <Screen
      headerProps={{
        title: 'Track',
        iconLeft: <Icon icon='menuAlt2' width={24} height={24} color='$gray12' />,
        onLeftPress: () => navigation.dispatch(DrawerActions.openDrawer),
        iconRight: <Icon icon='heart' width={24} height={24} color='$gray12' />,
        onRightPress: () => {
          console.log('right pressed');
        },
      }}
      contentContainerStyle={{ backgroundColor: 'transparent' }}>
      <FlashList
        bounces={false}
        data={items}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ListCard key={item.label} item={item} />}
        ItemSeparatorComponent={() => <YStack height={8} />}
        estimatedItemSize={80}
      />
    </Screen>
  );
}