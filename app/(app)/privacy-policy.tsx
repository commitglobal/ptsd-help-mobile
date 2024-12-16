import React from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/Icon';
import { ScrollView } from 'tamagui';
import { Typography } from '@/components/Typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import { Linking } from 'react-native';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleOpenPrivacyPolicy = () => {
    Linking.openURL('https://www.code4.ro/ro/ptsd-help-privacy-policy');
  };

  return (
    <Screen
      contentContainerStyle={{ padding: '$md', backgroundColor: 'white', gap: '$md' }}
      headerProps={{
        title: t('privacy-policy.title'),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: router.back,
      }}>
      <ScrollView
        flex={1}
        contentContainerStyle={{ padding: 8, paddingBottom: insets.bottom + 8, gap: '$lg' }}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <Typography>{t('privacy-policy.content')}</Typography>
        <Button onPress={handleOpenPrivacyPolicy}>{t('privacy-policy.open-privacy-policy')}</Button>
      </ScrollView>
    </Screen>
  );
}
