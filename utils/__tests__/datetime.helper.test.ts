import dayjs from 'dayjs';
import {
    toDate,
    formatDate,
    getNow,
    isSameHour,
} from '../datetime.helper';

describe('Datetime func', () => {
    const testCases: [string, string, string | null][] = [
        [
            '2025-01-01T00:00:00Z',
            'HH:mm',
            dayjs.utc('2025-01-01T04:00:00Z').format('HH:mm'),
        ],
        [
            '2025-03-30T00:00',
            'HH:mm',
            dayjs.utc('2025-03-30T04:00').format('HH:mm'),
        ],
        [
            '2025-03-30T02:46',
            'HH:mm',
            dayjs.utc('2025-03-30T06:46').format('HH:mm'),
        ],
        [
            '2025-03-30T23:00',
            'DD/MM/YYYY HH:mm',
            dayjs.utc('2025-03-31 03:00').format('DD/MM/YYYY HH:mm'),
        ],
        [
            '2025-03-30T19:00',
            'HH:mm',
            dayjs.utc('2025-03-30T23:00').format('HH:mm'),
        ],
    ];

    describe('formatDate. Convert datetime to formated, local datetime', () => {
        test.each(testCases)(
            'Format UTC %s by template %s. Result: %s',
            (utcTime, template, expected) => {
                expect(formatDate(utcTime, template)).toBe(expected);
            }
        );
    });

    describe('toDate', () => {
        test.each(testCases)('Convert str %s to Date', (dateStr, format, expected) => {
            const date = toDate(dateStr);
            expect(date).toBeInstanceOf(Date);
            expect(date.toISOString()).toBe(new Date(dateStr).toISOString());
        });
    });

    describe('getNow', () => {
        it('Return current date and time', () => {
            const now = new Date().toISOString();
            const result = getNow();

            expect(formatDate(result, 'HH:mm')).toBe(formatDate(now, 'HH:mm'));
        });
    });

    describe('isSameHour', () => {
        const isSameHourCases: [string, string, boolean][] = [
            ['2023-03-30T12:15:00Z', '2023-03-30T12:45:00Z', true],
            ['2023-03-30T12:59:00Z', '2023-03-30T13:00:00Z', false],
        ];

        test.each(isSameHourCases)(
            'Compare %s and %s by time. Return %s',
            (date1, date2, expected) => {
                expect(isSameHour(date1, date2)).toBe(expected);
            }
        );
    });
});
