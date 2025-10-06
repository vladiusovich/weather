import React from "react";
import { SafeAreaView } from "react-native";
import { styled } from "tamagui";

type BaseWrapperProps = {
    children: React.ReactNode;
};

interface OwnProps<T extends React.ElementType> {
    Component?: T;
}

export type ScreenWrapperProps<T extends React.ElementType = typeof SafeAreaView> =
    OwnProps<T> & Omit<React.ComponentProps<T>, keyof BaseWrapperProps | "Component"> & BaseWrapperProps;

const baseStyle = {
    flex: 1,
    px: "$4",
    py: "$2",
} as const;

export const ScreenWrapper = <T extends React.ElementType = typeof SafeAreaView>({
    Component,
    children,
    ...rest
}: ScreenWrapperProps<T>): React.ReactElement => {
    const WrapperComponent = Component || SafeAreaView;

    const Styled = React.useMemo(() => styled(WrapperComponent as any, baseStyle), [WrapperComponent]);

    return <Styled {...(rest as any)}>{children}</Styled>;
};

export default ScreenWrapper;
