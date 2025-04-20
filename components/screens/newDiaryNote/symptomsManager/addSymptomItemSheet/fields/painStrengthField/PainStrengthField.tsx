import { observer } from 'mobx-react-lite';
import React from 'react';
import UI from '@/components/ui';
import Form, { useFormContext } from '@/store/formStore';
import { useTranslation } from 'react-i18next';
import SymptomFormStore from '../../store/SymptomFormStore';

const PainStrengthField: React.FC = () => {
    const form = useFormContext<SymptomFormStore>();
    const { t } = useTranslation();
    const painPower = form.values.painPower?.at(0) ?? 0;

    return (
        <UI.YStack
            gap='$3'
        >
            <UI.XStack items='center' gap="$2">
                <UI.Typo.Text>
                    {t('meteo.pages.newDiaryNote.addSymptom.fields.painPower.title')}
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

