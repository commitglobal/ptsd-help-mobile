import { DrizzleError, eq } from 'drizzle-orm';
import db from '../db';
import { rid } from '../schema/rid';

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

export type RID = Omit<typeof rid.$inferSelect, 'id'>;

class RIDRepository {
  private databaseInstance = db;

  constructor(db: any) {
    this.databaseInstance = db;
  }

  public getRIDs = () => {
    return this.databaseInstance.select().from(rid);
  };

  public getRIDById = async (id: number): Promise<RID> => {
    try {
      const $rid = await this.databaseInstance.select().from(rid).where(eq(rid.id, id));
      if (!$rid.length) {
        throw new NotFoundError(`RID with id ${id} not found`);
      }
      return $rid[0];
    } catch (error) {
      console.error('Failed to get RID by id:', error);
      throw error instanceof NotFoundError ? error : new DatabaseError('Failed to get RID by id from database');
    }
  };

  public createRID = async (ridData: RID): Promise<void> => {
    try {
      await this.databaseInstance.insert(rid).values(ridData);
    } catch (error) {
      console.error('Failed to create RID:', error);
      throw new DatabaseError('Failed to create RID in database');
    }
  };

  public deleteRID = async (id: number): Promise<void> => {
    try {
      await this.databaseInstance.delete(rid).where(eq(rid.id, id));
    } catch (error) {
      console.error('Failed to delete RID:', error);
      throw new DatabaseError('Failed to delete RID in database');
    }
  };
}

const ridRepository = new RIDRepository(db);

export default ridRepository;
