import { FeelingEntry } from '@/db/schema/feelings';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type FeelingsContextType = {
  feelings: FeelingEntry[];
  setFeelings: Dispatch<SetStateAction<FeelingEntry[]>>;
  discomfort: number;
  setDiscomfort: Dispatch<SetStateAction<number>>;
  submitFeelings: () => void;
};

const FeelingsContext = createContext<FeelingsContextType | null>(null);

export const FeelingsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [feelings, setFeelings] = useState<FeelingEntry[]>([]);
  const [discomfort, setDiscomfort] = useState<number>(0);

  const submitFeelings = () => {
    console.log('🚀 feelings', feelings);
    console.log('🚀 disconfort', discomfort);
  };

  return (
    <FeelingsContext.Provider
      value={{
        feelings,
        setFeelings,
        discomfort,
        setDiscomfort,
        submitFeelings,
      }}>
      {children}
    </FeelingsContext.Provider>
  );
};

export const useFeelingsContext = () => {
  const context = useContext(FeelingsContext);
  if (!context) {
    throw new Error('useFeelingsContext must be used within a FeelingsContextProvider');
  }
  return context;
};
