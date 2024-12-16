import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import { useRouter } from 'expo-router';

import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

export const ConsciousBreathing = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  return (
    <ScreenWithImageHeader
      imageUrl={mediaMapping['MINDFULNESS.CONSCIOUS_BREATHING.CATEGORY_ICON']}
      headerProps={{
        title: t(toolsTranslationKeys.MINDFULNESS.subcategories.CONSCIOUS_BREATHING.label),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
        onLeftPress: () => router.back(),
        iconRight: <Icon icon='heart' width={24} height={24} color='$gray12' />,
      }}
      footerProps={{
        mainActionLabel: t(toolsTranslationKeys.MINDFULNESS.subcategories.CONSCIOUS_BREATHING.actionBtnLabel),
        onMainAction: () => router.push('/tools/mindfulness/conscious-breathing/player'),
      }}>
      <Typography>{t(toolsTranslationKeys.MINDFULNESS.subcategories.CONSCIOUS_BREATHING.description)}</Typography>
    </ScreenWithImageHeader>
  );
};

export default ConsciousBreathing;
