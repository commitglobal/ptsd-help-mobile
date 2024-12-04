import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from '../helpers';

export const rid = sqliteTable('rid', {
  id: integer('id').primaryKey(),
  trigger: text('trigger').notNull(),
  difference: text('difference').notNull(),
  decision: text('decision').notNull(),
  ...timestamps,
});
