import React from 'react';
import SubcategoriesList from '@/components/SubcategoriesList';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';

const RecreationalActivities = () => {
  const { startTool, TOOL_CONFIG } = useToolManagerContext();
  const { t } = useTranslation('tools');

  const { toolsTranslationKeys } = useTranslationKeys();

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.RECREATIONAL_ACTIVITIES.label),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}>
      <SubcategoriesList
        subcategories={Object.values(TOOL_CONFIG.RECREATIONAL_ACTIVITIES.subcategories || {}).map((subcategory) => ({
          ...subcategory,
          label: t(subcategory.label, { ns: 'tools' }),
        }))}
        onSelect={(subcategory) => startTool(subcategory, '/manage?tabId=tools')}
      />
    </Screen>
  );
};

export default RecreationalActivities;
