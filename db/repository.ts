import db from './db';
import { messages } from './schema';
import { eq, DrizzleError } from 'drizzle-orm';

class DatabaseError extends DrizzleError {
  constructor(message: string) {
    super({ message });
    this.name = 'DatabaseError';
  }
}

class NotFoundError extends DrizzleError {
  constructor(message: string) {
    super({ message });
    this.name = 'NotFoundError';
  }
}

export type Message = Omit<typeof messages.$inferSelect, 'id'>;

class Repository {
  private databaseInstance = db;

  constructor(db: any) {
    this.databaseInstance = db;
  }

  public getMessages = () => {
    return this.databaseInstance.select().from(messages);
  };

  public getMessageById = async (id: number): Promise<Message> => {
    try {
      const $messages = await this.databaseInstance.select().from(messages).where(eq(messages.id, id));
      if (!$messages.length) {
        throw new NotFoundError(`Message with id ${id} not found`);
      }
      return $messages[0];
    } catch (error) {
      console.error('Failed to get message by id:', error);
      throw error instanceof NotFoundError ? error : new DatabaseError('Failed to get message by id from database');
    }
  };

  public createMessage = async (message: Message): Promise<void> => {
    try {
      await this.databaseInstance.insert(messages).values(message);
    } catch (error) {
      console.error('Failed to create message:', error);
      throw new DatabaseError('Failed to create message in database');
    }
  };

  public updateMessage = async (id: number, message: Message): Promise<void> => {
    try {
      await this.databaseInstance.update(messages).set(message).where(eq(messages.id, id));
    } catch (error) {
      console.error('Failed to update message:', error);
      throw new DatabaseError('Failed to update message in database');
    }
  };

  public deleteMessage = async (id: number): Promise<void> => {
    try {
      await this.databaseInstance.delete(messages).where(eq(messages.id, id));
    } catch (error) {
      console.error('Failed to delete message:', error);
      throw new DatabaseError('Failed to delete message in database');
    }
  };
}

const repository = new Repository(db);

export default repository;
