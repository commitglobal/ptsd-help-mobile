import React from 'react';
import { Typography } from './Typography';
import { BottomSheet } from './BottomSheet';
import { useTranslation } from 'react-i18next';
import { Sheet, YStack } from 'tamagui';
import Button from './Button';

export const DistressMeterInfoPre = ({
  setDistressMeterInfoSheetOpen,
}: {
  setDistressMeterInfoSheetOpen: (open: boolean) => void;
}) => {
  const { t } = useTranslation();

  return (
    <BottomSheet
      onOpenChange={setDistressMeterInfoSheetOpen}
      snapPoints={[45]}
      frameProps={{ gap: '$md' }}
      dismissOnSnapToBottom={false}
      dismissOnOverlayPress={true}>
      <Sheet.ScrollView bounces={false}>
        <YStack gap='$md'>
          <Typography textAlign='justify'>{t('distress-meter.info-pre')}</Typography>
          <Typography textAlign='justify'>{t('distress-meter.info-levels.low')}</Typography>
          <Typography textAlign='justify'>{t('distress-meter.info-levels.high')}</Typography>
          <Button onPress={() => setDistressMeterInfoSheetOpen(false)}>Close</Button>
        </YStack>
      </Sheet.ScrollView>
    </BottomSheet>
  );
};
