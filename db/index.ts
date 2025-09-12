import * as SQLite from 'expo-sqlite';
import * as schema from './schema';
import { drizzle, ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { UnitOfWork } from './repositories/unitOfWork';

export interface DbContextType {
    db: ExpoSQLiteDatabase<typeof schema> & {
        $client: SQLite.SQLiteDatabase;
    };
    unitOfWork: UnitOfWork;
};

export const initDb = async (): Promise<DbContextType> => {
    const client = await SQLite.openDatabaseAsync('weatherSense.db');
    const db = drizzle(client, { schema });
    const unitOfWork = new UnitOfWork(db);

    return { db, unitOfWork };
};
