import SymptomFormStore, { SymptomFormFields } from './SymptomFormStore';
import { Symptom } from '@/types/diary/DiaryHistoryItem';
import LocalizedFormStore from '@/store/formStore/LocalizedFormStore';
import AppStoreType from '@/store/AppStoreType';
import { TFunction } from 'i18next';

type NewNoteFormFields = {
    date: string;
    symptoms?: Symptom[];
}

class NewNoteFormStore extends LocalizedFormStore<NewNoteFormFields> {
    public symptomForm: SymptomFormStore;

    constructor(
        store: AppStoreType,
        t: TFunction,
    ) {
        super(store, t);
        this.symptomForm = new SymptomFormStore(store, t, this);
    }

    async submit(): Promise<void> {
        console.log(this.values);
        await Promise.resolve();
    }

    public addSymptom(values: SymptomFormFields) {
        const symptom = this.findSymptom(values.symptom)!;
        const newSymptom: Symptom = {
            ...symptom,
            strengtOfPain: values.strengtOfPain[0],
        };

        this.setValue('symptoms', [...this.values?.symptoms ?? [], newSymptom]);
    }

    private findSymptom(id: string) {
        return this.store.diary.symptoms.data.find(s => s.id === id);
    }
}

export default NewNoteFormStore;
