import { Modal } from "@/components/Modal";
import { Screen } from "@/components/Screen";
import TextFormInput from "@/components/TextFormInput";
import { Typography } from "@/components/Typography";
import { scrollToTextarea } from "@/helpers/scrollToTextarea";
import { Stack } from "expo-router";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, YStack } from "tamagui";

export default function Message() {
  const { t } = useTranslation("i-messages");
  const insets = useSafeAreaInsets();

  // using refs for scrolling capabilities
  const scrollViewRef = useRef<ScrollView>(null);
  const annoyanceRef = useRef(null);
  const feelRef = useRef(null);
  const becauseRef = useRef(null);

  const [infoMessage, setInfoMessage] = useState("");

  const handleFocus = (ref: React.RefObject<any>) => {
    if (ref.current) {
      scrollToTextarea(scrollViewRef, ref);
    }
  };

  const handleInfoModalOpen = (message: string) => {
    setInfoMessage(message);
  };

  const handleInfoModalClose = () => {
    setInfoMessage("");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Screen
        headerProps={{ title: "Messages with 'I'" }}
        contentContainerStyle={{
          backgroundColor: "white",
        }}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            gap: "$lg",
            flexGrow: 1,
            padding: "$lg",
            paddingBottom: insets.bottom + 16,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <TextFormInput
            label={t("annoyance.label")}
            placeholder={t("annoyance.placeholder")}
            ref={annoyanceRef}
            onFocus={() => handleFocus(annoyanceRef)}
            infoMessage={t("annoyance.example")}
            onInfoMessagePress={() =>
              handleInfoModalOpen(t("annoyance.example"))
            }
          />
          <Typography>{t("declaration")}</Typography>
          <TextFormInput
            label={t("i-feel.label")}
            placeholder={t("i-feel.placeholder")}
            ref={feelRef}
            onFocus={() => handleFocus(feelRef)}
            infoMessage={t("i-feel.example")}
            onInfoMessagePress={() => handleInfoModalOpen(t("i-feel.example"))}
          />
          <TextFormInput
            label={t("because-input.label")}
            placeholder={t("because-input.placeholder")}
            ref={becauseRef}
            onFocus={() => handleFocus(becauseRef)}
            infoMessage={t("because-input.example")}
            onInfoMessagePress={() =>
              handleInfoModalOpen(t("because-input.example"))
            }
          />
        </ScrollView>
      </Screen>
      {infoMessage && (
        <Modal open onOpenChange={handleInfoModalClose}>
          <YStack minHeight={100}>
            <Typography>{infoMessage}</Typography>
          </YStack>
        </Modal>
      )}
    </>
  );
}
