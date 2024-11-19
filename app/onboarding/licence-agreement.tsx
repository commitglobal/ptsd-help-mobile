import { Screen } from '@/components/Screen';
import { Typography } from '@/components/Typography';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Circle, Image, ScrollView, XStack } from 'tamagui';

export default function LicenceAgreement() {
  const { t } = useTranslation('licence-agreement');
  const router = useRouter();

  const list = [t('l1'), t('l2')];

  return (
    <Screen
      headerProps={{ title: t('header-title') }}
      contentContainerStyle={{ backgroundColor: 'white' }}
      footerProps={{
        mainActionLabel: t('accept'),
        onMainAction: () => router.push('/onboarding/choose-country'),
      }}>
      <ScrollView
        contentContainerStyle={{ padding: '$lg', flexGrow: 1, gap: '$lg' }}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <Image source={require('../../assets/images/commit-global-logo.png')} style={{ width: '100%', height: 70 }} />

        <Typography preset='heading' textAlign='center' paddingHorizontal='$lg'>
          {t('title')}
        </Typography>
        <Typography>{t('p1')}</Typography>
        {list.map((item) => (
          <XStack gap='$sm' key={item}>
            <Circle size={5} backgroundColor='$blue11' marginTop='$sm' />
            <Typography>{item}</Typography>
          </XStack>
        ))}
      </ScrollView>
    </Screen>
  );
}
