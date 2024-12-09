import React from 'react';
import MediaPlayer from '@/components/MediaPlayer';
import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Stack, useRouter } from 'expo-router';
import { YStack } from 'tamagui';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';

export const SenseAwarenessPlayer = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  const { finishTool } = useToolManagerContext();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWithImageHeader
        imageUrl={mediaMapping['MINDFULNESS.SENSE_AWARENESS.CATEGORY_ICON']}
        headerProps={{
          title: t(toolsTranslationKeys.MINDFULNESS.subcategories.SENSE_AWARENESS.label),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}
        contentContainerStyle={{ backgroundColor: 'white' }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.MINDFULNESS.subcategories.SENSE_AWARENESS.done),
          onMainAction: () => finishTool(),
        }}>
        <YStack>
          <MediaPlayer mediaURI={mediaMapping['MINDFULNESS.SENSE_AWARENESS.soundURI']} isVideo={false} />
        </YStack>
      </ScreenWithImageHeader>
    </>
  );
};

export default SenseAwarenessPlayer;
