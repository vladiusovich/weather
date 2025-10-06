import React from "react";
import UI from "@/components/ui";
import { TextStyle } from "tamagui";

type TempProps = {
    value?: string | number | null;
    unit?: string;
} & TextStyle;

const TEMP_SYMBOL = "°";

const Temp: React.FC<TempProps> = ({ unit, value, ...props }) => {
    if (!value) {
        return null;
    }

    // TODO
    const formatedValue = Math.round(+value);

    return (
        <UI.XStack gap='$1'>
            <UI.Typo.Text {...props}>{formatedValue}</UI.Typo.Text>
            <UI.Typo.Text>{TEMP_SYMBOL}</UI.Typo.Text>
            {unit && <UI.Typo.Text>{unit}</UI.Typo.Text>}
        </UI.XStack>
    );
};

export default Temp;
