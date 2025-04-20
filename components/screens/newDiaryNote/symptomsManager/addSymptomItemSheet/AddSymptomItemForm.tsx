import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import React from 'react';
import UI, { SelectorOption } from '@/components/ui';
import SymptomFormStore from './store/SymptomFormStore';
import Form from '@/store/formStore';
import useConcreteForm from '@/hooks/useСoncreteForm';
import useCallbackIf from '@/hooks/useCallbackIf';
import PainStrengthField from './fields/painStrengthField/PainStrengthField';
import { useTranslation } from 'react-i18next';

interface Props {
    onClose: () => void;
}

const AddSymptomItemForm: React.FC<Props> = ({
    onClose,
}) => {
    const appStore = useAppStore();
    const { t } = useTranslation();
    const form = useConcreteForm(SymptomFormStore);

    useCallbackIf(form.isSubmitted, onClose);

    const options: SelectorOption[] = appStore.diary?.symptoms.data.map((s) => {
        return {
            name: s.name,
            value: s.name,
        }
    }) ?? [];

    return (
        <Form.Provider form={form}>
            <UI.YStack gap={'$3'} flex={1}>
                <UI.Typo.H6>
                    {t('meteo.pages.newDiaryNote.addSymptom.header')}
                </UI.Typo.H6>
                <UI.YStack items='stretch' gap='$4'>
                    <Form.Field
                        name="symptom"
                        component={UI.Selector}
                        options={options}
                        label={t('meteo.pages.newDiaryNote.addSymptom.fields.symptom.title')}
                        palceholder={t('meteo.pages.newDiaryNote.addSymptom.fields.symptom.palceholder')}
                    />
                    <PainStrengthField />
                </UI.YStack>
            </UI.YStack>
            <UI.YStack gap={'$3'}>
                <Form.Button size={'$4'}>
                    {t('meteo.pages.newDiaryNote.addSymptom.submit')}
                </Form.Button>
            </UI.YStack>
        </Form.Provider>
    );
};

export default observer(AddSymptomItemForm);

