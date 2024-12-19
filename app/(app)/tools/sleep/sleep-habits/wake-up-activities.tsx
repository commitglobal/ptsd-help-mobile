import { Icon } from '@/components/Icon';
import React, { useEffect, useState } from 'react';
import { Screen } from '@/components/Screen';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import sleepActivitiesRepository, { SleepActivityType } from '@/db/repositories/sleep-activities.repository';
import StarList, { StarListItem } from '@/components/StarList';
import { useSleepActivitiesByType } from '@/services/sleep-activities.service';
import { Typography } from '@/components/Typography';

export default function WakeUpActivities() {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const { data: sleepActivity, refetch } = useSleepActivitiesByType(SleepActivityType.WAKE_UP);
  const [favoriteItems, setFavoriteItems] = useState<StarListItem[]>([]);

  useEffect(() => {
    const elements = t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.wakeUpActivities, {
      returnObjects: true,
    });
    const itemsToReturn = Object.values(elements)
      .map((element) => ({
        id: element.id,
        label: element.text,
        favorite: sleepActivity?.favorites?.includes(element.id) || false,
      }))
      .sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));

    setFavoriteItems(itemsToReturn);
  }, [sleepActivity]);

  const handleDatabaseUpdate = async (updatedItems: Set<string>) => {
    if (!sleepActivity) {
      await sleepActivitiesRepository.createSleepActivity({
        type: SleepActivityType.WAKE_UP,
        favorites: Array.from(updatedItems),
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        deletedAt: null,
        reminderTime: null,
        notificationId: null,
      });
      refetch();
    } else {
      await sleepActivitiesRepository.updateSleepActivity(SleepActivityType.WAKE_UP, {
        favorites: Array.from(updatedItems),
      });
    }
  };

  const handleOnUpdate = (updatedItem: StarListItem) => {
    setFavoriteItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === updatedItem.id) {
          item.favorite = updatedItem.favorite;
        }
        return item;
      });
    });
  };

  const handleOnSave = async () => {
    await handleDatabaseUpdate(new Set(favoriteItems.filter((item) => item.favorite).map((item) => item.id)));
    router.back();
  };

  return (
    <>
      <Screen
        headerProps={{
          title: t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.label),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
          onLeftPress: () => router.back(),
          iconRight: <Icon icon='info' width={24} height={24} color='$gray12' />,
          onRightPress: () => router.push('/tools/sleep/sleep-habits/info?tool=wake-up-activities'),
        }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.save),
          onMainAction: handleOnSave,
        }}
        contentContainerStyle={{ backgroundColor: 'transparent' }}>
        <StarList
          listHeaderComponent={
            <>
              <Typography paddingBottom={8} preset='default'>
                {t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.wakeUpActivitiesDescription)}
              </Typography>
            </>
          }
          items={favoriteItems}
          update={handleOnUpdate}
        />
      </Screen>
    </>
  );
}
