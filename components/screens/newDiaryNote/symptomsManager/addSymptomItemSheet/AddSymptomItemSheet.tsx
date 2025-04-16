import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import React from 'react';
import UI, { SelectorOption } from '@/components/ui';
import PainStrengthField from './painStrengthField/PainStrengthField';
import SymptomFormStore from './SymptomFormStore';
import Form from '@/store/formStore';

interface Props {
    open: boolean;
    onClose: () => void;
}

const AddSymptomItemSheet: React.FC<Props> = ({
    open,
    onClose,
}) => {
    const appStore = useAppStore();

    const [form] = React.useState(() => new SymptomFormStore({
        initialValues: {
            painPower: [],
            symptom: ''
        }
    }));

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
            <Form.Provider form={form}>
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
                        <Form.Field
                            name="symptom"
                            component={UI.Selector}
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

            </Form.Provider>

        </UI.SheetView >
    );
};

export default observer(AddSymptomItemSheet);

