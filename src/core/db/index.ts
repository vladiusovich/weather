import * as SQLite from "expo-sqlite";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { drizzle, ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { UnitOfWork } from "./repositories/unitOfWork";
import migrations from "./weatherSense/migrations";

export type AppDbType = ExpoSQLiteDatabase<typeof schema> & {
    $client: SQLite.SQLiteDatabase;
};

export interface DbContextType {
    db: AppDbType;
    unitOfWork: UnitOfWork;
};

export const initDb = async (): Promise<DbContextType> => {
    const client = await SQLite.openDatabaseAsync("weatherSense.db");
    const db = drizzle(client, { schema });
    const unitOfWork = new UnitOfWork(db);

    return { db, unitOfWork };
};

export const runMigrations = async (db: AppDbType) => {
    await migrate(db, migrations);
};
