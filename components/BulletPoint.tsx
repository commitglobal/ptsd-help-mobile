import React from 'react';
import { Circle, XStack } from 'tamagui';
import { Typography } from './Typography';

export const BulletPoint = ({ text, size = 6 }: { text: string; size?: number }) => {
  return (
    <XStack gap={8}>
      <Circle size={size} backgroundColor='$blue11' marginTop='$xs' />
      <Typography flex={1}>{text}</Typography>
    </XStack>
  );
};
