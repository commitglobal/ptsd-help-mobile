import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Icon } from '@/components/Icon';

import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

export default function JuliaPreview() {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  return (
    <>
      <ScreenWithImageHeader
        imageUrl={mediaMapping['BODY_SCAN.JULIA.CATEGORY_ICON']}
        headerProps={{
          title: t(toolsTranslationKeys.BODY_SCAN.subcategories.JULIA.label),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
          onLeftPress: () => router.back(),
        }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.BODY_SCAN.subcategories.JULIA.actionBtnLabel),
          onMainAction: () => router.push('/tools/body-scan/julia-player'),
        }}>
        <Typography>{t(toolsTranslationKeys.BODY_SCAN.subcategories.JULIA.description)}</Typography>
      </ScreenWithImageHeader>
    </>
  );
}
