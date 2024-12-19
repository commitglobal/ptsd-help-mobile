import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from '../helpers';

export const contacts = sqliteTable('contacts', {
  id: integer('id').primaryKey(),
  contactIds: text('contact_ids', { mode: 'json' }).$type<string[]>(),
  ...timestamps,
});
