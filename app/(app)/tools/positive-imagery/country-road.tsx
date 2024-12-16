import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Icon } from '@/components/Icon';

import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

export default function CountryRoadPreview() {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  return (
    <>
      <ScreenWithImageHeader
        imageUrl={mediaMapping['POSTIVE_IMAGERY.COUNTRY_ROAD.CATEGORY_ICON']}
        headerProps={{
          title: t(toolsTranslationKeys.POSTIVE_IMAGERY.subcategories.COUNTRY_ROAD.label),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
          onLeftPress: () => router.back(),
        }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.POSTIVE_IMAGERY.subcategories.COUNTRY_ROAD.actionBtnLabel),
          onMainAction: () => router.push('/tools/positive-imagery/country-road-player'),
        }}>
        <Typography>{t(toolsTranslationKeys.POSTIVE_IMAGERY.subcategories.COUNTRY_ROAD.description)}</Typography>
      </ScreenWithImageHeader>
    </>
  );
}
