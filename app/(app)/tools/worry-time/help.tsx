import React from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/components/Typography';
import { ScrollView } from 'tamagui';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Platform } from 'react-native';

export default function WorryTimeHelp() {
  const { toolsTranslationKeys } = useTranslationKeys();
  const { t } = useTranslation('tools');
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.WORRY_TIME.help),
        // this screen has a presentation type of modal, which is different on ios/android, therefore we need to adjust the paddingTop
        paddingTop: Platform.OS === 'ios' ? '$md' : insets.top + 16,
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}
      contentContainerStyle={{ backgroundColor: 'white' }}>
      <ScrollView
        contentContainerStyle={{ padding: '$md', paddingHorizontal: '$lg', paddingBottom: insets.bottom + 16 }}>
        <Typography>{t(toolsTranslationKeys.WORRY_TIME.helpText)}</Typography>
        <Typography>{t(toolsTranslationKeys.WORRY_TIME.helpText)}</Typography>
      </ScrollView>
    </Screen>
  );
}
