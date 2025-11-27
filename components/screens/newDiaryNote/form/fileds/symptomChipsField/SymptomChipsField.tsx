import { observer } from "mobx-react-lite";
import React from "react";
import UI from "@/components/ui";
import { useTranslation } from "react-i18next";
import { useFormContext } from "@/store/formStore/FormContext";
import Chip from "@/components/ui/chip/Chip";
import NewNoteFormStore from "@/components/screens/newDiaryNote/store/NewNoteFormStore";

interface Props {
    onPressOpen: () => void;
}

const SymptomChipsField: React.FC<Props> = ({ onPressOpen }) => {
    const { t } = useTranslation();
    const form = useFormContext<NewNoteFormStore>();

    const onDelete = (id: string) => form.deleteSymptom(id);
    const onPress = (id: string) => {
        form.fillSymptom(id);
        onPressOpen();
    };

    const symptoms = form.values?.symptoms ?? [];
    const isEmpty = symptoms.length === 0;
    const hasError = form.errors.symptoms;

    const resolveEmptyVariant = () => {
        const text = (
            <UI.Typo.Text color={hasError ? "$red9" : "$color9"}>
                {hasError ? hasError : "Empty"}
            </UI.Typo.Text>
        );

        return (
            <UI.YStack justify={"center"} items={"center"}>
                {text}
            </UI.YStack>
        );
    };

    return (
        <UI.Paper
            minH={80}
            borderWidth={"$1"}
            borderColor={hasError ? "$red4" : "$borderColor"}
        >
            <UI.YStack
                gap={"$3"}
            >
                {isEmpty && (
                    <UI.YStack justify={"center"} items={"center"}>
                        {resolveEmptyVariant()}
                    </UI.YStack>
                )}
                {!isEmpty && (
                    <UI.XStack
                        items='stretch'
                        gap='$1'
                        flexWrap='wrap'
                    >
                        {symptoms.map((i) => (
                            <Chip
                                key={i.id}
                                id={i.id}
                                label={i.name}
                                counter={i.strengtOfPain}
                                onPress={onPress}
                                onDelete={onDelete}
                                size="lg"
                            />
                        ))}
                    </UI.XStack>
                )}

                <UI.Button
                    size={"$4"}
                    onPress={onPressOpen}
                >
                    {t("meteo.pages.newDiaryNote.symptomsList.buttons.addNew")}
                </UI.Button>
            </UI.YStack>
        </UI.Paper>
    );
};

export default observer(SymptomChipsField);

