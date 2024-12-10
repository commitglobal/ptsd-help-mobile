import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Icon } from '@/components/Icon';

import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

export default function RobynPreview() {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWithImageHeader
        imageUrl={mediaMapping['BODY_SCAN.ROBYN.CATEGORY_ICON']}
        headerProps={{
          title: t(toolsTranslationKeys.BODY_SCAN.subcategories.ROBYN.label),
          iconLeft: <Icon icon='chevronLeft' width={20} height={20} color='$gray12' />,
          onLeftPress: () => router.back(),
          iconRight: <Icon icon='heart' width={20} height={20} color='$gray12' />,
        }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.BODY_SCAN.subcategories.ROBYN.actionBtnLabel),
          onMainAction: () => router.push('/tools/body-scan/robyn-player'),
        }}>
        <Typography>{t(toolsTranslationKeys.BODY_SCAN.subcategories.ROBYN.description)}</Typography>
      </ScreenWithImageHeader>
    </>
  );
}
