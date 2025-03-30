import DiaryHistoryStore from './DiaryHistoryStore';
import SymptomsStore from './SymptomsStore';

class DiaryStore {
    public history: DiaryHistoryStore;
    public symptoms: SymptomsStore;

    constructor() {
        this.history = new DiaryHistoryStore();
        this.symptoms = new SymptomsStore();
    }
}

export default DiaryStore;
