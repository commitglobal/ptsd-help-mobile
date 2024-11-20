import React from 'react';
import MediaPlayer from '@/components/MediaPlayer';
import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Stack, useRouter } from 'expo-router';
import { YStack } from 'tamagui';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import { TOOLS_MEDIA_MAPPER } from '@/_config/media.mapper';
import { Asset } from 'expo-asset';

export const LovingKindnessPlayer = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const translationKeys = TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS.subcategories.LOVING_KINDNESS;
  const mediaMapper = TOOLS_MEDIA_MAPPER.MINDFULNESS.LOVING_KINDNESS;

  //   get the asset
  const asset = Asset.fromModule(mediaMapper.soundURI);
  // load the asset
  React.useEffect(() => {
    asset.downloadAsync();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWithImageHeader
        imageUrl={mediaMapper.headerImageURI}
        headerProps={{
          title: t(translationKeys.label, { ns: 'tools' }),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}
        contentContainerStyle={{ backgroundColor: 'white' }}>
        <YStack>
          <MediaPlayer mediaURI={asset.uri} isVideo={false} />
        </YStack>
      </ScreenWithImageHeader>
    </>
  );
};

export default LovingKindnessPlayer;
