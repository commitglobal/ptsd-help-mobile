import db from '../db';
import { feelings } from '../schema/feelings';

export type Feeling = Omit<typeof feelings.$inferSelect, 'id'>;

class FeelingsRepository {
  private databaseInstance = db;

  constructor(db: any) {
    this.databaseInstance = db;
  }
}

const feelingsRepository = new FeelingsRepository(db);

export default feelingsRepository;
