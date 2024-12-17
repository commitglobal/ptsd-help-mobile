import { Typography } from './Typography';
import { Separator, XStack, YStack } from 'tamagui';
import * as Contacts from 'expo-contacts';
import { Icon } from './Icon';
import { useEffect, useState } from 'react';
import { useContacts } from '@/services/contacts.service';
import contactsRepository from '@/db/repositories/contacts.repository';
import { Image } from 'expo-image';
import { useQueryClient } from '@tanstack/react-query';
import { Card } from './Card';
import { Linking, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';

export const ContactList = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const { data: contactsData } = useContacts();

  const handlePickContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const contact = await Contacts.presentContactPickerAsync();
      if (contact && contact.id) {
        await createContact(contact.id);
        queryClient.invalidateQueries({ queryKey: ['contacts'] });
      }
    }
  };

  const createContact = async (contactId: string) => {
    if (!contactsData || contactsData.length === 0) {
      await contactsRepository.createContact({
        contactIds: [contactId],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      });
    } else {
      const list = new Set([...(contactsData[0].contactIds || []), contactId]);
      await contactsRepository.updateContact(contactsData[0].id, {
        contactIds: Array.from(list),
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const getContatctDetails = async (ids: string[]) => {
    if (ids.length === 0) {
      setContacts([]);
      return;
    }

    let contacts: any[] = [];
    if (Platform.OS === 'ios') {
      const contactsData = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails, Contacts.Fields.Name, Contacts.Fields.Image],
        id: ids,
      });
      contacts = contactsData.data;
    } else {
      for (const id of ids) {
        const contact = await Contacts.getContactByIdAsync(id);
        contacts.push(contact);
      }
    }

    const availablecontacts = contacts.filter((contact) => contact !== undefined).map((contact) => contact.id);
    if (availablecontacts.length !== contacts.length && contactsData?.[0].id) {
      await contactsRepository.updateContact(contactsData?.[0].id, {
        contactIds: availablecontacts,
        updatedAt: new Date().toISOString(),
      });
    }

    setContacts(contacts.filter((contact) => contact !== undefined));
  };

  useEffect(() => {
    if (contactsData && contactsData.length > 0 && contactsData[0].contactIds) {
      const ids = contactsData[0].contactIds;
      getContatctDetails(ids);
    }
  }, [contactsData]);

  const handleDeleteContact = async (id: string) => {
    if (contactsData?.[0].id) {
      const ids = contactsData?.[0].contactIds?.filter((contactId) => contactId !== id);
      await contactsRepository.updateContact(contactsData?.[0].id, {
        contactIds: ids,
        updatedAt: new Date().toISOString(),
      });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    }
  };

  const handleCallContact = (id: string) => {
    const contact = contacts.find((contact) => contact.id === id);
    if (contact && contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      Linking.openURL(`tel:${contact.phoneNumbers[0].number}`);
    }
  };

  return (
    <>
      <YStack>
        <XStack width='100%' justifyContent='space-between' alignItems='center'>
          <Typography preset='subheading'>{t('contact.title')}</Typography>
          <XStack
            flex={0.2}
            paddingLeft='$md'
            paddingVertical='$md'
            justifyContent='flex-start'
            onPress={handlePickContacts}
            pressStyle={{ opacity: 0.5 }}>
            <Icon icon='plus' width={24} height={24} color='$gray12' />
          </XStack>
        </XStack>
        <Separator />
        <YStack gap='$xs' paddingTop='$md'>
          {contacts?.map((contact: any) => (
            <Card key={contact.id} padding='0' onPress={() => handleCallContact(contact.id)}>
              <XStack
                key={contact.id}
                padding='$xs'
                paddingRight='$md'
                alignItems='center'
                justifyContent='space-between'
                width={'100%'}>
                <XStack alignItems='center' gap='$md'>
                  {contact.imageAvailable && contact.image ? (
                    <Image
                      source={{ uri: contact.image.uri }}
                      contentFit='cover'
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                  ) : (
                    <XStack
                      width={40}
                      height={40}
                      borderRadius={20}
                      backgroundColor='$gray6'
                      alignItems='center'
                      justifyContent='center'>
                      <Icon icon='user' width={24} height={24} color='$gray11' />
                    </XStack>
                  )}
                  <Typography preset='subheading'>{contact.name}</Typography>
                </XStack>
                <XStack onPress={() => handleDeleteContact(contact.id)} pressStyle={{ opacity: 0.5 }}>
                  <Icon icon='x' width={24} height={24} color='$gray12' />
                </XStack>
              </XStack>
            </Card>
          ))}
        </YStack>
      </YStack>
    </>
  );
};
