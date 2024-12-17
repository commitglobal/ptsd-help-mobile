import React from 'react';
import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ContactList } from '@/components/ContactList';

export default function ContactsSettings() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Screen
      contentContainerStyle={{ padding: '$md', backgroundColor: 'white', gap: '$md' }}
      headerProps={{
        title: t('settings.title'),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: router.back,
      }}>
      <ContactList />
    </Screen>
  );
}
