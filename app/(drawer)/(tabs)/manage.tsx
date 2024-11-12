import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import { ListCard } from '@/components/ListCard';
import { FlashList } from '@shopify/flash-list';
import { Spinner, YStack } from 'tamagui';
import ScreenTabs from '@/components/ScreenTabs';
import { favorites, symptoms, tools } from '@/mocks/mocks';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Tool, TOOLS_REGISTRY_MOCK } from '@/mocks/tools';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';

const SymptomsList = () => {
  const router = useRouter();
  return (
    <FlashList
      bounces={false}
      data={symptoms}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <ListCard key={item.id} item={item} onPress={() => router.push('/tools')} />
      )}
      ItemSeparatorComponent={() => <YStack height={8} />}
      estimatedItemSize={80}
    />
  );
};

const ToolsList = ({ onToolSelected }: { onToolSelected: (tool: Tool) => void }) => {
  return (
    <FlashList
      bounces={false}
      data={Object.values(TOOLS_REGISTRY_MOCK)}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <ListCard key={item.id} item={item} onPress={() => onToolSelected(item)} />
      )}
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
  const { tabId } = useLocalSearchParams<{ tabId: 'symptoms' | 'tools' | 'favorites' }>();
  console.log('🚀 tabId', tabId);

  const { t } = useTranslation('manage');
  const tabs = useMemo(
    () => [
      { id: 'symptoms', label: t('symptoms') },
      { id: 'tools', label: t('tools') },
      { id: 'favorites', label: t('favorites') },
    ],
    [t],
  );

  const [selectedTabId, setSelectedTabId] = useState(tabId ? tabId : tabs[0].id);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSelectedTabId(tabId ? tabId : tabs[0].id);
  }, [tabId]);

  const { startTool } = useToolManagerContext();

  const renderList = useCallback(() => {
    if (isLoading) {
      return (
        <YStack flex={1} justifyContent="center" alignItems="center">
          <Spinner />
        </YStack>
      );
    }
    switch (selectedTabId) {
      case 'symptoms':
        return <SymptomsList />;
      case 'tools':
        return (
          <ToolsList
            onToolSelected={(tool) => {
              startTool(tool, `/manage?tabId=tools`);
            }}
          />
        );
      case 'favorites':
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
        title: t('title'),
        iconRight: <Icon icon="info" color="white" width={24} height={24} />,
      }}
    >
      {/* don't add this as ListHeaderComponent, because it messes up the animation */}
      <ScreenTabs tabs={tabs} selectedTabId={selectedTabId} setSelectedTabId={handleTabChange} />
      {renderList()}
    </Screen>
  );
}
