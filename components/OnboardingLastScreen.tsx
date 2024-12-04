import React, { useMemo } from 'react';
import { Circle, ScrollView, useWindowDimensions, XStack, YStack } from 'tamagui';
import { Typography } from './Typography';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import { useRouter } from 'expo-router';
import { KVStore } from '@/helpers/mmkv';
import { STORE_KEYS } from '@/constants/store-keys';

export const OnboardingLastScreen = () => {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const router = useRouter();

  const listItems = useMemo(
    () => [t('onboarding.welcome.personalize.l1'), t('onboarding.welcome.personalize.l2')],
    [t]
  );

  const handleStart = () => {
    KVStore().set(STORE_KEYS.ONBOARDING_DONE, true);
    router.replace('/(drawer)/(tabs)');
  };

  return (
    <ScrollView
      //! this width is important for the pagination to work
      width={width}
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: '$md',
        paddingBottom: '$xl',
        paddingHorizontal: '$xl',
        gap: '$md',
        flexGrow: 1,
        marginTop: '$lg',
      }}>
      <Typography preset='heading' textAlign='center'>
        {t('onboarding.welcome.title')}
      </Typography>
      <Typography>{t('onboarding.welcome.description')}</Typography>

      <Typography preset='subheading'>{t('onboarding.welcome.personalize.title')}</Typography>
      {listItems.map((item) => (
        <XStack key={item} gap='$sm'>
          <Circle size={5} backgroundColor='$blue11' marginTop='$sm' />
          <Typography>{item}</Typography>
        </XStack>
      ))}
      <Typography preset='helper'>{t('onboarding.welcome.personalize.modify_preferences')}</Typography>

      <YStack gap='$md' marginTop='auto'>
        <Button preset='secondary' onPress={handleStart}>
          {t('onboarding.welcome.actions.start')}
        </Button>
        {/* //todo: route to personalize screen */}
        <Button preset='secondary' onPress={() => {}}>
          {t('onboarding.welcome.actions.personalize')}
        </Button>
      </YStack>
    </ScrollView>
  );
};
