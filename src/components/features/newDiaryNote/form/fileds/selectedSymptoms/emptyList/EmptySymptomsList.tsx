import { observer } from "mobx-react-lite";
import React from "react";
import UI from "@shared/components/ui";
import { useFormContext } from "@store/formStore/FormContext";
import { useTranslation } from "react-i18next";
import NewNoteFormStore from "../../../../store/NewNoteFormStore";

const EmptySymptomsList: React.FC = () => {
    const { t } = useTranslation();
    const form = useFormContext<NewNoteFormStore>();

    const error = form.errors.symptoms;

    return (
        <UI.Paper
            minH={120}
            borderWidth={"$1"}
            borderColor={error ? "$red4" : "$borderColor"}
            borderStyle="dotted"
        >
            <UI.YStack flex={1} justify={"center"} items={"center"}>
                <UI.Typo.Text color={error ? "$red9" : "$color9"}>
                    {t("screens.newDiaryNote.selectedSymptomsSection.emptyList")}
                </UI.Typo.Text>
            </UI.YStack>
        </UI.Paper>
    );
};

export default observer(EmptySymptomsList);
