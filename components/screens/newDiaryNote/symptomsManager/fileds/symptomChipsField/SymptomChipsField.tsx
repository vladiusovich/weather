import { observer } from 'mobx-react-lite';
import React from 'react';
import UI from '@/components/ui';
import NewNoteFormStore from '../../../store/NewNoteFormStore';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '@/store/formStore/FormContext';

const SymptomChipsField: React.FC = () => {
    const form = useFormContext<NewNoteFormStore>();
    const { t } = useTranslation();

    const onDelete = () => {
        console.log("onDelete");
    };

    const onPressChip = () => {
        console.log("onPressChip");
    };

    const symptoms = form.values?.symptoms ?? [];
    return (
        <UI.XStack
            items='stretch'
            gap='$1'
            flexWrap='wrap'
        >
            {symptoms.length === 0 && (
                <UI.Button size={'$3'} variant='outlined'>
                    {t('meteo.pages.newDiaryNote.symptomsList.buttons.useFormHistory')}
                </UI.Button>
            )}

            {symptoms.map((i) => (
                <UI.Chip
                    key={i.id}
                    label={i.name}
                    counter={i.strengtOfPain}
                // onPress={onPressChip}
                // onDelete={onDelete}
                />
            ))}
        </UI.XStack>
    );
};

export default observer(SymptomChipsField);

