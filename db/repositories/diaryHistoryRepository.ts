import { generateUUID } from "@/utils/generateUUID";
import { diaryHistoryRecords, diaryHistoryRecordsToSymptoms } from "../schema";
import { DbClient } from "./types/dbClient";
import { DiaryHistoryItem } from "@/types/diary/DiaryHistoryItem";

export class DiaryHistoryRepository {
    constructor(
        protected db: DbClient,
    ) { }

    /** Fetch all records */
    async getAll() {
        const result = await this.db.query.diaryHistoryRecords.findMany({
            with: {
                diaryHistoryRecordsToSymptoms: {
                    with: {
                        symptom: true,
                    },
                },
            },
        });

        return result;
    }

    /** Insert a new record; returns the newly created model (requires SQLite >=3.35) */
    async create(data: DiaryHistoryItem) {
        const id = generateUUID();

        await this.db.insert(diaryHistoryRecords).values({
            id,
            date: data.date,
            comment: data.comment,
        });

        if (data.symptoms.length > 0) {
            const values = data.symptoms.map((symptom) => ({
                diaryHistoryRecordId: id,
                symptomId: symptom.id,
                strengtOfPain: symptom.strengtOfPain,
            }));

            await this.db.insert(diaryHistoryRecordsToSymptoms).values(values);
        }

        return id;
    }
};

