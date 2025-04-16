import { FormStore } from '@/store/formStore/FormStore';

type SymptomFields = {
    painPower: number[];
    symptom: string;
}

class SymptomFormStore extends FormStore<SymptomFields> {
}

export default SymptomFormStore;
