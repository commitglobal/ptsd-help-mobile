import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from '../helpers';

export const favourites = sqliteTable('favourites', {
  id: integer('id').primaryKey(),
  toolId: text('toolId').notNull(),
  ...timestamps,
});
