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
import { DistressMeterInfo } from '@/components/DistressMeterInfo';
import { STORE_KEYS } from '@/constants/store-keys';
import { KVStore } from '@/helpers/mmkv';
import { DistressMeterInfoPre } from '@/components/DistressMeterInfoPre';

const DistressMeterPre = () => {
  console.log('🚀 DistressMeterPre');

  const { t } = useTranslation();
  const distressMeterInfoShown = KVStore().getBoolean(STORE_KEYS.DISTRESS_METER_INFO_SHOWN) ?? false;

  const { setInitialDistressLevel, selectedTool } = useToolManagerContext();

  const [stressValue, setStressValue] = useState(5);
  const [crisisSheetOpen, setCrisisSheetOpen] = useState(false);
  const [distressMeterInfoSheetOpen, setDistressMeterInfoSheetOpen] = useState(false);
  const [distressMeterInfoPreOpen, setDistressMeterInfoPreOpen] = useState(!distressMeterInfoShown);

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
          title: t('distress-meter.header-title'),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
          iconRight: <Icon icon='info' color='$gray12' width={24} height={24} />,
          onRightPress: () => setDistressMeterInfoSheetOpen(true),
        }}
        contentContainerStyle={{ backgroundColor: 'transparent' }}
        footerProps={{
          mainActionLabel: t('distress-meter.actions.start'),
          onMainAction: () => handleMainAction(),
          secondaryActionLabel: t('distress-meter.actions.skip'),
          onSecondaryAction: () => handleSecondaryAction(),
        }}>
        <ScrollView
          contentContainerStyle={{ padding: 24, gap: 32, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <YStack gap='$xxs'>
            <Typography textAlign='center'>{t('distress-meter.title')}</Typography>
            <Typography textAlign='center' preset='helper'>
              {t('distress-meter.scale', { min: 0, max: 10 })}
            </Typography>
            <Typography textAlign='center' preset='helper'>
              {t('distress-meter.subtitle')}
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
      {distressMeterInfoSheetOpen && (
        <DistressMeterInfo setDistressMeterInfoSheetOpen={setDistressMeterInfoSheetOpen} />
      )}
      {distressMeterInfoPreOpen && <DistressMeterInfoPre setDistressMeterInfoSheetOpen={setDistressMeterInfoPreOpen} />}
    </>
  );
};

export default DistressMeterPre;
