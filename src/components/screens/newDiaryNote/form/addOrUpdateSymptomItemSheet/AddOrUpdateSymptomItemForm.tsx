import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import UI from "@components/ui";
import useCallbackIf from "@hooks/useCallbackIf";
import PainStrengthField from "./fields/painStrengthField/PainStrengthField";
import { useTranslation } from "react-i18next";
import SymptomTypeField from "./fields/SymptomTypeField";
import Form from "@form/index";
import { useFormContext } from "@store/formStore/FormContext";
import SymptomFormStore from "../../store/SymptomFormStore";

interface Props {
    onClose: () => void;
}

const AddOrUpdateSymptomItemForm: React.FC<Props> = ({
    onClose,
}) => {
    const { t } = useTranslation();
    const form = useFormContext<SymptomFormStore>();

    useCallbackIf(form.isSubmitted, onClose);

    useEffect(() => {
        return () => form.reset();
    }, [form]);

    const key = form.mode === "add" ? "addSymptom" : "editSymptom";

    return (
        <Form.Provider form={form}>
            <UI.YStack gap={"$3"} flex={1}>
                <UI.Typo.H6>
                    {t(`meteo.pages.newDiaryNote.${key}.header`)}
                </UI.Typo.H6>
                <UI.YStack items='stretch' gap='$4'>
                    <SymptomTypeField />
                    <PainStrengthField />
                </UI.YStack>
            </UI.YStack>
            <Form.Submit size={"$5"}>
                {t(`meteo.pages.newDiaryNote.${key}.submit`)}
            </Form.Submit>
        </Form.Provider>
    );
};

export default observer(AddOrUpdateSymptomItemForm);

