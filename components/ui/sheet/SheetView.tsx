import React from 'react';
import type { SheetProps } from '@tamagui/sheet';
import { Sheet } from '@tamagui/sheet';
import useBackHandler from '@/hooks/useBackHandler';
import AppStoreProvider from '@/store/provider/AppStoreProvider';

export type CustomSheetProps = {
    /** Content to render inside the main sheet */
    children?: React.ReactNode;
    /**
     * Snap points for the main sheet.
     * Default is percentage-based snap points.
     */
    snapPoints?: (number | string)[];
    onClose?: () => void;
    /**  For Android you need to manually re-propagate any context when using modal. This is because React Native doesn't support portals yet */
    useContexProvider?: boolean
} & Omit<SheetProps, 'snapPoints' | 'onOpenChange' | 'modal'>;

const SheetView: React.FC<CustomSheetProps> = ({
    children,
    snapPoints = [50],
    open = false,
    onClose,
    useContexProvider = true,
    ...sheetRest
}) => {
    const onOpenChange = (state: boolean) => {
        if (state === false) {
            onClose?.();
        }
    };

    useBackHandler(open, onClose);

    return (
        <Sheet
            modal
            open={open}
            onOpenChange={onOpenChange}
            snapPoints={snapPoints}
            zIndex={100_000}
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
                p="$4"
                bg={'$background06'}
            >
                {/* Content inside the main sheet */}
                {useContexProvider && (
                    <AppStoreProvider>
                        {open && children}
                    </AppStoreProvider>
                )}
                {!useContexProvider && (open && children)}
            </Sheet.Frame>
        </Sheet>
    );
};

export default SheetView;