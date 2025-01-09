import { Tool, ToolConfigType, useTools } from '@/hooks/useTools';
import { Href, router } from 'expo-router';
import { createContext, useContext, useMemo, useState } from 'react';

import { useAssetsManagerContext } from './AssetsManagerContextProvider';

import '../common/config/i18n';
import { FogglesConfig } from '@/services/foggles/foggles.type';
import { useTranslation } from 'react-i18next';

type ToolManagerContextType = {
  TOOL_CONFIG: ToolConfigType;

  selectedTool: Tool | null;

  isDistressMeterActive: boolean;

  initialDistressLevel: number | null;
  finalDistressLevel: number | null;

  returnURL: string | null;

  setInitialDistressLevel: (level: number | null) => void;
  setFinalDistressLevel: (level: number | null) => void;

  getFeedback: () => { title: string; description: string };

  startTool: (tool: Tool, returnURL: string) => void;
  finishTool: () => void;
  resetToolManagerContext: () => void;
  getToolById: (toolId: string) => Tool | undefined;
};

const filterToolsWithFoggles = (toolsConfig: ToolConfigType, foggles: FogglesConfig): ToolConfigType => {
  if (!foggles) {
    return toolsConfig;
  }

  return Object.entries(toolsConfig).reduce((acc, [key, tool]) => {
    // If no specific foggle exists for this tool, consider it enabled
    const isToolEnabled = foggles?.features?.tools?.[tool.id]?.enabled ?? true;
    if (!isToolEnabled) {
      return acc;
    }

    return {
      ...acc,
      [key]: {
        ...tool,
        subcategories: !tool.subcategories
          ? undefined
          : Object.entries(tool.subcategories).reduce((subAcc, [subKey, subcategory]) => {
              // If no specific foggle exists for this subcategory, consider it enabled
              const isSubcategoryEnabled =
                foggles?.features?.tools?.[tool.id]?.subcategories?.[subcategory.id]?.enabled ?? true;
              if (!isSubcategoryEnabled) {
                return subAcc;
              }
              return {
                ...subAcc,
                [subKey]: subcategory,
              };
            }, {}),
      },
    };
  }, {} as ToolConfigType);
};

const ToolManagerContext = createContext<ToolManagerContextType | null>(null);

const ToolManagerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { foggles } = useAssetsManagerContext();
  const TOOLS_CONFIG = useTools();
  const { t } = useTranslation();

  

  const isDistressMeterActive = true; // TODO: Change to RQ, get from DB

  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [returnURL, setReturnURL] = useState<string | null>(null);

  const [initialDistressLevel, setInitialDistressLevel] = useState<number | null>(null);
  const [finalDistressLevel, setFinalDistressLevel] = useState<number | null>(null);

  const TOOL_CONFIG = useMemo(() => {
    return filterToolsWithFoggles(TOOLS_CONFIG, foggles);
  }, [foggles]);

  const getFeedback = () => {
    if (!initialDistressLevel || !finalDistressLevel) return { title: '', description: '' };

    // stress level increased
    if (finalDistressLevel > initialDistressLevel) {
      return {
        title: t('distress-meter.feedback.increased.title'),
        description: t('distress-meter.feedback.increased.description', { toolName: selectedTool?.label }),
      };
    }
    // stress level unchanged
    else if (finalDistressLevel === initialDistressLevel) {
      return {
        title: t('distress-meter.feedback.unchanged.title'),
        description: t('distress-meter.feedback.unchanged.description', { toolName: selectedTool?.label }),
      };
    }
    // stress level decreased
    else {
      return {
        title: t('distress-meter.feedback.decreased.title'),
        description: t('distress-meter.feedback.decreased.description', { toolName: selectedTool?.label }),
      };
    }
  };

  const getToolById = (toolId: string) => {
    // First search in top level tools
    const topLevelTool = Object.values(TOOL_CONFIG).find((tool) => tool.id === toolId);
    if (topLevelTool) return topLevelTool;

    // Then search in subcategories
    for (const tool of Object.values(TOOL_CONFIG)) {
      if (tool.subcategories) {
        const subcategoryTool = Object.values(tool.subcategories).find((subcategory) => subcategory?.id === toolId);
        if (subcategoryTool) return subcategoryTool;
      }
    }
    return undefined;
  };

  const startTool = (tool: Tool, returnURL: string) => {
    setSelectedTool(tool);
    setReturnURL(returnURL);

    if (tool.subcategories && Object.keys(tool.subcategories).length > 0) {
      router.push(tool.route);
    } else if (isDistressMeterActive) {
      router.push('/tools/distress-meter/pre');
    } else {
      router.push(tool.route);
    }
  };

  const finishTool = () => {
    if (initialDistressLevel && !finalDistressLevel) {
      router.push('/tools/distress-meter/post');
    } else {
      // router.replace(returnURL as Href);
      router.dismissTo(returnURL as Href);
    }
  };

  const resetToolManagerContext = () => {
    setSelectedTool(null);
    setInitialDistressLevel(null);
    setFinalDistressLevel(null);
  };

  const contextValue: ToolManagerContextType = {
    TOOL_CONFIG,
    selectedTool,
    isDistressMeterActive,
    initialDistressLevel,
    finalDistressLevel,
    returnURL,
    setInitialDistressLevel,
    setFinalDistressLevel,
    getFeedback,
    startTool,
    finishTool,
    resetToolManagerContext,
    getToolById,
  };

  return <ToolManagerContext.Provider value={contextValue}>{children}</ToolManagerContext.Provider>;
};

export const useToolManagerContext = () => {
  const data = useContext(ToolManagerContext);

  if (!data) {
    throw new Error('useToolManagerContext must be used within a ToolManagerContextProvider');
  }

  return data;
};

export default ToolManagerContextProvider;
