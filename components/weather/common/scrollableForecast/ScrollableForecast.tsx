import UI from '@/components/ui';
import { observer } from 'mobx-react-lite';
import React from 'react';

interface ScrollableForecastProps {
    title: string;
    children: React.ReactNode[];
    isLoading?: boolean;
}

const ScrollableForecast: React.FC<ScrollableForecastProps> = ({
    title,
    children,
    isLoading = false,
}) => {
    return (
        <UI.Card
            padding='$5'
            height={300}
            backgroundColor={'$background02'}
        >
            {isLoading && (<UI.Loader />)}
            {!isLoading && (
                <>
                    <UI.Card.Header size={'$0.5'}>
                        <UI.Typo.H6>
                            {title}
                        </UI.Typo.H6>
                    </UI.Card.Header>

                    <UI.ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <UI.XStack
                            verticalAlign='stretch'
                            justify='space-between'
                            gap='$4'
                            flex={1}
                        >
                            {children.map((item, i) => (
                                <UI.Card
                                    key={i}
                                    flex={1}
                                    backgroundColor={'$white12'}
                                    padded
                                    borderRadius={50}
                                >
                                    <UI.YStack
                                        justify='space-around'
                                        items='center'
                                        flex={1}
                                    >
                                        {item}
                                    </UI.YStack>
                                </UI.Card>
                            ))}
                        </UI.XStack>
                    </UI.ScrollView>
                </>
            )}
        </UI.Card>
    );
};

export default observer(ScrollableForecast);
