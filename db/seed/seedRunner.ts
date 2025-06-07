import { DbContextType } from '..';
import { BaseSeederType, SeederOptionsType } from './baseSeedType';
import { SymptomsSeed } from './seeders/symptoms.seeder';

const seeders: BaseSeederType[] = [];

export const addSeeder = (seeder: BaseSeederType) => {
    seeders.push(seeder);
};

const registrateSeeders = (dbContext: DbContextType) => {
    addSeeder(new SymptomsSeed(dbContext));
}

export const runSeeds = async (dbContext: DbContextType, options: SeederOptionsType) => {
    registrateSeeders(dbContext);

    console.log(`🌱 Running seeders (count: ${seeders.length})...\n`);

    for (const seeder of seeders) {
        try {
            console.log(`🔸 Seeding: ${seeder.name}`);
            await seeder.run(options);
            console.log(`✅ Done: ${seeder.name}\n`);
        } catch (err) {
            console.error(`❌ Failed: ${seeder.name}`, err);
        }
    }

    console.log('🌿 Seeding complete.');
};
