import React, { Dispatch, SetStateAction, useMemo } from "react";
import { Avatar, XStack } from "tamagui";
import { Card } from "./Card";
import { Typography } from "./Typography";

interface Item {
  id: string;
  label: string;
  avatar?: string;
}

interface RadioItemProps {
  item: Item;
  selectedItem: string;
  onSelectItem: Dispatch<SetStateAction<string>>;
}

export const RadioItem = ({ item, onSelectItem, selectedItem }: RadioItemProps) => {
  const isSelected = useMemo(() => item.id === selectedItem, [item.id, selectedItem]);

  return (
    <Card
      borderWidth={1}
      borderColor={isSelected ? "$blue9" : "$gray4"}
      borderRadius="$2"
      padding="$md"
      onPress={() => onSelectItem(item.id)}
      backgroundColor={isSelected ? "$blue2" : "white"}
    >
      <XStack alignItems="center" gap="$md">
        {item.avatar && (
          <Avatar size="$2" circular>
            {/* //todo: add flags */}
            <Avatar.Image src={item.avatar} />
          </Avatar>
        )}

        <Typography flex={1}>{item.label}</Typography>

        <XStack
          marginLeft="auto"
          width="$1.5"
          height="$1.5"
          borderWidth={1}
          borderColor={isSelected ? "$blue9" : "$gray4"}
          borderRadius="$12"
          justifyContent="center"
          alignItems="center"
          backgroundColor={isSelected ? "$blue9" : "white"}
        >
          {isSelected && (
            <XStack width="$0.75" height="$0.75" backgroundColor="white" borderRadius="$12" />
          )}
        </XStack>
      </XStack>
    </Card>
  );
};
