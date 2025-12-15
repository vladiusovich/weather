import { Symptom } from "@appTypes/diary/DiaryHistoryItem";
import LocalizedFormStore from "@store/formStore/LocalizedFormStore";
import AppStoreType from "@store/AppStoreType";
import { TFunction } from "i18next";
import { ValidatorBuilder } from "@validation/index";
import constraints from "@validation/constraints";
import { generateUUID } from "@utils/generateUUID";

type NewNoteFormFields = {
    date: Date;
    symptoms: Symptom[];
    comment?: string;
}

class NewNoteFormStore extends LocalizedFormStore<NewNoteFormFields> {
    constructor(
        store: AppStoreType,
        t: TFunction,
    ) {
        super(store, t);

        this.values.date = new Date();

        this.initValidation({
            date: ValidatorBuilder.create<Date>()
                .add("required", constraints.requiredDate)
                .build({
                    required: this.t("common.fields.errors.required"),
                }),
            symptoms: ValidatorBuilder.create<Symptom[]>()
                .add("required", constraints.requiredSymptoms)
                .build({
                    required: this.t("common.fields.errors.required"),
                }),
        });

        this.store.diary.symptoms.fetch();
    }

    public get allSymptoms() {
        return this.store.diary.symptoms.all;
    }

    public get popularSymptoms() {
        return this.store.diary.symptoms.popular;
    }

    public get selectedSymptoms() {
        return this.values.symptoms ?? [];
    }

    async submit(): Promise<void> {
        await this.store.diary.history.addNote({
            id: generateUUID(),
            date: this.values.date.toString(), // TODO
            comment: this.values?.comment ?? "",
            symptoms: this.values.symptoms,
        });
    }

    public updateSymptom(s: Symptom) {
        const newState = (this.values?.symptoms ?? []).map(i =>
            i.id === s.id ? s : i
        );

        this.setValue("symptoms", newState);
    }

    public addOrDeleteSymptom(id: string) {
        if (this.isSymptomAdded(id)) {
            this.deleteSymptom(id);
            return;
        }

        const symptom = this.findSymptom(id);

        if (symptom) {
            const v = this.values.symptoms ?? [];
            this.setValue("symptoms", [...v, { ...symptom, strengtOfPain: 5 }]);
        }
    }

    public deleteSymptom(id: string) {
        const symptoms = this.values.symptoms.filter(s => s.id !== id);
        this.setValue("symptoms", [...symptoms]);
    }

    private isSymptomAdded(id: string) {
        return this.values?.symptoms?.some(s => s.id === id);
    }

    private findSymptom(id: string) {
        return this.store.diary.symptoms.all.find(s => s.id === id);
    }
}

export default NewNoteFormStore;
