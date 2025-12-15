import { observer } from "mobx-react-lite";
import React from "react";
import UI from "@components/ui";
import { useTranslation } from "react-i18next";
import { useFormContext } from "@store/formStore/FormContext";
import Chip from "@components/ui/chip/Chip";
import NewNoteFormStore from "@components/screens/newDiaryNote/store/NewNoteFormStore";

interface Props {
    onPressOpen: () => void;
}

const SymptomChipsField: React.FC<Props> = ({ onPressOpen }) => {
    const { t } = useTranslation();
    const form = useFormContext<NewNoteFormStore>();

    const onPress = (id: string) => {
        form.addOrDeleteSymptom(id);
    };

    return (
        <UI.YStack gap={"$3"}>
            <UI.YStack gap={"$2"}>
                <UI.YStack gap={"$1"}>
                    <UI.Typo.H5 color={"$color12"} fontWeight={900}>
                        How do you feel?
                    </UI.Typo.H5>

                    <UI.Typo.SizableText size={"$3"} color={"$color08"}>
                        Select what is bothering you today
                    </UI.Typo.SizableText>
                </UI.YStack>

                <UI.Typo.Text color={"$color08"} fontWeight={900}>
                    Most popular
                </UI.Typo.Text>

                <UI.XStack
                    items='stretch'
                    gap='$2'
                    flexWrap='wrap'
                >
                    {form.popularSymptoms.map((i) => (
                        <Chip
                            key={i.id}
                            id={i.id}
                            label={i.name}
                            onPress={onPress}
                            size="md"
                            variant="outline"
                            selected={form.selectedSymptoms.some(s => s.id === i.id)}
                        />
                    ))}
                </UI.XStack>
            </UI.YStack>

            <UI.Button
                size={"$4"}
                onPress={onPressOpen}
            >
                {t("meteo.pages.newDiaryNote.symptomsList.buttons.addNew")}
            </UI.Button>
        </UI.YStack>
    );
};

export default observer(SymptomChipsField);

