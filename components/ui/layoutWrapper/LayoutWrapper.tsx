import React from 'react';
import { SafeAreaView } from 'react-native';
import { styled } from 'tamagui';

type ScreenWrapperProps<T extends React.ElementType> = {
    Component?: T;
    children: React.ReactNode;
} & Omit<React.ComponentProps<T>, 'children' | 'Component'>;

const ScreenWrapper = <T extends React.ElementType = typeof SafeAreaView>({
    Component,
    children,
    ...rest
}: ScreenWrapperProps<T>) => {
    const WrapperComponent = Component || SafeAreaView;

    // Приводим объект конфигурации к типу any, чтобы избежать ошибки типизации
    const StyledWrapper = React.useMemo(() => {
        return styled(WrapperComponent as any, {
            flex: 1,
            px: '$4',
            py: '$2',
        } as any);
    }, [WrapperComponent]);

    return <StyledWrapper {...rest}>{children}</StyledWrapper>;
}

export default ScreenWrapper;
