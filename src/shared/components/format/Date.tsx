import React from "react";
import UI from "src/shared/components/ui";
import { DateVariantType, getDatetimeFormatter } from "@utils/datetime.helper";
import { TextStyle } from "tamagui";

type DateProps = {
    value: string | undefined;
    asDayOfWeek?: boolean;
    variant: DateVariantType;
} & TextStyle;

const Date: React.FC<DateProps> = ({
    value,
    asDayOfWeek,
    variant = "date",
    ...props
}) => {
    if (!value) {
        return null;
    }

    const format = getDatetimeFormatter(variant);
    const formatedValue = format(value);

    if (formatedValue === null) {
        return null;
    }

    return (
        <UI.XStack>
            <UI.Typo.Text {...props}>{formatedValue}</UI.Typo.Text>
        </UI.XStack>
    );
};

export default Date;
