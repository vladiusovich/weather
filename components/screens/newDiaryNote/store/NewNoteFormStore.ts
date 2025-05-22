import SymptomFormStore, { SymptomFormFields } from './SymptomFormStore';
import { Symptom } from '@/types/diary/DiaryHistoryItem';
import LocalizedFormStore from '@/store/formStore/LocalizedFormStore';
import AppStoreType from '@/store/AppStoreType';
import { TFunction } from 'i18next';
import { ValidatorBuilder } from '@/validation';
import constraints from '@/validation/constraints';
import { generateUUID } from '@/utils/generateUUID';

type NewNoteFormFields = {
    date: Date[];
    symptoms: Symptom[];
    comment?: string;
}

class NewNoteFormStore extends LocalizedFormStore<NewNoteFormFields> {
    public symptomForm: SymptomFormStore;

    constructor(
        store: AppStoreType,
        t: TFunction,
    ) {
        super(store, t);
        this.symptomForm = new SymptomFormStore(store, t, this);

        this.values.date = [new Date()];

        this.initValidation({
            date: ValidatorBuilder.create<Date[]>()
                .add('required', constraints.requiredDate)
                .build({
                    required: this.t('common.fields.errors.required'),
                }),
            symptoms: ValidatorBuilder.create<Symptom[]>()
                .add('required', constraints.requiredSymptoms)
                .build({
                    required: this.t('common.fields.errors.required'),
                }),
        });

        this.store.diary.symptoms.fetch();
    }

    async submit(): Promise<void> {
        this.store.diary.history.addNote({
            id: generateUUID(),
            date: this.values.date.toString(),
            comment: this.values?.comment,
            symptoms: this.values.symptoms,
        });
    }

    public addOrUpdateSymptom(values: SymptomFormFields) {
        const exists = this.getSymptomValue(values.symptom);

        if (exists) {
            this.deleteSymptom(values.symptom);
        }

        const symptom = this.findSymptom(values.symptom)!;
        const newSymptom: Symptom = {
            ...symptom,
            strengtOfPain: values.strengtOfPain[0],
        };

        this.setValue('symptoms', [...this.values?.symptoms ?? [], newSymptom]);
    }

    public deleteSymptom(id: string) {
        const symptoms = this.values.symptoms.filter(s => s.id !== id);
        this.setValue('symptoms', [...symptoms]);
    }

    public fillSymptom(id: string) {
        const symptom = this.getSymptomValue(id)!;
        this.symptomForm.fillSymptom(symptom.id, symptom.strengtOfPain);
        this.symptomForm.switchMode('edit');
    }

    private getSymptomValue(id: string) {
        return this.values.symptoms?.find(s => s.id === id);
    }

    private findSymptom(id: string) {
        return this.store.diary.symptoms.data.find(s => s.id === id);
    }
}

export default NewNoteFormStore;
