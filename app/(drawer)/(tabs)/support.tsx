import React, { useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { Screen } from "@/components/Screen";
import { Typography } from "@/components/Typography";
import { Icon } from "@/components/Icon";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import i18n from "@/common/config/i18n";
import { XStack, YStack } from "tamagui";
import { RadioItem } from "@/components/RadioItem";
import Button from "@/components/Button";

export default function Support() {
  const { t } = useTranslation(["choose-language", "languages"]);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const languagesArray = useMemo(
    () => i18n.languages || ["en"],
    [i18n.languages]
  );
  const languages = languagesArray.map((language) => ({
    id: language,
    label: t(`${language}`, { ns: "languages" }),
  }));

  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    languages[0].id
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
        data={languages}
        renderItem={({ item }) => (
          <RadioItem
            item={item}
            selectedItem={selectedLanguage}
            onSelectItem={setSelectedLanguage}
          />
        )}
        estimatedItemSize={60}
      />

      <XStack padding="$md" paddingBottom={insets.bottom + 16}>
        <Button flex={1}>{t("next")}</Button>
      </XStack>
    </Screen>
  );
}
