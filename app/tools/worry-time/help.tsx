import React from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import { Typography } from '@/components/Typography';
import { ScrollView } from 'tamagui';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function WorryTimeHelp() {
  const { t } = useTranslation('tools');
  const translationKey = TOOLS_TRANSLATIONS_CONFIG.WORRY_TIME;
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <Screen
      headerProps={{
        title: t(translationKey.help),
        paddingTop: '$md',
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}
      contentContainerStyle={{ backgroundColor: 'white' }}>
      <ScrollView
        contentContainerStyle={{ padding: '$md', paddingHorizontal: '$lg', paddingBottom: insets.bottom + 16 }}>
        <Typography>{t(translationKey.helpText)}</Typography>
        <Typography>{t(translationKey.helpText)}</Typography>
      </ScrollView>
    </Screen>
  );
}
