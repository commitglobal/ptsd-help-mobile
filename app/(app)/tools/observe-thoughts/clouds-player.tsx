import React, { useState } from 'react';
import MediaPlayer from '@/components/MediaPlayer';
import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { useFocusEffect, useRouter } from 'expo-router';
import { YStack } from 'tamagui';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';

export const CloudsPlayer = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');
  const [mediaURI, setMediaURI] = useState<string | null>(null);

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  useFocusEffect(() => {
    setMediaURI(mediaMapping['OBSERVE_THOUGHTS.CLOUDS.soundURI']);

    return () => {
      setMediaURI(null);
    };
  });

  const { finishTool } = useToolManagerContext();

  return (
    <>
      <ScreenWithImageHeader
        imageUrl={mediaMapping['OBSERVE_THOUGHTS.CATEGORY_ICON']}
        headerProps={{
          title: t(toolsTranslationKeys.OBSERVE_THOUGHTS.subcategories.CLOUDS.label),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.OBSERVE_THOUGHTS.subcategories.CLOUDS.done),
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

export default CloudsPlayer;
