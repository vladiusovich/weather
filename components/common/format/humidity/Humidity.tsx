import React from 'react';
import UI from '@/components/ui';
import { TextStyle } from 'tamagui';
import {
    Droplet,
} from '@tamagui/lucide-icons'

type HumidityProps = {
    value?: number | null;
} & TextStyle;

const Humidity: React.FC<HumidityProps> = ({ value, ...props }) => {
    return (
        <UI.XStack gap='$1'>
            <Droplet size={14} />
            <UI.XStack items={'baseline'}>
                <UI.Typo.Text {...props}>{value ?? 'N/A'}</UI.Typo.Text>
                <UI.Typo.Text fontSize='$1'>%</UI.Typo.Text>
            </UI.XStack>
        </UI.XStack>
    );
};

export default Humidity;
