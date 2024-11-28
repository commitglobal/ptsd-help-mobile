import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import feelingsRepository from '@/db/repositories/feelings.repository';

import { FeelingEntry } from '@/db/schema/feelings';
import useTranslationKeys from '@/hooks/useTranslationKeys';

type FeelingsContextType = {
  feelings: FeelingEntry;
  setFeelings: Dispatch<SetStateAction<FeelingEntry>>;
  discomfort: number;
  currentDiscomfortLevel: string;
  setDiscomfort: Dispatch<SetStateAction<number>>;
  submitFeelings: () => void;
  isLoading: boolean;
};

const FeelingsContext = createContext<FeelingsContextType | null>(null);

export const useDiscomfortLevels = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();

  return React.useMemo(() => {
    const discomfortLevels = t(toolsTranslationKeys.MY_FEELINGS.repeater, {
      returnObjects: true,
    }) as string[];
    return Object.values(discomfortLevels);
  }, [t, toolsTranslationKeys.MY_FEELINGS.repeater]);
};

export const getDiscomfortLevel = (value: number, discomfortLevelsArray: string[]) => {
  const threshold = Math.floor(value / 10);
  return discomfortLevelsArray[threshold] ?? discomfortLevelsArray[0];
};

export const FeelingsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [feelings, setFeelings] = useState<FeelingEntry>({});
  const [discomfort, setDiscomfort] = useState<number>(0);

  const discomfortLevelsArray = useDiscomfortLevels();
  const currentDiscomfortLevel = React.useMemo(
    () => getDiscomfortLevel(discomfort, discomfortLevelsArray),
    [discomfort, discomfortLevelsArray]
  );

  const resetFeelings = () => {
    setFeelings({});
    setDiscomfort(0);
  };

  const submitFeelings = async () => {
    setIsLoading(true);
    const payload = {
      feelings,
      discomfort,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    };
    await feelingsRepository.createFeeling(payload);
    setIsLoading(false);
    resetFeelings();
  };

  return (
    <FeelingsContext.Provider
      value={{
        feelings,
        setFeelings,
        discomfort,
        currentDiscomfortLevel,
        setDiscomfort,
        submitFeelings,
        isLoading,
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
