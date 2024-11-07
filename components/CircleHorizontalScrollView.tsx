import React from "react";
import { Circle, ScrollView, YStack } from "tamagui";
import { Icon } from "./Icon";
import { Typography } from "./Typography";

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
      gap="$md"
      contentContainerStyle={{ paddingHorizontal: 32, gap: 16 }}
    >
      {items.map((item) => (
        <YStack
          key={item.label}
          alignItems="center"
          width={110}
          pressStyle={{ opacity: 0.5 }}
          onPress={onItemPress}
        >
          <Circle
            size={60}
            backgroundColor="white"
            shadowColor="black"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.25}
            shadowRadius={3.84}
            elevation={5}
          >
            <Circle
              size={50}
              backgroundColor="$blue5"
              alignItems="center"
              justifyContent="center"
            >
              <Icon icon={item.icon} width={24} height={24} color="$blue11" />
            </Circle>
          </Circle>
          <Typography preset="helper" marginTop="$xs" textAlign="center">
            {item.label}
          </Typography>
        </YStack>
      ))}
    </ScrollView>
  );
};
