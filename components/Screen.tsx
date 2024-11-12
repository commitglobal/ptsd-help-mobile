import React, { useMemo } from "react";
import { YStack, YStackProps } from "tamagui";
import { Header, HeaderProps } from "./Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";

interface ScreenProps extends YStackProps {
  children: React.ReactNode;
  headerProps?: HeaderProps;
  contentContainerStyle?: YStackProps;
}

export const Screen = ({
  children,
  headerProps,
  contentContainerStyle,
}: ScreenProps) => {
  const insets = useSafeAreaInsets();
  const isIos = useMemo(() => Platform.OS === "ios", []);

  // if we don't have a header and we set a background color for the contentContainer, we need to set that backgroundColor to the parent YStack container that adds the insetsTop as well
  const backgroundColor =
    !headerProps && contentContainerStyle?.backgroundColor
      ? contentContainerStyle.backgroundColor
      : undefined;

  return (
    <YStack
      paddingTop={headerProps ? 0 : insets.top}
      flex={1}
      backgroundColor={backgroundColor}
    >
      {headerProps && <Header {...headerProps} />}

      <KeyboardAvoidingView
        behavior={isIos ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <YStack {...contentContainerStyle} flex={1} flexGrow={1}>
          {children}
        </YStack>
      </KeyboardAvoidingView>
    </YStack>
  );
};
