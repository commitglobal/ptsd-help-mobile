import React from 'react';
import { Screen } from '@/components/Screen';
import { Typography } from '@/components/Typography';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { ScrollView } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { RichTextContentComponent } from '@/app/(app)/content/topic';

export default function About() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <Screen
      contentContainerStyle={{ backgroundColor: 'white' }}
      headerProps={{
        title: t('about.title'),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: router.back,
      }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: '$md', paddingBottom: insets.bottom + 32, flexGrow: 1, gap: '$md' }}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <Typography preset='heading' textAlign='center' paddingHorizontal='$lg'>
          {t('licence-agreement.title')}
        </Typography>
        <RichTextContentComponent content={{ type: 'rich-text', content: t('licence-agreement.p1') }} />
      </ScrollView>
    </Screen>
  );
}
