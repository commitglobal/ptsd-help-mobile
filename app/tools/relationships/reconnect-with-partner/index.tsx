import React from 'react';
import { useRouter } from 'expo-router';
import { ScreenWithChangingText } from '@/components/ScreenWithChangingText';
import { useTranslation } from 'react-i18next';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import { Icon } from '@/components/Icon';

export default function ReconnectWithPartner() {
  const router = useRouter();

  const translationKey = TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.RECONNECT_WITH_PARTNER;
  const { t } = useTranslation('tools');
  const { finishTool } = useToolManagerContext();

  const items = t(TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.RECONNECT_WITH_PARTNER.repeater, {
    returnObjects: true,
  }) as Record<string, { title: string; description: string }>;

  return (
    <ScreenWithChangingText
      staticText={t(TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.RECONNECT_WITH_PARTNER.helper)}
      items={Object.values(items).map((item) => ({ ...item, id: item.title }))}
      imageUrl='https://plus.unsplash.com/premium_vector-1730376548370-6371f7576b4c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      headerProps={{
        title: t(translationKey.label),
        onLeftPress: () => router.back(),
        iconLeft: <Icon icon='chevronLeft' width={20} height={20} color='$gray12' />,
      }}
      footerProps={{ onMainAction: () => finishTool() }}
    />
  );
}