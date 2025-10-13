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
    return (
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
    );
};

export default observer(SymptomChipsField);

