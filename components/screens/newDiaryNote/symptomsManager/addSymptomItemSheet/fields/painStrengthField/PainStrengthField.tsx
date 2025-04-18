import { observer } from 'mobx-react-lite';
import React from 'react';
import UI from '@/components/ui';
import SymptomFormStore from '../store/SymptomFormStore';
import Form, { useFormContext } from '@/store/formStore';

const PainStrengthField: React.FC = () => {
    const form = useFormContext<SymptomFormStore>();
    const painPower = form.values.painPower?.at(0) ?? 0;

    return (
        <UI.YStack
            gap='$3'
        >
            <UI.XStack items='center' gap="$2">
                <UI.Typo.Text>
                    The power of pain:
                </UI.Typo.Text>
                <UI.Typo.Paragraph size='$5' fontWeight={900}>
                    {painPower}
                </UI.Typo.Paragraph>
            </UI.XStack>

            <UI.View gap='$1' paddingInline={15}>
                <Form.Field
                    name="painPower"
                    component={UI.Slider}
                    size='$2'
                    orientation='horizontal'
                    min={0}
                    max={10}
                    step={1}
                />
            </UI.View>

        </UI.YStack>
    );
};

export default observer(PainStrengthField);

