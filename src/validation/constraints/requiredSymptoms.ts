import { Symptom } from "@appTypes/diary/DiaryHistoryItem";

export const requiredSymptoms = (value?: Symptom[]): boolean => {
    return value === undefined || value.length === 0;
};
