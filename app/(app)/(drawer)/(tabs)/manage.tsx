import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import { ListCard } from '@/components/ListCard';
import { FlashList } from '@shopify/flash-list';
import { Spinner, YStack } from 'tamagui';
import ScreenTabs from '@/components/ScreenTabs';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { SymptomType, Tool, useSymptoms } from '@/hooks/useTools';

type SymptomListProps = {
  data: SymptomType[];
  onSymptomSelected: (symptom: SymptomType) => void;
};

type ToolListProps = {
  data: Tool[];
  onToolSelected: (tool: Tool) => void;
};

const Lists = {
  symptoms: ({ data, onSymptomSelected }: SymptomListProps) => {
    return (
      <FlashList
        bounces={false}
        data={data}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ListCard key={item.id} item={item} onPress={() => onSymptomSelected(item)} />}
        ItemSeparatorComponent={() => <YStack height={8} />}
        estimatedItemSize={80}
      />
    );
  },

  tools: ({ data, onToolSelected }: ToolListProps) => {
    return (
      <FlashList
        bounces={false}
        data={data}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ListCard key={item.id} item={item} onPress={() => onToolSelected(item)} />}
        ItemSeparatorComponent={() => <YStack height={8} />}
        estimatedItemSize={80}
      />
    );
  },

  favorites: ({ data, onToolSelected }: ToolListProps) => {
    return (
      <FlashList
        bounces={false}
        data={data}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ListCard key={item.id} item={item} onPress={() => onToolSelected(item)} />}
        ItemSeparatorComponent={() => <YStack height={8} />}
        estimatedItemSize={80}
      />
    );
  },
};

export default function Manage() {
  const { tabId } = useLocalSearchParams<{ tabId: keyof typeof Lists }>();
  const { t } = useTranslation('translation');
  const router = useRouter();
  const { startTool, TOOL_CONFIG } = useToolManagerContext();
  const { SYMPOTOMS_CONFIG, getRandomToolForSymptom } = useSymptoms();

  const tabs = useMemo(
    () => [
      { id: 'symptoms', label: t('manage.symptoms', { ns: 'translation' }) },
      { id: 'tools', label: t('manage.tools', { ns: 'translation' }) },
      { id: 'favorites', label: t('manage.favorites', { ns: 'translation' }) },
    ],
    [t]
  );

  const [selectedTabId, setSelectedTabId] = useState<keyof typeof Lists>(tabId || (tabs[0].id as keyof typeof Lists));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tabId) {
      setSelectedTabId(tabId);
    }
  }, [tabId]);

  const renderList = useCallback(() => {
    if (isLoading) {
      return (
        <YStack flex={1} justifyContent='center' alignItems='center'>
          <Spinner />
        </YStack>
      );
    }

    if (selectedTabId === 'symptoms') {
      const ListComponent = Lists[selectedTabId];
      return (
        <ListComponent
          data={Object.values(SYMPOTOMS_CONFIG).map((symptom) => {
            return {
              ...symptom,
              label: t(symptom.label, { ns: 'tools' }),
            };
          })}
          onSymptomSelected={(symptom) => {
            const randomTool = getRandomToolForSymptom(symptom);
            startTool(randomTool, `/manage?tabId=symptoms`);
          }}
        />
      );
    }

    const ListComponent = Lists[selectedTabId];
    return (
      <ListComponent
        data={Object.values(TOOL_CONFIG).map((tool) => {
          return {
            ...tool,
            label: t(tool.label, { ns: 'tools' }),
          };
        })}
        onToolSelected={(tool) => {
          startTool(tool, `/manage?tabId=tools`);
        }}
      />
    );
  }, [selectedTabId, isLoading, startTool]);

  const handleTabChange = useCallback(
    (tabId: string) => {
      setIsLoading(true);
      setSelectedTabId(tabId as keyof typeof Lists);
      router.setParams({ tabId });
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    },
    [router]
  );

  return (
    <Screen
      headerProps={{
        title: 'Manage',
        iconRight: <Icon icon='info' color='white' width={24} height={24} />,
      }}
      contentContainerStyle={{ backgroundColor: 'transparent' }}>
      <ScreenTabs
        tabs={tabs}
        selectedTabId={selectedTabId}
        setSelectedTabId={handleTabChange}
        containerStyle={{ backgroundColor: 'white' }}
      />

      {renderList()}
    </Screen>
  );
}
