import React from 'react';
import Button from '@/components/ui/button/Button';
import { VStack } from '../ui/vstack';

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
    <VStack space='sm' className='w-5/6'>
        <Button label='Reset' variant='solid' onPress={onReset} />
        <Button label='Add' variant='solid' onPress={onAddSticker} />
        <Button label='Save' variant='solid' onPress={onSaveImage} />
    </VStack>
);

export default OptionsActions;
