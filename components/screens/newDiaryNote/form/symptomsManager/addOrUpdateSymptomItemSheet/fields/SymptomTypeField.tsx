import UI, { SelectorOption } from '@/components/ui';
import useAppStore from '@/hooks/useAppStore';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Form from '@/form';
import { useEffect } from 'react';

const SymptomTypeField: React.FC = () => {
    const appStore = useAppStore();
    const { t } = useTranslation();

    useEffect(() => {
        appStore.diary.symptoms.fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const options: SelectorOption[] = appStore.diary?.symptoms.data.map((s) => {
        return {
            name: s.name,
            value: s.id,
        }
    }) ?? [];

    return (
        <Form.Field
            name="symptom"
            component={UI.Selector}
            options={options}
            label={t('meteo.pages.newDiaryNote.addSymptom.fields.symptom.title')}
            palceholder={t('meteo.pages.newDiaryNote.addSymptom.fields.symptom.palceholder')}
        />
    );
};

export default observer(SymptomTypeField);
