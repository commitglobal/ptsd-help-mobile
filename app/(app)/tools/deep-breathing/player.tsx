import React, { useState } from 'react';
import { Screen } from '@/components/Screen';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { ScrollView, YStack } from 'tamagui';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import VideoScreen from '@/components/VideoPlayer';

export const DeepBreathingPlayer = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();
  const [videoURI, setVideoURI] = useState<string | null>(mediaMapping['DEEP_BREATHING.videoURI']);

  const { finishTool } = useToolManagerContext();

  useFocusEffect(() => {
    setVideoURI(mediaMapping['DEEP_BREATHING.videoURI']);
    return () => {
      setVideoURI(null);
    };
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Screen
        headerProps={{
          title: t(toolsTranslationKeys.DEEP_BREATHING.label),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.DEEP_BREATHING.done),
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
            <VideoScreen videoURI={videoURI} />
          </YStack>
        </ScrollView>
      </Screen>
    </>
  );
};

export default DeepBreathingPlayer;
