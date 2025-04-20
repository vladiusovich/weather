import { requiredDate } from './requiredDate';
import { requiredRange } from './requiredRange';

export const required = (value?: string): boolean => {
    return value == null || value.trim() === '';
};

export const minLen = (min: number) => (value?: string): boolean =>
    value !== undefined && value.length < min;

const constraints = {
    required,
    requiredRange,
    requiredDate,
};

export default constraints;
