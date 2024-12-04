import { DrizzleError, eq } from 'drizzle-orm';
import db from '../db';
import { sleepActivities } from '../schema/sleep-activities';

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

  public createSleepActivity = async (sleepActivity: SleepActivity): Promise<void> => {
    try {
      await this.databaseInstance.insert(sleepActivities).values(sleepActivity);
    } catch (error) {
      console.error('Failed to create sleep activity:', error);
      throw new DatabaseError('Failed to create sleep activity in database');
    }
  };

  public updateSleepActivity = async (sleepActivityType: SleepActivityType, favorites: string[]): Promise<void> => {
    try {
      await this.databaseInstance
        .update(sleepActivities)
        .set({ favorites })
        .where(eq(sleepActivities.type, sleepActivityType));
    } catch (error) {
      console.error('Failed to update sleep activity:', error);
      throw new DatabaseError('Failed to update sleep activity in database');
    }
  };
}

const sleepActivitiesRepository = new SleepActivitiesRepository(db);

export default sleepActivitiesRepository;
