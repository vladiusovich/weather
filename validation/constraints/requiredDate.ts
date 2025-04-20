export const requiredDate = (value?: Date[]): boolean =>{
    return value === undefined || value.length === 0;
};
