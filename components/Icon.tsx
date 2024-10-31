import * as React from "react";
import { styled, XStack, XStackProps } from "tamagui";
import { SvgProps } from "react-native-svg";
import Puzzle from "../assets/icons/tabs/puzzle.svg";
import Chart from "../assets/icons/tabs/chart.svg";
import ChevronLeft from "../assets/icons/chevron-left.svg";
import Heart from "../assets/icons/heart.svg";
import Screen from "../assets/icons/screen.svg";
import Plus from "../assets/icons/plus.svg";
import Minus from "../assets/icons/minus.svg";
import MenuAlt2 from "../assets/icons/menu-alt-2.svg";
import X from "../assets/icons/x.svg";
import Settings from "../assets/icons/settings.svg";
import User from "../assets/icons/user.svg";
import InformationCircle from "../assets/icons/information-circle.svg";
import House from "../assets/icons/tabs/house.svg";
import OpenBook from "../assets/icons/tabs/book-open.svg";
import SolidHeart from "../assets/icons/tabs/solid-heart.svg";
import Info from "../assets/icons/info.svg";
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
  house: House,
  puzzle: Puzzle,
  chart: Chart,
  openBook: OpenBook,
  solidHeart: SolidHeart,
  chevronLeft: ChevronLeft,
  heart: Heart,
  screen: Screen,
  plus: Plus,
  minus: Minus,
  menuAlt2: MenuAlt2,
  x: X,
  settings: Settings,
  user: User,
  informationCircle: InformationCircle,
  info: Info,
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
