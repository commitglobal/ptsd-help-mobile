import React from "react";
import { Typography } from "./Typography";
import { useTranslation } from "react-i18next";
import { Card } from "./Card";
import { Separator } from "tamagui";

type Message = {
  id: string;
  annoyance: string;
  message: string;
  because: string;
};

export const MessageCard = ({
  message,
  onPress,
}: {
  message: Message;
  onPress: () => void;
}) => {
  const { t } = useTranslation("i-messages");
  return (
    <Card padding="$md" gap={4} onPress={onPress}>
      <Typography>{t("when")}</Typography>
      <Typography preset="helper">{message.annoyance}</Typography>
      <Separator marginVertical={4} />
      <Typography>{t("feel")}</Typography>
      <Typography preset="helper">{message.message}</Typography>
      <Separator marginVertical={4} />
      <Typography>{t("because")}</Typography>
      <Typography preset="helper">{message.because}</Typography>
    </Card>
  );
};
