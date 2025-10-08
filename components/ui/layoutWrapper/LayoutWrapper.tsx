import React from "react";
import { styled, View } from "tamagui";

type BaseWrapperProps = {
    children: React.ReactNode;
};

interface OwnProps<T extends React.ElementType> {
    Component?: T;
}

export type ScreenWrapperProps<T extends React.ElementType = typeof View> =
    OwnProps<T> & Omit<React.ComponentProps<T>, keyof BaseWrapperProps | "Component"> & BaseWrapperProps;

const baseStyle = {
    flex: 1,
    px: "$4",
    py: "$2",
} as const;

export const ScreenWrapper = <T extends React.ElementType = typeof View>({
    Component,
    children,
    ...rest
}: ScreenWrapperProps<T>): React.ReactElement => {
    const WrapperComponent = Component || View;

    const Styled = React.useMemo(() => styled(WrapperComponent as any, baseStyle), [WrapperComponent]);

    return <Styled {...(rest as any)}>{children}</Styled>;
};

export default ScreenWrapper;
