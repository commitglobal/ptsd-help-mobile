import React, { useState } from "react";
import { Typography } from "./Typography";
import { ScreenWithImageHeader } from "./ScreenWithImageHeader";
import { ScrollView, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "./Button";
import { Icon } from "./Icon";
import { ScreenWithImageHeaderProps } from "./ScreenWithImageHeader";

interface ScreenWithChangingTextProps extends ScreenWithImageHeaderProps {
  staticText: string;
  items: { id: string; text: string }[];
  onExport?: () => void;
}

export const ScreenWithChangingText = ({
  staticText,
  items,
  imageUrl,
  onBackButtonPress,
  onExport,
  onMainActionButtonPress,
}: ScreenWithChangingTextProps) => {
  const insets = useSafeAreaInsets();

  const [renderedItem, setRenderedItem] = useState(items[0]);

  const handleNextItem = () => {
    const currentIndex = items.findIndex((item) => item.id === renderedItem.id);
    const nextIndex = (currentIndex + 1) % items.length;
    setRenderedItem(items[nextIndex]);
  };

  const handlePreviousItem = () => {
    const currentIndex = items.findIndex((item) => item.id === renderedItem.id);
    const previousIndex = (currentIndex - 1 + items.length) % items.length;
    setRenderedItem(items[previousIndex]);
  };

  return (
    <ScreenWithImageHeader
      imageUrl={imageUrl}
      onBackButtonPress={onBackButtonPress}
      onMainActionButtonPress={onMainActionButtonPress}
      footerComponent={
        <Footer
          onExport={onExport}
          onPreviousItem={handlePreviousItem}
          onNextItem={handleNextItem}
        />
      }
    >
      <Typography preset="helper">{staticText}</Typography>
      <Typography>{renderedItem.text}</Typography>
    </ScreenWithImageHeader>
  );
};

const Footer = ({
  onExport,
  onPreviousItem,
  onNextItem,
}: {
  onExport?: () => void;
  onPreviousItem?: () => void;
  onNextItem?: () => void;
}) => {
  const insets = useSafeAreaInsets();

  return (
    <XStack
      paddingBottom={insets.bottom + 16}
      paddingHorizontal="$md"
      justifyContent="center"
      gap="$md"
      flex={1}
    >
      {onExport && (
        <Button
          preset="secondary"
          onPress={onExport}
          colorTheme="orange"
          icon={
            <Icon
              icon="arrowUpOnSquare"
              width={24}
              height={24}
              color="$orange10"
            />
          }
        />
      )}

      <Button
        preset="secondary"
        colorTheme="orange"
        onPress={onPreviousItem}
        icon={
          <Icon icon="arrowLeft" width={24} height={24} color="$orange10" />
        }
      />
      <Button
        preset="secondary"
        colorTheme="orange"
        onPress={onNextItem}
        icon={
          <Icon icon="arrowRight" width={24} height={24} color="$orange10" />
        }
      />
    </XStack>
  );
};
