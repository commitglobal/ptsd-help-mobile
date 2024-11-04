import React, { useState } from "react";
import { YStack, XStack, ScrollView } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { Icon } from "@/components/Icon";
import { useRouter } from "expo-router";
import { Typography } from "@/components/Typography";
import { ScreenWithImageHeader } from "@/components/ScreenWithImageHeader";

export default function Relationships() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);

  const strategies = [
    {
      id: 1,
      title: "Voluntariat împreună",
      description: "Faceți ceva împreună pentru a ajuta comunitatea!",
    },
    {
      id: 2,
      title: "Activități în aer liber",
      description: "Mergeți la plimbare sau faceți sport împreună!",
    },
    {
      id: 3,
      title: "Gătit împreună",
      description: "Pregătiți o masă delicioasă și distrați-vă în bucătărie!",
    },
    {
      id: 4,
      title: "Seară de jocuri",
      description: "Organizați o seară distractivă cu jocuri de societate!",
    },
    {
      id: 5,
      title: "Club de carte",
      description: "Citiți și discutați aceeași carte împreună!",
    },
    {
      id: 6,
      title: "Proiect creativ",
      description: "Lucrați împreună la un proiect artistic sau de bricolaj!",
    },
    {
      id: 7,
      title: "Excursie de weekend",
      description:
        "Planificați o mini-vacanță împreună pentru a explora locuri noi!",
    },
    {
      id: 8,
      title: "Grădinărit",
      description: "Îngrijiți împreună o grădină sau plantați flori!",
    },
    {
      id: 9,
      title: "Seară de film",
      description: "Organizați o seară de cinema acasă cu filme favorite!",
    },
    {
      id: 10,
      title: "Dans",
      description: "Învățați împreună un stil nou de dans!",
    },
  ];

  const [selectedStrategy, setSelectedStrategy] = useState(strategies[0]);

  const handleNextStrategy = () => {
    const currentIndex = strategies.findIndex(
      (s) => s.id === selectedStrategy.id
    );
    const nextIndex = (currentIndex + 1) % strategies.length;
    setSelectedStrategy(strategies[nextIndex]);
  };

  const handlePreviousStrategy = () => {
    const currentIndex = strategies.findIndex(
      (s) => s.id === selectedStrategy.id
    );
    const previousIndex =
      (currentIndex - 1 + strategies.length) % strategies.length;
    setSelectedStrategy(strategies[previousIndex]);
  };

  return (
    <ScreenWithImageHeader
      imageUrl="https://plus.unsplash.com/premium_vector-1730376548370-6371f7576b4c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      onBackButtonPress={() => router.back()}
      onMainActionButtonPress={() =>
        router.push({
          pathname: "/distress-meter",
          params: {
            onMainActionNavigateTo: "/(tabs)/manage",
          },
        })
      }
    >
      <YStack flex={1}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: "$md",
            gap: "$md",
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Typography preset="helper">
            Încearcă aceste strategii - fie pe cont propriu, fie, mai bine, cu
            partenerul tău!
          </Typography>

          <Typography preset="subheading">{selectedStrategy.title}</Typography>
          <Typography>{selectedStrategy.description}</Typography>
        </ScrollView>

        <XStack
          paddingBottom={insets.bottom + 16}
          paddingHorizontal="$md"
          justifyContent="center"
          gap="$md"
        >
          <Button
            preset="secondary"
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
          <Button
            preset="secondary"
            colorTheme="orange"
            onPress={handlePreviousStrategy}
            icon={
              <Icon icon="arrowLeft" width={24} height={24} color="$orange10" />
            }
          />
          <Button
            preset="secondary"
            colorTheme="orange"
            onPress={handleNextStrategy}
            icon={
              <Icon
                icon="arrowRight"
                width={24}
                height={24}
                color="$orange10"
              />
            }
          />
        </XStack>
      </YStack>
    </ScreenWithImageHeader>
  );
}
