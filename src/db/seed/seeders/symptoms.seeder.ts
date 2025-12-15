import { DbContextType } from "@db/index";
import { generateUUID } from "@utils/generateUUID";
import { BaseSeederType, SeederOptionsType } from "../baseSeedType";

export class SymptomsSeed implements BaseSeederType {
    public readonly name = "Symptoms";

    /** Source data — keep it private so callers can’t mutate it. */
    private static readonly symptoms = [
        "Headache",
        "Migraine",
        "Joint pain",
        "Muscle ache",
        "Back pain",
        "Neck pain",
        "Scarring pain",
        "Toothache",
        "Pressure in sinuses",
        "Fatigue",
    ] as const;

    constructor(private ctx: DbContextType) { }

    // eslint-disable-next-line class-methods-use-this
    async run({ force = false }: SeederOptionsType): Promise<void> {
        const repo = this.ctx.unitOfWork.symptomRepository;
        const existing = await repo.getAll();

        if (existing.length > 0 && !force) return;

        // Uncomment if you really need to wipe the table before reseeding.
        // if (force && typeof repo.deleteAll === 'function') {
        //   await repo.deleteAll();
        // }

        await repo.createRange(
            SymptomsSeed.symptoms.map((name) => ({
                id: generateUUID(),
                name,
            })),
        );
    }
}
