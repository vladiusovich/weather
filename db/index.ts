import * as SQLite from 'expo-sqlite';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { UnitOfWork } from './repositories/unitOfWork';

const expo = SQLite.openDatabaseSync('weatherSense.db');
export const db = drizzle(expo, { schema });
export const unitOfWork = new UnitOfWork(db);
