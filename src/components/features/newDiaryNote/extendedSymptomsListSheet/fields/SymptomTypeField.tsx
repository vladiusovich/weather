import UI, { SelectorOption } from "@shared/components/ui";
import useAppStore from "@hooks/useAppStore";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import Form from "@form/index";
import { useEffect } from "react";

const SymptomTypeField: React.FC = () => {
    const appStore = useAppStore();
    const { t } = useTranslation();

    useEffect(() => {
        appStore.diary.symptoms.fetch();
    }, [appStore.diary.symptoms]);

    const options: SelectorOption[] = appStore.diary?.symptoms.all.map((s) => {
        return {
            name: s.name,
            value: s.id,
        };
    }) ?? [];

    return (
        <Form.Field
            name="symptom"
            component={UI.Selector}
            options={options}
            label={t("screens.newDiaryNote.fields.symptom.title")}
            palceholder={t("screens.newDiaryNote.fields.symptom.palceholder")}
        />
    );
};

export default observer(SymptomTypeField);
