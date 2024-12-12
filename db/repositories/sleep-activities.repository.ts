import { eq } from 'drizzle-orm';
import db from '../db';
import { sleepActivities } from '../schema/sleep-activities';
import { DatabaseError, NotFoundError } from '../helpers';

export enum SleepActivityType {
  RELAXING = 'relaxing',
  AWAKE = 'awake',
  NO_SLEEP = 'no-sleep',
  WAKE_UP = 'wake-up',
}

export type SleepActivity = Omit<typeof sleepActivities.$inferSelect, 'id'>;

class SleepActivitiesRepository {
  private databaseInstance = db;

  constructor(db: any) {
    this.databaseInstance = db;
  }

  public getSleepActivities = () => {
    return this.databaseInstance.select().from(sleepActivities);
  };

  private deleteAllSleepActivities = async () => {
    await this.databaseInstance.delete(sleepActivities);
  };

  public getSleepActivityByType = async (type: SleepActivityType): Promise<SleepActivity | null> => {
    try {
      const $sleepActivities = await this.databaseInstance
        .select()
        .from(sleepActivities)
        .where(eq(sleepActivities.type, type));

      if (!$sleepActivities.length) {
        return null;
      }
      return $sleepActivities[0];
    } catch (error) {
      console.error('Failed to get sleep activity by id:', error);
      throw error instanceof NotFoundError
        ? error
        : new DatabaseError('Failed to get sleep activity by id from database');
    }
  };

  public createSleepActivity = async (sleepActivity: SleepActivity): Promise<any> => {
    try {
      const result = await this.databaseInstance.insert(sleepActivities).values(sleepActivity);
      return result;
    } catch (error) {
      console.error('Failed to create sleep activity:', error);
      throw new DatabaseError('Failed to create sleep activity in database');
    }
  };

  public updateSleepActivity = async (
    sleepActivityType: SleepActivityType,
    updates: Partial<SleepActivity>
  ): Promise<any> => {
    try {
      const result = await this.databaseInstance
        .update(sleepActivities)
        .set(updates)
        .where(eq(sleepActivities.type, sleepActivityType));
      return result;
    } catch (error) {
      console.error('Failed to update sleep activity:', error);
      throw new DatabaseError('Failed to update sleep activity in database');
    }
  };
}

const sleepActivitiesRepository = new SleepActivitiesRepository(db);

export default sleepActivitiesRepository;
