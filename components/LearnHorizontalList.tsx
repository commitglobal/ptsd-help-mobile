import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { Card } from './Card';
import { Typography } from './Typography';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { XStack } from 'tamagui';
import { Icon } from './Icon';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

export const LearnHorizontalList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { learnContent } = useAssetsManagerContext();
  const learnContentTopics = useMemo(() => {
    return learnContent.pages[0].type === 'category'
      ? learnContent.pages[0].topics.slice(0, 5).map((topic) => {
          return { title: topic.label, id: topic.id };
        })
      : [];
  }, [learnContent]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 32 }}
      data={learnContentTopics}
      ListEmptyComponent={() => <Typography preset='helper'>{t('common.no-learn-content')}</Typography>}
      renderItem={({ item }) => (
        <Card
          key={item.title}
          padding='$md'
          gap='$md'
          minHeight={100}
          width={150}
          backgroundColor='$orange6_50'
          elevation={0}
          shadowColor='none'
          onPress={() => {
            router.push({
              pathname: '/content/topic',
              params: { type: 'learn', categoryId: learnContent.pages[0].id, topicId: item.id },
            });
          }}>
          <Typography>{item.title}</Typography>

          <XStack marginTop='auto' alignItems='center' gap='$xs'>
            <Typography>{t('dashboard.read', { ns: 'translation' })}</Typography>
            <Icon icon='arrowRight' width={16} height={16} color='$orange11' />
          </XStack>
        </Card>
      )}
      ItemSeparatorComponent={() => <XStack width={8} />}
    />
  );
};
