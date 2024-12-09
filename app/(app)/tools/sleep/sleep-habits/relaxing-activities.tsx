import { Icon } from '@/components/Icon';
import React, { useEffect, useState } from 'react';
import { Screen } from '@/components/Screen';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import sleepActivitiesRepository, { SleepActivityType } from '@/db/repositories/sleep-activities.repository';
import StarList, { StarListItem } from '@/components/StarList';
import { useSleepActivitiesByType } from '@/services/sleep-activities.service';
import * as Notifications from 'expo-notifications';
import { Typography } from '@/components/Typography';
import { XStack, YStack, Separator } from 'tamagui';
import { Switch } from '@/components/Switch';
import { format } from 'date-fns';
import { TimePicker } from '@/components/TimePicker';

export default function RelaxingActivities() {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const { data: sleepActivity, refetch } = useSleepActivitiesByType(SleepActivityType.RELAXING);
  const [favoriteItems, setFavoriteItems] = useState<StarListItem[]>([]);
  const [isReminderChecked, setIsReminderChecked] = useState(false);
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const elements = t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.relaxingActivities, {
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

  useEffect(() => {
    setIsReminderChecked(sleepActivity?.notificationId !== null);
    setTime(sleepActivity?.reminderTime ? new Date(sleepActivity?.reminderTime) : null);
  }, [sleepActivity]);

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
          listHeaderComponent={
            <>
              <Typography paddingBottom={8} preset='default'>
                {t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.relaxingActivitiesDescription)}
              </Typography>
              <YStack backgroundColor='white' padding='$md' gap='$xs' borderRadius='$sm' marginBottom='$md'>
                <XStack alignItems='center' justifyContent='space-between' gap='$md'>
                  <Typography flex={1}>
                    {t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.relaxingActivitiesReminderTitle)}
                  </Typography>
                  <Switch isChecked={isReminderChecked} setIsChecked={handleOnReminderChange} />
                </XStack>

                {isReminderChecked && (
                  <YStack
                    gap='$xs'
                    animation='quick'
                    enterStyle={{ opacity: 0, y: -10 }}
                    exitStyle={{ opacity: 0, y: -10 }}
                    y={0}
                    opacity={1}>
                    <Separator />

                    <XStack justifyContent='space-between'>
                      <Typography>
                        {t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.relaxingActivitiesReminderTime)}
                      </Typography>
                      <Typography>{format(time || new Date(), 'HH:mm')}</Typography>
                    </XStack>

                    <XStack justifyContent='center'>
                      <TimePicker date={time || new Date()} onChange={handleOnTimeChange} />
                    </XStack>
                  </YStack>
                )}
              </YStack>
            </>
          }
          items={favoriteItems}
          update={handleOnUpdate}
        />
      </Screen>
    </>
  );
}
