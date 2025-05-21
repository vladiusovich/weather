import { db } from '@/db';
import migrations from '@/db/weatherSense/migrations';
import { SeedService } from './SeedService';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';

export class AppService {
    static async init() {
        try {
            console.log('Try to migrate DB');

            await migrate(db, migrations);
            console.log('Migration: success');
        } catch (error) {
            console.error('Migration faild', error);
            return;
        }

        await SeedService.run();
    }
}
