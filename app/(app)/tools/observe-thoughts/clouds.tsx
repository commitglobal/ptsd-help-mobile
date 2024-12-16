import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Icon } from '@/components/Icon';

import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

export default function CloudsPreview() {
  const router = useRouter();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  return (
    <>
      <ScreenWithImageHeader
        imageUrl={mediaMapping['OBSERVE_THOUGHTS.CATEGORY_ICON']}
        headerProps={{
          title: t(toolsTranslationKeys.OBSERVE_THOUGHTS.subcategories.CLOUDS.label),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
          onLeftPress: () => router.back(),
          iconRight: <Icon icon='heart' width={24} height={24} color='$gray12' />,
        }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.OBSERVE_THOUGHTS.subcategories.CLOUDS.actionBtnLabel),
          onMainAction: () => router.push('/tools/observe-thoughts/clouds-player'),
        }}>
        <Typography>{t(toolsTranslationKeys.OBSERVE_THOUGHTS.subcategories.CLOUDS.description)}</Typography>
      </ScreenWithImageHeader>
    </>
  );
}
