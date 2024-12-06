import React from 'react';
import { Avatar, XStack, YStackProps } from 'tamagui';
import { Typography } from './Typography';
import { Card } from './Card';

interface ListCardProps extends YStackProps {
  item: { id: string; label: string; icon: string };
}

export const ListCard = ({ item, ...rest }: ListCardProps) => {
  return (
    <Card {...rest}>
      <XStack alignItems='center' gap='$md' padding='$sm'>
        {/* {item.icon && (
          <XStack padding='$sm'>
            <Icon icon={item.icon} color='$blue11' width={32} height={32} />
          </XStack>
        )} */}
        {item.icon && (
          <Avatar circular size='$5' borderWidth={2} borderColor='$blue11'>
            <Avatar.Image accessibilityLabel={item.label} src={item.icon} />

            <Avatar.Fallback backgroundColor='$blue10' />
          </Avatar>
        )}

        <Typography flex={1}>{item.label}</Typography>
      </XStack>
    </Card>
  );
};
