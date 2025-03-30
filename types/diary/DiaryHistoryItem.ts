

export interface Symptom {
    id: string;
    name: string;
    strengtOfPain: number;
}

export interface DiaryHistoryItem {
    id: string;
    date: string;
    comment?: string;
    symptoms: Symptom[];
}
