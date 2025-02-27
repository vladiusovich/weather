import React from 'react';
import UI from '@/components/ui';
import { formatDate, getDayOfWeek, isValidDate, toDate } from '@/utils/datetime.helper';
import { TextStyle } from 'tamagui';

type DateVariantType = 'date' | 'time' | 'datetime' | 'dayOfWeek';

type DateProps = {
    value: string | undefined;
    asDayOfWeek?: boolean;
    variant: DateVariantType;
} & TextStyle;

const DATE_FORMAT = 'DD/MM/YYYY';
const TIME_FORMAT = 'HH:mm';

const format = (date: Date, variant: DateVariantType) => {
    switch (variant) {
        case 'date':
            return formatDate(date, DATE_FORMAT);
        case 'time':
            return formatDate(date, TIME_FORMAT);
        case 'datetime':
            return formatDate(date, `${DATE_FORMAT} ${TIME_FORMAT}`);
        case 'dayOfWeek':
            return getDayOfWeek(date);
    }
}

const Date: React.FC<DateProps> = ({
    value,
    asDayOfWeek,
    variant = 'date',
    ...props }) => {
    if (!value) {
        return null;
    }

    const date = toDate(value);

    if (!isValidDate(date)) {
        return null;
    }

    // TODO
    const formatedValue = format(date, variant);

    return (
        <UI.XStack>
            <UI.Typo.Text {...props}>{formatedValue}</UI.Typo.Text>
        </UI.XStack>
    );
};

export default Date;
