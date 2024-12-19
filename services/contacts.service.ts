import { useQuery } from '@tanstack/react-query';
import contactsRepository from '@/db/repositories/contacts.repository';
import { Platform } from 'react-native';

import * as Contacts from 'expo-contacts';

const contactsKeys = {
  details: () => ['contacts'] as const,
};

const getContacts = async () => {
  const contacts = await contactsRepository.getContacts();
  return getContatctDetails(contacts?.[0]);
};

const getContatctDetails = async (contactsData: any) => {
  if (!contactsData) {
    return undefined;
  }
  if (contactsData.contactIds.length === 0) {
    return [];
  }

  let contacts: any[] = [];
  if (Platform.OS === 'ios') {
    const contactsDetails = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails, Contacts.Fields.Name, Contacts.Fields.Image],
      id: contactsData.contactIds,
    });
    contacts = contactsDetails.data;
  } else {
    for (const id of contactsData.contactIds) {
      const contact = await Contacts.getContactByIdAsync(id);
      contacts.push(contact);
    }
  }

  // Update the contact list in the database if the number of contacts is different
  // This is to ensure that the contact list is updated when a contact is added or removed
  // It happens when a contact is deleted from the device
  // We return the avaible contacts by using a filter
  const availablecontacts = contacts.filter((contact) => contact !== undefined).map((contact) => contact.id);
  if (availablecontacts.length !== contacts.length && contactsData?.[0].id) {
    await contactsRepository.updateContact(contactsData?.[0].id, {
      contactIds: availablecontacts,
      updatedAt: new Date().toISOString(),
    });
  }

  return contacts.filter((contact) => contact !== undefined);
};

export const useContacts = () => {
  return useQuery({
    queryKey: contactsKeys.details(),
    queryFn: getContacts,
    gcTime: 0,
    staleTime: 0,
  });
};
