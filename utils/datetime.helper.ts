import dayjs, { OpUnitType } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
type DaysOfWeek = typeof daysOfWeek[number];

/**
 * Converts a date string to a Date object using dayjs.
 */
export const toDate = (dateStr: string): Date => {
    return dayjs(dateStr).toDate();
    // .local()
};

/**
 * Retrieves the abbreviated day of the week for the given date.
 */
export const getDayOfWeek = (date: string): DaysOfWeek | null => {
    const d = dayjs.utc(date);

    if (d.isValid()) {
        return daysOfWeek[d.day()];
    }

    return null;
};

function parseUtcDate(dateStr: string) {
    // If the string doesn't explicitly indicate UTC, append "Z"
    try {

        if (!dateStr?.endsWith('Z')) {
            dateStr += 'Z';
        }
        return dayjs.utc(dateStr);
    } catch (e: any) {
        console.error(dateStr, e)
    }
}

/**
 * Formats the given date according to the provided template.
 * The template supports dayjs tokens (e.g., "YYYY", "MM", "DD").
 */
export const formatDate = (utcTime: string, template: string): string | null => {
    const d = dayjs(parseUtcDate(utcTime));
    if (d.isValid()) {
        return d.local().format(template);
    }

    return null;
};

/**
 * Returns the current date and time (UTC) as a Date object.
 */
export const getNow = (): string => {
    return dayjs().utc().toISOString();
};

const isSame = (date1: string, date2: string, unit: OpUnitType): boolean => {
    return dayjs(parseUtcDate(date1)).isSame(parseUtcDate(date2), unit);
};

/**
 * Determines if two dates occur on the same calendar day.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns true if both dates are on the same day, false otherwise.
 */
export const isSameDay = (date1: string, date2: string): boolean => {
    return isSame(date1, date2, 'day');
};

export const isSameHour = (date1: string, date2: string): boolean => {
    return isSame(date1, date2, 'hours');
};

export const getDaylightDuration = (sunrise: string | Date, sunset: string | Date): string => {
    const diff = dayjs(sunset).diff(dayjs(sunrise), 'millisecond');
    return dayjs.duration(diff).format();
};
