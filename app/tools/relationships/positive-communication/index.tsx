import { ScreenWithChangingText } from '@/components/ScreenWithChangingText';
import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'tamagui';

const PositiveCommunication = () => {
  const { finishTool } = useToolManagerContext();
  const { t } = useTranslation('tools');

  const items = t('relationships.tools.positive-communication.repeater', {
    returnObjects: true,
  }) as Record<string, { title: string; description: string }>;

  return (
    <ScreenWithChangingText
      staticText={t('relationships.tools.positive-communication.helper')}
      items={Object.values(items).map((item) => ({ ...item, id: item.title }))}
      imageUrl='https://plus.unsplash.com/premium_photo-1730988915408-209c1ab59554?q=80&w=3212&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      onBackButtonPress={() => router.back()}
      onMainActionButtonPress={() => finishTool()}
    />
  );
};

export default PositiveCommunication;
