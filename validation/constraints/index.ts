import { requiredDate } from './requiredDate';
import { requiredRange } from './requiredRange';
import { requiredSymptoms } from './requiredSymptoms';

export const required = (value?: string): boolean => {
    return value == null || value.trim() === '';
};

export const minLen = (min: number) => (value?: string): boolean =>
    value !== undefined && value.length < min;

const constraints = {
    required,
    requiredRange,
    requiredDate,
    requiredSymptoms
};

export default constraints;
