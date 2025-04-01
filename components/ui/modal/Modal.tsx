import {
    Dialog,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
    XStack,
    YStack,
} from 'tamagui';
import { ReactNode } from 'react';
import { Portal } from '@tamagui/portal';
import Button from '../button/Button';

// TODO: bad implementation
type ModalDialogProps = {
    open?: boolean;
    title?: string;
    description?: string;
    children?: ReactNode;
    cancelText?: string;
    confirmText?: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    showFooter?: boolean;
};

const Modal = ({
    open,
    title,
    description,
    children,
    cancelText = 'Cancel',
    confirmText = 'OK',
    onCancel,
    onConfirm,
    showFooter = true,
}: ModalDialogProps) => {
    if (!open) {
        return null;
    }

    return (
        <Portal>
            <Dialog modal>
                <DialogOverlay
                    key="overlay"
                    backgroundColor="$shadow6"
                    animation='100ms'
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />

                <DialogContent bordered elevate>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && (
                        <DialogDescription mt="$2">
                            {description}
                        </DialogDescription>
                    )}

                    {children && <YStack mt="$4">{children}</YStack>}

                    {showFooter && (
                        <XStack justifyContent="flex-end" gap="$2" mt="$4">
                            <DialogClose asChild>
                                <Button theme="alt1" onPress={onCancel}>
                                    {cancelText}
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button theme="active" onPress={onConfirm}>
                                    {confirmText}
                                </Button>
                            </DialogClose>
                        </XStack>
                    )}
                </DialogContent>
            </Dialog>
        </Portal>
    );
};

export default Modal;
