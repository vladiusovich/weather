import React from 'react';
import UI from '@/components/ui';
import { DATE_FORMAT, formatDate, getDayOfWeek, TIME_FORMAT } from '@/utils/datetime.helper';
import { TextStyle } from 'tamagui';

type DateVariantType = 'date' | 'time' | 'datetime' | 'dayOfWeek';

type DateProps = {
    value: string | undefined;
    asDayOfWeek?: boolean;
    variant: DateVariantType;
} & TextStyle;

const format = (date: string, variant: DateVariantType) => {
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

    const formatedValue = format(value, variant);

    if (formatedValue === null) {
        return null;
    }

    return (
        <UI.XStack>
            <UI.Typo.Text {...props}>{formatedValue}</UI.Typo.Text>
        </UI.XStack>
    );
};

export default Date;
