import { Icon } from "@/components/Icon";
import { Screen } from "@/components/Screen";
import { Typography } from "@/components/Typography";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { XStack, YStack } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { RadioItem } from "@/components/RadioItem";
import Button from "@/components/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChooseCountry = () => {
  const { t } = useTranslation("choose-country");
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState<string>("us");

  // todo: add countries
  const countriesArray = [
    "us", // United States
    "gb", // United Kingdom
    "ca", // Canada
    "fr", // France
    "de", // Germany
    "it", // Italy
    "es", // Spain
    "au", // Australia
    "jp", // Japan
    "br", // Brazil
    "in", // India
    "cn", // China
    "ru", // Russia
    "mx", // Mexico
    "za", // South Africa
  ];

  const countries = useMemo(
    () =>
      countriesArray.map((country) => ({
        id: country,
        label: t(`countries.${country}`),
        avatar: `https://flagcdn.com/256x192/${country}.png`,
      })),
    [countriesArray, t]
  );

  return (
    <Screen
      headerProps={{
        title: t("title"),
        iconLeft: (
          <Icon icon="chevronLeft" color="white" width={24} height={24} />
        ),
        onLeftPress: router.back,
      }}
      contentContainerStyle={{
        backgroundColor: "white",
      }}
    >
      <FlashList
        ListHeaderComponent={() => (
          <Typography textAlign="center" marginBottom="$md">
            {t("subtitle")}
          </Typography>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 24,
        }}
        bounces={false}
        ItemSeparatorComponent={() => <YStack height={16} />}
        data={countries}
        renderItem={({ item }) => (
          <RadioItem
            item={item}
            selectedItem={selectedCountry}
            onSelectItem={setSelectedCountry}
          />
        )}
        estimatedItemSize={60}
      />

      <XStack padding="$md" paddingBottom={insets.bottom + 16}>
        <Button
          flex={1}
          onPress={() => router.push("/onboarding/choose-language")}
        >
          {t("next")}
        </Button>
      </XStack>
    </Screen>
  );
};

export default ChooseCountry;
