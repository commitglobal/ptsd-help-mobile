import React from 'react';
import { useRouter } from 'expo-router';
import { ScreenWithChangingText } from '@/components/ScreenWithChangingText';
import { useTranslation } from 'react-i18next';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';

export default function Relationships() {
  const router = useRouter();

  const { t } = useTranslation('tools');
  const { finishTool } = useToolManagerContext();

  const items = t('relationships.tools.reconnect-with-partner.repeater', {
    returnObjects: true,
  }) as Record<string, { title: string; description: string }>;

  return (
    <ScreenWithChangingText
      staticText={t('relationships.tools.reconnect-with-partner.helper')}
      items={Object.values(items).map((item) => ({ ...item, id: item.title }))}
      imageUrl='https://plus.unsplash.com/premium_vector-1730376548370-6371f7576b4c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      onBackButtonPress={() => router.back()}
      onMainActionButtonPress={() => finishTool()}
    />
  );
}
