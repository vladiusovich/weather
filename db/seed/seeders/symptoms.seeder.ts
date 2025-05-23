import { unitOfWork } from '@/db';
import { generateUUID } from '@/utils/generateUUID';

const symptomsSeed = [
    'Headache',
    'Migraine',
    'Joint pain',
    'Muscle ache',
    'Back pain',
    'Neck pain',
    'Scarring pain',
    'Toothache',
    'Pressure in sinuses',
    'Fatigue',
];

export default {
    name: 'Symptoms',
    run: async ({ force = false }) => {
        const repo = unitOfWork.symptomRepository;
        const existing = await repo.getAll();

        if (existing.length > 0 && !force) return;

        // if (force) {
        //     await repo.deleteAll?.();
        // }

        await repo.create(
            symptomsSeed.map((name) => ({
                id: generateUUID(),
                name,
            }))
        );
    },
};
