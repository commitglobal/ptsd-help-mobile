import React, { useCallback, useMemo, useState } from "react";
import { Screen } from "@/components/Screen";
import { Icon } from "@/components/Icon";
import { useTranslation } from "react-i18next";
import { ListCard } from "@/components/ListCard";
import { FlashList } from "@shopify/flash-list";
import { Spinner, YStack } from "tamagui";
import ScreenTabs from "@/components/ScreenTabs";
import { favorites, symptoms, tools } from "@/mocks/mocks";
import { useRouter } from "expo-router";

const SymptomsList = () => {
  const router = useRouter();
  return (
    <FlashList
      bounces={false}
      data={symptoms}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <ListCard
          key={item.id}
          item={item}
          onPress={() =>
            router.push({
              pathname: "/(tools)/distress-meter",
              params: {
                onMainActionNavigateTo: "/(tools)/relationships",
                onSecondaryActionNavigateTo: "/(tools)/relationships",
              },
            })
          }
        />
      )}
      ItemSeparatorComponent={() => <YStack height={8} />}
      estimatedItemSize={80}
    />
  );
};

const ToolsList = () => {
  return (
    <FlashList
      bounces={false}
      data={tools}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ListCard key={item.id} item={item} />}
      ItemSeparatorComponent={() => <YStack height={8} />}
      estimatedItemSize={80}
    />
  );
};

const FavoritesList = () => {
  return (
    <FlashList
      bounces={false}
      data={favorites}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ListCard key={item.id} item={item} />}
      ItemSeparatorComponent={() => <YStack height={8} />}
      estimatedItemSize={80}
    />
  );
};

export default function Manage() {
  const { t } = useTranslation("manage");
  const tabs = useMemo(
    () => [
      { id: "symptoms", label: t("symptoms") },
      { id: "tools", label: t("tools") },
      { id: "favorites", label: t("favorites") },
    ],
    [t]
  );
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);
  const [isLoading, setIsLoading] = useState(false);

  const renderList = useCallback(() => {
    if (isLoading) {
      return (
        <YStack flex={1} justifyContent="center" alignItems="center">
          <Spinner />
        </YStack>
      );
    }
    switch (selectedTabId) {
      case "symptoms":
        return <SymptomsList />;
      case "tools":
        return <ToolsList />;
      case "favorites":
        return <FavoritesList />;
    }
  }, [selectedTabId, isLoading]);

  const handleTabChange = useCallback((tabId: string) => {
    setIsLoading(true);
    setSelectedTabId(tabId);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Screen
      headerProps={{
        title: t("title"),
        iconRight: <Icon icon="info" color="white" width={24} height={24} />,
      }}
    >
      {/* don't add this as ListHeaderComponent, because it messes up the animation */}
      <ScreenTabs
        tabs={tabs}
        selectedTabId={selectedTabId}
        setSelectedTabId={handleTabChange}
      />
      {renderList()}
    </Screen>
  );
}
