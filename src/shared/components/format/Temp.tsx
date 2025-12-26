import React from "react";
import UI from "src/shared/components/ui";
import { TextStyle } from "tamagui";

type TempProps = {
    value?: string | number | null;
    unit?: string;
} & TextStyle;

// TODO: metrics F and C
const TEMP_SYMBOL = "°";

const Temp: React.FC<TempProps> = ({ unit, value, ...props }) => {
    if (!value) {
        return null;
    }

    // TODO
    const formatedValue = Math.round(+value);

    return (
        <UI.XStack>
            <UI.Typo.Text {...props}>{formatedValue}</UI.Typo.Text>
            <UI.Typo.Text {...props}>{TEMP_SYMBOL}</UI.Typo.Text>
            {unit && <UI.Typo.Text>{unit}</UI.Typo.Text>}
        </UI.XStack>
    );
};

export default Temp;
