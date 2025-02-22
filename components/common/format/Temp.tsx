import React from 'react';
import UI, { TypographyProps } from '@/components/ui';

type TempProps = {
    value?: string | number | null;
    unit?: string;
} & Omit<TypographyProps, 'children'>;

const TEMP_SYMBOL = '°';

const Temp: React.FC<TempProps> = ({ unit, value, ...props }) => {
    if (!value) {
        return null;
    }

    // TODO
    const formatedValue = Math.round(+value);

    return (
        <UI.Stack direction='row' gap='0px'>
            <UI.Typography {...props}>{formatedValue}</UI.Typography>
            <UI.Typography {...props}>{TEMP_SYMBOL}</UI.Typography>
            {unit && <UI.Typography {...props}>{unit}</UI.Typography>}
        </UI.Stack>
    );
};

export default Temp;
