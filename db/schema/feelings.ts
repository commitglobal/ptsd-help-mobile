import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from '../helpers';
import { MainFeeling } from '@/enums/MainFeeling';

export type FeelingEntry = Partial<Record<MainFeeling, string[]>>;

export const feelings = sqliteTable('feelings', {
  id: integer('id').primaryKey(),
  feelings: text('feelings', { mode: 'json' }).$type<FeelingEntry>().notNull(),
  discomfort: integer('discomfort').notNull(),
  ...timestamps,
});
