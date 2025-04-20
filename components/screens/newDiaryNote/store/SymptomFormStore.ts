import NewNoteFormStore from './NewNoteFormStore';
import AppStoreType from '@/store/AppStoreType';
import { TFunction } from 'i18next';
import LocalizedFormStore from '@/store/formStore/LocalizedFormStore';
import { ValidatorBuilder } from '@/validation';
import constraints from '@/validation/constraints';

export type SymptomFormFields = {
    strengtOfPain: number[];
    symptom: string;
}

class SymptomFormStore extends LocalizedFormStore<SymptomFormFields> {
    private masterForm: NewNoteFormStore;

    constructor(
        store: AppStoreType,
        t: TFunction,
        masterForm: NewNoteFormStore
    ) {
        super(store, t);

        const strengtOfPainValidation = ValidatorBuilder.create<number[]>()
            .add('required', constraints.requiredRange)
            .build({
                required: this.t('common.fields.errors.required'),
            });

        const symptomValidation = ValidatorBuilder.create<string>()
            .add('required', constraints.required)
            .build({
                required: this.t('common.fields.errors.required'),
            });

        this.initValidation({
            strengtOfPain: strengtOfPainValidation,
            symptom: symptomValidation,
        });

        this.masterForm = masterForm;
    }

    async submit(): Promise<void> {
        this.masterForm.addSymptom(this.values);
    }
}

export default SymptomFormStore;
