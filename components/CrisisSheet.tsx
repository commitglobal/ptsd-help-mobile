import React from "react";
import { Sheet } from "tamagui";
import { YStack } from "tamagui";
import { Typography } from "./Typography";
import { BottomSheet } from "./BottomSheet";
import Button from "./Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

export const CrisisSheet = ({
  setCrisisSheetOpen,
  onContinueToTool,
}: {
  setCrisisSheetOpen: (open: boolean) => void;
  onContinueToTool: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation("distress-meter");

  return (
    <BottomSheet
      onOpenChange={setCrisisSheetOpen}
      snapPoints={[60]}
      frameProps={{ gap: "$md" }}
      dismissOnSnapToBottom={false}
      dismissOnOverlayPress={false}
    >
      <Sheet.ScrollView bounces={false}>
        <Typography>{t("high-distress.text")}</Typography>
      </Sheet.ScrollView>

      <YStack gap="$md" paddingBottom={insets.bottom} marginTop="auto">
        <Button preset="secondary" onPress={onContinueToTool}>
          {t("high-distress.actions.help")}
        </Button>

        {/* //todo: navigate to support screen */}
        <Button
          onPress={() => {
            console.log("navigate to support screen");
            setCrisisSheetOpen(false);
          }}
        >
          {t("high-distress.actions.talk")}
        </Button>
      </YStack>
    </BottomSheet>
  );
};
