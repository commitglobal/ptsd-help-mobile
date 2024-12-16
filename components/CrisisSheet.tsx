import React from 'react';
import { Typography } from './Typography';
import { BottomSheet } from './BottomSheet';
import Button from './Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Sheet, YStack } from 'tamagui';
import { useRouter } from 'expo-router';

export const CrisisSheet = ({
  setCrisisSheetOpen,
  onContinueToTool,
}: {
  setCrisisSheetOpen: (open: boolean) => void;
  onContinueToTool: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <BottomSheet
      onOpenChange={setCrisisSheetOpen}
      snapPoints={[60]}
      frameProps={{ gap: '$md' }}
      dismissOnSnapToBottom={false}
      dismissOnOverlayPress={false}>
      <Sheet.ScrollView bounces={false}>
        <Typography>{t('distress-meter.high-distress.text')}</Typography>
      </Sheet.ScrollView>

      <YStack gap='$md' paddingBottom={insets.bottom} marginTop='auto'>
        <Button preset='secondary' onPress={onContinueToTool}>
          {t('distress-meter.high-distress.actions.help')}
        </Button>

        <Button
          onPress={() => {
            setCrisisSheetOpen(false);
            router.push('/(app)/(drawer)/(tabs)/support');
          }}>
          {t('distress-meter.high-distress.actions.talk')}
        </Button>
      </YStack>
    </BottomSheet>
  );
};
