import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import { TOOLS_MEDIA_MAPPER } from '@/_config/media.mapper';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';

export const LovingKindness = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();
  const mediaMapper = TOOLS_MEDIA_MAPPER.MINDFULNESS.LOVING_KINDNESS;

  return (
    <ScreenWithImageHeader
      imageUrl={mediaMapper.headerImageURI}
      headerProps={{
        title: t(toolsTranslationKeys.MINDFULNESS.subcategories.LOVING_KINDNESS.label),
        iconLeft: <Icon icon='chevronLeft' width={20} height={20} color='$gray12' />,
        onLeftPress: () => router.back(),
        iconRight: <Icon icon='heart' width={20} height={20} color='$gray12' />,
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
