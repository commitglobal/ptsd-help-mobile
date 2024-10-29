import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Icon } from "@/components/Icon";
import { useTheme } from "tamagui";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.blue11?.val || "hsl(192, 85.0%, 31.0%)",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => {
            return <Icon icon="puzzle" width={24} height={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="theme"
        options={{
          title: "Theme",
          tabBarIcon: ({ color }) => (
            <Icon icon="chart" width={24} height={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="play"
        options={{
          title: "Play",
          tabBarIcon: ({ color }) => (
            <Icon icon="chart" width={24} height={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="screen"
        options={{
          title: "Screen",
          tabBarIcon: ({ color }) => (
            <Icon icon="screen" width={24} height={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
