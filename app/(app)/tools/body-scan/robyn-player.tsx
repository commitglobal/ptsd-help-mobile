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

export const BodyScanRobynPlayer = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');
  const [mediaURI, setMediaURI] = useState<string | null>(null);

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  useFocusEffect(() => {
    setMediaURI(mediaMapping['BODY_SCAN.ROBYN.soundURI']);

    return () => {
      setMediaURI(null);
    };
  });

  const { finishTool } = useToolManagerContext();

  return (
    <>
      <ScreenWithImageHeader
        imageUrl={mediaMapping['BODY_SCAN.ROBYN.CATEGORY_ICON']}
        headerProps={{
          title: t(toolsTranslationKeys.BODY_SCAN.subcategories.ROBYN.label),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.BODY_SCAN.subcategories.ROBYN.done),
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

export default BodyScanRobynPlayer;