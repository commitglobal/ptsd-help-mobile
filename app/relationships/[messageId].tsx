import Button from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Modal } from "@/components/Modal";
import { Screen } from "@/components/Screen";
import { Typography } from "@/components/Typography";
import { scrollToTextarea } from "@/helpers/scrollToTextarea";
import { Stack } from "expo-router";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, YStack, TextArea, XStack, Circle } from "tamagui";

export default function Message() {
  const { t } = useTranslation("i-messages");

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
      <Screen headerProps={{ title: "Messages with 'I'" }}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            gap: "$md",
            flexGrow: 1,
            padding: "$lg",
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <Typography>Messages with "I"</Typography>

          <FormInput
            label={t("annoyance.label")}
            placeholder={t("annoyance.placeholder")}
            ref={annoyanceRef}
            onFocus={() => handleFocus(annoyanceRef)}
            infoMessage={t("annoyance.example")}
            onInfoMessagePress={() =>
              handleInfoModalOpen(t("annoyance.example"))
            }
          />
          <FormInput
            label={t("i-feel.label")}
            placeholder={t("i-feel.placeholder")}
            ref={feelRef}
            onFocus={() => handleFocus(feelRef)}
            infoMessage={t("i-feel.example")}
            onInfoMessagePress={() => handleInfoModalOpen(t("i-feel.example"))}
          />
          <FormInput
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

const TextInput = React.forwardRef<
  React.ElementRef<typeof TextArea>,
  React.ComponentProps<typeof TextArea>
>((props, ref) => {
  const errorMessage = "";
  const errorStyle = errorMessage ? { borderColor: "$tomato9" } : {};
  return (
    <YStack gap="$sm">
      <TextArea
        ref={ref}
        size="$4"
        focusStyle={{ borderColor: "$blue9" }}
        {...errorStyle}
      />
      {errorMessage && (
        <Typography color="$tomato11" preset="helper">
          {errorMessage}
        </Typography>
      )}
    </YStack>
  );
});

type FormInputProps = {
  label: string;
  placeholder: string;
  infoMessage?: string;
  onInfoMessagePress?: () => void;
};

const FormInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  FormInputProps & React.ComponentProps<typeof TextInput>
>(({ label, placeholder, infoMessage, onInfoMessagePress, ...props }, ref) => {
  return (
    <>
      <YStack gap="$sm">
        <XStack justifyContent="space-between" gap="$md">
          <Typography flex={1}>{label}</Typography>
          {infoMessage && (
            <XStack
              padding="$sm"
              margin={-12}
              alignSelf="flex-start"
              onPress={onInfoMessagePress}
              pressStyle={{ opacity: 0.5 }}
            >
              <Icon icon="info" width={16} height={16} color="$blue11" />
            </XStack>
          )}
        </XStack>
        <TextInput ref={ref} placeholder={placeholder} {...props} />
      </YStack>
    </>
  );
});
