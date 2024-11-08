import React from "react";
import { ScrollView } from "tamagui";
import { useWindowDimensions } from "react-native";
import { Typography } from "./Typography";
import { Icon } from "./Icon";
import { ItemProps } from "@/app/onboarding/onboarding-slider";

export const OnboardingScreen = ({ item }: { item: ItemProps }) => {
  const { width } = useWindowDimensions();

  return (
    <ScrollView
      //! this width is important for the pagination to work
      width={width}
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: "center",
        padding: "$md",
        paddingHorizontal: "$xl",
        gap: "$md",
        flexGrow: 1,
        marginTop: "$lg",
      }}
    >
      <Icon
        icon={item.icon || "solidHeart"}
        color="$blue11"
        width={100}
        height={100}
      />
      <Typography preset="heading" textAlign="center">
        {item.title}
      </Typography>
      <Typography textAlign="center">{item.description}</Typography>
    </ScrollView>
  );
};
