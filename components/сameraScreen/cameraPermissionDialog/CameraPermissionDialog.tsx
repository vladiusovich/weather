import React from 'react';
import { Text } from 'react-native';
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
            <Text>We need your permission to show the camera</Text>

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
