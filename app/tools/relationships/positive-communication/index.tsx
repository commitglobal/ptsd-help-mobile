import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import { Icon } from '@/components/Icon';
import { ScreenWithChangingText } from '@/components/ScreenWithChangingText';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

const PositiveCommunication = () => {
  const { finishTool } = useToolManagerContext();
  const { t } = useTranslation('tools');

  const items = t(TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.POSITIVE_COMMUNICATION.repeater, {
    returnObjects: true,
  }) as Record<string, { title: string; description: string }>;

  return (
    <ScreenWithChangingText
      staticText={t(TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.POSITIVE_COMMUNICATION.helper)}
      items={Object.values(items).map((item) => ({ ...item, id: item.title }))}
      imageUrl='https://plus.unsplash.com/premium_photo-1730988915408-209c1ab59554?q=80&w=3212&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      headerProps={{
        title: 'TODO: Title',
        iconLeft: <Icon icon='chevronLeft' width={20} height={20} color='$gray12' />,
        onLeftPress: () => router.back(),
      }}
      footerProps={{ onMainAction: () => finishTool() }}
    />
  );
};

export default PositiveCommunication;
