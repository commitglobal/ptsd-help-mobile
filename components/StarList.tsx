import React, { useEffect, useMemo, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { Separator, XStack, YStack } from 'tamagui';
import { Typography } from '@/components/Typography';
import { StarListCard } from '@/components/StarListCard';
import { useSleepActivitiesByType } from '@/services/sleep-activities.service';
import { SleepActivityType } from '@/db/repositories/sleep-activities.repository';
import { format } from 'date-fns';
import { Switch } from './Switch';
import { TimePicker } from './TimePicker';

export interface StarListItem {
  id: string;
  label: string;
  favorite: boolean;
}

interface StarListProps {
  type: SleepActivityType;
  activities: StarListItem[];
  description: string;
  update: (updatedItems: string[]) => void;
  hasReminder?: boolean;
  reminderText?: string;
  onReminderChange?: (value: boolean) => void;
  onTimeChange?: (time: Date) => void;
}

export default function StarList({
  type,
  activities,
  description,
  hasReminder,
  reminderText,
  update,
  onReminderChange,
  onTimeChange,
}: StarListProps) {
  const { data: sleepActivity } = useSleepActivitiesByType(type);
  const [, setFavoriteItems] = useState<string[]>([]);

  const [isReminderChecked, setIsReminderChecked] = useState(false);
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // setIsReminderChecked(sleepActivity?.reminderEnabled || false);
    // setTime(sleepActivity?.reminderTime && new Date(sleepActivity?.reminderTime));
  }, [sleepActivity]);

  const items = useMemo(
    () =>
      activities
        .map((el) => ({ ...el, favorite: sleepActivity?.favorites?.includes(el.id) || false }))
        .sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0)),
    [sleepActivity, activities]
  );

  useEffect(() => {
    setFavoriteItems(items.filter((item) => item.favorite).map((item) => item.id));
  }, [items]);

  const onUpdate = async (item: { id: string; favorite: boolean }) => {
    setFavoriteItems((prevItems) => {
      const newFavoriteList = new Set(prevItems);

      if (item.favorite) {
        newFavoriteList.add(item.id);
      } else {
        newFavoriteList.delete(item.id);
      }

      update(Array.from(newFavoriteList));
      return Array.from(newFavoriteList);
    });
  };

  const handleReminderChange = (value: boolean) => {
    setIsReminderChecked(value);
    onReminderChange?.(value);
  };

  const handleTimeChange = (time: Date) => {
    setTime(time);
    onTimeChange?.(time);
  };

  return (
    <>
      <FlashList
        ListHeaderComponent={() => (
          <>
            <Typography paddingBottom={8} preset='default'>
              {description}
            </Typography>
            {hasReminder && (
              <YStack backgroundColor='white' padding='$md' gap='$xs' borderRadius='$sm' marginBottom='$md'>
                <XStack alignItems='center' justifyContent='space-between' gap='$md'>
                  <Typography flex={1}>{reminderText}</Typography>
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
                      <Typography>{'ZILNIC'}</Typography>
                      <Typography>{format(time || new Date(), 'HH:mm')}</Typography>
                    </XStack>

                    <XStack justifyContent='center'>
                      <TimePicker date={time || new Date()} onChange={handleTimeChange} />
                    </XStack>
                  </YStack>
                )}
              </YStack>
            )}
          </>
        )}
        bounces={false}
        data={items}
        contentContainerStyle={{ padding: 16, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <StarListCard item={item} onUpdate={onUpdate} />}
        ItemSeparatorComponent={() => <YStack height={8} />}
        estimatedItemSize={60}
      />
    </>
  );
}
