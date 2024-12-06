import React from 'react';
import { Screen } from '@/components/Screen';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/Icon';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { useRIDContext } from '@/contexts/RIDContextProvider';
import { Typography } from '@/components/Typography';
import { ScrollView } from 'tamagui';
import { BulletPoint } from '@/components/BulletPoint';

const Summary = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const router = useRouter();

  const { finishTool } = useToolManagerContext();
  const { trigger, difference, decision, submitRID, isLoading } = useRIDContext();

  const onSubmitRID = async () => {
    await submitRID();
    finishTool();
  };

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.RID.ridSummary),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} />,
        onLeftPress: router.back,
      }}
      footerProps={{
        mainActionLabel: t(toolsTranslationKeys.RID.done),
        onMainAction: onSubmitRID,
        isLoading,
      }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 8 }}>
        <Typography fontWeight='bold'>{t(toolsTranslationKeys.RID.triggeredHow)}</Typography>
        <BulletPoint text={trigger} />
        <Typography fontWeight='bold'>{t(toolsTranslationKeys.RID.differentSituation)}</Typography>
        <BulletPoint text={difference} />
        <Typography fontWeight='bold'>{t(toolsTranslationKeys.RID.youDecided)}</Typography>
        <BulletPoint text={decision} />
      </ScrollView>
    </Screen>
  );
};

export default Summary;
