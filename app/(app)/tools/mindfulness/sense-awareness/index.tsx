import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

export const SenseAwareness = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  return (
    <ScreenWithImageHeader
      imageUrl={mediaMapping['MINDFULNESS.SENSE_AWARENESS.CATEGORY_ICON']}
      headerProps={{
        title: t(toolsTranslationKeys.MINDFULNESS.subcategories.SENSE_AWARENESS.label),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
        onLeftPress: () => router.back(),
      }}
      footerProps={{
        mainActionLabel: t(toolsTranslationKeys.MINDFULNESS.subcategories.SENSE_AWARENESS.actionBtnLabel),
        onMainAction: () => router.push('/tools/mindfulness/sense-awareness/player'),
      }}>
      <Typography>{t(toolsTranslationKeys.MINDFULNESS.subcategories.SENSE_AWARENESS.description)}</Typography>
    </ScreenWithImageHeader>
  );
};

export default SenseAwareness;
