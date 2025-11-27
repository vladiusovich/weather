import { SymptomEntity } from "@db/schema";
import SymptomsService from "@services/diary/symptomsService";
import { makeObservable, observable, runInAction } from "mobx";

class SymptomsStore {
    public data: SymptomEntity[] = [];

    constructor(private sympomsService: SymptomsService) {
        makeObservable(this, {
            data: observable,
        });
    }

    public async fetch() {
        const symptoms = await this.sympomsService.getList();

        runInAction(() => {
            this.data = symptoms;
        });
    }
}

export default SymptomsStore;
