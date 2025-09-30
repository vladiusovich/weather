import { DbContextType } from '@/db';
import { runSeeds } from '@/db/seed/seedRunner';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SEED_FLAG_KEY = 'app:seeded:v1';

export class SeedService {
    constructor(private dbContext: DbContextType) {
    }

    async run({ force = false } = {}) {
        const isSeeded = await AsyncStorage.getItem(SEED_FLAG_KEY);

        if (isSeeded && !force) {
            // console.log('🌱 Seeds already applied — skipping');
            return;
        }

        await runSeeds(this.dbContext, { force });
        await AsyncStorage.setItem(SEED_FLAG_KEY, '1');
    }

    // eslint-disable-next-line class-methods-use-this
    async reset() {
        await AsyncStorage.removeItem(SEED_FLAG_KEY);
        // console.log('🔄 Seed flag reset');
    }
}
