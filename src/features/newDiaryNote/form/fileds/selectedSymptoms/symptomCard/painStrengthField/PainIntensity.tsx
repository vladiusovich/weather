import { observer } from "mobx-react-lite";
import React from "react";
import UI from "src/shared/components/ui";
import { useTranslation } from "react-i18next";
import { Symptom } from "@appTypes/diary/DiaryHistoryItem";
import NewNoteFormStore from "src/features/newDiaryNote/store/NewNoteFormStore";
import { useFormContext } from "@shared/form/formStore/FormContext";

const PainIntensity: React.FC<Symptom> = ({
    strengtOfPain,
    ...props
}) => {
    const { t } = useTranslation();
    const form = useFormContext<NewNoteFormStore>();

    const onValueChange = (value: number[]) => {
        form.updateSymptom({ ...props, strengtOfPain: value[0] });
    };

    return (
        <UI.YStack gap='$2'>
            <UI.XStack items='center' gap="$2">
                <UI.Typo.Text>
                    {t("screens.newDiaryNote.fields.painPower.title")}
                </UI.Typo.Text>
                <UI.Typo.Paragraph size='$5' fontWeight={900}>
                    {strengtOfPain}
                </UI.Typo.Paragraph>
            </UI.XStack>

            <UI.Slider
                size='$1'
                orientation='horizontal'
                value={[strengtOfPain]}
                min={0}
                max={10}
                step={1}
                onValueChange={onValueChange}
            />
        </UI.YStack>
    );
};

export default observer(PainIntensity);
