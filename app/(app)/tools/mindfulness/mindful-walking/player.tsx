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

export const MindfulWalkingPlayer = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();
  const [mediaURI, setMediaURI] = useState<string | null>(null);

  const { finishTool } = useToolManagerContext();

  useFocusEffect(() => {
    setMediaURI(mediaMapping['MINDFULNESS.MINDFUL_WALKING.soundURI']);

    return () => {
      setMediaURI(null);
    };
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWithImageHeader
        imageUrl={mediaMapping['MINDFULNESS.MINDFUL_WALKING.CATEGORY_ICON']}
        headerProps={{
          title: t(toolsTranslationKeys.MINDFULNESS.subcategories.MINDFUL_WALKING.label),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.MINDFULNESS.subcategories.MINDFUL_WALKING.done),
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

export default MindfulWalkingPlayer;
