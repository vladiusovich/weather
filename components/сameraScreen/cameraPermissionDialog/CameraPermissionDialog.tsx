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
        <UI.YStack>
            <UI.Typo.Text>
                We need your permission to show the camera
            </UI.Typo.Text>

            <UI.YStack>
                <UI.Button onPress={onClose}>Cancel</UI.Button>
                <UI.Button onPress={onSuccess}>Allow</UI.Button>
            </UI.YStack>
        </UI.YStack>
    );
};

export default CameraPermissionDialog;
