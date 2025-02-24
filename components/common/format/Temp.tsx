import React from 'react';
import UI from '@/components/ui';

type TempProps = {
    value?: string | number | null;
    unit?: string;
};

const TEMP_SYMBOL = '°';

const Temp: React.FC<TempProps> = ({ unit, value, ...props }) => {
    if (!value) {
        return null;
    }

    // TODO
    const formatedValue = Math.round(+value);

    return (
        <UI.XStack gap='$2'>
            <UI.Typo.Text>{formatedValue}</UI.Typo.Text>
            <UI.Typo.Text>{TEMP_SYMBOL}</UI.Typo.Text>
            {unit && <UI.Typo.Text>{unit}</UI.Typo.Text>}
        </UI.XStack>
    );
};

export default Temp;
