import AppStoreType from "@store/AppStoreType";
import { TFunction } from "i18next";
import LocalizedFormStore from "@store/formStore/LocalizedFormStore";
import { makeObservable } from "mobx";

export type SymptomFormFields = {
    symptomName: string;
}

class NewUserSymptomFormStore extends LocalizedFormStore<SymptomFormFields> {
    constructor(
        store: AppStoreType,
        t: TFunction,
    ) {
        super(store, t);

        makeObservable(this, {
        });
    }

    async submit(): Promise<void> {
        if (this.values.symptomName) {
            const result = await this.store.diary.symptoms.add({ name: this.values.symptomName });

            if (result) {
                this.reset();
                this.store.diary.symptoms.fetch();
            }
        }
    }
}

export default NewUserSymptomFormStore;
