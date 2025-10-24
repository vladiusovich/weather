import React from "react";
import UI from "@/components/ui";
import Format from "@/components/common/format";
import { Magnet } from "@tamagui/lucide-icons";

type Props = { value?: number };

const KIndexCard: React.FC<Props> = ({ value }) => {
    return (
        <UI.Paper flex={1}>
            <UI.YStack gap='$2' items={"center"} justify={"center"}>
                <Magnet size={"$4"} />
                <Format.KIndex
                    value={value}
                    fontSize={"$9"}
                />
            </UI.YStack>
        </UI.Paper>
    );
};

export default KIndexCard;
