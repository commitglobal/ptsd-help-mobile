import React, { useMemo } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import {
  SizableText,
  Button as TamaguiButton,
  ButtonProps as TamaguiButtonProps,
  styled,
  useTheme,
} from "tamagui";

type PresetType = "default" | "secondary" | "outlined" | "chromeless";
export interface ButtonProps extends TamaguiButtonProps {
  children: string;
  preset?: PresetType;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
}

/**
 * This component is a HOC over the Tamagui Button.
 * @param {ButtonProps} props - The props for the `Button` component.
 * @returns {JSX.Element} The rendered `Button` component.
 */
const Button = React.forwardRef((props: ButtonProps, _): JSX.Element => {
  const theme = useTheme();
  const { style: $styleOverride, children, textStyle, ...rest } = props;

  const presetType: PresetType = props.preset ?? "default";
  const $presetTextStyles = useMemo(() => {
    return {
      fontWeight: "700" as TextStyle["fontWeight"],
      color: (() => {
        switch (presetType) {
          case "default":
            return "white";
          case "secondary":
          case "chromeless":
            return theme.$gray12?.val;
          case "outlined":
            return theme.$blue8?.val;
          default:
            return theme.$blue8?.val;
        }
      })(),
    };
  }, [presetType, theme]);

  const $textStyles: TextStyle = useMemo(
    () => ({ ...$presetTextStyles, ...textStyle }),
    [$presetTextStyles, textStyle]
  );

  const StyledButton = useMemo(
    () =>
      styled(TamaguiButton, {
        name: "StyledButton",
        borderRadius: 10,
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
            secondary: {
              backgroundColor: "white",
              shadowColor: "$gray12",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 1,
              pressStyle: {
                backgroundColor: "$blue3",
                opacity: 0.8,
              },
              disabledStyle: {
                backgroundColor: "$blue3",
                opacity: 0.5,
              },
            },
            outlined: {
              borderWidth: 2,
              borderColor: "$blue8",
              backgroundColor: "white",
              pressStyle: {
                backgroundColor: "$blue2",
                opacity: 0.8,
                borderColor: "$blue8",
                color: "red",
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
                opacity: 0.5,
                borderColor: "transparent",
              },
              disabledStyle: {
                backgroundColor: "transparent",
                opacity: 0.5,
              },
            },
          },
        } as const,
      }),
    []
  );

  return (
    <StyledButton presets={presetType} style={$styleOverride} {...rest}>
      <SizableText style={$textStyles}>{children}</SizableText>
    </StyledButton>
  );
});

export default Button;
