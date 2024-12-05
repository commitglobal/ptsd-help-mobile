import { DrizzleError, eq, sql } from 'drizzle-orm';
import db from '../db';
import { worries } from '../schema/worries';

class DatabaseError extends DrizzleError {
  constructor(message: string) {
    super({ message });
    this.name = 'DatabaseError';
  }
}

export type Worry = Omit<typeof worries.$inferSelect, 'id'>;

class WorriesRepository {
  private databaseInstance = db;

  constructor(db: any) {
    this.databaseInstance = db;
  }

  public getWorries = () => {
    return this.databaseInstance.select().from(worries);
  };

  public createWorry = async (worry: Worry): Promise<void> => {
    try {
      await this.databaseInstance.insert(worries).values(worry);
    } catch (error) {
      console.error('Failed to create worry:', error);
      throw new DatabaseError('Failed to create worry in database');
    }
  };

  public updateWorry = async (id: number, worry: Worry): Promise<void> => {
    try {
      await this.databaseInstance
        .update(worries)
        .set({
          ...worry,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        })
        .where(eq(worries.id, id));
    } catch (error) {
      console.error('Failed to update worry:', error);
      throw new DatabaseError('Failed to update worry in database');
    }
  };
}

const worriesRepository = new WorriesRepository(db);

export default worriesRepository;
