import React from 'react';
import { Circle, TextStyle, XStack } from 'tamagui';
import { Typography } from './Typography';

export const BulletPoint = ({ text, textStyle, size = 6 }: { text: string; textStyle?: TextStyle; size?: number }) => {
  return (
    <XStack gap={8}>
      <Circle size={size} backgroundColor='$blue11' marginTop='$xs' />
      <Typography flex={1} {...textStyle}>
        {text}
      </Typography>
    </XStack>
  );
};
