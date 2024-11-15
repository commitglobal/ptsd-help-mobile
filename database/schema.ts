import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

const messages = sqliteTable('i_message', {
  id: integer('id').primaryKey(),
  botheredBy: text('bothered_by'),
  feeling: text('feeling'),
  feelingReason: text('feeling_reason'),
});

export default { messages };
