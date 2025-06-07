import { ServicesRootType } from '@/services';
import DiaryHistoryStore from './DiaryHistoryStore';
import SymptomsStore from './SymptomsStore';

class DiaryStore {
    public history: DiaryHistoryStore;
    public symptoms: SymptomsStore;

    constructor(services: ServicesRootType) {
        this.history = new DiaryHistoryStore(services.diaryHistoryService);
        this.symptoms = new SymptomsStore(services.symptomsService);
    }
}

export default DiaryStore;
