import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from '../helpers';

export const worries = sqliteTable('worries', {
  id: integer('id').primaryKey(),
  worry: text('worry'),
  reminderEnabled: integer('reminder_enabled', { mode: 'boolean' }).default(false),
  reminderTime: integer('reminder_time', { mode: 'timestamp' }),
  notificationId: text('notification_id'),
  ...timestamps,
});
