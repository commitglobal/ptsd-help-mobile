import SubcategoriesList from '@/components/SubcategoriesList';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { router } from 'expo-router';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';

const RelationshipsIndex = () => {
  const { translations } = useTranslationKeys();
  const { startTool, TOOL_CONFIG } = useToolManagerContext();
  const { t } = useTranslation('tools');

  return (
    <Screen
      headerProps={{
        title: t(translations.RELATIONSHIPS.label),
        iconRight: <Icon icon='info' color='$gray12' width={24} height={24} />,
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
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
