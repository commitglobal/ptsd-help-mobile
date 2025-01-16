import db from '../db';
import { messages } from '../schema/messages';
import { eq, sql, desc } from 'drizzle-orm';
import { DatabaseError, NotFoundError } from '../helpers';

export type Message = typeof messages.$inferSelect;

class MessagesRepository {
  private databaseInstance = db;

  constructor(db: any) {
    this.databaseInstance = db;
  }

  public getMessages = () => {
    return this.databaseInstance.select().from(messages).orderBy(desc(messages.createdAt));
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
      await this.databaseInstance
        .update(messages)
        .set({
          ...message,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        })
        .where(eq(messages.id, id));
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

const messagesRepository = new MessagesRepository(db);

export default messagesRepository;
