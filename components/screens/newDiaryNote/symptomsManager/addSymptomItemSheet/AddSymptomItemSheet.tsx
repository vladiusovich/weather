import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import React from 'react';
import UI from '@/components/ui';

interface Props {
    open: boolean;
    onClose: () => void;
}

const AddSymptomItemSheet: React.FC<Props> = ({
    open,
    onClose,
}) => {
    const appStore = useAppStore();

    // TODO
    const onOpenChange = (state: boolean) => {
        if (!state) {
            onClose();
        }
    };

    return (
        <UI.SheetView
            open={open}
            onOpenChange={onOpenChange}
            snapPoints={[50]}
            modal
        >
            <UI.YStack gap={'$3'} flex={1}>
                <UI.Typo.H6>
                    Add symptom
                </UI.Typo.H6>

                <UI.XStack
                    items='stretch'
                    gap='$1'
                    minW={80}
                >

                </UI.XStack>
            </UI.YStack>
            <UI.YStack gap={'$3'} p={15}>
                <UI.Button size={'$3'}>
                    Add
                </UI.Button>
            </UI.YStack>
        </UI.SheetView >
    );
};

export default observer(AddSymptomItemSheet);

