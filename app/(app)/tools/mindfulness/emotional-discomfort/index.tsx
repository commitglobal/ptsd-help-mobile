import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import { useRouter } from 'expo-router';

import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

export const EmotionalDiscomfort = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  return (
    <ScreenWithImageHeader
      imageUrl={mediaMapping['MINDFULNESS.EMOTIONAL_DISCOMFORT.CATEGORY_ICON']}
      headerProps={{
        title: t(toolsTranslationKeys.MINDFULNESS.subcategories.EMOTIONAL_DISCOMFORT.label),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
        onLeftPress: () => router.back(),
        iconRight: <Icon icon='heart' width={24} height={24} color='$gray12' />,
      }}
      footerProps={{
        mainActionLabel: t(toolsTranslationKeys.MINDFULNESS.subcategories.EMOTIONAL_DISCOMFORT.actionBtnLabel),
        onMainAction: () => router.push('/tools/mindfulness/emotional-discomfort/player'),
      }}>
      <Typography>{t(toolsTranslationKeys.MINDFULNESS.subcategories.EMOTIONAL_DISCOMFORT.description)}</Typography>
    </ScreenWithImageHeader>
  );
};

export default EmotionalDiscomfort;
