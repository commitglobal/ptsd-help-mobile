import { Screen } from '@/components/Screen';
import { YStack } from 'tamagui';
import { Icon } from '@/components/Icon';
import { ListCard } from '@/components/ListCard';
import { FlashList } from '@shopify/flash-list';
import { router, useLocalSearchParams } from 'expo-router';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import { useMemo } from 'react';
import { Typography } from '@/components/Typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LearnCategory() {
  const { type, pageId } = useLocalSearchParams<{ type: 'learn' | 'support'; pageId: string }>();
  const insets = useSafeAreaInsets();

  const { learnContent, supportContent } = useAssetsManagerContext();

  const page = useMemo(() => {
    const contentManager = type === 'learn' ? learnContent : supportContent;
    return contentManager.pages.find((page) => page.id === pageId);
  }, [learnContent, supportContent, type, pageId]);

  if (!pageId) {
    return <Typography>PageId not passed as params</Typography>;
  }

  if (page?.type !== 'category') {
    return <Typography>Page is not a category</Typography>;
  }

  return (
    <Screen
      headerProps={{
        title: page.label,
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}>
      <FlashList
        bounces={false}
        data={page?.topics}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListCard
            key={item.id}
            item={item}
            onPress={() => {
              router.push({
                pathname: '/content/topic',
                params: { type, categoryId: pageId, topicId: item.id },
              });
            }}
          />
        )}
        ItemSeparatorComponent={() => <YStack height={8} />}
        estimatedItemSize={80}
      />
    </Screen>
  );
}
