import { observer } from "mobx-react-lite";
import React from "react";
import UI from "@components/ui";
import { useTranslation } from "react-i18next";
import { Symptom } from "@./src/types/diary/DiaryHistoryItem";
import { useFormContext } from "@./src/store/formStore/FormContext";
import { X } from "@tamagui/lucide-icons";
import PainIntensity from "./painStrengthField/PainIntensity";
import { Pressable } from "react-native";
import NewNoteFormStore from "../../../../store/NewNoteFormStore";

const SymptomCard: React.FC<Symptom> = ({
    ...props
}) => {
    const { t } = useTranslation();
    const form = useFormContext<NewNoteFormStore>();

    const onPressDelete = () => {
        form.deleteSymptom(props.id);
    };

    return (
        <UI.Paper bg="$background02">
            <UI.YStack gap='$2'>
                <UI.XStack gap='$3' justify={"space-between"}>
                    <UI.Typo.H5>
                        {props.name}
                    </UI.Typo.H5>
                    <Pressable hitSlop={8} onPress={onPressDelete}>
                        <X size={"$1"} />
                    </Pressable>
                </UI.XStack>

                <PainIntensity {...props} />
            </UI.YStack>
        </UI.Paper>
    );
};

export default observer(SymptomCard);

