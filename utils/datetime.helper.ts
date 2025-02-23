// eslint-disable-next-line @typescript-eslint/no-unused-vars
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type DaysOfWeek = (typeof daysOfWeek)[number];

export const isValidDate = (date?: Date | null): boolean => {
    if (date === null || date === undefined) {
        return false;
    }

    try {
        return !isNaN(date.getTime());
    } catch (e) {
        console.error('isValidDate:', date, e);
        return false;
    }
};

export const toDate = (date: string) => {
    return new Date(date);
};

export const getDayOfWeek = (date: Date): DaysOfWeek => {
    return daysOfWeek[date.getDay()];
};

export const formatDate = (date: Date, template: string): string => {
    const replacements: { [key: string]: string } = {
        YYYY: date.getFullYear().toString(),
        MM: (date.getMonth() + 1).toString().padStart(2, '0'),
        DD: date.getDate().toString().padStart(2, '0'),
    };

    return template.replace(/YYYY|MM|DD/g, (matched) => replacements[matched]);
};
