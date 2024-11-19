import SubcategoriesList from '@/components/SubcategoriesList';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { router } from 'expo-router';
import { TOOLS_CONFIG } from '@/_config/tools.config';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import { useTranslation } from 'react-i18next';

const RelationshipsIndex = () => {
  const subcategories = TOOLS_CONFIG.RELATIONSHIPS.subcategories || [];
  const translationsKeys = TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS;
  const { startTool } = useToolManagerContext();
  const { t } = useTranslation('tools');

  return (
    <Screen
      headerProps={{
        title: t(translationsKeys.label),
        iconRight: <Icon icon='info' color='$gray12' width={24} height={24} />,
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}>
      <SubcategoriesList
        subcategories={Object.values(subcategories).map((subcategory) => ({
          ...subcategory,
          label: t(subcategory.label),
        }))}
        onSelect={(subcategory) => startTool(subcategory, '/manage?tabId=tools')}
      />
    </Screen>
  );
};

export default RelationshipsIndex;
