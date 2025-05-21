import { runSeeds } from '@/db/seed/seedRunner';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SEED_FLAG_KEY = 'app:seeded:v1';

export class SeedService {
    static async run({ force = false } = {}) {
        const isSeeded = await AsyncStorage.getItem(SEED_FLAG_KEY);

        if (isSeeded && !force) {
            console.log('🌱 Seeds already applied — skipping');
            return;
        }

        await runSeeds({ force });
        await AsyncStorage.setItem(SEED_FLAG_KEY, '1');
    }

    static async reset() {
        await AsyncStorage.removeItem(SEED_FLAG_KEY);
        console.log('🔄 Seed flag reset');
    }
}
