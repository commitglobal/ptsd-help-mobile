import { createContext, useContext, useState } from 'react';

type ToolManagerContextType = {
  selectedTool: string | null;

  isDistressMeterActive: boolean;

  initialDistressLevel: number | null;
  finalDistressLevel: number | null;

  setInitialDistressLevel: (level: number) => void;
  setFinalDistressLevel: (level: number) => void;

  onToolSelected: (tool: string) => void;

  getFeedback: () => string;
  getToolBySymptom: (symptom: string) => string;
};

const ToolManagerContext = createContext<ToolManagerContextType | null>(null);

const ToolManagerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const isDistressMeterActive = true; // TODO: Change to RQ, get from DB

  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const [initialDistressLevel, setInitialDistressLevel] = useState<number | null>(null);
  const [finalDistressLevel, setFinalDistressLevel] = useState<number | null>(null);

  const getFeedback = () => {
    return `Feedback from tool manager ${initialDistressLevel} to ${finalDistressLevel}`;
  };

  const getToolBySymptom = (symptom: string) => {
    return `Tool for symptom ${symptom}`;
  };

  const onToolSelected = (tool: string) => {
    setSelectedTool(tool);
  };

  const contextValue: ToolManagerContextType = {
    selectedTool,
    isDistressMeterActive,
    initialDistressLevel,
    finalDistressLevel,
    setInitialDistressLevel,
    setFinalDistressLevel,
    getFeedback,
    getToolBySymptom,
    onToolSelected,
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
