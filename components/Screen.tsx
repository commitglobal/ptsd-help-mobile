import React, { useMemo } from "react";
import { ScrollView, ScrollViewProps, YStack, YStackProps } from "tamagui";
import { Header, HeaderProps } from "./Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";

interface ScreenProps extends YStackProps {
  children: React.ReactNode;
  headerProps?: HeaderProps;
  scrollViewProps?: ScrollViewProps;
  contentContainerStyle?: YStackProps;
}

export const Screen = ({
  children,
  headerProps,
  paddingTop,
  padding,
  scrollViewProps,
  contentContainerStyle,
}: ScreenProps) => {
  const insets = useSafeAreaInsets();
  const isIos = useMemo(() => Platform.OS === "ios", []);

  return (
    <YStack paddingTop={headerProps ? 0 : insets.top} flex={1}>
      {headerProps && <Header {...headerProps} />}

      <KeyboardAvoidingView
        behavior={isIos ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <YStack {...contentContainerStyle} flex={1}>
          {children}
        </YStack>
      </KeyboardAvoidingView>
    </YStack>
  );
};
