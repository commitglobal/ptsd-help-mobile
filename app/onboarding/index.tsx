import { BulletPoint } from '@/components/BulletPoint';
import { Screen } from '@/components/Screen';
import { Typography } from '@/components/Typography';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView } from 'tamagui';

export default function LicenceAgreement() {
  const { t } = useTranslation();
  const router = useRouter();

  const list = [t('licence-agreement.l1'), t('licence-agreement.l2')];

  return (
    <Screen
      headerProps={{ title: t('licence-agreement.header-title') }}
      contentContainerStyle={{ backgroundColor: 'white' }}
      footerProps={{
        mainActionLabel: t('licence-agreement.accept'),
        onMainAction: () => router.push('/onboarding/choose-country'),
      }}>
      <ScrollView
        contentContainerStyle={{ padding: '$lg', flexGrow: 1, gap: '$lg' }}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <Image source={require('../../assets/images/commit-global-logo.png')} style={{ width: '100%', height: 70 }} />

        <Typography preset='heading' textAlign='center' paddingHorizontal='$lg'>
          {t('licence-agreement.title')}
        </Typography>
        <Typography>{t('licence-agreement.p1')}</Typography>
        {list.map((item) => (
          <BulletPoint key={item} text={item} />
        ))}
      </ScrollView>
    </Screen>
  );
}
