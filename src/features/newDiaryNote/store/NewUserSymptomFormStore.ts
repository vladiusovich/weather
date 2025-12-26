import AppStoreType from "src/appStore/AppStoreType";
import { TFunction } from "i18next";
import { makeObservable } from "mobx";
import LocalizedFormStore from "@form/formStore/LocalizedFormStore";

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
