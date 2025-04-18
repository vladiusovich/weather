import { FormStore } from '@/store/formStore/FormStore';

type SymptomFields = {
    painPower: number[];
    symptom: string;
}

class SymptomFormStore extends FormStore<SymptomFields> {
    constructor() {
        const options = {
            initialValues: {
                painPower: [],
                symptom: ''
            },
            validators: {
                painPower: (val: number[]) => {
                    return val[0] === 0 ? 'error' : undefined
                },
                symptom: (val: string) => {
                    return !val ? 'error' : undefined
                },
            }
        }

        super(options);
    }

    async submit(): Promise<void> {
        console.log(this.values);
        await Promise.resolve();
    }
}

export default SymptomFormStore;
