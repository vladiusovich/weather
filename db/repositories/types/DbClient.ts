import * as schema from '../../schema';
import * as SQLite from 'expo-sqlite';
import { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
export type SchemaType = typeof schema;
export type DbClient = ExpoSQLiteDatabase<SchemaType> & {
    $client: SQLite.SQLiteDatabase;
};
