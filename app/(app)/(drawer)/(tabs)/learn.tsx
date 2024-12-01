import { Screen } from '@/components/Screen';
import { YStack } from 'tamagui';
import { LearnContent } from '@/models/LearnContent.type';
import { Icon } from '@/components/Icon';
import { ListCard } from '@/components/ListCard';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { learnContentJSON } from '@/constants/learnTopics';

// TODOs:
// - Take icons, imagesSrc, save them in the device and save the JSON with the local paths

export default function Learn() {
  return (
    <Screen
      headerProps={{
        title: 'Learn',
        iconRight: <Icon icon='info' color='white' width={24} height={24} />,
      }}>
      <FlashList
        bounces={false}
        data={learnContentJSON.topics}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListCard
            key={item.id}
            item={item}
            onPress={() => {
              router.push(`/learn/${item.id}`);
            }}
          />
        )}
        ItemSeparatorComponent={() => <YStack height={8} />}
        estimatedItemSize={80}
      />
    </Screen>
  );
}
