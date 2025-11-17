import Format from "@/components/common/format";
import UI from "@/components/ui";
import { DiaryHistoryItem } from "@/types/diary/DiaryHistoryItem";
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
            <UI.YStack gap={"$2"}>
                <Format.Date fontSize={"$3"} value={data.date} variant='datetime' />
                <UI.YStack gap={"$2"}>
                    <SymptomItems data={data.symptoms} />
                    <Comment data={data?.comment} />
                </UI.YStack>
            </UI.YStack>
        </UI.Paper>
    );
};

export default observer(HistoryItem);
