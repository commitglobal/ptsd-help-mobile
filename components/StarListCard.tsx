import React, { useState } from 'react';
import { XStack, YStackProps } from 'tamagui';
import { Typography } from './Typography';
import { Card } from './Card';
import { Icon } from './Icon';
import { StarListItem } from './StarList';

interface StarListCardProps extends YStackProps {
  item: StarListItem;
  onUpdate: (item: StarListItem) => void;
}

export const StarListCard = ({ item, onUpdate, ...rest }: StarListCardProps) => {
  const [isPressed, setIsPressed] = useState(() => item.favorite);

  const handlePress = () => {
    setIsPressed((prev) => !prev);
    onUpdate({ ...item, favorite: !isPressed });
  };

  return (
    <Card {...rest} onPress={handlePress}>
      <XStack alignItems='center'>
        <XStack padding='$sm'>
          <Icon
            icon={isPressed ? 'starFilled' : 'star'}
            color={isPressed ? '$orange9' : '$blue11'}
            width={32}
            height={32}
          />
        </XStack>
        <Typography flex={1}>{item.label}</Typography>
      </XStack>
    </Card>
  );
};
