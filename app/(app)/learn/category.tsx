import { Screen } from '@/components/Screen';
import { YStack } from 'tamagui';
import { Icon } from '@/components/Icon';
import { ListCard } from '@/components/ListCard';
import { FlashList } from '@shopify/flash-list';
import { router, useLocalSearchParams } from 'expo-router';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import { useMemo } from 'react';
import { Typography } from '@/components/Typography';

export default function LearnCategory() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();

  const { learnContent } = useAssetsManagerContext();

  const category = useMemo(
    () => learnContent.categories.find((category) => category.id === categoryId),
    [learnContent, categoryId]
  );

  if (!categoryId) {
    return <Typography>CategoryId not passed as params</Typography>;
  }

  return (
    <Screen
      headerProps={{
        title: learnContent.title,
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}>
      <FlashList
        bounces={false}
        data={category?.topics}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListCard
            key={item.id}
            item={item}
            onPress={() => {
              router.push({ pathname: '/learn/topic', params: { categoryId, topicId: item.id } });
            }}
          />
        )}
        ItemSeparatorComponent={() => <YStack height={8} />}
        estimatedItemSize={80}
      />
    </Screen>
  );
}
