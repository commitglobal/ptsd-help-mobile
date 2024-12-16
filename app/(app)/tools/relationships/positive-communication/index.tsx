import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Icon } from '@/components/Icon';
import { ScreenWithChangingText } from '@/components/ScreenWithChangingText';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

const PositiveCommunication = () => {
  const { finishTool } = useToolManagerContext();
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();

  const items = t(toolsTranslationKeys.RELATIONSHIPS.subcategories.POSITIVE_COMMUNICATION.repeater, {
    returnObjects: true,
  }) as Record<string, { title: string; description: string }>;

  return (
    <ScreenWithChangingText
      staticText={t(toolsTranslationKeys.RELATIONSHIPS.subcategories.POSITIVE_COMMUNICATION.helper)}
      items={Object.values(items).map((item) => ({ ...item, id: item.title }))}
      imageUrl='https://plus.unsplash.com/premium_photo-1730988915408-209c1ab59554?q=80&w=3212&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      headerProps={{
        title: t(toolsTranslationKeys.RELATIONSHIPS.subcategories.POSITIVE_COMMUNICATION.title),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
        onLeftPress: () => router.back(),
      }}
      footerProps={{ onMainAction: () => finishTool() }}
    />
  );
};

export default PositiveCommunication;
