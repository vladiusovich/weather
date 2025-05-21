import symptoms from './seeders/symptoms.seeder';

type Seeder = {
    name: string;
    run: (options: { force?: boolean }) => Promise<void>;
};

const seeders: Seeder[] = [];

export const registerSeeder = (seeder: Seeder) => {
    seeders.push(seeder);
};

registerSeeder(symptoms);

export const runSeeds = async (options: { force?: boolean } = {}) => {
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
