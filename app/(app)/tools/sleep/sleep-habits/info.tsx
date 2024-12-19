import React from 'react';
import { Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/components/Typography';
import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SleepHabitsInfoScreen() {
  const { t } = useTranslation('tools');
  const insets = useSafeAreaInsets();
  const { tool } = useLocalSearchParams();
  const router = useRouter();

  return (
    <Screen
      headerProps={{
        title: t(`sleep.sleep-habits.info`),
        paddingTop: Platform.OS === 'ios' ? '$md' : insets.top + 16,
        iconRight: <Icon icon='x' width={24} height={24} color='$gray12' />,
        onRightPress: () => router.back(),
      }}
      contentContainerStyle={{ padding: '$md' }}>
      <Typography>{t(`sleep.sleep-habits.${tool}.info`)}</Typography>
    </Screen>
  );
}
