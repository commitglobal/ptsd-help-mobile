import { sql } from 'drizzle-orm';
import { text } from 'drizzle-orm/sqlite-core';

// https://orm.drizzle.team/docs/sql-schema-declaration#advanced
export const timestamps = {
  updatedAt: text('updated_at'),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  deletedAt: text('deleted_at'),
};
