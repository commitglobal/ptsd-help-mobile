import { eq } from 'drizzle-orm';
import db from '../db';
import { contacts } from '../schema/contacts';
import { DatabaseError, NotFoundError } from '../helpers';

export type Contact = Omit<typeof contacts.$inferSelect, 'id'>;

class ContactsRepository {
  private databaseInstance = db;

  constructor(db: any) {
    this.databaseInstance = db;
  }

  public getContacts = () => {
    return this.databaseInstance.select().from(contacts);
  };

  public getContactById = async (id: number): Promise<Contact> => {
    try {
      const $contacts = await this.databaseInstance.select().from(contacts).where(eq(contacts.id, id));
      if (!$contacts.length) {
        throw new NotFoundError(`Contact with id ${id} not found`);
      }
      return $contacts[0];
    } catch (error) {
      console.error('Failed to get contact by id:', error);
      throw error instanceof NotFoundError ? error : new DatabaseError('Failed to get contact by id from database');
    }
  };

  public createContact = async (contact: Contact): Promise<void> => {
    try {
      await this.databaseInstance.insert(contacts).values(contact);
    } catch (error) {
      console.error('Failed to create contact:', error);
      throw new DatabaseError('Failed to create contact in database');
    }
  };

  public updateContact = async (id: number, contact: Partial<Contact>): Promise<void> => {
    try {
      await this.databaseInstance.update(contacts).set(contact).where(eq(contacts.id, id));
    } catch (error) {
      console.error('Failed to update contact:', error);
      throw new DatabaseError('Failed to update contact in database');
    }
  };

  public deleteContact = async (id: number): Promise<void> => {
    try {
      await this.databaseInstance.delete(contacts).where(eq(contacts.id, id));
    } catch (error) {
      console.error('Failed to delete contact:', error);
      throw new DatabaseError('Failed to delete contact in database');
    }
  };
}

const contactsRepository = new ContactsRepository(db);

export default contactsRepository;
