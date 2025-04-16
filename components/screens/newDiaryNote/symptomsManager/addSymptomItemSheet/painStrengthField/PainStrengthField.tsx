import { observer } from 'mobx-react-lite';
import React from 'react';
import UI from '@/components/ui';

interface Props {
}

const PainStrengthField: React.FC<Props> = ({
}) => {
    const [value, setValue] = React.useState([0]);

    const onValueChange = (val: number[]) => {
        setValue(val)
    };

    return (
        <UI.YStack
            gap='$3'
        >
            <UI.XStack items='center' gap="$2">
                <UI.Typo.Text>
                    The power of pain:
                </UI.Typo.Text>
                <UI.Typo.Paragraph size='$5' fontWeight={900}>
                    {value[0]}
                </UI.Typo.Paragraph>
            </UI.XStack>

            <UI.View gap='$1' paddingInline={15}>
                <UI.Slider
                    size='$2'
                    orientation='horizontal'
                    defaultValue={[0]}
                    min={0}
                    max={10}
                    step={1}
                    onValueChange={onValueChange}
                />
            </UI.View>

        </UI.YStack>
    );
};

export default observer(PainStrengthField);

