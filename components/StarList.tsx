import React from 'react';
import { FlashList } from '@shopify/flash-list';
import { YStack } from 'tamagui';

import { StarListCard } from '@/components/StarListCard';

export interface StarListItem {
  id: string;
  label: string;
  favorite: boolean;
}

interface StarListProps {
  items: StarListItem[];

  listHeaderComponent?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ComponentType<any>
    | null
    | undefined;

  update: (updatedItems: StarListItem) => void;
}

export default function StarList({ items, listHeaderComponent, update }: StarListProps) {
  return (
    <>
      <FlashList
        ListHeaderComponent={listHeaderComponent}
        bounces={false}
        data={items}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <StarListCard item={item} onUpdate={update} />}
        ItemSeparatorComponent={() => <YStack height={8} />}
        estimatedItemSize={60}
      />
    </>
  );
}
