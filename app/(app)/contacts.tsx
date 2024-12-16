import React from 'react';
import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Contacts from 'expo-contacts';
import Button from '@/components/Button';

export default function ContactsSettings() {
  const { t } = useTranslation();
  const router = useRouter();

  const handlePickContacts = async () => {
    const contacts = await Contacts.presentContactPickerAsync();
    console.log(contacts);
  };

  return (
    <Screen
      contentContainerStyle={{ padding: '$md', backgroundColor: 'white', gap: '$md' }}
      headerProps={{
        title: t('settings.title'),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: router.back,
      }}>
      <Button onPress={handlePickContacts}>Pick contacts</Button>
    </Screen>
  );
}
