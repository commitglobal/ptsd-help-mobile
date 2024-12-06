import { Screen } from '@/components/Screen';
import { YStack } from 'tamagui';
import { Icon } from '@/components/Icon';
import { ListCard } from '@/components/ListCard';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

// TODOs:
// - Take icons, imagesSrc, save them in the device and save the JSON with the local paths

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
        data={learnContent.categories}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListCard
            key={item.id}
            item={item}
            onPress={() => {
              router.push({ pathname: '/learn/category', params: { categoryId: item.id } });
            }}
          />
        )}
        ItemSeparatorComponent={() => <YStack height={8} />}
        estimatedItemSize={80}
      />
    </Screen>
  );
}
