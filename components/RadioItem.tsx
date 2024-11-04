import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, XStack } from "tamagui";
import { Card } from "./Card";
import { Typography } from "./Typography";

interface RadioItemProps {
  item: { id: string; label: string };
  selectedItem: string;
  onSelectItem: (item: string) => void;
}

export const RadioItem = ({
  item,
  onSelectItem,
  selectedItem,
}: RadioItemProps) => {
  const { t } = useTranslation("choose-country");
  const isSelected = useMemo(
    () => item.id === selectedItem,
    [item.id, selectedItem]
  );
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
        <Avatar size="$4" circular>
          {/* //todo: add flags */}
          <Avatar.Image src={`https://flagcdn.com/256x192/${item.id}.png`} />
        </Avatar>
        <Typography flex={1}>{t(`countries.${item.id}`)}</Typography>

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
            <XStack
              width="$0.75"
              height="$0.75"
              backgroundColor="white"
              borderRadius="$12"
            />
          )}
        </XStack>
      </XStack>
    </Card>
  );
};
