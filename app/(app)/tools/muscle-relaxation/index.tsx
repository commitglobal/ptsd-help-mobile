import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Icon } from '@/components/Icon';

import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

export default function MuscleRelaxation() {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWithImageHeader
        imageUrl={mediaMapping['MUSCLE_RELAXATION.CATEGORY_ICON']}
        headerProps={{
          title: t(toolsTranslationKeys.MUSCLE_RELAXATION.label),
          iconLeft: <Icon icon='chevronLeft' width={20} height={20} color='$gray12' />,
          onLeftPress: () => router.back(),
          iconRight: <Icon icon='heart' width={20} height={20} color='$gray12' />,
        }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.MUSCLE_RELAXATION.actionBtnLabel),
          onMainAction: () => router.push('/tools/muscle-relaxation/player'),
        }}>
        <Typography>{t(toolsTranslationKeys.MUSCLE_RELAXATION.description)}</Typography>
      </ScreenWithImageHeader>
    </>
  );
}