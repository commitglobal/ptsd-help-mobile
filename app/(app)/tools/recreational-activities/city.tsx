import { Icon } from '@/components/Icon';
import { ScreenWithChangingText } from '@/components/ScreenWithChangingText';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

const RecreationalActivitiesCity = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const router = useRouter();
  const { mediaMapping } = useAssetsManagerContext();
  const { finishTool } = useToolManagerContext();

  const items = t(toolsTranslationKeys.RECREATIONAL_ACTIVITIES.subcategories.RECREATIONAL_ACTIVITIES_CITY.repeater, {
    returnObjects: true,
  }) as Record<string, { title: string; description: string }>;

  return (
    <ScreenWithChangingText
      headerProps={{
        title: t(toolsTranslationKeys.RECREATIONAL_ACTIVITIES.subcategories.RECREATIONAL_ACTIVITIES_CITY.label),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}
      footerProps={{ onMainAction: finishTool }}
      items={Object.values(items).map((item) => ({ ...item, id: item.description }))}
      imageUrl={
        mediaMapping['RECREATIONAL_ACTIVITIES.RECREATIONAL_ACTIVITIES_CITY.CATEGORY_ICON']
      }></ScreenWithChangingText>
  );
};

export default RecreationalActivitiesCity;
