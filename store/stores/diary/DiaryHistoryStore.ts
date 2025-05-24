import DiaryHistoryService from '@/services/diary/diaryHistoryService';
import { DiaryHistoryItem } from '@/types/diary/DiaryHistoryItem';
import { delay } from '@/utils/promise.helper';
import { makeObservable, observable, runInAction } from 'mobx';

class DiaryHistoryStore {
    public data: DiaryHistoryItem[] = []
    public isLoading: boolean = false;

    constructor(protected diaryHistoryService: DiaryHistoryService) {
        makeObservable(this, {
            data: observable,
            isLoading: observable,
        });
    }

    public async fetch() {
        runInAction(() => {
            this.isLoading = true;
        });

        const history = await this.diaryHistoryService.getHistory();

        await delay(2000);
        runInAction(() => {
            this.data = history;
            this.isLoading = false;
        });
    }

    public async addNote(item: DiaryHistoryItem) {
        await this.diaryHistoryService.addNote(item);
        this.fetch();
    }
}

export default DiaryHistoryStore;
