import UI from "@components/ui";
import { Symptom } from "@appTypes/diary/DiaryHistoryItem";
import React from "react";
import SymptomChip from "./SymptomChip";
import FeelingGood from "./FeelingGood";

interface SymptomItemsProps {
    data: Symptom[];
}

const SymptomItems: React.FC<SymptomItemsProps> = ({
    data,
}) => {
    if (data.length === 0) {
        return <FeelingGood />;
    }

    return (
        <UI.XStack
            items="stretch"
            gap="$1.5"
            flexWrap="wrap"
        >
            {data.map((i) => <SymptomChip key={i.id} data={i} />)}
        </UI.XStack>
    );
};

export default SymptomItems;
