import React from 'react';
import { Avatar, Circle, ScrollView, YStack } from 'tamagui';
import { Typography } from './Typography';

export const CircleHorizontalScrollView = ({
  items,
  onItemPress,
}: {
  items: { label: string; icon: string }[];
  onItemPress: () => void;
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      gap='$md'
      contentContainerStyle={{ paddingHorizontal: 32, gap: 16 }}>
      {items.map((item) => (
        <YStack key={item.label} alignItems='center' width={110} pressStyle={{ opacity: 0.5 }} onPress={onItemPress}>
          <Circle
            size={60}
            backgroundColor='white'
            shadowColor='black'
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.25}
            shadowRadius={3.84}
            elevation={5}>
            <Avatar circular size='$4' borderWidth={2} borderColor='$blue11'>
              <Avatar.Image accessibilityLabel={item.label} src={item.icon} />
              <Avatar.Fallback backgroundColor='$blue10' />
            </Avatar>
          </Circle>
          <Typography preset='helper' marginTop='$xs' textAlign='center'>
            {item.label}
          </Typography>
        </YStack>
      ))}
    </ScrollView>
  );
};
