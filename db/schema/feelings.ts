import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from '../helpers';
import { MainFeeling } from '@/constants/Feelings';

export type FeelingEntry = {
  mainFeeling: MainFeeling;
  secondaryFeelings: string[];
};

export const feelings = sqliteTable('feelings', {
  id: integer('id').primaryKey(),
  feelings: text('feelings', { mode: 'json' }).$type<FeelingEntry[]>().notNull(),
  discomfort: integer('discomfort').notNull(),
  ...timestamps,
});
