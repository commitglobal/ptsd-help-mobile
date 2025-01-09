import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import React, { useEffect, useState } from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { router } from 'expo-router';
import { ScrollView, Sheet, YStack } from 'tamagui';
import { Typography } from '@/components/Typography';
import { DistressMeter as DistressMeterComponent } from '@/components/DistressMeter';
import Button from '@/components/Button';
import { BottomSheet } from '@/components/BottomSheet';

const DistressMeterPost = () => {
  console.log('🚀 DistressMeterPost');

  const { t } = useTranslation();

  const { setFinalDistressLevel, getFeedback } = useToolManagerContext();

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
    // TODO: this is a hack to get back to the screen which initiated the tool (router.replace/push are not winding back the navigation stack)
    // router.dismissAll();
    // router.back();
    router.dismissTo('/(app)/(drawer)/(tabs)/manage');
    // router.replace(returnURL as Href);
  };

  return (
    <>
      <Screen
        headerProps={{
          title: t('distress-meter.header-title'),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
          iconRight: <Icon icon='info' color='$gray12' width={24} height={24} />,
        }}
        contentContainerStyle={{ backgroundColor: 'transparent' }}
        footerProps={{
          mainActionLabel: t('common.finish'),
          onMainAction: () => handleMainAction(),
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

      {feedbackSheetOpen && (
        <FeedbackSheet
          setfeedbackSheetOpen={setfeedbackSheetOpen}
          onFinishFeedback={onFinishFeedback}
          getFeedback={getFeedback}
        />
      )}
    </>
  );
};

export default DistressMeterPost;

const FeedbackSheet = ({
  setfeedbackSheetOpen,
  onFinishFeedback,
  getFeedback,
}: {
  setfeedbackSheetOpen: (open: boolean) => void;
  onFinishFeedback: () => void;
  getFeedback: () => { title: string; description: string };
}) => {
  const { t } = useTranslation();

  return (
    <BottomSheet
      onOpenChange={setfeedbackSheetOpen}
      snapPoints={[60]}
      frameProps={{ gap: '$md' }}
      dismissOnSnapToBottom={false}
      dismissOnOverlayPress={false}>
      <Sheet.ScrollView flex={1} bounces={false} showsVerticalScrollIndicator={false}>
        <Typography preset='subheading' marginBottom='$md'>
          {getFeedback().title}
        </Typography>
        <Typography>{getFeedback().description}</Typography>
      </Sheet.ScrollView>
      <Button
        onPress={() => {
          onFinishFeedback();
        }}>
        {t('common.close')}
      </Button>
    </BottomSheet>
  );
};
