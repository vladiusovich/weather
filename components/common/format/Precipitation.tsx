import React from "react";
import UI from "@/components/ui";
import { TextStyle } from "tamagui";

type PrecipitationProps = {
    value?: number | null;
} & TextStyle;

const Precipitation: React.FC<PrecipitationProps> = ({ value, ...props }) => {
    return (
        <UI.XStack gap='$1' items={"baseline"}>
            <UI.Typo.Text {...props}>{value ?? "N/A"}</UI.Typo.Text>
            <UI.Typo.Text fontSize='$1'>%</UI.Typo.Text>
        </UI.XStack>
    );
};

export default Precipitation;
