import React, { useMemo } from 'react';
import { XStack } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { CircularListItem } from './CircularListItem';
import { Typography } from './Typography';

import { FlatList } from 'react-native';
import favoritesRepository, { Favorite } from '@/db/repositories/favorites.repository';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { HorizontalListSkeletonLoader } from './HorizontalListSkeletonLoader';

export const FavoritesHorizontalList = () => {
  const { t } = useTranslation();

  const { TOOL_CONFIG } = useToolManagerContext();
  const { startTool } = useToolManagerContext();

  const { data: favoritesData, updatedAt } = useLiveQuery(favoritesRepository.getFavorites(), []);

  const favorites = useMemo(() => {
    return Object.values(TOOL_CONFIG)
      .filter((tool) => favoritesData?.some((favorite: Favorite) => favorite.toolId === tool.id))
      .map((tool) => {
        return {
          ...tool,
          label: t(tool.label, { ns: 'tools' }),
        };
      });
  }, [favoritesData, TOOL_CONFIG]);

  //   loading state
  if (updatedAt === undefined) {
    return <HorizontalListSkeletonLoader />;
  }

  return (
    <FlatList
      data={favorites}
      ListEmptyComponent={() => <Typography preset='helper'>{t('common.no-favorites')}</Typography>}
      horizontal
      bounces={favorites.length > 0}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 32 }}
      renderItem={({ item }) => (
        <CircularListItem
          key={item.label}
          item={item}
          onItemPress={() => {
            startTool(item, `/(drawer)/(tabs)`);
          }}
        />
      )}
      ItemSeparatorComponent={() => <XStack width={8} />}
    />
  );
};
