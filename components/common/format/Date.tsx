import React from 'react';
import UI from '@/components/ui';
import { formatDate, getDayOfWeek, isValidDate, toDate } from '@/utils/datetime.helper';

type TempProps = {
    value: string | undefined;
    asDayOfWeek?: boolean;
};

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
    const formatedValue = asDayOfWeek ? getDayOfWeek(date) : formatDate(date, DATE_FORMAT);

    return (
        <UI.XStack>
            <UI.Typo.Text>{formatedValue}</UI.Typo.Text>
        </UI.XStack>
    );
};

export default Date;
