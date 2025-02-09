import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { AddIcon } from '@/components/ui/icon';
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
        <Button variant='solid' onPress={onReset}>
            <MaterialIcons name='refresh' size={24} color='#fff' />
            <ButtonText>Reset</ButtonText>
        </Button>
        <Button variant='solid' onPress={onAddSticker}>
            <ButtonIcon as={AddIcon} className='mr-2' />
        </Button>
        <Button variant='solid' onPress={onSaveImage}>
            <MaterialIcons name='save-alt' size={24} color='#fff' />
            <ButtonText>Save</ButtonText>
        </Button>
    </VStack>
);

export default OptionsActions;
