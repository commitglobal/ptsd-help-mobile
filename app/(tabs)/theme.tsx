import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";
import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { XStack, YStack } from "@tamagui/stacks";
import { SizableText } from "tamagui";

const colors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Theme</ThemedText>
      </ThemedView>

      <Collapsible title="Blue">
        <XStack gap="$4" borderColor="$blue11" flexWrap="wrap">
          {colors.map((color) => (
            <YStack
              key={color}
              width="$4"
              height="$4"
              backgroundColor={`$blue${color}`}
              borderRadius="$4"
              justifyContent="center"
              alignItems="center"
            >
              <SizableText>{`${color}`}</SizableText>
            </YStack>
          ))}
        </XStack>
      </Collapsible>

      <Collapsible title="Orange">
        <XStack gap="$4" borderColor="$orange11" flexWrap="wrap">
          {colors.map((color) => (
            <YStack
              key={color}
              width="$4"
              height="$4"
              backgroundColor={`$orange${color}`}
              borderRadius="$4"
              justifyContent="center"
              alignItems="center"
            >
              <SizableText>{`${color}`}</SizableText>
            </YStack>
          ))}
        </XStack>
      </Collapsible>

      <Collapsible title="Gray">
        <XStack gap="$4" borderColor="$gray11" flexWrap="wrap">
          {colors.map((color) => (
            <YStack
              key={color}
              width="$4"
              height="$4"
              backgroundColor={`$gray${color}`}
              borderRadius="$4"
              justifyContent="center"
              alignItems="center"
            >
              <SizableText>{`${color}`}</SizableText>
            </YStack>
          ))}
        </XStack>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
