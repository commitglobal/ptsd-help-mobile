import { Icon } from '@/components/Icon';
import React, { useMemo, useState } from 'react';
import { Screen } from '@/components/Screen';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { router, Stack } from 'expo-router';
import sleepActivitiesRepository, { SleepActivityType } from '@/db/repositories/sleep-activities.repository';
import StarList from '@/components/StarList';
import { useSleepActivitiesByType } from '@/services/sleep-activities.service';

export default function AwakeActivities() {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const { data: sleepActivity, refetch } = useSleepActivitiesByType(SleepActivityType.AWAKE);
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);

  const activities = useMemo(() => {
    const elements = t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.awakeActivities, {
      returnObjects: true,
    });
    return Object.values(elements).map((element) => ({
      id: element.id,
      label: element.text,
      favorite: false,
    }));
  }, []);

  const handleDatabaseUpdate = async (updatedItems: Set<string>) => {
    if (!sleepActivity) {
      await sleepActivitiesRepository.createSleepActivity({
        type: SleepActivityType.AWAKE,
        favorites: Array.from(updatedItems),
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        deletedAt: null,
        reminderTime: null,
        notificationId: null,
      });
      refetch();
    } else {
      await sleepActivitiesRepository.updateSleepActivity(SleepActivityType.AWAKE, {
        favorites: Array.from(updatedItems),
      });
    }
  };

  const handleOnUpdate = (updatedItems: string[]) => {
    setFavoriteItems(updatedItems);
  };

  const handleOnSave = async () => {
    await handleDatabaseUpdate(new Set(favoriteItems));
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Screen
        headerProps={{
          title: t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.label),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
          onLeftPress: () => router.back(),
        }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.save),
          onMainAction: handleOnSave,
        }}
        contentContainerStyle={{ backgroundColor: 'transparent' }}>
        <StarList
          type={SleepActivityType.AWAKE}
          activities={activities}
          description={t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.awakeActivitiesDescription)}
          update={handleOnUpdate}
        />
      </Screen>
    </>
  );
}
