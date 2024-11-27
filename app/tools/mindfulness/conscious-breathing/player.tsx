import React from 'react';
import MediaPlayer from '@/components/MediaPlayer';
import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Stack, useRouter } from 'expo-router';
import { YStack } from 'tamagui';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

export const ConsciousBreathingPlayer = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWithImageHeader
        imageUrl={mediaMapping['MINDFULNESS.CONSCIOUS_BREATHING.CATEGORY_ICON']}
        headerProps={{
          title: t(toolsTranslationKeys.MINDFULNESS.subcategories.CONSCIOUS_BREATHING.label),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}
        contentContainerStyle={{ backgroundColor: 'white' }}>
        <YStack>
          <MediaPlayer mediaURI={mediaMapping?.['MINDFULNESS.CONSCIOUS_BREATHING.soundURI']} isVideo={false} />
        </YStack>
      </ScreenWithImageHeader>
    </>
  );
};

export default ConsciousBreathingPlayer;
