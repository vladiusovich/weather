import React from "react";
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import type { SelectProps } from "tamagui";
import {
    Adapt,
    ScrollView,
    Select,
    Sheet,
    YStack,
} from "tamagui";

export interface SelectorOption {
    name: string;
    value: string;
};

export interface SelectorProps extends SelectProps {
    options?: SelectorOption[];
    label?: string;
    palceholder?: string;
    disabled?: boolean;
};

/**
 * SelectDemoItem is a reusable component wrapping a customized Select.
 * It supports both custom and native modes based on the `native` prop.
 */
const Selector: React.FC<SelectorProps> = ({
    options = [],
    palceholder,
    label,
    disabled = false,
    open = false,
    onOpenChange,
    ...props
}) => {
    return (
        <Select {...props}>
            {/* The trigger button for the select */}
            <Select.Trigger iconAfter={ChevronDown} disabled={disabled}>
                <Select.Value placeholder={palceholder} />
            </Select.Trigger>

            {/* Use Adapt to render a Sheet for touch platforms */}
            {/* TODO: snapPointsMode  */}
            <Adapt platform="touch">
                <Sheet modal animation='quickest' snapPointsMode="percent" snapPoints={[50]}>
                    <Sheet.Overlay
                        animation='quickest'
                        bg="$shadowColor"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                    {/* <Sheet.Handle />

                    {/* The problem in Sheet.ScrollView. It does not work on real device (Pixel 8a\4a) */}
                    {/* I don't know why */}
                    <Sheet.Frame>
                        {/* ScrollView insted of Sheet.ScrollView. It works fine */}
                        <ScrollView>
                            <Adapt.Contents />
                        </ScrollView>
                    </Sheet.Frame>
                </Sheet>
            </Adapt>

            <Select.Content>
                {/* Scroll Up Button with a gradient overlay */}
                <Select.ScrollUpButton
                    items="center"
                    justify="center"
                    position="relative"
                    width="100%"
                    height="$3"
                >
                    <YStack>
                        <ChevronUp size={20} />
                    </YStack>
                </Select.ScrollUpButton>

                {/* Viewport listing the select options */}
                <Select.Viewport
                >
                    <Select.Group>
                        <Select.Label
                            title={label}
                            backgroundColor={"$background"}
                        />
                        {options.map((item, i) => (
                            <Select.Item
                                index={i}
                                key={item.name}
                                value={item.value}
                                p={"$4"}
                            >
                                <Select.ItemText fontSize={"$5"}>{item.name}</Select.ItemText>
                                <Select.ItemIndicator>
                                    <Check size={"$1"} />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Viewport>

                {/* Scroll Down Button with a gradient overlay */}
                <Select.ScrollDownButton
                    items="center"
                    justify="center"
                    position="relative"
                    width="100%"
                    height="$3"
                >
                    <YStack>
                        <ChevronDown size={20} />
                    </YStack>
                </Select.ScrollDownButton>
            </Select.Content>
        </Select>
    );
};

export default Selector;
