import { Icon } from '@/components/Icon';
import React, { useMemo, useState } from 'react';
import { Screen } from '@/components/Screen';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { router, Stack } from 'expo-router';
import sleepActivitiesRepository, { SleepActivityType } from '@/db/repositories/sleep-activities.repository';
import StarList from '@/components/StarList';
import { useSleepActivitiesByType } from '@/services/sleep-activities.service';
import * as Notifications from 'expo-notifications';

export default function RelaxingActivities() {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const { data: sleepActivity, refetch } = useSleepActivitiesByType(SleepActivityType.RELAXING);
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);
  const [isReminderChecked, setIsReminderChecked] = useState(false);
  const [time, setTime] = useState<Date | null>(null);

  const activities = useMemo(() => {
    const elements = t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.relaxingActivities, {
      returnObjects: true,
    });
    return Object.values(elements).map((element) => ({
      id: element.id,
      label: element.text,
      favorite: false,
    }));
  }, []);

  const handleDatabaseUpdate = async (updatedItems: Set<string>) => {
    const reminderTimeDate = time ? new Date(time) : new Date();
    const notificationData: Notifications.NotificationRequestInput = {
      content: {
        title: t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.relaxingActivitiesReminderTitle),
        body: t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.relaxingActivitiesReminderBody),
        data: {
          url: '/tools/sleep/sleep-habits/relaxing-activities', // where to redirect to
        },
      },
      trigger: {
        hour: reminderTimeDate.getHours(),
        minute: reminderTimeDate.getMinutes(),
        repeats: true,
      },
    };

    if (!sleepActivity) {
      let notificationId: string | null = null;

      // if the reminder is checked -> schedule the notification
      if (isReminderChecked) {
        notificationId = await Notifications.scheduleNotificationAsync(notificationData);
      }

      await sleepActivitiesRepository.createSleepActivity({
        type: SleepActivityType.RELAXING,
        favorites: Array.from(updatedItems),
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        deletedAt: null,
        reminderTime: time,
        notificationId,
      });
      refetch();
    } else {
      if (sleepActivity.notificationId) {
        await Notifications.cancelScheduledNotificationAsync(sleepActivity.notificationId);
      }

      let notificationId: string | null = null;

      // if the reminder is checked -> schedule the new notification
      if (isReminderChecked) {
        notificationId = await Notifications.scheduleNotificationAsync(notificationData);
      }

      await sleepActivitiesRepository.updateSleepActivity(SleepActivityType.RELAXING, {
        favorites: Array.from(updatedItems),
        reminderTime: time,
        notificationId,
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

  const handleOnReminderChange = (value: boolean) => {
    if (!value) {
      setTime(null);
    }
    setIsReminderChecked(value);
  };

  const handleOnTimeChange = (time: Date) => {
    setTime(time);
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
          type={SleepActivityType.RELAXING}
          activities={activities}
          description={t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.relaxingActivitiesDescription)}
          hasReminder={true}
          reminderText={t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.relaxingActivitiesReminderTitle)}
          update={handleOnUpdate}
          onReminderChange={handleOnReminderChange}
          onTimeChange={handleOnTimeChange}
        />
      </Screen>
    </>
  );
}
