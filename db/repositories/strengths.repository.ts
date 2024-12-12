import { eq, sql } from 'drizzle-orm';
import db from '../db';
import { strengths } from '../schema/strengths';
import { DatabaseError, NotFoundError } from '../helpers';

export type Strength = Omit<typeof strengths.$inferSelect, 'id'>;

class StrengthsRepository {
  private databaseInstance = db;

  constructor(db: any) {
    this.databaseInstance = db;
  }

  public getStrengths = () => {
    return this.databaseInstance.select().from(strengths);
  };

  public getStrengthById = async (id: number): Promise<Strength> => {
    try {
      const $strengths = await this.databaseInstance.select().from(strengths).where(eq(strengths.id, id));
      if (!$strengths.length) {
        throw new NotFoundError(`Strength with id ${id} not found`);
      }
      return $strengths[0];
    } catch (error) {
      console.error('Failed to get strength by id:', error);
      throw error instanceof NotFoundError ? error : new DatabaseError('Failed to get strength by id from database');
    }
  };

  public createStrength = async (strength: Strength): Promise<void> => {
    try {
      await this.databaseInstance.insert(strengths).values(strength);
    } catch (error) {
      console.error('Failed to create strength:', error);
      throw new DatabaseError('Failed to create strength in database');
    }
  };

  public updateStrength = async (id: number, strength: Strength): Promise<void> => {
    try {
      await this.databaseInstance
        .update(strengths)
        .set({
          ...strength,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        })
        .where(eq(strengths.id, id));
    } catch (error) {
      console.error('Failed to update strength:', error);
      throw new DatabaseError('Failed to update strength in database');
    }
  };

  public deleteStrength = async (id: number): Promise<void> => {
    try {
      await this.databaseInstance.delete(strengths).where(eq(strengths.id, id));
    } catch (error) {
      console.error('Failed to delete strength:', error);
      throw new DatabaseError('Failed to delete strength in database');
    }
  };
}

const strengthsRepository = new StrengthsRepository(db);

export default strengthsRepository;
