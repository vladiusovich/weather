export const requiredDates = (value?: Date[]): boolean =>{
    return value === undefined || value.length === 0;
};

export const requiredDate = (value?: Date): boolean =>{
    return value === undefined;
};
