import React, { ReactNode } from "react";
import type { SheetProps as NativeSheetProps } from "@tamagui/sheet";
import { Sheet } from "@tamagui/sheet";
import useBackHandler from "@/hooks/useBackHandler";
// import AppStoreProvider from '@/store/provider/AppStoreProvider';
import { FormStore } from "@/store/formStore/FormStore";
import Form from "@/form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";

export type SheetProps<T extends Record<string, any>> = {
    /** Content to render inside the main sheet */
    children?: React.ReactNode;
    /**
     * Snap points for the main sheet.
     * Default is percentage-based snap points.
    */
    snapPoints?: (number | string)[];
    onClose?: () => void;
    /**
     * For Android you need to manually re-propagate any context when using modal.
     * This is because React Native doesn't support portals yet
    */
    useContexProvider?: boolean
    formStore?: FormStore<T>,
} & Omit<NativeSheetProps, "snapPoints" | "onOpenChange" | "modal">;

const SheetView = <T extends Record<string, any>>({
    children,
    snapPoints = [30],
    open = false,
    onClose,
    useContexProvider = true,
    formStore,
    ...sheetRest
}: SheetProps<T>) => {
    const onOpenChange = (state: boolean) => {
        if (state === false) {
            onClose?.();
        }
    };

    useBackHandler(open, onClose);

    const wrapWithProviders = (child?: ReactNode): ReactNode => {
        let wrapped = child;

        if (formStore) {
            wrapped = <Form.Provider form={formStore}>{wrapped}</Form.Provider>;
        }

        // TODO: remove?
        // if (useContexProvider) {
        //     wrapped = <AppStoreProvider>{wrapped}</AppStoreProvider>;
        // }

        return wrapped;
    };

    const { left, right } = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const mx = Math.max(5, left, right);
    // const my = Math.max(5, left, right);
    const frameWidth = Math.max(mx, width - mx * 2);

    return (
        <Sheet
            modal
            open={open}
            onOpenChange={onOpenChange}
            snapPoints={snapPoints}
            animation='100ms'
            {...sheetRest}
        >
            <Sheet.Overlay
                animation='100ms'
                bg="$shadow2"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
            />

            <Sheet.Handle />

            <Sheet.Frame
                p="$5"
                bg={"$background08"}
                backgroundBlendMode=""
                opacity={1}
                mx={mx}
                width={frameWidth}
            >
                {wrapWithProviders(open && children)}
            </Sheet.Frame>
        </Sheet>
    );
};

export default SheetView;