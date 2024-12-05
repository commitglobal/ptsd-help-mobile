import { Icon } from '@/components/Icon';
import React, { useMemo } from 'react';
import { Screen } from '@/components/Screen';
import { FlashList } from '@shopify/flash-list';
import { ListCard } from '@/components/ListCard';
import { YStack } from 'tamagui';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/components/Typography';
import { Href, router } from 'expo-router';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';

export default function SleepHabits() {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const { finishTool } = useToolManagerContext();

  const items = useMemo(
    () => [
      {
        label: t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.list.relaxingActivities),
        id: 'relaxing-activities',
        icon: 'tv',
        rightIcon: 'chevronRight',
      },
      {
        label: t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.list.awakeActivities),
        id: 'awake-activities',
        icon: 'tasks',
        rightIcon: 'chevronRight',
      },
      {
        label: t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.list.noSleepActivities),
        id: 'no-sleep-activities',
        icon: 'book',
        rightIcon: 'chevronRight',
      },
      {
        label: t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.list.wakeUpActivities),
        id: 'wake-up-activities',
        icon: 'clock',
        rightIcon: 'chevronRight',
      },
    ],
    [t, toolsTranslationKeys]
  );

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.label),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
        onLeftPress: () => router.back(),
      }}
      footerProps={{
        onMainAction: () => finishTool(),
      }}
      contentContainerStyle={{ backgroundColor: 'transparent' }}>
      <Typography paddingHorizontal={16} paddingTop={16} preset='default'>
        {t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.description)}
      </Typography>
      <FlashList
        bounces={false}
        data={items}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListCard
            key={item.label}
            item={item}
            onPress={() => {
              router.push(`/tools/sleep/sleep-habits/${item.id}` as Href);
            }}
          />
        )}
        ItemSeparatorComponent={() => <YStack height={8} />}
        estimatedItemSize={80}
      />
    </Screen>
  );
}
