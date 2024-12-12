import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { ScrollView, Separator, XStack, YStack } from 'tamagui';
import { Typography } from '@/components/Typography';
import TextareaInput from '@/components/Inputs/Textarea';
import TextFormInput from '@/components/TextFormInput';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import worriesRepository from '@/db/repositories/worries.repository';
import { Switch } from '@/components/Switch';
import { format } from 'date-fns';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { TimePicker } from '@/components/TimePicker';
import { handleTextareaFocus } from '@/helpers/handleTextareaFocus';
import * as Notifications from 'expo-notifications';

export default function WorryTime() {
  const { toolsTranslationKeys } = useTranslationKeys();
  const { t } = useTranslation('tools');
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const textareaRef = useRef<React.ElementRef<typeof TextareaInput>>(null);
  const { finishTool } = useToolManagerContext();

  const { data: worries } = useLiveQuery(worriesRepository.getWorries(), []);

  const [worryText, setWorryText] = useState(worries[0]?.worry || '');
  const [isReminderChecked, setIsReminderChecked] = useState(false);
  const [time, setTime] = useState<Date | null>(new Date());

  // initialize the textarea value with the existing worry
  useEffect(() => {
    setWorryText(worries[0]?.worry || '');
    setIsReminderChecked(worries[0]?.reminderEnabled || false);
    setTime(worries[0]?.reminderTime && new Date(worries[0]?.reminderTime));
  }, [worries]);

  const handleReminderChange = (checked: boolean) => {
    if (!checked) {
      setTime(null);
    }
    if (checked) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd();
      }, 100);
    }
    setIsReminderChecked(checked);
  };

  const handleDone = async () => {
    const reminderTimeDate = time ? new Date(time) : new Date();
    const notificationData: Notifications.NotificationRequestInput = {
      content: {
        title: t(toolsTranslationKeys.WORRY_TIME.ptsdHelp),
        body: t(toolsTranslationKeys.WORRY_TIME.review),
        data: {
          url: '/tools/worry-time', // where to redirect to
        },
      },
      trigger: {
        hour: reminderTimeDate.getHours(),
        minute: reminderTimeDate.getMinutes(),
        repeats: true,
      },
    };

    // if we have no worries, create one, otherwise update the existing one
    if (worries.length === 0) {
      let notificationId: string | null = null;

      // if the reminder is checked -> schedule the notification
      if (isReminderChecked) {
        notificationId = await Notifications.scheduleNotificationAsync(notificationData);
      }

      // create the worry in the database
      worriesRepository.createWorry({
        worry: worryText,
        reminderEnabled: isReminderChecked,
        reminderTime: time,
        notificationId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      });
    } else {
      // cancel the existing notification, if it exists, because we will create a new one if necessary
      if (worries[0].notificationId) {
        await Notifications.cancelScheduledNotificationAsync(worries[0].notificationId);
      }

      let notificationId: string | null = null;

      // if the reminder is checked -> schedule the new notification
      if (isReminderChecked) {
        notificationId = await Notifications.scheduleNotificationAsync(notificationData);
      }

      worriesRepository.updateWorry(worries[0].id, {
        ...worries[0],
        worry: worryText,
        reminderEnabled: isReminderChecked,
        reminderTime: time,
        notificationId,
      });
    }
    finishTool();
  };

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.WORRY_TIME.title),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}
      footerProps={{
        onMainAction: handleDone,
        secondaryActionLabel: t(toolsTranslationKeys.WORRY_TIME.help),
        onSecondaryAction: () => router.push('/tools/worry-time/help'),
      }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, gap: 16, padding: 16 }}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}>
        <Typography>{t(toolsTranslationKeys.WORRY_TIME.description)}</Typography>

        <TextFormInput
          label={t(toolsTranslationKeys.WORRY_TIME.subjectsToThinkAbout)}
          ref={textareaRef}
          placeholder={t(toolsTranslationKeys.WORRY_TIME.writeHere)}
          height={200}
          onFocus={() => handleTextareaFocus(scrollViewRef, textareaRef)}
          value={worryText}
          onChange={({ target: { value } }: any) => setWorryText(value)}
        />

        <YStack backgroundColor='white' padding='$md' gap='$xs' borderRadius='$sm'>
          <XStack alignItems='center' justifyContent='space-between' gap='$md'>
            <Typography flex={1}>{t(toolsTranslationKeys.WORRY_TIME.reminder)}</Typography>
            <Switch isChecked={isReminderChecked} setIsChecked={handleReminderChange} />
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
                <Typography>{t(toolsTranslationKeys.WORRY_TIME.daily)}</Typography>
                <Typography>{format(time || new Date(), 'HH:mm')}</Typography>
              </XStack>

              <XStack justifyContent='center'>
                <TimePicker date={time || new Date()} onChange={setTime} />
              </XStack>
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </Screen>
  );
}
