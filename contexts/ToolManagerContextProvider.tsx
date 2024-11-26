
import { Href, router } from 'expo-router';
import '../common/config/i18n';
import { createContext, useContext, useState } from 'react';
import { Tool } from '@/_config/tools.config';

type ToolManagerContextType = {
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

const ToolManagerContext = createContext<ToolManagerContextType | null>(null);

const ToolManagerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const isDistressMeterActive = true; // TODO: Change to RQ, get from DB

  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [returnURL, setReturnURL] = useState<string | null>(null);

  const [initialDistressLevel, setInitialDistressLevel] = useState<number | null>(null);
  const [finalDistressLevel, setFinalDistressLevel] = useState<number | null>(null);

  const getFeedback = () => {
    return `Feedback from tool manager ${initialDistressLevel} to ${finalDistressLevel}`;
  };

  const startTool = (tool: Tool, returnURL: string) => {
    setSelectedTool(tool);
    setReturnURL(returnURL);

    if (tool.subcategories?.length) {
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
