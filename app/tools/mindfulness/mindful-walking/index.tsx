import { TOOLS_MEDIA_MAPPER } from '@/_config/media.mapper';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import { Icon } from '@/components/Icon';

import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export const MindfulWalking = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const translationKeys = TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS.subcategories.MINDFUL_WALKING;
  const mediaMapper = TOOLS_MEDIA_MAPPER.MINDFULNESS.MINDFUL_WALKING;

  return (
    <ScreenWithImageHeader
      imageUrl={mediaMapper.headerImageURI}
      headerProps={{
        title: t(translationKeys.label, { ns: 'tools' }),
        iconLeft: <Icon icon='chevronLeft' width={20} height={20} color='$gray12' />,
        onLeftPress: () => router.back(),
        iconRight: <Icon icon='heart' width={20} height={20} color='$gray12' />,
      }}
      footerProps={{
        mainActionLabel: t(translationKeys.actionBtnLabel, { ns: 'tools' }),
        onMainAction: () => router.push('/tools/mindfulness/mindful-walking/player'),
      }}>
      <Typography>{t(translationKeys.description, { ns: 'tools' })}</Typography>
    </ScreenWithImageHeader>
  );
};

export default MindfulWalking;
