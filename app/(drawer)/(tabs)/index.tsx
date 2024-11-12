import { ScrollView, XStack } from "tamagui";
import React from "react";
import Button from "@/components/Button";
import { Typography } from "@/components/Typography";
import { Icon } from "@/components/Icon";
import { useRouter, useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { Screen } from "@/components/Screen";
import { DrawerActions } from "@react-navigation/native";
import { CircleHorizontalScrollView } from "@/components/CircleHorizontalScrollView";
import { MonthlyEvaluationCard } from "@/components/MonthlyEvaluationCard";
import { CardsHorizontalScrollView } from "@/components/CardsHorizontalScrollView";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation(["dashboard", "symptoms", "general"]);
  const router = useRouter();

  const feelings = [
    { label: t("trauma", { ns: "symptoms" }), icon: "zap" },
    { label: t("avoiding-triggers", { ns: "symptoms" }), icon: "circleSlash" },
    { label: t("disconnected-people", { ns: "symptoms" }), icon: "usersRound" },
    { label: t("disconnected-reality", { ns: "symptoms" }), icon: "unplug" },
    { label: t("sad-hopeless", { ns: "symptoms" }), icon: "cloudDrizzle" },
    { label: t("worried-anxious", { ns: "symptoms" }), icon: "lifeboat" },
    { label: t("angry", { ns: "symptoms" }), icon: "angry" },
  ];

  const questions = [
    { title: "What is PTSD?" },
    { title: "How long does PTSD last?" },
    { title: "Problems related to PTSD" },
    { title: "PTSD and relationships" },
  ];

  const favoriteInstruments = [
    { label: "Toolr 1", icon: "bike" },
    { label: "Tool 2", icon: "chatBubble" },
    { label: "Tool 3", icon: "bike" },
  ];

  return (
    <Screen
      headerProps={{
        title: t("ptsd-help", { ns: "general" }),
        iconLeft: <Icon icon="menuAlt2" width={24} height={24} color="white" />,
        onLeftPress: () => navigation.dispatch(DrawerActions.openDrawer),
        statusBarStyle: "light",
      }}
      contentContainerStyle={{
        backgroundColor: "white",
      }}
    >
      <ScrollView
        contentContainerStyle={{ padding: "$lg", gap: "$md", flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <XStack gap="$md" alignItems="center">
          <Typography preset="default" flex={1}>
            {t("feeling")}
          </Typography>
          <XStack
            //  margin and padding account for the pressArea
            marginVertical={-16}
            padding="$md"
            pressStyle={{
              opacity: 0.5,
            }}
            onPress={() =>
              router.push({
                pathname: "/manage",
                params: { tabId: "symptoms" },
              })
            }
          >
            <Typography preset="default" color="$blue11" fontWeight="bold">
              {t("see-all")}
            </Typography>
          </XStack>
        </XStack>

        <XStack marginHorizontal={-32}>
          {/* //todo: on press */}
          <CircleHorizontalScrollView items={feelings} onItemPress={() => { }} />
        </XStack>

        {/* monthly evaluation */}
        {/* //todo: on press */}
        <MonthlyEvaluationCard onPress={() => { }} />

        {/* learn about ptsd */}
        <XStack marginTop="$md">
          <Typography flex={1}>{t("learn")}</Typography>
          <Typography color="$blue11" fontWeight="bold">
            {t("see-all")}
          </Typography>
        </XStack>

        <XStack marginHorizontal={-32}>
          <CardsHorizontalScrollView items={questions} />
        </XStack>

        {/* favorite instruments */}

        <Typography marginTop="$md">{t("favorite-instruments")}</Typography>
        <XStack marginHorizontal={-32}>
          <CircleHorizontalScrollView
            items={favoriteInstruments}
            // todo: on press
            onItemPress={() => { }}
          />
        </XStack>

        <Button onPress={() => router.push("/onboarding/licence-agreement")}>
          Go to onboarding
        </Button>
        <Button onPress={() => router.push("/relationships/iMessages")}>
          Go to iMessages
        </Button>
        <Button onPress={() => router.push("/player")}>Go to player</Button>
        <Button onPress={() => router.push("/playlist")}>Go to playlist</Button>
      </ScrollView>
    </Screen>
  );
}
