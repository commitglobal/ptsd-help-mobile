import React, { useState } from 'react';
import MediaPlayer from '@/components/MediaPlayer';
import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { YStack } from 'tamagui';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';

export const CountryRoadPlayer = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');
  const [mediaURI, setMediaURI] = useState<string | null>(null);
  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  const { finishTool } = useToolManagerContext();

  useFocusEffect(() => {
    setMediaURI(mediaMapping['POSTIVE_IMAGERY.COUNTRY_ROAD.soundURI']);

    return () => {
      setMediaURI(null);
    };
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWithImageHeader
        imageUrl={mediaMapping['POSTIVE_IMAGERY.COUNTRY_ROAD.CATEGORY_ICON']}
        headerProps={{
          title: t(toolsTranslationKeys.POSTIVE_IMAGERY.subcategories.COUNTRY_ROAD.label),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.POSTIVE_IMAGERY.subcategories.COUNTRY_ROAD.done),
          onMainAction: () => finishTool(),
        }}
        contentContainerStyle={{ backgroundColor: 'white' }}>
        <YStack>
          <MediaPlayer mediaURI={mediaURI} isVideo={false} />
        </YStack>
      </ScreenWithImageHeader>
    </>
  );
};

export default CountryRoadPlayer;
