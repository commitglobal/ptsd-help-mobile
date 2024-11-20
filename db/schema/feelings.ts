import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { timestamps } from '../helpers';

export const feelings = sqliteTable('feelings', {
  id: integer('id').primaryKey(),
  ...timestamps,
});
