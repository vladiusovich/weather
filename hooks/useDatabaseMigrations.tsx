import { useEffect } from 'react';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../db/weatherSense/migrations';
import { db } from '@/db/';

// TODO
export const useDatabaseMigrations = () => {
    const { success, error } = useMigrations(db, migrations);

    useEffect(() => {
        console.log('Migration', { success, error });

        if (!success) {
            return;
        };
    }, [error, success]);

    return {
        success,
        error,
    }
};

export default useDatabaseMigrations;
