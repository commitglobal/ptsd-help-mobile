import React from "react";
import { Avatar, XStack } from "tamagui";
import { Typography } from "./Typography";
import { Card } from "./Card";

export const SymptomCard = ({
  symptom,
}: {
  symptom: { id: string; label: string; photoUrl: string };
}) => {
  return (
    <Card>
      <XStack alignItems="center" gap="$md" padding="$sm">
        <Avatar circular size="$5" borderWidth={2} borderColor="$blue11">
          <Avatar.Image
            accessibilityLabel={symptom.label}
            src={symptom.photoUrl}
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <Typography flex={1}>{symptom.label}</Typography>
      </XStack>
    </Card>
  );
};
