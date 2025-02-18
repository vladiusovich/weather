import React from 'react';
import UI from '@/components/ui';

interface CameraPermissionDialogProps {
    onSuccess: () => void;
    onClose: () => void;
}

const CameraPermissionDialog: React.FC<CameraPermissionDialogProps> = ({
    onSuccess,
    onClose,
}) => {
    return (
        <UI.Stack>
            <UI.Typography variant='xsmall' color='regular.100'>
                We need your permission to show the camera
            </UI.Typography>

            <UI.Stack>
                <UI.Button
                    label='Cancel'
                    variant='secondary'
                    onPress={onClose}
                />
                <UI.Button
                    label='Allow'
                    variant='secondary'
                    onPress={onSuccess}
                />
            </UI.Stack>
        </UI.Stack>
    );
};

export default CameraPermissionDialog;
