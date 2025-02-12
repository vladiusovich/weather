import React from 'react';
import Button from '@/components/ui/button/Button';
import { VStack } from '../ui/vstack';

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
    <VStack space='sm' className='w-5/6'>
        <Button label='Choose a photo' variant='solid' onPress={onPickImage} />
        <Button label='Use camera' variant='secondary' onPress={onUseCamera} />
        <Button
            label='Use this photo'
            variant='secondary'
            onPress={onUseSelectedPhoto}
        />
    </VStack>
);

export default FooterActions;
