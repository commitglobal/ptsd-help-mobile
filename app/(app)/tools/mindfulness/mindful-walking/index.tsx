import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Icon } from '@/components/Icon';

import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

export const MindfulWalking = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  return (
    <ScreenWithImageHeader
      imageUrl={mediaMapping['MINDFULNESS.MINDFUL_WALKING.CATEGORY_ICON']}
      headerProps={{
        title: t(toolsTranslationKeys.MINDFULNESS.subcategories.MINDFUL_WALKING.label),
        iconLeft: <Icon icon='chevronLeft' width={20} height={20} color='$gray12' />,
        onLeftPress: () => router.back(),
      }}
      footerProps={{
        mainActionLabel: t(toolsTranslationKeys.MINDFULNESS.subcategories.MINDFUL_WALKING.actionBtnLabel),
        onMainAction: () => router.push('/tools/mindfulness/mindful-walking/player'),
      }}>
      <Typography>{t(toolsTranslationKeys.MINDFULNESS.subcategories.MINDFUL_WALKING.description)}</Typography>
    </ScreenWithImageHeader>
  );
};

export default MindfulWalking;
