import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";

import React from "react";
import { Screen } from "@/components/Screen";
import { Typography } from "@/components/Typography";
import { Input, ScrollView } from "tamagui";
import { DrawerActions, useNavigation } from "@react-navigation/native";


export default function Play() {
  const navigation = useNavigation();

  return (
    <Screen
      headerProps={{
        title: "Screen with header",
        titleProps: { color: "white" },
        statusBarStyle: "light",
        iconLeft: <Icon icon="menuAlt2" color="white" />,
        onLeftPress: () => navigation.dispatch(DrawerActions.openDrawer),
        iconRight: <Icon icon="heart" color="white" />,
        onRightPress: () => {
          console.log("right pressed");
        },
      }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "$blue3" }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      ></ScrollView>
    </Screen>
  );
}
