import { Typography } from './Typography';
import { Separator, XStack, YStack } from 'tamagui';
import * as Contacts from 'expo-contacts';
import { Icon } from './Icon';
import { useContacts } from '@/services/contacts.service';
import contactsRepository from '@/db/repositories/contacts.repository';
import { Image } from 'expo-image';
import { useQueryClient } from '@tanstack/react-query';
import { Card } from './Card';
import { Alert, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';

export const ContactList = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data: contacts } = useContacts();

  const handlePickContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const contact = await Contacts.presentContactPickerAsync();
      if (contact && contact.id) {
        await createContact(contact.id);
        queryClient.invalidateQueries({ queryKey: ['contacts'] });
      }
    } else {
      Alert.alert(t('contact.permission-denied'));
    }
  };

  const createContact = async (contactId: string) => {
    if (!contacts) {
      await contactsRepository.createContact({
        contactIds: [contactId],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      });
    } else {
      const contactData = await contactsRepository.getContacts();
      const list = new Set([...(contactData[0].contactIds || []), contactId]);
      await contactsRepository.updateContact(contactData[0].id, {
        contactIds: Array.from(list),
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const handleDeleteContact = async (id: string) => {
    const contactData = await contactsRepository.getContacts();
    if (contactData?.[0].id) {
      const ids = contactData?.[0].contactIds?.filter((contactId: string) => contactId !== id);
      await contactsRepository.updateContact(contactData?.[0].id, {
        contactIds: ids,
        updatedAt: new Date().toISOString(),
      });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    }
  };

  const handleCallContact = (id: string) => {
    const contact = contacts?.find((contact) => contact.id === id);
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
