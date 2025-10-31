import { DiaryHistoryRecordsEntity } from "@/db/schema";

export interface Symptom {
    id: string;
    name: string;
    code?: string;
    strengtOfPain: number;
};

export interface DiaryHistoryItem extends DiaryHistoryRecordsEntity {
    symptoms: Symptom[];
};
