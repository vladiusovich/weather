import dayjs, { OpUnitType } from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

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

/**
 * Returns the current date and time as a Date object.
 */
export const getNow = (): Date => {
    return dayjs().toDate();
};

const isSame = (date1: Date, date2: Date, unit: OpUnitType): boolean => {
    return dayjs(date1).isSame(dayjs(date2), unit);
};

/**
 * Determines if two dates occur on the same calendar day.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns true if both dates are on the same day, false otherwise.
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
    return isSame(date1, date2, 'day');
};

export const isSameHour = (date1: Date, date2: Date): boolean => {
    return isSame(date1, date2, 'hours');
};

export const getDaylightDuration = (sunrise: string | Date, sunset: string | Date): string => {
    const diff = dayjs(sunset).diff(dayjs(sunrise), 'millisecond');
    return dayjs.duration(diff).format();
};
