import React from "react";
import { Avatar, XStack, YStackProps } from "tamagui";
import { Typography } from "./Typography";
import { Card } from "./Card";

interface ListCardProps extends YStackProps {
  item: { id: string; label: string; photoUrl: string };
}

export const ListCard = ({ item, ...rest }: ListCardProps) => {
  return (
    <Card {...rest}>
      <XStack alignItems="center" gap="$md" padding="$sm">
        <Avatar circular size="$5" borderWidth={2} borderColor="$blue11">
          <Avatar.Image accessibilityLabel={item.label} src={item.photoUrl} />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <Typography flex={1}>{item.label}</Typography>
      </XStack>
    </Card>
  );
};