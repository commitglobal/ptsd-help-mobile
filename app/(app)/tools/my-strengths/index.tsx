import React from 'react';
import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';

const MyStrengths = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();
  const router = useRouter();

  return (
    <ScreenWithImageHeader
      imageUrl={mediaMapping['MY_STRENGTHS.CATEGORY_ICON']}
      headerProps={{
        title: t(toolsTranslationKeys.MY_STRENGTHS.title),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
        onLeftPress: router.back,
      }}></ScreenWithImageHeader>
  );
};

export default MyStrengths;
