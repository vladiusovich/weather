import { SymptomEntity } from "@db/schema";
import SymptomsService from "@services/diary/symptomsService";
import { makeObservable, observable, runInAction } from "mobx";

class SymptomsStore {
    public all: SymptomEntity[] = [];

    constructor(private sympomsService: SymptomsService) {
        makeObservable(this, {
            all: observable,
            // popular: observable,
        });
    }

    // TODO
    public get popular() {
        const symptoms = this.all.slice(0, 4);
        return symptoms;
    }

    public async fetch() {
        const symptoms = await this.sympomsService.getList();

        runInAction(() => {
            this.all = symptoms;
        });
    }

    public async add(symptom: { name: string }) {
        return this.sympomsService.add(symptom);
    }
}

export default SymptomsStore;
