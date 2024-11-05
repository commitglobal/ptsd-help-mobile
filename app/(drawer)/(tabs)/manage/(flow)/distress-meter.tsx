import { Screen } from "@/components/Screen";
import { Typography } from "@/components/Typography";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { DistressMeter as DistressMeterComponent } from "@/components/DistressMeter";
import { Icon } from "@/components/Icon";
import { ScrollView, YStack } from "tamagui";
import Button from "@/components/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { CrisisSheet } from "@/components/CrisisSheet";

const DistressMeter = () => {
  const router = useRouter();
  const { isInitial } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation("distress-meter");

  const { onMainActionNavigateTo, onSecondaryActionNavigateTo } =
    useLocalSearchParams<{
      onMainActionNavigateTo?: string;
      onSecondaryActionNavigateTo?: string;
    }>();

  const [stressValue, setStressValue] = useState(5);
  const [crisisSheetOpen, setCrisisSheetOpen] = useState(false);

  const handleMainAction = () => {
    if (stressValue >= 9 && isInitial) {
      return setCrisisSheetOpen(true);
    }
    if (onMainActionNavigateTo) {
      router.push({ pathname: onMainActionNavigateTo as any });
    }
    return;
  };

  const handleSecondaryAction = () => {
    if (onSecondaryActionNavigateTo) {
      router.push({ pathname: onSecondaryActionNavigateTo as any });
    }
    return;
  };

  return (
    <>
      <Screen
        headerProps={{
          title: t("header-title"),
          iconLeft: (
            <Icon icon="chevronLeft" color="white" width={24} height={24} />
          ),
          onLeftPress: () => router.back(),
          iconRight: <Icon icon="info" color="white" width={24} height={24} />,
        }}
      >
        <ScrollView
          contentContainerStyle={{ padding: 24, gap: 32, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <YStack gap="$xxs">
            <Typography textAlign="center">{t("title")}</Typography>
            <Typography textAlign="center" preset="helper">
              {t("scale", { min: 0, max: 10 })}
            </Typography>
            <Typography textAlign="center" preset="helper">
              {t("subtitle")}
            </Typography>
          </YStack>

          <DistressMeterComponent
            stressValue={stressValue}
            setStressValue={setStressValue}
          />
        </ScrollView>

        <YStack
          paddingHorizontal="$md"
          paddingTop={insets.top + 16}
          gap="$xs"
          paddingBottom="$md"
        >
          <Button onPress={handleMainAction}>{t("actions.start")}</Button>
          {onSecondaryActionNavigateTo && (
            <Button preset="secondary" onPress={handleSecondaryAction}>
              {t("actions.skip")}
            </Button>
          )}
        </YStack>
      </Screen>
      {crisisSheetOpen && (
        <CrisisSheet
          setCrisisSheetOpen={setCrisisSheetOpen}
          onContinueToTool={() => {
            router.push({ pathname: onMainActionNavigateTo as any });
            setCrisisSheetOpen(false);
          }}
        />
      )}
    </>
  );
};

export default DistressMeter;
