import React from "react";
import UI from "@components/ui";
import Format from "@components/common/format";
import { Droplet } from "@tamagui/lucide-icons";

type Props = { value?: number };

const HumidityCard: React.FC<Props> = ({ value }) => {
    return (
        <UI.Paper flex={1}>
            <UI.YStack gap='$2' items={"center"} justify={"center"}>
                <Droplet size={"$4"} strokeWidth={1} />
                <Format.Humidity
                    fontSize={"$9"}
                    value={value}
                    hideIcon
                />
            </UI.YStack>
        </UI.Paper>
    );
};

export default HumidityCard;
