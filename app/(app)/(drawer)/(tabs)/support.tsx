import { Screen } from '@/components/Screen';
import { YStack } from 'tamagui';
import { Icon } from '@/components/Icon';
import { ListCard } from '@/components/ListCard';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import { getLocalContentFilePath } from '@/services/content/content.helper';

export default function Support() {
  const { supportContent } = useAssetsManagerContext();
  return (
    <Screen
      headerProps={{
        title: supportContent.title,
        iconRight: <Icon icon='info' color='white' width={24} height={24} />,
      }}>
      <FlashList
        bounces={false}
        data={supportContent.pages}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListCard
            key={item.id}
            item={{ ...item, icon: getLocalContentFilePath(item.icon) }}
            onPress={() => {
              console.log('🚀 ~ Support ~ item:', item);
              if (item.type === 'category') {
                router.push({ pathname: '/content/category', params: { type: 'support', pageId: item.id } });
              } else {
                router.push({ pathname: '/content/topic', params: { type: 'support', topicId: item.id } });
              }
            }}
          />
        )}
        ItemSeparatorComponent={() => <YStack height={8} />}
        estimatedItemSize={80}
      />
    </Screen>
  );
}
