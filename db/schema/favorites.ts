import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from '../helpers';

export const favorites = sqliteTable('favorites', {
  id: integer('id').primaryKey(),
  toolId: text('toolId').notNull(),
  ...timestamps,
});
