import React, { useMemo } from 'react';
import { XStack } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { CircularListItem } from './CircularListItem';
import { Typography } from './Typography';
import { SymptomType, useSymptoms } from '@/hooks/useTools';
import { FlatList } from 'react-native';

export const SymptomsHorizontalList = () => {
  const { t } = useTranslation();
  const { getRandomToolForSymptom } = useSymptoms();
  const { startTool } = useToolManagerContext();

  const { SYMPOTOMS_CONFIG } = useSymptoms();
  const symptoms = useMemo(() => {
    return (
      Object.values(SYMPOTOMS_CONFIG).map((symptom: SymptomType) => {
        return { ...symptom, label: t(symptom.label, { ns: 'tools' }), icon: symptom.icon };
      }) || []
    );
  }, [t, SYMPOTOMS_CONFIG]);

  return (
    <FlatList
      data={symptoms}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 32 }}
      ListEmptyComponent={() => <Typography preset='helper'>{t('common.no-symptoms')}</Typography>}
      renderItem={({ item }) => (
        <CircularListItem
          key={item.label}
          item={item}
          onItemPress={() => {
            const randomTool = getRandomToolForSymptom(item);
            if (randomTool) {
              startTool(randomTool, `/(drawer)/(tabs)`);
            }
          }}
        />
      )}
      ItemSeparatorComponent={() => <XStack width={8} />}
    />
  );
};
