import React from 'react';
import UI from '@/components/ui';

type PrecipitationProps = {
    value?: number | null;
};

const Precipitation: React.FC<PrecipitationProps> = ({ value, ...props }) => {
    return (
        <UI.XStack gap='$2'>
            <UI.Typo.Text {...props}>{value ?? 'N/A'}</UI.Typo.Text>
            <UI.Typo.Text>%</UI.Typo.Text>
        </UI.XStack>
    );
};

export default Precipitation;
