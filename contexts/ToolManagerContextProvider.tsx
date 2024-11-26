import { Tool, ToolConfigType, useTools } from '@/hooks/useTools';
import { Href, router } from 'expo-router';
import { createContext, useContext, useMemo, useState } from 'react';
import { useAssetsManagerContext } from './AssetsManagerContextProvider';
import { FogglesConfig } from '@/models/CMSFoggles.type';

import '../common/config/i18n';

type ToolManagerContextType = {
  TOOL_CONFIG: ToolConfigType;

  selectedTool: Tool | null;

  isDistressMeterActive: boolean;

  initialDistressLevel: number | null;
  finalDistressLevel: number | null;

  returnURL: string | null;

  setInitialDistressLevel: (level: number | null) => void;
  setFinalDistressLevel: (level: number | null) => void;

  getFeedback: () => string;

  startTool: (tool: Tool, returnURL: string) => void;
  finishTool: () => void;
  resetToolManagerContext: () => void;
};

const filterToolsWithFoggles = (toolsConfig: ToolConfigType, foggles: FogglesConfig): ToolConfigType => {
  if (!foggles) {
    return toolsConfig;
  }

  return Object.entries(toolsConfig).reduce((acc, [key, tool]) => {
    if (!foggles?.features?.tools?.[tool.id]?.enabled) {
      return acc;
    }

    return {
      ...acc,
      [key]: {
        ...tool,
        subcategories: !tool.subcategories
          ? undefined
          : Object.entries(tool.subcategories).reduce((subAcc, [subKey, subcategory]) => {
              if (!foggles?.features?.tools?.[tool.id]?.subcategories?.[subcategory.id]?.enabled) {
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

  const isDistressMeterActive = false; // TODO: Change to RQ, get from DB

  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [returnURL, setReturnURL] = useState<string | null>(null);

  const [initialDistressLevel, setInitialDistressLevel] = useState<number | null>(null);
  const [finalDistressLevel, setFinalDistressLevel] = useState<number | null>(null);

  const TOOL_CONFIG = useMemo(() => {
    return filterToolsWithFoggles(TOOLS_CONFIG, foggles);
  }, [foggles]);

  const getFeedback = () => {
    return `Feedback from tool manager ${initialDistressLevel} to ${finalDistressLevel}`;
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
      console.log('🚀 returnURL', returnURL);
      router.push(returnURL as Href);
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
