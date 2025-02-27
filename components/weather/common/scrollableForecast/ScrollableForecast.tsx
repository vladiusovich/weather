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
            padding='$4'
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

                    <UI.Separator marginBlock={'$2'} />

                    <UI.ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <UI.XStack
                            verticalAlign='stretch'
                            justify='space-between'
                            gap='$3'
                            flex={1}
                        >
                            {children}
                        </UI.XStack>
                    </UI.ScrollView>
                </>
            )}
        </UI.Card>
    );
};

export default observer(ScrollableForecast);
