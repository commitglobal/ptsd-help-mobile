import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import {
  SizableText,
  Button as TamaguiButton,
  ButtonProps as TamaguiButtonProps,
  styled,
  useTheme,
} from "tamagui";

type PresetType = "default" | "outlined" | "chromeless";
export interface ButtonProps extends TamaguiButtonProps {
  children: string;
  /**
   * Style overrides
   */
  style?: StyleProp<ViewStyle>;
  /**
   * One of the different types of button presets.
   */
  preset?: PresetType;
  /**
   * Optional styling for overriding presetType text styling
   */
  textStyle?: TextStyle;
}

/**
 * Button components which supports 3 initial presets: filled, outlined and chromeless
 * This component is a HOC over the Tamagui Button.
 * @param {ButtonProps} props - The props for the `Button` component.
 * @returns {JSX.Element} The rendered `Button` component.
 */
const Button = React.forwardRef((props: ButtonProps, _): JSX.Element => {
  const theme = useTheme();

  const { style: $styleOverride, children, textStyle, ...rest } = props;
  const presetType: PresetType = props.preset ?? "default";
  const $presetTextStyles = {
    color: presetType === "default" ? "white" : theme.$purple5?.val,
  };

  const $textStyles: TextStyle = { ...$presetTextStyles, ...textStyle };

  const StyledButton = styled(TamaguiButton, {
    name: "StyledButton",
    borderRadius: 24,
    backgroundColor: "$blue9",
    disabledStyle: {
      backgroundColor: "$blue5",
    },
    pressStyle: {
      backgroundColor: "$blue11",
      borderColor: "transparent",
      opacity: 0.8,
    },
    variants: {
      presets: {
        default: {},
        outlined: {
          borderWidth: 2,
          borderColor: "$blue9",
          backgroundColor: "white",
          pressStyle: {
            backgroundColor: "transparent",
            opacity: 0.8,
            borderColor: "$purple7",
          },
          disabledStyle: {
            backgroundColor: "transparent",
            opacity: 0.5,
          },
        },
        chromeless: {
          backgroundColor: "transparent",
          pressStyle: {
            backgroundColor: "transparent",
            opacity: 0.8,
            borderColor: "transparent",
          },
          disabledStyle: {
            backgroundColor: "transparent",
            opacity: 0.5,
          },
        },
      },
    } as const,
  });

  return (
    <StyledButton presets={presetType} style={$styleOverride} {...rest}>
      <SizableText style={$textStyles}>{children}</SizableText>
    </StyledButton>
  );
});

export default Button;
