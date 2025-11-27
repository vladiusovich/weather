import React from "react";
import UI from "@components/ui";
import { TextStyle } from "tamagui";
import {
    Droplet,
} from "@tamagui/lucide-icons";

type HumidityProps = {
    value?: number;
    hideIcon?: boolean;
} & TextStyle;

const Humidity: React.FC<HumidityProps> = ({ value, hideIcon = false, ...props }) => {
    return (
        <UI.XStack gap='$0.5' items={"center"}>
            {!hideIcon && <Droplet size={14} />}
            <UI.XStack items={"baseline"}>
                <UI.Typo.Text {...props}>{value ?? "N/A"}</UI.Typo.Text>
                <UI.Typo.Text {...props}>%</UI.Typo.Text>
            </UI.XStack>
        </UI.XStack>
    );
};

export default Humidity;
