import React from 'react';
import { Typography } from './Typography';
import { BottomSheet } from './BottomSheet';
import { useTranslation } from 'react-i18next';
import { Sheet, YStack } from 'tamagui';
import Button from './Button';

export const DistressMeterInfo = ({
  setDistressMeterInfoSheetOpen,
  snapPoints,
  infoText,
}: {
  setDistressMeterInfoSheetOpen: (open: boolean) => void;
  snapPoints: number[];
  infoText: string;
}) => {
  const { t } = useTranslation();

  return (
    <BottomSheet
      onOpenChange={setDistressMeterInfoSheetOpen}
      snapPoints={snapPoints}
      frameProps={{ gap: '$md' }}
      dismissOnSnapToBottom={false}
      dismissOnOverlayPress={true}>
      <Sheet.ScrollView bounces={false}>
        <YStack gap='$md'>
          <Typography textAlign='justify'>{infoText}</Typography>
          <Typography textAlign='justify'>{t('distress-meter.info-levels.low')}</Typography>
          <Typography textAlign='justify'>{t('distress-meter.info-levels.high')}</Typography>
          <Button onPress={() => setDistressMeterInfoSheetOpen(false)}>{t('distress-meter.info-close')}</Button>
        </YStack>
      </Sheet.ScrollView>
    </BottomSheet>
  );
};
