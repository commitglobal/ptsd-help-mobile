import { Typography } from './Typography';

import React from 'react';
import LottieView from 'lottie-react-native';
import { YStack } from 'tamagui';

export default function LoadingAssets({ progress = 0 }: { progress?: number | null }) {
  return (
    <YStack flex={1} flexGrow={1} alignItems='center' justifyContent='center'>
      <Typography preset='heading'>Loading assets...</Typography>
      <LottieView style={styles.lottie} source={require('@/assets/lottie/loading-assets.json')} autoPlay loop />
      {!!progress && <Typography preset='heading'>{`${progress}%`}</Typography>}
      <Typography>This may take a minute, please wait ...</Typography>
    </YStack>
  );
}

const styles = {
  lottie: {
    width: 300,
    height: 300,
  },
};
