import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import React from 'react';
import UI, { SelectorOption } from '@/components/ui';
import PainStrengthField from './painStrengthField/PainStrengthField';

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

    const options: SelectorOption[] = appStore.diary.symptoms.data.map((s) => {
        return {
            name: s.name,
            value: s.name,
        }
    });

    return (
        <UI.SheetView
            open={open}
            onOpenChange={onOpenChange}
            snapPoints={[40]}
            modal
        >
            <UI.YStack
                gap={'$3'}
                flex={1}
            >
                <UI.Typo.H6>
                    Add symptom
                </UI.Typo.H6>
                <UI.YStack
                    items='stretch'
                    gap='$4'
                >
                    <UI.Selector
                        options={options}
                        label="Type of symptom"
                        palceholder='Select pain'
                    />

                    <PainStrengthField />
                </UI.YStack>
            </UI.YStack>

            <UI.YStack gap={'$3'}>
                <UI.Button size={'$3'}>
                    Add
                </UI.Button>
            </UI.YStack>
        </UI.SheetView >
    );
};

export default observer(AddSymptomItemSheet);

