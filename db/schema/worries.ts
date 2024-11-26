import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from '../helpers';

export const worries = sqliteTable('worries', {
  id: integer('id').primaryKey(),
  worry: text('worry'),
  ...timestamps,
});
