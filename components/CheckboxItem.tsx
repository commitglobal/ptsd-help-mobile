import React, { useMemo } from 'react';
import { Avatar, XStack } from 'tamagui';
import { Card } from './Card';
import { Typography } from './Typography';
import { Icon } from './Icon';

interface Item {
  id: string;
  label: string;
  avatar?: string;
}

interface CheckboxItemProps {
  item: Item;
  selectedItems: any[];
  onSelectItem: any;
}

export const CheckboxItem = ({ item, onSelectItem, selectedItems }: CheckboxItemProps) => {
  const isSelected = useMemo(() => selectedItems.includes(item.id), [item.id, selectedItems]);

  return (
    <Card
      borderWidth={1}
      borderColor={isSelected ? '$blue9' : '$gray4'}
      borderRadius='$2'
      padding='$md'
      onPress={() =>
        onSelectItem(isSelected ? selectedItems.filter((id) => id !== item.id) : [...selectedItems, item.id])
      }
      backgroundColor={isSelected ? '$blue2' : 'white'}>
      <XStack alignItems='center' gap='$md'>
        {item.avatar && (
          <Avatar size='$2' circular>
            {/* //todo: add flags */}
            <Avatar.Image src={item.avatar} />
          </Avatar>
        )}

        <Typography flex={1}>{item.label}</Typography>

        <XStack
          marginLeft='auto'
          width='$1.5'
          height='$1.5'
          borderWidth={1}
          borderColor={isSelected ? '$blue9' : '$gray4'}
          borderRadius='$4'
          justifyContent='center'
          alignItems='center'
          backgroundColor={isSelected ? '$blue9' : 'white'}>
          {isSelected && <Icon icon='check' width={15} height={15} color='white' />}
        </XStack>
      </XStack>
    </Card>
  );
};
