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

export const LovingKindnessPlayer = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  const [mediaURI, setMediaURI] = useState<string | null>(null);

  const { finishTool } = useToolManagerContext();

  useFocusEffect(() => {
    setMediaURI(mediaMapping['MINDFULNESS.LOVING_KINDNESS.soundURI']);

    return () => {
      setMediaURI(null);
    };
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWithImageHeader
        imageUrl={mediaMapping['MINDFULNESS.LOVING_KINDNESS.CATEGORY_ICON']}
        headerProps={{
          title: t(toolsTranslationKeys.MINDFULNESS.subcategories.LOVING_KINDNESS.label),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}
        contentContainerStyle={{ backgroundColor: 'white' }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.MINDFULNESS.subcategories.LOVING_KINDNESS.done),
          onMainAction: () => finishTool(),
        }}>
        <YStack>
          <MediaPlayer mediaURI={mediaURI} isVideo={false} />
        </YStack>
      </ScreenWithImageHeader>
    </>
  );
};

export default LovingKindnessPlayer;
