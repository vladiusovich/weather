import UI from "@components/ui";
import React from "react";
import { Smile } from "@tamagui/lucide-icons";

const FeelingGood: React.FC = () => {
    return (
        <UI.XStack
            items='stretch'
            gap='$2'
        >
            <UI.Typo.Text fontSize={"$2"}>
                {"No symptoms"}
            </UI.Typo.Text>
            <Smile size={16} />
        </UI.XStack>
    );
};

export default FeelingGood;
