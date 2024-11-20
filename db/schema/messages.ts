import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from '../helpers';

export const messages = sqliteTable('i_message', {
  id: integer('id').primaryKey(),
  annoyance: text('annoyance'),
  message: text('message'),
  because: text('because'),
  ...timestamps,
});
