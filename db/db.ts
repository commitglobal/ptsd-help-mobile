import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';

// enableChangeListener - will enable live queries
const expo = openDatabaseSync('db.db', { enableChangeListener: true });
const db = drizzle(expo);

export default db;
