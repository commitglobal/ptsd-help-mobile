import React from 'react';
import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { ScrollView } from 'tamagui';
import { Typography } from '@/components/Typography';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';

const MyStrengths = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();
  const router = useRouter();

  const { finishTool } = useToolManagerContext();

  return (
    <ScreenWithImageHeader
      imageUrl={mediaMapping['MY_STRENGTHS.CATEGORY_ICON']}
      headerProps={{
        title: t(toolsTranslationKeys.MY_STRENGTHS.title),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
        onLeftPress: router.back,
      }}
      footerProps={{
        mainActionLabel: t(toolsTranslationKeys.MY_STRENGTHS.done),
        onMainAction: finishTool,
        secondaryActionLabel: t(toolsTranslationKeys.MY_STRENGTHS.add),
        onSecondaryAction: () => router.push('/tools/my-strengths/add-strength'),
      }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Typography>{t(toolsTranslationKeys.MY_STRENGTHS.description)}</Typography>
      </ScrollView>
    </ScreenWithImageHeader>
  );
};

export default MyStrengths;
