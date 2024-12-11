import SubcategoriesList from '@/components/SubcategoriesList';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useFavouritesManager } from '@/hooks/useFavouritesManager';

const SleepIndex = () => {
  const { startTool, TOOL_CONFIG } = useToolManagerContext();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();

  const { favourite, handleAddToFavourites, removeFromFavourites } = useFavouritesManager(TOOL_CONFIG.SLEEP.id);

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.SLEEP.label),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
        iconRight: <Icon icon={favourite ? 'solidHeart' : 'heart'} color='$gray12' width={24} height={24} />,
        onRightPress: favourite ? removeFromFavourites : handleAddToFavourites,
      }}>
      <SubcategoriesList
        subcategories={Object.values(TOOL_CONFIG.SLEEP.subcategories || {}).map((subcategory) => ({
          ...subcategory,
          label: t(subcategory.label, { ns: 'tools' }),
        }))}
        onSelect={(subcategory) => startTool(subcategory, '/manage?tabId=tools')}
      />
    </Screen>
  );
};

export default SleepIndex;
