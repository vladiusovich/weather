import { AppServicesRootType } from "@services/AppServicesRootType";
import DiaryHistoryStore from "./DiaryHistoryStore";
import SymptomsStore from "./SymptomsStore";

class DiaryStore {
    public history: DiaryHistoryStore;
    public symptoms: SymptomsStore;

    constructor(services: AppServicesRootType) {
        this.history = new DiaryHistoryStore(services.diaryHistoryService);
        this.symptoms = new SymptomsStore(services.symptomsService);
    }
}

export default DiaryStore;
