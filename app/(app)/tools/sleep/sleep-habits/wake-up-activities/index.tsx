import { Icon } from '@/components/Icon';
import React, { useMemo } from 'react';
import { Screen } from '@/components/Screen';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { router, Stack } from 'expo-router';
import { SleepActivityType } from '@/db/repositories/sleep-activities.repository';
import StarList from '@/components/StarList';

export default function WakeUpActivities() {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();

  const activities = useMemo(() => {
    const elements = t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.wakeUpActivities, {
      returnObjects: true,
    });
    return Object.values(elements).map((element) => ({
      id: element.id,
      label: element.text,
      favorite: false,
    }));
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Screen
        headerProps={{
          title: t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.label),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
          onLeftPress: () => router.back(),
        }}
        contentContainerStyle={{ backgroundColor: 'transparent' }}>
        <StarList
          type={SleepActivityType.WAKE_UP}
          activities={activities}
          description={t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.wakeUpActivitiesDescription)}
        />
      </Screen>
    </>
  );
}
