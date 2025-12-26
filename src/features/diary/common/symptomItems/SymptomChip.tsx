import Format from "src/shared/components/format";
import UI from "src/shared/components/ui";
import { Symptom } from "@appTypes/diary/DiaryHistoryItem";
import React from "react";

interface SymptomProps {
    data: Symptom;
}

const SymptomChip: React.FC<SymptomProps> = ({
    data,
}) => {
    return (
        <UI.Chip
            id={data.id}
            label={<Format.Symptom {...data} />}
            size="sm"
            counter={data.strengtOfPain}
        />
    );
};

export default SymptomChip;
