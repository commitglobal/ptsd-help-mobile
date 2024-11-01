import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { YStack, Image, XStack } from "tamagui";
import HeaderImageSkeletonLoader from "./HeaderImageSkeletonLoader";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Button from "./Button";
import { Icon } from "./Icon";

interface ScreenWithImageHeaderProps {
  children: React.ReactNode;
  imageUrl: string;
  onBackButtonPress?: () => void;
  onMainActionButtonPress?: () => void;
}

export const ScreenWithImageHeader = ({
  imageUrl,
  children,
  onBackButtonPress,
  onMainActionButtonPress,
}: ScreenWithImageHeaderProps) => {
  const insets = useSafeAreaInsets();
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();

  const hasButtons = onBackButtonPress || onMainActionButtonPress;

  return (
    <YStack flex={1} backgroundColor="white">
      <StatusBar style="dark" />

      {/* image container */}
      <YStack
        position="relative"
        width="100%"
        height={"35%"}
        shadowColor="black"
        shadowOffset={{ width: 0, height: 5 }}
        shadowOpacity={0.2}
        shadowRadius={8}
        elevation={5}
      >
        {!imageLoaded ? <HeaderImageSkeletonLoader /> : null}
        <Image
          source={{
            uri: imageUrl,
          }}
          width="100%"
          height="100%"
          objectFit="cover"
          opacity={imageLoaded ? 1 : 0}
          onLoadEnd={() => setImageLoaded(true)}
        />

        {insets.top > 0 && (
          <LinearGradient
            colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: insets.top + 50,
            }}
          />
        )}
      </YStack>

      {/* top actions */}
      {hasButtons ? (
        <XStack
          position="absolute"
          top={insets.top + 16}
          left={0}
          right={0}
          bottom={0}
          height={56}
          paddingHorizontal="$md"
          justifyContent="space-between"
        >
          {onBackButtonPress && (
            <Button
              preset="secondary"
              colorTheme="orange"
              icon={<Icon icon="chevronLeft" width={20} height={20} />}
              onPress={onBackButtonPress}
            ></Button>
          )}

          {onMainActionButtonPress && (
            <Button
              marginLeft="auto"
              preset="secondary"
              colorTheme="orange"
              onPress={onMainActionButtonPress}
            >
              Realizat
            </Button>
          )}
        </XStack>
      ) : null}

      {children}
    </YStack>
  );
};
