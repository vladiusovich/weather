import React from 'react';
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
} from '../ui/alert-dialog';
import { Text } from 'react-native';
import Button from '../ui/button/Button';

interface CameraPermissionDialogProps {
    isOpen: boolean;
    onSuccess: () => void;
    onClose: () => void;
}

const CameraPermissionDialog: React.FC<CameraPermissionDialogProps> = ({
    isOpen,
    onSuccess,
    onClose,
}) => {
    return (
        <AlertDialog isOpen={isOpen} onClose={onClose} size='md'>
            <AlertDialogBackdrop />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <Text>We need your permission to show the camera</Text>
                </AlertDialogHeader>
                <AlertDialogFooter className=''>
                    <Button
                        label='Cancel'
                        variant='secondary'
                        onPress={onClose}
                    />
                    <Button
                        label='Allow'
                        variant='secondary'
                        onPress={onSuccess}
                    />
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CameraPermissionDialog;
