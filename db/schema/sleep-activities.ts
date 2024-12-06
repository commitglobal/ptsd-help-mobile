import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from '../helpers';
import { sql } from 'drizzle-orm';

export const sleepActivities = sqliteTable('sleep_activities', {
  id: integer('id').primaryKey(),
  type: text('type', { enum: ['relaxing', 'awake', 'no-sleep', 'wake-up'] }).notNull(),
  favorites: text('favorites', { mode: 'json' }).$type<string[]>(),
  reminderTime: integer('reminder_time', { mode: 'timestamp' }).default(sql`NULL`),
  notificationId: text('notification_id').default(sql`NULL`),
  ...timestamps,
});
