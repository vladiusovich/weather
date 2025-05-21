import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { UnitOfWork } from './repositories/UnitOfWork';

const expo = SQLite.openDatabaseSync('weatherSense.db');

export const db = drizzle(expo);
export const unitOfWork = new UnitOfWork(db);
