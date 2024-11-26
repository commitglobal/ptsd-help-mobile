import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import { useRouter } from 'expo-router';

import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { TOOLS_MEDIA_MAPPER } from '@/_config/media.mapper';

export const EmotionalDiscomfort = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const { translations } = useTranslationKeys();
  const mediaMapper = TOOLS_MEDIA_MAPPER.MINDFULNESS.EMOTIONAL_DISCOMFORT;

  return (
    <ScreenWithImageHeader
      imageUrl={mediaMapper.headerImageURI}
      headerProps={{
        title: t(translations.MINDFULNESS.subcategories.EMOTIONAL_DISCOMFORT.label),
        iconLeft: <Icon icon='chevronLeft' width={20} height={20} color='$gray12' />,
        onLeftPress: () => router.back(),
        iconRight: <Icon icon='heart' width={20} height={20} color='$gray12' />,
      }}
      footerProps={{
        mainActionLabel: t(translations.MINDFULNESS.subcategories.EMOTIONAL_DISCOMFORT.actionBtnLabel),
        onMainAction: () => router.push('/tools/mindfulness/emotional-discomfort/player'),
      }}>
      <Typography>{t(translations.MINDFULNESS.subcategories.EMOTIONAL_DISCOMFORT.description)}</Typography>
    </ScreenWithImageHeader>
  );
};

export default EmotionalDiscomfort;
