import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import React, { useEffect, useState } from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { Href, router } from 'expo-router';
import { ScrollView, YStack } from 'tamagui';
import { Typography } from '@/components/Typography';
import { DistressMeter as DistressMeterComponent } from '@/components/DistressMeter';
import Button from '@/components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheet } from '@/components/BottomSheet';

const DistressMeterPost = () => {
  console.log('🚀 DistressMeterPost');

  const { t } = useTranslation('distress-meter');
  const insets = useSafeAreaInsets();

  const { setFinalDistressLevel, returnURL } = useToolManagerContext();

  const [stressValue, setStressValue] = useState(5);
  const [feedbackSheetOpen, setfeedbackSheetOpen] = useState(false);

  useEffect(() => {
    return () => {
      setFinalDistressLevel(null);
    };
  }, []);

  const handleMainAction = () => {
    setFinalDistressLevel(stressValue);
    setfeedbackSheetOpen(true);
  };

  const onFinishFeedback = () => {
    setfeedbackSheetOpen(false);
    console.log('returnURL', returnURL);
    router.replace(returnURL as Href);
  };

  return (
    <>
      <Screen
        headerProps={{
          title: t('header-title'),
          iconLeft: <Icon icon="chevronLeft" color="white" width={24} height={24} />,
          onLeftPress: () => router.back(),
          iconRight: <Icon icon="info" color="white" width={24} height={24} />,
        }}
      >
        <ScrollView
          contentContainerStyle={{ padding: 24, gap: 32, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <YStack gap="$xxs">
            <Typography textAlign="center">{t('title')}</Typography>
            <Typography textAlign="center" preset="helper">
              {t('scale', { min: 0, max: 10 })}
            </Typography>
            <Typography textAlign="center" preset="helper">
              {t('subtitle')}
            </Typography>
          </YStack>

          <DistressMeterComponent stressValue={stressValue} setStressValue={setStressValue} />
        </ScrollView>

        <YStack paddingHorizontal="$md" paddingTop={insets.top + 16} gap="$xs" paddingBottom="$md">
          <Button onPress={handleMainAction}>{t('actions.finish')}</Button>
        </YStack>
      </Screen>
      {feedbackSheetOpen && (
        <BottomSheet
          onOpenChange={setfeedbackSheetOpen}
          snapPoints={[60]}
          frameProps={{ gap: '$md' }}
          dismissOnSnapToBottom={false}
          dismissOnOverlayPress={false}
        >
          <Typography>Feedback goes here</Typography>
          <Button
            onPress={() => {
              onFinishFeedback();
            }}
          >
            Close
          </Button>
        </BottomSheet>
      )}
    </>
  );
};

export default DistressMeterPost;
