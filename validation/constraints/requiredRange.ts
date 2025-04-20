export const requiredRange = (value?: number[]): boolean =>{
    return value === undefined || value.length === 0 || value[0] === 0;
};
