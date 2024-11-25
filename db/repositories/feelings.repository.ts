import { DrizzleError, eq } from 'drizzle-orm';
import db from '../db';
import { feelings } from '../schema/feelings';

class DatabaseError extends DrizzleError {
  constructor(message: string) {
    super({ message });
    this.name = 'DatabaseError';
  }
}

export type Feeling = Omit<typeof feelings.$inferSelect, 'id'>;

class FeelingsRepository {
  private databaseInstance = db;

  constructor(db: any) {
    this.databaseInstance = db;
  }

  public getFeelings = () => {
    return this.databaseInstance.select().from(feelings);
  };

  public createFeeling = async (feeling: Feeling): Promise<void> => {
    try {
      await this.databaseInstance.insert(feelings).values(feeling);
    } catch (error) {
      console.error('Failed to create feeling:', error);
      throw new DatabaseError('Failed to create feeling in database');
    }
  };

  public deleteFeeling = async (id: number): Promise<void> => {
    try {
      await this.databaseInstance.delete(feelings).where(eq(feelings.id, id));
    } catch (error) {
      console.error('Failed to delete feeling:', error);
      throw new DatabaseError('Failed to delete feeling in database');
    }
  };
}

const feelingsRepository = new FeelingsRepository(db);

export default feelingsRepository;
