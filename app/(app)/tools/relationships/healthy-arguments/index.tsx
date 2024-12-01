import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Icon } from '@/components/Icon';
import { ScreenWithChangingText } from '@/components/ScreenWithChangingText';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

const HealthyArguments = () => {
  const { t } = useTranslation('tools');
  const router = useRouter();

  const { finishTool } = useToolManagerContext();

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  const items = t(toolsTranslationKeys.RELATIONSHIPS.subcategories.HEALTHY_ARGUMENTS.repeater, {
    returnObjects: true,
  }) as Record<string, { title: string; description: string }>;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWithChangingText
        headerProps={{
          title: t(toolsTranslationKeys.RELATIONSHIPS.subcategories.HEALTHY_ARGUMENTS.label),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}
        staticText={t(toolsTranslationKeys.RELATIONSHIPS.subcategories.HEALTHY_ARGUMENTS.helper)}
        items={Object.values(items).map((item) => ({ ...item, id: item.description }))}
        imageUrl={mediaMapping['RELATIONSHIPS.HEALTHY_ARGUMENTS.headerImage']}
        footerProps={{ onMainAction: () => finishTool() }}
      />
    </>
  );
};

export default HealthyArguments;