import React from 'react';
import { Avatar, XStack, YStackProps } from 'tamagui';
import { Typography } from './Typography';
import { Card } from './Card';
import { Icon } from './Icon';

interface ListCardProps extends YStackProps {
  item: { id: string; label: string; icon?: string; rightIcon?: string };
}

export const ListCard = ({ item, ...rest }: ListCardProps) => {
  return (
    <Card {...rest}>
      <XStack alignItems='center' gap='$md' padding='$sm'>
        {item.icon && (
          <Avatar circular size='$5' borderWidth={2} borderColor='$blue11'>
            <Avatar.Image accessibilityLabel={item.label} src={item.icon} />

            <Avatar.Fallback backgroundColor='$blue10' />
          </Avatar>
        )}

        <Typography flex={1}>{item.label}</Typography>
        {item.rightIcon && <Icon icon={item.rightIcon} width={24} height={24} color='$gray12' />}
      </XStack>
    </Card>
  );
};
