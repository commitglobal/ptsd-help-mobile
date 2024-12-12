import SubcategoriesList from '@/components/SubcategoriesList';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useFavoritesManager } from '@/hooks/useFavoritesManager';

const MindfulnessIndex = () => {
  const { startTool, TOOL_CONFIG } = useToolManagerContext();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();
  const { favorite, handleAddToFavorites, removeFromFavorites } = useFavoritesManager(TOOL_CONFIG.MINDFULNESS.id);

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.MINDFULNESS.label),
        iconRight: <Icon icon={favorite ? 'solidHeart' : 'heart'} color='$gray12' width={24} height={24} />,
        onRightPress: favorite ? removeFromFavorites : handleAddToFavorites,
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}>
      <SubcategoriesList
        subcategories={Object.values(TOOL_CONFIG.MINDFULNESS.subcategories || {}).map((subcategory) => ({
          ...subcategory,
          label: t(subcategory.label, { ns: 'tools' }),
        }))}
        onSelect={(subcategory) => startTool(subcategory, '/manage?tabId=tools')}
      />
    </Screen>
  );
};

export default MindfulnessIndex;
