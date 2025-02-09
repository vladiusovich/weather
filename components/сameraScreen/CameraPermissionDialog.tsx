import React from 'react';
import { Button, ButtonText } from '../ui/button';
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
} from '../ui/alert-dialog';
import { Heading } from '../ui/heading';

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
                    <Heading
                        className='text-typography-950 font-semibold'
                        size='md'>
                        We need your permission to show the camera
                    </Heading>
                </AlertDialogHeader>
                <AlertDialogFooter className=''>
                    <Button
                        variant='outline'
                        action='secondary'
                        onPress={onClose}
                        size='sm'>
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button size='sm' onPress={() => onSuccess()}>
                        <ButtonText>Grant permission</ButtonText>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CameraPermissionDialog;
