import SubcategoriesList from '@/components/SubcategoriesList';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useFavoritesManager } from '@/hooks/useFavoritesManager';

const BodyScanIndex = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();

  const { startTool, TOOL_CONFIG } = useToolManagerContext();
  const { favorite, handleAddToFavorites, removeFromFavorites } = useFavoritesManager(TOOL_CONFIG.BODY_SCAN.id);

  return (
    <>
      <Screen
        headerProps={{
          title: t(toolsTranslationKeys.BODY_SCAN.label),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
          iconRight: <Icon icon={favorite ? 'solidHeart' : 'heart'} color='$gray12' width={24} height={24} />,
          onRightPress: favorite ? removeFromFavorites : handleAddToFavorites,
        }}>
        <SubcategoriesList
          subcategories={Object.values(TOOL_CONFIG.BODY_SCAN.subcategories || {}).map((subcategory) => ({
            ...subcategory,
            label: t(subcategory.label, { ns: 'tools' }),
          }))}
          onSelect={(subcategory) => startTool(subcategory, '/manage?tabId=tools')}
        />
      </Screen>
    </>
  );
};

export default BodyScanIndex;
