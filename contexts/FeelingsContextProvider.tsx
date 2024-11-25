import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import { FeelingEntry } from '@/db/schema/feelings';
import { useTranslation } from 'react-i18next';
import feelingsRepository from '@/db/repositories/feelings.repository';

type FeelingsContextType = {
  feelings: FeelingEntry[];
  setFeelings: Dispatch<SetStateAction<FeelingEntry[]>>;
  discomfort: number;
  currentDiscomfortLevel: string;
  setDiscomfort: Dispatch<SetStateAction<number>>;
  submitFeelings: () => void;
  isLoading: boolean;
};

const FeelingsContext = createContext<FeelingsContextType | null>(null);

export const useDiscomfortLevels = (t: any, translationKey: any) => {
  return React.useMemo(() => {
    const discomfortLevels = t(translationKey.repeater, { returnObjects: true }) as string[];
    return Object.values(discomfortLevels);
  }, [t, translationKey.repeater]);
};

export const getDiscomfortLevel = (value: number, discomfortLevelsArray: string[]) => {
  const threshold = Math.floor(value / 10);
  return discomfortLevelsArray[threshold] ?? discomfortLevelsArray[0];
};

export const FeelingsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation('tools');
  const translationKey = TOOLS_TRANSLATIONS_CONFIG.MY_FEELINGS;

  const [isLoading, setIsLoading] = useState(false);

  const [feelings, setFeelings] = useState<FeelingEntry[]>([]);
  const [discomfort, setDiscomfort] = useState<number>(0);

  const discomfortLevelsArray = useDiscomfortLevels(t, translationKey);
  const currentDiscomfortLevel = React.useMemo(
    () => getDiscomfortLevel(discomfort, discomfortLevelsArray),
    [discomfort, discomfortLevelsArray]
  );

  const resetFeelings = () => {
    setFeelings([]);
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
