import SubcategoriesList from '@/components/SubcategoriesList';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { TOOLS_REGISTRY_MOCK } from '@/mocks/tools';
import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { router } from 'expo-router';

const RelationshipsIndex = () => {
  // TODO: Get from ToolManagerContext
  const subcategories = TOOLS_REGISTRY_MOCK['RELATIONSHIPS'].subcategories || [];
  const { startTool } = useToolManagerContext();

  return (
    <Screen
      headerProps={{
        title: 'Relationships',
        iconRight: <Icon icon="info" color="white" width={24} height={24} />,
        iconLeft: <Icon icon="chevronLeft" color="white" width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}
    >
      <SubcategoriesList
        subcategories={subcategories}
        onSelect={(subcategory) => startTool(subcategory, '/manage?tabId=tools')}
      />
    </Screen>
  );
};

export default RelationshipsIndex;
