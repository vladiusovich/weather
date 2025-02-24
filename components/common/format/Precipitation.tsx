import React from 'react';
import UI, { TypographyProps } from '@/components/ui';

type PrecipitationProps = {
    value?: number | null;
} & Omit<TypographyProps, 'children'>;

const Precipitation: React.FC<PrecipitationProps> = ({ value, ...props }) => {
    return (
        <UI.Stack direction='row' gap='1px'>
            <UI.Typography {...props}>{value ?? 'N/A'}</UI.Typography>
            <UI.Typography variant='xsmall' {...props}>%</UI.Typography>
        </UI.Stack>
    );
};

export default Precipitation;
