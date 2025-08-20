import React from 'react';
import UI from '@/components/ui';
import { TextStyle } from 'tamagui';

type PrecipitationProps = {
    value?: number | null;
} & TextStyle;

const KIndex: React.FC<PrecipitationProps> = ({ value, ...props }) => {
    if (!value) {
        return null;
    }

    return (
        <UI.XStack gap='$1' items={'baseline'}>
            <UI.Typo.Text {...props}>{value}</UI.Typo.Text>
            <UI.Typo.Text fontSize='$1'>Kp</UI.Typo.Text>
        </UI.XStack>
    );
};

export default KIndex;
