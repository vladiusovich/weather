import { observer } from "mobx-react-lite";
import React from "react";
import UI from "@components/ui";
import { useTranslation } from "react-i18next";
import { useFormContext } from "@store/formStore/FormContext";
import Chip from "@components/ui/chip/Chip";
import NewNoteFormStore from "../../../store/NewNoteFormStore";

interface Props {
    searchingValue?: string;
}

const ExtendedSymptomsList: React.FC<Props> = ({ searchingValue }) => {
    const { t } = useTranslation();
    const form = useFormContext<NewNoteFormStore>();

    const onPress = (id: string) => {
        form.addOrDeleteSymptom(id);
    };

    const symptoms = form.allSymptoms ?? [];
    const selectedSymptoms = form.selectedSymptoms;

    const filtered = symptoms.filter(s => searchingValue ? s.name.includes(searchingValue) : true);
    const noData = searchingValue && filtered.length === 0;

    return (
        <UI.YStack
            gap={"$3"}
        >
            {noData && (
                <UI.YStack justify={"center"} items={"center"}>
                    <UI.Typo.Paragraph>
                        Can't find symptoms
                    </UI.Typo.Paragraph>
                </UI.YStack>
            )}

            <UI.XStack
                items='stretch'
                gap='$2'
                flexWrap='wrap'
            >

                {filtered.map((i) => (
                    <Chip
                        key={i.id}
                        id={i.id}
                        label={i.name}
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

