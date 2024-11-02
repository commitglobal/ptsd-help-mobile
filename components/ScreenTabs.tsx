import React, { useState } from "react";
import { XStack, YStack, YStackProps } from "tamagui";
import { Typography } from "./Typography";

const ScreenTabs = ({
  tabs,
  selectedTabId,
  setSelectedTabId,
  containerStyle,
}: {
  tabs: { id: string; label: string }[];
  selectedTabId: string;
  setSelectedTabId: (tabId: string) => void;
  containerStyle?: YStackProps;
}) => {
  const [containerWidth, setContainerWidth] = useState(0);

  return (
    <XStack
      justifyContent="space-between"
      marginHorizontal="$sm"
      paddingVertical="$sm"
      position="relative"
      onLayout={(e) => {
        setContainerWidth(e.nativeEvent.layout.width);
      }}
      {...containerStyle}
    >
      {/* animated tab indicator */}
      <YStack
        animation="quick"
        x={
          containerWidth
            ? (containerWidth / tabs.length) *
              tabs.findIndex((t) => t.id === selectedTabId)
            : 12 // 12 = horizontal margin of the container
        }
        position="absolute"
        top="$sm"
        bottom="$sm"
        width={`${100 / tabs.length}%`}
        backgroundColor="$blue7_50"
        borderRadius="$4"
      />

      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          tab={tab}
          isSelected={tab.id === selectedTabId}
          onPress={() => setSelectedTabId(tab.id)}
        />
      ))}
    </XStack>
  );
};

export default ScreenTabs;

const Tab = ({
  tab,
  isSelected,
  onPress,
}: {
  tab: { id: string; label: string };
  isSelected: boolean;
  onPress: () => void;
}) => {
  return (
    <YStack
      key={tab.id}
      flex={1}
      padding="$xxs"
      justifyContent="center"
      alignItems="center"
      gap="$2"
      borderRadius="$4"
      pressStyle={{
        opacity: 0.5,
      }}
      onPress={onPress}
    >
      <Typography
        color={isSelected ? "$blue11" : "black"}
        fontWeight="bold"
        textAlign="center"
        allowFontScaling={false}
      >
        {tab.label}
      </Typography>
    </YStack>
  );
};
