import { Icon } from '@/components/Icon';
import { ScreenWithChangingText } from '@/components/ScreenWithChangingText';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

const SootheSenses = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const router = useRouter();

  const { mediaMapping } = useAssetsManagerContext();
  const { finishTool } = useToolManagerContext();

  const items = t(toolsTranslationKeys.SOOTHE_SENSES.repeater, {
    returnObjects: true,
  }) as Record<string, { title: string; description: string }>;

  return (
    <ScreenWithChangingText
      headerProps={{
        title: t(toolsTranslationKeys.SOOTHE_SENSES.label),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}
      items={Object.values(items).map((item) => ({ ...item, id: item.description }))}
      imageUrl={mediaMapping['SOOTHE_SENSES.CATEGORY_ICON']}
      footerProps={{ onMainAction: () => finishTool() }}
    />
  );
};

export default SootheSenses;
