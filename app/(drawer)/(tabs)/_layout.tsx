import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Icon } from "@/components/Icon";
import { useTheme, XStack } from "tamagui";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const theme = useTheme();
  const { t } = useTranslation("tabs");
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.blue11?.val || "hsl(192, 85.0%, 31.0%)",
        headerShown: false,
        tabBarStyle: {
          height: insets.bottom + 56,
          backgroundColor: "white",
        },
        tabBarItemStyle: {
          marginBottom: 4,
          marginTop: 4,
        },
        tabBarAllowFontScaling: false,
        tabBarLabelStyle: {
          marginHorizontal: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("home"),
          tabBarIcon: ({ color }) => {
            return <Icon icon="house" width={24} height={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="manage"
        options={{
          title: t("manage"),
          tabBarIcon: ({ color }) => (
            <Icon icon="puzzle" width={24} height={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="track"
        options={{
          title: t("track"),
          tabBarIcon: ({ color }) => (
            <Icon icon="chart" width={24} height={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: t("learn"),
          tabBarIcon: ({ color }) => (
            <Icon icon="openBook" width={24} height={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: t("support"),
          tabBarIcon: ({ color }) => (
            <Icon icon="solidHeart" width={24} height={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
