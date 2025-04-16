import React from 'react';
import type { SheetProps } from '@tamagui/sheet';
import { Sheet } from '@tamagui/sheet';

export type CustomSheetProps = {
    /** Content to render inside the main sheet */
    children?: React.ReactNode;
    /** Optional custom content to render inside an inner/nested sheet */
    // innerSheetContent?: React.ReactNode;
    /**
     * Snap points for the main sheet.
     * Default is percentage-based snap points.
     */
    snapPoints?: (number | string)[];
    /** Whether the sheet is modal (true) or inline (false) */
    modal?: boolean;
    /**
     * Optional additional props to pass to the underlying Sheet component.
     * (The "open" and "onOpenChange" props are managed internally.)
     */
} & Omit<SheetProps, 'snapPoints'>;

const SheetView: React.FC<CustomSheetProps> = ({
    children,
    // innerSheetContent,
    onOpenChange,
    snapPoints = [50],
    open = false,
    modal = true,
    ...sheetRest
}) => {
    return (
        <Sheet
            modal={modal}
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
                {children}
            </Sheet.Frame>
        </Sheet>
    );
};

export default SheetView;