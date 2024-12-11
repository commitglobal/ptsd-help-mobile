import SubcategoriesList from '@/components/SubcategoriesList';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { router } from 'expo-router';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { useFavouritesManager } from '@/hooks/useFavouritesManager';

const RelationshipsIndex = () => {
  const { toolsTranslationKeys } = useTranslationKeys();
  const { startTool, TOOL_CONFIG } = useToolManagerContext();
  const { t } = useTranslation('tools');

  const { favourite, handleAddToFavourites, removeFromFavourites } = useFavouritesManager(TOOL_CONFIG.RELATIONSHIPS.id);

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.RELATIONSHIPS.label),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
        iconRight: <Icon icon={favourite ? 'solidHeart' : 'heart'} color='$gray12' width={24} height={24} />,
        onRightPress: favourite ? removeFromFavourites : handleAddToFavourites,
      }}>
      <SubcategoriesList
        subcategories={Object.values(TOOL_CONFIG.RELATIONSHIPS.subcategories || {}).map((subcategory) => ({
          ...subcategory,
          label: t(subcategory.label),
        }))}
        onSelect={(subcategory) => startTool(subcategory, '/manage?tabId=tools')}
      />
    </Screen>
  );
};

export default RelationshipsIndex;
