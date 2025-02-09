import React from 'react';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { InfoIcon } from '@/components/ui/icon';
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
    <VStack space="sm" className="w-5/6">
        <Button variant="solid" onPress={onPickImage}>
            <ButtonIcon as={InfoIcon} className="mr-2" />
            <ButtonText>Choose a photo</ButtonText>
        </Button>
        <Button
            size="md"
            variant="solid"
            action="secondary"
            onPress={onUseCamera}>
            <ButtonText>Use camera</ButtonText>
        </Button>
        <Button
            size="md"
            variant="outline"
            action="secondary"
            onPress={onUseSelectedPhoto}>
            <ButtonText>Use this photo</ButtonText>
        </Button>
    </VStack>
);

export default FooterActions;
