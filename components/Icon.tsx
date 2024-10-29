import * as React from "react";
import { styled, XStack, XStackProps } from "tamagui";
import { SvgProps } from "react-native-svg";
import Puzzle from "../assets/icons/tabs/puzzle.svg";
import Chart from "../assets/icons/tabs/chart.svg";
import ChevronLeft from "../assets/icons/chevron-left.svg";
import Heart from "../assets/icons/heart.svg";
import Screen from "../assets/icons/screen.svg";
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
  chevronLeft: ChevronLeft,
  heart: Heart,
  screen: Screen,
};

const IconComponent = React.forwardRef(
  (props: IconProps, ref: React.Ref<typeof XStack>) => {
    const {
      icon,
      color = "black",
      width = 24,
      height = 24,
      ...wrapperProps
    } = props;

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
