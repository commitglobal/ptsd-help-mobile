import React from 'react';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Icon } from '@/components/Icon';
import { ScreenWithChangingText } from '@/components/ScreenWithChangingText';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

export default function ConnectWithOthers() {
  const { t } = useTranslation('tools');
  const router = useRouter();

  const { finishTool } = useToolManagerContext();

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  const items = t(toolsTranslationKeys.CONNECT_WITH_OTHERS.repeater, {
    returnObjects: true,
  }) as Record<string, { title: string; description: string }>;

  return (
    <ScreenWithChangingText
      headerProps={{
        title: t(toolsTranslationKeys.CONNECT_WITH_OTHERS.label),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}
      staticText={t(toolsTranslationKeys.CONNECT_WITH_OTHERS.staticText)}
      items={Object.values(items).map((item) => ({ ...item, id: item.description }))}
      imageUrl={mediaMapping['CONNECT_WITH_OTHERS.CATEGORY_ICON']}
      footerProps={{ onMainAction: finishTool }}
    />
  );
}
