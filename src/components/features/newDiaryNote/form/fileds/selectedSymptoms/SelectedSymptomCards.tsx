import { observer } from "mobx-react-lite";
import React from "react";
import { useFormContext } from "@store/formStore/FormContext";
import SymptomCard from "./symptomCard/SymptomCard";
import NewNoteFormStore from "../../../store/NewNoteFormStore";
import { useTranslation } from "react-i18next";
import EmptySymptomsList from "./emptyList/EmptySymptomsList";
import UI from "@ui";

const SelectedSymptomCards: React.FC = () => {
    const { t } = useTranslation();
    const form = useFormContext<NewNoteFormStore>();

    const symptoms = form.values.symptoms ?? [];
    const isEmpty = symptoms.length === 0;

    return (
        <UI.ScrollView showsVerticalScrollIndicator={false} >
            <UI.YStack gap='$2'>
                <UI.Typo.H6 color={"$color08"} fontWeight={900}>
                    {t("screens.newDiaryNote.selectedSymptomsSection.header")}
                </UI.Typo.H6>
                {isEmpty
                    ? <EmptySymptomsList />
                    : symptoms.map(s => (<SymptomCard key={s.id} {...s} />))
                }
            </UI.YStack>
        </UI.ScrollView>
    );
};

export default observer(SelectedSymptomCards);
