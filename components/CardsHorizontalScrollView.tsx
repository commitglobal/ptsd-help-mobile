import React from 'react';
import { ScrollView, XStack } from 'tamagui';
import { Typography } from './Typography';
import { Icon } from './Icon';
import { useTranslation } from 'react-i18next';
import { Card } from './Card';

export const CardsHorizontalScrollView = ({ items }: { items: { title: string }[] }) => {
  const { t } = useTranslation('dashboard');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      gap='$md'
      contentContainerStyle={{ paddingHorizontal: 32, gap: 16 }}>
      {items.map((item) => (
        <Card
          key={item.title}
          padding='$md'
          gap='$md'
          minHeight={100}
          width={150}
          backgroundColor='$orange6_50'
          elevation={0}
          shadowColor='none'>
          <Typography>{item.title}</Typography>

          <XStack marginTop='auto' alignItems='center' gap='$xs'>
            <Typography>{t('dashboard.read', { ns: 'translation' })}</Typography>
            <Icon icon='arrowRight' width={16} height={16} color='$orange11' />
          </XStack>
        </Card>
      ))}
    </ScrollView>
  );
};
