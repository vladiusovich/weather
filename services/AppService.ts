import { db } from '@/db';
import migrations from '@/db/weatherSense/migrations';
import { SeedService } from './SeedService';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';

export class AppService {
    static async init() {
        try {
            await migrate(db, migrations);
        } catch (error) {
            console.error('Migration faild', error);
            return;
        }

        await SeedService.run();
    }
}
