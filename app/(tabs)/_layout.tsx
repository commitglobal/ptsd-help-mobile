import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Icon } from "@/components/Icon";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
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
    </Tabs>
  );
}
