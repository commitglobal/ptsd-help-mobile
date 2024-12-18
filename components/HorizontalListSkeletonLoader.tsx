import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { FlatList } from 'react-native';
import { XStack } from 'tamagui';

const data = [1, 2, 3, 4, 5];

export const HorizontalListSkeletonLoader = () => {
  return (
    <MotiView
      from={{
        opacity: 0.5,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        type: 'timing',
      }}
      style={{
        width: '100%',
      }}>
      <FlatList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32 }}
        renderItem={() => <Skeleton colorMode='light' height={60} width={60} radius='round' />}
        ItemSeparatorComponent={() => <XStack width={32} />}
      />
    </MotiView>
  );
};
