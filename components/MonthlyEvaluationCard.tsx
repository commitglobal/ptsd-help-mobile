import React from 'react';
import { Card } from './Card';
import { LinearGradient } from 'tamagui/linear-gradient';
import { XStack, YStack, Image, CardProps } from 'tamagui';
import { Typography } from './Typography';
import { useTranslation } from 'react-i18next';
import { Icon } from './Icon';

export const MonthlyEvaluationCard = ({ ...props }: CardProps) => {
  const { t } = useTranslation();

  return (
    <Card padding='$md' gap='$md' {...props}>
      <LinearGradient fullscreen colors={['$blue7', '$blue9']} start={[1, 1]} end={[0, 0]} borderRadius='$4' />
      <XStack borderRadius='$4'>
        <YStack flex={1} gap='$xs'>
          <Typography color='white' fontWeight='bold' fontSize={14}>
            {t('dashboard.monthly-evaluation')}
          </Typography>
          <Typography color='white' preset='helper'>
            {t('dashboard.evaluate')}
          </Typography>
        </YStack>

        <XStack flex={1} justifyContent='center' alignItems='center'>
          <Image source={require('../assets/images/evaluation.png')} />
        </XStack>
      </XStack>

      <XStack alignItems='center' gap='$xs'>
        <Typography color='white'>{t('dashboard.start')}</Typography>
        <Icon icon='chevronRight' width={16} height={16} color='white' />
      </XStack>
    </Card>
  );
};
