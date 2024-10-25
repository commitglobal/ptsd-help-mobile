import * as React from "react";
import { styled, XStack, XStackProps } from "tamagui";
import { SvgProps } from "react-native-svg";
import Puzzle from "../assets/icons/tabs/puzzle.svg";
import Chart from "../assets/icons/tabs/chart.svg";
interface IconProps extends XStackProps {
  icon: string;
  color?: string;
  width?: number;
  height?: number;
}

type IconRegistry = {
  [key: string]: React.ComponentType<SvgProps>;
};

const iconRegistry: IconRegistry = {
  puzzle: Puzzle,
  chart: Chart,
};

const IconComponent = React.forwardRef(
  (props: IconProps, ref: React.Ref<typeof XStack>) => {
    const { icon, color = "black", width, height, ...wrapperProps } = props;

    const IconSvg = iconRegistry[icon];

    if (!IconSvg) {
      console.warn(`Icon "${icon}" not found in registry`);
      return null;
    }

    return (
      <XStack justifyContent="center" alignItems="center" {...wrapperProps}>
        <IconSvg color={color} width={width} height={height} />
      </XStack>
    );
  }
);

export const Icon = styled(
  IconComponent,
  {},
  {
    accept: {
      color: "color",
    },
  }
);
