import React from 'react';
import MediaPlayer from '@/components/MediaPlayer';
import { Screen } from '@/components/Screen';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, YStack } from 'tamagui';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';

export const DeepBreathingPlayer = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  const { finishTool } = useToolManagerContext();

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
            <MediaPlayer mediaURI={mediaMapping['DEEP_BREATHING.videoURI']} isVideo={true} />
          </YStack>
        </ScrollView>
      </Screen>
    </>
  );
};

export default DeepBreathingPlayer;
