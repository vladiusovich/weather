import { Symptom } from "@/types/diary/DiaryHistoryItem";

export const requiredSymptoms = (value?: Symptom[]): boolean => {
    return value === undefined || value.length === 0;
};
