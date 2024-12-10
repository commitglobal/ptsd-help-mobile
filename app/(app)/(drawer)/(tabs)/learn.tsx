import { Screen } from '@/components/Screen';
import { YStack } from 'tamagui';
import { Icon } from '@/components/Icon';
import { ListCard } from '@/components/ListCard';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

export default function Learn() {
  const { learnContent } = useAssetsManagerContext();
  return (
    <Screen
      headerProps={{
        title: learnContent.title,
        iconRight: <Icon icon='info' color='white' width={24} height={24} />,
      }}>
      <FlashList
        bounces={false}
        data={learnContent.pages}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListCard
            key={item.id}
            item={item}
            onPress={() => {
              if (item.type === 'category') {
                router.push({ pathname: '/content/category', params: { type: 'learn', pageId: item.id } });
              } else {
                router.push({ pathname: '/content/topic', params: { type: 'learn', topicId: item.id } });
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
