import Reactx from "react";
import { TextProps, XStack, XStackProps } from "tamagui";
import { Typography } from "./Typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export interface HeaderProps extends XStackProps {
  title?: string;
  titleProps?: TextProps;
  statusBarStyle?: "light" | "dark";
  iconLeft?: React.ReactNode;
  onLeftPress?: () => void;
  iconRight?: React.ReactNode;
  onRightPress?: () => void;
}

export const Header = ({
  title,
  titleProps,
  statusBarStyle = "light",
  iconLeft,
  onLeftPress,
  iconRight,
  onRightPress,
  ...rest
}: HeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <XStack
      paddingTop={insets.top}
      backgroundColor="$blue12"
      alignItems="center"
      {...rest}
    >
      <StatusBar style={statusBarStyle} />

      {/* left icon */}
      <XStack
        flex={0.2}
        paddingLeft="$md"
        paddingVertical="$md"
        justifyContent="flex-start"
        onPress={onLeftPress}
        pressStyle={onLeftPress ? { opacity: 0.5 } : {}}
      >
        {iconLeft || null}
      </XStack>

      {/* title */}
      <XStack
        flex={0.8}
        paddingVertical="$md"
        justifyContent="center"
        alignItems="center"
      >
        {title && (
          <Typography textAlign="center" color="white" {...titleProps}>
            {title}
          </Typography>
        )}
      </XStack>

      {/* right icon */}
      <XStack
        flex={0.2}
        paddingVertical="$md"
        paddingRight="$md"
        justifyContent="flex-end"
        onPress={onRightPress}
        pressStyle={onRightPress ? { opacity: 0.5 } : {}}
      >
        {iconRight || null}
      </XStack>
    </XStack>
  );
};
