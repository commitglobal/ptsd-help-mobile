import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { YStack } from 'tamagui';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/components/Typography';
import { StarListCard } from '@/components/StarListCard';
import { useSleepActivitiesByType } from '@/services/sleep-activities.service';
import sleepActivitiesRepository, { SleepActivityType } from '@/db/repositories/sleep-activities.repository';

export interface StarListItem {
  id: string;
  label: string;
  favorite: boolean;
}

interface StarListProps {
  type: SleepActivityType;
  activities: StarListItem[];
  description: string;
}

export default function StarList({ type, activities, description }: StarListProps) {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const { data: sleepActivity } = useSleepActivitiesByType(type);
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);

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

  useEffect(() => {
    handleDatabaseUpdate(new Set(favoriteItems));
  }, [favoriteItems]);

  const handleDatabaseUpdate = async (updatedItems: Set<string>) => {
    if (!sleepActivity) {
      await sleepActivitiesRepository.createSleepActivity({
        type,
        favorites: Array.from(updatedItems),
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        deletedAt: null,
      });
    } else {
      await sleepActivitiesRepository.updateSleepActivity(type, Array.from(updatedItems));
    }
  };

  const onUpdate = useCallback(
    async (item: { id: string; favorite: boolean }) => {
      setFavoriteItems((prevItems) => {
        const newFavoriteList = new Set(prevItems);

        if (item.favorite) {
          newFavoriteList.add(item.id);
        } else {
          newFavoriteList.delete(item.id);
        }

        return Array.from(newFavoriteList);
      });
    },
    [favoriteItems]
  );

  return (
    <>
      <FlashList
        ListHeaderComponent={() => (
          <Typography paddingBottom={8} preset='default'>
            {description}
          </Typography>
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
