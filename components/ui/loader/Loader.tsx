import React from 'react';
import { Spinner, SpinnerProps } from 'tamagui';
import YStack from '../stack/YStack';

type LoaderProps = SpinnerProps

const Loader: React.FC<LoaderProps> = ({
    size = 'large',
    color = '$green10',
    ...props
}) => {
    return (
        <YStack
            flex={1}
            justify='center'
            items='center'
        >
            <Spinner
                {...props}
                size={size}
                color={color}
            />
        </YStack>
    );
};

export default Loader;
