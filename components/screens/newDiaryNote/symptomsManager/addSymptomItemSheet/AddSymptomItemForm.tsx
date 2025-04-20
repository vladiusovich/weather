import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import UI from '@/components/ui';
import SymptomFormStore from '../../store/SymptomFormStore';
import useCallbackIf from '@/hooks/useCallbackIf';
import PainStrengthField from './fields/painStrengthField/PainStrengthField';
import { useTranslation } from 'react-i18next';
import SymptomTypeField from './fields/SymptomTypeField';
import Form from '@/form';
import { useFormContext } from '@/store/formStore/FormContext';

interface Props {
    onClose: () => void;
}

const AddSymptomItemForm: React.FC<Props> = ({
    onClose,
}) => {
    const { t } = useTranslation();
    const form = useFormContext<SymptomFormStore>();

    useCallbackIf(form.isSubmitted, onClose);

    useEffect(() => {
        return () => form.reset();
    }, [form]);

    return (
        <Form.Provider form={form}>
            <UI.YStack gap={'$3'} flex={1}>
                <UI.Typo.H6>
                    {t('meteo.pages.newDiaryNote.addSymptom.header')}
                </UI.Typo.H6>
                <UI.YStack items='stretch' gap='$4'>
                    <SymptomTypeField />
                    <PainStrengthField />
                </UI.YStack>
            </UI.YStack>
            <UI.YStack gap={'$3'}>
                <Form.Submit size={'$4'}>
                    {t('meteo.pages.newDiaryNote.addSymptom.submit')}
                </Form.Submit>
            </UI.YStack>
        </Form.Provider>
    );
};

export default observer(AddSymptomItemForm);

