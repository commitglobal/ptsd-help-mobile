import { DrizzleError, sql } from 'drizzle-orm';
import { text } from 'drizzle-orm/sqlite-core';

export class DatabaseError extends DrizzleError {
  constructor(message: string) {
    super({ message });
    this.name = 'DatabaseError';
  }
}

export class NotFoundError extends DrizzleError {
  constructor(message: string) {
    super({ message });
    this.name = 'NotFoundError';
  }
}

// https://orm.drizzle.team/docs/sql-schema-declaration#advanced
export const timestamps = {
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  deletedAt: text('deleted_at'),
};
