import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Stack } from "expo-router";
import { YStack } from "tamagui";
import { Header, HeaderProps } from "./Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerProps: HeaderProps;
}>;

export default function ScreenWithParallaxImageHeader({
  children,
  headerProps,
  headerImage,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const insets = useSafeAreaInsets();

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, HEADER_HEIGHT / 1.5], [0, 1]),
    };
  });

  return (
    <YStack flex={1} backgroundColor="$gray2" paddingBottom={insets.bottom}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          header: () => (
            <Animated.View style={headerAnimatedStyle}>
              <Header {...headerProps} />
            </Animated.View>
          ),
        }}
      />
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 16,
        }}
      >
        <Animated.View style={[styles.imageHeader, imageAnimatedStyle]}>
          {headerImage}
        </Animated.View>
        <YStack flex={1} padding="$lg" gap="$md" overflow="hidden" backgroundColor="$gray2">
          {children}
        </YStack>
      </Animated.ScrollView>
    </YStack>
  );
}

const styles = StyleSheet.create({
  imageHeader: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
});
