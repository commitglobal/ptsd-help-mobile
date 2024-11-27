import React from 'react';
import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import { Circle, ScrollView, XStack, YStack } from 'tamagui';
import { Typography } from '@/components/Typography';
import { useFeelingsContext } from '@/contexts/FeelingsContextProvider';
import { format } from 'date-fns';
import { MainFeeling } from '@/constants/Feelings';

export default function FeelingsSummary() {
  const { t } = useTranslation('tools');
  const translationKey = TOOLS_TRANSLATIONS_CONFIG.MY_FEELINGS;
  const feelingsTranslationKey = TOOLS_TRANSLATIONS_CONFIG.FEELINGS;

  const router = useRouter();

  const { feelings, discomfort, currentDiscomfortLevel, submitFeelings, isLoading } = useFeelingsContext();

  const handleSubmitFeelings = async () => {
    try {
      await submitFeelings();
      router.dismissAll(); //  go back to the index screen
    } catch (error) {
      console.error('Error submitting feelings:', error);
    }
  };

  return (
    <Screen
      headerProps={{
        title: t(translationKey.feelingsSummary),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} onPress={router.back} />,
      }}
      contentContainerStyle={{ backgroundColor: 'white' }}
      footerProps={{
        onMainAction: handleSubmitFeelings,
        mainActionLabel: t(translationKey.ok),
        isLoading,
      }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 8 }}>
        <Typography textAlign='center'>{t(translationKey.feelingsSummaryDescription)}</Typography>
        <Typography textAlign='center' fontWeight='bold'>
          {format(new Date(), 'EEEE, MMM. d, yyyy')}
        </Typography>

        {/* my feelings section */}
        <Typography preset='subheading' color='$blue11' marginTop='$md'>
          {t(translationKey.myFeelings)}
        </Typography>
        {Object.keys(feelings).map((mainFeeling) => (
          <YStack key={mainFeeling} gap='$xxs'>
            <Typography preset='subheading'>{t(feelingsTranslationKey[mainFeeling as MainFeeling].MAIN)}</Typography>
            {feelings[mainFeeling as MainFeeling]?.length !== 0 &&
              feelings[mainFeeling as MainFeeling]?.map((secondaryFeeling) => {
                return (
                  <XStack key={secondaryFeeling} alignItems='center' gap='$xxs'>
                    <Circle size={8} backgroundColor='$blue11' />
                    <Typography>{t(secondaryFeeling)}</Typography>
                  </XStack>
                );
              })}
          </YStack>
        ))}

        {/* emotion intensity */}
        <Typography preset='subheading' color='$blue11' marginTop='$md'>
          {t(translationKey.emotionIntensity)}
        </Typography>
        <Typography>
          {discomfort}%: {currentDiscomfortLevel}
        </Typography>
      </ScrollView>
    </Screen>
  );
}
