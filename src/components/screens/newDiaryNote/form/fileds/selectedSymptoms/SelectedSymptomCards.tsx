import { observer } from "mobx-react-lite";
import React from "react";
import UI from "@components/ui";
import { useFormContext } from "@store/formStore/FormContext";
import SymptomCard from "./symptomCard/SymptomCard";
import NewNoteFormStore from "../../../store/NewNoteFormStore";
import { useTranslation } from "react-i18next";

const SelectedSymptomCards: React.FC = () => {
    const form = useFormContext<NewNoteFormStore>();
    const symptoms = form.values.symptoms ?? [];
    const { t } = useTranslation();

    const isEmpty = symptoms.length === 0;
    const error = form.errors.symptoms;

    return (
        <UI.ScrollView showsVerticalScrollIndicator={false} >
            <UI.YStack gap='$2'>
                <UI.Typo.H6 color={"$color08"} fontWeight={900}>
                    {t("screens.newDiaryNote.selectedSymptomsSection.header")}
                </UI.Typo.H6>

                {isEmpty && (
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
                )}
                {!isEmpty && symptoms.map(s => (<SymptomCard key={s.id} {...s} />))}
            </UI.YStack>
        </UI.ScrollView>
    );
};

export default observer(SelectedSymptomCards);
