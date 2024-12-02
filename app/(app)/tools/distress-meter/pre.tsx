import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import React, { useEffect, useState } from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { Href, router } from 'expo-router';
import { ScrollView, YStack } from 'tamagui';
import { Typography } from '@/components/Typography';
import { DistressMeter as DistressMeterComponent } from '@/components/DistressMeter';
import { CrisisSheet } from '@/components/CrisisSheet';

const DistressMeterPre = () => {
  console.log('🚀 DistressMeterPre');

  const { t } = useTranslation('distress-meter');

  const { setInitialDistressLevel, selectedTool } = useToolManagerContext();

  const [stressValue, setStressValue] = useState(5);
  const [crisisSheetOpen, setCrisisSheetOpen] = useState(false);

  useEffect(() => {
    return () => {
      setInitialDistressLevel(null);
    };
  }, []);

  const handleMainAction = () => {
    if (stressValue >= 9) {
      return setCrisisSheetOpen(true);
    }

    setInitialDistressLevel(stressValue);
    router.push(selectedTool?.route as Href);
  };

  const handleSecondaryAction = () => {
    router.push(selectedTool?.route as Href);
  };

  return (
    <>
      <Screen
        headerProps={{
          title: t('header-title'),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
          iconRight: <Icon icon='info' color='$gray12' width={24} height={24} />,
        }}
        contentContainerStyle={{ backgroundColor: 'transparent' }}
        footerProps={{
          mainActionLabel: t('actions.start'),
          onMainAction: () => handleMainAction(),
          secondaryActionLabel: t('actions.skip'),
          onSecondaryAction: () => handleSecondaryAction(),
        }}>
        <ScrollView
          contentContainerStyle={{ padding: 24, gap: 32, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <YStack gap='$xxs'>
            <Typography textAlign='center'>{t('title')}</Typography>
            <Typography textAlign='center' preset='helper'>
              {t('scale', { min: 0, max: 10 })}
            </Typography>
            <Typography textAlign='center' preset='helper'>
              {t('subtitle')}
            </Typography>
          </YStack>

          <DistressMeterComponent stressValue={stressValue} setStressValue={setStressValue} />
        </ScrollView>
      </Screen>
      {crisisSheetOpen && (
        <CrisisSheet
          setCrisisSheetOpen={setCrisisSheetOpen}
          onContinueToTool={() => {
            setInitialDistressLevel(stressValue);
            router.push(selectedTool?.route as Href);
            setCrisisSheetOpen(false);
          }}
        />
      )}
    </>
  );
};

export default DistressMeterPre;
