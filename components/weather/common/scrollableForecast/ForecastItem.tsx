import UI from '@/components/ui';
import { observer } from 'mobx-react-lite';
import React from 'react';

interface ForecastItemProps {
    children: React.ReactNode;
}

const ForecastItem: React.FC<ForecastItemProps> = ({
    children,
}) => {
    return (
        <UI.Card
            flex={1}
            backgroundColor={'$white12'}
            padded
            borderRadius={50}
        >
            <UI.YStack
                justify='space-around'
                items='center'
                minW={'$3'}
                flex={1}
            >
                {children}
            </UI.YStack>
        </UI.Card>
    );
};

export default observer(ForecastItem);
