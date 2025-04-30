import * as SQLite from 'expo-sqlite';
import { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';

export type DbClient = ExpoSQLiteDatabase<Record<string, never>> & {
    $client: SQLite.SQLiteDatabase;
};
