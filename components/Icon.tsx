import * as React from 'react';
import { styled, XStack, XStackProps } from 'tamagui';
import { SvgProps } from 'react-native-svg';
import Puzzle from '../assets/icons/tabs/puzzle.svg';
import Chart from '../assets/icons/tabs/chart.svg';
import ChevronLeft from '../assets/icons/chevron-left.svg';
import ChevronRight from '../assets/icons/chevron-right.svg';
import Heart from '../assets/icons/heart.svg';
import Screen from '../assets/icons/screen.svg';
import Plus from '../assets/icons/plus.svg';
import Minus from '../assets/icons/minus.svg';
import MenuAlt2 from '../assets/icons/menu-alt-2.svg';
import X from '../assets/icons/x.svg';
import Settings from '../assets/icons/settings.svg';
import User from '../assets/icons/user.svg';
import House from '../assets/icons/tabs/house.svg';
import OpenBook from '../assets/icons/tabs/book-open.svg';
import SolidHeart from '../assets/icons/tabs/solid-heart.svg';
import Info from '../assets/icons/info.svg';
import ArrowLeft from '../assets/icons/arrow-left.svg';
import ArrowRight from '../assets/icons/arrow-right.svg';
import ArrowUpOnSquare from '../assets/icons/arrow-up-on-square.svg';
import Lifeboat from '../assets/icons/lifeboat.svg';
import Angry from '../assets/icons/angry.svg';
import CircleSlash from '../assets/icons/circle-slash.svg';
import CloudDrizzle from '../assets/icons/cloud-drizzle.svg';
import Unplug from '../assets/icons/unplug.svg';
import UsersRound from '../assets/icons/users-round.svg';
import Zap from '../assets/icons/zap.svg';
import ChatBubble from '../assets/icons/chat-bubble.svg';
import Bike from '../assets/icons/bike.svg';
import Clock from '../assets/icons/clock.svg';
import Clipboard from '../assets/icons/clipboard.svg';
import Calendar from '../assets/icons/calendar.svg';
import Check from '../assets/icons/check.svg';
import MusicalNote from '../assets/icons/musical-note.svg';
import ExclamationCircle from '../assets/icons/exclamation-circle.svg';
import SolidPhoto from '../assets/icons/solid-photo.svg';
import Tv from '../assets/icons/tv.svg';
import Tasks from '../assets/icons/tasks.svg';
import Book from '../assets/icons/book.svg';
import Star from '../assets/icons/star.svg';
import StarFilled from '../assets/icons/star-filled.svg';
import Photo from '../assets/icons/photo.svg';
import Music from '../assets/icons/music.svg';
import Language from '../assets/icons/language.svg';

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
  chevronRight: ChevronRight,
  heart: Heart,
  screen: Screen,
  plus: Plus,
  minus: Minus,
  menuAlt2: MenuAlt2,
  x: X,
  settings: Settings,
  user: User,
  info: Info,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUpOnSquare: ArrowUpOnSquare,
  lifeboat: Lifeboat,
  angry: Angry,
  circleSlash: CircleSlash,
  cloudDrizzle: CloudDrizzle,
  unplug: Unplug,
  usersRound: UsersRound,
  zap: Zap,
  chatBubble: ChatBubble,
  bike: Bike,
  clock: Clock,
  clipboard: Clipboard,
  calendar: Calendar,
  check: Check,
  musicalNote: MusicalNote,
  exclamationCircle: ExclamationCircle,
  solidPhoto: SolidPhoto,
  tv: Tv,
  tasks: Tasks,
  book: Book,
  star: Star,
  starFilled: StarFilled,
  photo: Photo,
  music: Music,
  language: Language,
};

interface IconProps extends XStackProps {
  icon: string;
  color?: string;
  width: number;
  height: number;
}

const IconComponent = React.forwardRef((props: IconProps, ref: React.ForwardedRef<any>) => {
  const { icon, color = 'black', width, height, ...wrapperProps } = props;

  const IconSvg = iconRegistry[icon];

  if (!IconSvg) {
    console.warn(`Icon "${icon}" not found in registry`);
    return null;
  }

  return (
    <XStack ref={ref} justifyContent='center' alignItems='center' {...wrapperProps}>
      <IconSvg color={color} width={width} height={height} />
    </XStack>
  );
});

export const Icon = styled(
  IconComponent,
  {},
  {
    accept: {
      color: 'color',
    },
  }
);
