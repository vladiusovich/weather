import React, { useState } from "react";
import { YStack } from "tamagui";
import DateTimePicker, { DateType, useDefaultStyles } from "react-native-ui-datepicker";
import useModalController from "@/hooks/useModalController";
import Input from "../input/Input";
import { CalendarDays } from "@tamagui/lucide-icons";
import SheetView from "../sheet/SheetView";
import { NativeSyntheticEvent, NativeTouchEvent, Pressable } from "react-native";
import Button from "../button/Button";
import { getDatetimeFormatter } from "@/utils/datetime.helper";

// TODO: props
// open\close, click outside of form
export interface DatepickerPropsType {
    value?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
}

const Datepicker: React.FC<DatepickerPropsType> = ({
    value,
    onValueChange,
    ...props
}) => {
    const { open, onOpen, onClose } = useModalController();
    const defaultStyles = useDefaultStyles();
    const [selected, setSelected] = useState<DateType | null>(value);

    const format = getDatetimeFormatter("date");

    const onPressOpen = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
        onOpen();
    };

    const onPressApply = () => {
        const valueStr = selected?.toString() ?? "";
        onValueChange?.(valueStr);
        onClose();
    };

    const inputReadOnlyValue = format(value ?? "") ?? "";

    return (
        <>
            <YStack gap="$4">
                <Pressable onPress={onPressOpen}>
                    <Input
                        value={inputReadOnlyValue}
                        iconRight={CalendarDays}
                        editable={false}
                        pointerEvents="none"
                        {...props}
                    />
                </Pressable>
            </YStack>

            <SheetView
                open={open}
                onClose={onClose}
                snapPoints={[45]}
            >
                <YStack gap={"$3"} flex={1}>
                    <DateTimePicker
                        mode="single"
                        hideWeekdays
                        date={selected}
                        onChange={({ date }) => setSelected(date)}
                        styles={defaultStyles}
                    />
                </YStack>

                <Button size={"$5"} onPress={onPressApply}>
                    Apply
                </Button>
            </SheetView>
        </>
    );
};

export default Datepicker;