import { Image, StyleSheet, Platform } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { SizableText, XStack, YStack } from "tamagui";
import React from "react";
import { Icon } from "../../components/Icon";
import Button from "@/components/Button";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <SizableText size="$9" fontWeight="bold">
        Examples
      </SizableText>

      {/* icons example */}
      <SizableText size="$6" fontWeight="bold">
        Icons
      </SizableText>
      <XStack gap="$4">
        <Icon icon="puzzle" width={24} height={24} color="$blue6" />
        <Icon icon="puzzle" width={24} height={24} color="$orange6" />
        <Icon icon="puzzle" width={24} height={24} color="$orange6" />

        <Icon icon="chart" width={24} height={24} color="$orange11" />
      </XStack>

      <SizableText size="$6" fontWeight="bold">
        Buttons
      </SizableText>
      <Button>Primary</Button>
      <Button disabled>Primary disabled</Button>
      <Button preset="outlined">Outlined</Button>
      <Button preset="chromeless">Chromeless</Button>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
