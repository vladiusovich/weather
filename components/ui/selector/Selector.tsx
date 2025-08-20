import React from 'react';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import type { SelectProps } from 'tamagui';
import {
    Adapt,
    Select,
    Sheet,
    YStack,
} from 'tamagui';

export interface SelectorOption {
    name: string;
    value: string;
};

export interface ExSelectProps extends SelectProps {
    options?: SelectorOption[];
    label?: string;
    palceholder?: string;
    disabled?: boolean;
};

/**
 * SelectDemoItem is a reusable component wrapping a customized Select.
 * It supports both custom and native modes based on the `native` prop.
 */
const Selector: React.FC<ExSelectProps> = ({
    options = [],
    palceholder,
    label,
    disabled = false,
    ...props
}) => {
    return (
        <Select {...props}>
            {/* The trigger button for the select */}
            <Select.Trigger iconAfter={ChevronDown} disabled={disabled}>
                <Select.Value placeholder={palceholder} />
            </Select.Trigger>

            {/* Use Adapt to render a Sheet for touch platforms */}
            <Adapt platform="touch">
                <Sheet modal dismissOnSnapToBottom animation='quickest'>
                    <Sheet.Overlay
                        bg="$shadowColor"
                        animation='quickest'
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />

                    {/* The problem in Sheet.ScrollView. It does not work on real device (Pixel 8a) */}
                    {/* I don't know why */}
                    <Sheet.Frame>
                        <Adapt.Contents />
                    </Sheet.Frame>

                </Sheet>
            </Adapt>

            {/* Main select content including scroll buttons and list viewport */}
            <Select.Content>
                {/* Scroll Up Button with a gradient overlay */}
                <Select.ScrollUpButton
                    items="center"
                    justify="center"
                    position="relative"
                    width="100%"
                    height="$3"
                >
                    <YStack z={10}>
                        <ChevronUp size={20} />
                    </YStack>
                </Select.ScrollUpButton>

                {/* Viewport listing the select options */}
                <Select.Viewport minW={200}>
                    <Select.Group>
                        <Select.Label>{label}</Select.Label>
                        {React.useMemo(
                            () =>
                                options.map((item, i) => (
                                    <Select.Item
                                        index={i}
                                        key={item.name}
                                        value={item.value}
                                    >
                                        <Select.ItemText>{item.name}</Select.ItemText>
                                        <Select.ItemIndicator marginLeft="auto">
                                            <Check size={16} />
                                        </Select.ItemIndicator>
                                    </Select.Item>
                                )),
                            [options] // items are static; no dependencies needed here
                        )}
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
                    <YStack z={10}>
                        <ChevronDown size={20} />
                    </YStack>
                </Select.ScrollDownButton>
            </Select.Content>
        </Select>
    );
}

export default Selector;
