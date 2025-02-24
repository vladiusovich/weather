import React from 'react';
import UI from '@/components/ui';

interface OptionsActionsProps {
    onReset: () => void;
    onAddSticker: () => void;
    onSaveImage: () => void;
}

const OptionsActions: React.FC<OptionsActionsProps> = ({
    onReset,
    onAddSticker,
    onSaveImage,
}) => (
    <UI.YStack verticalAlign='center'>
        <UI.Button onPress={onReset}>Reset</UI.Button>
        <UI.Button onPress={onAddSticker}>Add</UI.Button>
        <UI.Button onPress={onSaveImage}>Save</UI.Button>
    </UI.YStack>
);

export default OptionsActions;
