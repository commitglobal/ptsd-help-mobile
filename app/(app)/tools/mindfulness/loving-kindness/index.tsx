import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

export const LovingKindness = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  return (
    <ScreenWithImageHeader
      imageUrl={mediaMapping['MINDFULNESS.LOVING_KINDNESS.CATEGORY_ICON']}
      headerProps={{
        title: t(toolsTranslationKeys.MINDFULNESS.subcategories.LOVING_KINDNESS.label),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
        onLeftPress: () => router.back(),
        iconRight: <Icon icon='heart' width={24} height={24} color='$gray12' />,
      }}
      footerProps={{
        mainActionLabel: t(toolsTranslationKeys.MINDFULNESS.subcategories.LOVING_KINDNESS.actionBtnLabel),
        onMainAction: () => router.push('/tools/mindfulness/loving-kindness/player'),
      }}>
      <Typography>{t(toolsTranslationKeys.MINDFULNESS.subcategories.LOVING_KINDNESS.description)}</Typography>
    </ScreenWithImageHeader>
  );
};

export default LovingKindness;
