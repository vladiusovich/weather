import {
    Dialog,
    DialogOverlay,
    DialogContent,
    XStack,
} from "tamagui";
import { ReactNode } from "react";
import Button from "../button/Button";

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
    cancelText = "Cancel",
    confirmText = "OK",
    onCancel,
    onConfirm,
    showFooter = true,
}: ModalDialogProps) => {
    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen && onCancel) {
            onCancel();
        }
    };

    return (
        <Dialog modal open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <DialogOverlay
                    key="overlay"
                    bg="$shadow6"
                    animateOnly={["transform", "opacity"]}
                    animation={[
                        "quicker",
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />

                <Dialog.FocusScope focusOnIdle>
                    <DialogContent
                        bordered
                        elevate
                        minW={300}
                        animation={[
                            "quicker",
                            {
                                opacity: {
                                    overshootClamping: true,
                                },
                            },
                        ]}
                        enterStyle={{ x: 0, y: 20, opacity: 0 }}
                        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                    >
                        {title && <Dialog.Title size={"$6"}>{title}</Dialog.Title>}
                        {description && (
                            <Dialog.Description>
                                {description}
                            </Dialog.Description>
                        )}

                        {children}
                        {showFooter && (
                            <XStack justify="flex-end" gap="$2" mt="$4">
                                <Dialog.Close asChild>
                                    <Button onPress={onCancel}>
                                        {cancelText}
                                    </Button>
                                </Dialog.Close>
                                <Dialog.Close asChild>
                                    <Button onPress={onConfirm}>
                                        {confirmText}
                                    </Button>
                                </Dialog.Close>
                            </XStack>
                        )}

                        {/* <Unspaced>
                            <Dialog.Close asChild>
                                <Button position="absolute" r={0} size="$2" icon={X} />
                            </Dialog.Close>
                        </Unspaced> */}
                    </DialogContent>
                </Dialog.FocusScope>
            </Dialog.Portal>
        </Dialog>
    );
};

export default Modal;
