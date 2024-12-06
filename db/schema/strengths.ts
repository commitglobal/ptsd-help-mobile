import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from '../helpers';

export const strengths = sqliteTable('strengths', {
  id: integer('id').primaryKey(),
  strength: text('strength'),
  image: text('image'),
  ...timestamps,
});
