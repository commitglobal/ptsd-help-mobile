import React from 'react';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Icon } from '@/components/Icon';
import { ScreenWithChangingText } from '@/components/ScreenWithChangingText';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

export default function Grounding() {
  const { t } = useTranslation('tools');
  const router = useRouter();

  const { finishTool } = useToolManagerContext();

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  const items = t(toolsTranslationKeys.GROUNDING.repeater, {
    returnObjects: true,
  }) as Record<string, { title: string; description: string }>;

  return (
    <ScreenWithChangingText
      headerProps={{
        title: t(toolsTranslationKeys.GROUNDING.label),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}
      items={Object.values(items).map((item) => ({ ...item, id: item.title }))}
      imageUrl={mediaMapping['GROUNDING.CATEGORY_ICON']}
      footerProps={{ onMainAction: finishTool }}
    />
  );
}
