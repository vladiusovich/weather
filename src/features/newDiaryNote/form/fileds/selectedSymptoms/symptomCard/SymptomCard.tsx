import { observer } from "mobx-react-lite";
import React from "react";
import UI from "src/shared/components/ui";
import { X } from "@tamagui/lucide-icons";
import PainIntensity from "./painStrengthField/PainIntensity";
import { Pressable } from "react-native";
import NewNoteFormStore from "../../../../store/NewNoteFormStore";
import Format from "src/shared/components/format";
import { Symptom } from "@appTypes/diary/DiaryHistoryItem";
import { useFormContext } from "@form/formStore/FormContext";

const SymptomCard: React.FC<Symptom> = ({
    ...props
}) => {
    const form = useFormContext<NewNoteFormStore>();

    const onPressDelete = () => {
        form.deleteSymptom(props.id);
    };

    return (
        <UI.Paper p="$3" bg="$background02">
            <UI.YStack gap='$1'>
                <UI.XStack gap='$3' justify={"space-between"}>
                    <UI.Typo.H6>
                        <Format.Symptom {...props} />
                    </UI.Typo.H6>
                    <Pressable hitSlop={8} onPress={onPressDelete}>
                        <X size={"$1"} color={"$color04"}/>
                    </Pressable>
                </UI.XStack>

                <PainIntensity {...props} />
            </UI.YStack>
        </UI.Paper>
    );
};

export default observer(SymptomCard);

