import React from 'react';
import UI from '@/components/ui';

interface FooterActionsProps {
    onPickImage: () => void;
    onUseCamera: () => void;
    onUseSelectedPhoto: () => void;
}

const FooterActions: React.FC<FooterActionsProps> = ({
    onPickImage,
    onUseCamera,
    onUseSelectedPhoto,
}) => (
    <UI.YStack verticalAlign='center'>
        <UI.Button onPress={onPickImage}>Choose a photo</UI.Button>
        <UI.Button onPress={onUseCamera}>Use this photo</UI.Button>
        <UI.Button onPress={onUseSelectedPhoto}>Use this photo</UI.Button>F
    </UI.YStack>
);

export default FooterActions;
