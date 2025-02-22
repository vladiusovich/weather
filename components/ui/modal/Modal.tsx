import { Modal as NativeModal } from 'react-native';
import React from 'react';

export type ModalProps = {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode | React.ReactNode[];
};

// TODO: Add your custom styles and logic here.
const Modal: React.FC<ModalProps> = ({ open, onClose, ...props }) => {
    return (
        <NativeModal
            animationType='fade'
            transparent={true}
            visible={open}
            onRequestClose={onClose}
            {...props}
        />
    );
};

export default Modal;
