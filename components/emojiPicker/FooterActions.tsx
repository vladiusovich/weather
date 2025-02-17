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
    <UI.Stack alignItems='center'>
        <UI.Button
            label='Choose a photo'
            variant='solid'
            onPress={onPickImage}
        />
        <UI.Button
            label='Use camera'
            variant='secondary'
            onPress={onUseCamera}
        />
        <UI.Button
            label='Use this photo'
            variant='secondary'
            onPress={onUseSelectedPhoto}
        />
    </UI.Stack>
);

export default FooterActions;
