import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import React, { useEffect, useState } from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { Href, router } from 'expo-router';
import { ScrollView, Sheet, XStack, YStack } from 'tamagui';
import { Typography } from '@/components/Typography';
import { DistressMeter as DistressMeterComponent } from '@/components/DistressMeter';
import Button from '@/components/Button';
import { BottomSheet } from '@/components/BottomSheet';
import { TouchableHighlight } from 'react-native';
import { useSymptoms } from '@/hooks/useTools';
import { useFavoritesManager } from '@/hooks/useFavoritesManager';

const DistressMeterPost = () => {
  console.log('🚀 DistressMeterPost');

  const { t } = useTranslation();

  const { setFinalDistressLevel, getFeedback, selectedTool } = useToolManagerContext();

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
    router.dismissTo('/(app)/(drawer)/(tabs)/manage');
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

      {feedbackSheetOpen && selectedTool && (
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
  const { selectedTool, symptom, setFinalDistressLevel } = useToolManagerContext();
  const { favorite, handleAddToFavorites, removeFromFavorites } = useFavoritesManager(selectedTool?.id || '');
  const { getRandomToolForSymptom } = useSymptoms();

  const handleAnotherTool = () => {
    if (symptom) {
      const randomTool = getRandomToolForSymptom(symptom);
      if (randomTool) {
        setFinalDistressLevel(null);
        router.dismissTo('/(app)/tools/distress-meter/pre');
        router.push(randomTool.route as Href);
      }
    }
  };

  const handleTryAgain = () => {
    if (selectedTool) {
      setfeedbackSheetOpen(false);
      router.dismissAll();
      router.dismissTo(selectedTool.route as Href);
    }
  };

  return (
    <BottomSheet
      onOpenChange={setfeedbackSheetOpen}
      snapPoints={[70]}
      frameProps={{ gap: '$md' }}
      dismissOnSnapToBottom={false}
      dismissOnOverlayPress={false}>
      <Sheet.ScrollView flex={1} bounces={false} showsVerticalScrollIndicator={false}>
        <Typography preset='subheading' marginBottom='$md'>
          {getFeedback().title}
        </Typography>
        <Typography>{getFeedback().description}</Typography>
      </Sheet.ScrollView>

      <TouchableHighlight>
        <XStack
          backgroundColor='$blue9'
          padding='$sm'
          borderRadius={10}
          pressStyle={{ backgroundColor: '$blue11' }}
          className='flex-row items-center justify-center'
          gap='$sm'
          alignItems='center'
          justifyContent='center'
          onPress={favorite ? () => removeFromFavorites() : () => handleAddToFavorites()}>
          <Icon icon={favorite ? 'solidHeart' : 'heart'} color='white' width={24} height={24} />
          <Typography preset='subheading' color='white'>
            {favorite
              ? t('distress-meter.post-buttons.remove-from-favorites')
              : t('distress-meter.post-buttons.add-to-favorites')}
          </Typography>
        </XStack>
      </TouchableHighlight>
      <TouchableHighlight>
        <XStack
          backgroundColor='$blue9'
          padding='$sm'
          borderRadius={10}
          pressStyle={{ backgroundColor: '$blue11' }}
          className='flex-row items-center justify-center'
          gap='$sm'
          alignItems='center'
          justifyContent='center'
          onPress={handleTryAgain}>
          <Icon icon='arrowLeft' color='white' width={24} height={24} />
          <Typography preset='subheading' color='white'>
            {t('distress-meter.post-buttons.try-again')}
          </Typography>
        </XStack>
      </TouchableHighlight>
      {symptom && (
        <TouchableHighlight>
          <XStack
            backgroundColor='$blue9'
            padding='$sm'
            borderRadius={10}
            pressStyle={{ backgroundColor: '$blue11' }}
            className='flex-row items-center justify-center'
            gap='$sm'
            alignItems='center'
            justifyContent='center'
            onPress={handleAnotherTool}>
            <Icon icon='zap' color='white' width={24} height={24} />
            <Typography preset='subheading' color='white'>
              {t('distress-meter.post-buttons.another-tool')}
            </Typography>
          </XStack>
        </TouchableHighlight>
      )}
      <Button
        preset='secondary'
        onPress={() => {
          onFinishFeedback();
        }}>
        {t('common.close')}
      </Button>
    </BottomSheet>
  );
};
