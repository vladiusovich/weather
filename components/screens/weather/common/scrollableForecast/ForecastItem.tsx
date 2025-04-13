import UI from '@/components/ui';
import { observer } from 'mobx-react-lite';
import React from 'react';

interface ForecastItemProps {
    children: React.ReactNode;
    current?: boolean;
}

const ForecastItem: React.FC<ForecastItemProps> = ({
    children,
    current,
}) => {
    return (
        <UI.Card
            flex={1}
            bg={current ? '$accent11' : '$background04'}
            padded
            borderRadius={40}
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
