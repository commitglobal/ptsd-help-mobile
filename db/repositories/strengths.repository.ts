import { DrizzleError } from 'drizzle-orm';
import db from '../db';
import { strengths } from '../schema/strengths';

class DatabaseError extends DrizzleError {
  constructor(message: string) {
    super({ message });
    this.name = 'DatabaseError';
  }
}

export type Strength = Omit<typeof strengths.$inferSelect, 'id'>;

class StrengthsRepository {
  private databaseInstance = db;

  constructor(db: any) {
    this.databaseInstance = db;
  }

  public getStrengths = () => {
    return this.databaseInstance.select().from(strengths);
  };

  public createStrength = async (strength: Strength): Promise<void> => {
    try {
      await this.databaseInstance.insert(strengths).values(strength);
    } catch (error) {
      console.error('Failed to create strength:', error);
      throw new DatabaseError('Failed to create strength in database');
    }
  };

  //   public updateWorry = async (id: number, worry: Worry): Promise<void> => {
  //     try {
  //       await this.databaseInstance
  //         .update(worries)
  //         .set({
  //           ...worry,
  //           updatedAt: sql`CURRENT_TIMESTAMP`,
  //         })
  //         .where(eq(worries.id, id));
  //     } catch (error) {
  //       console.error('Failed to update worry:', error);
  //       throw new DatabaseError('Failed to update worry in database');
  //     }
  //   };
}

const strengthsRepository = new StrengthsRepository(db);

export default strengthsRepository;
