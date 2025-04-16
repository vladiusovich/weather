import { FormStore } from '@/store/formStore/FormStore';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fields = {
    painPower: [] as number[],
    symptom: '',
}

export type SymptomFields = typeof fields;

class SymptomFormStore extends FormStore<SymptomFields> {
    // public defaultValues: typeof fields = fields

    public get test() {
        return this.values.painPower;
    }
}

export default SymptomFormStore;
