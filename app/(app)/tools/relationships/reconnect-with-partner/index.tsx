import React from 'react';
import { useRouter } from 'expo-router';
import { ScreenWithChangingText } from '@/components/ScreenWithChangingText';
import { useTranslation } from 'react-i18next';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Icon } from '@/components/Icon';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

export default function ReconnectWithPartner() {
  const router = useRouter();
  const { toolsTranslationKeys } = useTranslationKeys();
  const { t } = useTranslation('tools');
  const { finishTool } = useToolManagerContext();
  const { mediaMapping } = useAssetsManagerContext();

  const items = t(toolsTranslationKeys.RELATIONSHIPS.subcategories.RECONNECT_WITH_PARTNER.repeater, {
    returnObjects: true,
  }) as Record<string, { title: string; description: string; sms?: string }>;

  return (
    <ScreenWithChangingText
      staticText={t(toolsTranslationKeys.RELATIONSHIPS.subcategories.RECONNECT_WITH_PARTNER.helper)}
      items={Object.values(items).map((item) => ({ ...item, id: item.title }))}
      imageUrl={mediaMapping['RELATIONSHIPS.RECONNECT_WITH_PARTNER.CATEGORY_ICON']}
      headerProps={{
        title: t(toolsTranslationKeys.RELATIONSHIPS.subcategories.RECONNECT_WITH_PARTNER.label),
        onLeftPress: () => router.back(),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
      }}
      footerProps={{
        onMainAction: finishTool,
      }}
    />
  );
}
