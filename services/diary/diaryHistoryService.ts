import { UnitOfWork } from '@/db/repositories/unitOfWork';
import { DiaryHistoryItem } from '@/types/diary/DiaryHistoryItem';
import { sortBy } from '@/utils/array.helper';

class DiaryHistoryService {
    constructor(private unitOfWork: UnitOfWork) {
    }

    public async getHistory(): Promise<DiaryHistoryItem[]> {
        const result = await this.unitOfWork.diaryHistoryRepository.getAll();
        const historyItems = result.map((record) => ({
            id: record.id,
            date: record.date,
            comment: record?.comment,
            symptoms: record.diaryHistoryRecordsToSymptoms.map((link) => ({
                ...link.symptom,
                strengtOfPain: link.strengtOfPain,
            })),
        })) as DiaryHistoryItem[];

        return sortBy(historyItems, 'date', 'desc');
    }

    public async addNote(item: DiaryHistoryItem) {
        await this.unitOfWork.diaryHistoryRepository.create(item);
    }
}

export default DiaryHistoryService;
