import { observer } from "mobx-react-lite";
import React from "react";
import UI from "src/shared/components/ui";
import { useTranslation } from "react-i18next";
import NewNoteFormStore from "../../../store/NewNoteFormStore";
import Format from "src/shared/components/format";
import useSymptomTranslation from "src/shared/components/format/symptom/useSymptomTranslation";
import { useFormContext } from "@shared/form/formStore/FormContext";

interface Props {
    searchingValue?: string;
}

const ExtendedSymptomsList: React.FC<Props> = ({ searchingValue }) => {
    const { t } = useTranslation();
    const form = useFormContext<NewNoteFormStore>();
    const { getTranslate } = useSymptomTranslation();

    const onPress = (id: string) => {
        form.addOrDeleteSymptom(id);
    };

    const symptoms = form.allSymptoms ?? [];
    const selectedSymptoms = form.selectedSymptoms;

    const filtered = symptoms.filter(s => searchingValue
        ? getTranslate({ name: s.name, code: s.name }).includes(searchingValue)
        : true);

    const noData = searchingValue && filtered.length === 0;

    return (
        <UI.YStack
            gap={"$3"}
        >
            {noData && (
                <UI.YStack justify={"center"} items={"center"}>
                    <UI.Typo.Paragraph>
                        {t("screens.newDiaryNote.extendedSymptomsList.emptySyptomsList")}
                    </UI.Typo.Paragraph>
                </UI.YStack>
            )}

            <UI.XStack
                items='stretch'
                gap='$2'
                flexWrap='wrap'
            >
                {filtered.map((i) => (
                    <UI.Chip
                        key={i.id}
                        id={i.id}
                        label={<Format.Symptom {...i} />}
                        onPress={onPress}
                        size="md"
                        variant="outline"
                        selected={selectedSymptoms.some(s => s.id === i.id)}
                    />
                ))}
            </UI.XStack>
        </UI.YStack>
    );
};

export default observer(ExtendedSymptomsList);

