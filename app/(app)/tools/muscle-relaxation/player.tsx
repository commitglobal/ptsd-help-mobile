import React, { useState } from 'react';
import MediaPlayer from '@/components/MediaPlayer';
import { Screen } from '@/components/Screen';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { ScrollView, YStack } from 'tamagui';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';

export const MuscleRelaxationPlayer = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(mediaMapping['MUSCLE_RELAXATION.videoURI']);

  const { finishTool } = useToolManagerContext();

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setSelectedVideo(mediaMapping['MUSCLE_RELAXATION.videoURI']);
  //     return () => {
  //       // When the screen is PUSHED, the component is not unmounted and the sounds will keep playing
  //       // We reset the selected audio @luciatugui 2024-11-28
  //       setSelectedVideo(null);
  //     };
  //   }, [])
  // );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Screen
        headerProps={{
          title: t(toolsTranslationKeys.MUSCLE_RELAXATION.label),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.MINDFULNESS.subcategories.MINDFUL_WALKING.done),
          onMainAction: () => finishTool(),
        }}
        contentContainerStyle={{ backgroundColor: 'white' }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: '$md',
            gap: '$md',
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <YStack w='100%' h='50%'>
            <MediaPlayer mediaURI={mediaMapping['MUSCLE_RELAXATION.videoURI']} isVideo={true} />
          </YStack>
        </ScrollView>
      </Screen>
    </>
  );
};

export default MuscleRelaxationPlayer;
