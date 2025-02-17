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
    <UI.Stack alignItems='center'>
        <UI.Button label='Reset' variant='solid' onPress={onReset} />
        <UI.Button label='Add' variant='solid' onPress={onAddSticker} />
        <UI.Button label='Save' variant='solid' onPress={onSaveImage} />
    </UI.Stack>
);

export default OptionsActions;
