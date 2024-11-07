import React, { useMemo } from "react";
import {
  Circle,
  ScrollView,
  useWindowDimensions,
  XStack,
  YStack,
} from "tamagui";
import { Typography } from "./Typography";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import { useRouter } from "expo-router";

export const OnboardingLastScreen = () => {
  const { width } = useWindowDimensions();
  const { t } = useTranslation("onboarding");
  const router = useRouter();

  const listItems = useMemo(
    () => [t("welcome.personalize.l1"), t("welcome.personalize.l2")],
    [t]
  );

  return (
    <ScrollView
      //! this width is important for the pagination to work
      width={width}
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: "$md",
        paddingBottom: "$xl",
        paddingHorizontal: "$xl",
        gap: "$md",
        flexGrow: 1,
        marginTop: "$lg",
      }}
    >
      <Typography preset="heading" textAlign="center">
        {t("welcome.title")}
      </Typography>
      <Typography>{t("welcome.description")}</Typography>

      <Typography preset="subheading">
        {t("welcome.personalize.title")}
      </Typography>
      {listItems.map((item) => (
        <XStack key={item} alignItems="center" gap="$sm">
          <Circle size={10} backgroundColor="$blue11" />
          <Typography>{item}</Typography>
        </XStack>
      ))}
      <Typography preset="helper">
        {t("welcome.personalize.modify_preferences")}
      </Typography>

      <YStack gap="$md" marginTop="auto">
        <Button
          preset="secondary"
          onPress={() => router.replace("/(drawer)/(tabs)")}
        >
          {t("welcome.actions.start")}
        </Button>
        {/* //todo: route to personalize screen */}
        <Button preset="secondary" onPress={() => {}}>
          {t("welcome.actions.personalize")}
        </Button>
      </YStack>
    </ScrollView>
  );
};
