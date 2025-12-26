import Format from "src/shared/components/format";
import UI from "src/shared/components/ui";
import { DiaryHistoryItem } from "@appTypes/diary/DiaryHistoryItem";
import { observer } from "mobx-react-lite";
import React from "react";
import SymptomItems from "../../common/symptomItems/SymptomItems";
import Comment from "./commet/Comment";

interface HistoryItemProps {
    data: DiaryHistoryItem;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
    data,
}) => {
    return (
        <UI.Paper>
            <UI.YStack gap={"$3"}>
                <Format.Date fontSize={"$5"} color={"$color12"} value={data.date} variant='datetime' />
                <UI.YStack gap={"$3"}>
                    <SymptomItems data={data.symptoms} />
                    <Comment data={data?.comment} />
                </UI.YStack>
            </UI.YStack>
        </UI.Paper>
    );
};

export default observer(HistoryItem);
