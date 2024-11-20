import SubcategoriesList from '@/components/SubcategoriesList';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { router } from 'expo-router';
import { TOOLS_CONFIG } from '@/_config/tools.config';
import { useTranslation } from 'react-i18next';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';

const MindfulnessIndex = () => {
  const subcategories = TOOLS_CONFIG.MINDFULNESS.subcategories || [];
  const { startTool } = useToolManagerContext();
  const { t } = useTranslation('tools');

  const translationKeys = TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS;

  return (
    <Screen
      headerProps={{
        title: t(translationKeys.label, { ns: 'tools' }),
        iconRight: <Icon icon='info' color='$gray12' width={24} height={24} />,
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}>
      <SubcategoriesList
        subcategories={Object.values(subcategories).map((subcategory) => ({
          ...subcategory,
          label: t(subcategory.label, { ns: 'tools' }),
        }))}
        onSelect={(subcategory) => startTool(subcategory, '/manage?tabId=tools')}
      />
    </Screen>
  );
};

export default MindfulnessIndex;
