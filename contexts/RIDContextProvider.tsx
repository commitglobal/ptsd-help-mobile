import ridRepository from '@/db/repositories/rid.repository';
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type RIDContextType = {
  trigger: string;
  setTrigger: Dispatch<SetStateAction<string>>;
  difference: string;
  setDifference: Dispatch<SetStateAction<string>>;
  decision: string;
  setDecision: Dispatch<SetStateAction<string>>;
  submitRID: () => void;
  isLoading: boolean;
};

const RIDContext = createContext<RIDContextType | null>(null);

export const RIDContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [trigger, setTrigger] = useState('');
  const [difference, setDifference] = useState('');
  const [decision, setDecision] = useState('');

  const resetRID = () => {
    setTrigger('');
    setDifference('');
    setDecision('');
  };

  const submitRID = async () => {
    setIsLoading(true);
    const payload = {
      trigger,
      difference,
      decision,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    };
    await ridRepository.createRID(payload);
    setIsLoading(false);
    resetRID();
  };

  return (
    <RIDContext.Provider
      value={{
        trigger,
        setTrigger,
        difference,
        setDifference,
        decision,
        setDecision,
        submitRID,
        isLoading,
      }}>
      {children}
    </RIDContext.Provider>
  );
};

export const useRIDContext = () => {
  const context = useContext(RIDContext);
  if (!context) {
    throw new Error('useRIDContext must be used within a RIDContextProvider');
  }
  return context;
};
