import React from 'react';
import YStack from '../stack/YStack';
import { Text } from 'tamagui';
import { SearchX } from '@tamagui/lucide-icons';


const NoData = () => {
    return (
        <YStack
            justify={'center'}
            items={'center'}
            gap={'$2'}
        >
            <SearchX size={42} />
            <Text fontSize={'$1'}>
                No data
            </Text>
        </YStack>
    );
};

export default NoData;
