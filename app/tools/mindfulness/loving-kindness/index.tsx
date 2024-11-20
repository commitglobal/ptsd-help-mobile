import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import { TOOLS_MEDIA_MAPPER } from '@/_config/media.mapper';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';

export const LovingKindness = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const translationKeys = TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS.subcategories.LOVING_KINDNESS;
  const mediaMapper = TOOLS_MEDIA_MAPPER.MINDFULNESS.LOVING_KINDNESS;

  return (
    <ScreenWithImageHeader
      imageUrl={mediaMapper.headerImageURI}
      headerProps={{
        title: t(translationKeys.label),
        iconLeft: <Icon icon='chevronLeft' width={20} height={20} color='$gray12' />,
        onLeftPress: () => router.back(),
        iconRight: <Icon icon='heart' width={20} height={20} color='$gray12' />,
      }}
      footerProps={{
        mainActionLabel: t(translationKeys.actionBtnLabel, { ns: 'tools' }),
        onMainAction: () => router.push('/tools/mindfulness/loving-kindness/player'),
      }}>
      <Typography>{t(translationKeys.description, { ns: 'tools' })}</Typography>
    </ScreenWithImageHeader>
  );
};

export default LovingKindness;
