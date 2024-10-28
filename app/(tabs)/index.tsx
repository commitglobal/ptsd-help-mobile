import { Image, StyleSheet, Platform } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Separator, SizableText, XStack, YStack } from "tamagui";
import React from "react";
import { Icon } from "../../components/Icon";
import Button from "@/components/Button";
import { Typography } from "@/components/Typography";
import { Card } from "@/components/Card";

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
      <Typography preset="heading">Typography</Typography>
      <Typography preset="subheading">Subheading</Typography>
      <Typography preset="default">Default</Typography>
      <Typography preset="helper">Helper</Typography>

      <Separator />

      {/* icons example */}
      <Typography preset="subheading">Icons</Typography>
      <XStack gap="$4">
        <Icon icon="puzzle" width={24} height={24} color="$blue6" />
        <Icon icon="puzzle" width={24} height={24} color="$orange6" />
        <Icon icon="puzzle" width={24} height={24} color="$orange6" />

        <Icon icon="chart" width={24} height={24} color="$orange11" />
      </XStack>

      <Separator />

      {/* buttons */}
      <YStack gap="$4">
        <Typography preset="subheading">Buttons</Typography>
        <Button>Primary</Button>
        <Button disabled>Primary disabled</Button>
        <Button preset="secondary">Secondary</Button>
        <Button preset="secondary" disabled>
          Secondary disabled
        </Button>
        <Button preset="outlined">Outlined</Button>
        <Button preset="outlined" disabled>
          Outlined disabled
        </Button>

        <Button preset="chromeless">Chromeless</Button>
        <Button preset="chromeless" disabled>
          Chromeless disabled
        </Button>
      </YStack>

      {/* card */}
      <Card
        padding="$md"
        height={100}
        cardFooter={<Typography preset="helper">Card footer</Typography>}
      >
        <Typography preset="heading">Card</Typography>
      </Card>
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
