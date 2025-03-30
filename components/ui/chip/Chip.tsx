import React from 'react';
import { Text, TextStyle } from 'tamagui';
import XStack from '../stack/XStack';

type ChipProps = Pick<TextStyle, 'fontSize' | 'color'>;

// TODO
const Chip: React.FC<ChipProps> = ({
    ...props
}) => {
    return (
        <XStack
            flex={1}
            justify='center'
            items='center'
        >
            <Text
                {...props}
            />
        </XStack>
    );
};

export default Chip;
