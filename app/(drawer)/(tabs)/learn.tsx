import { Icon } from "@/components/Icon";
import { Screen } from "@/components/Screen";
import { Typography } from "@/components/Typography";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { XStack, YStack } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { RadioItem } from "@/components/RadioItem";
import Button from "@/components/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Learn = () => {
  const { t } = useTranslation("choose-country");
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [selectedLanguage, setSelectedLanguage] = useState<string>("us");

  // todo: add countries
  const countries = [
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
            item={{ id: item, label: t(`countries.${item}`) }}
            selectedItem={selectedLanguage}
            onSelectItem={setSelectedLanguage}
          />
        )}
        estimatedItemSize={100}
      />

      <XStack padding="$md" paddingBottom={insets.bottom + 16}>
        <Button flex={1}>{t("next")}</Button>
      </XStack>
    </Screen>
  );
};

export default Learn;
