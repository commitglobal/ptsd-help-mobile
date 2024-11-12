import React from 'react';
import { useRouter } from 'expo-router';
import { ScreenWithChangingText } from '@/components/ScreenWithChangingText';
import { useTranslation } from 'react-i18next';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';

export default function Relationships() {
  const router = useRouter();
  const { t } = useTranslation('relationships');

  const { finishTool } = useToolManagerContext();

  console.log('🚀 Relationships');

  const strategies = [
    {
      id: '1',
      text: 'Do something together to help the community!',
    },
    {
      id: '2',
      text: 'Go for a walk or exercise together!',
    },
    {
      id: '3',
      text: 'Prepare a delicious meal and have fun in the kitchen!',
    },
    {
      id: '4',
      text: 'Organize a fun board game night!',
    },
    {
      id: '5',
      text: 'Read and discuss the same book together!',
    },
    {
      id: '6',
      text: 'Work together on an art or DIY project!',
    },
    {
      id: '7',
      text: 'Plan a mini-vacation together to explore new places!',
    },
    {
      id: '8',
      text: 'Take care of a garden or plant flowers together!',
    },
    {
      id: '9',
      text: 'Organize a movie night at home with favorite films!',
    },
    {
      id: '10',
      text: 'Learn a new dance style together!',
    },
  ];

  return (
    <ScreenWithChangingText
      staticText={t('helper')}
      items={strategies}
      imageUrl="https://plus.unsplash.com/premium_vector-1730376548370-6371f7576b4c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      onBackButtonPress={() => router.back()}
      mainActionButtonLabel={t('done')}
      onMainActionButtonPress={() => finishTool()}
    />
  );
}
