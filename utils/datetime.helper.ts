import dayjs from 'dayjs';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
type DaysOfWeek = typeof daysOfWeek[number];

/**
 * Checks if the provided date is valid.
 * Returns false if the date is null, undefined, or invalid.
 */
export const isValidDate = (date?: Date | null): boolean => {
    return !!date && dayjs(date).isValid();
};

/**
 * Converts a date string to a Date object using dayjs.
 */
export const toDate = (dateStr: string): Date => {
    return dayjs(dateStr).toDate();
};

/**
 * Retrieves the abbreviated day of the week for the given date.
 */
export const getDayOfWeek = (date: Date): DaysOfWeek => {
    const dayIndex = dayjs(date).day();
    return daysOfWeek[dayIndex];
};

/**
 * Formats the given date according to the provided template.
 * The template supports dayjs tokens (e.g., "YYYY", "MM", "DD").
 */
export const formatDate = (date: Date, template: string): string => {
    return dayjs(date).format(template);
};
