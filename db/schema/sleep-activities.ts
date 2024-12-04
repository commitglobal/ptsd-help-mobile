import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from '../helpers';

export const sleepActivities = sqliteTable('sleep_activities', {
  id: integer('id').primaryKey(),
  type: text('type', { enum: ['relaxing', 'awake', 'no-sleep', 'wake-up'] }).notNull(),
  favorites: text('favorites', { mode: 'json' }).$type<string[]>(),
  ...timestamps,
});
