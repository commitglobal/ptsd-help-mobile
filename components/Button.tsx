import React, { useMemo } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import {
  SizableText,
  SizableTextProps,
  Button as TamaguiButton,
  ButtonProps as TamaguiButtonProps,
  styled,
  useTheme,
} from "tamagui";

type PresetType = "default" | "secondary" | "outlined" | "chromeless";
export interface ButtonProps extends TamaguiButtonProps {
  children?: string;
  preset?: PresetType;
  style?: StyleProp<ViewStyle>;
  textStyle?: SizableTextProps;
  colorTheme?: "blue" | "orange";
}

/**
 * This component is a HOC over the Tamagui Button.
 * @param {ButtonProps} props - The props for the `Button` component.
 * @returns {JSX.Element} The rendered `Button` component.
 */
const Button = React.forwardRef((props: ButtonProps, _): JSX.Element => {
  const theme = useTheme();
  const {
    style: $styleOverride,
    children,
    textStyle,
    colorTheme = "blue",
    ...rest
  } = props;

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
            return theme[`${colorTheme}12`]?.val;
          case "outlined":
            return theme[`${colorTheme}8`]?.val;
          default:
            return theme[`${colorTheme}8`]?.val;
        }
      })(),
    };
  }, [presetType, theme]);

  // const $textStyles: TextStyle = useMemo(
  //   () => ({ ...$presetTextStyles }),
  //   [$presetTextStyles]
  // );

  const StyledButton = useMemo(
    () =>
      styled(TamaguiButton, {
        name: "StyledButton",
        borderRadius: 10,
        backgroundColor: `$${colorTheme}9`,
        disabledStyle: {
          backgroundColor: `$${colorTheme}5`,
        },
        pressStyle: {
          backgroundColor: `$${colorTheme}11`,
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
                backgroundColor: `$${colorTheme}3`,
                opacity: 0.8,
              },
              disabledStyle: {
                backgroundColor: `$${colorTheme}3`,
                opacity: 0.5,
              },
            },
            outlined: {
              borderWidth: 2,
              borderColor: `$${colorTheme}8`,
              backgroundColor: "white",
              pressStyle: {
                backgroundColor: `$${colorTheme}2`,
                opacity: 0.8,
                borderColor: `$${colorTheme}8`,
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
      {children && (
        <SizableText style={$presetTextStyles} {...textStyle}>
          {children}
        </SizableText>
      )}
    </StyledButton>
  );
});

export default Button;
