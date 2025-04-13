import dayjs, { OpUnitType } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
type DaysOfWeek = typeof daysOfWeek[number];

export const DATE_FORMAT = 'DD/MM/YYYY';
export const TIME_FORMAT = 'HH:mm';

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
    try {
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
    if (!utcTime) {
        return null;
    }

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

export const formatSecondsToTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    // Format with leading zeros
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
};
