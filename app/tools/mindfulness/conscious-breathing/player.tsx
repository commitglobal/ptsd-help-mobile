import React from 'react';
import MediaPlayer, { PLAYLIST } from '@/components/MediaPlayer';
import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Stack, useRouter } from 'expo-router';
import { YStack } from 'tamagui';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';

export const ConsciousBreathingPlayer = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const translationKeys = TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS.subcategories.CONSCIOUS_BREATHING;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWithImageHeader
        imageUrl={
          'https://plus.unsplash.com/premium_vector-1730376548370-6371f7576b4c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
        headerProps={{
          title: t(translationKeys.label, { ns: 'tools' }),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}
        contentContainerStyle={{ backgroundColor: 'white' }}>
        <YStack>
          <MediaPlayer mediaURI={PLAYLIST[5].uri} isVideo={PLAYLIST[5].isVideo} />
        </YStack>
      </ScreenWithImageHeader>
    </>
  );
};

export default ConsciousBreathingPlayer;
