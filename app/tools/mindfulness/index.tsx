import SubcategoriesList from '@/components/SubcategoriesList';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { TOOLS_REGISTRY_MOCK } from '@/mocks/tools';
import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { router } from 'expo-router';

const MindfulnessIndex = () => {
  const subcategories = TOOLS_REGISTRY_MOCK.MINDFULNESS.subcategories || [];
  const { startTool } = useToolManagerContext();

  return (
    <Screen
      headerProps={{
        title: 'Mindfulness',
        iconRight: <Icon icon='info' color='white' width={24} height={24} />,
        iconLeft: <Icon icon='chevronLeft' color='white' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}>
      <SubcategoriesList
        subcategories={subcategories}
        onSelect={(subcategory) => startTool(subcategory, '/manage?tabId=tools')}
      />
    </Screen>
  );
};

export default MindfulnessIndex;
