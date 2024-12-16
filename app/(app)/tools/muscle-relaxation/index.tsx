import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Icon } from '@/components/Icon';

import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import { useFavoritesManager } from '@/hooks/useFavoritesManager';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';

export default function MuscleRelaxation() {
  const router = useRouter();
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();

  const { mediaMapping } = useAssetsManagerContext();
  const { TOOL_CONFIG } = useToolManagerContext();
  const { favorite, handleAddToFavorites, removeFromFavorites } = useFavoritesManager(TOOL_CONFIG.MUSCLE_RELAXATION.id);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWithImageHeader
        imageUrl={mediaMapping['MUSCLE_RELAXATION.CATEGORY_ICON']}
        headerProps={{
          title: t(toolsTranslationKeys.MUSCLE_RELAXATION.label),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
          onLeftPress: () => router.back(),
          iconRight: <Icon icon={favorite ? 'solidHeart' : 'heart'} color='$gray12' width={24} height={24} />,
          onRightPress: favorite ? removeFromFavorites : handleAddToFavorites,
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
