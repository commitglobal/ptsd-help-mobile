import db from './db';
import schema from './schema';
import { eq } from 'drizzle-orm';

class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

type Message = Omit<typeof schema.messages.$inferSelect, 'id'>;

class Repository {
  public getMessages = async () => {
    try {
      return await db.select().from(schema.messages);
    } catch (error) {
      console.error('Failed to get messages:', error);
      throw new DatabaseError('Failed to get messages from database');
    }
  };

  public getMessageById = async (id: number) => {
    try {
      const messages = await db.select().from(schema.messages).where(eq(schema.messages.id, id));
      if (!messages.length) {
        throw new NotFoundError(`Message with id ${id} not found`);
      }
      return messages[0];
    } catch (error) {
      console.error('Failed to get message by id:', error);
      throw error instanceof NotFoundError ? error : new DatabaseError('Failed to get message by id from database');
    }
  };

  public createMessage = async (message: Message) => {
    try {
      return await db.insert(schema.messages).values(message);
    } catch (error) {
      console.error('Failed to create message:', error);
      throw new DatabaseError('Failed to create message in database');
    }
  };

  public updateMessage = async (id: number, message: Message) => {
    try {
      return await db.update(schema.messages).set(message).where(eq(schema.messages.id, id));
    } catch (error) {
      console.error('Failed to update message:', error);
      throw new DatabaseError('Failed to update message in database');
    }
  };
}

const repository = new Repository();

export default repository;
