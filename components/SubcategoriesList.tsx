import { FlashList } from '@shopify/flash-list';
import { ListCard } from './ListCard';
import { YStack } from 'tamagui';
import { Tool } from '@/hooks/useTools';

const SubcategoriesList = ({
  subcategories,
  onSelect,
}: {
  subcategories: Tool[];
  onSelect: (subcategory: Tool) => void;
}) => {
  return (
    <FlashList
      bounces={false}
      data={subcategories}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ListCard key={item.id} item={item} onPress={() => onSelect(item)} />}
      ItemSeparatorComponent={() => <YStack height={8} />}
      estimatedItemSize={80}
    />
  );
};

export default SubcategoriesList;
