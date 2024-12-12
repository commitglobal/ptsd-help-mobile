import { eq } from 'drizzle-orm';
import db from '../db';
import { feelings } from '../schema/feelings';
import { DatabaseError, NotFoundError } from '../helpers';

export type Feeling = Omit<typeof feelings.$inferSelect, 'id'>;

class FeelingsRepository {
  private databaseInstance = db;

  constructor(db: any) {
    this.databaseInstance = db;
  }

  public getFeelings = () => {
    return this.databaseInstance.select().from(feelings);
  };

  public getFeelingById = async (id: number): Promise<Feeling> => {
    try {
      const $feelings = await this.databaseInstance.select().from(feelings).where(eq(feelings.id, id));
      if (!$feelings.length) {
        throw new NotFoundError(`Feeling with id ${id} not found`);
      }
      return $feelings[0];
    } catch (error) {
      console.error('Failed to get feeling by id:', error);
      throw error instanceof NotFoundError ? error : new DatabaseError('Failed to get feeling by id from database');
    }
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
