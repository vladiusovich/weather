import { radius } from "node_modules/@tamagui/themes/types/v4-tokens";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styled, View } from "tamagui";

type BaseWrapperProps = {
    children: React.ReactNode;
};

interface OwnProps<T extends React.ElementType> {
    Component?: T;
    fullVeriacal?: boolean;
}

export type ScreenWrapperProps<T extends React.ElementType = typeof View> =
    OwnProps<T> & Omit<React.ComponentProps<T>, keyof BaseWrapperProps | "Component"> & BaseWrapperProps;

const baseStyle = {
    flex: 1,
    px: "$4",
    rounded: 35,
} as const;

export const ScreenWrapper = <T extends React.ElementType = typeof View>({
    Component,
    children,
    fullVeriacal = true,
    ...rest
}: ScreenWrapperProps<T>): React.ReactElement => {
    const WrapperComponent = Component || View;
    const insets = useSafeAreaInsets();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const styles = { ...baseStyle, pb: fullVeriacal ? undefined : insets.bottom };

    const Styled = React.useMemo(() => styled(WrapperComponent as any, styles), [WrapperComponent, styles]);

    return <Styled {...(rest as any)}>{children}</Styled>;
};

export default ScreenWrapper;
