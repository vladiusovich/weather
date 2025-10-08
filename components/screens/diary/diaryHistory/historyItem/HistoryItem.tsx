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
            <UI.Card.Header size={"$0.5"}>
                <UI.XStack gap={"$2"} items={"center"}>
                    <Format.Date value={data.date} variant='datetime' />
                </UI.XStack>
            </UI.Card.Header>
            <UI.Separator marginBlock={"$2"} />

            <UI.YStack gap={"$2"}>
                <SymptomItems data={data.symptoms} />
                <Comment data={data?.comment} />
            </UI.YStack>
        </UI.Paper>
    );
};

export default observer(HistoryItem);
