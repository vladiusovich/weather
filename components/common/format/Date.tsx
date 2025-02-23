import React from 'react';
import UI, { TypographyProps } from '@/components/ui';
import {
    formatDate,
    getDayOfWeek,
    isValidDate,
    toDate,
} from '@/utils/datetime.helper';

type TempProps = {
    value: string | undefined;
    asDayOfWeek?: boolean;
} & Omit<TypographyProps, 'children'>;

const DATE_FORMAT = 'DD/MM/YYYY';

const Date: React.FC<TempProps> = ({ value, asDayOfWeek, ...props }) => {
    if (!value) {
        return null;
    }

    const date = toDate(value);

    if (!isValidDate(date)) {
        return null;
    }

    // TODO
    const formatedValue = asDayOfWeek
        ? getDayOfWeek(date)
        : formatDate(date, DATE_FORMAT);

    return (
        <UI.Stack direction='row' gap='0px'>
            <UI.Typography {...props}>{formatedValue}</UI.Typography>
        </UI.Stack>
    );
};

export default Date;
