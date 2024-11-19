import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import { useRouter } from 'expo-router';

import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';

export const ConsciousBreathing = () => {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const translationKeys = TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS.subcategories.CONSCIOUS_BREATHING;

  return (
    <ScreenWithImageHeader
      imageUrl={
        'https://plus.unsplash.com/premium_vector-1730376548370-6371f7576b4c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
      headerProps={{
        title: t(translationKeys.label),
        iconLeft: <Icon icon='chevronLeft' width={20} height={20} color='$gray12' />,
        onLeftPress: () => router.back(),
        iconRight: <Icon icon='heart' width={20} height={20} color='$gray12' />,
      }}
      footerProps={{
        onMainAction: () => router.push('/tools/mindfulness/conscious-breathing/player'),
      }}>
      <Typography>{t(translationKeys.description, { ns: 'tools' })}</Typography>
    </ScreenWithImageHeader>
  );
};

export default ConsciousBreathing;
