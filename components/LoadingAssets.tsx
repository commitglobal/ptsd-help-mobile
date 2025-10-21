import { Typography } from './Typography';

import React from 'react';
import LottieView from 'lottie-react-native';
import { YStack } from 'tamagui';
import { useTranslation } from 'react-i18next';

export default function LoadingAssets({ progress = 0 }: { progress?: number | null }) {
  const { t } = useTranslation();

  return (
    <YStack flex={1} flexGrow={1} alignItems='center' justifyContent='center'>
      <Typography preset='heading'>{t('assets-loading.heading')}</Typography>
      <LottieView style={styles.lottie} source={require('@/assets/lottie/loading-assets.json')} autoPlay loop />
      {!!progress && <Typography preset='heading'>{`${progress}%`}</Typography>}
      <Typography>{t('assets-loading.body')}</Typography>
    </YStack>
  );
}

const styles = {
  lottie: {
    width: 300,
    height: 300,
  },
};
