import { observer } from "mobx-react-lite";
import React from "react";
import UI from "@shared/components/ui";
import { useTranslation } from "react-i18next";
import { useFormContext } from "@store/formStore/FormContext";
import Format from "@shared/components/format";
import NewNoteFormStore from "@features/newDiaryNote/store/NewNoteFormStore";
import Chip from "@shared/components/ui/chip/Chip";

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
                        {t("screens.newDiaryNote.symptomsSection.howAreYou")}
                    </UI.Typo.H5>

                    <UI.Typo.SizableText size={"$3"} color={"$color08"}>
                        {t("screens.newDiaryNote.symptomsSection.description")}
                    </UI.Typo.SizableText>
                </UI.YStack>

                <UI.Typo.Text color={"$color08"} fontWeight={900}>
                    {t("screens.newDiaryNote.symptomsSection.popularSymptoms")}
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
                            label={<Format.Symptom {...i} />}
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
                {t("screens.newDiaryNote.symptomsSection.buttons.addNew")}
            </UI.Button>
        </UI.YStack>
    );
};

export default observer(SymptomChipsField);

