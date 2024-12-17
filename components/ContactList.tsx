import { Typography } from './Typography';
import { Separator, XStack, YStack } from 'tamagui';
import * as Contacts from 'expo-contacts';
import { Icon } from './Icon';
import { useEffect, useState } from 'react';
import { useContacts } from '@/services/contacts.service';
import contactsRepository from '@/db/repositories/contacts.repository';
import { Image } from 'expo-image';
import { useQueryClient } from '@tanstack/react-query';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { Card } from './Card';
import { Linking } from 'react-native';

export const ContactList = () => {
  const queryClient = useQueryClient();
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [deleteContactModalOpen, setDeleteContactModalOpen] = useState(false);
  const [deleteContactId, setDeleteContactId] = useState<string | null>(null);
  const { data: contactsData } = useContacts();

  const handlePickContacts = async () => {
    const contact = await Contacts.presentContactPickerAsync();
    if (contact && contact.id) {
      await createContact(contact.id);
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
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
    const contacts = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails, Contacts.Fields.Name, Contacts.Fields.Image],
      id: ids,
    });

    setContacts(contacts.data);
  };

  useEffect(() => {
    if (
      contactsData &&
      contactsData.length > 0 &&
      contactsData[0].contactIds &&
      contactsData[0].contactIds.length !== 0
    ) {
      const ids = contactsData[0].contactIds;
      getContatctDetails(ids);
    }
  }, [contactsData]);

  const handleDeleteContact = (id: string) => {
    setDeleteContactModalOpen(true);
    setDeleteContactId(id);
  };

  const handleDeleteContactConfirmation = async () => {
    setDeleteContactModalOpen(false);
    if (deleteContactId && contactsData?.[0].id) {
      const ids = contactsData?.[0].contactIds?.filter((id) => id !== deleteContactId);
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
          <Typography preset='subheading'>Lista de contacte</Typography>
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
      {deleteContactModalOpen && (
        <DeleteConfirmationModal
          setModalOpen={setDeleteContactModalOpen}
          handleDelete={handleDeleteContactConfirmation}
        />
      )}
    </>
  );
};