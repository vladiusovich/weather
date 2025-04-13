import UI from '@/components/ui';
import { observer } from 'mobx-react-lite';
import React from 'react';

interface ScrollableForecastProps {
    header: string | React.ReactNode;
    headerIcon?: React.ReactNode;
    children: React.ReactNode[];
    isLoading?: boolean;
}

const ScrollableForecast: React.FC<ScrollableForecastProps> = ({
    header,
    headerIcon,
    children,
    isLoading = false,
}) => {
    return (
        <UI.Card
            padding='$4'
            height={300}
            bg={'$background02'}
        >
            {isLoading && (<UI.Loader />)}
            {!isLoading && (
                <>
                    <UI.Card.Header size={'$0.5'}>
                        <UI.XStack gap={'$2'} items={'center'}>
                            {headerIcon}
                            <UI.Typo.H6>
                                {header}
                            </UI.Typo.H6>
                        </UI.XStack>
                    </UI.Card.Header>

                    <UI.Separator marginBlock={'$2'} />

                    <UI.ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <UI.XStack
                            items='stretch'
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
